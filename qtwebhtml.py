import sys
import os
import serial.tools.list_ports
from PyQt5.QtCore import QThread, QUrl, pyqtSlot, QSize, QTimer, QObject, pyqtSignal, Qt
from PyQt5.QtWidgets import QMainWindow, QAction, QApplication, QHBoxLayout, QPushButton, QComboBox, QVBoxLayout, QProgressBar, QMenu, QLabel, QTextEdit
from PyQt5.QtWidgets import QDialog, QLineEdit, QFileDialog, QCheckBox, QMessageBox
from PyQt5.QtGui import QIcon, QTextCursor, QKeySequence
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWidgets import QShortcut
import threading
import time
import subprocess
import json
import webbrowser

from monitor_plotter import MainWindow
iconSize = 32

class ForumDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)

        self.setWindowTitle("Visualino Issues")
        self.setGeometry(100, 100, 800, 600)

        layout = QVBoxLayout()
        web_view = QWebEngineView()
        web_view.load(QUrl("https://github.com/Ultimaker/Cura/issues"))

        layout.addWidget(web_view)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setLayout(layout)
    
# Clase para manejar la configuración
class ConfigManager:
    def __init__(self, filename='config.json'):
        self.filename = filename
        self.data = {}
        self.load_config()

    # Cargar la configuración desde el archivo JSON
    def load_config(self):
        try:
            with open(self.filename, 'r') as file:
                self.data = json.load(file)
        except FileNotFoundError:
            pass

    # Guardar la configuración en el archivo JSON
    def save_config(self):
        with open(self.filename, 'w') as file:
            json.dump(self.data, file)

    # Obtener el valor de una clave de configuración
    def get_value(self, key):
        return self.data.get(key, None)

    # Establecer el valor de una clave de configuración
    def set_value(self, key, value):
        self.data[key] = value
        self.save_config()

class PreferencesDialog(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("Preferencias")
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.initUI()

    def initUI(self):
        # Campo de entrada para la ubicación del compilador
        self.compiler_location_edit = QLineEdit()
        self.layout.addWidget(QLabel("Ubicación del compilador:"))
        self.layout.addWidget(self.compiler_location_edit)

        # Obtener la ubicación del compilador guardada en la configuración
        compiler_location = config_manager.get_value('compiler_location')
        if compiler_location:
            self.compiler_location_edit.setText(compiler_location)

        # Checkbox para habilitar la verbosidad
        self.verbosity_checkbox = QCheckBox("Habilitar Verbosidad")
        self.layout.addWidget(self.verbosity_checkbox)

        # Obtener el estado de la verbosidad guardado en la configuración
        verbosity_enabled = config_manager.get_value('verbosity_enabled')
        if verbosity_enabled:
            self.verbosity_checkbox.setChecked(True)
        else:
            self.verbosity_checkbox.setChecked(False)

        # ComboBox para seleccionar el idioma
        self.language_combo = QComboBox()
        self.language_combo.addItem("Spanish")
        self.language_combo.addItem("English")
        self.layout.addWidget(QLabel("Idioma:"))
        self.layout.addWidget(self.language_combo)

        # Obtener el idioma guardado en la configuración
        language = config_manager.get_value('language')
        if language:
            index = self.language_combo.findText(language)
            if index != -1:
                self.language_combo.setCurrentIndex(index)

        # Botón para seleccionar la ubicación del archivo
        select_file_button = QPushButton("Seleccionar Archivo")
        select_file_button.clicked.connect(self.select_exe_file)
        self.layout.addWidget(select_file_button)

        # Botón para guardar la configuración
        save_button = QPushButton("Guardar")
        save_button.clicked.connect(self.save_preferences)
        self.layout.addWidget(save_button)

    # Método para abrir el cuadro de diálogo de selección de archivos .exe
    def select_exe_file(self):
        file_dialog = QFileDialog()
        file_dialog.setNameFilter("Archivos ejecutables (*.exe)")
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        if file_dialog.exec_():
            selected_files = file_dialog.selectedFiles()
            if selected_files:
                self.compiler_location_edit.setText(selected_files[0])

    # Método para guardar las preferencias
    def save_preferences(self):
        compiler_location = self.compiler_location_edit.text()
        config_manager.set_value('compiler_location', compiler_location)

        # Verificar si la verbosidad está habilitada
        verbosity_enabled = self.verbosity_checkbox.isChecked()
        config_manager.set_value('verbosity_enabled', verbosity_enabled)

        # Obtener el idioma seleccionado
        language_index = self.language_combo.currentIndex()
        language = self.language_combo.itemText(language_index)
        config_manager.set_value('language', language)

        self.close()

class CommandRunner(QThread):
    output_received = pyqtSignal(str)

    def __init__(self, command):
        super().__init__()
        self.command = command

    def run(self):
        process = subprocess.Popen(self.command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in process.stdout:
            self.output_received.emit(line.strip())
        process.kill()

class ConsoleOutput:
    def __init__(self, console):
        self.console = console

    def write(self, message):
        # Separar la salida de la consola por saltos de línea
        for line in message.split('\n'):
            line = line.strip()  # Eliminar espacios en blanco al inicio y al final
            if line:  # Evitar agregar líneas en blanco innecesarias
                self.console.moveCursor(QTextCursor.End)
                self.console.insertPlainText(line + '\n')  # Agregar un salto de línea al final

    def flush(self):
        pass

class PortMonitor(QObject):
    portChanged = pyqtSignal()

    def __init__(self):
        super().__init__()

    def run(self):
        previous_ports = []
        while True:
            current_ports = [port.device for port in serial.tools.list_ports.comports()]
            if current_ports != previous_ports:
                self.portChanged.emit()
                previous_ports = current_ports
            time.sleep(1)

class WebViewer(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('Fab Blocks IDE')
        self.setGeometry(0, 0, 1024, 720)
        self.setWindowIcon(QIcon("icons/codigo.ico"))

        # Crear el webview
        self.webview = QWebEngineView()
        self.setCentralWidget(self.webview)

        # Crear un nuevo menú
        menu = self.menuBar().addMenu("Archivo")


        # Agregar acciones al menú
        action1 = QAction(QIcon("icons/opcion1.png"), "Nuevo", self)
        action2 = QAction(QIcon("icons/opcion2.png"), "Abrir", self)
        action4 = QAction(QIcon("icons/opcion2.png"), "Guardar", self)
        action5 = QAction(QIcon("icons/opcion2.png"), "Guardar Como", self)
        action7 = QAction(QIcon("icons/opcion2.png"), "Preferencias", self)
        action8 = QAction(QIcon("icons/opcion2.png"), "Salir", self)

        
        action1.triggered.connect(self.open_new_file_window)
        action2.triggered.connect(self.open_file)
        action4.triggered.connect(self.save_file_as)
        action7.triggered.connect(self.show_preferences_dialog)
        action8.triggered.connect(self.exit_application)

        self.menu_export = QMenu("Exportar Como", self)
        self.menu_examples = QMenu("Ejemplos",self)

        
        # Agregar acciones al menú de exportación como
        self.action61 = QAction(".ino")
        self.action62 = QAction(".py")
        self.action63 = QAction(".ps")

        # SubMenu
        submenu_arduino = QMenu("Arduino", self)
        submenu_modular_v1 = QMenu("Modular", self)
        submenu_robot_betto = QMenu("Robot Betto", self)
        submenu_carlitto = QMenu("Robot Carlitto", self)
        submenu_blass = QMenu("Robot Blass", self)

        # Ejemplos
        action_arduino_example1 = QAction("Variables", self)
        action_arduino_example2 = QAction("Variables de texto", self)
        action_arduino_example3 = QAction("Variables Serial", self)
        action_arduino_example4 = QAction("Parpadeo Led", self)
        action_arduino_example5 = QAction("Parpadeo 3 Led", self)
        action_arduino_example6 = QAction("Parpadeo Led Bucle For", self)
        action_arduino_example7 = QAction("Jinete Led", self)
        action_arduino_example8 = QAction("Desvanecido Led", self)
        action_arduino_example9 = QAction("Contador Serial", self)
        action_arduino_example10 = QAction("Interruptor Led Serial", self)
        submenu_arduino.addAction(action_arduino_example1)
        submenu_arduino.addAction(action_arduino_example2)
        submenu_arduino.addAction(action_arduino_example3)
        submenu_arduino.addAction(action_arduino_example4)
        submenu_arduino.addAction(action_arduino_example5)
        submenu_arduino.addAction(action_arduino_example6)
        submenu_arduino.addAction(action_arduino_example7)
        submenu_arduino.addAction(action_arduino_example8)
        submenu_arduino.addAction(action_arduino_example9)
        submenu_arduino.addAction(action_arduino_example10)

        action_arduino_example1.triggered.connect(lambda: self.open_example("Arduino/01-variables.bly"))
        action_arduino_example2.triggered.connect(lambda: self.open_example("Arduino/02-variables-text.bly"))
        action_arduino_example3.triggered.connect(lambda: self.open_example("Arduino/03-variables-serial.bly"))
        action_arduino_example4.triggered.connect(lambda: self.open_example("Arduino/04-led-blink.bly"))
        action_arduino_example5.triggered.connect(lambda: self.open_example("Arduino/05-led-blink-3.bly"))
        action_arduino_example6.triggered.connect(lambda: self.open_example("Arduino/06-led-blink-for.bly"))
        action_arduino_example7.triggered.connect(lambda: self.open_example("Arduino/07-led-knight-rider.bly"))
        action_arduino_example8.triggered.connect(lambda: self.open_example("Arduino/08-led-fade.bly"))
        action_arduino_example9.triggered.connect(lambda: self.open_example("Arduino/09-serial-counter.bly"))
        action_arduino_example10.triggered.connect(lambda: self.open_example("Arduino/10-serial-led-switch.bly"))


        action_modular_v1_example1 = QAction("Parpadeo Led", self)
        submenu_modular_v1.addAction(action_modular_v1_example1)
        action_modular_v1_example1.triggered.connect(lambda: self.open_example("Modular/blink.bly"))

        action_robot_betto_example1 = QAction("Por añadir", self)
        submenu_robot_betto.addAction(action_robot_betto_example1)
        action_robot_betto_example1.setEnabled(False)

        action_carlitto_example1 = QAction("Por añadir", self)
        submenu_carlitto.addAction(action_carlitto_example1)
        action_carlitto_example1.setEnabled(False)

        action_blass_example1 = QAction("Por añadir", self)
        submenu_blass.addAction(action_blass_example1)
        action_blass_example1.setEnabled(False)

        self.menu_examples.addMenu(submenu_arduino)
        self.menu_examples.addMenu(submenu_modular_v1)
        self.menu_examples.addMenu(submenu_robot_betto)
        self.menu_examples.addMenu(submenu_carlitto)
        self.menu_examples.addMenu(submenu_blass)

        self.menu_export.addAction(self.action61)
        self.menu_export.addAction(self.action62)
        self.menu_export.addAction(self.action63)

        self.action62.setEnabled(False)
        self.action63.setEnabled(False)

        menu.addAction(action1)
        menu.addAction(action2)
        menu.addMenu(self.menu_examples)
        menu.addAction(action4)
        menu.addAction(action5)
        menu.addMenu(self.menu_export)
        menu.addSeparator()
        menu.addAction(action7)
        menu.addSeparator()
        menu.addAction(action8)

        action5.setVisible(False)

        # Crear un nuevo menú
        menu2 = self.menuBar().addMenu("Programa")

        # Agregar acciones al menú
        action21 = QAction("Verificar", self)
        action22 = QAction("Subir", self)
        action24 = QAction("Mostrar Codigo", self)
        action25 = QAction("Ocultar Codigo", self)

        menu2.addAction(action21)
        menu2.addAction(action22)
        menu2.addSeparator()
        menu2.addAction(action24)
        menu2.addAction(action25)

        # Conectar acciones a funciones
        action21.triggered.connect(self.compilar_clicked)
        action22.triggered.connect(self.subir_clicked)
        action24.triggered.connect(self.show_code)
        action25.triggered.connect(self.hide_code)

        # Crear un nuevo menú
        menu3 = self.menuBar().addMenu("Herramientas")

        # Agregar acciones al menú
        action31 = QAction("Monitor Serie", self)
        action32 = QAction("Grafico Serie", self)
        
        # Agregar el menú de placas
        self.placas_menu = QMenu("Placa:", self)

        # Agregar opciones de placa al menú
        self.option1 = QAction("Arduino Uno", self)
        self.option2 = QAction("Arduino Nano", self)
        self.option3 = QAction("Arduino Mega", self)
        self.option4 = QAction("Modular", self)

        self.placas_menu.addAction(self.option1)
        self.placas_menu.addAction(self.option2)
        self.placas_menu.addAction(self.option3)
        self.placas_menu.addAction(self.option4)

        # Agregar el menú de puertos COM
        self.ports_menu = QMenu("Puertos COM:", self)

        # Agregar el menú de herramientas al menú principal
        menu3.addAction(action31)
        menu3.addAction(action32)
        menu3.addSeparator()
        menu3.addMenu(self.placas_menu)
        menu3.addMenu(self.ports_menu)
    
        # Conectar acciones a funciones
        action31.triggered.connect(self.action1_triggered)
        action32.setVisible(False)
        #action32.triggered.connect(self.action2_triggered)

        # Crear un nuevo menú
        menu4 = self.menuBar().addMenu("Ayuda")

        # Agregar acciones al menú
        action41 = QAction("Primeros Pasos", self)
        action42 = QAction("Tutoriales", self)
        action43 = QAction("FAQ", self)
        action44 = QAction("Contactenos", self)
        action45 = QAction("Acerca de", self)
        action46 = QAction("Foro", self)

        # Conectar las acciones a las funciones correspondientes
        action41.triggered.connect(lambda: self.open_link("https://www.ejemplo.com/primeros_pasos"))
        action42.triggered.connect(lambda: self.open_link("https://www.ejemplo.com/tutoriales"))
        action43.triggered.connect(lambda: self.open_link("https://www.ejemplo.com/faq"))
        action44.triggered.connect(lambda: self.open_link("https://wa.me/+51984425782"))
        action45.triggered.connect(self.show_about_dialog)
        action46.triggered.connect(self.show_forum_dialog)
        
        # Agregar el menú de herramientas al menú principal
        menu4.addAction(action41)
        menu4.addAction(action42)
        menu4.addAction(action43)
        menu4.addSeparator()
        menu4.addAction(action44)
        menu4.addSeparator()
        menu4.addAction(action45)
        menu4.addAction(action46)

        # Crear una fila adicional para botones con iconos
        button_layout = QHBoxLayout()
        self.centralWidget().layout().addLayout(button_layout)

        # Establecer el tamaño deseado para los botones
        button_width = 120
        button_height = 40

        # Agregar botones con iconos
        button_compile = QPushButton("Verificar")
        button_compile.setIcon(QIcon("icons/compile.png"))
        button_compile.setIconSize(QSize(iconSize, iconSize))
        button_compile.setFixedSize(button_width, button_height)

        button_upload = QPushButton("Subir")
        button_upload.setIcon(QIcon("icons/upload.png"))
        button_upload.setIconSize(QSize(iconSize, iconSize))
        button_upload.setFixedSize(button_width, button_height)

        new_upload = QPushButton("Nuevo")
        new_upload.setIcon(QIcon("icons/new.png"))
        new_upload.setIconSize(QSize(iconSize, iconSize))
        new_upload.setFixedSize(button_width, button_height)

        open_upload = QPushButton("Abrir")
        open_upload.setIcon(QIcon("icons/open.png"))
        open_upload.setIconSize(QSize(iconSize, iconSize))
        open_upload.setFixedSize(button_width, button_height)

        save_file_button = QPushButton("Guardar")
        save_file_button.setIcon(QIcon("icons/save.png"))
        save_file_button.setIconSize(QSize(iconSize, iconSize))
        save_file_button.setFixedSize(button_width, button_height)

        graphic_serial = QPushButton("Grafico Serial")
        graphic_serial.setIcon(QIcon("icons/graphic.png"))
        graphic_serial.setIconSize(QSize(iconSize, iconSize))
        graphic_serial.setFixedSize(button_width, button_height)
        graphic_serial.setVisible(False) 

        monitor_serial = QPushButton("Monitor Serial")
        monitor_serial.setIcon(QIcon("icons/monitor_serial.png"))
        monitor_serial.setIconSize(QSize(iconSize, iconSize))
        monitor_serial.setFixedSize(button_width, button_height)
        
        self.combo = QComboBox(self)
        self.combo.addItem("Arduino Uno")
        self.combo.addItem("Arduino Nano")
        self.combo.addItem("Arduino Mega") 
        self.combo.addItem("Modular")
        self.combo.addItem("Robot Betto")
        self.combo.setFixedSize(button_width, button_height)
        
        layout = QVBoxLayout()
        layout.addWidget(self.combo)

        self.progress_bar = QProgressBar()
        self.progress_bar.setRange(0, 100)

        label_placas = QLabel("Placas:")
        label_puertos = QLabel("Puerto:")
    
        self.combo_puertos = QComboBox(self)
        self.combo_puertos.setFixedSize(button_width, button_height)

        button_layout.addWidget(button_compile)
        button_layout.addWidget(button_upload)
        button_layout.addWidget(new_upload)
        button_layout.addWidget(open_upload)
        button_layout.addWidget(save_file_button)
        button_layout.addWidget(label_placas)
        button_layout.addWidget(self.combo)
        button_layout.addWidget(label_puertos)
        button_layout.addWidget(self.combo_puertos)
        button_layout.addWidget(self.progress_bar,2)
        button_layout.addWidget(graphic_serial)
        button_layout.addWidget(monitor_serial)
        
        button_layout.addStretch()

        # Cargar un archivo local desde la carpeta html
        self.loadLocalFile("index.html")

        # Conectar botones a funciones
        button_compile.clicked.connect(self.compilar_clicked)
        button_upload.clicked.connect(self.subir_clicked)
        open_upload.clicked.connect(self.open_file)
        new_upload.clicked.connect(self.open_new_file_window)

        self.ports_menu.aboutToShow.connect(self.update_ports_menu)

        #Guardado de archivos
        save_file_button.clicked.connect(self.save_file_as)
        self.action61.triggered.connect(self.export_as_ino)

        # Conectar la señal currentIndexChanged del QComboBox a la función de actualización de menús
        self.combo.currentIndexChanged.connect(self.update_menus)
        self.combo_puertos.currentIndexChanged.connect(self.update_menus)

        # Conectar las acciones del menú de placas a la función de actualización del combobox
        self.option1.triggered.connect(lambda: self.combo.setCurrentIndex(0))
        self.option2.triggered.connect(lambda: self.combo.setCurrentIndex(1))
        self.option3.triggered.connect(lambda: self.combo.setCurrentIndex(2))
        self.option4.triggered.connect(lambda: self.combo.setCurrentIndex(3))

        # Conectar las acciones del menú de puertos a la función de actualización del ComboBox de puertos
        self.ports_menu.triggered.connect(lambda action: self.combo_puertos.setCurrentText(action.text()))

        self.progress_timer = QTimer(self)
        self.progress_timer.timeout.connect(self.update_progress)

        # Crear e iniciar el monitor de puertos en un hilo
        self.port_monitor = PortMonitor()
        self.port_monitor_thread = threading.Thread(target=self.port_monitor.run)
        self.port_monitor_thread.daemon = True
        self.port_monitor.portChanged.connect(self.update_ports_menu)
        self.port_monitor_thread.start()

        self.console = QTextEdit()
        self.console.setMaximumHeight(200)
        self.console.setReadOnly(True)
        self.centralWidget().layout().addWidget(self.console)
                
        monitor_serial.clicked.connect(self.show_monitor_serial)
        action31.triggered.connect(self.show_monitor_serial)

    def show_preferences_dialog(self):
        self.preferences_dialog = PreferencesDialog(self)
        self.preferences_dialog.exec_()


    def loadLocalFile(self, filename):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        filepath = os.path.join(script_dir, "html", filename)
        url = QUrl.fromLocalFile(filepath)
        self.webview.load(url)

    def write_to_ino(self, info):
        if isinstance(info, list):
            with open("extracted_code.ino", "w") as file:
                file.write("\n".join(info))
            print("El código ha sido guardado en extracted_code.ino")
        else:
            print("La información extraída no es válida.")

    def action1_triggered(self):
        print("Opción 1 seleccionada")

    def action2_triggered(self):
        print("Opción 2 seleccionada")

    def compilar_clicked(self):
        self.write_to_console("Compilar:")
        
        # Obtener la información del combo box
        combo_text = self.combo.currentText()
        self.write_to_console("Selección del combo box: " + combo_text)
        
        # Ejecutar JavaScript para extraer información de la clase
        self.webview.page().runJavaScript('''
            var elements = document.getElementsByClassName('hljs cpp'); // Clase para el código C++
            var info = [];
            for (var i = 0; i < elements.length; i++) {
                info.push(elements[i].innerText);
            }
            info;
        ''', self.extract_info_from_class)

        # Obtener la información del puerto serial
        ports = serial.tools.list_ports.comports()
        serial_ports = [port.device for port in ports]
        self.write_to_console("Puertos serie disponibles: " + str(serial_ports))
        # Compilar antes de subir
        #compile_sketch(URI, FILE, CPUc)
        self.runCommandCompile()

    def subir_clicked(self):
        self.write_to_console("Subir:")
        # Ejecutar JavaScript para extraer información de la clase
        self.webview.page().runJavaScript('''
            var elements = document.getElementsByClassName('hljs cpp'); // Clase para el código C++
            var info = [];
            for (var i = 0; i < elements.length; i++) {
                info.push(elements[i].innerText);
            }
            info;
        ''', self.extract_info_from_class)
        # Compilar antes de subir
        #compile_sketch(URI, FILE, CPUc)
        # Subir
        #upload_sketch(URI, FILE, CPUu, PORT)
        print("1ERO COMPILAR")
        #self.runCommandCompile()
        print("2DO SUBIR")
        self.runCommandUpload()

    def current_text_changed(self, s):
        print("Current text: ", s)
    
    def update_ports_menu(self):
        # Limpiar el menú de puertos COM
        self.ports_menu.clear()
        self.combo_puertos.clear()

        # Obtener los puertos COM disponibles
        ports = serial.tools.list_ports.comports()

        # Verificar si hay puertos disponibles
        if ports:
            # Agregar las opciones de puerto
            for port in ports:
                port_action = QAction(port.device, self)
                port_action.triggered.connect(self.update_ports_combo)
                self.ports_menu.addAction(port_action)
                self.combo_puertos.addItem(port.device)
                self.combo_puertos.setEnabled(True)
        else:
            # Agregar mensaje si no hay puertos disponibles
            no_ports_action = QAction("No hay puertos COM disponibles", self)
            no_ports_action.setEnabled(False)
            self.ports_menu.addAction(no_ports_action)
            self.combo_puertos.addItem("No hay puertos COM disponibles")
            self.combo_puertos.setEnabled(False)

    def update_menus(self):
        # Obtener el índice seleccionado en el QComboBox
        index = self.combo.currentIndex()

        # Actualizar el menú de placas
        if index == 0:
            self.option1.trigger()
        elif index == 1:
            self.option2.trigger()
        elif index == 2:
            self.option3.trigger()
        elif index == 3:
            self.option4.trigger()
        elif index == 4:
            self.option5.trigger()

    def show_board_options(self):
        print("Mostrar opciones de placa")

    def show_port_options(self):
        print("Mostrar opciones de puerto")
    
    def exit_application(self):
        self.write_to_console("Saliendo de la aplicación")
        self.close()

    def open_new_file_window(self):
        # Crear una nueva instancia de la ventana para el nuevo archivo
        self.new_file_window = WebViewer()
        self.new_file_window.loadLocalFile('index.html')
        self.new_file_window.show()

    def update_ports_combo(self):
        # Limpiar el ComboBox de puertos COM
        self.combo_puertos.clear()

        # Obtener los puertos COM disponibles
        ports = serial.tools.list_ports.comports()

        # Verificar si hay puertos disponibles
        if ports:
            # Agregar las opciones de puerto
            for port in ports:
                self.combo_puertos.addItem(port.device)
        else:
            # Agregar mensaje si no hay puertos disponibles
            self.combo_puertos.addItem("No hay puertos COM disponibles")
            self.combo_puertos.setEnabled(False)
    
    def update_progress(self):
         # Obtener el valor actual de la barra de progreso
        current_value = 0

        # Aumentar gradualmente hasta el 80%
        target_value = 80
        step = 40  # Aumentar en pasos de 5

        if current_value < target_value:
            new_value = current_value + step
            self.progress_bar.setValue(new_value)
        else:
            # Detener el temporizador cuando alcanza el 80%
            self.timer.stop()
    
    def write_to_console(self, message):
        self.console.append(message)
    
    def runCommandCompile(self):
        self.console.clear()
        self.update_progress()
        
        if hasattr(self, 'runner') and self.runner.isRunning():
            self.runner.terminate()  # Detener el hilo anterior si está corriendo
            self.runner.wait()
        
        # Obtener la ubicación del compilador guardada en la configuración
        arduinoDev = config_manager.get_value('compiler_location')
        arduinoDev_folder = os.path.dirname(arduinoDev)
        folder_actual = os.getcwd()

        command = f'''{arduinoDev_folder}/arduino-builder -compile -logger=machine -hardware {arduinoDev_folder}/hardware -tools {arduinoDev_folder}/tools-builder -tools {arduinoDev_folder}/hardware/tools/avr -built-in-libraries {arduinoDev_folder}/libraries -fqbn arduino:avr:uno -vid-pid 1A86_7523 -ide-version=10815 -build-path {folder_actual}/build -warnings=none -build-cache {folder_actual}/Temp/arduino_cache_914083 -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.arduinoOTA.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.3.0.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino17.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path={arduinoDev_folder}/hardware/tools/avr -verbose {folder_actual}/extracted_code.ino'''
        print(command)
        self.runner_com = CommandRunner(command)
        self.runner_com.output_received.connect(self.updateOutput)
        self.runner_com.start()
        self.progress_timer_2 = QTimer(self)
        self.progress_timer_2.timeout.connect(self.update_progress_2)
        self.progress_timer_2.start(200)

    def runCommandUpload(self):
        self.update_progress()
        arduinoDev = config_manager.get_value('compiler_location')
        arduinoDev_folder = os.path.dirname(arduinoDev)
        folder_actual = os.getcwd()
        # Obtener la placa seleccionada
        selected_board = self.combo.currentText()

        # Obtener el puerto serial seleccionado
        selected_port = self.combo_puertos.currentText()

        cpu_mapping = {
            'Arduino Uno': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
            'Arduino Nano': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
            'Modular': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
            'Robot Betto': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
            'Arduino Mega': {'TEXT_CPU': 'atmega2560', 'PROCESSOR': 'wiring', 'BAUD': '115200'}
        }

        board_info = cpu_mapping.get(selected_board)

        TEXT_CPU = board_info['TEXT_CPU']
        PROCESSOR = board_info['PROCESSOR']
        BAUD = board_info['BAUD']

        #command = f'''{arduinoDev_folder}/hardware/tools/avr/bin/avrdude -C{arduinoDev_folder}/hardware/tools/avr/etc/avrdude.conf -v -patmega328p -carduino -PCOM3 -b115200 -D -Uflash:w:{folder_actual}/build/extracted_code.ino.hex:i'''

        command = f'''{arduinoDev_folder}/hardware/tools/avr/bin/avrdude -C{arduinoDev_folder}/hardware/tools/avr/etc/avrdude.conf -v -p{TEXT_CPU} -c{PROCESSOR} -P{selected_port} -b115200 -D -Uflash:w:{folder_actual}/build/extracted_code.ino.hex:i'''
        
        self.runner_up = CommandRunner(command)
        self.runner_up.output_received.connect(self.updateOutput)
        self.runner_up.start()
        # Iniciar el temporizador para llenar la barra de progreso del 80% al 100%
        self.progress_timer_2 = QTimer(self)
        self.progress_timer_2.timeout.connect(self.update_progress_2)
        self.progress_timer_2.start(200)
    
    def update_progress_2(self):
        # Obtener el valor actual de la barra de progreso
        current_value = self.progress_bar.value()

        # Aumentar gradualmente hasta el 100%
        target_value = 100
        step = 20  # Aumentar en pasos de 5

        if current_value < target_value:
            new_value = current_value + step
            self.progress_bar.setValue(new_value)
        else:
            # Detener el temporizador cuando alcanza el 100%
            self.progress_timer_2.stop()
            
    def updateOutput(self, output):
        self.console.append(output)

    def export_as(self, extension):
        print("Se exporta: ",extension)

    def closeEvent(self, event):
        if hasattr(self, 'runner'):
            if self.runner.isRunning():
                self.runner.terminate()
                self.runner.wait()
        event.accept()
    
    def show_monitor_serial(self):
        self.monitor_window = MainWindow()
        self.monitor_window.show()
    
    def save_file_as(self):
        
        initial_dir = os.path.join(os.getcwd(), "saves")

        # Mostrar el diálogo para seleccionar la ubicación y el nombre del archivo
        file_dialog = QFileDialog(self)
        file_dialog.setFileMode(QFileDialog.AnyFile)
        file_dialog.setNameFilter("Archivos BLY (*.bly)")
        file_dialog.setDefaultSuffix(".bly")
        file_dialog.setDirectory(initial_dir)

        if file_dialog.exec_():
            # Obtener la ubicación y el nombre del archivo seleccionado por el usuario
            selected_file = file_dialog.selectedFiles()[0]
            # Obtener el contenido del archivo .bly desde la página web y guardar
            self.webview.page().runJavaScript('''
            var xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
            xml;''', lambda result: self.save_to_file(result, selected_file))
        else:
            # El usuario canceló el diálogo
            QMessageBox.warning(self, "Guardar Cancelado", "La operación de guardar como fue cancelada.")

    def extract_info_from_class(self, result):
        # Guardar el contenido obtenido en un archivo .ino
        with open("extracted_code.ino", "w") as file:
            file.write("\n".join(result))

    def save_to_file(self, result, file_path):
        print(result)
        # Guardar el contenido obtenido en el archivo seleccionado por el usuario
        with open(file_path, "w") as file:
            file.write(result)
        QMessageBox.information(self, "Guardado Exitoso", f"El archivo se guardó correctamente en: {file_path}")
    
    def show_code(self):
        # Ejecutar JavaScript para mostrar el código
        self.webview.page().runJavaScript('''
            document.getElementById("code").style.display = "block";
            document.getElementById("blockly").style.width = "66%";
            document.getElementById("blockly").style.height = "100%";
        ''')

    def hide_code(self):
        # Ejecutar JavaScript para ocultar el código y agrandar Blockly
        self.webview.page().runJavaScript('''
            document.getElementById("code").style.display = "none";
            document.getElementById("blockly").style.width = "100%";
            document.getElementById("blockly").style.height = "100%";
        ''')
    
    def open_file(self):
        # Mostrar un cuadro de diálogo para seleccionar el archivo
        file_dialog = QFileDialog(self)
        file_dialog.setNameFilter("Archivos BLY (*.bly)")  # Filtro para archivos .bly
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        initial_dir_open = os.path.join(os.getcwd(), "examples")
        file_dialog.setDirectory(initial_dir_open)

        if file_dialog.exec_():
            # Obtener la ruta del archivo seleccionado
            selected_files = file_dialog.selectedFiles()

            # Verificar si se seleccionó algún archivo
            if selected_files:
                file_path = selected_files[0]

                # Leer el contenido del archivo
                with open(file_path, "r") as file:
                    content = file.read().replace('\n','')

                self.open_new_file_window_content(content=content)

    def open_new_file_window_content(self, content):
        # Crear una nueva instancia de la ventana para el nuevo archivo
        self.new_file_window = WebViewer()
        self.new_file_window.loadLocalFile('index.html')
        self.new_file_window.show()
        self.new_file_window.webview.loadFinished.connect(lambda ok: self.run_javascript_after_load(ok, content))

    def run_javascript_after_load(self, ok, content):
        if ok:
            self.new_file_window.webview.page().runJavaScript(f'''
                var xml = '{content}';
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), Blockly.Xml.textToDom(xml));''')

    def export_as_ino(self):
        initial_dir = os.path.join(os.getcwd(), "saves")

        # Mostrar el diálogo para seleccionar la ubicación y el nombre del archivo
        file_dialog = QFileDialog(self)
        file_dialog.setFileMode(QFileDialog.AnyFile)
        file_dialog.setNameFilter("Archivos INO (*.ino)")
        file_dialog.setDefaultSuffix(".ino")
        file_dialog.setDirectory(initial_dir)

        if file_dialog.exec_():
            # Obtener la ubicación y el nombre del archivo seleccionado por el usuario
            selected_file = file_dialog.selectedFiles()[0]
            # Obtener el contenido del archivo .bly desde la página web y guardar
            self.webview.page().runJavaScript('''
            var xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
            xml;''', lambda result: self.save_to_ino(result, selected_file))
        else:
            # El usuario canceló el diálogo
            QMessageBox.warning(self, "Guardar Cancelado", "La operación de guardar como INO fue cancelada.")

    def save_to_ino(self, result, file_path):
        # Guardar el contenido obtenido en el archivo seleccionado por el usuario
        with open(file_path, "w") as file:
            file.write(result)
        QMessageBox.information(self, "Guardado Exitoso", f"El archivo se guardó correctamente como INO en: {file_path}")

    def show_about_dialog(self):
        # Crear el cuadro de diálogo "Acerca de"
        about_dialog = QMessageBox()
        about_dialog.setWindowTitle("Acerca de Fab Blocks IDE")
        about_dialog.setWindowIcon(QIcon("icons/codigo.ico"))

        # Texto con formato HTML
        about_text = ("<p style='font-size: 14px; text-align: center;'>"
              "<img src='icons/codigo.ico' width='64' height='64' /><br>"
              "<b>Fab Blocks IDE</b><br>"
              "<br>Versión: 0.2<br>"
              "Fecha de lanzamiento: 15 de febrero de 2024<br>"
              "Desarrollado por: Codigo SAC<br><br>"
              "En Fab Blocks IDE se pueden configurar módulos, que son dispositivos que permiten la programación de Arduino con actuadores y sensores mediante Modular, nuestra propia interfaz de programación<br><br>"
              "Sitio web: <a href='https://fablab.pe/cursos'>https://fablab.pe/cursos</a><br><br>"
              "Soporte: <a href='mailto:coaquiraleonardo19@gmail.com'>coaquiraleonardo19@gmail.com</a><br>"
              "Programador: <a href='https://www.linkedin.com/in/leonardo-coaquira-b3490a25a/'>Leonardo Coaquira</a><br>"
              "</p>"
              )

        about_dialog.setText(about_text)
        about_dialog.setTextFormat(Qt.RichText)

        # Crear un botón "OK"
        ok_button = QPushButton("OK")
        ok_button.setStyleSheet("background-color: #007BFF; color: white; font-weight: bold; border: none;")
        ok_button.clicked.connect(about_dialog.accept)

        # Crear un layout vertical y agregar los elementos al cuadro de diálogo
        layout = QVBoxLayout()
        layout.addWidget(ok_button)
        layout.setAlignment(Qt.AlignCenter)

        about_dialog.setLayout(layout)

        # Mostrar el cuadro de diálogo
        about_dialog.exec_()

    def show_forum_dialog(self):
        # Crear el cuadro de diálogo del foro
        forum_dialog = QDialog(self)
        forum_dialog.setWindowTitle("Fab Blocks IDE")
        forum_dialog.setGeometry(100, 100, 800, 600)

        # Crear un layout vertical para el diálogo del foro
        layout = QVBoxLayout(forum_dialog)
        
        # Crear un QWebEngineView para mostrar el foro de GitHub
        web_view = QWebEngineView()
        web_view.load(QUrl("https://github.com/codigorobotico/Fab-Blocks-IDE/issues/"))
        layout.addWidget(web_view)

        # Mostrar el diálogo del foro
        forum_dialog.exec_()
        
    def open_link(self,url):
        webbrowser.open(url)
    
    def open_example(self, example_filename):
        # Construir la ruta completa del ejemplo dentro de la carpeta "examples/"
        example_path = os.path.join("examples", example_filename)

        # Verificar si el archivo del ejemplo existe
        if os.path.exists(example_path):
            # Leer el contenido del archivo del ejemplo
            with open(example_path, "r") as file:
                content = file.read().replace('\n','')

            self.open_new_file_window_content(content=content)
        else:
            print(f"El archivo del ejemplo en la ruta {example_path} no existe.")


if __name__ == '__main__':
    app = QApplication(sys.argv)
    config_manager = ConfigManager()
    viewer = WebViewer()
    viewer.show()
    about_shortcut = QShortcut(QKeySequence("Ctrl+H"), viewer)
    about_shortcut.activated.connect(viewer.show_about_dialog)
    exit_shortcut = QShortcut(QKeySequence("Ctrl+Q"), viewer)
    exit_shortcut.activated.connect(viewer.exit_application)
    sys.exit(app.exec_())