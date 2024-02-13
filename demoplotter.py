import sys
import serial
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QComboBox, QPushButton, QTextEdit
import pyqtgraph as pg
from collections import deque
import time
import serial.tools.list_ports

class GraficaTiempoReal(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle("Gráfica en tiempo real")
        self.setGeometry(100, 100, 800, 600)

        self.central_widget = pg.GraphicsLayoutWidget()
        self.setCentralWidget(self.central_widget)

        self.plot = self.central_widget.addPlot(title="Gráfica en tiempo real")
        self.plot.setLabel('left', 'Valores')
        self.plot.setLabel('bottom', 'Tiempo (s)')
        self.plot.setXRange(0, 10)  # Establecer el límite inicial en el eje X para mostrar los últimos 10 segundos

        self.dataX = deque(maxlen=300)  # Usamos deque para almacenar los datos
        self.dataY1 = deque(maxlen=300)
        self.dataY2 = deque(maxlen=300)
        self.curve1 = self.plot.plot(pen='y')
        self.curve2 = self.plot.plot(pen='g')

        self.timer = pg.QtCore.QTimer()
        self.timer.timeout.connect(self.update_plot)

        layout = QVBoxLayout()
        layout.addWidget(self.central_widget)

        self.port_combo = QComboBox()
        self.populate_port_combo()
        layout.addWidget(self.port_combo)

        self.connect_button = QPushButton('Conectar/Desconectar')
        self.connect_button.clicked.connect(self.toggle_connection)
        layout.addWidget(self.connect_button)

        self.change_mode_button = QPushButton('Cambiar a Monitor Serial')
        self.change_mode_button.clicked.connect(self.change_mode)
        layout.addWidget(self.change_mode_button)

        self.text_edit = QTextEdit(self)
        self.text_edit.setReadOnly(True)
        layout.addWidget(self.text_edit)

        self.widget = QWidget()
        self.widget.setLayout(layout)
        self.setCentralWidget(self.widget)

        self.connected = False
        self.serial = None

    def populate_port_combo(self):
        ports = [port.device for port in serial.tools.list_ports.comports()]
        self.port_combo.clear()
        self.port_combo.addItems(ports)

    def toggle_connection(self):
        if not self.connected:
            try:
                port_name = self.port_combo.currentText()
                self.serial = serial.Serial(port_name, 9600)
                self.connected = True
                self.timer.start(50)  # Iniciar actualización del gráfico
            except serial.SerialException as e:
                print(f'Error al abrir puerto: {e}')
        else:
            if self.serial:
                self.serial.close()
            self.connected = False
            self.timer.stop()  # Detener actualización del gráfico

    def update_plot(self):
        if self.connected:
            current_time = time.time()
            line = self.serial.readline().decode('latin1').strip()
            try:
                valores = line.split(',')
                print("Values:", valores)  # Debug print
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
            except ValueError:
                pass

    def change_mode(self):
        if self.text_edit.isHidden():
            self.text_edit.show()
            self.central_widget.hide()
            self.change_mode_button.setText('Cambiar a Gráfico')
        else:
            self.text_edit.hide()
            self.central_widget.show()
            self.change_mode_button.setText('Cambiar a Monitor Serial')

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ventana = GraficaTiempoReal()
    ventana.show()
    sys.exit(app.exec_())
