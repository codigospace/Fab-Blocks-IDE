import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QPushButton, QVBoxLayout, QWidget, QComboBox, QLabel, QHBoxLayout, QLineEdit
from PyQt5.QtCore import QObject, pyqtSignal, QTimer
from PyQt5.QtSerialPort import QSerialPort
import serial.tools.list_ports
import pyqtgraph as pg
from collections import deque
import time

class SerialMonitor(QObject):
    data_received = pyqtSignal(str)
    port_opened = pyqtSignal()
    port_closed = pyqtSignal()

    def __init__(self, parent=None):
        super().__init__(parent)
        self.serial = QSerialPort()
        self.serial.readyRead.connect(self.read_serial)

    def open_port(self, port_name, baudrate):
        self.serial.setPortName(port_name)
        self.serial.setBaudRate(baudrate)
        if self.serial.open(QSerialPort.ReadWrite):
            self.port_opened.emit()
            return True
        else:
            return False

    def close_port(self):
        self.serial.close()
        self.port_closed.emit()

    def read_serial(self):
        while self.serial.canReadLine():
            data = self.serial.readLine().data().decode('ascii').strip()
            if data:
                self.data_received.emit(data)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Serial Monitor')
        self.setGeometry(100, 100, 800, 600)

        self.text_edit = QTextEdit(self)
        self.text_edit.setReadOnly(True)

        self.plot = pg.PlotWidget(self)
        self.plot.hide()

        self.start_button = QPushButton('Conectar', self)
        self.start_button.clicked.connect(self.toggle_connection)

        self.port_combo = QComboBox(self)
        self.baud_combo = QComboBox(self)

        self.populate_port_combo()
        self.populate_baud_combo()

        port_label = QLabel('Puerto:')
        baud_label = QLabel('Baudrate:')
        self.console_label = QLabel('Consola:')
        self.console_text = QTextEdit(self)
        self.console_text.setReadOnly(True)
        self.console_text.setMaximumHeight(100)

        self.send_text = QLineEdit(self)
        self.send_button = QPushButton('Enviar', self)
        self.send_button.clicked.connect(self.send_data)

        layout = QVBoxLayout()

        send_layout = QHBoxLayout()
        send_layout.addWidget(self.send_text)
        send_layout.addWidget(self.send_button)

        layout.addLayout(send_layout)

        layout.addWidget(self.text_edit)
        layout.addWidget(self.plot)

        button_layout = QHBoxLayout()
        button_layout.addWidget(port_label)
        button_layout.addWidget(self.port_combo)
        button_layout.addWidget(baud_label)
        button_layout.addWidget(self.baud_combo)
        button_layout.addWidget(self.start_button)

        layout.addLayout(button_layout)
        layout.addWidget(self.console_label)
        layout.addWidget(self.console_text)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        self.serial_monitor = SerialMonitor()
        self.serial_monitor.data_received.connect(self.display_data)
        self.serial_monitor.port_opened.connect(self.populate_port_combo)
        self.serial_monitor.port_closed.connect(self.populate_port_combo)

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_ports)
        self.timer.start(1000)

        self.dataX = deque(maxlen=300)
        self.dataY1 = deque(maxlen=300)
        self.dataY2 = deque(maxlen=300)
        self.curve1 = self.plot.plot(pen='y')
        self.curve2 = self.plot.plot(pen='g')

        self.start_time = None  # Se inicializará cuando se abra el puerto
        self.last_update_time = None

    def populate_port_combo(self):
        ports = [port.device for port in serial.tools.list_ports.comports()]
        self.port_combo.clear()
        self.port_combo.addItems(ports)

    def populate_baud_combo(self):
        baudrates = ['9600', '19200', '38400', '57600', '115200']
        self.baud_combo.addItems(baudrates)

    def toggle_connection(self):
        port_name = self.port_combo.currentText()
        baudrate = int(self.baud_combo.currentText())
        if self.serial_monitor.serial.isOpen():
            self.serial_monitor.close_port()
            self.start_button.setText('Conectar')
            self.console_text.append(f'Conexión cerrada: {port_name}')
        else:
            if self.serial_monitor.open_port(port_name, baudrate):
                self.start_button.setText('Desconectar')
                self.start_time = time.time()  # Inicializar el tiempo cuando se abre el puerto
                self.last_update_time = self.start_time  # Inicializar el último tiempo de actualización
                self.console_text.append(f'Conexión abierta: {port_name}')
            else:
                self.console_text.append(f'Error al abrir conexión: {port_name}')

    def send_data(self):
        if self.serial_monitor.serial.isOpen():
            data = self.send_text.text()
            self.serial_monitor.serial.write(data.encode())
            self.console_text.append(f'Datos enviados: {data}')
            self.send_text.clear()

    def display_data(self, data):
        self.text_edit.append(data)

        try:
            current_time = time.time()
            valores = data.split(',')
            print("Values:", valores)
            if len(valores) == 2:
                valor1 = float(valores[0])
                valor2 = float(valores[1])
                tiempo_transcurrido = current_time - self.start_time
                self.dataX.append(tiempo_transcurrido)
                self.dataY1.append(valor1)
                self.dataY2.append(valor2)
                self.curve1.setData(list(self.dataX), list(self.dataY1))
                self.curve2.setData(list(self.dataX), list(self.dataY2))
                self.plot.setXRange(max(0, tiempo_transcurrido - 10), tiempo_transcurrido)
                self.last_update_time = current_time
        except ValueError:
            pass

    def update_ports(self):
        self.populate_port_combo()

def run_serial_monitor_app():
    # Verificar si ya hay una aplicación en ejecución
    if not QApplication.instance():
        app = QApplication(sys.argv)
    else:
        app = QApplication.instance()

    window = MainWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    run_serial_monitor_app()
