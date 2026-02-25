import os
import sys
import serial
import serial.tools.list_ports
from PyQt5.QtGui import QTextCursor

def resource_path(relative_path):
    """
    Obtiene la ruta absoluta necesaria para PyInstaller.
    Busca en:
    1. Directorio temporal de PyInstaller (_MEIPASS)
    2. Directorio del ejecutable (para recursos externos)
    3. Directorio del código fuente (desarrollo)
    """
    # 1. Intentar en _MEIPASS (interno del bundle)
    if hasattr(sys, '_MEIPASS'):
        path = os.path.join(sys._MEIPASS, relative_path)
        if os.path.exists(path):
            return path

    # 2. Intentar junto al ejecutable (recurso externo al bundle)
    exe_dir = os.path.dirname(sys.executable)
    path = os.path.join(exe_dir, relative_path)
    if os.path.exists(path):
        return path

    # 3. Intentar en modo desarrollo (relativo a core/utils.py)
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

def release_all_serial_ports():
    # Obtener una lista de todos los puertos COM disponibles
    ports = list(serial.tools.list_ports.comports())
    
    for port in ports:
        try:
            # Intentar abrir el puerto
            ser = serial.Serial(port.device)
            # Si se abre con éxito, cerrarlo inmediatamente
            ser.close()
            print(f"Puerto {port.device} liberado con éxito.")
        except serial.SerialException:
            print(f"No se pudo liberar el puerto {port.device}. Puede que ya esté cerrado o en uso por otra aplicación.")
        except Exception as e:
            print(f"Error al intentar liberar el puerto {port.device}: {str(e)}")

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
