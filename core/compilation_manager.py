"""
Gestión de compilación y carga para Fab Blocks IDE

Este módulo maneja todo el proceso de compilación y carga de código:
1. Extrae el código del workspace de Blockly
2. Lo guarda en formato .ino (Arduino)
3. Compila usando arduino-builder
4. Carga el binario compilado en la placa mediante avrdude

Flujo de compilación:
- Código Blockly -> C++ Arduino -> Compilación -> Binario hexadecimal -> Carga en placa

Placas soportadas:
- Arduino Uno (ATmega328P)
- Arduino Nano (ATmega328P)
- Arduino Mega (ATmega2560)
- Modular V1 (ATmega328P)
- Robot Betto (ATmega328P)

Soporte multiidioma: Utiliza i18n para mensajes de compilación ES/EN

Autor: Código Abierto Fab Blocks IDE
Licencia: MIT
"""
import os
from PyQt5.QtCore import QTimer
import serial.tools.list_ports
from core.command_runner import CommandRunner
from core.utils import release_all_serial_ports
from core.i18n import get_text


# Mapeo de configuración por placa: especifica CPU, velocidad baudrate, etc.
BOARD_CPU_MAPPING = {
    'Arduino Uno': {
        'TEXT_CPU': 'arduino:avr:uno',           # FQN para compilación
        'UPLOAD_CPU': 'atmega328p',               # Chip para carga
        'PROCESSOR': 'arduino',                   # Tipo de programador
        'BAUD': '115200'                          # Velocidad en baudios
    },
    'Arduino Nano': {
        'TEXT_CPU': 'arduino:avr:nano',
        'UPLOAD_CPU': 'atmega328p',
        'PROCESSOR': 'arduino',
        'BAUD': '115200'
    },
    'Arduino Mega': {
        'TEXT_CPU': 'arduino:avr:mega',
        'UPLOAD_CPU': 'atmega2560',
        'PROCESSOR': 'wiring',
        'BAUD': '115200'
    },
    'Modular': {
        'TEXT_CPU': 'arduino:avr:nano',
        'UPLOAD_CPU': 'atmega328p',
        'PROCESSOR': 'arduino',
        'BAUD': '115200'
    },
    'Robot Betto': {
        'TEXT_CPU': 'arduino:avr:nano',
        'UPLOAD_CPU': 'atmega328p',
        'PROCESSOR': 'arduino',
        'BAUD': '115200'
    },
}


class CompilationManager:
    """Gestiona el proceso de compilación y carga"""
    
    def __init__(self, window, config_manager):
        self.window = window
        self.config_manager = config_manager
        self.runner_com = None
        self.runner_up = None
        self.progress_timer = None
    
    def compile(self):
        """Inicia el proceso de compilación"""
        release_all_serial_ports()
        self.window.console.clear()
        self.window.write_to_console(get_text('message.compiling'))
        
        selected_board = self.window.combo.currentText()
        self.window.write_to_console(f"{get_text('message.board_selected')} {selected_board}")
        
        # Extraer código del bloque HTML
        self.window.webview.page().runJavaScript('''
            var elements = document.getElementsByClassName('hljs cpp');
            var info = [];
            for (var i = 0; i < elements.length; i++) {
                info.push(elements[i].innerText);
            }
            info;
        ''', self._on_code_extracted_for_compile)
        
        # Mostrar puertos disponibles
        ports = serial.tools.list_ports.comports()
        serial_ports = [port.device for port in ports]
        self.window.write_to_console(f"{get_text('message.available_ports')} {serial_ports}")
        
        self._run_compile()
    
    def upload(self):
        """Inicia el proceso de carga"""
        release_all_serial_ports()
        self.window.console.clear()
        
        # Extraer código primero
        self.window.webview.page().runJavaScript('''
            var elements = document.getElementsByClassName('hljs cpp');
            var info = [];
            for (var i = 0; i < elements.length; i++) {
                info.push(elements[i].innerText);
            }
            info;
        ''', self._on_code_extracted_for_upload)
    
    def _on_code_extracted_for_compile(self, info):
        """Callback cuando el código es extraído para compilar"""
        from core.file_operations import FileOperations
        FileOperations.save_extracted_code(info)
    
    def _on_code_extracted_for_upload(self, info):
        """Callback cuando el código es extraído para cargar"""
        from core.file_operations import FileOperations
        FileOperations.save_extracted_code(info)
        self.window.write_to_console(get_text('message.compile_first'))
        self._run_compile()
    
    def _run_compile(self):
        """Ejecuta la compilación"""
        self._update_progress()
        
        selected_board = self.window.combo.currentText()
        board_info = BOARD_CPU_MAPPING.get(selected_board)
        
        if not board_info:
            self.window.write_to_console(f"{get_text('error.unknown_board')} {selected_board}")
            return
        
        TEXT_CPU = board_info['TEXT_CPU']
        
        if self.runner_com and self.runner_com.isRunning():
            self.runner_com.terminate()
            self.runner_com.wait()
        
        arduino_dev = self.config_manager.get_value('compiler_location')
        arduino_folder = os.path.dirname(arduino_dev)
        current_folder = os.getcwd()
        
        command = self._build_compile_command(
            arduino_folder, TEXT_CPU, current_folder
        )
        
        self.runner_com = CommandRunner(command)
        self.runner_com.output_received.connect(self.window.updateOutput)
        self.runner_com.finished.connect(self._on_compile_finished)
        self.runner_com.start()
        
        self.progress_timer = QTimer(self.window)
        self.progress_timer.timeout.connect(self._update_progress_bar)
        self.progress_timer.start(200)
    
    def _on_compile_finished(self):
        """Callback cuando la compilación finaliza"""
        self.window.write_to_console(get_text('message.then_upload'))
        if self.progress_timer:
            self.progress_timer.stop()
        self._run_upload()
    
    def _run_upload(self):
        """Ejecuta la carga del código"""
        self._update_progress()
        
        arduino_dev = self.config_manager.get_value('compiler_location')
        arduino_folder = os.path.dirname(arduino_dev)
        current_folder = os.getcwd()
        
        selected_board = self.window.combo.currentText()
        selected_port = self.window.combo_puertos.currentText()
        
        board_info = BOARD_CPU_MAPPING.get(selected_board)
        
        if not board_info:
            self.window.write_to_console(f"{get_text('error.unknown_board')} {selected_board}")
            return
        
        TEXT_CPU = board_info['UPLOAD_CPU']
        PROCESSOR = board_info['PROCESSOR']
        
        command = self._build_upload_command(
            arduino_folder, TEXT_CPU, PROCESSOR, selected_port, current_folder
        )
        
        self.runner_up = CommandRunner(command)
        self.runner_up.output_received.connect(self.window.updateOutput)
        self.runner_up.start()
        
        self.progress_timer = QTimer(self.window)
        self.progress_timer.timeout.connect(self._update_progress_bar)
        self.progress_timer.start(200)
    
    def _build_compile_command(self, arduino_folder, text_cpu, current_folder):
        """Construye el comando de compilación"""
        return (f'{arduino_folder}/arduino-builder -compile -logger=machine '
                f'-hardware {arduino_folder}/hardware '
                f'-tools {arduino_folder}/tools-builder '
                f'-tools {arduino_folder}/hardware/tools/avr '
                f'-built-in-libraries {arduino_folder}/libraries '
                f'-fqbn {text_cpu} -vid-pid 1A86_7523 -ide-version=10815 '
                f'-build-path {current_folder}/build '
                f'-warnings=none -build-cache {current_folder}/Temp/arduino_cache_914083 '
                f'-prefs=build.warn_data_percentage=75 '
                f'-prefs=runtime.tools.arduinoOTA.path={arduino_folder}/hardware/tools/avr '
                f'-prefs=runtime.tools.arduinoOTA-1.3.0.path={arduino_folder}/hardware/tools/avr '
                f'-prefs=runtime.tools.avrdude.path={arduino_folder}/hardware/tools/avr '
                f'-prefs=runtime.tools.avrdude-6.3.0-arduino17.path={arduino_folder}/hardware/tools/avr '
                f'-prefs=runtime.tools.avr-gcc.path={arduino_folder}/hardware/tools/avr '
                f'-prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path={arduino_folder}/hardware/tools/avr '
                f'-verbose {current_folder}/extracted_code.ino')
    
    def _build_upload_command(self, arduino_folder, text_cpu, processor, 
                              selected_port, current_folder):
        """Construye el comando de carga"""
        return (f'{arduino_folder}/hardware/tools/avr/bin/avrdude '
                f'-C{arduino_folder}/hardware/tools/avr/etc/avrdude.conf '
                f'-v -p{text_cpu} -c{processor} -P{selected_port} -b115200 -D '
                f'-Uflash:w:{current_folder}/build/extracted_code.ino.hex:i')
    
    def _update_progress(self):
        """Actualiza la barra de progreso"""
        current_value = 0
        target_value = 80
        step = 40
        
        if current_value < target_value:
            new_value = current_value + step
            self.window.progress_bar.setValue(new_value)
    
    def _update_progress_bar(self):
        """Actualiza la barra de progreso gradualmente"""
        current_value = self.window.progress_bar.value()
        target_value = 100
        step = 20
        
        if current_value < target_value:
            new_value = current_value + step
            self.window.progress_bar.setValue(new_value)
        else:
            if self.progress_timer:
                self.progress_timer.stop()
