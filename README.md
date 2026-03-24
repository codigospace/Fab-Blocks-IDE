# Fab Blocks IDE 1.0

<div align="center">

[![Issues](https://img.shields.io/github/issues/codigospace/Fab-Blocks-IDE?style=for-the-badge&color=c34360&logo=github)](https://github.com/codigospace/Fab-Blocks-IDE/issues)
[![License](https://img.shields.io/github/license/codigospace/Fab-Blocks-IDE?style=for-the-badge&color=336887&logo=gnu)](LICENSE)
[![Size](https://img.shields.io/github/repo-size/codigospace/Fab-Blocks-IDE?style=for-the-badge&color=715a97&logo=googleanalytics)](#)

<br>

<img src="icons/codigo.png" width="150" alt="Fab-Blocks Logo">

</div>

## Resumen Ejecutivo
Fab-Blocks IDE es un entorno de desarrollo para diseño por bloques basado en Google Blockly, enfocado en el prototipado rápido para la plataforma Modular V1 y Arduino.

Este repositorio ha sido reestructurado para separar claramente el **IDE** (Entorno de Desarrollo en Python) del **Core Engine** (Motor de generación de código en JS), permitiendo una arquitectura modular y escalable.

---

## Informe de Reestructuración Técnica y Modularización (v1.0)

### 1. Enfoque Arquitectónico
El proyecto evoluciona hacia una separación estricta de responsabilidades:
- **Fab-Blocks IDE**: Gestiona proyectos, hardware y flujos de trabajo en Python/PyQt.
- **Fab-Blocks Core Engine**: Lógica central de bloques y generación de código multilenguaje (C++, Python, JS).

### 2. Etapas Cumplidas
- **Etapa 1 – Reorganización**: Limpieza de raíz y estructura `/core` para el backend.
- **Etapa 2 – Integración**: Consumo del Engine a través de su API integrada en el Webview.
- **Etapa 3 – Pruebas**: Validación del flujo completo (bloques -> código -> hardware).
- **Etapa 4 – Consolidación**: Desacople completo e independencia técnica de Visualino.

### 3. Conclusión
El salto a la **Versión 1.0** representa la culminación de la independencia técnica. Al separar el Motor como una entidad multilenguaje y profesionalizar el IDE en Python, el proyecto alcanza su estado de producción final.

---

## Instalación y Uso
Para ejecutar el IDE desde el código fuente:
1. Instalar dependencias: `pip install -r requirements.txt`
2. Ejecutar: `python3 main.py`

Para construir el ejecutable:
- Usar PyInstaller con `FabBlocksIDE.spec`.

## Licencia
Este proyecto se distribuye bajo la licencia MIT.

---
**Desarrollado por:** [Programación y Automatización Codigo S.A.C.](https://codigo.space/)