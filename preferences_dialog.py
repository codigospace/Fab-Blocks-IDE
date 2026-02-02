from PyQt5.QtWidgets import QDialog, QVBoxLayout, QLabel, QLineEdit, QCheckBox, QComboBox, QPushButton, QFileDialog

class PreferencesDialog(QDialog):
    def __init__(self, config_manager, parent=None):
        super().__init__(parent)
        self.config_manager = config_manager
        self.setWindowTitle("Preferencias")
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.initUI()

    def initUI(self):
        # Campo de entrada para la ubicación del compilador
        self.compiler_location_edit = QLineEdit()
        self.layout.addWidget(QLabel("Ubicación del compilador:"))
        self.layout.addWidget(self.compiler_location_edit)

        # Obtener la ubicación del compilador guardada en la configuración
        compiler_location = self.config_manager.get_value('compiler_location')
        if compiler_location:
            self.compiler_location_edit.setText(compiler_location)

        # Checkbox para habilitar la verbosidad
        self.verbosity_checkbox = QCheckBox("Habilitar Verbosidad")
        self.layout.addWidget(self.verbosity_checkbox)

        # Obtener el estado de la verbosidad guardado en la configuración
        verbosity_enabled = self.config_manager.get_value('verbosity_enabled')
        if verbosity_enabled:
            self.verbosity_checkbox.setChecked(True)
        else:
            self.verbosity_checkbox.setChecked(False)

        # ComboBox para seleccionar el idioma
        self.language_combo = QComboBox()
        self.language_combo.addItem("Spanish")
        self.language_combo.addItem("English")
        self.layout.addWidget(QLabel("Idioma:"))
        self.layout.addWidget(self.language_combo)

        # Obtener el idioma guardado en la configuración
        language = self.config_manager.get_value('language')
        if language:
            index = self.language_combo.findText(language)
            if index != -1:
                self.language_combo.setCurrentIndex(index)

        # Botón para seleccionar la ubicación del archivo
        select_file_button = QPushButton("Seleccionar Archivo")
        select_file_button.clicked.connect(self.select_exe_file)
        self.layout.addWidget(select_file_button)

        # Botón para guardar la configuración
        save_button = QPushButton("Guardar")
        save_button.clicked.connect(self.save_preferences)
        self.layout.addWidget(save_button)

    # Método para abrir el cuadro de diálogo de selección de archivos .exe
    def select_exe_file(self):
        file_dialog = QFileDialog()
        file_dialog.setNameFilter("Archivos ejecutables (*.exe)")
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        if file_dialog.exec_():
            selected_files = file_dialog.selectedFiles()
            if selected_files:
                self.compiler_location_edit.setText(selected_files[0])

    # Método para guardar las preferencias
    def save_preferences(self):
        compiler_location = self.compiler_location_edit.text()
        self.config_manager.set_value('compiler_location', compiler_location)

        # Verificar si la verbosidad está habilitada
        verbosity_enabled = self.verbosity_checkbox.isChecked()
        self.config_manager.set_value('verbosity_enabled', verbosity_enabled)

        # Obtener el idioma seleccionado
        language_index = self.language_combo.currentIndex()
        language = self.language_combo.itemText(language_index)
        self.config_manager.set_value('language', language)

        self.close()
