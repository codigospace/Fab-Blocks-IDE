import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QPushButton, QVBoxLayout, QWidget, QComboBox, QLabel, QHBoxLayout, QLineEdit
from PyQt5.QtCore import QTimer, QObject, pyqtSignal
import pyqtgraph as pg
from collections import deque
import time
import serial.tools.list_ports
from PyQt5.QtSerialPort import QSerialPort
import os
import pyqtgraph.exporters

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
        self.plot.addLegend(colCount=5)

        self.start_button = QPushButton('Conectar', self)
        self.start_button.clicked.connect(self.toggle_connection)

        self.graph_button = QPushButton('Gráfico', self)
        self.graph_button.clicked.connect(self.toggle_graph)

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

        save_label = QLabel('Guardar como:', self)

        self.save_option_combo = QComboBox(self)
        self.save_option_combo.addItems(["Texto", "Imagen", "Ambos"])

        # Agregar botón de guardar
        self.save_button = QPushButton('Guardar', self)
        self.save_button.clicked.connect(self.save_option)

        button_layout = QHBoxLayout()
        button_layout.addWidget(port_label)
        button_layout.addWidget(self.port_combo)
        button_layout.addWidget(baud_label)
        button_layout.addWidget(self.baud_combo)
        button_layout.addWidget(self.start_button)
        button_layout.addWidget(self.graph_button)
        button_layout.addWidget(save_label)
        button_layout.addWidget(self.save_option_combo)
        button_layout.addWidget(self.save_button)

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
        self.dataY = []
        self.curves = []
        self.colors = ['y', 'g', 'b', 'r', 'w']

        self.variable_indices = {}

        self.start_time = None
        self.last_update_time = None
        
        self.data_folder = self.get_data_folder()

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
                self.start_time = time.time()
                self.last_update_time = self.start_time
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

        current_time = time.time()
        tiempo_transcurrido = current_time - self.start_time

        try:
            variables = data.split(',')
            has_named_variables = False

            for variable in variables:
                if ':' in variable:
                    has_named_variables = True
                    break

            if has_named_variables:
                # Procesar datos con nombres de variables
                for variable in variables:
                    name, value = variable.split(':')
                    name = name.strip()
                    value = float(value)
                    if name not in self.variable_indices:
                        self.variable_indices[name] = len(self.dataY)
                        self.dataY.append(deque(maxlen=300))
                        self.curves.append(self.plot.plot(pen=self.colors[len(self.dataY) - 1]))
                        self.plot.plotItem.legend.addItem(self.curves[-1], name=name)  # Agregar la línea a la leyenda
                    self.dataY[self.variable_indices[name]].append(value)
            else:
                # Procesar datos numéricos
                valores = [float(valor) for valor in variables]
                num_valores = len(valores)
                if num_valores > 0:
                    # Agregar series de datos si es necesario
                    while len(self.dataY) < num_valores:
                        self.dataY.append(deque(maxlen=300))
                        self.curves.append(self.plot.plot(pen=self.colors[len(self.dataY) - 1]))
                        self.plot.plotItem.legend.addItem(self.curves[-1], name=f'Línea {len(self.dataY)}')  # Agregar la línea a la leyenda con un nombre único

                    # Actualizar los datos de cada serie
                    for i, valor in enumerate(valores):
                        self.dataY[i].append(valor)

            self.dataX.append(tiempo_transcurrido)

            for i in range(len(self.dataY)):
                self.curves[i].setData(list(self.dataX), list(self.dataY[i]))

            self.plot.setXRange(max(0, tiempo_transcurrido - 10), max(80, tiempo_transcurrido))
            self.last_update_time = current_time

        except ValueError:
            pass

    def update_ports(self):
        self.populate_port_combo()

    def toggle_graph(self, show_graph):
        if show_graph:
            self.show_graph()
        else:
            self.hide_graph()

    def show_graph(self):
        self.text_edit.hide()
        self.plot.show()
        self.graph_button.setText('Monitor')
        self.graph_button.clicked.disconnect()  # Desconectar el botón del método anterior
        self.graph_button.clicked.connect(lambda: self.toggle_graph(False))  # Conectar el botón al nuevo método

    def hide_graph(self):
        self.plot.hide()
        self.text_edit.show()
        self.graph_button.setText('Gráfico')
        self.graph_button.clicked.disconnect()  # Desconectar el botón del método anterior
        self.graph_button.clicked.connect(lambda: self.toggle_graph(True))
    
    def get_data_folder(self):
        # current_date = time.strftime("%Y-%m-%d")
        # folder_name = f"data_{current_date}"
        # if not os.path.exists(folder_name):
        #     os.makedirs(folder_name)
        # return folder_name
        folder_name = "data_serial"
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        return folder_name

    def save_text_edit_content(self, filename):
        with open(filename, 'w') as file:
            file.write(self.text_edit.toPlainText())

    def save_plot_as_image(self, filename):
        exporter = pg.exporters.ImageExporter(self.plot.plotItem)
        exporter.export(filename)

    def handle_save_option(self, index):
        option = self.save_option_combo.itemText(index)
        if option == "Texto":
            file_path = os.path.join(self.data_folder, 'contenido.csv')
            self.save_text_edit_content(file_path)
        elif option == "Imagen":
            file_path = os.path.join(self.data_folder, 'grafico.png')
            self.save_plot_as_image(file_path)
        elif option == "Ambos":
            text_file_path = os.path.join(self.data_folder, 'contenido.csv')
            self.save_text_edit_content(text_file_path)
            image_file_path = os.path.join(self.data_folder, 'grafico.png')
            self.save_plot_as_image(image_file_path)
    
    def save_option(self):
        index = self.save_option_combo.currentIndex()
        self.handle_save_option(index)

def run_serial_monitor_app(show_graph=False):
    if not QApplication.instance():
        app = QApplication(sys.argv)
    else:
        app = QApplication.instance()

    window = MainWindow()
    window.show()
    window.toggle_graph(show_graph)
    sys.exit(app.exec_())


if __name__ == '__main__':
    run_serial_monitor_app()
