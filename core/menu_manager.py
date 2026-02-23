"""
Gestión de menús para Fab Blocks IDE

Este módulo gestiona la creación y configuración de todos los menús de la 
aplicación principal. Incluye:
- Menú Archivo (nuevo, abrir, guardar, exportar)
- Menú Programa (compilar, subir, mostrar/ocultar código)
- Menú Herramientas (monitor serial, gráficos, placas, puertos)
- Menú Ayuda (tutoriales, FAQ, contacto)

Características:
- Definición centralizada de ejemplos y configuraciones
- Factory pattern para crear menús dinámicos
- Separación clara de responsabilidades
- Soporte multiidioma (i18n)

Autor: Código Abierto Fab Blocks IDE
Licencia: MIT
"""
from PyQt5.QtWidgets import QAction, QMenu
from PyQt5.QtGui import QIcon
import webbrowser
from core.i18n import get_text

# Opciones de placas soportadas
BOARD_OPTIONS = [
    "Arduino Uno",
    "Arduino Nano",
    "Arduino Mega",
    "Modular",
    "Robot Betto"
]

# Diccionarios de ejemplos con claves de traducción
ARDUINO_EXAMPLES = {
    'example.arduino.variables': "Arduino/01-variables.fab",
    'example.arduino.variables_text': "Arduino/02-variables-text.fab",
    'example.arduino.variables_serial': "Arduino/03-variables-serial.fab",
    'example.arduino.led_blink': "Arduino/04-led-blink.fab",
    'example.arduino.led_blink_3': "Arduino/05-led-blink-3.fab",
    'example.arduino.led_blink_for': "Arduino/06-led-blink-for.fab",
    'example.arduino.knight_rider': "Arduino/07-led-knight-rider.fab",
    'example.arduino.led_fade': "Arduino/08-led-fade.fab",
    'example.arduino.serial_counter': "Arduino/09-serial-counter.fab",
    'example.arduino.serial_switch': "Arduino/10-serial-led-switch.fab",
}

MODULAR_EXAMPLES = {
    'example.modular.serial_communication': "Modular/1_Comunicación_Serial.fab",
    'example.modular.digital_actuator': "Modular/2_Actuador_Digital.fab",
    'example.modular.digital_sensor': "Modular/3_Sensor_Digital.fab",
    'example.modular.analog_sensor': "Modular/4_Sensor_Analogico.fab",
    'example.modular.servo_actuator': "Modular/5_Actuador_Servomotor.fab",
    'example.modular.ultrasonic_sensor': "Modular/6_Sensor_Ultrasonido.fab",
    'example.modular.motor_dc': "Modular/7_Actuador_Motor_DC.fab",
}

BETTO_EXAMPLES = {
    'example.betto.walking': "Betto/1_Betto_Caminando.fab",
    'example.betto.dancing': "Betto/2_Betto_Bailando.fab",
    'example.betto.singing': "Betto/3_Betto_Cantando.fab",
    'example.betto.avoiding': "Betto/4_Betto_Evitando.fab",
    'example.betto.iot': "Betto/5_Betto_IoT.fab",
}

CARLITTO_EXAMPLES = {
    'example.carlitto.motor': "Carlitto/1_Carlitto_Motor.fab",
    'example.carlitto.moving': "Carlitto/2_Carlitto_Moviendose.fab",
    'example.carlitto.bluetooth': "Carlitto/3_Carlitto_Bluetooth.fab",
    'example.carlitto.iot': "Carlitto/4_Carlitto_IoT.fab",
}

BLASS_EXAMPLES = {
    'example.blass.servo': "Blass/1_Blass_Servo.fab",
    'example.blass.moving': "Blass/2_Blass_Moviendose.fab",
    'example.blass.bluetooth': "Blass/3_Blass_Bluetooth.fab",
    'example.blass.iot': "Blass/4_Blass_IoT.fab",
}


class MenuManager:
    def __init__(self, window):
        self.window = window
        self.examples_menu = None
    
    def create_file_menu(self):
        menu = self.window.menuBar().addMenu(get_text('menu.file'))
        
        action_new = QAction(QIcon("icons/opcion1.png"), get_text('menu.new'), self.window)
        action_open = QAction(QIcon("icons/opcion2.png"), get_text('menu.open'), self.window)
        action_save = QAction(QIcon("icons/opcion2.png"), get_text('menu.save'), self.window)
        action_save_as = QAction(QIcon("icons/opcion2.png"), get_text('menu.save_as'), self.window)
        action_preferences = QAction(QIcon("icons/opcion2.png"), get_text('menu.preferences'), self.window)
        action_exit = QAction(QIcon("icons/opcion2.png"), get_text('menu.exit'), self.window)
        
        action_new.triggered.connect(self.window.open_new_file_window)
        action_open.triggered.connect(self.window.open_file)
        action_save.triggered.connect(self.window.save_file_as)
        action_preferences.triggered.connect(self.window.show_preferences_dialog)
        action_exit.triggered.connect(self.window.exit_application)
        
        # Menú de exportación
        export_menu = QMenu(get_text('menu.export'), self.window)
        action_export_ino = QAction(".ino")
        action_export_py = QAction(".py")
        action_export_ps = QAction(".ps")
        
        action_export_py.setEnabled(False)
        action_export_ps.setEnabled(False)
        
        export_menu.addAction(action_export_ino)
        export_menu.addAction(action_export_py)
        export_menu.addAction(action_export_ps)
        
        action_export_ino.triggered.connect(self.window.export_as_ino)
        
        # Menú de ejemplos
        self.examples_menu = self._create_examples_menu()
        
        # Menú de proyectos
        projects_menu = self._create_projects_menu()
        
        menu.addAction(action_new)
        menu.addAction(action_open)
        menu.addMenu(self.examples_menu)
        menu.addMenu(projects_menu)
        menu.addAction(action_save)
        menu.addAction(action_save_as)
        menu.addMenu(export_menu)
        menu.addSeparator()
        menu.addAction(action_preferences)
        menu.addSeparator()
        menu.addAction(action_exit)
        
        self.action_export_ino = action_export_ino
        self.export_menu = export_menu
        return menu
    
    def _create_examples_menu(self):
        examples_menu = QMenu(get_text('menu.examples'), self.window)
        
        submenu_arduino = self._create_submenu_with_actions(
            'example.category.arduino', ARDUINO_EXAMPLES
        )
        submenu_modular = self._create_submenu_with_actions(
            'example.category.modular', MODULAR_EXAMPLES
        )
        submenu_betto = self._create_submenu_with_actions(
            'example.category.betto', BETTO_EXAMPLES
        )
        submenu_carlitto = self._create_submenu_with_actions(
            'example.category.carlitto', CARLITTO_EXAMPLES
        )
        submenu_blass = self._create_submenu_with_actions(
            'example.category.blass', BLASS_EXAMPLES
        )
        
        examples_menu.addMenu(submenu_arduino)
        examples_menu.addMenu(submenu_modular)
        examples_menu.addMenu(submenu_betto)
        examples_menu.addMenu(submenu_carlitto)
        examples_menu.addMenu(submenu_blass)
        
        return examples_menu
    
    def _create_projects_menu(self):
        projects_menu = QMenu(get_text('menu.projects'), self.window)
        
        submenu_robotica = QMenu(get_text('project.robotics'), self.window)
        submenu_steam = QMenu(get_text('project.steam'), self.window)
        submenu_control = QMenu(get_text('project.control'), self.window)
        
        for submenu in [submenu_robotica, submenu_steam, submenu_control]:
            action = QAction(get_text('project.coming_soon'), self.window)
            action.setEnabled(False)
            submenu.addAction(action)
        
        projects_menu.addMenu(submenu_robotica)
        projects_menu.addMenu(submenu_steam)
        projects_menu.addMenu(submenu_control)
        
        return projects_menu
    
    def _create_submenu_with_actions(self, category_key, examples_dict):
        submenu = QMenu(get_text(category_key), self.window)
        
        for example_key, example_file in examples_dict.items():
            label = get_text(example_key)
            action = QAction(label, self.window)
            action.triggered.connect(
                lambda checked, file=example_file: self.window.open_example(file)
            )
            submenu.addAction(action)
        
        return submenu
    
    def create_program_menu(self):
        menu = self.window.menuBar().addMenu(get_text('menu.program'))
        
        action_verify = QAction(get_text('menu.verify'), self.window)
        action_upload = QAction(get_text('menu.upload'), self.window)
        action_show_code = QAction(get_text('menu.show_code'), self.window)
        action_hide_code = QAction(get_text('menu.hide_code'), self.window)
        
        action_verify.triggered.connect(self.window.compilar_clicked)
        action_upload.triggered.connect(self.window.subir_clicked)
        action_show_code.triggered.connect(self.window.show_code)
        action_hide_code.triggered.connect(self.window.hide_code)
        
        menu.addAction(action_verify)
        menu.addAction(action_upload)
        menu.addSeparator()
        menu.addAction(action_show_code)
        menu.addAction(action_hide_code)
        
        return menu
    
    def create_tools_menu(self):
        menu = self.window.menuBar().addMenu(get_text('menu.tools'))
        
        action_serial_monitor = QAction(get_text('menu.serial_monitor'), self.window)
        action_serial_graph = QAction(get_text('menu.serial_graph'), self.window)
        
        action_serial_monitor.triggered.connect(
            lambda: self.window.show_monitor_serial(False)
        )
        action_serial_graph.triggered.connect(
            lambda: self.window.show_monitor_serial(True)
        )
        
        # Menú de placas
        boards_menu = self._create_boards_menu()
        
        # Menú de puertos
        self.window.ports_menu = QMenu(get_text('menu.port'), self.window)
        self.window.ports_menu.aboutToShow.connect(self.window.update_ports_menu)
        
        action_show_console = QAction(get_text('menu.show_console'), self.window)
        action_hide_console = QAction(get_text('menu.hide_console'), self.window)
        
        action_show_console.triggered.connect(self.window.show_console)
        action_hide_console.triggered.connect(self.window.hide_console)
        
        menu.addAction(action_serial_monitor)
        menu.addAction(action_serial_graph)
        menu.addSeparator()
        menu.addMenu(boards_menu)
        menu.addMenu(self.window.ports_menu)
        menu.addSeparator()
        menu.addAction(action_show_console)
        menu.addAction(action_hide_console)
        
        return menu
    
    def _create_boards_menu(self):
        boards_menu = QMenu(get_text('menu.board'), self.window)
        
        board_actions = {}
        for i, board_name in enumerate(BOARD_OPTIONS):
            action = QAction(board_name, self.window)
            action.triggered.connect(
                lambda checked, idx=i: self.window.combo.setCurrentIndex(idx)
            )
            boards_menu.addAction(action)
            board_actions[board_name] = action
        
        self.window.board_actions = board_actions
        return boards_menu
    
    def create_help_menu(self):
        menu = self.window.menuBar().addMenu(get_text('menu.help'))
        
        action_first_steps = QAction(get_text('menu.first_steps'), self.window)
        action_tutorials = QAction(get_text('menu.tutorials'), self.window)
        action_faq = QAction(get_text('menu.faq'), self.window)
        action_contact = QAction(get_text('menu.contact'), self.window)
        action_forum = QAction(get_text('menu.forum'), self.window)
        action_about = QAction(get_text('menu.about'), self.window)
        
        action_first_steps.triggered.connect(
            lambda: self.window.open_link("https://codigo.space/primerospasos/")
        )
        action_tutorials.triggered.connect(
            lambda: self.window.open_link("https://codigo.space/tutorialeside/")
        )
        action_faq.triggered.connect(
            lambda: self.window.open_link("https://codigo.space/faq/")
        )
        action_contact.triggered.connect(
            lambda: self.window.open_link("https://wa.me/+51984425782")
        )
        action_forum.triggered.connect(
            lambda: self.window.open_link("https://github.com/codigospace/Fab-Blocks-IDE/issues")
        )
        action_about.triggered.connect(self.window.show_about_dialog)
        
        # Agregar acciones al menú
        menu.addAction(action_first_steps)
        menu.addAction(action_tutorials)
        menu.addAction(action_faq)
        menu.addSeparator()
        menu.addAction(action_contact)
        menu.addAction(action_forum)
        menu.addSeparator()
        
        # Menú de idioma
        language_menu = QMenu(get_text('menu.language'), self.window)
        action_spanish = QAction("Español (ES)", self.window)
        action_english = QAction("English (EN)", self.window)
        
        action_spanish.triggered.connect(lambda: self.window.change_language('es'))
        action_english.triggered.connect(lambda: self.window.change_language('en'))
        
        language_menu.addAction(action_spanish)
        language_menu.addAction(action_english)
        menu.addMenu(language_menu)
        
        menu.addSeparator()
        menu.addAction(action_about)
        
        return menu
    
    def update_examples_menu(self):
        """Actualiza el menú de ejemplos cuando cambia el idioma."""
        if self.examples_menu is None:
            return
        
        # Limpiar el menú existente
        self.examples_menu.clear()
        
        # Recrear los submenús con las nuevas traducciones
        submenu_arduino = self._create_submenu_with_actions(
            'example.category.arduino', ARDUINO_EXAMPLES
        )
        submenu_modular = self._create_submenu_with_actions(
            'example.category.modular', MODULAR_EXAMPLES
        )
        submenu_betto = self._create_submenu_with_actions(
            'example.category.betto', BETTO_EXAMPLES
        )
        submenu_carlitto = self._create_submenu_with_actions(
            'example.category.carlitto', CARLITTO_EXAMPLES
        )
        submenu_blass = self._create_submenu_with_actions(
            'example.category.blass', BLASS_EXAMPLES
        )
        
        # Agregar submenús al menú de ejemplos
        self.examples_menu.addMenu(submenu_arduino)
        self.examples_menu.addMenu(submenu_modular)
        self.examples_menu.addMenu(submenu_betto)
        self.examples_menu.addMenu(submenu_carlitto)
        self.examples_menu.addMenu(submenu_blass)
        
        # Actualizar el título del menú de ejemplos
        self.examples_menu.setTitle(get_text('menu.examples'))
        
        return menu
