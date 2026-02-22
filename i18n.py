"""
Sistema de Internacionalización (i18n) para Fab Blocks IDE

Gestiona las traducciones de la interfaz en múltiples idiomas.
Actualmente soporta: Español (es), Inglés (en)

Uso:
    from i18n import get_text, set_language
    
    set_language('es')  # Cambiar a español
    titulo = get_text('menu.file')  # Obtener "Archivo"
    
    set_language('en')
    titulo = get_text('menu.file')  # Obtener "File"

Estructura de claves:
    menu.* - Textos de menús
    button.* - Textos de botones
    label.* - Etiquetas
    message.* - Mensajes
    dialog.* - Diálogos
    error.* - Mensajes de error

Autor: Código Abierto Fab Blocks IDE
Licencia: MIT
"""

# Estado global del idioma
_current_language = 'es'

# Diccionario de traducciones
TRANSLATIONS = {
    # ========== MENÚS ==========
    'menu.file': {
        'es': 'Archivo',
        'en': 'File'
    },
    'menu.new': {
        'es': 'Nuevo',
        'en': 'New'
    },
    'menu.open': {
        'es': 'Abrir',
        'en': 'Open'
    },
    'menu.save': {
        'es': 'Guardar',
        'en': 'Save'
    },
    'menu.save_as': {
        'es': 'Guardar Como',
        'en': 'Save As'
    },
    'menu.export': {
        'es': 'Exportar Como',
        'en': 'Export As'
    },
    'menu.preferences': {
        'es': 'Preferencias',
        'en': 'Preferences'
    },
    'menu.exit': {
        'es': 'Salir',
        'en': 'Exit'
    },
    'menu.examples': {
        'es': 'Ejemplos',
        'en': 'Examples'
    },
    'menu.projects': {
        'es': 'Proyectos',
        'en': 'Projects'
    },
    
    # ========== MENÚ PROGRAMA ==========
    'menu.program': {
        'es': 'Programa',
        'en': 'Program'
    },
    'menu.verify': {
        'es': 'Verificar',
        'en': 'Verify'
    },
    'menu.upload': {
        'es': 'Subir',
        'en': 'Upload'
    },
    'menu.show_code': {
        'es': 'Mostrar Código',
        'en': 'Show Code'
    },
    'menu.hide_code': {
        'es': 'Ocultar Código',
        'en': 'Hide Code'
    },
    
    # ========== MENÚ HERRAMIENTAS ==========
    'menu.tools': {
        'es': 'Herramientas',
        'en': 'Tools'
    },
    'menu.serial_monitor': {
        'es': 'Monitor Serie',
        'en': 'Serial Monitor'
    },
    'menu.serial_graph': {
        'es': 'Gráfico Serie',
        'en': 'Serial Graph'
    },
    'menu.board': {
        'es': 'Placa:',
        'en': 'Board:'
    },
    'menu.port': {
        'es': 'Puertos COM:',
        'en': 'COM Ports:'
    },
    'menu.show_console': {
        'es': 'Mostrar Consola',
        'en': 'Show Console'
    },
    'menu.hide_console': {
        'es': 'Ocultar Consola',
        'en': 'Hide Console'
    },
    
    # ========== MENÚ AYUDA ==========
    'menu.help': {
        'es': 'Ayuda',
        'en': 'Help'
    },
    'menu.first_steps': {
        'es': 'Primeros Pasos',
        'en': 'First Steps'
    },
    'menu.tutorials': {
        'es': 'Tutoriales',
        'en': 'Tutorials'
    },
    'menu.faq': {
        'es': 'FAQ',
        'en': 'FAQ'
    },
    'menu.contact': {
        'es': 'Contáctenos',
        'en': 'Contact Us'
    },
    'menu.forum': {
        'es': 'Foro',
        'en': 'Forum'
    },
    'menu.about': {
        'es': 'Acerca de',
        'en': 'About'
    },
    'menu.language': {
        'es': 'Idioma',
        'en': 'Language'
    },
    
    # ========== BOTONES ==========
    'button.verify': {
        'es': 'Verificar',
        'en': 'Verify'
    },
    'button.upload': {
        'es': 'Subir',
        'en': 'Upload'
    },
    'button.new': {
        'es': 'Nuevo',
        'en': 'New'
    },
    'button.open': {
        'es': 'Abrir',
        'en': 'Open'
    },
    'button.save': {
        'es': 'Guardar',
        'en': 'Save'
    },
    'button.serial_monitor': {
        'es': 'Monitor Serial',
        'en': 'Serial Monitor'
    },
    'button.serial_graph': {
        'es': 'Gráfico Serial',
        'en': 'Serial Graph'
    },
    
    # ========== ETIQUETAS ==========
    'label.board': {
        'es': 'Placas:',
        'en': 'Boards:'
    },
    'label.port': {
        'es': 'Puerto:',
        'en': 'Port:'
    },
    
    # ========== MENSAJES DE COMPILACIÓN ==========
    'message.compiling': {
        'es': 'Compilar:',
        'en': 'Compile:'
    },
    'message.uploading': {
        'es': 'Subiendo código...',
        'en': 'Uploading code...'
    },
    'message.compile_first': {
        'es': '1ERO COMPILAR',
        'en': '1ST COMPILE'
    },
    'message.then_upload': {
        'es': '2DO SUBIR',
        'en': '2ND UPLOAD'
    },
    'message.board_selected': {
        'es': 'Selección de placa: ',
        'en': 'Board selection: '
    },
    'message.available_ports': {
        'es': 'Puertos serie disponibles: ',
        'en': 'Available serial ports: '
    },
    'message.http_server_started': {
        'es': 'Servidor HTTP local iniciado en ',
        'en': 'Local HTTP server started at '
    },
    'message.http_server_failed': {
        'es': 'No se pudo iniciar el servidor HTTP local.',
        'en': 'Failed to start local HTTP server.'
    },
    'message.http_error': {
        'es': 'Error al iniciar servidor HTTP local: ',
        'en': 'Error starting local HTTP server: '
    },
    'message.loading_ide': {
        'es': 'Cargando el entorno de programación...',
        'en': 'Loading programming environment...'
    },
    'message.exiting': {
        'es': 'Saliendo de la aplicación',
        'en': 'Exiting application'
    },
    'message.server_stopped': {
        'es': 'Servidor HTTP local detenido.',
        'en': 'Local HTTP server stopped.'
    },
    'message.server_stop_error': {
        'es': 'Error deteniendo servidor local: ',
        'en': 'Error stopping local server: '
    },
    
    # ========== PUERTOS ==========
    'message.no_ports_available': {
        'es': 'No hay puertos COM disponibles',
        'en': 'No COM ports available'
    },
    
    # ========== PLACAS ==========
    'board.uno': {
        'es': 'Arduino Uno',
        'en': 'Arduino Uno'
    },
    'board.nano': {
        'es': 'Arduino Nano',
        'en': 'Arduino Nano'
    },
    'board.mega': {
        'es': 'Arduino Mega',
        'en': 'Arduino Mega'
    },
    'board.modular': {
        'es': 'Modular',
        'en': 'Modular'
    },
    'board.betto': {
        'es': 'Robot Betto',
        'en': 'Robot Betto'
    },
    
    # ========== EJEMPLOS ==========
    'example.arduino': {
        'es': 'Arduino',
        'en': 'Arduino'
    },
    'example.variables': {
        'es': 'Variables',
        'en': 'Variables'
    },
    'example.text_variables': {
        'es': 'Variables de texto',
        'en': 'Text Variables'
    },
    'example.serial': {
        'es': 'Serial',
        'en': 'Serial'
    },
    'example.serial_variables': {
        'es': 'Variables Serial',
        'en': 'Serial Variables'
    },
    'example.led_blink': {
        'es': 'Parpadeo Led',
        'en': 'LED Blink'
    },
    'example.led_fade': {
        'es': 'Desvanecido Led',
        'en': 'LED Fade'
    },
    'example.serial_counter': {
        'es': 'Contador Serial',
        'en': 'Serial Counter'
    },
    'example.led_switch': {
        'es': 'Interruptor Led Serial',
        'en': 'Serial LED Switch'
    },
    'example.modular': {
        'es': 'Modular',
        'en': 'Modular'
    },
    'example.serial_communication': {
        'es': 'Comunicación Serial',
        'en': 'Serial Communication'
    },
    'example.digital_actuator': {
        'es': 'Actuador Digital',
        'en': 'Digital Actuator'
    },
    'example.digital_sensor': {
        'es': 'Sensor Digital',
        'en': 'Digital Sensor'
    },
    'example.analog_sensor': {
        'es': 'Sensor Analógico',
        'en': 'Analog Sensor'
    },
    'example.servo': {
        'es': 'Servo',
        'en': 'Servo'
    },
    'example.ultrasound': {
        'es': 'Ultrasonido',
        'en': 'Ultrasound'
    },
    'example.dc_motor': {
        'es': 'Motor DC',
        'en': 'DC Motor'
    },
    'example.robots': {
        'es': 'Robots',
        'en': 'Robots'
    },
    'example.betto': {
        'es': 'Betto',
        'en': 'Betto'
    },
    'example.betto_walking': {
        'es': 'Betto Caminando',
        'en': 'Betto Walking'
    },
    'example.betto_dancing': {
        'es': 'Betto Bailando',
        'en': 'Betto Dancing'
    },
    'example.betto_singing': {
        'es': 'Betto Cantando',
        'en': 'Betto Singing'
    },
    'example.betto_avoiding': {
        'es': 'Betto Evitando',
        'en': 'Betto Avoiding'
    },
    'example.betto_iot': {
        'es': 'Betto IoT',
        'en': 'Betto IoT'
    },
    'example.carlitto': {
        'es': 'Carlitto',
        'en': 'Carlitto'
    },
    'example.blass': {
        'es': 'Blass',
        'en': 'Blass'
    },
    
    # ========== PROYECTOS ==========
    'project.coming_soon': {
        'es': 'Por añadir',
        'en': 'Coming Soon'
    },
    'project.robotics': {
        'es': 'Robótica',
        'en': 'Robotics'
    },
    'project.steam': {
        'es': 'STEAM',
        'en': 'STEAM'
    },
    'project.control': {
        'es': 'Control',
        'en': 'Control'
    },
    
    # ========== DIÁLOGOS ==========
    'dialog.save_canceled': {
        'es': 'Guardar Cancelado',
        'en': 'Save Canceled'
    },
    'dialog.save_operation_canceled': {
        'es': 'La operación de guardar fue cancelada.',
        'en': 'The save operation was canceled.'
    },
    'dialog.save_ino_canceled': {
        'es': 'La operación de guardar como INO fue cancelada.',
        'en': 'The save as INO operation was canceled.'
    },
    'dialog.file_not_found': {
        'es': 'Archivo no encontrado',
        'en': 'File Not Found'
    },
    'dialog.example_not_found': {
        'es': 'El archivo del ejemplo en la ruta {path} no existe.',
        'en': 'The example file at path {path} does not exist.'
    },
    'dialog.save_success': {
        'es': 'Guardado Exitoso',
        'en': 'Save Successful'
    },
    'dialog.file_saved': {
        'es': 'El archivo se guardó correctamente en: {path}',
        'en': 'The file was saved successfully at: {path}'
    },
    'dialog.ino_saved': {
        'es': 'El archivo se guardó correctamente como INO en: {path}',
        'en': 'The file was saved successfully as INO at: {path}'
    },
    'dialog.save_error': {
        'es': 'Error al guardar',
        'en': 'Save Error'
    },
    'dialog.could_not_save': {
        'es': 'No se pudo guardar el archivo: {error}',
        'en': 'Could not save file: {error}'
    },
    'dialog.could_not_save_ino': {
        'es': 'No se pudo guardar el archivo INO: {error}',
        'en': 'Could not save INO file: {error}'
    },
    
    # ========== MONITOR SERIE / GRÁFICO SERIAL ==========
    'monitor.title': {
        'es': 'Monitor Serial',
        'en': 'Serial Monitor'
    },
    'monitor.connect': {
        'es': 'Conectar',
        'en': 'Connect'
    },
    'monitor.disconnect': {
        'es': 'Desconectar',
        'en': 'Disconnect'
    },
    'monitor.graph': {
        'es': 'Gráfico',
        'en': 'Graph'
    },
    'monitor.port': {
        'es': 'Puerto:',
        'en': 'Port:'
    },
    'monitor.baudrate': {
        'es': 'Baudrate:',
        'en': 'Baudrate:'
    },
    'monitor.console': {
        'es': 'Consola:',
        'en': 'Console:'
    },
    'monitor.send': {
        'es': 'Enviar',
        'en': 'Send'
    },
    'monitor.clear': {
        'es': 'Limpiar',
        'en': 'Clear'
    },
    'monitor.save_as': {
        'es': 'Guardar como:',
        'en': 'Save as:'
    },
    'monitor.save': {
        'es': 'Guardar',
        'en': 'Save'
    },
    'monitor.text': {
        'es': 'Texto',
        'en': 'Text'
    },
    'monitor.image': {
        'es': 'Imagen',
        'en': 'Image'
    },
    'monitor.both': {
        'es': 'Ambos',
        'en': 'Both'
    },
    'monitor.connection_opened': {
        'es': 'Conexión abierta: {port}',
        'en': 'Connection opened: {port}'
    },
    'monitor.connection_closed': {
        'es': 'Conexión cerrada: {port}',
        'en': 'Connection closed: {port}'
    },
    'monitor.connection_error': {
        'es': 'Error al abrir conexión: {port}',
        'en': 'Error opening connection: {port}'
    },
    'monitor.show_console': {
        'es': 'Consola',
        'en': 'Console'
    },
    'monitor.show_graph': {
        'es': 'Gráfico',
        'en': 'Graph'
    },
    
    # ========== EJEMPLOS ==========
    'example.arduino.variables': {
        'es': 'Variables',
        'en': 'Variables'
    },
    'example.arduino.variables_text': {
        'es': 'Variables de texto',
        'en': 'Variables text'
    },
    'example.arduino.variables_serial': {
        'es': 'Variables Serial',
        'en': 'Serial Variables'
    },
    'example.arduino.led_blink': {
        'es': 'Parpadeo Led',
        'en': 'LED Blink'
    },
    'example.arduino.led_blink_3': {
        'es': 'Parpadeo 3 Led',
        'en': 'LED Blink 3'
    },
    'example.arduino.led_blink_for': {
        'es': 'Parpadeo Led Bucle For',
        'en': 'LED Blink For Loop'
    },
    'example.arduino.knight_rider': {
        'es': 'Jinete Led',
        'en': 'Knight Rider'
    },
    'example.arduino.led_fade': {
        'es': 'Desvanecido Led',
        'en': 'LED Fade'
    },
    'example.arduino.serial_counter': {
        'es': 'Contador Serial',
        'en': 'Serial Counter'
    },
    'example.arduino.serial_switch': {
        'es': 'Interruptor Led Serial',
        'en': 'Serial LED Switch'
    },
    'example.modular.serial_communication': {
        'es': 'Comunicacion Serial',
        'en': 'Serial Communication'
    },
    'example.modular.digital_actuator': {
        'es': 'Actuador Digital',
        'en': 'Digital Actuator'
    },
    'example.modular.digital_sensor': {
        'es': 'Sensor Digital',
        'en': 'Digital Sensor'
    },
    'example.modular.analog_sensor': {
        'es': 'Sensor Analogico',
        'en': 'Analog Sensor'
    },
    'example.modular.servo_actuator': {
        'es': 'Actuador Servomotor',
        'en': 'Servo Actuator'
    },
    'example.modular.ultrasonic_sensor': {
        'es': 'Sensor Ultrasonido',
        'en': 'Ultrasonic Sensor'
    },
    'example.modular.motor_dc': {
        'es': 'Actuador Motor DC',
        'en': 'DC Motor Actuator'
    },
    'example.betto.walking': {
        'es': 'Betto Caminando',
        'en': 'Betto Walking'
    },
    'example.betto.dancing': {
        'es': 'Betto Bailando',
        'en': 'Betto Dancing'
    },
    'example.betto.singing': {
        'es': 'Betto Cantando',
        'en': 'Betto Singing'
    },
    'example.betto.avoiding': {
        'es': 'Betto Evitando',
        'en': 'Betto Avoiding'
    },
    'example.betto.iot': {
        'es': 'Betto IoT',
        'en': 'Betto IoT'
    },
    'example.carlitto.motor': {
        'es': 'Carlitto Motor',
        'en': 'Carlitto Motor'
    },
    'example.carlitto.moving': {
        'es': 'Carlitto Moviendose',
        'en': 'Carlitto Moving'
    },
    'example.carlitto.bluetooth': {
        'es': 'Carlitto Bluetooth',
        'en': 'Carlitto Bluetooth'
    },
    'example.carlitto.iot': {
        'es': 'Carlitto IoT',
        'en': 'Carlitto IoT'
    },
    'example.blass.servo': {
        'es': 'Blass Servo',
        'en': 'Blass Servo'
    },
    'example.blass.moving': {
        'es': 'Blass Moviendose',
        'en': 'Blass Moving'
    },
    'example.blass.bluetooth': {
        'es': 'Blass Bluetooth',
        'en': 'Blass Bluetooth'
    },
    'example.blass.iot': {
        'es': 'Blass IoT',
        'en': 'Blass IoT'
    },
    'example.category.arduino': {
        'es': 'Arduino',
        'en': 'Arduino'
    },
    'example.category.modular': {
        'es': 'Modular',
        'en': 'Modular'
    },
    'example.category.betto': {
        'es': 'Robot Betto',
        'en': 'Betto Robot'
    },
    'example.category.carlitto': {
        'es': 'Robot Carlitto',
        'en': 'Carlitto Robot'
    },
    'example.category.blass': {
        'es': 'Robot Blass',
        'en': 'Blass Robot'
    },
    
    # ========== ACERCA DE ==========
    'about.title': {
        'es': 'Acerca de Fab Blocks IDE',
        'en': 'About Fab Blocks IDE'
    },
    'about.developed_by': {
        'es': 'Desarrollado por:',
        'en': 'Developed by:'
    },
    'about.company': {
        'es': 'Programación y Automatización Código S.A.C.',
        'en': 'Programming and Automation Código S.A.C.'
    },
    'about.description': {
        'es': 'Fab Blocks IDE es una plataforma de programación para las tarjetas de desarrollo Modular V1 y Arduino, que permite el rápido y fácil prototipado de proyectos electrónicos utilizando la programación por bloques de Google Blockly.',
        'en': 'Fab Blocks IDE is a programming platform for Modular V1 and Arduino development boards that enables fast and easy prototyping of electronic projects using Google Blockly visual programming.'
    },
    'about.learn': {
        'es': 'Aprende cómo iniciar en',
        'en': 'Learn how to get started at'
    },
    'about.buy': {
        'es': 'Compra el kit Modular V1 y sus módulos en',
        'en': 'Buy Modular V1 kit and modules at'
    },
    'about.courses': {
        'es': 'Aprende con nuestros cursos en',
        'en': 'Learn with our courses at'
    },
    'about.designed_by': {
        'es': 'Diseñado por:',
        'en': 'Designed by:'
    },
    'about.programmed_by': {
        'es': 'Programado por:',
        'en': 'Programmed by:'
    },
}


def set_language(language_code):
    """
    Establece el idioma actual de la aplicación.
    
    Args:
        language_code (str): Código del idioma ('es' para español, 'en' para inglés)
    
    Ejemplo:
        set_language('en')  # Cambiar a inglés
    """
    global _current_language
    if language_code in ['es', 'en']:
        _current_language = language_code
    else:
        print(f"Idioma '{language_code}' no soportado. Usando español por defecto.")
        _current_language = 'es'


def get_language():
    """
    Obtiene el idioma actual.
    
    Returns:
        str: Código del idioma actual ('es' o 'en')
    """
    return _current_language


def get_text(key, **kwargs):
    """
    Obtiene el texto traducido para una clave.
    
    Args:
        key (str): Clave de traducción (ej: 'menu.file', 'button.verify')
        **kwargs: Argumentos para formateo (ej: path=value para {path})
    
    Returns:
        str: Texto traducido en el idioma actual
    
    Ejemplo:
        texto = get_text('menu.file')  # Obtiene "Archivo" o "File"
        error = get_text('dialog.file_saved', path='/home/project.fab')
    """
    if key not in TRANSLATIONS:
        return f"[MISSING TRANSLATION: {key}]"
    
    text = TRANSLATIONS[key].get(_current_language, TRANSLATIONS[key].get('es', key))
    
    # Formatear con argumentos si existen
    if kwargs:
        try:
            text = text.format(**kwargs)
        except KeyError as e:
            print(f"Error formateando texto '{key}': falta parámetro {e}")
    
    return text


def get_supported_languages():
    """
    Obtiene lista de idiomas soportados.
    
    Returns:
        list: Lista de códigos de idioma soportados
    
    Ejemplo:
        idiomas = get_supported_languages()  # ['es', 'en']
    """
    return ['es', 'en']


# Funciones de conveniencia para idiomas específicos
def get_text_es(key, **kwargs):
    """Obtiene texto en español específicamente."""
    old_lang = _current_language
    set_language('es')
    result = get_text(key, **kwargs)
    set_language(old_lang)
    return result


def get_text_en(key, **kwargs):
    """Obtiene texto en inglés específicamente."""
    old_lang = _current_language
    set_language('en')
    result = get_text(key, **kwargs)
    set_language(old_lang)
    return result
