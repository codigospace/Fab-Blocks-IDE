import pytest
from core.i18n import get_text, set_language, get_language

def test_initial_language():
    assert get_language() == 'es'

def test_set_language():
    set_language('en')
    assert get_language() == 'en'
    set_language('es')
    assert get_language() == 'es'

def test_get_text_spanish():
    set_language('es')
    assert get_text('menu.file') == 'Archivo'

def test_get_text_english():
    set_language('en')
    assert get_text('menu.file') == 'File'

def test_missing_translation():
    assert "MISSING TRANSLATION" in get_text('key.that.does.not.exist')

def test_format_text():
    # 'dialog.file_saved': {'es': 'El archivo se guardó correctamente en: {path}', ...}
    path = "/tmp/test.fab"
    set_language('es')
    text = get_text('dialog.file_saved', path=path)
    assert path in text
