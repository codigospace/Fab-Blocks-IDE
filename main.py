"""
Fab Blocks IDE - Interfaz Principal

Aplicación PyQt5 para programación visual de placas Arduino usando Blockly.
Permite crear programas mediante bloques visuales y compilarlos/subirlos
directamente a la placa.

Características principales:
- Editor visual con Blockly integrado
- Compilación directa con Arduino CLI
- Carga de código en placa vía puerto serial
- Monitor serial para depuración
- Ejemplos predefinidos
- Soporte para múltiples placas Arduino
- Soporte multiidioma (Español e Inglés)

Arquitectura:
- qtwebhtml.py: Ventana principal que orquesta los componentes
- menu_manager.py: Gestión de menús
- ui_components.py: Componentes de interfaz reutilizables
- file_operations.py: Operaciones con archivos
- compilation_manager.py: Compilación y carga de código
- javascript_bridge.py: Comunicación con JavaScript/Blockly
- i18n.py: Internacionalización para múltiples idiomas
Contribuidores: Leonardo Coaquira, Ulises Gordillo
Licencia: MIT
Repo: https://github.com/codigospace/Fab-Blocks-IDE
"""
import sys
import os
import threading
import webbrowser
from PyQt5.QtCore import QUrl, QTimer, Qt
from PyQt5.QtWidgets import (
    QMainWindow, QApplication, QVBoxLayout, QWidget,
    QMessageBox, QShortcut, QAction
)
from PyQt5.QtGui import QIcon, QKeySequence, QTextCursor
from PyQt5.QtWebEngineWidgets import QWebEngineView

# Importar módulos refactorizados
from core.config_manager import ConfigManager
from core.preferences_dialog import PreferencesDialog
from core.server import LocalHTTPServer
from core.utils import release_all_serial_ports
from core.port_monitor import PortMonitor
from core.monitor_plotter import MainWindow as MonitorWindow
from core.i18n import get_text, set_language
from core.loading_spinner import SimpleLoadingOverlay

# Gestores de módulos
from core.menu_manager import MenuManager
from core.ui_components import (
    ToolbarBuilder, ComboBoxFactory, ProgressBarFactory, ConsoleWidget
)
from core.file_operations import FileOperations
from core.compilation_manager import CompilationManager
from core.javascript_bridge import JavaScriptBridge

if getattr(sys, 'frozen', False):
    import pyi_splash


class WebViewer(QMainWindow):
    """
    Ventana principal de Fab Blocks IDE
    
    Actúa como orquestador de todos los componentes de la aplicación:
    - Gestión de menús
    - Interfaz visual
    - Compilación y carga
    - Comunicación serial
    
    Atributos:
        config_manager: Gestor de configuración
        menu_manager: Gestor de menús
        file_operations: Operaciones con archivos
        compilation_manager: Compilación y carga
        js_bridge: Puente con JavaScript/Blockly
        webview: Widget WebView para Blockly
        console: Widget de consola de salida
        combo: ComboBox de selección de placa
        combo_puertos: ComboBox de selección de puerto serial
    """
    
    def __init__(self, config_manager):
        super().__init__()
        self.config_manager = config_manager
        self._console_buffer = []
        self._local_http_server_owner = False
        self.monitor_window = None
        
        # Gestores de módulos
        self.menu_manager = None
        self.file_operations = None
        self.compilation_manager = None
        self.js_bridge = None
        
        # Loading spinner
        self.loading_overlay = None
        
        self.initUI()

    def initUI(self):
        """
        Inicializa la interfaz de usuario.
        
        Realiza las siguientes operaciones:
        1. Configura la ventana principal
        2. Crea el widget central con layout vertical
        3. Inicializa todos los gestores de módulos
        4. Crea los menús (Archivo, Programa, Herramientas, Ayuda)
        5. Construye la barra de herramientas con botones
        6. Crea componentes (ComboBoxes, barra de progreso, consola)
        7. Inicia el monitor de puertos serial
        8. Carga la interfaz HTML/Blockly
        9. Conecta señales y slots
        """
        self.setWindowTitle('Fab Blocks IDE')
        self.setGeometry(0, 0, 1024, 720)
        self.setWindowIcon(QIcon("icons/codigo.ico"))
        
        # Crear widget central contenedor con layout vertical
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(0, 0, 0, 0)
        
        # Crear el webview que contendrá Blockly
        self.webview = QWebEngineView()
        
        # Inicializar gestores de módulos
        self._initialize_managers()
        
        # Crear menús desde el gestor de menús
        self.menu_manager.create_file_menu()
        self.menu_manager.create_program_menu()
        self.menu_manager.create_tools_menu()
        self.menu_manager.create_help_menu()
        
        # Crear componentes de UI (factory pattern)
        self.combo = ComboBoxFactory.create_boards_combo()
        self.combo_puertos = ComboBoxFactory.create_ports_combo()
        self.progress_bar = ProgressBarFactory.create_progress_bar()
        self.console = ConsoleWidget.create_console()
        
        # Crear barra de herramientas con botones y controles
        toolbar_builder = ToolbarBuilder(self)
        button_layout, graphic_serial, monitor_serial = toolbar_builder.build_toolbar()
        
        # Arrancar monitor de puertos en hilo separado
        self._start_port_monitor()
        
        # Crear overlay de carga que se muestra mientras carga HTML
        self.loading_overlay = SimpleLoadingOverlay(self)
        
        # Agregar componentes al layout principal en orden:
        # 1. Barra de herramientas (arriba)
        # 2. Webview con Blockly (centro, expandible)
        # 3. Consola de salida (abajo)
        main_layout.addLayout(button_layout)
        main_layout.addWidget(self.webview, 1)  # El webview ocupa el espacio disponible
        main_layout.addWidget(self.console)
        
        # Cargar interfaz HTML desde servidor local o archivo
        self.loadLocalFile("index.html")
        
        # Conectar señales de cambio en ComboBoxes
        self.combo.currentIndexChanged.connect(self._on_board_changed)
        self.combo_puertos.currentIndexChanged.connect(self._on_port_changed)
        
        # Conectar señales de carga del webview para mostrar/ocultar spinner
        self.webview.loadStarted.connect(self._on_load_started)
        self.webview.loadFinished.connect(self._on_load_finished)
        
        # Crear temporizador para actualizar progreso
        self.progress_timer = QTimer(self)
        self.progress_timer.timeout.connect(self._update_basic_progress)

    def _initialize_managers(self):
        """Inicializa los gestores de módulos"""
        self.menu_manager = MenuManager(self)
        self.file_operations = FileOperations(self)
        self.compilation_manager = CompilationManager(self, self.config_manager)
        self.js_bridge = JavaScriptBridge(self)

    def _setup_main_layout(self, button_layout):
        """Configura el layout principal - DEPRECADO: ahora se hace en initUI"""
        pass

    def _start_port_monitor(self):
        self.port_monitor = PortMonitor()
        self.port_monitor_thread = threading.Thread(target=self.port_monitor.run)
        self.port_monitor_thread.daemon = True
        self.port_monitor.portChanged.connect(self.update_ports_menu)
        self.port_monitor_thread.start()

    def _on_board_changed(self, index):
        pass

    def _on_port_changed(self, index):
        pass

    def _on_load_started(self):
        """Se ejecuta cuando comienza a cargar el HTML"""
        if self.loading_overlay:
            self.loading_overlay.show_loading(get_text('message.loading_ide'))

    def _on_load_finished(self, success):
        """Se ejecuta cuando termina de cargar el HTML"""
        if self.loading_overlay:
            self.loading_overlay.hide_loading()

    def _update_basic_progress(self):
        pass

    def loadLocalFile(self, filename):
        """
        Carga un archivo HTML en el WebView.
        
        Intenta cargar primero desde un servidor HTTP local por razones de seguridad
        (CORS, acceso a recursos). Si falla, carga como archivo local.
        
        Flujo:
        1. Buscar directorio html/
        2. Iniciar servidor HTTP local si no existe
        3. Cargar HTML desde servidor (preferido) o como archivo local
        
        Args:
            filename (str): Nombre del archivo HTML relativo a carpeta html/
                           (ej: "index.html")
        
        El servidor HTTP local:
        - Se inicia solo una vez (singleton)
        - Se reutiliza entre ventanas
        - Se detiene al cerrar la aplicación principal
        """
        script_dir = os.path.dirname(os.path.realpath(__file__))
        html_dir = os.path.join(script_dir, "html")

        if os.path.isdir(html_dir):
            try:
                # Iniciar servidor HTTP local si aún no está corriendo
                if not hasattr(self, 'local_http_server') or not getattr(self.local_http_server, 'running', False):
                    self.local_http_server = LocalHTTPServer(directory=html_dir, host='127.0.0.1', port=0)
                    self.local_http_server.start()
                    if getattr(self.local_http_server, 'running', False):
                        self._local_http_server_owner = True
                        self.write_to_console(f"{get_text('message.http_server_started')} http://127.0.0.1:{self.local_http_server.port}/")
                    else:
                        self._local_http_server_owner = False
                        self.write_to_console(get_text('error.http_server_failed'))
                else:
                    self._local_http_server_owner = False
            except Exception as e:
                self.write_to_console(f"{get_text('error.http_server_error')}: {e}")

        # Cargar desde servidor HTTP si está disponible, sino como archivo local
        if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False):
            url = QUrl(f"http://127.0.0.1:{self.local_http_server.port}/{filename}")
            self.webview.load(url)
        else:
            filepath = os.path.join(script_dir, "html", filename)
            url = QUrl.fromLocalFile(filepath)
            self.webview.load(url)

    def write_to_console(self, message):
        """
        Escribe un mensaje en la consola de salida.
        
        Características:
        - Si el widget consola existe: muestra el mensaje
        - Si aún no existe: almacena en buffer para mostrar después
        - Esto maneja el caso cuando se llama write_to_console antes de initUI()
        
        Args:
            message (str): Mensaje a mostrar
        
        Uso típico:
        - Mensajes de compilación: "Compilar:", "Compilación exitosa"
        - Puertos disponibles: "Puertos serie disponibles: [COM3, COM4]"
        - Errores: "Error al compilar..."
        """
        if hasattr(self, 'console') and getattr(self, 'console') is not None:
            # Consola ya existe: mostrar buffer previo y nuevo mensaje
            if hasattr(self, '_console_buffer') and self._console_buffer:
                for m in self._console_buffer:
                    self.console.append(m)
                self._console_buffer = []
            self.console.append(message)
        else:
            # Consola aún no existe: almacenar en buffer
            print(message)
            if not hasattr(self, '_console_buffer'):
                self._console_buffer = []
            self._console_buffer.append(message)

    def updateOutput(self, output):
        self.console.append(output)

    def update_ports_menu(self):
        """
        Actualiza el menú y ComboBox de puertos COM disponibles.
        
        Se llama automáticamente cuando:
        - Cambia la detección de puertos (via PortMonitor)
        - El usuario expande el menú de puertos
        
        Acciones:
        - Detecta puertos COM usando pyserial
        - Actualiza menú desplegable de puertos
        - Actualiza ComboBox de selección de puerto
        - Habilita/deshabilita según disponibilidad
        """
        self.ports_menu.clear()
        self.combo_puertos.clear()

        import serial.tools.list_ports
        ports = serial.tools.list_ports.comports()

        if ports:
            # Hay puertos disponibles
            for port in ports:
                from PyQt5.QtWidgets import QAction
                port_action = QAction(port.device, self)
                port_action.triggered.connect(self.update_ports_combo)
                self.ports_menu.addAction(port_action)
                self.combo_puertos.addItem(port.device)
                self.combo_puertos.setEnabled(True)
        else:
            # No hay puertos conectados
            from PyQt5.QtWidgets import QAction
            no_ports_action = QAction("No hay puertos COM disponibles", self)
            no_ports_action.setEnabled(False)
            self.ports_menu.addAction(no_ports_action)
            self.combo_puertos.addItem("No hay puertos COM disponibles")
            self.combo_puertos.setEnabled(False)

    def update_ports_combo(self):
        self.combo_puertos.clear()

        import serial.tools.list_ports
        ports = serial.tools.list_ports.comports()

        if ports:
            for port in ports:
                self.combo_puertos.addItem(port.device)
        else:
            self.combo_puertos.addItem("No hay puertos COM disponibles")
            self.combo_puertos.setEnabled(False)

    def show_preferences_dialog(self):
        self.preferences_dialog = PreferencesDialog(self.config_manager, self)
        self.preferences_dialog.exec_()

    def compilar_clicked(self):
        """
        Manejador del evento "compilar".
        
        Delega el proceso completo al CompilationManager:
        - Extrae código del workspace Blockly
        - Lo guarda como archivo .ino
        - Ejecuta compilación con arduino-builder
        - Muestra progreso en barra y consola
        """
        self.compilation_manager.compile()

    def subir_clicked(self):
        """
        Manejador del evento "subir".
        
        Realiza proceso de compilación + carga:
        1. Compila primero (mismo que compilar_clicked)
        2. Al terminar la compilación, automáticamente sube el código
        3. Usa avrdude para escribir el binario en la placa
        4. Muestra progreso y mensajes de estado
        """
        self.compilation_manager.upload()

    def open_new_file_window(self):
        self.new_file_window = WebViewer(self.config_manager)
        if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False):
            self.new_file_window.local_http_server = self.local_http_server
            self.new_file_window._local_http_server_owner = False
        self.new_file_window.loadLocalFile('index.html')
        self.new_file_window.show()

    def open_file(self):
        """
        Abre un diálogo para seleccionar y abrir archivo de proyecto (.fab).
        
        Formato:
        - .fab: Archivos de proyecto (contienen XML de Blockly)
        
        Ubicación por defecto: carpeta 'examples/'
        """
        self.file_operations.open_fab_file()

    def save_file_as(self):
        """
        Guarda el proyecto actual en un archivo .fab.
        
        Proceso:
        1. Extrae XML del workspace Blockly
        2. Muestra diálogo para elegir ubicación
        3. Guarda archivo en ubicación seleccionada
        
        Ubicación por defecto: carpeta 'saves/'
        """
        self.file_operations.save_fab_file()

    def export_as_ino(self):
        """
        Exporta el código generado como archivo Arduino (.ino).
        
        Proceso:
        1. Genera código Arduino desde bloques Blockly
        2. Muestra diálogo para elegir ubicación
        3. Guarda archivo .ino en ubicación seleccionada
        
        Formato: Código C++ compatible con IDE Arduino
        """
        self.file_operations.export_as_ino()

    def open_example(self, example_filename):
        """
        Abre un archivo de ejemplo predefinido.
        
        Args:
            example_filename (str): Ruta relativa a ejemplos
                                   (ej: "Arduino/01-variables.fab")
        
        Ubicación: carpeta 'examples/'
        """
        self.file_operations.open_example_file(example_filename)

    def open_new_file_window_with_content(self, content):
        self.new_file_window = WebViewer(self.config_manager)
        if hasattr(self, 'local_http_server') and getattr(self.local_http_server, 'running', False):
            self.new_file_window.local_http_server = self.local_http_server
            self.new_file_window._local_http_server_owner = False
        self.new_file_window.loadLocalFile('index.html')
        self.new_file_window.show()
        self.new_file_window.webview.loadFinished.connect(
            lambda ok: self._run_javascript_after_load(ok, content)
        )

    def _run_javascript_after_load(self, ok, content):
        if ok:
            self.new_file_window.js_bridge.load_workspace_from_xml(content)

    def show_code(self):
        self.js_bridge.show_code()

    def hide_code(self):
        self.js_bridge.hide_code()

    def show_monitor_serial(self, show_graph_state):
        if self.monitor_window is None or not self.monitor_window.isVisible():
            self.monitor_window = MonitorWindow()
            self.monitor_window.show()
            self.monitor_window.toggle_graph(show_graph_state)
        else:
            self.monitor_window.activateWindow()
            self.monitor_window.raise_()
            self.monitor_window.toggle_graph(show_graph_state)

    def show_console(self):
        self.console.show()

    def hide_console(self):
        self.console.hide()

    def open_link(self, url):
        webbrowser.open(url)

    def show_about_dialog(self):
        about_dialog = QMessageBox()
        about_dialog.setWindowTitle("Acerca de Fab Blocks IDE")
        about_dialog.setWindowIcon(QIcon("icons/codigo.ico"))

        about_text = (
            "<p style='font-size: 14px; text-align: center;'>"
            "<img src='icons/codigo.ico' width='64' height='64' /><br>"
            "<b>Desarrollado por:</b> Programación y Automatización Codigo S.A.C.<br><br>"
            "Fab Blocks IDE es una plataforma de programación para las tarjetas de desarrollo "
            "Modular V1 y Arduino, que permite el rápido y fácil prototipado de proyectos "
            "electrónicos utilizando la programación por bloques de Google Blockly.<br><br>"
            "Aprende cómo iniciar en <a href='https://codigo.space/primerospasos/'>"
            "https://codigo.space/primerospasos/</a><br>"
            "Compra el kit Modular V1 en <a href='https://codigo.space/tienda/'>"
            "https://codigo.space/tienda/</a><br>"
            "Aprende con nuestros cursos en <a href='https://fablab.pe/cursos/'>"
            "https://fablab.pe/cursos/</a><br><br>"
            "<b>Diseñado por:</b> Ulises Gordillo<br>"
            "<b>Programado por:</b> Leonardo Coaquira<br>"
            "</p>"
        )

        about_dialog.setText(about_text)
        about_dialog.setTextFormat(Qt.RichText)
        about_dialog.exec_()

    def exit_application(self):
        """
        Cierra la aplicación de forma segura.
        
        Limpieza:
        1. Detiene el servidor HTTP local (si es el propietario)
        2. Cancela procesos de compilación en ejecución
        3. Cierra el widget
        
        Notas:
        - Solo detiene el servidor si esta ventana lo inició
        - Otras ventanas siguen usando el servidor compartido
        - Los procesos de compilación son cancelados en closeEvent()
        
        Atajos:
        - Ctrl+Q: Equivalente a través de shortcut
        """
        self.write_to_console(get_text('message.exiting'))
        try:
            # Solo detener servidor si esta ventana es propietaria
            if (hasattr(self, 'local_http_server') and 
                getattr(self.local_http_server, 'running', False) and 
                getattr(self, '_local_http_server_owner', False)):
                self.local_http_server.stop()
                self.write_to_console(get_text('message.http_server_stopped'))
        except Exception as e:
            print(f"Error deteniendo servidor local: {e}")
        self.close()

    def change_language(self, language):
        """
        Cambia el idioma de la interfaz en tiempo real.
        
        Actualiza:
        - Idioma activo en el módulo i18n
        - Todos los menús con las nuevas traducciones
        - Botones de la toolbar con nuevos textos
        - Labels y otros elementos de interfaz
        
        Args:
            language (str): Código de idioma ('es' para español, 'en' para inglés)
        
        Ejemplo:
            self.change_language('en')  # Cambiar a inglés
            self.change_language('es')  # Cambiar a español
        """
        # Cambiar idioma global
        set_language(language)
        
        # Actualizar botones de la toolbar
        self._update_toolbar_buttons()
        
        # Borrar menús existentes
        self.menuBar().clear()
        
        # Recrear menús con nuevas traducciones
        self.menu_manager.create_file_menu()
        self.menu_manager.create_program_menu()
        self.menu_manager.create_tools_menu()
        self.menu_manager.create_help_menu()
        
        # Actualizar ventana del monitor serial si está abierta
        if hasattr(self, 'monitor_window') and self.monitor_window is not None:
            self.monitor_window.change_language()
        
        # Actualizar textos de labels de la toolbar (si es necesario)
        self.write_to_console(f"Idioma cambiado a: {language}")

    def _update_toolbar_buttons(self):
        """
        Actualiza los textos de los botones de la toolbar
        cuando cambia el idioma.
        """
        if not hasattr(self, 'toolbar_buttons'):
            return
        
        from i18n import get_text
        
        # Actualizar botones principales
        button_map = {
            'compile': 'menu.verify',
            'upload': 'menu.upload',
            'new': 'menu.new',
            'open': 'menu.open',
            'save': 'menu.save',
        }
        
        for button_key, translation_key in button_map.items():
            if button_key in self.toolbar_buttons:
                self.toolbar_buttons[button_key].setText(get_text(translation_key))
        
        # Actualizar botones especiales
        if hasattr(self, 'graphic_serial_btn'):
            self.graphic_serial_btn.setText(get_text('menu.serial_graph'))
        
        if hasattr(self, 'monitor_serial_btn'):
            self.monitor_serial_btn.setText(get_text('menu.serial_monitor'))

    def closeEvent(self, event):
        """
        Manejador del evento de cierre de ventana.
        
        Limpieza al cerrar:
        1. Detiene procesos de compilación en ejecución
        2. Espera a que terminen (wait())
        3. Acepta el evento de cierre
        
        Esto previene que la aplicación quede con procesos zombie
        y asegura una limpieza ordenada.
        """
        if hasattr(self, 'compilation_manager'):
            # Cancelar compilación si está en progreso
            if (hasattr(self.compilation_manager, 'runner_com') and 
                self.compilation_manager.runner_com and
                self.compilation_manager.runner_com.isRunning()):
                self.compilation_manager.runner_com.terminate()
                self.compilation_manager.runner_com.wait()
            # Cancelar carga si está en progreso
            if (hasattr(self.compilation_manager, 'runner_up') and 

                self.compilation_manager.runner_up and
                self.compilation_manager.runner_up.isRunning()):
                self.compilation_manager.runner_up.terminate()
                self.compilation_manager.runner_up.wait()
        event.accept()

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