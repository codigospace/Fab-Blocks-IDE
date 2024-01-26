this["JST"] = this["JST"] || {};

this["JST"]["advanced_conversion"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (value_num)) == null ? '' : __t) +
            ',' +
            ((__t = (convertion)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["advanced_map"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'map(' +
            ((__t = (num)) == null ? '' : __t) +
            ',' +
            ((__t = (from_min)) == null ? '' : __t) +
            ',' +
            ((__t = (from_max)) == null ? '' : __t) +
            ',' +
            ((__t = (to_min)) == null ? '' : __t) +
            ',' +
            ((__t = (to_max)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["base_delay"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'delay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["base_map"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'map(' +
            ((__t = (value_num)) == null ? '' : __t) +
            ',0,1023,0,' +
            ((__t = (value_dmax)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["base_millis"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'millis()\n';

    }
    return __p
};

this["JST"]["bq_bat"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Distance(' +
            ((__t = (trigger_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (echo_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["bq_bat_definitions_distance"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'long Distance(int trigger_pin, int echo_pin)\n{\n  long microseconds = TP_init(trigger_pin, echo_pin);\n  long distance;\n  distance = microseconds/29/2;\n  if (distance == 0){\n    distance = 999;\n  }\n  return distance;\n}\n';

    }
    return __p
};

this["JST"]["bq_bat_definitions_tp_init"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '//bqBAT\nlong TP_init(int trigger_pin, int echo_pin)\n{\n  digitalWrite(trigger_pin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigger_pin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigger_pin, LOW);\n  long microseconds = pulseIn(echo_pin ,HIGH);\n  return microseconds;\n}\n';

    }
    return __p
};

this["JST"]["bq_bat_setups_echo"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode( ' +
            ((__t = (echo_pin)) == null ? '' : __t) +
            ' , INPUT );\n';

    }
    return __p
};

this["JST"]["bq_bat_setups_trigger"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode( ' +
            ((__t = (trigger_pin)) == null ? '' : __t) +
            ' , OUTPUT );\n';

    }
    return __p
};

this["JST"]["bq_bluetooth_def_definitions"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '#include <SoftwareSerial.h>';

    }
    return __p
};

this["JST"]["bq_bluetooth_def_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',INPUT);\n  pinMode(' +
            ((__t = (NextPIN)) == null ? '' : __t) +
            ', OUTPUT);\n  blueToothSerial.begin(' +
            ((__t = (baud_rate)) == null ? '' : __t) +
            ');\n  blueToothSerial.flush();\n';

    }
    return __p
};

this["JST"]["bq_bluetooth_receive"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'blueToothSerial.read()';

    }
    return __p
};

this["JST"]["bq_bluetooth_send"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'blueToothSerial.write( ' +
            ((__t = (statement_send)) == null ? '' : __t) +
            ' );\n';

    }
    return __p
};

this["JST"]["bq_button"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["bq_button_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',INPUT_PULLUP);\n';

    }
    return __p
};

this["JST"]["bq_buttons"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '  adc_key_in =analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ');\n  key = get_key(adc_key_in);\n  if (key != oldkey)\n  {\n    delay(50);\n    adc_key_in = analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ');\n    key = get_key(adc_key_in);\n    if (key != oldkey)\n    {\n      oldkey = key;\n      if (key >=0){\n        switch(key)\n        {\n          case 0:\n           ' +
            ((__t = (code_btn1)) == null ? '' : __t) +
            '\n          break;\n          case 1:\n           ' +
            ((__t = (code_btn2)) == null ? '' : __t) +
            '\n          break;\n          case 2:\n           ' +
            ((__t = (code_btn3)) == null ? '' : __t) +
            '\n          break;\n          case 3:\n           ' +
            ((__t = (code_btn4)) == null ? '' : __t) +
            '\n          break;  \n          case 4:\n           ' +
            ((__t = (code_btn5)) == null ? '' : __t) +
            '\n          break;\n        }      \n      }\n    }\n  }\n';

    }
    return __p
};

this["JST"]["bq_buttons_definitions"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'int get_key(unsigned int input)\n  {\n    int k;\n    for (k = 0; k < NUM_KEYS; k++)\n    {\n      if (input < adc_key_val[k])\n      {\n        return k;\n      }\n    }\n    if (k >= NUM_KEYS)k = -1;\n      return k;\n}\n';

    }
    return __p
};

this["JST"]["bq_buttons_definitions_variables"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '//bqButtons\nint adc_key_val[5] ={20,50, 100, 200, 600 };\nint NUM_KEYS = 5;\nint adc_key_in;\nint key=-1;\nint oldkey=-1;\n';

    }
    return __p
};

this["JST"]["bq_infrared"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["bq_infrared_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode( ' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ' , INPUT);\n';

    }
    return __p
};

this["JST"]["bq_joystick"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'readJoystick_' +
            ((__t = (name)) == null ? '' : __t) +
            '()';

    }
    return __p
};

this["JST"]["bq_joystick_definitions"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'int * readJoystick_' +
            ((__t = (name)) == null ? '' : __t) +
            '(){\n  _internal_readJoystick_array_' +
            ((__t = (name)) == null ? '' : __t) +
            '[0]=analogRead(' +
            ((__t = (pinx)) == null ? '' : __t) +
            ');\n  _internal_readJoystick_array_' +
            ((__t = (name)) == null ? '' : __t) +
            '[1]=analogRead(' +
            ((__t = (piny)) == null ? '' : __t) +
            ');\n  _internal_readJoystick_array_' +
            ((__t = (name)) == null ? '' : __t) +
            '[2]=digitalRead(' +
            ((__t = (pinbutton)) == null ? '' : __t) +
            ');\n  return _internal_readJoystick_array_' +
            ((__t = (name)) == null ? '' : __t) +
            ';\n}';

    }
    return __p
};

this["JST"]["bq_joystick_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (pinbutton)) == null ? '' : __t) +
            ',INPUT_PULLUP);\n';

    }
    return __p
};

this["JST"]["bq_led"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalWrite(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (dropdown_stat)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["bq_led_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',OUTPUT);\n';

    }
    return __p
};

this["JST"]["bq_photoresistor"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["bq_piezo_buzzer"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'tone(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (dropdown_stat)) == null ? '' : __t) +
            ',' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["bq_piezo_buzzerav"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'tone(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (Buzztone)) == null ? '' : __t) +
            ',' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n\n';

    }
    return __p
};

this["JST"]["bq_potentiometer"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["bt_serial_available"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'if (blueToothSerial.available()>0){\n' +
            ((__t = (branch)) == null ? '' : __t) +
            '\n}\n';

    }
    return __p
};

this["JST"]["controls_doWhile"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'do {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            '\n} while (' +
            ((__t = (argument0)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["controls_execute"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (content)) == null ? '' : __t) +
            '\n';

    }
    return __p
};

this["JST"]["controls_else"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'else {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            ' }';

    }
    return __p
};

this["JST"]["controls_elseif"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'else if (' +
            ((__t = (argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            ' }';

    }
    return __p
};

this["JST"]["controls_if"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'if (' +
            ((__t = (argument)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            ' }';

    }
    return __p
};

this["JST"]["controls_setupLoop"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (branch)) == null ? '' : __t) +
            '\n';

    }
    return __p
};

this["JST"]["controls_whileUntil"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'while (' +
            ((__t = (argument0)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            ' }\n';

    }
    return __p
};

this["JST"]["inout_analog_read"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["inout_analog_read_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',INPUT);\n';

    }
    return __p
};

this["JST"]["inout_analog_write"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'analogWrite(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (value_num)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["inout_analog_write_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',OUTPUT);\n';

    }
    return __p
};

this["JST"]["inout_builtin_led"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalWrite(13,' +
            ((__t = (dropdown_stat)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["inout_builtin_led_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(13,OUTPUT);\n';

    }
    return __p
};

this["JST"]["inout_digital_read"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["inout_digital_read_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',INPUT);\n';

    }
    return __p
};

this["JST"]["inout_digital_write"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalWrite(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (dropdown_stat)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["inout_digital_write_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',OUTPUT);\n';

    }
    return __p
};

this["JST"]["inout_highlow"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (bool_value)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["lcd_clear"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'lcd.clear();\n';

    }
    return __p
};

this["JST"]["lcd_def_declare"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'LiquidCrystal lcd(' +
            ((__t = (lcd_1)) == null ? '' : __t) +
            ', ' +
            ((__t = (lcd_2)) == null ? '' : __t) +
            ', ' +
            ((__t = (lcd_3)) == null ? '' : __t) +
            ', ' +
            ((__t = (lcd_4)) == null ? '' : __t) +
            ', ' +
            ((__t = (lcd_5)) == null ? '' : __t) +
            ', ' +
            ((__t = (lcd_6)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["lcd_def_definitions"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '#include <Wire.h>\n#include <LiquidCrystal.h>';

    }
    return __p
};

this["JST"]["lcd_def_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'lcd.begin(16, 2);\nlcd.clear();\n';

    }
    return __p
};

this["JST"]["lcd_print"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'lcd.print(' +
            ((__t = (val)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["lcd_print_pos"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'lcd.setCursor(' +
            ((__t = (ycoor)) == null ? '' : __t) +
            ',' +
            ((__t = (xcoor)) == null ? '' : __t) +
            ');\nlcd.print(' +
            ((__t = (val)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["lcd_setBacklight"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'lcd.setBacklight(' +
            ((__t = (state)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["logic_compare"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (argument1)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["logic_negate"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '!' +
            ((__t = (argument0)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["logic_operation"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (argument0)) == null ? '' : __t) +
            ' ' +
            ((__t = (operator)) == null ? '' : __t) +
            ' ' +
            ((__t = (argument1)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["math_arithmetic"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (argument0)) == null ? '' : __t) +
            '' +
            ((__t = (operator)) == null ? '' : __t) +
            '' +
            ((__t = (argument1)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["math_arithmetic_pow"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pow(' +
            ((__t = (argument0)) == null ? '' : __t) +
            ',' +
            ((__t = (argument1)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["math_modulo"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (argument0)) == null ? '' : __t) +
            '%' +
            ((__t = (argument1)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["math_random"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'random(' +
            ((__t = (value_num)) == null ? '' : __t) +
            ',' +
            ((__t = (value_dmax)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["procedures_callnoreturn"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (funcArgs)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["procedures_callreturn"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (funcName)) == null ? '' : __t) +
            '(' +
            ((__t = (funcArgs)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["procedures_defnoreturn"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (returnType)) == null ? '' : __t) +
            ' ' +
            ((__t = (funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            ' }\n';

    }
    return __p
};

this["JST"]["procedures_defreturn"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (returnType)) == null ? '' : __t) +
            ' ' +
            ((__t = (funcName)) == null ? '' : __t) +
            ' (' +
            ((__t = (args)) == null ? '' : __t) +
            ') {\n' +
            ((__t = (branch)) == null ? '' : __t) +
            '\n' +
            ((__t = (returnValue)) == null ? '' : __t) +
            ' }\n';

    }
    return __p
};

this["JST"]["serial_available"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'if (Serial.available()>0){\n' +
            ((__t = (branch)) == null ? '' : __t) +
            '\n}\n';

    }
    return __p
};

this["JST"]["serial_parseint"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.parseInt()\n';

    }
    return __p
};

this["JST"]["serial_parseint_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.begin(' +
            ((__t = (bitrate)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_print"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.print(' +
            ((__t = (content)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_print_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.begin(' +
            ((__t = (bitrate)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_println"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.println(' +
            ((__t = (content)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_println_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.begin(' +
            ((__t = (bitrate)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_read"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.read()';

    }
    return __p
};

this["JST"]["serial_read_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.begin(' +
            ((__t = (bitrate)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_readstring"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.readString()\n';

    }
    return __p
};

this["JST"]["serial_readstring_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'Serial.begin(' +
            ((__t = (bitrate)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["serial_special"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (char)) == null ? '' : __t);

    }
    return __p
};

this["JST"]["servo_cont"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'servos[' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (value_degree)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["servo_cont_definitions_include"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '#include <Servo.h>\n\nServo servos[13];';

    }
    return __p
};

this["JST"]["servo_cont_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'servos[' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            '].attach(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["servo_move"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'servos[' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            '].write(' +
            ((__t = (value_degree)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["servo_move_definitions_include"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += '#include <Servo.h>\n\nServo servos[13];';

    }
    return __p
};

this["JST"]["servo_move_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'servos[' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            '].attach(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["text_equalsIgnoreCase"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (string1)) == null ? '' : __t) +
            '.equalsIgnoreCase(' +
            ((__t = (string2)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["text_length"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (argument0)) == null ? '' : __t) +
            '.length()';

    }
    return __p
};

this["JST"]["text_substring"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (string1)) == null ? '' : __t) +
            '.substring(' +
            ((__t = (from)) == null ? '' : __t) +
            ',' +
            ((__t = (to)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["variables_set"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p +=
            ((__t = (varName)) == null ? '' : __t) +
            '=' +
            ((__t = (varValue)) == null ? '' : __t) +
            ';\n';

    }
    return __p
};

this["JST"]["zum_button"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["zum_button_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',INPUT_PULLUP);\n';

    }
    return __p
};

this["JST"]["zum_follower"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'if(digitalRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')==HIGH)\n{\n  ' +
            ((__t = (code_btn1)) == null ? '' : __t) +
            '\n}\nif(digitalRead(' +
            ((__t = (NextPIN)) == null ? '' : __t) +
            ')==HIGH)\n{\n  ' +
            ((__t = (code_btn2)) == null ? '' : __t) +
            '\n}\n';

    }
    return __p
};

this["JST"]["zum_follower_setups_nextpin"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode( ' +
            ((__t = (NextPIN)) == null ? '' : __t) +
            ' , INPUT);\n';

    }
    return __p
};

this["JST"]["zum_follower_setups_pin"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode( ' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ' , INPUT);\n';

    }
    return __p
};

this["JST"]["zum_infrared"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["zum_infrared_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode( ' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ' , INPUT);\n';

    }
    return __p
};

this["JST"]["zum_led"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'digitalWrite(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (dropdown_stat)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["zum_led_setups"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'pinMode(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',OUTPUT);\n';

    }
    return __p
};

this["JST"]["zum_photoresistor"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};

this["JST"]["zum_piezo_buzzer"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'tone(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (dropdown_stat)) == null ? '' : __t) +
            ',' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n';

    }
    return __p
};

this["JST"]["zum_piezo_buzzerav"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'tone(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ',' +
            ((__t = (Buzztone)) == null ? '' : __t) +
            ',' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\ndelay(' +
            ((__t = (delay_time)) == null ? '' : __t) +
            ');\n\n';

    }
    return __p
};

this["JST"]["zum_potentiometer"] = function(obj) {
    obj || (obj = {});
    var __t, __p = '',
        __e = _.escape;
    with(obj) {
        __p += 'analogRead(' +
            ((__t = (dropdown_pin)) == null ? '' : __t) +
            ')';

    }
    return __p
};
var JST = this.JST;