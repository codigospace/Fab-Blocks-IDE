import sys
import subprocess
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QVBoxLayout, QWidget

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

        # Ejecutar el comando al iniciar la aplicación
        self.runCommand()

    def initUI(self):
        self.setWindowTitle('Consola en QTextEdit')
        self.setGeometry(100, 100, 800, 600)

        self.textedit = QTextEdit()
        self.textedit.setReadOnly(True)

        layout = QVBoxLayout()
        layout.addWidget(self.textedit)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

    def runCommand(self):
        # Comando para hacer ping a una dirección IP (en este caso, google.com)
        command = ['ping', 'google.com']
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        with process.stdout:
            for line in iter(process.stdout.readline, b''):
                try:
                    decoded_line = line.decode('utf-8').strip()
                    self.textedit.append(decoded_line)
                except UnicodeDecodeError:
                    pass

        process.wait()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    mainWindow = MainWindow()
    mainWindow.show()
    sys.exit(app.exec_())
