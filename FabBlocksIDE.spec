# -*- mode: python ; coding: utf-8 -*-

block_cipher = None
import os
import sys

# Resolve Python DLL dynamically so the spec works on CI (GitHub Actions)
python_dll = os.path.join(sys.base_prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll")
# Only include the Windows Python DLL when building on Windows runners
if sys.platform == 'win32':
    binaries = [(python_dll, '.')]
else:
    binaries = []

# Recolectar datos adicionales (carpetas de recursos)
added_files = [
    ('html', 'html'),
    ('icons', 'icons'),
    ('examples', 'examples'),
    ('data_serial', 'data_serial'),
    ('bitacoras', 'bitacoras'),
    ('saves', 'saves'),
]

a = Analysis(
    ['main.py'],
    pathex=[],
    # Ensure Python DLL is bundled for onefile execution (resolved at build time)
    binaries=binaries,
    datas=added_files,
    hiddenimports=[
        'PyQt5.QtWebEngineWidgets',
        'core.config_manager',
        'core.preferences_dialog',
        'core.server',
        'core.utils',
        'core.port_monitor',
        'core.monitor_plotter',
        'core.i18n',
        'core.loading_spinner',
        'core.menu_manager',
        'core.ui_components',
        'core.file_operations',
        'core.compilation_manager',
        'core.javascript_bridge'
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

splash = Splash(
    'icons/load_codigo.png',
    binaries=a.binaries,
    datas=a.datas,
    text_pos=None,
    text_size=12,
    minify_script=True,
    always_on_top=True,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    splash,
    [],
    exclude_binaries=False,
    name='FabBlocksIDE',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='icons/codigo.ico'
)
# Note: Building as one-file EXE (all binaries/data embedded). The COLLECT
# step is omitted so PyInstaller will produce a single-file executable.
