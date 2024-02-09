import os
import subprocess

def compile_sketch(URI, FILE, CPU):
    # Mapeo de CPU a TEXT_CPU y PROCESSOR
    cpu_mapping = {
        'uno': ('uno', 'arduino'),
        'atmega328': ('nano:cpu=atmega328', 'arduino'),
        'atmega328old': ('nano:cpu=atmega328old', 'arduino'),
        'atmega168': ('nano:cpu=atmega168', 'arduino'),
        'atmega2560': ('mega:cpu=atmega2560', 'wiring')
    }

    # Obtener los valores correspondientes de TEXT_CPU y PROCESSOR
    TEXT_CPU, PROCESSOR = cpu_mapping.get(CPU, (None, None))

    if TEXT_CPU is None or PROCESSOR is None:
        print("CPU no válido")
        return

    # Preparar directorios
    build_path = os.path.join(URI, 'build')
    if not os.path.exists(build_path):
        os.makedirs(build_path)

    cache_path = os.path.join(URI, 'cache')
    if not os.path.exists(cache_path):
        os.makedirs(cache_path)

    # Preparar comando para el archivo .bat
    arduino_builder = 'D:/Proyectos/modulinoDev/arduinoDev/arduino-builder'
    compile_command = f'{arduino_builder} -compile -logger=machine'
    compile_command += f' -hardware D:/Proyectos/modulinoDev/arduinoDev/hardware'
    compile_command += f' -tools D:/Proyectos/modulinoDev/arduinoDev/tools-builder'
    compile_command += f' -tools D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += f' -built-in-libraries D:/Proyectos/modulinoDev/arduinoDev/libraries'
    compile_command += f' -libraries "D:/Programas/OneDrive - Instituto Superior Tecnológico Tecsup/Documentos/Arduino/libraries"'
    compile_command += f' -fqbn arduino:avr:{TEXT_CPU}'
    compile_command += ' -ide-version=10815'
    compile_command += f' -build-path {build_path}'
    compile_command += ' -warnings=none'
    compile_command += f' -build-cache {cache_path}'
    compile_command += ' -prefs=build.warn_data_percentage=75'
    compile_command += ' -prefs=runtime.tools.arduinoOTA.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += ' -prefs=runtime.tools.arduinoOTA-1.3.0.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += ' -prefs=runtime.tools.avr-gcc.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += ' -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += ' -prefs=runtime.tools.avrdude.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += ' -prefs=runtime.tools.avrdude-6.3.0-arduino17.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr'
    compile_command += f' -verbose {URI}/{FILE}.ino'

    # Ejecutar el archivo .bat
    subprocess.run(compile_command, shell=True)

    print(compile_command)

# Ejemplo de uso
# URI = 'D:/Proyectos/modulinoQt'
# FILE = 'extracted_code'
# CPU = 'atmega328'

# compile_sketch(URI, FILE, CPU)
