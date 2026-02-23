import pytest
import os
import json
from core.config_manager import ConfigManager

def test_config_save_and_load(tmp_path):
    config_file = tmp_path / "test_config.json"
    manager = ConfigManager(filename=str(config_file))
    
    manager.set_value('test_key', 'test_value')
    assert manager.get_value('test_key') == 'test_value'
    
    # Load again in a new manager
    new_manager = ConfigManager(filename=str(config_file))
    assert new_manager.get_value('test_key') == 'test_value'

def test_config_default_value():
    manager = ConfigManager(filename='non_existent.json')
    assert manager.get_value('missing_key') is None
