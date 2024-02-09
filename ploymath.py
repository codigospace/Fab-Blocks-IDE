import sys
import os
import serial.tools.list_ports
from PyQt5.QtCore import QUrl, pyqtSlot, QSize, QTimer, QObject, pyqtSignal
from PyQt5.QtWidgets import QMainWindow, QAction, QApplication, QHBoxLayout, QPushButton, QComboBox, QVBoxLayout, QProgressBar, QMenu, QLabel
from PyQt5.QtGui import QIcon
from PyQt5.QtWebEngineWidgets import QWebEngineView
from compileBat import compile_sketch
from uploadHex import upload_sketch
import threading
import time

URI = 'D:/Proyectos/modulinoQt'
CPUc = 'atmega328'
FILE = 'extracted_code'
CPUu = 'uno'
PORT = 'COM3'

iconSize = 32

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
        action6 = QAction(QIcon("icons/opcion2.png"), "Exportar Como", self)
        action7 = QAction(QIcon("icons/opcion2.png"), "Preferencias", self)
        action8 = QAction(QIcon("icons/opcion2.png"), "Salir", self)

        action1.triggered.connect(self.open_new_file_window)
        action8.triggered.connect(self.exit_application)

        menu.addAction(action1)
        menu.addAction(action2)
        menu.addAction(action3)
        menu.addAction(action4)
        menu.addAction(action5)
        menu.addAction(action6)
        menu.addSeparator()
        menu.addAction(action7)
        menu.addSeparator()
        menu.addAction(action8)

        # Crear un nuevo menú
        menu2 = self.menuBar().addMenu("Programa")

        # Agregar acciones al menú
        action21 = QAction("Verificar", self)
        action22 = QAction("Subir", self)
        action23 = QAction(QIcon("icons/opcion2.png"), "Exportar Como", self)
        action24 = QAction("Mostrar Codigo", self)
        action25 = QAction("Ocultar Codigo", self)

        menu2.addAction(action21)
        menu2.addAction(action22)
        menu2.addSeparator()
        menu2.addAction(action23)
        menu2.addSeparator()
        menu2.addAction(action24)
        menu2.addAction(action25)

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
        action32.triggered.connect(self.action2_triggered)

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
        button_layout.addWidget(label_placas)
        button_layout.addWidget(self.combo)
        button_layout.addWidget(label_puertos)
        button_layout.addWidget(self.combo_puertos)
        button_layout.addWidget(self.progress_bar,2)
        
        button_layout.addStretch()

        # Conectar botones a funciones
        button_compile.clicked.connect(self.compilar_clicked)
        button_upload.clicked.connect(self.subir_clicked)

        # Conectar la señal currentIndexChanged del QComboBox a la función de actualización de menús
        self.combo.currentIndexChanged.connect(self.update_menus)
        self.combo_puertos.currentIndexChanged.connect(self.update_menus)

        # Conectar las acciones del menú de placas a la función de actualización del combobox
        self.option1.triggered.connect(lambda: self.combo.setCurrentIndex(0))
        self.option2.triggered.connect(lambda: self.combo.setCurrentIndex(1))
        self.option3.triggered.connect(lambda: self.combo.setCurrentIndex(2))
        self.option4.triggered.connect(lambda: self.combo.setCurrentIndex(3))
        self.option5.triggered.connect(lambda: self.combo.setCurrentIndex(4))

        # Crear e iniciar el monitor de puertos en un hilo
        self.port_monitor = PortMonitor()
        self.port_monitor_thread = threading.Thread(target=self.port_monitor.run)
        self.port_monitor_thread.daemon = True
        self.port_monitor.portChanged.connect(self.update_ports_menu)
        self.port_monitor_thread.start()
    
    def compilar_clicked(self):
        print("Compilar:")
        
        # Obtener la información del combo box
        combo_text = self.combo.currentText()
        print("Selección del combo box:", combo_text)
        
        # Obtener la información del puerto serial
        ports = serial.tools.list_ports.comports()
        serial_ports = [port.device for port in ports]
        print("Puertos serie disponibles:", serial_ports)
        # Compilar antes de subir
        compile_sketch(URI, FILE, CPUc)

    def subir_clicked(self):
        print("Subir:")
        # Compilar antes de subir
        compile_sketch(URI, FILE, CPUc)
        # Subir
        upload_sketch(URI, FILE, CPUu, PORT)

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

    def exit_application(self):
        print("Saliendo de la aplicación")
        self.close()

    def open_new_file_window(self):
        # Crear una nueva instancia de la ventana para el nuevo archivo
        self.new_file_window = WebViewer()
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
    
    def action1_triggered(self):
        print("Acción 1 activada")
    def action2_triggered(self):
        print("Acción 1 activada")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    viewer = WebViewer()
    viewer.show()

    sys.exit(app.exec_())
