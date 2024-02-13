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
        self.dataY1 = deque(maxlen=300)
        self.dataY2 = deque(maxlen=300)
        self.curve1 = self.plot.plot(pen='y')
        self.curve2 = self.plot.plot(pen='g')

        self.timer = pg.QtCore.QTimer()
        self.timer.timeout.connect(self.update_plot)
        self.timer.start(50)  # Ajustar el intervalo de actualización del gráfico a 50 milisegundos (20 actualizaciones por segundo)
        self.start_time = time.time()
        self.last_update_time = self.start_time

    def update_plot(self):
        current_time = time.time()
        if current_time - self.last_update_time < 0.05:  # No actualizar el gráfico si no ha pasado al menos 50 milisegundos desde la última actualización
            return

        line = ser.readline().decode('utf-8').strip()
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
                self.plot.setXRange(max(0, tiempo_transcurrido - 10), tiempo_transcurrido)  # Actualizar el rango del eje X
                self.last_update_time = current_time
        except ValueError:
            pass

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ventana = GraficaTiempoReal()
    ventana.show()
    sys.exit(app.exec_())
