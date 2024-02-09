import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QAction, QComboBox, QPushButton, QVBoxLayout, QWidget, QLabel
from PyQt5.QtSerialPort import QSerialPort, QSerialPortInfo

class SerialMonitor(QMainWindow):
    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        self.setWindowTitle('Serial Monitor')
        self.setGeometry(100, 100, 600, 400)

        # Widget de texto para mostrar los datos seriales
        self.text_edit = QTextEdit(self)
        self.text_edit.setReadOnly(True)
        
        # Combobox para seleccionar el puerto
        self.port_combo = QComboBox()
        self.refresh_ports()

        # Combobox para seleccionar los baudios
        self.baud_combo = QComboBox()
        self.baud_combo.addItems(['9600', '19200', '38400', '57600', '115200'])

        # Botón para conectar/desconectar
        self.connect_button = QPushButton('Conectar')
        self.connect_button.clicked.connect(self.toggle_connection)

        # Widget de texto para enviar datos
        self.send_text = QTextEdit(self)

        # Botón para enviar datos
        self.send_button = QPushButton('Enviar')
        self.send_button.clicked.connect(self.send_data)

        # Consola para mostrar información del estado de la conexión
        self.console_label = QLabel('Consola:')
        self.console_text = QTextEdit(self)
        self.console_text.setReadOnly(True)

        # Layout vertical para organizar los widgets
        layout = QVBoxLayout()
        layout.addWidget(self.text_edit)
        layout.addWidget(self.port_combo)
        layout.addWidget(self.baud_combo)
        layout.addWidget(self.connect_button)
        layout.addWidget(self.send_text)
        layout.addWidget(self.send_button)
        layout.addWidget(self.console_label)
        layout.addWidget(self.console_text)

        # Widget central para la ventana principal
        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        # Objeto para el puerto serial
        self.serial = QSerialPort()
        self.serial.readyRead.connect(self.read_serial)

    def refresh_ports(self):
        # Limpiar el combobox y agregar los puertos disponibles
        self.port_combo.clear()
        ports = QSerialPortInfo.availablePorts()
        for port in ports:
            self.port_combo.addItem(port.portName())

    def toggle_connection(self):
        # Conectar o desconectar el puerto serial según el estado actual
        if self.serial.isOpen():
            self.serial.close()
            self.connect_button.setText('Conectar')
            self.console_text.append('Conexión serial cerrada.')
        else:
            port_name = self.port_combo.currentText()
            baud_rate = int(self.baud_combo.currentText())
            self.serial.setPortName(port_name)
            self.serial.setBaudRate(baud_rate)
            if self.serial.open(QSerialPort.ReadWrite):
                self.connect_button.setText('Desconectar')
                self.console_text.append(f'Conexión serial establecida en {port_name} a {baud_rate} baudios.')
            else:
                self.console_text.append('Error al abrir el puerto serial.')

    def send_data(self):
        # Enviar datos al puerto serial
        if self.serial.isOpen():
            data = self.send_text.toPlainText().encode()
            self.serial.write(data)
            self.console_text.append(f'Datos enviados: {data}')

    def read_serial(self):
        # Leer datos del puerto serial y mostrarlos en el widget de texto
        data = self.serial.readAll().data().decode()
        self.text_edit.append(data)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = SerialMonitor()
    window.show()
    sys.exit(app.exec_())
