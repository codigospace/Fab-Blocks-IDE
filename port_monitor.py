from PyQt5.QtCore import QObject, pyqtSignal
import serial.tools.list_ports
import time

class PortMonitor(QObject):
    portChanged = pyqtSignal()

    def __init__(self):
        super().__init__()

    def run(self):
        previous_ports = []
        while True:
            current_ports = [port.device for port in serial.tools.list_ports.comports()]
            if current_ports != previous_ports:
                self.portChanged.emit()
                previous_ports = current_ports
            time.sleep(1)
