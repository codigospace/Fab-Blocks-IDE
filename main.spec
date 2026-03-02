# -*- mode: python ; coding: utf-8 -*-


from PyInstaller.utils.hooks import Tree

# When building with --onefile we still need to force PyInstaller to
# include the static HTML directory (and any other resource folders)
# so that `resource_path("html")` returns a usable path inside the
# temporary _MEIPASS folder.  Without this the exe will extract and
# there will be no html/index.html, which is exactly the error you
# were seeing.

resource_dirs = [
    Tree('html', prefix='html'),
    Tree('icons', prefix='icons'),
    Tree('examples', prefix='examples'),
    Tree('data_serial', prefix='data_serial'),
    Tree('bitacoras', prefix='bitacoras'),
    Tree('saves', prefix='saves'),
]

# you can add more folders here as needed


a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=[],
    datas=resource_dirs,
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='main',
)
