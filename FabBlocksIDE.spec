# -*- mode: python ; coding: utf-8 -*-

block_cipher = None
import os
import sys

# This spec now builds a **one-directory** distribution (not onefile).
# The CI workflow uses this file to create a folder containing the exe and
# all supporting data so it can be downloaded and run directly.  The
# onedir version mimics the behaviour of `py.exe main.py` by preserving the
# html/, examples/, icons/, etc. directories next to the executable.

# Resolve Python DLL path; we'll also copy it as a data file so the
# executable can load it without having to extract from _internal.
python_dll = os.path.join(sys.base_prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll")

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

# copy python dll to root as data so it ends up next to the exe
if sys.platform == 'win32' and python_dll and os.path.exists(python_dll):
    added_files.append((python_dll, '.'))

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
    a.binaries,
    a.zipfiles,
    a.datas,
    splash,
    splash_binaries=a.binaries,
    name='FabBlocksIDE0.3.exe',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='icons/codigo.ico'
)

# we are building a one-directory bundle; collect everything into a folder
coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name='FabBlocksIDE'
)

# ensure python DLL is copied into the output directory root, not just
# under _internal.  PyInstaller may still place it inside the _internal
# subfolder when collecting binaries; this extra step moves it where the
# EXE will look without a Python installation.
if sys.platform == 'win32':
    import shutil
    outdir = os.path.abspath(os.path.join(os.getcwd(), 'dist', 'FabBlocksIDE'))
    if python_dll and os.path.exists(python_dll):
        try:
            shutil.copy2(python_dll, os.path.join(outdir, os.path.basename(python_dll)))
            print(f"[spec] copied python dll to {outdir}")
        except Exception as e:
            print(f"[spec] failed to copy python dll: {e}")
