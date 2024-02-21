import sys
import serial
from PyQt5.QtWidgets import QApplication, QMainWindow
import pyqtgraph as pg
from collections import deque
import time

puerto = "COM3"
baudrate = 9600
ser = serial.Serial(puerto, baudrate)

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
        self.dataY = []  # Lista de deques para almacenar los valores de Y para cada serie
        self.curves = []  # Lista de curvas para cada serie
        self.colors = ['y', 'g', 'b', 'r', 'w']  # Colores para las curvas

        self.timer = pg.QtCore.QTimer()
        self.timer.timeout.connect(self.update_plot)
        self.timer.start(10)  # Ajustar el intervalo de actualización del gráfico a 50 milisegundos (20 actualizaciones por segundo)
        self.start_time = time.time()
        self.last_update_time = self.start_time

    def update_plot(self):
        current_time = time.time()
        if current_time - self.last_update_time < 0.01:  
            return

        line = ser.readline().decode('utf-8').strip()
        try:
            valores = [float(valor) for valor in line.split(',')]
            if len(valores) > 0:
                if not self.dataY:  
                    for i in range(len(valores)):
                        self.dataY.append(deque(maxlen=600))  # Cambia maxlen a 600 para 60 segundos
                        self.curves.append(self.plot.plot(pen=self.colors[i]))
                tiempo_transcurrido = current_time - self.start_time
                self.dataX.append(tiempo_transcurrido)
                for i, valor in enumerate(valores):
                    self.dataY[i].append(valor)
                    self.curves[i].setData(list(self.dataX), list(self.dataY[i]))
                self.plot.setXRange(max(0, tiempo_transcurrido - 60), max(60, tiempo_transcurrido))  # Cambia el límite inferior a tiempo_transcurrido - 60 y el límite superior a 80
                self.last_update_time = current_time
        except ValueError:
            pass


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ventana = GraficaTiempoReal()
    ventana.show()
    sys.exit(app.exec_())
