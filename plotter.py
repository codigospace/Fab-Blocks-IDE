import sys
import serial
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt5.QtCore import QTimer
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt

class SerialPlotter(QMainWindow):
    def __init__(self, port):
        super().__init__()

        self.setWindowTitle("Serial Plotter")
        self.setGeometry(100, 100, 800, 600)

        self.port = port
        self.serial_connection = serial.Serial(port, 9600)

        self.setup_ui()

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_plot)
        self.timer.start(1000)  # Actualiza el gráfico cada segundo

    def setup_ui(self):
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        self.layout = QVBoxLayout(self.central_widget)

        self.figure = Figure()
        self.canvas = FigureCanvas(self.figure)
        self.layout.addWidget(self.canvas)

        self.ax = self.figure.add_subplot(111)
        self.ax.set_xlabel("Time")
        self.ax.set_ylabel("Value")
        self.ax.set_title("Serial Plotter")

    def update_plot(self):
        x_data = []
        y_data = []

        while self.serial_connection.in_waiting:
            line = self.serial_connection.readline().decode().strip()
            data = line.split(',')
            if len(data) == 2:
                x, y = map(float, data)
                x_data.append(x)
                y_data.append(y)

        if x_data and y_data:
            self.ax.clear()
            self.ax.plot(x_data, y_data)
            self.ax.set_xlabel("Time")
            self.ax.set_ylabel("Value")
            self.ax.set_title("Serial Plotter")
            self.canvas.draw()

    def closeEvent(self, event):
        self.serial_connection.close()
        event.accept()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = SerialPlotter("COM3")  # Replace "COM3" with your serial port
    window.show()
    sys.exit(app.exec_())
