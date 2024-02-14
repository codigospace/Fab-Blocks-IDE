import sys
import os
import serial.tools.list_ports
from PyQt5.QtCore import QThread, QUrl, pyqtSlot, QSize, QTimer, QObject, pyqtSignal
from PyQt5.QtWidgets import QMainWindow, QAction, QApplication, QHBoxLayout, QPushButton, QComboBox, QVBoxLayout, QProgressBar, QMenu, QLabel, QTextEdit
from PyQt5.QtWidgets import QDialog, QLineEdit, QFileDialog, QCheckBox, QMessageBox
from PyQt5.QtGui import QIcon, QTextCursor, QKeySequence
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWidgets import QShortcut
import threading
import time
import subprocess
import json

from monitor_plotter import MainWindow
iconSize = 32

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
        action3 = QAction(QIcon("icons/opcion2.png"), "Ejemplos", self)
        action4 = QAction(QIcon("icons/opcion2.png"), "Guardar", self)
        action5 = QAction(QIcon("icons/opcion2.png"), "Guardar Como", self)
        action7 = QAction(QIcon("icons/opcion2.png"), "Preferencias", self)
        action8 = QAction(QIcon("icons/opcion2.png"), "Salir", self)

        
        action1.triggered.connect(self.open_new_file_window)
        action4.triggered.connect(self.save_file_as)
        action7.triggered.connect(self.show_preferences_dialog)
        action8.triggered.connect(self.exit_application)

        self.menu_export = QMenu("Exportar Como", self)
        
        # Agregar acciones al menú de exportación como
        self.action61 = QAction(".ino")
        self.action62 = QAction(".py")
        self.action63 = QAction(".ps")

        self.menu_export.addAction(self.action61)
        self.menu_export.addAction(self.action62)
        self.menu_export.addAction(self.action63)

        menu.addAction(action1)
        menu.addAction(action2)
        menu.addAction(action3)
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
        self.option4 = QAction("Modular V1", self)
        self.option5 = QAction("Robot Betto", self)

        self.placas_menu.addAction(self.option1)
        self.placas_menu.addAction(self.option2)
        self.placas_menu.addAction(self.option3)
        self.placas_menu.addAction(self.option4)
        self.placas_menu.addAction(self.option5)

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
        
        # Agregar el menú de herramientas al menú principal
        menu4.addAction(action41)
        menu4.addAction(action42)
        menu4.addAction(action43)
        menu4.addSeparator()
        menu4.addAction(action44)
        menu4.addSeparator()
        menu4.addAction(action45)

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
        self.combo.addItem("Modular V1")
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
        new_upload.clicked.connect(self.open_new_file_window)

        self.ports_menu.aboutToShow.connect(self.update_ports_menu)

        #Guardado de archivos
        save_file_button.clicked.connect(self.save_file_as)

        # Conectar la señal currentIndexChanged del QComboBox a la función de actualización de menús
        self.combo.currentIndexChanged.connect(self.update_menus)
        self.combo_puertos.currentIndexChanged.connect(self.update_menus)

        # Conectar las acciones del menú de placas a la función de actualización del combobox
        self.option1.triggered.connect(lambda: self.combo.setCurrentIndex(0))
        self.option2.triggered.connect(lambda: self.combo.setCurrentIndex(1))
        self.option3.triggered.connect(lambda: self.combo.setCurrentIndex(2))
        self.option4.triggered.connect(lambda: self.combo.setCurrentIndex(3))
        self.option5.triggered.connect(lambda: self.combo.setCurrentIndex(4))

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

        #command = f"{arduinoDev_folder}/arduino-builder -compile -logger=machine -hardware {arduinoDev_folder}/hardware -tools {arduinoDev_folder}/tools-builder -tools {arduinoDev_folder}/hardware/tools/avr -built-in-libraries {arduinoDev_folder}/libraries -libraries 'D:/Programas/OneDrive - Instituto Superior Tecnológico Tecsup/Documentos/Arduino/libraries' -fqbn arduino:avr:uno -vid-pid 1A86_7523 -ide-version=10815 -build-path D:/Proyectos/modulinoQt/build -warnings=none -build-cache {arduinoDev_folder}/Temp/arduino_cache -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.arduinoOTA.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.3.0.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino17.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path={arduinoDev_folder}/hardware/tools/avr -verbose D:/Proyectos/modulinoQt/extracted_code.ino"

        command = f'''{arduinoDev_folder}/arduino-builder -compile -logger=machine -hardware {arduinoDev_folder}/hardware -tools {arduinoDev_folder}/tools-builder -tools {arduinoDev_folder}/hardware/tools/avr -built-in-libraries {arduinoDev_folder}/libraries -fqbn arduino:avr:uno -vid-pid 1A86_7523 -ide-version=10815 -build-path {folder_actual}/build -warnings=none -build-cache {folder_actual}/Temp/arduino_cache_914083 -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.arduinoOTA.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.3.0.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino17.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path={arduinoDev_folder}/hardware/tools/avr -verbose {folder_actual}/extracted_code.ino'''
        print(command)
        self.runner_com = CommandRunner(command)
        self.runner_com.output_received.connect(self.updateOutput)
        self.runner_com.start()
        # Iniciar el temporizador para llenar la barra de progreso del 80% al 100%
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
            'Modular V1': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
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
        # Mostrar el diálogo para seleccionar la ubicación y el nombre del archivo
        file_dialog = QFileDialog(self)
        file_dialog.setFileMode(QFileDialog.AnyFile)
        file_dialog.setNameFilter("Archivos INO (*.ino)")
        file_dialog.setDefaultSuffix(".ino")

        if file_dialog.exec_():
            # Obtener la ubicación y el nombre del archivo seleccionado por el usuario
            selected_file = file_dialog.selectedFiles()[0]
            # Obtener el contenido del archivo .ino desde la página web y guardar
            self.webview.page().runJavaScript('''
                var elements = document.getElementsByClassName('hljs cpp'); // Clase para el código C++
                var info = [];
                for (var i = 0; i < elements.length; i++) {
                    info.push(elements[i].innerText);
                }
                info;
            ''', lambda result: self.save_to_file(result, selected_file))
        else:
            # El usuario canceló el diálogo
            QMessageBox.warning(self, "Guardar Cancelado", "La operación de guardar como fue cancelada.")

    def extract_info_from_class(self, result):
        # Guardar el contenido obtenido en un archivo .ino
        with open("extracted_code.ino", "w") as file:
            file.write("\n".join(result))

    def save_to_file(self, result, file_path):
        # Guardar el contenido obtenido en el archivo seleccionado por el usuario
        with open(file_path, "w") as file:
            file.write("\n".join(result))
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

if __name__ == '__main__':
    app = QApplication(sys.argv)
    config_manager = ConfigManager()
    viewer = WebViewer()
    viewer.show()
    shortcut = QShortcut(QKeySequence("Ctrl+Q"), viewer)
    shortcut.activated.connect(viewer.exit_application)
    sys.exit(app.exec_())