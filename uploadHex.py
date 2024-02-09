import os
import subprocess

def upload_sketch(URI, FILE, CPU, PORT):
    # Configuración del CPU, procesador y velocidad de baudios según la CPU seleccionada
    cpu_config = {
        'uno': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
        'atmega328': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '115200'},
        'atmega328old': {'TEXT_CPU': 'atmega328p', 'PROCESSOR': 'arduino', 'BAUD': '57600'},
        'atmega168': {'TEXT_CPU': 'atmega168', 'PROCESSOR': 'arduino', 'BAUD': '19200'},
        'atmega2560': {'TEXT_CPU': 'atmega2560', 'PROCESSOR': 'wiring', 'BAUD': '115200'}
    }

    # Obtener la configuración correspondiente a la CPU seleccionada
    config = cpu_config.get(CPU.lower())

    if config:
        TEXT_CPU = config['TEXT_CPU']
        PROCESSOR = config['PROCESSOR']
        BAUD = config['BAUD']

        # Preparar ruta del archivo .hex
        hex_file = os.path.join(URI, 'build', f'{FILE}.ino.hex')

        # Preparar comando para subir el sketch
        avrdude_path = 'D:/Proyectos/Fab-Blocks-IDE/arduinoDev/hardware/tools/avr/bin/avrdude'
        avrdude_conf = 'D:/Proyectos/Fab-Blocks-IDE/arduinoDev/hardware/tools/avr/etc/avrdude.conf'
        upload_command = f'{avrdude_path} -C{avrdude_conf} -v -p{TEXT_CPU} -c{PROCESSOR} -P{PORT} -b{BAUD} -D -Uflash:w:{hex_file}:i'

        # Ejecutar el comando de subida
        subprocess.run(upload_command, shell=True)
    else:
        print("Configuración de CPU no encontrada.")

# Ejemplo de uso
# URI = 'D:/Proyectos/modulinoQt'
# FILE = 'extracted_code'
# CPU = 'uno'
# PORT = 'COM3'

# upload_sketch(URI, FILE, CPU, PORT)
