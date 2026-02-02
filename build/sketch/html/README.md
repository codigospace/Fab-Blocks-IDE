#line 1 "D:\\Proyectos\\fab2\\html\\README.md"
# FabBlocks - Engine

## Descripción general
Archivo HTML base para FabBlocks. Utiliza Blockly para generar bloques y traducirlos a C++, Python y JavaScript. Soporta perfiles de color, selección de idiomas y gestión de categorías dinámicas según lenguaje.

---

## Estructura destacada

### ComboBoxes
- **Selector de colores:** `#colorProfileSelector`
- **Selector de lenguaje:** `#languageSelector`
- **Selector de idioma:** `#localeSelector`

### Contenedores de bloques
- **XML de Toolbox:** `<xml id="toolbox">`
- **Contenedor Blockly:** `<div id="blockly">`
- **Contenedor de código:** `<div id="code">`

### Scripts importantes
- **jQuery**: `https://code.jquery.com/jquery-3.6.0.min.js`
- **Blockly**: `blockly_compressed.js`
- **Roboblocks (módulo)**: `/static/roboblocks.js`
- **Mapeado de traducciones (módulo)**: `/static/src/translationMap.js`

---

## Funciones JS principales

- **`changeLanguage()`**: Cambia el lenguaje y oculta categorías según la opción seleccionada.
- **`changeColor()`**: Aplica perfiles de color desde `window.colorProfiles`.
- **`changeLocale()`**: Actualiza las etiquetas con traducciones desde `translationMap`.
- **`updateCode()`**: Genera código en C++, Python o JavaScript y lo resalta.
- **`hideCategoriesForJS()`**: Oculta categorías específicas para JavaScript.
- **`hideCategoriesForPython()`**: Oculta categorías específicas para Python.
- **`hideCategoriesForCPP()`**: Oculta categorías específicas para C++.
- **`resetWorkspace()`**: Limpia el workspace y lo reinicia con bloques predeterminados.
- **`updateLabels()`**: Actualiza los textos de las etiquetas según el idioma seleccionado.
z
---

## Estructura del objeto de traducción
- **Idiomas soportados:** Español (es-ES), Inglés (en-GB), Francés (fr-FR), Italiano (it-IT), Ruso (ru).
- **Claves de traducción:** `'functions'`, `'control'`, etc.

---

## **Descripción de las Carpetas y Archivos Relevantes**

### **Carpeta `static/`**
- Contiene los archivos CSS y JavaScript esenciales para la interfaz.  
- Incluye librerías como CodeMirror para resaltar la sintaxis y extensiones personalizadas de Blockly.

### **Carpeta `javascript/`**
- **`blockly-bq/`**: Maneja los bloques de programación orientados a Arduino, definiendo la estructura del código generado (setup, loop, etc.).
- **`highlight/`**: Contiene `highlight.pack.js` para resaltar sintaxis en diferentes lenguajes como Python y C++.
- **`jquery/`** y **`requirejs/`**: Librerías para manejar dependencias y modulares en JavaScript.
- **`underscore/`**: Herramientas adicionales para manipulación de datos.

### **Carpeta `kit/`**
- **`blocks/`**: Almacena bloques personalizados como `advanced_map.js`.
- **`lang/`**: Soporte para otros idiomas como catalán y español.
- **`tmp/`**: Archivos temporales, como `jst.js`, que definen el comportamiento del código generado según el lenguaje (C++, Python, o JavaScript).

### **Carpeta `lang/`**
- Archivos de traducción con estructura común entre idiomas, cambiando solo los valores.  
  **Ejemplo**:
  ```javascript
  // en-ES.js
  BLOCKLY_MSG_DUPLICATE_BLOCK: 'Duplicar',
  
  // en-GB.js
  BLOCKLY_MSG_DUPLICATE_BLOCK: 'Duplicate',
  ```

### **Carpeta `media/`**
- Contiene imágenes, GIFs y sonidos para la interfaz.  
- **Subcarpeta `blocks/`**: Imágenes específicas para bloques modulares.

### **Carpeta `src/`**
- **`colorProfiles.js`**: Define paletas de colores para el entorno, con soporte para temas oscuros y claros.
- **`helpUrls.js`**: Contiene enlaces de ayuda específicos para cada bloque.
- **`profiles.js`**: Configura los perfiles de conexión, como la velocidad de comunicación para Arduino.
- **`resources.js`**: Gestiona rutas y dimensiones de las imágenes.
- **`translationMap.js`**: Vincula los archivos de traducción con la interfaz para cambiar dinámicamente de idioma.

### **Carpeta `tmp/`**
- **`jst.js`**: Genera código en varios lenguajes según la configuración.  
  **Ejemplo**:
  ```javascript
    JST["bq_test_def_definitions"] = function (obj, programmingLanguage) {
        obj = obj || {};
        let __p = '';
        
        if (programmingLanguage === 'cpp') {
            __p += '#include <Modular.h>\n';
        } else if (programmingLanguage === 'python') {
            __p += 'import pymodular\n';
        } else if (programmingLanguage === 'js') {
            __p += 'import { Modular } from "modular";\n';
        }
        
        return __p;
    };
  ```

---

## **Archivo `roboblocks.js`**
- **Define los bloques y su comportamiento.**  
  **Ejemplo de bloque Arduino:**
  ```javascript
  Blockly.Arduino.test_inout_highlow = function () {
      var bool_value = this.getFieldValue('BOOL');
      var code = JST['inout_highlow']({ 'bool_value': bool_value }, window.programmingLanguage);
      return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  ```

- **Configuración del bloque:**
  ```javascript
  Blockly.Blocks.test_inout_highlow = {
      category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
      init: function () {
          this.setColour(RoboBlocks.LANG_COLOUR_MODULAR_ADI_3);
          this.appendDummyInput()
              .appendField(new Blockly.FieldImage(resources.images.escribirModular))
              .appendField(new Blockly.FieldDropdown([
                  ['HIGH', 'HIGH'],
                  ['LOW', 'LOW']
              ]), 'BOOL');
          this.setOutput(true, Boolean);
      }
  };
  ```

---

## **Edición de Color del Entorno**

Los colores del entorno se configuran en el archivo `colorProfiles.js`. Este archivo utiliza códigos hexadecimales para definir los colores de fondo y de los bloques.
Aquí tienes una descripción breve y sencilla de la función `changeColorWorkSpace` y su relación con el objeto `colorProfiles`:

---

### **Descripción de `changeColorWorkSpace`**

La función `changeColorWorkSpace` se encarga de aplicar una paleta de colores específica al entorno de trabajo. Esta paleta se elige de los perfiles de color definidos en el objeto `colorProfiles`.

**Cómo Funciona:**

- **Colores de Fondo:** Cambia el color de fondo de la barra de herramientas y del área de trabajo utilizando los colores especificados en el objeto.
- **Colores de Código:** Ajusta el color de fondo del bloque de código.
- **Estilos de Sintaxis:** Modifica los colores de distintos elementos de la sintaxis del código (títulos, comentarios, cadenas, literales, palabras clave y números) utilizando las propiedades de color correspondientes.

**Ejemplo de Uso:**

```javascript
changeColorWorkSpace(colorProfiles.darkMode);
```

Este ejemplo aplicaría el esquema de colores de **modo oscuro** al entorno de trabajo.

---


# Estructura del Proyecto

```bash
index.html  
README.md  
static/  
│   blockly.extensions.js  
│   codemirror.min.css  
│   codemirror.min.js  
│   constants.js  
│   COPYING.LESER.md  
│   COPYING.md  
│   lang.js  
│   profiles.js  
│   README.md  
│   roboblocks.js  
│   visualino.css  

javascript/  
├── blockly-bq/  
│   ├── arduino_compressed.js  
│   ├── blockly_compressed.js  
│   ├── blocks_compressed.js  
│   ├── COPYING  
│   ├── javascript_compressed.js  
│   └── README.md  
├── highlight/  
│   ├── CHANGES.md  
│   ├── highlight.pack.js  
│   ├── LICENSE  
│   ├── README.md  
│   ├── README.ru.md  
│   └── styles/  
│       └── default.css  
├── jquery/  
│   ├── .bower.json  
│   ├── MIT-LICENSE.txt  
│   └── dist/  
│       ├── jquery.min.js  
│       └── jquery.min.map  
├── requirejs/  
│   ├── .bower.json  
│   └── require.js  
└── underscore/  
    ├── .bower.json  
    ├── .editorconfig  
    ├── .gitignore  
    ├── LICENSE  
    ├── README.md  
    └── underscore.js  

kit/  
├── blocks/  
│   └── advanced_map/  
│       └── advanced_map.js  
├── lang/  
│   ├── ca-ES.js  
│   └── en-GB.js  
└── tmp/  
    └── jst.js  

lang/  
├── en-ES.js  
├── en-GB.js  
├── fr-FR.js  
├── it-IT.js  
└── ru.js  

media/  
├── 1x1.gif  
├── ADELANTECARLITO.png  
├── ATRÁSCARLITO.png  
├── InputOutput.png  
├── handclosed.cur  
├── click.mp3  
├── sensor_noise.png  
└── blocks/  
    ├── bqmod01.png  
    ├── bqmod02.png  
    └── zum07.png  

src/  
├── colorProfiles.js  
├── helpUrls.js  
├── profiles.js  
├── resources.js  
└── translationMap.js  

tmp/  
├── jst.js  
└── temp.svg  

underscore/  
└── underscore-esm.js  
```
----

## **Conclusión**
Este proyecto combina la potencia de Blockly con JavaScript y otros recursos para crear una interfaz de programación visual. Cada carpeta y archivo cumple un rol específico para ofrecer traducciones, estilos personalizados, bloques modulares y soporte para diferentes lenguajes de programación.