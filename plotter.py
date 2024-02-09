import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt5.QtChart import QChart, QChartView, QLineSeries
from PyQt5.QtCore import Qt, QIODevice
from PyQt5.QtSerialPort import QSerialPort, QSerialPortInfo


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Gráfica en tiempo real con Arduino")
        self.setGeometry(100, 100, 800, 600)

        layout = QVBoxLayout()
        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

        # Crear la gráfica y la vista
        self.chart_view = QChartView()
        self.chart = QChart()
        self.series = QLineSeries()
        self.chart.addSeries(self.series)
        self.chart.createDefaultAxes()
        self.chart_view.setChart(self.chart)
        layout.addWidget(self.chart_view)

        # Configurar el puerto serie
        self.serial_port = QSerialPort()
        self.serial_port.setBaudRate(9600)
        self.serial_port.readyRead.connect(self.read_data)

        # Abrir el puerto serie
        self.open_serial_port()

    def open_serial_port(self):
        available_ports = QSerialPortInfo.availablePorts()
        for port_info in available_ports:
            self.serial_port.setPort(port_info)
            if self.serial_port.open(QIODevice.ReadOnly):
                print(f"Conectado a {port_info.portName()}")
                break
        else:
            print("No hay puertos serie disponibles")

    def read_data(self):
        while self.serial_port.canReadLine():
            data = self.serial_port.readLine().data().decode().strip()
            print(data)
            try:
                # Parsear los datos
                x_value, y_value = data.split(",")
                x_value = 12
                y_value = 20

                # Agregar los datos a la serie y actualizar la gráfica
                self.series.append(x_value, y_value)
                self.chart.update()
            except ValueError:
                print(f"Error al parsear datos: {data}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
