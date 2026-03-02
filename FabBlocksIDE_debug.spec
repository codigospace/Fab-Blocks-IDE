# -*- mode: python ; coding: utf-8 -*-

block_cipher = None
# Resolve Python DLL dynamically so the spec works on CI (GitHub Actions)
import os
import sys
python_dll = os.path.join(sys.base_prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll")
# Try several common locations for the Python DLL and pick the first that exists.
def find_python_dll():
    candidates = [
        python_dll,
        os.path.join(sys.exec_prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
        os.path.join(sys.prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
        os.path.join(r"C:\Program Files\Python311", f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
        os.path.join(r"C:\Program Files (x86)\Python311", f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
    ]
    for p in candidates:
        try:
            if p and os.path.exists(p):
                print(f"[spec] Found python DLL: {p}")
                return p
        except Exception:
            continue
    print("[spec] Warning: Python DLL not found in common locations; build may fail at runtime")
    return None

# Only include the Windows Python DLL when building on Windows runners
if sys.platform == 'win32':
    found = find_python_dll()
    if found:
        binaries = [(found, '.')]
    else:
        binaries = []
else:
    binaries = []

# Debug spec: console enabled to capture stdout/stderr for diagnostics
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

# Ensure the python DLL is present in the binaries collected by Analysis.
if sys.platform == 'win32':
    try:
        # reuse find_python_dll logic above if available
        dll_candidates = [
            os.path.join(sys.base_prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
            os.path.join(sys.exec_prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
            os.path.join(sys.prefix, f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
            os.path.join(r"C:\Program Files\Python311", f"python{sys.version_info.major}{sys.version_info.minor}.dll"),
        ]
        for c in dll_candidates:
            if c and os.path.exists(c):
                if not any(os.path.basename(c) == os.path.basename(b[0]) for b in a.binaries):
                    a.binaries.append((c, '.'))
                break
    except Exception:
        pass

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
    splash.binaries,
    [],
    exclude_binaries=False,
    name='FabBlocksIDE_debug',
    debug=True,
    runtime_tmpdir=r'C:\Temp\FabBlocksIDE_mei',
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='icons/codigo.ico'
)

# Debug one-file executable with console enabled for diagnostics
