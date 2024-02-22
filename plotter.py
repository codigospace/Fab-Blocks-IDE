from PyQt5.QtWidgets import QApplication, QMainWindow, QTextEdit, QPushButton, QVBoxLayout, QWidget, QAction
from PyQt5.QtCore import Qt

class ConsoleWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Consola')
        self.resize(400, 300)

        # QTextEdit para mostrar la salida de la consola
        self.text_edit = QTextEdit()
        self.text_edit.setReadOnly(True)

        # Botón para cerrar la consola
        self.close_button = QPushButton('Cerrar')
        self.close_button.clicked.connect(self.close_console)

        # Layout vertical para organizar los widgets
        layout = QVBoxLayout()
        layout.addWidget(self.text_edit)
        layout.addWidget(self.close_button, alignment=Qt.AlignRight)

        # Widget contenedor para el layout
        container = QWidget()
        container.setLayout(layout)

        # Establecer el widget contenedor como widget central de la ventana
        self.setCentralWidget(container)

    # Método para cerrar la consola
    def close_console(self):
        self.hide()

if __name__ == '__main__':
    app = QApplication([])
    window = ConsoleWindow()
    window.show()
    app.exec_()
