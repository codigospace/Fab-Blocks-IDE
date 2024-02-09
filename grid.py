import sys
import subprocess
from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QVBoxLayout, QPushButton, QWidget
from PyQt5.QtCore import QThread, pyqtSignal

class CommandRunner(QThread):
    output_received = pyqtSignal(str)  # Señal para emitir la salida del comando

    def __init__(self, command):
        super().__init__()
        self.command = command

    def run(self):
        process = subprocess.Popen(self.command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in process.stdout:
            self.output_received.emit(line.strip())
        process.wait()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('Consola en QTextEdit')
        self.setGeometry(100, 100, 800, 600)

        self.textedit = QTextEdit()
        self.textedit.setReadOnly(True)

        self.button = QPushButton("Ejecutar Comando")
        self.button.clicked.connect(self.runCommand)

        layout = QVBoxLayout()
        layout.addWidget(self.textedit)
        layout.addWidget(self.button)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

    def runCommand(self):
        command = '''D:/Proyectos/modulinoDev/arduinoDev/arduino-builder -compile -logger=machine -hardware D:/Proyectos/modulinoDev/arduinoDev/hardware -tools D:/Proyectos/modulinoDev/arduinoDev/tools-builder -tools D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -built-in-libraries D:/Proyectos/modulinoDev/arduinoDev/libraries -libraries "D:/Programas/OneDrive - Instituto Superior Tecnológico Tecsup/Documentos/Arduino/libraries" -fqbn arduino:avr:nano:cpu=atmega328 -ide-version=10815 -build-path C:/Users/Leonardo/AppData/Local/Temp/arduino_build_test -warnings=none -build-cache C:/Users/Leonardo/AppData/Local/Temp/arduino_cache_93527 -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.arduinoOTA.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.3.0.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -prefs=runtime.tools.avrdude.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino17.path=D:/Proyectos/modulinoDev/arduinoDev/hardware/tools/avr -verbose D:/Proyectos/modulinoQt/extracted_code.ino'''
        self.runner = CommandRunner(command)
        self.runner.output_received.connect(self.updateOutput)
        self.runner.start()

    def updateOutput(self, output):
        self.textedit.append(output)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    mainWindow = MainWindow()
    mainWindow.show()
    sys.exit(app.exec_())
