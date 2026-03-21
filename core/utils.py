import os
import sys
import serial
import serial.tools.list_ports
from PyQt5.QtGui import QTextCursor

def resource_path(relative_path):
    """
    Obtiene la ruta absoluta necesaria para PyInstaller.
    Busca en este orden:
    1. Directorio del ejecutable (--onedir: carpetas html/, icons/, etc al lado del .exe)
    2. En carpeta _internal (algunos casos de PyInstaller)
    3. Directorio temporal de PyInstaller (_MEIPASS)
    4. Modo desarrollo (relativo a core/utils.py)
    """
    # 1. Si está congelado (compilado), buscar junto al .exe
    if getattr(sys, 'frozen', False):
        exe_dir = os.path.dirname(sys.executable)
        
        # Intenta primero encontrarlo directamente al lado del exe
        path = os.path.join(exe_dir, relative_path)
        if os.path.exists(path):
            print(f"DEBUG resource_path: Encontrado junto al exe: {path}")
            return path
        
        # Intenta en carpeta _internal (algunos casos de onedir)
        internal_dir = os.path.join(exe_dir, '_internal')
        path = os.path.join(internal_dir, relative_path)
        if os.path.exists(path):
            print(f"DEBUG resource_path: Encontrado en _internal: {path}")
            return path

    # 2. Intentar en _MEIPASS (carpeta temporal de PyInstaller --onefile)
    if hasattr(sys, '_MEIPASS'):
        path = os.path.join(sys._MEIPASS, relative_path)
        if os.path.exists(path):
            print(f"DEBUG resource_path: Encontrado en _MEIPASS: {path}")
            return path

    # 3. Modo desarrollo (relativo a core/utils.py)
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(base_path, relative_path)
    print(f"DEBUG resource_path: Fallback a modo desarrollo: {path}")
    return path

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
