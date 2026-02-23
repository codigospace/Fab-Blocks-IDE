"""
Loading Spinner Widget para PyQt5

Proporciona un widget animado de carga que se muestra mientras
se cargan recursos como HTML o datos.

Autor: Fab Blocks IDE
Licencia: MIT
"""

from PyQt5.QtWidgets import QWidget, QVBoxLayout, QLabel
from PyQt5.QtCore import Qt, QTimer, QRect
from PyQt5.QtGui import QPainter, QColor, QPen, QFont
from PyQt5.QtCore import QSize


class LoadingSpinner(QWidget):
    """
    Widget animado que muestra un spinner de carga.
    
    Características:
    - Spinner giratorio animado
    - Mensaje de texto personalizable
    - Centrado en la pantalla
    - Fácil de activar/desactivar
    
    Uso:
        spinner = LoadingSpinner(parent)
        spinner.show()
        spinner.set_loading_text("Cargando...")
        # ... hacer operación lenta ...
        spinner.hide()
    """
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.angle = 0
        self.is_spinning = False
        self.loading_text = "Cargando..."
        
        # Configurar el widget
        self.setStyleSheet("background-color: rgba(0, 0, 0, 200);")
        self.setFocusPolicy(Qt.NoFocus)
        
        # Crear layout
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        # Label para el texto
        self.text_label = QLabel(self.loading_text)
        self.text_label.setAlignment(Qt.AlignCenter)
        self.text_label.setStyleSheet("color: white; font-size: 14px; margin-top: 20px;")
        
        layout.addStretch()
        layout.addWidget(self.text_label, alignment=Qt.AlignCenter)
        layout.addStretch()
        
        # Timer para animación
        self.timer = QTimer(self)
        self.timer.timeout.connect(self._animate)
        self.timer.setInterval(30)  # 30ms = ~33 FPS
        
    def set_loading_text(self, text):
        """Cambia el texto de carga"""
        self.loading_text = text
        self.text_label.setText(text)
        
    def start_spinning(self):
        """Inicia la animación del spinner"""
        if not self.is_spinning:
            self.is_spinning = True
            self.angle = 0
            self.timer.start()
            self.show()
            
    def stop_spinning(self):
        """Detiene la animación del spinner"""
        if self.is_spinning:
            self.is_spinning = False
            self.timer.stop()
            self.hide()
            
    def _animate(self):
        """Actualiza el ángulo de rotación y repinta"""
        self.angle = (self.angle + 12) % 360  # 12 grados por frame = rotación suave
        self.update()
        
    def paintEvent(self, event):
        """Dibuja el spinner giratorio"""
        super().paintEvent(event)
        
        if not self.is_spinning:
            return
            
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        
        # Dimensiones del spinner
        center_x = self.width() // 2
        center_y = self.height() // 2 - 40  # Un poco arriba del centro
        radius = 30
        line_width = 4
        
        # Dibujar líneas giratorias (tipo "rueda de carga")
        pen = QPen()
        pen.setWidth(line_width)
        pen.setCapStyle(Qt.RoundCap)
        
        for i in range(12):
            angle = (self.angle + i * 30) % 360
            
            # Calcular opacidad basada en la posición (fade effect)
            opacity = 255 - (i * 20)
            
            color = QColor(100, 180, 255)  # Azul claro
            color.setAlpha(opacity)
            pen.setColor(color)
            painter.setPen(pen)
            
            # Calcular posición de inicio y fin de la línea
            rad = angle * 3.14159 / 180
            
            x1 = center_x + (radius - 10) * (3.14159 / 180) ** 0  # radio interno
            y1 = center_y
            
            # Línea que irradia desde el centro
            import math
            x1 = center_x + (radius - 15) * math.cos(rad)
            y1 = center_y + (radius - 15) * math.sin(rad)
            x2 = center_x + radius * math.cos(rad)
            y2 = center_y + radius * math.sin(rad)
            
            painter.drawLine(int(x1), int(y1), int(x2), int(y2))
        
        painter.end()


class SimpleLoadingOverlay(QWidget):
    """
    Overlay simple con spinner y mensaje de carga.
    
    Se posiciona sobre otro widget y muestra un spinner mientras carga.
    """
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setStyleSheet("background-color: rgba(255, 255, 255, 240);")
        self.setFocusPolicy(Qt.NoFocus)
        
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        # Contenedor central
        center_widget = QWidget()
        center_layout = QVBoxLayout(center_widget)
        
        # Spinner
        self.spinner = LoadingSpinner(self)
        self.spinner.setStyleSheet("background-color: transparent;")
        self.spinner.text_label.setStyleSheet("color: #333333; font-size: 14px;")
        
        center_layout.addWidget(self.spinner)
        
        layout.addStretch()
        layout.addWidget(center_widget)
        layout.addStretch()
        
        self.hide()
        
    def show_loading(self, text="Cargando..."):
        """Muestra el overlay con mensaje de carga"""
        self.spinner.set_loading_text(text)
        self.spinner.start_spinning()
        self.show()
        self.raise_()
        
    def hide_loading(self):
        """Oculta el overlay"""
        self.spinner.stop_spinning()
        self.hide()
        
    def resizeEvent(self, event):
        """Ajusta el tamaño del overlay cuando cambia el tamaño del widget padre"""
        super().resizeEvent(event)
        if self.parent():
            self.setGeometry(self.parent().rect())
