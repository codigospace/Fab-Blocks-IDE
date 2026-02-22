"""
Operaciones de archivos para Fab Blocks IDE

Este módulo gestiona todas las operaciones relacionadas con archivos:
- Guardar y abrir archivos de proyecto (.fab - Blockly XML)
- Exportar código generado (Arduino .ino)
- Cargar ejemplos predefinidos
- Diálogos de archivo con filtros y directorios

Formatos soportados:
- .fab: Archivos de proyecto (XML de Blockly)
- .ino: Archivos de código Arduino generado

Autor: Código Abierto Fab Blocks IDE
Licencia: MIT
"""
import os
from PyQt5.QtWidgets import QFileDialog, QMessageBox
from i18n import get_text


class FileOperations:    
    def __init__(self, window):
        self.window = window
    
    def save_fab_file(self):
        initial_dir = os.path.join(os.getcwd(), "saves")
        
        file_dialog = QFileDialog(self.window)
        file_dialog.setFileMode(QFileDialog.AnyFile)
        file_dialog.setNameFilter("Archivos BLY (*.fab)")
        file_dialog.setDefaultSuffix(".fab")
        file_dialog.setDirectory(initial_dir)
        
        if file_dialog.exec_():
            selected_file = file_dialog.selectedFiles()[0]
            self.window.webview.page().runJavaScript('''
                var xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
                xml;''', lambda result: self._save_to_file(result, selected_file))
        else:
            QMessageBox.warning(
                self.window,
                get_text('dialog.save_canceled'),
                get_text('dialog.save_operation_canceled')
            )
    
    def export_as_ino(self):
        initial_dir = os.path.join(os.getcwd(), "saves")
        
        file_dialog = QFileDialog(self.window)
        file_dialog.setFileMode(QFileDialog.AnyFile)
        file_dialog.setNameFilter("Archivos INO (*.ino)")
        file_dialog.setDefaultSuffix(".ino")
        file_dialog.setDirectory(initial_dir)
        
        if file_dialog.exec_():
            selected_file = file_dialog.selectedFiles()[0]
            self.window.webview.page().runJavaScript('''
                var workspace = Blockly.getMainWorkspace();
                var arduinoCode = Blockly.Arduino.workspaceToCode(workspace);
                arduinoCode;''', lambda result: self._save_to_ino_file(result, selected_file))
        else:
            QMessageBox.warning(
                self.window,
                get_text('dialog.save_canceled'),
                get_text('dialog.save_ino_canceled')
            )
    
    def open_fab_file(self):
        file_dialog = QFileDialog(self.window)
        file_dialog.setNameFilter("Archivos BLY (*.fab)")
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        initial_dir_open = os.path.join(os.getcwd(), "examples")
        file_dialog.setDirectory(initial_dir_open)
        
        if file_dialog.exec_():
            selected_files = file_dialog.selectedFiles()
            
            if selected_files:
                file_path = selected_files[0]
                
                with open(file_path, "r") as file:
                    content = file.read().replace('\n', '')
                
                self.window.open_new_file_window_with_content(content=content)
    
    def open_example_file(self, example_filename):
        example_path = os.path.join("examples", example_filename)
        
        if os.path.exists(example_path):
            with open(example_path, "r") as file:
                content = file.read().replace('\n', '')
            
            self.window.open_new_file_window_with_content(content=content)
        else:
            QMessageBox.warning(
                self.window,
                get_text('dialog.file_not_found'),
                get_text('dialog.file_not_found')
            )
    
    def _save_to_file(self, content, file_path):
        try:
            with open(file_path, "w") as file:
                file.write(content)
            QMessageBox.information(
                self.window,
                get_text('dialog.save_success'),
                f"{get_text('dialog.save_success')}: {file_path}"
            )
        except Exception as e:
            QMessageBox.critical(
                self.window,
                get_text('dialog.save_error'),
                f"{get_text('dialog.save_error')}: {str(e)}"
            )
    
    def _save_to_ino_file(self, content, file_path):
        try:
            with open(file_path, "w") as file:
                file.write(content)
            QMessageBox.information(
                self.window,
                get_text('dialog.save_success'),
                f"{get_text('dialog.save_success')}: {file_path}"
            )
        except Exception as e:
            QMessageBox.critical(
                self.window,
                get_text('dialog.save_error'),
                f"{get_text('dialog.save_error')}: {str(e)}"
            )
    
    @staticmethod
    def save_extracted_code(content, filename="extracted_code.ino"):
        try:
            with open(filename, "w") as file:
                if isinstance(content, list):
                    file.write("\n".join(content))
                else:
                    file.write(str(content))
            return True
        except Exception as e:
            print(f"Error guardando {filename}: {e}")
            return False
