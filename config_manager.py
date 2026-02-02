import json

class ConfigManager:
    def __init__(self, filename='config.json'):
        self.filename = filename
        self.data = {}
        self.load_config()

    # Cargar la configuración desde el archivo JSON
    def load_config(self):
        try:
            with open(self.filename, 'r') as file:
                self.data = json.load(file)
        except FileNotFoundError:
            pass

    # Guardar la configuración en el archivo JSON
    def save_config(self):
        with open(self.filename, 'w') as file:
            json.dump(self.data, file)

    # Obtener el valor de una clave de configuración
    def get_value(self, key):
        return self.data.get(key, None)

    # Establecer el valor de una clave de configuración
    def set_value(self, key, value):
        self.data[key] = value
        self.save_config()
