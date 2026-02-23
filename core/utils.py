import os
import sys
import serial
import serial.tools.list_ports
from PyQt5.QtGui import QTextCursor

def resource_path(relative_path):
    """
    Obtiene la ruta absoluta necesaria para PyInstaller.
    Funciona tanto en modo desarrollo como en el ejecutable empaquetado.
    """
    try:
        # PyInstaller crea una carpeta temporal y guarda su ruta en _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

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
