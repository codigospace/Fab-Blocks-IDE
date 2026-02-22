"""
Puente de comunicación con JavaScript para Fab Blocks IDE

Este módulo gestiona la comunicación bidireccional entre el código Python (PyQt5)
y el código JavaScript ejecutado en el WebView. Permite:

- Interactuar con el workspace de Blockly desde Python
- Cargar/guardar proyectos en formato XML
- Obtener el código generado (Arduino, Python, etc.)
- Controlar la visibilidad de paneles
- Ejecutar acciones en la interfaz desde Python

Patrón: Bridge Pattern para abstraer la comunicación JavaScript

Métodos principales:
- get_workspace_xml(): Obtiene el XML del proyecto actual
- get_arduino_code(): Obtiene el código Arduino generado
- show_code()/hide_code(): Controla visibilidad del panel de código
- load_workspace_from_xml(): Carga un proyecto

Autor: Código Abierto Fab Blocks IDE
Licencia: MIT
"""

class JavaScriptBridge:
    def __init__(self, window):
        self.window = window
    
    def show_code(self):
        self.window.webview.page().runJavaScript('''
            document.getElementById("code").style.display = "block";
            document.getElementById("blockly").style.width = "66%";
            document.getElementById("blockly").style.height = "100%";
        ''')
    
    def hide_code(self):
        self.window.webview.page().runJavaScript('''
            document.getElementById("code").style.display = "none";
            document.getElementById("blockly").style.width = "100%";
            document.getElementById("blockly").style.height = "100%";
        ''')
    
    def load_workspace_from_xml(self, xml_content):
        # Escapar comillas simples en el XML
        escaped_xml = xml_content.replace("'", "\\'")
        self.window.webview.page().runJavaScript(f'''
            var xml = '{escaped_xml}';
            Blockly.mainWorkspace.clear();
            Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), 
                Blockly.Xml.textToDom(xml));''')
    
    def get_workspace_xml(self, callback):
        self.window.webview.page().runJavaScript('''
            var xml = Blockly.Xml.domToPrettyText(
                Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
            xml;''', callback)
    
    def get_arduino_code(self, callback):
        self.window.webview.page().runJavaScript('''
            var workspace = Blockly.getMainWorkspace();
            var arduinoCode = Blockly.Arduino.workspaceToCode(workspace);
            arduinoCode;''', callback)
    
    def get_cpp_code(self, callback):
        self.window.webview.page().runJavaScript('''
            var elements = document.getElementsByClassName('hljs cpp');
            var info = [];
            for (var i = 0; i < elements.length; i++) {
                info.push(elements[i].innerText);
            }
            info;''', callback)
    
    def clear_workspace(self):
        self.window.webview.page().runJavaScript('''
            Blockly.mainWorkspace.clear();''')
