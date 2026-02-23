import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QPushButton, QVBoxLayout, QWidget, QComboBox, QLabel, QHBoxLayout, QLineEdit
from PyQt5.QtCore import QTimer, QObject, pyqtSignal, QThread
import pyqtgraph as pg
from collections import deque
import time
import serial.tools.list_ports
from PyQt5.QtSerialPort import QSerialPort
import os
import pyqtgraph.exporters
from core.i18n import get_text

class SerialReaderThread(QThread):
    data_received = pyqtSignal(str)

    def __init__(self, serial_port):
        super().__init__()
        self.serial = serial_port
        self.running = True

    def run(self):
        while self.running:
            if self.serial.waitForReadyRead(100):  # Esperar hasta 100 ms para datos
                data = self.serial.readLine().data().decode('utf-8', errors='ignore').strip()
                if data:
                    self.data_received.emit(data)
            self.msleep(100)  # Pausar 100 ms para evitar sobrecarga

class SerialMonitor(QObject):
    data_received = pyqtSignal(str)
    port_opened = pyqtSignal()
    port_closed = pyqtSignal()

    def __init__(self, parent=None):
        super().__init__(parent)
        self.serial = QSerialPort()
        self.thread = None

    def open_port(self, port_name, baudrate):
        self.serial.setPortName(port_name)
        self.serial.setBaudRate(baudrate)
        if self.serial.open(QSerialPort.ReadWrite):
            self.thread = SerialReaderThread(self.serial)
            self.thread.data_received.connect(self.data_received.emit)
            self.thread.start()
            self.port_opened.emit()
            return True
        else:
            return False

    def close_port(self):
        if self.thread:
            self.thread.running = False
            self.thread.wait()
            self.thread = None
        self.serial.close()
        self.port_closed.emit()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(get_text('monitor.title'))
        self.setGeometry(100, 100, 800, 600)

        self.text_edit = QTextEdit(self)
        self.text_edit.setReadOnly(True)

        self.plot = pg.PlotWidget(self)
        self.plot.hide()
        self.plot.addLegend(colCount=5)

        self.start_button = QPushButton(get_text('monitor.connect'), self)
        self.start_button.clicked.connect(self.toggle_connection)

        self.graph_button = QPushButton(get_text('monitor.graph'), self)
        self.graph_button.clicked.connect(self.toggle_graph)

        self.port_combo = QComboBox(self)
        self.baud_combo = QComboBox(self)

        self.populate_port_combo()
        self.populate_baud_combo()

        port_label = QLabel(get_text('monitor.port'))
        baud_label = QLabel(get_text('monitor.baudrate'))
        self.console_label = QLabel(get_text('monitor.console'))
        self.console_text = QTextEdit(self)
        self.console_text.setReadOnly(True)
        self.console_text.setMaximumHeight(100)

        self.send_text = QLineEdit(self)
        self.send_button = QPushButton(get_text('monitor.send'), self)
        self.send_button.clicked.connect(self.send_data)

        self.clear_button = QPushButton(get_text('monitor.clear'), self)
        self.clear_button.clicked.connect(self.clear_data)

        layout = QVBoxLayout()

        send_layout = QHBoxLayout()
        send_layout.addWidget(self.send_text)
        send_layout.addWidget(self.send_button)
        send_layout.addWidget(self.clear_button)

        layout.addLayout(send_layout)

        layout.addWidget(self.text_edit)
        layout.addWidget(self.plot)

        save_label = QLabel(get_text('monitor.save_as'), self)

        self.save_option_combo = QComboBox(self)
        self.save_option_combo.addItems([get_text('monitor.text'), get_text('monitor.image'), get_text('monitor.both')])

        self.save_button = QPushButton(get_text('monitor.save'), self)
        self.save_button.setEnabled(False)
        self.save_button.clicked.connect(self.handle_save_option)

        self.folder_name_edit = QLineEdit(self)
        self.folder_name_edit.setVisible(False)
        self.folder_name_edit.setPlaceholderText('Nombre de la carpeta')

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
        button_layout.addWidget(self.folder_name_edit)  # Nuevo: Agregar el campo para el nombre de la carpeta

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
        
        # Bandera para rastrear si el gráfico está visible
        self.graph_visible = False

    def populate_port_combo(self):
        ports = [port.device for port in serial.tools.list_ports.comports()]
        self.port_combo.clear()
        self.port_combo.addItems(ports)

    def populate_baud_combo(self):
        baudrates = ['9600', '19200', '38400', '57600', '115200']
        self.baud_combo.addItems(baudrates)
        self.baud_combo.setCurrentText('115200')

    def toggle_connection(self):
        port_name = self.port_combo.currentText()
        baudrate = int(self.baud_combo.currentText())
        if self.serial_monitor.serial.isOpen():
            self.serial_monitor.close_port()
            self.start_button.setText(get_text('monitor.connect'))
            self.console_text.append(get_text('monitor.connection_closed', port=port_name))
        else:
            try:
                if self.serial_monitor.open_port(port_name, baudrate):
                    self.start_button.setText(get_text('monitor.disconnect'))
                    self.start_time = time.time()
                    self.last_update_time = self.start_time
                    self.console_text.append(get_text('monitor.connection_opened', port=port_name))
                else:
                    self.console_text.append(get_text('monitor.connection_error', port=port_name))
            except serial.SerialException as e:
                error_message = str(e)
                if "PermissionError" in error_message:
                    self.console_text.append(f"Error al abrir {port_name}: El puerto está en uso por otra aplicación.")
                elif "FileNotFoundError" in error_message:
                    self.console_text.append(f"Error al abrir {port_name}: El puerto no existe o ha sido desconectado.")
                else:
                    self.console_text.append(f"Error al abrir {port_name}: {error_message}")
            except Exception as e:
                self.console_text.append(f"Error inesperado al abrir {port_name}: {str(e)}")

    def send_data(self):
        if self.serial_monitor.serial.isOpen():
            data = self.send_text.text()
            self.serial_monitor.serial.write(data.encode())
            self.console_text.append(f'Datos enviados: {data}')
            self.send_text.clear()

    def display_data(self, data):
        self.console_text.append(f'Datos recibidos: {data}')
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
                for variable in variables:
                    name, value = variable.split(':')
                    name = name.strip()
                    value = float(value)
                    if name not in self.variable_indices:
                        self.variable_indices[name] = len(self.dataY)
                        self.dataY.append(deque(maxlen=300))
                        self.curves.append(self.plot.plot(pen=self.colors[len(self.dataY) - 1]))
                        self.plot.plotItem.legend.addItem(self.curves[-1], name=name)
                    self.dataY[self.variable_indices[name]].append(value)
            else:
                valores = [float(valor) for valor in variables]
                num_valores = len(valores)
                if num_valores > 0:
                    while len(self.dataY) < num_valores:
                        self.dataY.append(deque(maxlen=300))
                        self.curves.append(self.plot.plot(pen=self.colors[len(self.dataY) - 1]))
                        self.plot.plotItem.legend.addItem(self.curves[-1], name=f'Línea {len(self.dataY)}')
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
        self.graph_button.setText(get_text('monitor.show_console'))
        self.graph_visible = True
        self.graph_button.clicked.disconnect()  # Desconectar el botón del método anterior
        self.graph_button.clicked.connect(lambda: self.toggle_graph(False))  # Conectar el botón al nuevo método

    def hide_graph(self):
        self.plot.hide()
        self.text_edit.show()
        self.graph_button.setText(get_text('monitor.show_graph'))
        self.graph_visible = False
        self.graph_button.clicked.disconnect()  # Desconectar el botón del método anterior
        self.graph_button.clicked.connect(lambda: self.toggle_graph(True))
    
    def get_data_folder(self):
        folder_name = "data_serial"
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        return folder_name

    def save_text_edit_content(self, filename):
        with open(filename, 'w') as file:
            file.write(self.text_edit.toPlainText())

    def save_plot_as_image(self, filename, width=1920, height=1080):
        try:
            exporter = pg.exporters.ImageExporter(self.plot.plotItem)
            exporter.params['width'] = width

            # Ajustar el rango de visualización antes de exportar
            self.plot.setXRange(0, 20)  # 20 segundos en el eje X
            
            if self.dataY and any(len(data) > 0 for data in self.dataY):
                min_value = min([min(data) for data in self.dataY if len(data) > 0])
                max_value = max([max(data) for data in self.dataY if len(data) > 0])
                self.plot.setYRange(min=min_value, max=max_value)
            else:
                # Establecer un rango de altura predeterminado si no hay datos
                self.plot.setYRange(0, 10)  # Puedes ajustar estos valores según sea necesario

            # Ajustar el tamaño de fuente de las etiquetas
            font = pg.QtGui.QFont()
            font.setPointSize(10)  # Ajusta el tamaño según sea necesario
            self.plot.getAxis('bottom').setTickFont(font)
            self.plot.getAxis('left').setTickFont(font)
            
            # Ajustar el ancho de línea y el tamaño de los puntos
            for curve in self.curves:
                curve.setPen(width=2)
                curve.setSymbolSize(5)
            
            exporter.export(filename)
            self.console_text.append(f'Gráfico guardado en: {filename} con resolución {width}x{height}')
        except Exception as e:
            self.console_text.append(f'Error al guardar gráfico: {str(e)}')

    def handle_save_option(self):
        option = self.save_option_combo.currentText()
        folder_name = self.folder_name_edit.text().strip()

        if not folder_name:
            self.console_text.append('Por favor, ingresa un nombre para la carpeta.')
            return

        folder_path = os.path.join(self.data_folder, folder_name)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        width = 1920  # Ancho deseado para la imagen
        height = 1080  # Altura deseada para la imagen

        if option == "Texto":
            file_path = os.path.join(folder_path, 'contenido.txt')
            self.save_text_edit_content(file_path)
        elif option == "Imagen":
            file_path = os.path.join(folder_path, 'grafico.png')
            self.save_plot_as_image(file_path, width, height)
        elif option == "Ambos":
            text_file_path = os.path.join(folder_path, 'contenido.txt')
            self.save_text_edit_content(text_file_path)
            image_file_path = os.path.join(folder_path, 'grafico.png')
            self.save_plot_as_image(image_file_path, width, height)

        self.console_text.append(f'Datos guardados en: {folder_path}')

    def clear_data(self):
        self.text_edit.clear()
        self.console_text.clear()
        self.plot.clear()
        self.dataX.clear()
        self.dataY.clear()
        self.curves.clear()
        self.variable_indices.clear()
        self.plot.addLegend(colCount=5)

    def change_language(self):
        """
        Actualiza los textos de la ventana del monitor cuando cambia el idioma.
        Se llama desde qtwebhtml.py cuando el usuario cambia de idioma.
        """
        self.setWindowTitle(get_text('monitor.title'))
        
        if self.serial_monitor.serial.isOpen():
            self.start_button.setText(get_text('monitor.disconnect'))
        else:
            self.start_button.setText(get_text('monitor.connect'))
        
        # Actualizar botón gráfico según su estado actual
        if self.graph_visible:
            self.graph_button.setText(get_text('monitor.show_console'))
        else:
            self.graph_button.setText(get_text('monitor.show_graph'))
        
        self.send_button.setText(get_text('monitor.send'))
        self.clear_button.setText(get_text('monitor.clear'))
        self.save_button.setText(get_text('monitor.save'))
        self.console_label.setText(get_text('monitor.console'))

    def closeEvent(self, event):
        if self.serial_monitor.serial.isOpen():
            self.serial_monitor.close_port()
        event.accept()

def run_serial_monitor_app(show_graph=False):
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    window.toggle_graph(show_graph)
    sys.exit(app.exec_())

if __name__ == '__main__':
    run_serial_monitor_app()
