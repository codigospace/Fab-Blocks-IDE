import sys
import os
import serial.tools.list_ports
from PyQt5.QtCore import QThread, QUrl, QSize, QTimer, QObject, pyqtSignal, Qt
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
import serial
from http.server import SimpleHTTPRequestHandler, HTTPServer
import socketserver
import functools

from monitor_plotter import MainWindow

# New imports from refactored modules
from config_manager import ConfigManager
from preferences_dialog import PreferencesDialog
from command_runner import CommandRunner
from server import LocalHTTPServer
from utils import release_all_serial_ports, ConsoleOutput
from port_monitor import PortMonitor

if getattr(sys, 'frozen', False):
    import pyi_splash

iconSize = 32

class WebViewer(QMainWindow):
    def __init__(self, config_manager):
        super().__init__()
        self.config_manager = config_manager
        # Buffer para mensajes de consola que ocurran antes de que el widget exista
        self._console_buffer = []
        # Flag para indicar si esta instancia es la propietaria del servidor HTTP local
        self._local_http_server_owner = False
        self.initUI()
        self.monitor_window = None

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
        self.menu_proyectos = QMenu("Proyectos",self)
        
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
        submenu_robotica = QMenu("Robotica", self)
        submenu_steam = QMenu("STEAM", self)
        submenu_control = QMenu("Control", self)
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
        action_arduino_example1.triggered.connect(lambda: self.open_example("Arduino/01-variables.fab"))
        action_arduino_example2.triggered.connect(lambda: self.open_example("Arduino/02-variables-text.fab"))
        action_arduino_example3.triggered.connect(lambda: self.open_example("Arduino/03-variables-serial.fab"))
        action_arduino_example4.triggered.connect(lambda: self.open_example("Arduino/04-led-blink.fab"))
        action_arduino_example5.triggered.connect(lambda: self.open_example("Arduino/05-led-blink-3.fab"))
        action_arduino_example6.triggered.connect(lambda: self.open_example("Arduino/06-led-blink-for.fab"))
        action_arduino_example7.triggered.connect(lambda: self.open_example("Arduino/07-led-knight-rider.fab"))
        action_arduino_example8.triggered.connect(lambda: self.open_example("Arduino/08-led-fade.fab"))
        action_arduino_example9.triggered.connect(lambda: self.open_example("Arduino/09-serial-counter.fab"))
        action_arduino_example10.triggered.connect(lambda: self.open_example("Arduino/10-serial-led-switch.fab"))

        action_modular_v1_example1 = QAction("Comunicacion Serial", self)
        submenu_modular_v1.addAction(action_modular_v1_example1)
        action_modular_v1_example1.triggered.connect(lambda: self.open_example("Modular/1_Comunicación_Serial.fab"))
        
        action_modular_v1_example2 = QAction("Actuador Digital", self)
        submenu_modular_v1.addAction(action_modular_v1_example2)
        action_modular_v1_example2.triggered.connect(lambda: self.open_example("Modular/2_Actuador_Digital.fab"))

        action_modular_v1_example3 = QAction("Sensor Digital", self)
        submenu_modular_v1.addAction(action_modular_v1_example3)
        action_modular_v1_example3.triggered.connect(lambda: self.open_example("Modular/3_Sensor_Digital.fab"))
        
        action_modular_v1_example4 = QAction("Sensor Analogico", self)
        submenu_modular_v1.addAction(action_modular_v1_example4)
        action_modular_v1_example4.triggered.connect(lambda: self.open_example("Modular/4_Sensor_Analogico.fab"))
        
        action_modular_v1_example5 = QAction("Actuador Servomotor", self)
        submenu_modular_v1.addAction(action_modular_v1_example5)
        action_modular_v1_example5.triggered.connect(lambda: self.open_example("Modular/5_Actuador_Servomotor.fab"))
        
        action_modular_v1_example6 = QAction("Sensor Ultrasonido", self)
        submenu_modular_v1.addAction(action_modular_v1_example6)
        action_modular_v1_example6.triggered.connect(lambda: self.open_example("Modular/6_Sensor_Ultrasonido.fab"))
        
        action_modular_v1_example7 = QAction("Actuador Motor DC", self)
        submenu_modular_v1.addAction(action_modular_v1_example7)
        action_modular_v1_example7.triggered.connect(lambda: self.open_example("Modular/7_Actuador_Motor_DC.fab"))
        
        action_robot_betto_example1 = QAction("Betto Caminando", self)
        submenu_robot_betto.addAction(action_robot_betto_example1)
        action_robot_betto_example1.triggered.connect(lambda: self.open_example("Betto/1_Betto_Caminando.fab"))

        action_robot_betto_example2 = QAction("Betto Bailando", self)
        submenu_robot_betto.addAction(action_robot_betto_example2)
        action_robot_betto_example2.triggered.connect(lambda: self.open_example("Betto/2_Betto_Bailando.fab"))

        action_robot_betto_example3 = QAction("Betto Cantando", self)
        submenu_robot_betto.addAction(action_robot_betto_example3)
        action_robot_betto_example3.triggered.connect(lambda: self.open_example("Betto/3_Betto_Cantando.fab"))

        action_robot_betto_example4 = QAction("Betto Evitando", self)
        submenu_robot_betto.addAction(action_robot_betto_example4)
        action_robot_betto_example4.triggered.connect(lambda: self.open_example("Betto/4_Betto_Evitando.fab"))

        action_robot_betto_example5 = QAction("Betto IoT", self)
        submenu_robot_betto.addAction(action_robot_betto_example5)
        action_robot_betto_example5.triggered.connect(lambda: self.open_example("Betto/5_Betto_IoT.fab"))

        action_carlitto_example1 = QAction("Carlitto Motor", self)
        submenu_carlitto.addAction(action_carlitto_example1)
        action_carlitto_example1.triggered.connect(lambda: self.open_example("Carlitto/1_Carlitto_Motor.fab"))

        action_carlitto_example2 = QAction("Carlitto Moviendose", self)
        submenu_carlitto.addAction(action_carlitto_example2)
        action_carlitto_example2.triggered.connect(lambda: self.open_example("Carlitto/2_Carlitto_Moviendose.fab"))
        
        action_carlitto_example3 = QAction("Carlitto Bluetooth", self)
        submenu_carlitto.addAction(action_carlitto_example3)
        action_carlitto_example3.triggered.connect(lambda: self.open_example("Carlitto/3_Carlitto_Bluetooth.fab"))

        action_carlitto_example4 = QAction("Carlitto IoT", self)
        submenu_carlitto.addAction(action_carlitto_example4)
        action_carlitto_example4.triggered.connect(lambda: self.open_example("Carlitto/4_Carlitto_IoT.fab"))
        
        action_blass_example1 = QAction("Blass Servo", self)
        submenu_blass.addAction(action_blass_example1)
        action_blass_example1.triggered.connect(lambda: self.open_example("Blass/1_Blass_Servo.fab"))

        action_blass_example2 = QAction("Blass Moviendose", self)
        submenu_blass.addAction(action_blass_example2)
        action_blass_example2.triggered.connect(lambda: self.open_example("Blass/2_Blass_Moviendose.fab"))

        action_blass_example3 = QAction("Blass Bluetooth", self)
        submenu_blass.addAction(action_blass_example3)
        action_blass_example3.triggered.connect(lambda: self.open_example("Blass/3_Blass_Bluetooth.fab"))

        action_blass_example4 = QAction("Blass IoT", self)
        submenu_blass.addAction(action_blass_example4)
        action_blass_example4.triggered.connect(lambda: self.open_example("Blass/4_Blass_IoT.fab"))

        action_blass_project_1 = QAction("Por añadir", self)
        submenu_robotica.addAction(action_blass_project_1)
        action_blass_project_1.setEnabled(False)
        action_blass_project_2 = QAction("Por añadir", self)
        submenu_steam.addAction(action_blass_project_2)
        action_blass_project_2.setEnabled(False)
        action_blass_project_3 = QAction("Por añadir", self)
        submenu_control.addAction(action_blass_project_3)
        action_blass_project_3.setEnabled(False)
        self.menu_examples.addMenu(submenu_arduino)
        self.menu_examples.addMenu(submenu_modular_v1)
        self.menu_examples.addMenu(submenu_robot_betto)
        self.menu_examples.addMenu(submenu_carlitto)
        self.menu_examples.addMenu(submenu_blass)
        self.menu_proyectos.addMenu(submenu_robotica)
        self.menu_proyectos.addMenu(submenu_steam)
        self.menu_proyectos.addMenu(submenu_control)
        self.menu_export.addAction(self.action61)
        self.menu_export.addAction(self.action62)
        self.menu_export.addAction(self.action63)
        self.action62.setEnabled(False)
        self.action63.setEnabled(False)
        menu.addAction(action1)
        menu.addAction(action2)
        menu.addMenu(self.menu_examples)
        menu.addMenu(self.menu_proyectos)
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
        
        action26 = QAction("Mostrar Consola", self)
        action27 = QAction("Ocultar Consola", self)
        # Agregar el menú de herramientas al menú principal
        menu3.addAction(action31)
        menu3.addAction(action32)
        menu3.addSeparator()
        menu3.addMenu(self.placas_menu)
        menu3.addMenu(self.ports_menu)
        menu3.addSeparator()
        menu3.addAction(action26)
        menu3.addAction(action27)
        action26.triggered.connect(self.show_console)
        action27.triggered.connect(self.hide_console)
        # Crear un nuevo menú
        menu4 = self.menuBar().addMenu("Ayuda")
        # Agregar acciones al menú
        action41 = QAction("Primeros Pasos", self)
        action42 = QAction("Tutoriales", self)
        action43 = QAction("FAQ", self)
        action46 = QAction("Foro", self)
        action44 = QAction("Contactenos", self)
        action45 = QAction("Acerca de", self)
        # Conectar las acciones a las funciones correspondientes
        action41.triggered.connect(lambda: self.open_link("https://codigo.space/primerospasos/"))
        action42.triggered.connect(lambda: self.open_link("https://codigo.space/tutorialeside/"))
        action43.triggered.connect(lambda: self.open_link("https://codigo.space/faq/"))
        action44.triggered.connect(lambda: self.open_link("https://wa.me/+51984425782"))
        action45.triggered.connect(self.show_about_dialog)
        action46.triggered.connect(lambda: self.open_link("https://github.com/codigospace/Fab-Blocks-IDE/issues"))
        
        # Agregar el menú de herramientas al menú principal
        menu4.addAction(action41)
        menu4.addAction(action42)
        menu4.addAction(action43)
        menu4.addSeparator()
        menu4.addAction(action44)
        menu4.addAction(action46)
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
        #graphic_serial.setVisible(False) 
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
        self.console.setMaximumHeight(180)
        self.console.setReadOnly(True)
        # Volcar mensajes en buffer (si los hubo) al crear el widget
        if hasattr(self, '_console_buffer') and self._console_buffer:
            for m in self._console_buffer:
                self.console.append(m)
            self._console_buffer = []
        self.centralWidget().layout().addWidget(self.console)
                
        monitor_serial.clicked.connect(lambda: self.show_monitor_serial(False))
        graphic_serial.clicked.connect(lambda: self.show_monitor_serial(True))
        action31.triggered.connect(lambda: self.show_monitor_serial(False))
        action32.triggered.connect(lambda: self.show_monitor_serial(True))

    def show_preferences_dialog(self):
        self.preferences_dialog = PreferencesDialog(self.config_manager, self)
        self.preferences_dialog.exec_()

    def loadLocalFile(self, filename):
        # Obtener el directorio en el que se encuentra el script
        script_dir = os.path.dirname(os.path.realpath(__file__))
        html_dir = os.path.join(script_dir, "html")

        # Intentar iniciar un servidor HTTP local ligero para servir solo dentro de la app
        if os.path.isdir(html_dir):
            try:
                if not hasattr(self, 'local_http_server') or not getattr(self.local_http_server, 'running', False):
                    self.local_http_server = LocalHTTPServer(directory=html_dir, host='127.0.0.1', port=0)
                    self.local_http_server.start()
                    if getattr(self.local_http_server, 'running', False):
                        # Si iniciamos el servidor local, marcamos ownership para poder detenerlo al salir
                        self._local_http_server_owner = True
                        self.write_to_console(f"Servidor HTTP local iniciado en http://127.0.0.1:{self.local_http_server.port}/")
                    else:
                        self._local_http_server_owner = False
                        self.write_to_console("No se pudo iniciar el servidor HTTP local; cargando archivo local.")
                else:
                    # Ya existe un servidor corriendo: lo usamos pero no somos propietarios
                    self._local_http_server_owner = False
            except Exception as e:
                self.write_to_console(f"Error al iniciar servidor HTTP local: {e}")

        # Preferir cargar vía HTTP si el servidor local está activo
        if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False):
            url = QUrl(f"http://127.0.0.1:{self.local_http_server.port}/{filename}")
            self.webview.load(url)
        else:
            # Construir la ruta al archivo HTML
            filepath = os.path.join(script_dir, "html", filename)
            # Cargar el archivo HTML desde archivo local
            url = QUrl.fromLocalFile(filepath)
            self.webview.load(url)

    def write_to_ino(self, info):
        if isinstance(info, list):
            with open("extracted_code.ino", "w") as file:
                file.write("\n".join(info))
            print("El código ha sido guardado en extracted_code.ino")
        else:
            print("La información extraída no es válida.")

    def compilar_clicked(self):
        release_all_serial_ports()
        self.console.clear()
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
        release_all_serial_ports()
        self.console.clear()
        # Ejecutar JavaScript para extraer información de la clase
        self.webview.page().runJavaScript('''
            var elements = document.getElementsByClassName('hljs cpp'); // Clase para el código C++
            var info = [];
            for (var i = 0; i < elements.length; i++) {
                info.push(elements[i].innerText);
            }
            info;
        ''', self.extract_info_from_html)

    def compile_finished(self):
        print("2DO SUBIR")
        self.runCommandUpload()

    def extract_info_from_html(self, info):
        # Compilar antes de subir
        self.extract_info_from_class(info)
        print("1ERO COMPILAR")
        self.runCommandCompile()
        # Conectar la señal de compilación terminada a la función de subida
        self.runner_com.finished.connect(self.compile_finished)


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
        # Detener servidor HTTP local solo si esta instancia es la propietaria
        try:
            if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False) and getattr(self, '_local_http_server_owner', False):
                self.local_http_server.stop()
                self.write_to_console("Servidor HTTP local detenido.")
        except Exception as e:
            print(f"Error deteniendo servidor local: {e}")
        self.close()

    def open_new_file_window(self):
        # Crear una nueva instancia de la ventana para el nuevo archivo
        self.new_file_window = WebViewer(self.config_manager)
        # Si tenemos un servidor HTTP local corriendo, pasar la misma instancia a la ventana hija
        if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False):
            self.new_file_window.local_http_server = self.local_http_server
            self.new_file_window._local_http_server_owner = False
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
        current_value = 0

        target_value = 80
        step = 40

        if current_value < target_value:
            new_value = current_value + step
            self.progress_bar.setValue(new_value)
        else:
            self.timer.stop()
    
    def write_to_console(self, message):
        # Si el widget consola existe, mostrar mensaje y vaciar buffer previo
        if hasattr(self, 'console') and getattr(self, 'console') is not None:
            if hasattr(self, '_console_buffer') and self._console_buffer:
                for m in self._console_buffer:
                    self.console.append(m)
                self._console_buffer = []
            self.console.append(message)
        else:
            # Fallback: imprimir en stdout y almacenar en buffer para volcar después
            print(message)
            if not hasattr(self, '_console_buffer'):
                self._console_buffer = []
            self._console_buffer.append(message)
    
    def runCommandCompile(self):
        self.update_progress()
        selected_board = self.combo.currentText()
        
        cpu_mapping = {
            'Arduino Uno': {'TEXT_CPU': 'arduino:avr:uno'},
            'Arduino Nano': {'TEXT_CPU': 'arduino:avr:nano'},
            'Modular': {'TEXT_CPU': 'arduino:avr:nano'},
            'Robot Betto': {'TEXT_CPU': 'arduino:avr:nano'},
            'Arduino Mega': {'TEXT_CPU': 'arduino:avr:mega'}
        }

        board_info = cpu_mapping.get(selected_board)
        TEXT_CPU = board_info['TEXT_CPU']

        if hasattr(self, 'runner') and self.runner.isRunning():
            self.runner.terminate()
            self.runner.wait()
        
        arduinoDev = self.config_manager.get_value('compiler_location')
        arduinoDev_folder = os.path.dirname(arduinoDev)
        folder_actual = os.getcwd()

        command = f'''{arduinoDev_folder}/arduino-builder -compile -logger=machine -hardware {arduinoDev_folder}/hardware -tools {arduinoDev_folder}/tools-builder -tools {arduinoDev_folder}/hardware/tools/avr -built-in-libraries {arduinoDev_folder}/libraries -fqbn {TEXT_CPU} -vid-pid 1A86_7523 -ide-version=10815 -build-path {folder_actual}/build -warnings=none -build-cache {folder_actual}/Temp/arduino_cache_914083 -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.arduinoOTA.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.3.0.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino17.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path={arduinoDev_folder}/hardware/tools/avr -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path={arduinoDev_folder}/hardware/tools/avr -verbose {folder_actual}/extracted_code.ino'''
        self.runner_com = CommandRunner(command)
        self.runner_com.output_received.connect(self.updateOutput)
        self.runner_com.start()
        self.progress_timer_2 = QTimer(self)
        self.progress_timer_2.timeout.connect(self.update_progress_2)
        self.progress_timer_2.start(200)

    def runCommandUpload(self):
        self.update_progress()
        arduinoDev = self.config_manager.get_value('compiler_location')
        arduinoDev_folder = os.path.dirname(arduinoDev)
        folder_actual = os.getcwd()
        selected_board = self.combo.currentText()

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
    
    def is_graph_visible(self):
        return self.isVisible()
    
    def show_monitor_serial(self, show_graph_state):
        if self.monitor_window is None or not self.monitor_window.isVisible():
            self.monitor_window = MainWindow()
            self.monitor_window.show()
            self.monitor_window.toggle_graph(show_graph_state)
        else:
            self.monitor_window.activateWindow()
            self.monitor_window.raise_()
            self.monitor_window.toggle_graph(show_graph_state)
    
    def save_file_as(self):
        
        initial_dir = os.path.join(os.getcwd(), "saves")

        # Mostrar el diálogo para seleccionar la ubicación y el nombre del archivo
        file_dialog = QFileDialog(self)
        file_dialog.setFileMode(QFileDialog.AnyFile)
        file_dialog.setNameFilter("Archivos BLY (*.fab)")
        file_dialog.setDefaultSuffix(".fab")
        file_dialog.setDirectory(initial_dir)

        if file_dialog.exec_():
            # Obtener la ubicación y el nombre del archivo seleccionado por el usuario
            selected_file = file_dialog.selectedFiles()[0]
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
        file_dialog.setNameFilter("Archivos BLY (*.fab)")
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
        self.new_file_window = WebViewer(self.config_manager)
        # Reusar servidor HTTP local si ya existe
        if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False):
            self.new_file_window.local_http_server = self.local_http_server
            self.new_file_window._local_http_server_owner = False
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
            self.webview.page().runJavaScript('''
            var workspace = Blockly.getMainWorkspace();
            var arduinoCode = Blockly.Arduino.workspaceToCode(workspace);
            arduinoCode;''', lambda result: self.save_to_ino(result, selected_file))
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
            "<b>Desarrollado por:</b> Programación y Automatización Codigo S.A.C.<br><br>"
            "Fab Blocks IDE es una plataforma de programación para las tarjetas de desarrollo Modular V1 y Arduino, que permite el rápido y fácil prototipado de proyectos electrónicos utilizando la programación por bloques de Google Blockly.<br><br>"
            "Aprende cómo iniciar en <a href='https://codigo.space/primerospasos/'>https://codigo.space/primerospasos/</a><br>"
            "Compra el kit Modular V1 y sus módulos en <a href='https://codigo.space/tienda/'>https://codigo.space/tienda/</a><br>"
            "Aprende con nuestros cursos en <a href='https://fablab.pe/cursos/'>https://fablab.pe/cursos/</a><br><br>"
            "<b>Diseñado por:</b> Ulises Gordillo <a href='https://www.linkedin.com/in/ulisesgordillozapana/'>https://www.linkedin.com/in/ulisesgordillozapana/</a> - <a href='mailto:ulises.gordillo@gmail.com'>ulises.gordillo@gmail.com</a><br>"
            "<b>Programado por:</b> Leonardo Coaquira <a href='https://www.linkedin.com/in/leonardo-coaquira/'>https://www.linkedin.com/in/leonardo-coaquira/</a> - <a href='mailto:coaquiraleonardo19@gmail.com'>coaquiraleonardo19@gmail.com</a><br>"
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

    def show_console(self):
        self.console.show()

    def hide_console(self):
        self.console.hide()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    config_manager = ConfigManager()
    viewer = WebViewer(config_manager)
    if getattr(sys, 'frozen', False):
        pyi_splash.close()
    viewer.show()
    about_shortcut = QShortcut(QKeySequence("Ctrl+H"), viewer)
    about_shortcut.activated.connect(viewer.show_about_dialog)
    exit_shortcut = QShortcut(QKeySequence("Ctrl+Q"), viewer)
    exit_shortcut.activated.connect(viewer.exit_application)
    sys.exit(app.exec_())