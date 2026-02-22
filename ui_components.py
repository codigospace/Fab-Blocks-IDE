"""
Componentes de interfaz de usuario para Fab Blocks IDE

Este módulo proporciona las clases y factory methods para crear componentes
de la interfaz de usuario como:
- Barra de herramientas con botones
- ComboBoxes (selector de placas y puertos)
- Barra de progreso
- Widget de consola de salida

Patrón: Factory Method y Builder para crear componentes reutilizables
Soporte multiidioma: Utiliza i18n para traducciones ES/EN

Autor: Código Abierto Fab Blocks IDE
Licencia: MIT
"""
from PyQt5.QtWidgets import (
    QHBoxLayout, QPushButton, QComboBox, QLabel,
    QProgressBar, QTextEdit, QVBoxLayout
)
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import QSize
from i18n import get_text

# Constantes de configuración UI
iconSize = 32
BUTTON_WIDTH = 120
BUTTON_HEIGHT = 40


class ToolbarBuilder:    
    def __init__(self, window):
        self.window = window
    
    def build_toolbar(self):
        # Crear layout horizontal para botones
        button_layout = QHBoxLayout()
        
        # Crear botones principales (retorna diccionario con referencias)
        buttons_dict = self._create_main_buttons()
        for button in buttons_dict.values():
            button_layout.addWidget(button)
        
        # Agregar etiqueta y combo de placas
        label_placas = QLabel(get_text('label.board'))
        button_layout.addWidget(label_placas)
        button_layout.addWidget(self.window.combo)
        
        # Agregar etiqueta y combo de puertos
        label_puertos = QLabel(get_text('label.port'))
        button_layout.addWidget(label_puertos)
        button_layout.addWidget(self.window.combo_puertos)
        
        # Agregar barra de progreso
        button_layout.addWidget(self.window.progress_bar, 2)
        
        # Agregar botones especiales
        graphic_serial = self._create_serial_graphic_button()
        monitor_serial = self._create_serial_monitor_button()
        
        button_layout.addWidget(graphic_serial)
        button_layout.addWidget(monitor_serial)
        
        button_layout.addStretch()
        
        # Guardar referencias en la ventana para actualizaciones posteriores
        self.window.toolbar_buttons = buttons_dict
        self.window.graphic_serial_btn = graphic_serial
        self.window.monitor_serial_btn = monitor_serial
        
        return button_layout, graphic_serial, monitor_serial
    
    def _create_main_buttons(self):
        buttons = {}
        
        button_compile = QPushButton(get_text('menu.verify'))
        button_compile.setIcon(QIcon("icons/compile.png"))
        button_compile.setIconSize(QSize(iconSize, iconSize))
        button_compile.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button_compile.clicked.connect(self.window.compilar_clicked)
        buttons['compile'] = button_compile
        
        button_upload = QPushButton(get_text('menu.upload'))
        button_upload.setIcon(QIcon("icons/upload.png"))
        button_upload.setIconSize(QSize(iconSize, iconSize))
        button_upload.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button_upload.clicked.connect(self.window.subir_clicked)
        buttons['upload'] = button_upload
        
        button_new = QPushButton(get_text('menu.new'))
        button_new.setIcon(QIcon("icons/new.png"))
        button_new.setIconSize(QSize(iconSize, iconSize))
        button_new.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button_new.clicked.connect(self.window.open_new_file_window)
        buttons['new'] = button_new
        
        button_open = QPushButton(get_text('menu.open'))
        button_open.setIcon(QIcon("icons/open.png"))
        button_open.setIconSize(QSize(iconSize, iconSize))
        button_open.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button_open.clicked.connect(self.window.open_file)
        buttons['open'] = button_open
        
        button_save = QPushButton(get_text('menu.save'))
        button_save.setIcon(QIcon("icons/save.png"))
        button_save.setIconSize(QSize(iconSize, iconSize))
        button_save.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button_save.clicked.connect(self.window.save_file_as)
        buttons['save'] = button_save
        
        return buttons
    
    def _create_serial_graphic_button(self):
        button = QPushButton(get_text('menu.serial_graph'))
        button.setIcon(QIcon("icons/graphic.png"))
        button.setIconSize(QSize(iconSize, iconSize))
        button.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button.clicked.connect(lambda: self.window.show_monitor_serial(True))
        return button
    
    def _create_serial_monitor_button(self):
        button = QPushButton(get_text('menu.serial_monitor'))
        button.setIcon(QIcon("icons/monitor_serial.png"))
        button.setIconSize(QSize(iconSize, iconSize))
        button.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        button.clicked.connect(lambda: self.window.show_monitor_serial(False))
        return button


class ComboBoxFactory:
    @staticmethod
    def create_boards_combo():
        combo = QComboBox()
        combo.addItem(get_text('board.uno'))
        combo.addItem(get_text('board.nano'))
        combo.addItem(get_text('board.mega'))
        combo.addItem(get_text('board.modular'))
        combo.addItem(get_text('board.betto'))
        combo.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        return combo
    
    @staticmethod
    def create_ports_combo():
        combo = QComboBox()
        combo.setFixedSize(BUTTON_WIDTH, BUTTON_HEIGHT)
        return combo


class ProgressBarFactory:    
    @staticmethod
    def create_progress_bar():
        progress_bar = QProgressBar()
        progress_bar.setRange(0, 100)
        return progress_bar


class ConsoleWidget:
    @staticmethod
    def create_console():
        console = QTextEdit()
        console.setMaximumHeight(180)
        console.setReadOnly(True)
        return console
