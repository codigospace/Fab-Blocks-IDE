/*! roboblocks - v0.2.3 - 2016-02-02
 * https://github.com/bq/roboblocks
 * Copyright (c) 2016 bq; Licensed  */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
    } else {
        factory(_, window.Blockly, window.Blocks);
    }
}(function(_, Blockly, Blocks) {
    var load = function(options) {
        // Source: src/lang.js
        /* global RoboBlocks, options */
        RoboBlocks.locales = {
            defaultLanguage: {},
            languages: []
        };
        RoboBlocks.locales.getLang = function() {
            return this.defaultLanguage.lngCode;
        };
        RoboBlocks.locales.getKey = function(key) {
            return this.defaultLanguage[key];
        };
        RoboBlocks.locales.setDefaultLang = function(langCode) {
            for (var i in this.languages) {
                if (this.languages[i].langCode === langCode) {
                    this.defaultLanguage = this.languages[i].values;
                    this.defaultLanguage.lngCode = langCode;
                }
            }
        };
        RoboBlocks.locales.add = function(langCode, values) {
            if (!langCode) {
                return this.defaultLanguage;
            }
            if (langCode && !values) {
                if (!this.languages[langCode]) {
                    throw new Error('Unknown language : ' + langCode);
                }
                //this.defaultLanguage = langCode;
            }
            if (values || !this.languages[langCode]) {
                this.languages.push({
                    langCode: langCode,
                    values: values
                });
            }
            return this;
        };
        RoboBlocks.locales.initialize = function() {
            var lang = options.lang || window.roboblocksLanguage || 'es-ES';
            this.setDefaultLang(lang);
            return this;
        };

        // Source: lang/en-GB.js
        (function() {
            var language = {
                //random :
                BLOCKLY_MSG_DUPLICATE_BLOCK: 'Duplicate',
                BLOCKLY_MSG_REMOVE_COMMENT: 'Remove Comment',
                BLOCKLY_MSG_ADD_COMMENT: 'Add Comment',
                BLOCKLY_MSG_EXTERNAL_INPUTS: 'External Inputs',
                BLOCKLY_MSG_INLINE_INPUTS: 'Inline Inputs',
                BLOCKLY_MSG_DELETE_BLOCK: 'Delete Block',
                BLOCKLY_MSG_DELETE_X_BLOCKS: 'Delete %1 Blocks',
                BLOCKLY_MSG_COLLAPSE_BLOCK: 'Collapse Block',
                BLOCKLY_MSG_EXPAND_BLOCK: 'Expand Block',
                BLOCKLY_MSG_DISABLE_BLOCK: 'Disable Block',
                BLOCKLY_MSG_ENABLE_BLOCK: 'Enable Block',
                BLOCKLY_MSG_HELP: 'Help',
                BLOCKLY_MSG_COLLAPSE_ALL: 'Collapse Blocks',
                BLOCKLY_MSG_EXPAND_ALL: 'Expand Blocks',
                LANG_VARIABLES_SET_ITEM: 'item',
                LANG_RESERVED_WORDS: 'Reserved word: this name is not allowed.',
                //logic blocks:
                LANG_CATEGORY_LOGIC: 'Logic',
                LANG_LOGIC_OPERATION_AND: 'and',
                LANG_LOGIC_OPERATION_OR: 'or',
                LANG_LOGIC_COMPARE_TOOLTIP_EQ: 'Checks if both inputs are equal .',
                LANG_LOGIC_COMPARE_TOOLTIP_NEQ: 'Checks if both inputs are different.',
                LANG_LOGIC_COMPARE_TOOLTIP_LT: 'Checks if the first input is smaller than the second one.',
                LANG_LOGIC_COMPARE_TOOLTIP_LTE: 'Checks if the first input is smaller than or equal to the second one.',
                LANG_LOGIC_COMPARE_TOOLTIP_GT: 'Checks if the first input is greater than the second one.',
                LANG_LOGIC_COMPARE_TOOLTIP_GTE: 'Checks if the first input is greater than or equal to the second one.',
                LANG_LOGIC_OPERATION_TOOLTIP_AND: 'Checks if both inputs are true.',
                LANG_LOGIC_OPERATION_TOOLTIP_OR: 'Checks if either inputs are true.',
                LANG_LOGIC_NEGATE_INPUT_NOT: 'not',
                LANG_LOGIC_NEGATE_TOOLTIP: 'Returns the opposite of the input.',
                LANG_LOGIC_NEGATE_HELPURL: '',
                LANG_LOGIC_BOOLEAN_TRUE: 'true',
                LANG_LOGIC_BOOLEAN_FALSE: 'false',
                LANG_LOGIC_BOOLEAN_TOOLTIP: 'Returns either true or false.',
                //communication blocks:
                LANG_CATEGORY_COMMUNICATION: 'Communication',
                LANG_BQ_BLUETOOTH_RECEIVE: 'Bluetooth receive data',
                LANG_BQ_BLUETOOTH_RECEIVE_BLUETOOTH: 'Bluetooth',
                LANG_BQ_BLUETOOTH_RECEIVE_TOOLTIP: 'Returns the data received by the Bluetooth module',
                LANG_BQ_BLUETOOTH_SEND: 'Bluetooth send data',
                LANG_BQ_BLUETOOTH_SEND_SEND: 'Send',
                LANG_BQ_BLUETOOTH_SEND_TOOLTIP: 'Sends the input data using the Bluetooth module',
                LANG_BQ_BLUETOOTH_DEF: 'Bluetooth definition',
                LANG_BQ_BLUETOOTH_DEF_BAUD_RATE: 'Baud rate',
                LANG_BQ_BLUETOOTH_DEF_PIN1: 'RX',
                LANG_BQ_BLUETOOTH_DEF_PIN2: 'TX',
                LANG_BQ_BLUETOOTH_DEF_NAME: 'Name',
                LANG_BQ_BLUETOOTH_DEF_PINCODE: 'PinCode',
                LANG_BQ_BLUETOOTH_DEF_RECEIVE: 'Receive',
                LANG_BQ_BLUETOOTH_DEF_SEND: 'Send',
                LANG_BQ_BLUETOOTH_DEF_TOOLTIP: 'Bluetooth module definition',
                LANG_ADVANCED_BT_SERIAL_AVAILABLE: 'Bluetooth Serial Available',
                LANG_ADVANCED_BT_SERIAL_AVAILABLE_TOOLTIP: 'Check wether the bluetooth is available or not.',
                LANG_ADVANCED_SERIAL_AVAILABLE: 'Serial Available',
                LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP: 'Check wether the serial port is available or not',
                LANG_ADVANCED_SERIAL_PARSEINT: 'Serial Read Integer',
                LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP: 'First valid (long) integer number from the serial buffer',
                LANG_ADVANCED_SERIAL_PRINT: 'Serial Print',
                LANG_ADVANCED_SERIAL_PRINT_TOOLTIP: 'Prints data as ASCII text.',
                LANG_ADVANCED_SERIAL_PRINTLN: 'Serial Println',
                LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP: 'Prints data as ASCII text and adds a Carriage Return (CR).',
                LANG_ADVANCED_SERIAL_READ: 'Serial Read',
                LANG_ADVANCED_SERIAL_READ_TOOLTIP: 'Reads incoming serial data from serial port as bytes.',
                LANG_ADVANCED_SERIAL_READSTRING: 'Serial Read String',
                LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP: 'Reads incoming serial data from serial port as ASCII text.',
                LANG_ADVANCED_SERIAL_SPECIAL: 'Special Chars',
                LANG_ADVANCED_SERIAL_SPECIAL_TAB: 'Tab',
                LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN: 'Carriage Return',
                LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED: 'Line Feed',
                LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP: 'Writes special Chars.',
                //bq blocks :
                LANG_CATEGORY_BQ: 'Octopus bloqs',
                LANG_BQ_BAT: 'BAT - Ultrasonic Sensor',
                LANG_BQ_BAT_RED_PIN: 'ECHO PIN#',
                LANG_BQ_BAT_BLUE_PIN: 'TRIGGER PIN#',
                LANG_BQ_BAT_TOOLTIP: 'Returns the distance measured by the ultrasonic sensor.',
                LANG_BQ_BUTTON: 'Button',
                LANG_BQ_BUTTON_PIN: 'PIN#',
                LANG_BQ_BUTTON_TOOLTIP: 'Button',
                LANG_BQ_BUTTONS: 'Button Pad',
                LANG_BQ_BUTTONS_PIN: 'PIN#',
                LANG_BQ_BUTTONS_BUTTON_A: 'Button #A',
                LANG_BQ_BUTTONS_BUTTON_B: 'Button #B',
                LANG_BQ_BUTTONS_BUTTON_C: 'Button #C',
                LANG_BQ_BUTTONS_BUTTON_D: 'Button #D',
                LANG_BQ_BUTTONS_BUTTON_E: 'Button #E',
                LANG_BQ_BUTTONS_TOOLTIP: 'Button Pad',
                LANG_BQ_INFRARED: 'Infrared Sensor',
                LANG_BQ_INFRARED_PIN: 'PIN#',
                LANG_BQ_INFRARED_TOOLTIP: 'Returns the digital value read by the infrared sensor.',
                LANG_BQ_JOYSTICK: 'Joystick',
                LANG_BQ_JOYSTICK_PIN_X: 'X axis PIN#',
                LANG_BQ_JOYSTICK_PIN_Y: 'Y axis PIN#',
                LANG_BQ_JOYSTICK_PIN_BUTTON: 'Button PIN#',
                LANG_BQ_JOYSTICK_POSITION: 'Joystick Position',
                LANG_BQ_JOYSTICK_TOOLTIP: 'Joystick',
                LANG_BQ_LED: 'LED',
                LANG_BQ_LED_PIN: 'PIN#',
                LANG_BQ_LED_STATE: '',
                LANG_BQ_LED_ON: 'ON',
                LANG_BQ_LED_OFF: 'OFF',
                LANG_BQ_LED_TOOLTIP: 'LED',
                LANG_BQ_PHOTORESISTOR: 'Light Sensor',
                LANG_BQ_PHOTORESISTOR_PIN: 'PIN#',
                LANG_BQ_PHOTORESISTOR_TOOLTIP: 'Returns the analog value measured by the light sensor.',
                LANG_BQ_PIEZO_BUZZER: 'Buzzer',
                LANG_BQ_PIEZO_BUZZER_PIN: 'PIN#',
                LANG_BQ_PIEZO_BUZZER_TONE: 'TONE',
                LANG_BQ_PIEZO_BUZZER_DO: 'DO',
                LANG_BQ_PIEZO_BUZZER_RE: 'RE',
                LANG_BQ_PIEZO_BUZZER_MI: 'MI',
                LANG_BQ_PIEZO_BUZZER_FA: 'FA',
                LANG_BQ_PIEZO_BUZZER_SOL: 'SOL',
                LANG_BQ_PIEZO_BUZZER_LA: 'LA',
                LANG_BQ_PIEZO_BUZZER_SI: 'SI',
                LANG_BQ_PIEZO_BUZZER_DURATION: 'Duration [ms]',
                LANG_BQ_PIEZO_BUZZER_TOOLTIP: 'Piezo Buzzer',
                LANG_BQ_PIEZO_BUZZERAV: 'Advanced Buzzer',
                LANG_BQ_PIEZO_BUZZERAV_PIN: 'PIN#',
                LANG_BQ_PIEZO_BUZZERAV_TONE: 'TONE',
                LANG_BQ_PIEZO_BUZZERAV_DURATION: 'Duration [ms]',
                LANG_BQ_PIEZO_BUZZERAV_TOOLTIP: 'Piezo Buzzer Advanced',
                LANG_BQ_POTENTIOMETER: 'Potentiometer',
                LANG_BQ_POTENTIOMETER_PIN: 'PIN#',
                LANG_BQ_POTENTIOMETER_TOOLTIP: 'Returns the analog value measured by the potentiometer.',
                //LCD blocks:
                LANG_CATEGORY_LCD: 'LCD bloqs',
                LANG_LCD_DEF: 'LCD (2x16)',
                LANG_LCD_PINS: 'LCD Pins',
                LANG_LCD_DEF_TOOLTIP: 'Block that defines the LCD',
                LANG_LCD_ADVANCED_DEF: 'Advanced LCD',
                LANG_LCD_ADVANCED_ROWS: 'Rows',
                LANG_LCD_ADVANCED_COLUMNS: 'Columns',
                LANG_LCD_DEF_ADVANCED_TOOLTIP: 'Block that defines the advanced LCD',
                LANG_LCD_SETBACKLIGHT: 'LCD: setBacklight(',
                LANG_LCD_SETBACKLIGHT_CLOSE: ')',
                LANG_LCD_SETBACKLIGHT_TOOLTIP: 'Sets the backlight of the LCD screen.',
                LANG_LCD_PRINT: 'LCD: print ',
                LANG_LCD_PRINT_POSITION: 'Set text position?',
                LANG_LCD_PRINT_TOOLTIP: 'Prints a String in the LCD at the specified position or the next available one.',
                LANG_LCD_CLEAR: 'LCD clear',
                LANG_LCD_CLEAR_TOOLTIP: 'LCD clear',
                //controls blocks :
                LANG_CATEGORY_CONTROLS: 'Control',
                LANG_CONTROLS_BASE_DELAY_WAIT: 'Wait (ms)',
                LANG_CONTROLS_BASE_DELAY_TOOLTIP: 'Waits the specified time in milliseconds (ms)',
                LANG_CONTROLS_BASE_MILLIS: 'Time from start (ms)',
                LANG_CONTROLS_BASE_MILLIS_TOOLTIP: 'Number of milliseconds since the program started (long integer)',
                LANG_CONTROLS_DOWHILE_OPERATOR_DO: 'Do',
                LANG_CONTROLS_DOWHILE_OPERATOR_WHILE: 'while',
                LANG_CONTROLS_DOWHILE_TOOLTIP: 'While the condition is true, continue doing the statements.',
                LANG_CONTROLS_EXECUTE: 'Execute',
                LANG_CONTROLS_EXECUTE_TOOLTIP: 'Executes C/C++ code. Use with caution, as it can easily break the program and prevent it from compiling.',
                LANG_CONTROLS_IF_TOOLTIP_1: 'If the condition is true, execute the statements.',
                LANG_CONTROLS_IF_TOOLTIP_2: 'If the condition is true, then do the first block of statements. Otherwise, do the second block of statements.',
                LANG_CONTROLS_IF_TOOLTIP_3: 'If the first condition is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements.',
                LANG_CONTROLS_IF_TOOLTIP_4: 'If the first condition is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements. If none of the values are true, do the last block of statements.',
                LANG_CONTROLS_IF_MSG_IF: 'if',
                LANG_CONTROLS_IF_MSG_ELSEIF: 'else if',
                LANG_CONTROLS_IF_MSG_ELSE: 'else',
                LANG_CONTROLS_IF_MSG_THEN: 'do',
                LANG_CONTROLS_IF_IF_Field_IF: 'if',
                LANG_CONTROLS_IF_IF_TOOLTIP: 'Add, remove, or reorder sections to reconfigure this if block.',
                LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF: 'else if',
                LANG_CONTROLS_IF_ELSEIF_TOOLTIP: 'Add a condition to the if block.',
                LANG_CONTROLS_IF_ELSE_Field_ELSE: 'else',
                LANG_CONTROLS_IF_ELSE_TOOLTIP: 'Add a final, catch-all condition to the if block.',
                LANG_CONTROLS_FOR_FROM_WARNING: 'It is not possible to set a variable as the initial value of the for block.',
                LANG_CONTROLS_FOR_TO_WARNING: 'It is not possible to set a variable as the final value of the for block.',
                LANG_CONTROLS_FOR_INPUT_WITH: 'count with',
                LANG_CONTROLS_FOR_INPUT_VAR: 'x',
                LANG_CONTROLS_FOR_INPUT_FROM: 'from',
                LANG_CONTROLS_FOR_INPUT_TO: 'to',
                LANG_CONTROLS_FOR_INPUT_DO: 'do',
                LANG_CONTROLS_FOR_TOOLTIP: 'Count from a start number to an end number. Each time the count is incremented by one, the variable takes that value then do the statements.',
                LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE: 'while',
                LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL: 'until',
                LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE: 'While the condition is true, then do the statements.',
                LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL: 'While the condition is false, then do the statements.',
                LANG_CONTROLS_REPEAT_TITLE_REPEAT: 'Repeat',
                LANG_CONTROLS_REPEAT_TITLE_TIMES: 'times',
                LANG_CONTROLS_REPEAT_INPUT_DO: 'do',
                LANG_CONTROLS_REPEAT_TOOLTIP: 'Repeat the statements a certain number of times',
                LANG_CONTROLS_FLOW_STATEMENTS_HELPURL: '',
                LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP: 'of loop',
                LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK: 'break out',
                LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE: 'continue with next iteration',
                LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK: 'Break out of the containing loop.',
                LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE: 'Skip the rest of this loop, and continue with the next iteration.',
                LANG_CONTROLS_FLOW_STATEMENTS_WARNING: 'Warning: This block may only be used within a loop.',
                LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE: 'Setup',
                LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE: 'Loop',
                LANG_CONTROLS_SETUP_LOOP_TOOLTIP: 'Blocks in setup will be executed at start, and blocks in Loop will be repeated continously.',
                LANG_CONTROLS_SWITCH: 'switch ',
                LANG_CONTROLS_SWITCH_TOOLTIP_1: 'Execute the statement of the case .',
                LANG_CONTROLS_SWITCH_TOOLTIP_2: 'Use the switch statement to select one of many blocks of code to be executed.',
                LANG_CONTROLS_SWITCH_TOOLTIP_3: 'Use the switch statement to select one of many blocks of code to be executed.',
                LANG_CONTROLS_SWITCH_TOOLTIP_4: 'Use the switch statement to select one of many blocks of code to be executed.',
                LANG_CONTROLS_SWITCH_SWITCH_TOOLTIP: 'The switch expression is evaluated once',
                LANG_CONTROLS_SWITCH_CASE_TOOLTIP: 'case',
                LANG_CONTROLS_SWITCH_DEFAULT_TOOLTIP: 'The default keyword specifies the code to run if there is no case match',
                LANG_CONTROLS_SWITCH_IS: 'case: ',
                LANG_CONTROLS_SWITCH_CASE: 'case',
                LANG_CONTROLS_SWITCH_COLON: ': ',
                LANG_CONTROLS_SWITCH_DEFAULT: 'default',
                LANG_CONTROLS_SWITCH_DO: 'do',
                //math blocks :
                LANG_CATEGORY_MATH: 'Math',
                LANG_MATH_ADVANCED_MAP_MAP: 'Map ',
                LANG_MATH_ADVANCED_MAP_FROM: 'From [',
                LANG_MATH_ADVANCED_MAP_HYPHEN: '-',
                LANG_MATH_ADVANCED_MAP_BRACKET: ']',
                LANG_MATH_ADVANCED_MAP_TO: 'to [',
                LANG_MATH_ADVANCED_MAP_TOOLTIP: 'Re-map the input from a certain range to another.',
                LANG_MATH_NUMBER_TOOLTIP: 'Number',
                LANG_MATH_ARRAY_ARRAY3: '[3]',
                LANG_MATH_ARRAY_BRACKET3: '{',
                LANG_MATH_ARRAY_BRACKET4: '}',
                LANG_MATH_ARRAY_COMMA: ',',
                LANG_MATH_ARRAY_TOOLTIP: 'Array',
                LANG_ARRAY_GET_BRACKET1: '[',
                LANG_ARRAY_GET_BRACKET2: ']',
                LANG_ARRAY_GET_TOOLTIP: 'Returns the value of a certain element of the array.',
                LANG_MATH_MODULO_TOOLTIP: 'Returns the remainder of the division of the two input numbers.',
                LANG_MATH_BASE_MAP: 'Map ',
                LANG_MATH_BASE_MAP_VALUE_TO: 'Value to [0-',
                LANG_MATH_BASE_MAP_BRACKET: ']',
                LANG_MATH_BASE_MAP_TOOLTIP: 'Re-map the input from [0-1023] to another.',
                LANG_MATH_SINGLE_OP_ROOT: 'square root',
                LANG_MATH_SINGLE_OP_ABSOLUTE: 'absolute',
                LANG_MATH_SINGLE_TOOLTIP_ROOT: 'Returns the square root of a number.',
                LANG_MATH_SINGLE_TOOLTIP_ABS: 'Returns the absolute value of a number.',
                LANG_MATH_SINGLE_TOOLTIP_NEG: 'Returns the negation of a number.',
                LANG_MATH_SINGLE_TOOLTIP_LN: 'Returns the natural logarithm of a number.',
                LANG_MATH_SINGLE_TOOLTIP_LOG10: 'Returns the base 10 logarithm of a number.',
                LANG_MATH_SINGLE_TOOLTIP_EXP: 'Returns e to the power of a number.',
                LANG_MATH_SINGLE_TOOLTIP_POW10: 'Returns 10 to the power of a number.',
                //text blocks:
                LANG_CATEGORY_TEXT: 'Text',
                LANG_TEXT_TEXT_HELPURL: '',
                LANG_TEXT_TEXT_TOOLTIP: 'A letter, word, or line of text.',
                LANG_TEXT_JOIN_HELPURL: '',
                LANG_TEXT_JOIN_Field_CREATEWITH: 'create text with',
                LANG_TEXT_JOIN_TOOLTIP: 'Create a piece of text by joining together any number of items.',
                LANG_TEXT_CREATE_JOIN_Field_JOIN: 'join',
                LANG_TEXT_CREATE_JOIN_TOOLTIP: 'Add, remove, or reorder sections to reconfigure this text block.',
                LANG_TEXT_CREATE_JOIN_ITEM_Field_ITEM: 'item',
                LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP: 'Add an item to the text.',
                LANG_TEXT_CREATE_JOIN_TITLE_JOIN: 'join',
                LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM: 'element',
                LANG_TEXT_APPEND_HELPURL: '',
                LANG_TEXT_APPEND_TO: 'to',
                LANG_TEXT_APPEND_APPENDTEXT: 'append text',
                LANG_TEXT_APPEND_VARIABLE: 'item',
                LANG_TEXT_APPEND_TOOLTIP: 'Append some text to variable %1.',
                LANG_TEXT_LENGTH_HELPURL: '',
                LANG_TEXT_LENGTH_INPUT_LENGTH: 'length',
                LANG_TEXT_LENGTH_TOOLTIP: 'Returns number of letters (including spaces) in the provided text.',
                LANG_TEXT_EQUALSIGNORECASE_IS: '',
                LANG_TEXT_EQUALSIGNORECASE_EQUAL: ' =',
                LANG_TEXT_EQUALSIGNORECASE_QUESTION: '?',
                LANG_TEXT_EQUALSIGNORECASE_TOOLTIP: 'Checks if both input strings are equal, regardless of the case.',
                LANG_TEXT_SUBSTRING: 'Crop ',
                LANG_TEXT_SUBSTRING_FROM: 'from',
                LANG_TEXT_SUBSTRING_TO: 'to',
                LANG_TEXT_SUBSTRING_TOOLTIP: 'Obtain a substring from the input string with the caracters between the two input numbers.',
                //advanced blocks :
                LANG_CATEGORY_ADVANCED: 'Arduino',
                LANG_ADVANCED_CONVERSION_CONVERT: 'Convert',
                LANG_ADVANCED_CONVERSION_DECIMAL: 'Decimal',
                LANG_ADVANCED_CONVERSION_HEXADECIMAL: 'Hexadecimal',
                LANG_ADVANCED_CONVERSION_OCTAL: 'Octal',
                LANG_ADVANCED_CONVERSION_BINARY: 'Binary',
                LANG_ADVANCED_CONVERSION_VALUE: 'value',
                LANG_ADVANCED_CONVERSION_TOOLTIP: 'Convert a number from one base to another.',
                LANG_ADVANCED_INOUT_ANALOG_READ: 'AnalogRead PIN#',
                LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP: 'Reads the value from a specified digital pin',
                LANG_ADVANCED_INOUT_ANALOG_WRITE: 'AnalogWrite PIN#',
                LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE: 'value',
                LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP: 'Write a value between 0 and 255 to a specific analog output PIN',
                LANG_ADVANCED_BUILTIN_LED: 'BUILT-IN LED',
                LANG_ADVANCED_BUILTIN_LED_STATE: 'state',
                LANG_ADVANCED_BUILTIN_LED_ON: 'ON',
                LANG_ADVANCED_BUILTIN_LED_OFF: 'OFF',
                LANG_ADVANCED_BUILTIN_LED_TOOLTIP: 'Built-in LED that is internally connected to PIN 13',
                LANG_ADVANCED_INOUT_DIGITAL_READ: 'DigitalRead PIN#',
                LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP: 'Reads the value from a specified digital pin',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE: 'DigitalWrite',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN: 'PIN#',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE: 'state',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_HIGH: 'HIGH',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_LOW: 'LOW',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP: 'Write a value in a specified digital pin',
                LANG_ADVANCED_HIGHLOW_HIGH: 'HIGH',
                LANG_ADVANCED_HIGHLOW_LOW: 'LOW',
                LANG_ADVANCED_HIGHLOW_TOOLTIP: 'HIGH OR LOW',
                LANG_ADVANCED_MATH_RANDOM: 'Random between',
                LANG_ADVANCED_MATH_RANDOM_AND: ' and ',
                LANG_ADVANCED_MATH_RANDOM_TOOLTIP: 'Returns a random number between the two limits.',
                //procedures blocks
                LANG_CATEGORY_PROCEDURES: 'Functions',
                LANG_PROCEDURES_RETURN: 'return',
                LANG_PROCEDURES_RETURN_TOOLTIP: 'Returns a value',
                LANG_PROCEDURES_CALL_WITHOUT_DEFINITION: 'Function call without matching definition',
                LANG_PROCEDURES_DEFNORETURN_HELPURL: '',
                LANG_PROCEDURES_DEFNORETURN_PROCEDURE: 'function_without_return',
                LANG_PROCEDURES_DEFNORETURN_DO: 'do',
                LANG_PROCEDURES_DEFNORETURN_TOOLTIP: 'A function with no return value.',
                LANG_PROCEDURES_DEFRETURN_HELPURL: '',
                LANG_PROCEDURES_DEFRETURN_PROCEDURE: 'function_with_return',
                LANG_PROCEDURES_DEFRETURN_DO: 'do',
                LANG_PROCEDURES_DEFRETURN_RETURN: 'return',
                LANG_PROCEDURES_DEFRETURN_TOOLTIP: 'A function with a return value.',
                LANG_PROCEDURES_DEF_DUPLICATE_WARNING: 'Warning: This function has duplicate parameters.',
                LANG_PROCEDURES_CALLNORETURN_HELPURL: '',
                LANG_PROCEDURES_CALLNORETURN_CALL: 'do',
                LANG_PROCEDURES_CALLNORETURN_PROCEDURE: 'function_without_return',
                LANG_PROCEDURES_CALLNORETURN_TOOLTIP: 'Calls a function with no return value.',
                LANG_PROCEDURES_CALLRETURN_HELPURL: '',
                LANG_PROCEDURES_CALLRETURN_CALL: 'do',
                LANG_PROCEDURES_CALLRETURN_PROCEDURE: 'function_with_return',
                LANG_PROCEDURES_CALLRETURN_TOOLTIP: 'Calls a function with a return value.',
                LANG_PROCEDURES_MUTATORCONTAINER_Field: 'parameters',
                LANG_PROCEDURES_MUTATORARG_Field: 'variable:',
                LANG_PROCEDURES_HIGHLIGHT_DEF: 'Highlight function',
                LANG_PROCEDURES_IFRETURN_TOOLTIP: 'If the condition is true, then returns this value.',
                LANG_PROCEDURES_IFRETURN_WARNING: 'Warning: This block may only be used within a function with a return value.',
                //variables blocks :
                LANG_CATEGORY_VARIABLES: 'Variables',
                LANG_VARIABLES_CALL_WITHOUT_DEFINITION: 'This variable is not declared.',
                LANG_VARIABLES_GLOBAL: 'Declare GLOBAL Variable ',
                LANG_VARIABLES_GLOBAL_TYPE: 'of type ',
                LANG_VARIABLES_GLOBAL_EQUALS: 'equals',
                LANG_VARIABLES_GLOBAL_TOOLTIP: 'Declares and defines a GLOBAL variable of type int or String.',
                LANG_VARIABLES_LOCAL: 'Declare variable ',
                LANG_VARIABLES_LOCAL_TYPE: 'of type ',
                LANG_VARIABLES_LOCAL_EQUALS: 'equals',
                LANG_VARIABLES_LOCAL_TOOLTIP: 'Declare and define a LOCAL variable of type int or String.',
                LANG_VARIABLES_DEFINE: 'Define variable ',
                LANG_VARIABLES_DEFINE_AS: 'as',
                LANG_VARIABLES_DEFINE_TOOLTIP: 'Define the value of a variable.',
                LANG_VARIABLES_SET: 'Var',
                LANG_VARIABLES_SET_AS: '=',
                LANG_VARIABLES_SET_TOOLTIP: 'Sets the value of a variable.',
                LANG_VARIABLES_GET: 'Var',
                LANG_VARIABLES_GET_TOOLTIP: 'Returns the value of a variable.',
                LANG_VARIABLES_PIN_ANALOG: 'Analog pin',
                LANG_VARIABLES_PIN_DIGITAL: 'Digital pin',
                LANG_VARIABLES_PIN_DIGITAL0: 'WARNING: digital pin 0 (RX pin) is used when uploading a sketch. Using it to connect electronic components may cause problems when uploading a new sketch.',
                LANG_VARIABLES_PIN_TOOLTIP: 'Select the PIN.',
                LANG_VARIABLES_TYPE_BYTE: 'Byte',
                LANG_VARIABLES_TYPE_FLOAT: 'Float',
                LANG_VARIABLES_TYPE_INTEGER: 'Integer',
                LANG_VARIABLES_TYPE_INTEGER_LONG: 'Long Integer',
                LANG_VARIABLES_TYPE_STRING: 'String',
                //zum blocks :
                LANG_CATEGORY_ZUM: 'Zum bloqs',
                LANG_ZUM_BUTTON: 'Button',
                LANG_ZUM_BUTTON_PIN: 'PIN#',
                LANG_ZUM_BUTTON_TOOLTIP: 'zum Button',
                LANG_ZUM_FOLLOWER: 'Infrared Sensor',
                LANG_ZUM_FOLLOWER_PIN_LEFT: 'PIN LEFT#',
                LANG_ZUM_FOLLOWER_PIN_RIGHT: 'PIN RIGHT#',
                LANG_ZUM_FOLLOWER_LEFT: 'Left',
                LANG_ZUM_FOLLOWER_RIGHT: 'Right',
                LANG_ZUM_FOLLOWER_TOOLTIP: 'Returns the digital value read by the infrared sensor',
                LANG_ZUM_INFRARED: 'Infrared Sensor',
                LANG_ZUM_INFRARED_PIN: 'PIN#',
                LANG_ZUM_INFRARED_TOOLTIP: 'Returns the digital value read by the infrared sensor',
                LANG_ZUM_LED: 'LED',
                LANG_ZUM_LED_PIN: 'PIN#',
                LANG_ZUM_LED_ON: 'ON',
                LANG_ZUM_LED_OFF: 'OFF',
                LANG_ZUM_LED_TOOLTIP: 'zum LED',
                LANG_ZUM_PHOTORESISTOR: 'Light Sensor',
                LANG_ZUM_PHOTORESISTOR_PIN: 'PIN#',
                LANG_ZUM_PHOTORESISTOR_TOOLTIP: 'Returns the analog value measured by the light sensor.',
                LANG_ZUM_PIEZO_BUZZER: 'Buzzer',
                LANG_ZUM_PIEZO_BUZZER_PIN: 'PIN#',
                LANG_ZUM_PIEZO_BUZZER_TONE: 'TONE',
                LANG_ZUM_PIEZO_BUZZER_DO: 'DO',
                LANG_ZUM_PIEZO_BUZZER_RE: 'RE',
                LANG_ZUM_PIEZO_BUZZER_MI: 'MI',
                LANG_ZUM_PIEZO_BUZZER_FA: 'FA',
                LANG_ZUM_PIEZO_BUZZER_SOL: 'SOL',
                LANG_ZUM_PIEZO_BUZZER_LA: 'LA',
                LANG_ZUM_PIEZO_BUZZER_SI: 'SI',
                LANG_ZUM_PIEZO_BUZZER_DURATION: 'Duration [ms]',
                LANG_ZUM_PIEZO_BUZZER_TOOLTIP: 'Piezo Buzzer',
                LANG_ZUM_PIEZO_BUZZERAV: 'Advanced Buzzer',
                LANG_ZUM_PIEZO_BUZZERAV_PIN: 'PIN#',
                LANG_ZUM_PIEZO_BUZZERAV_TONE: 'TONE',
                LANG_ZUM_PIEZO_BUZZERAV_DURATION: 'Duration [ms]',
                LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP: 'Piezo Buzzer Advanced',
                LANG_ZUM_POTENTIOMETER: 'Potentiometer',
                LANG_ZUM_POTENTIOMETER_PIN: 'PIN#',
                LANG_ZUM_POTENTIOMETER_TOOLTIP: 'Returns the analog value measured by the potentiometer.',
                //servo blocks :
                LANG_CATEGORY_SERVO: 'Servo',
                LANG_SERVO_CONT: 'Continuous rotation servo',
                LANG_SERVO_CONT_PIN: 'PIN#',
                LANG_SERVO_CONT_ROT: 'ROT',
                LANG_SERVO_CONT_TURN_CLOCKWISE: 'TURN CLOCKWISE',
                LANG_SERVO_CONT_TURN_COUNTERCLOCKWISE: 'TURN COUNTERCLOCKWISE',
                LANG_SERVO_CONT_STOPPED: 'STOPPED',
                LANG_SERVO_CONT_DELAY: 'Delay [ms]',
                LANG_SERVO_CONT_TOOLTIP: 'Continuous rotation servo.',
                LANG_SERVO_MOVE: 'Servo',
                LANG_SERVO_MOVE_PIN: 'PIN#',
                LANG_SERVO_MOVE_DEGREES: 'Degrees (0~180)',
                LANG_SERVO_MOVE_DELAY: 'Delay [ms]',
                LANG_SERVO_MOVE_TOOLTIP: 'Move between 0~180 degree',
                LANG_SERVO_WARNING: 'It is not possible to set the servo pin using a variable',
                //MODULAR blocks :
                LANG_CATEGORY_MODULAR: 'Modular',
                //MODULAR blocks :
                LANG_CATEGORY_BETTO: 'Betto',
                //CARLITTO blocks :
                LANG_CATEGORY_CARLITTO: 'Betto'
            };
            // Node
            if (typeof module !== 'undefined' && module.exports) {
                module.exports = language;
            }
            // Browser
            // if (typeof window !== 'undefined' && this.RoboBlocks && this.RoboBlocks.locales.add) {
            //     this.RoboBlocks.locales.add('en', language);
            if (typeof window !== 'undefined' && RoboBlocks && RoboBlocks.locales.add) {
                RoboBlocks.locales.add('en-GB', language);
            }
        }());

        // Source: lang/es-ES.js
        (function() {
            var language = {
                //random :
                BLOCKLY_MSG_DUPLICATE_BLOCK: 'Duplicar',
                BLOCKLY_MSG_REMOVE_COMMENT: 'Remove Comment',
                BLOCKLY_MSG_ADD_COMMENT: 'Add Comment',
                BLOCKLY_MSG_EXTERNAL_INPUTS: 'External Inputs',
                BLOCKLY_MSG_INLINE_INPUTS: 'Inline Inputs',
                BLOCKLY_MSG_DELETE_BLOCK: 'Delete Block',
                BLOCKLY_MSG_DELETE_X_BLOCKS: 'Delete %1 Blocks',
                BLOCKLY_MSG_COLLAPSE_BLOCK: 'Collapse Block',
                BLOCKLY_MSG_EXPAND_BLOCK: 'Expand Block',
                BLOCKLY_MSG_DISABLE_BLOCK: 'Disable Block',
                BLOCKLY_MSG_ENABLE_BLOCK: 'Enable Block',
                BLOCKLY_MSG_HELP: 'Help',
                BLOCKLY_MSG_COLLAPSE_ALL: 'Collapse Blocks',
                BLOCKLY_MSG_EXPAND_ALL: 'Expand Blocks',
                LANG_VARIABLES_SET_ITEM: 'elemento',
                LANG_RESERVED_WORDS: 'Palabra reservada: este nombre no está permitido.',
                //logic blocks:
                LANG_CATEGORY_LOGIC: 'Lógica',
                LANG_LOGIC_OPERATION_AND: 'y',
                LANG_LOGIC_OPERATION_OR: 'o',
                LANG_LOGIC_COMPARE_TOOLTIP_EQ: 'Compara si las dos entradas son iguales.',
                LANG_LOGIC_COMPARE_TOOLTIP_NEQ: 'Compara si las dos entradas no son iguales entre sí.',
                LANG_LOGIC_COMPARE_TOOLTIP_LT: 'Compara si la primera entrada es menor que la segunda entrada.',
                LANG_LOGIC_COMPARE_TOOLTIP_LTE: 'Compara si la primera entrada es menor o igual que la segunda entrada.',
                LANG_LOGIC_COMPARE_TOOLTIP_GT: 'Compara si la primera entrada es mayor que la segunda entrada.',
                LANG_LOGIC_COMPARE_TOOLTIP_GTE: 'Compara si la primera entrada es mayor o igual que la segunda entrada.',
                LANG_LOGIC_OPERATION_TOOLTIP_AND: 'Compara si ambas entradas son verdaderas.',
                LANG_LOGIC_OPERATION_TOOLTIP_OR: 'Compara si alguna de las entradas son verdaderas.',
                LANG_LOGIC_NEGATE_INPUT_NOT: 'no',
                LANG_LOGIC_NEGATE_TOOLTIP: 'Devuelve lo contrario de la entrada.',
                LANG_LOGIC_NEGATE_HELPURL: '',
                LANG_LOGIC_BOOLEAN_TRUE: 'verdadero',
                LANG_LOGIC_BOOLEAN_FALSE: 'falso',
                LANG_LOGIC_BOOLEAN_TOOLTIP: 'Devuelve verdadero o falso en función de lo seleccionado.',
                //communication blocks:
                LANG_CATEGORY_COMMUNICATION: 'Comunicación',
                LANG_BQ_BLUETOOTH_RECEIVE: 'Bluetooth: recibir ',
                LANG_BQ_BLUETOOTH_RECEIVE_BLUETOOTH: 'Bluetooth',
                LANG_BQ_BLUETOOTH_RECEIVE_TOOLTIP: 'Devuelve los datos recibidos por el módulo Bluetooth',
                LANG_BQ_BLUETOOTH_SEND: 'Bluetooth: Enviar',
                LANG_BQ_BLUETOOTH_SEND_SEND: 'Enviar datos',
                LANG_BQ_BLUETOOTH_SEND_TOOLTIP: 'Toma los datos de la entrada y los envía usando el módulo Bluetooth',
                LANG_BQ_BLUETOOTH_DEF: 'Bluetooth',
                LANG_BQ_BLUETOOTH_DEF_BAUD_RATE: 'Tasa de baudios',
                LANG_BQ_BLUETOOTH_DEF_PIN1: 'RX',
                LANG_BQ_BLUETOOTH_DEF_PIN2: 'TX',
                LANG_BQ_BLUETOOTH_DEF_NAME: 'Nombre',
                LANG_BQ_BLUETOOTH_DEF_PINCODE: 'Código PIN',
                LANG_BQ_BLUETOOTH_DEF_RECEIVE: 'Recibir',
                LANG_BQ_BLUETOOTH_DEF_SEND: 'Enviar',
                LANG_BQ_BLUETOOTH_DEF_TOOLTIP: 'Definición del módulo Bluetooth',
                LANG_ADVANCED_BT_SERIAL_AVAILABLE: 'Bluetooth: Puerto Serie Disponible',
                LANG_ADVANCED_BT_SERIAL_AVAILABLE_TOOLTIP: 'Comprueba si el módulo Bluetooth está disponible o no',
                LANG_ADVANCED_SERIAL_AVAILABLE: 'Puerto Serie Disponible',
                LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP: 'Comprueba si el puerto serie está disponible o no',
                LANG_ADVANCED_SERIAL_PARSEINT: 'Leer entero por el puerto serie', // To translate
                LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP: 'Devuelve el primer número entero (largo) desde el puerto serie', // To translate
                LANG_ADVANCED_SERIAL_PRINT: 'Imprimir por puerto serie',
                LANG_ADVANCED_SERIAL_PRINT_TOOLTIP: 'Imprime los datos como texto ASCII.',
                LANG_ADVANCED_SERIAL_PRINTLN: 'Imprimir por puerto serie con salto de línea',
                LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP: 'Imprime los datos como texto ASCII y con retorno de carro (RC).',
                LANG_ADVANCED_SERIAL_READ: 'Leer desde el puerto serie',
                LANG_ADVANCED_SERIAL_READ_TOOLTIP: 'Lee los datos que se reciben por el puerto serie como texto bytes.',
                LANG_ADVANCED_SERIAL_READSTRING: 'Leer cadena desde el puerto serie',
                LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP: 'Lee los datos que se reciben por el puerto serie como texto ASCII.',
                LANG_ADVANCED_SERIAL_SPECIAL: 'Caracteres especiales',
                LANG_ADVANCED_SERIAL_SPECIAL_TAB: 'Tabulador',
                LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN: 'Retorno de carro',
                LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED: 'Salto de línea',
                LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP: 'Escribe caracteres especiales.',
                //bq blocks :
                LANG_CATEGORY_BQ: 'Octopus bloqs',
                LANG_BQ_BAT: 'BAT - Sensor de Ultrasonidos',
                LANG_BQ_BAT_RED_PIN: 'ECHO PIN#',
                LANG_BQ_BAT_BLUE_PIN: 'TRIGGER PIN#',
                LANG_BQ_BAT_TOOLTIP: 'Devuelve la distancia medida por el sensor.',
                LANG_BQ_BUTTON: 'Botón',
                LANG_BQ_BUTTON_PIN: 'PIN#',
                LANG_BQ_BUTTON_TOOLTIP: 'Botón',
                LANG_BQ_BUTTONS: 'Botonera',
                LANG_BQ_BUTTONS_PIN: 'PIN#',
                LANG_BQ_BUTTONS_BUTTON_A: 'Botón #A',
                LANG_BQ_BUTTONS_BUTTON_B: 'Botón #B',
                LANG_BQ_BUTTONS_BUTTON_C: 'Botón #C',
                LANG_BQ_BUTTONS_BUTTON_D: 'Botón #D',
                LANG_BQ_BUTTONS_BUTTON_E: 'Botón #E',
                LANG_BQ_BUTTONS_TOOLTIP: 'Botonera',
                LANG_BQ_INFRARED: 'Sensor infrarrojo',
                LANG_BQ_INFRARED_PIN: 'PIN#',
                LANG_BQ_INFRARED_TOOLTIP: 'Devuelve el valor digital medido por el sensor infrarrojo',
                LANG_BQ_JOYSTICK: 'Joystick',
                LANG_BQ_JOYSTICK_PIN_X: 'Eje X PIN#',
                LANG_BQ_JOYSTICK_PIN_Y: 'Eje Y PIN#',
                LANG_BQ_JOYSTICK_POSITION: 'Posición Joystick',
                LANG_BQ_JOYSTICK_PIN_BUTTON: 'Pulsador PIN#',
                LANG_BQ_JOYSTICK_TOOLTIP: 'Joystick',
                LANG_BQ_LED: 'LED',
                LANG_BQ_LED_PIN: 'PIN#',
                LANG_BQ_LED_STATE: '',
                LANG_BQ_LED_ON: 'ENCENDER',
                LANG_BQ_LED_OFF: 'APAGAR',
                LANG_BQ_LED_TOOLTIP: 'LED',
                LANG_BQ_PHOTORESISTOR: 'Sensor de Luz',
                LANG_BQ_PHOTORESISTOR_PIN: 'PIN#',
                LANG_BQ_PHOTORESISTOR_TOOLTIP: 'Devuelve el valor analógico medido por la fotorresistencia.',
                LANG_BQ_PIEZO_BUZZER: 'Zumbador',
                LANG_BQ_PIEZO_BUZZER_PIN: 'PIN#',
                LANG_BQ_PIEZO_BUZZER_TONE: 'TONO',
                LANG_BQ_PIEZO_BUZZER_DO: 'DO',
                LANG_BQ_PIEZO_BUZZER_RE: 'RE',
                LANG_BQ_PIEZO_BUZZER_MI: 'MI',
                LANG_BQ_PIEZO_BUZZER_FA: 'FA',
                LANG_BQ_PIEZO_BUZZER_SOL: 'SOL',
                LANG_BQ_PIEZO_BUZZER_LA: 'LA',
                LANG_BQ_PIEZO_BUZZER_SI: 'SI',
                LANG_BQ_PIEZO_BUZZER_DURATION: 'Duración [ms]',
                LANG_BQ_PIEZO_BUZZER_TOOLTIP: 'Zumbador piezoeléctrico',
                LANG_BQ_PIEZO_BUZZERAV: 'Zumbador avanzado',
                LANG_BQ_PIEZO_BUZZERAV_PIN: 'PIN#',
                LANG_BQ_PIEZO_BUZZERAV_TONE: 'TONO',
                LANG_BQ_PIEZO_BUZZERAV_DURATION: 'Duración [ms]',
                LANG_BQ_PIEZO_BUZZERAV_TOOLTIP: 'Zumbador avanzado',
                LANG_BQ_POTENTIOMETER: 'Potenciómetro',
                LANG_BQ_POTENTIOMETER_PIN: 'PIN#',
                LANG_BQ_POTENTIOMETER_TOOLTIP: 'Devuelve el valor analógico medido por el potenciómetro',
                //LCD blocks:
                LANG_CATEGORY_LCD: 'LCD bloqs',
                LANG_LCD_DEF: 'LCD (2x16)',
                LANG_LCD_PINS: 'Pines del LCD',
                LANG_LCD_DEF_TOOLTIP: 'Define el LCD',
                LANG_LCD_ADVANCED_DEF: 'LCD avanzado',
                LANG_LCD_ADVANCED_ROWS: 'Filas',
                LANG_LCD_ADVANCED_COLUMNS: 'Columnas',
                LANG_LCD_DEF_ADVANCED_TOOLTIP: 'Bloque que define el LCD avanzado',
                LANG_LCD_SETBACKLIGHT: 'LCD: ajustar la retroiluminación',
                LANG_LCD_SETBACKLIGHT_CLOSE: '',
                LANG_LCD_SETBACKLIGHT_TOOLTIP: 'Ajusta la retroiluminación de la pantalla LCD',
                LANG_LCD_PRINT: 'LCD: Imprimir ',
                LANG_LCD_PRINT_POSITION: '¿Fijar posición del texto?',
                LANG_LCD_PRINT_TOOLTIP: 'Imprime un string en la pantalla LCD en la posición específicada o en la siguiente disponible.',
                LANG_LCD_CLEAR: 'LCD borrar',
                LANG_LCD_CLEAR_TOOLTIP: 'LCD: Borrar',
                //controls blocks :
                LANG_CATEGORY_CONTROLS: 'Control',
                LANG_CONTROLS_BASE_DELAY_WAIT: 'Esperar [ms]',
                LANG_CONTROLS_BASE_DELAY_TOOLTIP: 'Espera el tiempo especificado en milisegundos (ms)',
                LANG_CONTROLS_BASE_MILLIS: 'Tiempo desde el arranque (ms)',
                LANG_CONTROLS_BASE_MILLIS_TOOLTIP: 'Número de milisegundos desde que se inició el programa (entero largo)',
                LANG_CONTROLS_DOWHILE_OPERATOR_DO: 'Hacer',
                LANG_CONTROLS_DOWHILE_OPERATOR_WHILE: 'mientras',
                LANG_CONTROLS_DOWHILE_TOOLTIP: 'Mientras la condición sea verdadera, continúa ejecutando las acciones del bloque.',
                LANG_CONTROLS_EXECUTE: 'Ejecutar',
                LANG_CONTROLS_EXECUTE_TOOLTIP: 'Ejecuta código C/C++. Utilizar con preucación, ya que puede romper fácilmente el programa e impedir su correcta compilación.',
                LANG_CONTROLS_IF_TOOLTIP_1: 'Si la condición es verdadera, ejecuta las acciones dentro del bloque.',
                LANG_CONTROLS_IF_TOOLTIP_2: 'Si la condición es verdadera, se ejecuta el primer bloque de comandos. Si no lo es, se ejecuta el segundo bloque de comandos.',
                LANG_CONTROLS_IF_TOOLTIP_3: 'Si el primer valor es verdadero, se ejecuta el primer bloque de comandos. Sino, si el segundo valor es verdadero, se ejecuta el segundo bloque de comandos.',
                LANG_CONTROLS_IF_TOOLTIP_4: 'Si el primer valor es verdadero, se ejecuta el primer bloque de comandos. Sino, si el segundo valor es verdadero, se ejecuta el segundo bloque de comandos. Si ninguno de los valores es verdadero, se ejecuta el último bloque de comandos',
                LANG_CONTROLS_IF_MSG_IF: 'si',
                LANG_CONTROLS_IF_MSG_ELSEIF: 'en cambio, si',
                LANG_CONTROLS_IF_MSG_ELSE: 'de lo contrario',
                LANG_CONTROLS_IF_MSG_THEN: 'ejecutar',
                LANG_CONTROLS_IF_IF_Field_IF: 'si',
                LANG_CONTROLS_IF_IF_TOOLTIP: 'Añadir, eliminar o reordenar secciones para reconfigurar este bloque "si".',
                LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF: 'en cambio, si',
                LANG_CONTROLS_IF_ELSEIF_TOOLTIP: 'Añade una condición al bloque "si".',
                LANG_CONTROLS_IF_ELSE_Field_ELSE: 'de lo contrario',
                LANG_CONTROLS_IF_ELSE_TOOLTIP: 'Añade una condición final al bloque "si" para capturar el resto de opciones.',
                LANG_CONTROLS_FOR_FROM_WARNING: 'No puedes asignar una variable al valor inicial del for',
                LANG_CONTROLS_FOR_TO_WARNING: 'No puedes asignar una variable al valor final del for',
                LANG_CONTROLS_FOR_INPUT_WITH: 'Contar con',
                LANG_CONTROLS_FOR_INPUT_VAR: 'x',
                LANG_CONTROLS_FOR_INPUT_FROM: 'desde',
                LANG_CONTROLS_FOR_INPUT_TO: 'hasta',
                LANG_CONTROLS_FOR_INPUT_DO: 'ejecutar',
                LANG_CONTROLS_FOR_TOOLTIP: 'Contar desde un número de inicio hasta uno final. Cada vez que se incrementa en uno la cuenta, la variable toma ese valor y se ejecutan las acciones.',
                LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE: 'mientras',
                LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL: 'hasta',
                LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE: 'Mientras la condición sea verdadera, ejecutar las instrucciones.',
                LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL: 'Mientras la condición sea falsa, ejecutar las instrucciones.',
                LANG_CONTROLS_REPEAT_TITLE_REPEAT: 'Repetir',
                LANG_CONTROLS_REPEAT_TITLE_TIMES: 'veces',
                LANG_CONTROLS_REPEAT_INPUT_DO: 'ejecutar',
                LANG_CONTROLS_REPEAT_TOOLTIP: 'Ejecutar las instrucciones un número concreto de veces.',
                LANG_CONTROLS_FLOW_STATEMENTS_HELPURL: '',
                LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP: 'el bucle',
                LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK: 'interrumpir',
                LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE: 'continuar con la siguiente iteración',
                LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK: 'Interrumpir el bucle que contiene esta instrucción.',
                LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE: 'Saltarse el resto de acciones de esta iteración y continuar con la siguiente iteración.',
                LANG_CONTROLS_FLOW_STATEMENTS_WARNING: 'Atención: Este bloque sólo puede ser usado dentro de un bucle.',
                LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE: 'Inicio',
                LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE: 'Repetir',
                LANG_CONTROLS_SETUP_LOOP_TOOLTIP: 'Los bloques en Inicio se ejecutarán una sola vez al arranque, mientras que los bloques en Repetir se ejecutarán de forma repetida.',
                LANG_CONTROLS_SWITCH: 'si ',
                LANG_CONTROLS_SWITCH_TOOLTIP_1: 'Ejecuta las acciones del caso que se cumpla.',
                LANG_CONTROLS_SWITCH_TOOLTIP_2: 'Ejecuta las acciones del caso que se cumpla.',
                LANG_CONTROLS_SWITCH_TOOLTIP_3: 'Ejecuta las acciones del caso que se cumpla.',
                LANG_CONTROLS_SWITCH_TOOLTIP_4: 'Ejecuta las acciones del caso que se cumpla.',
                LANG_CONTROLS_SWITCH_SWITCH_TOOLTIP: 'Este bloque compara de uno en uno si se cumplen los distintos casos.',
                LANG_CONTROLS_SWITCH_CASE_TOOLTIP: 'caso ',
                LANG_CONTROLS_SWITCH_DEFAULT_TOOLTIP: 'El bloque "default" especifica la acción que se va a ejecutar si no se han cumplido ninguno de los casos anteriores.',
                LANG_CONTROLS_SWITCH_IS: 'es: ',
                LANG_CONTROLS_SWITCH_CASE: 'caso ',
                LANG_CONTROLS_SWITCH_COLON: ': ',
                LANG_CONTROLS_SWITCH_DEFAULT: 'en otro caso',
                LANG_CONTROLS_SWITCH_DO: 'ejecutar',
                //math blocks :
                LANG_CATEGORY_MATH: 'Matemáticas',
                LANG_MATH_ADVANCED_MAP_MAP: 'Mapear ',
                LANG_MATH_ADVANCED_MAP_FROM: 'De [',
                LANG_MATH_ADVANCED_MAP_HYPHEN: '-',
                LANG_MATH_ADVANCED_MAP_BRACKET: ']',
                LANG_MATH_ADVANCED_MAP_TO: 'a [',
                LANG_MATH_ADVANCED_MAP_TOOLTIP: 'Mapea la entrada desde un rango de valores iniciales a otro rango distinto.',
                LANG_MATH_NUMBER_TOOLTIP: 'Número entero',
                LANG_MATH_ARRAY_ARRAY3: '[3]',
                LANG_MATH_ARRAY_BRACKET3: '{',
                LANG_MATH_ARRAY_BRACKET4: '}',
                LANG_MATH_ARRAY_COMMA: ',',
                LANG_MATH_ARRAY_TOOLTIP: 'Vector de tres enteros',
                LANG_ARRAY_GET_BRACKET1: '[',
                LANG_ARRAY_GET_BRACKET2: ']',
                LANG_ARRAY_GET_TOOLTIP: 'Devuelve el valor de un elemento concreto del vector.',
                LANG_MATH_MODULO_TOOLTIP: 'Devuelve el resto de la división de las dos entradas.',
                LANG_MATH_BASE_MAP: 'Mapear ',
                LANG_MATH_BASE_MAP_VALUE_TO: 'Valor entre [0-',
                LANG_MATH_BASE_MAP_BRACKET: ']',
                LANG_MATH_BASE_MAP_TOOLTIP: 'Mapea la entrada desde el rango [0-1023] a otro rango de valores.',
                LANG_MATH_SINGLE_OP_ROOT: 'raíz cuadrada',
                LANG_MATH_SINGLE_OP_ABSOLUTE: 'valor absoluto',
                LANG_MATH_SINGLE_TOOLTIP_ROOT: 'Devuelve la raíz cuadrada de un número.',
                LANG_MATH_SINGLE_TOOLTIP_ABS: 'Devuelve el valor absoluto de un número.',
                LANG_MATH_SINGLE_TOOLTIP_NEG: 'Devuelve el número cambiado de signo.',
                LANG_MATH_SINGLE_TOOLTIP_LN: 'Devuelve el logaritmo neperiano de un número.',
                LANG_MATH_SINGLE_TOOLTIP_LOG10: 'Devuelve el logaritmo en base 10 de un número.',
                LANG_MATH_SINGLE_TOOLTIP_EXP: 'Devuelve el exponencial de un número.',
                LANG_MATH_SINGLE_TOOLTIP_POW10: 'Devuelve 10 elevado a una potencia.',
                //text blocks:
                LANG_CATEGORY_TEXT: 'Texto',
                LANG_TEXT_TEXT_HELPURL: '',
                LANG_TEXT_TEXT_TOOLTIP: 'Una letra, una palabra o una línea de texto.',
                LANG_TEXT_JOIN_HELPURL: '',
                LANG_TEXT_JOIN_Field_CREATEWITH: 'crear texto con',
                LANG_TEXT_JOIN_TOOLTIP: 'Crea texto juntando cualquier número de elementos.',
                LANG_TEXT_CREATE_JOIN_Field_JOIN: 'unir',
                LANG_TEXT_CREATE_JOIN_TOOLTIP: 'Añadir, eliminar o reordenar secciones para reconfigurar este bloque de texto.',
                LANG_TEXT_CREATE_JOIN_ITEM_Field_ITEM: 'elemento',
                LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP: 'Añadir un elemento al texto.',
                LANG_TEXT_CREATE_JOIN_TITLE_JOIN: 'unir',
                LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM: 'elemento',
                LANG_TEXT_APPEND_HELPURL: '',
                LANG_TEXT_APPEND_TO: 'a',
                LANG_TEXT_APPEND_APPENDTEXT: 'añadirle texto',
                LANG_TEXT_APPEND_VARIABLE: 'elemento',
                LANG_TEXT_APPEND_TOOLTIP: 'Añadir texto a la variable %1.',
                LANG_TEXT_LENGTH_HELPURL: '',
                LANG_TEXT_LENGTH_INPUT_LENGTH: 'longitud',
                LANG_TEXT_LENGTH_TOOLTIP: 'Devuelve el número de letras (incluyendo los espacios) en el texto introducido.',
                LANG_TEXT_EQUALSIGNORECASE_IS: '',
                LANG_TEXT_EQUALSIGNORECASE_EQUAL: ' =',
                LANG_TEXT_EQUALSIGNORECASE_QUESTION: '',
                LANG_TEXT_EQUALSIGNORECASE_TOOLTIP: 'Compara si los dos textos introducidos son iguales, independientemente de que tengan letras mayúsculas o minúsculas.',
                LANG_TEXT_SUBSTRING: 'Recortar ',
                LANG_TEXT_SUBSTRING_FROM: 'desde',
                LANG_TEXT_SUBSTRING_TO: 'hasta',
                LANG_TEXT_SUBSTRING_TOOLTIP: 'Recorta los caracteres del texto introducido que se encuentren entre los dos índices y crea con ellos un nuevo texto.',
                //advanced blocks :
                LANG_CATEGORY_ADVANCED: 'Arduino',
                LANG_ADVANCED_CONVERSION_CONVERT: 'Convertir',
                LANG_ADVANCED_CONVERSION_DECIMAL: 'Decimal',
                LANG_ADVANCED_CONVERSION_HEXADECIMAL: 'Hexadecimal',
                LANG_ADVANCED_CONVERSION_OCTAL: 'Octal',
                LANG_ADVANCED_CONVERSION_BINARY: 'Binario',
                LANG_ADVANCED_CONVERSION_VALUE: 'valor',
                LANG_ADVANCED_CONVERSION_TOOLTIP: 'Convertir la base de un número.',
                LANG_ADVANCED_INOUT_ANALOG_READ: 'Leer el pin analógico PIN#',
                LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP: 'Lee el valor de un pin analógico específico.',
                LANG_ADVANCED_INOUT_ANALOG_WRITE: 'Escribir en PIN digital',
                LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE: 'el valor analógico',
                LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP: 'Escribe un valor entre 0 y 255 en un PIN analógico específico.',
                LANG_ADVANCED_BUILTIN_LED: 'LED EN LA PLACA',
                LANG_ADVANCED_BUILTIN_LED_STATE: 'estado',
                LANG_ADVANCED_BUILTIN_LED_ON: 'ENCENDIDO',
                LANG_ADVANCED_BUILTIN_LED_OFF: 'APAGADO',
                LANG_ADVANCED_BUILTIN_LED_TOOLTIP: 'LED integrado en la placa que está internamente conectado al PIN 13.',
                LANG_ADVANCED_INOUT_DIGITAL_READ: 'Leer el pin digital PIN#',
                LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP: 'Lee el valor desde un pin digital específico.',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE: 'Escribir en el pin digital',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_GET_VAR: 'el valor',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN: 'PIN#',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE: 'estado',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_HIGH: 'ALTO',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_LOW: 'BAJO',
                LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP: 'Escribe un valor en el pin digital específico.',
                LANG_ADVANCED_HIGHLOW_HIGH: 'ALTO',
                LANG_ADVANCED_HIGHLOW_LOW: 'BAJO',
                LANG_ADVANCED_HIGHLOW_TOOLTIP: 'Escribe "ALTO" o "BAJO" en función de lo seleccionado.',
                LANG_ADVANCED_MATH_RANDOM: 'Aleatorio entre',
                LANG_ADVANCED_MATH_RANDOM_AND: ' y ',
                LANG_ADVANCED_MATH_RANDOM_TOOLTIP: 'Crea un número aleatorio entre los dos límites introducidos.',
                //procedures blocks
                LANG_CATEGORY_PROCEDURES: 'Funciones',
                LANG_PROCEDURES_RETURN: 'devuelve',
                LANG_PROCEDURES_RETURN_TOOLTIP: 'Devuelve un valor',
                LANG_PROCEDURES_CALL_WITHOUT_DEFINITION: 'Llamada a una función sin definición previa.',
                LANG_PROCEDURES_DEFNORETURN_HELPURL: '',
                LANG_PROCEDURES_DEFNORETURN_PROCEDURE: 'func_sin_retorno',
                LANG_PROCEDURES_DEFNORETURN_DO: 'ejecutar',
                LANG_PROCEDURES_DEFNORETURN_TOOLTIP: 'Función que se ejecutará sin devolver nada.',
                LANG_PROCEDURES_DEFRETURN_HELPURL: '',
                LANG_PROCEDURES_DEFRETURN_PROCEDURE: 'func_con_retorno',
                LANG_PROCEDURES_DEFRETURN_DO: 'ejecutar',
                LANG_PROCEDURES_DEFRETURN_RETURN: 'devuelve',
                LANG_PROCEDURES_DEFRETURN_TOOLTIP: 'Función con valor de retorno.',
                LANG_PROCEDURES_DEF_DUPLICATE_WARNING: 'Atención: Esta función tiene parámetros duplicados.',
                LANG_PROCEDURES_CALLNORETURN_HELPURL: '',
                LANG_PROCEDURES_CALLNORETURN_CALL: 'ejecutar',
                LANG_PROCEDURES_CALLNORETURN_PROCEDURE: 'func_sin_retorno',
                LANG_PROCEDURES_CALLNORETURN_TOOLTIP: 'Ejecuta esta función.',
                LANG_PROCEDURES_CALLRETURN_HELPURL: '',
                LANG_PROCEDURES_CALLRETURN_CALL: 'ejecutar',
                LANG_PROCEDURES_CALLRETURN_PROCEDURE: 'func_con_retorno',
                LANG_PROCEDURES_CALLRETURN_TOOLTIP: 'Ejecuta esta función que tiene valor de retorno.',
                LANG_PROCEDURES_MUTATORCONTAINER_Field: 'parámetros',
                LANG_PROCEDURES_MUTATORARG_Field: 'variable:',
                LANG_PROCEDURES_HIGHLIGHT_DEF: 'Subraya la función',
                LANG_PROCEDURES_IFRETURN_TOOLTIP: 'Si la condición es verdadera, la función devolverá este valor.',
                LANG_PROCEDURES_IFRETURN_WARNING: 'Atención: Este bloque sólo puede ser usado dentro de una función que tenga valor de retorno.',
                //variables blocks :
                LANG_CATEGORY_VARIABLES: 'Variables',
                LANG_VARIABLES_CALL_WITHOUT_DEFINITION: 'Esta variable no está declarada.',
                LANG_VARIABLES_GLOBAL: 'Declarar variable GLOBAL',
                LANG_VARIABLES_GLOBAL_TYPE: 'de tipo ',
                LANG_VARIABLES_GLOBAL_EQUALS: '=',
                LANG_VARIABLES_GLOBAL_TOOLTIP: 'Declara y define una variable GLOBAL de tipo entero (int) o texto (String).',
                LANG_VARIABLES_LOCAL: 'Declarar variable',
                LANG_VARIABLES_LOCAL_TYPE: 'de tipo ',
                LANG_VARIABLES_LOCAL_EQUALS: '=',
                LANG_VARIABLES_LOCAL_TOOLTIP: 'Declara y define una variable LOCAL de tipo entero (int) o texto (String).',
                LANG_VARIABLES_DEFINE: 'Definir variable ',
                LANG_VARIABLES_DEFINE_AS: 'como',
                LANG_VARIABLES_DEFINE_TOOLTIP: 'Definir el valor de una variable.',
                LANG_VARIABLES_SET: 'Var',
                LANG_VARIABLES_SET_AS: '=',
                LANG_VARIABLES_SET_TOOLTIP: 'Cambia el valor de una variable.',
                LANG_VARIABLES_GET: 'Var',
                LANG_VARIABLES_GET_TOOLTIP: 'Devuelve el valor de una variable',
                LANG_VARIABLES_PIN_ANALOG: 'Pin analógico',
                LANG_VARIABLES_PIN_DIGITAL: 'Pin digital',
                LANG_VARIABLES_PIN_DIGITAL0: 'CUIDADO: el pin digital 0 (pin Rx) es usado para escribir un programa en la placa desde el ordenador. Usarlo para conectar componentes puede dar problemas al programarla.',
                LANG_VARIABLES_PIN_TOOLTIP: 'Selecciona el PIN deseado.',
                LANG_VARIABLES_TYPE_BYTE: 'Octeto',
                LANG_VARIABLES_TYPE_FLOAT: 'Decimal',
                LANG_VARIABLES_TYPE_INTEGER: 'Entero',
                LANG_VARIABLES_TYPE_INTEGER_LONG: 'Entero largo',
                LANG_VARIABLES_TYPE_STRING: 'Texto',
                //zum blocks :
                LANG_CATEGORY_ZUM: 'Zum bloqs',
                LANG_ZUM_BUTTON: 'Botón',
                LANG_ZUM_BUTTON_PIN: 'PIN#',
                LANG_ZUM_BUTTON_TOOLTIP: 'Botón zum',
                LANG_ZUM_FOLLOWER: 'Sensor infrarrojo',
                LANG_ZUM_FOLLOWER_PIN_LEFT: 'PIN IZQUIERDA#',
                LANG_ZUM_FOLLOWER_PIN_RIGHT: 'PIN DERECHA#',
                LANG_ZUM_FOLLOWER_LEFT: 'Izquierda',
                LANG_ZUM_FOLLOWER_RIGHT: 'Derecha',
                LANG_ZUM_FOLLOWER_TOOLTIP: 'Devuelve el valor digital del sensor infrarrojo zum',
                LANG_ZUM_INFRARED: 'Sensor infrarrojo',
                LANG_ZUM_INFRARED_PIN: 'PIN#',
                LANG_ZUM_INFRARED_TOOLTIP: 'Devuelve el valor digital del sensor infrarrojo zum',
                LANG_ZUM_LED: 'LED',
                LANG_ZUM_LED_PIN: 'PIN#',
                LANG_ZUM_LED_ON: 'ENCENDER',
                LANG_ZUM_LED_OFF: 'APAGAR',
                LANG_ZUM_LED_TOOLTIP: 'LED zum',
                LANG_ZUM_PHOTORESISTOR: 'Sensor de Luz',
                LANG_ZUM_PHOTORESISTOR_PIN: 'PIN#',
                LANG_ZUM_PHOTORESISTOR_TOOLTIP: 'Devuelve el valor analógico del sensor de luz (fotorresistencia).',
                LANG_ZUM_PIEZO_BUZZER: 'Zumbador',
                LANG_ZUM_PIEZO_BUZZER_PIN: 'PIN#',
                LANG_ZUM_PIEZO_BUZZER_TONE: 'TONO',
                LANG_ZUM_PIEZO_BUZZER_DO: 'DO',
                LANG_ZUM_PIEZO_BUZZER_RE: 'RE',
                LANG_ZUM_PIEZO_BUZZER_MI: 'MI',
                LANG_ZUM_PIEZO_BUZZER_FA: 'FA',
                LANG_ZUM_PIEZO_BUZZER_SOL: 'SOL',
                LANG_ZUM_PIEZO_BUZZER_LA: 'LA',
                LANG_ZUM_PIEZO_BUZZER_SI: 'SI',
                LANG_ZUM_PIEZO_BUZZER_DURATION: 'Duración [ms]',
                LANG_ZUM_PIEZO_BUZZER_TOOLTIP: 'Zumbador piezoeléctrico',
                LANG_ZUM_PIEZO_BUZZERAV: 'Zumbador avanzado',
                LANG_ZUM_PIEZO_BUZZERAV_PIN: 'PIN#',
                LANG_ZUM_PIEZO_BUZZERAV_TONE: 'TONO',
                LANG_ZUM_PIEZO_BUZZERAV_DURATION: 'Duración [ms]',
                LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP: 'Zumbador piezoeléctrico avanzado.',
                LANG_ZUM_POTENTIOMETER: 'Potenciómetro',
                LANG_ZUM_POTENTIOMETER_PIN: 'PIN#',
                LANG_ZUM_POTENTIOMETER_TOOLTIP: 'Potenciómetro zum.',
                //servo blocks :
                LANG_CATEGORY_SERVO: 'Servo',
                LANG_SERVO_CONT: 'Servo rotación continua',
                LANG_SERVO_CONT_PIN: 'PIN#',
                LANG_SERVO_CONT_ROT: 'ROT',
                LANG_SERVO_CONT_TURN_CLOCKWISE: 'GIRAR EN SENTIDO HORARIO',
                LANG_SERVO_CONT_TURN_COUNTERCLOCKWISE: 'GIRAR EN SENTIDO ANTIHORARIO',
                LANG_SERVO_CONT_STOPPED: 'DETENER',
                LANG_SERVO_CONT_DELAY: 'Pausa [ms]',
                LANG_SERVO_CONT_TOOLTIP: 'Servo de rotación continua.',
                LANG_SERVO_MOVE: 'Servo',
                LANG_SERVO_MOVE_PIN: 'PIN#',
                LANG_SERVO_MOVE_DEGREES: 'Grados (0~180)',
                LANG_SERVO_MOVE_DELAY: 'Pausa [ms]',
                LANG_SERVO_MOVE_TOOLTIP: 'Mover el servo entre 0 y 180 grados.',
                LANG_SERVO_WARNING: 'No puedes asignar una variable al pin del servo',
                //MODULAR blocks :
                LANG_CATEGORY_MODULAR: 'Modular',
                //BETTO blocks :
                LANG_CATEGORY_BETTO: 'Betto',
                //BETTO blocks :
                LANG_CATEGORY_CARLITTO: 'Carlitto'
            };
            // Node
            if (typeof module !== 'undefined' && module.exports) {
                module.exports = language;
            }
            // Browser
            // if (typeof window !== 'undefined' && this.RoboBlocks && this.RoboBlocks.locales.add) {
            //     this.RoboBlocks.locales.add('es', language);
            if (typeof window !== 'undefined' && RoboBlocks && RoboBlocks.locales.add) {
                RoboBlocks.locales.add('es-ES', language);
            }
        }());

        // Source: src/constants.js
        /* global RoboBlocks, Blockly*/
        RoboBlocks.locales.initialize();
        RoboBlocks.variables = {};
        RoboBlocks.isVariable = function(varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            if (RoboBlocks.variables[varValue] !== undefined) {
                return true;
            }
            if (varValue.search('digitalRead\\(') >= 0 || varValue.search('analogRead\\(') >= 0) {
                return true;
            }
            return false;
        };

        RoboBlocks.findPinMode = function(dropdown_pin) {
            var code = '';
            dropdown_pin = dropdown_pin.split(';\n');
            for (var j in dropdown_pin) {
                if (dropdown_pin[j].search('pinMode') >= 0) {
                    code += dropdown_pin[j] + ';\n';
                } else {
                    dropdown_pin = dropdown_pin[j];
                }
            }
            return {
                'code': code,
                'pin': dropdown_pin
            };
        };

        // help URLs
        RoboBlocks.GITHUB_SRC_URL = 'https://github.com/bq/roboblocks/tree/master/src/';
        RoboBlocks.URL_LED = 'http://diwo.bq.com/programando-un-led-en-bitbloq-i/';
        RoboBlocks.URL_LDR = 'http://diwo.bq.com/el-sensor-de-luz/';
        RoboBlocks.URL_BUTTON = 'http://diwo.bq.com/programando-el-pulsador-en-bitbloq/';
        RoboBlocks.URL_BUZZER = 'http://diwo.bq.com/programando-el-zumbador-en-bitbloq/';
        RoboBlocks.URL_POTENTIOMETER = 'http://diwo.bq.com/programando-un-potenciometro-en-bitbloq/';
        RoboBlocks.URL_IR = 'http://diwo.bq.com/programando-un-sensor-infrarrojo-en-bitbloq/';
        RoboBlocks.URL_CONTINUOUS_ROTATION_SERVO = 'http://diwo.bq.com/programando-un-servo-en-bitbloq/';
        RoboBlocks.URL_SERVO = 'http://diwo.bq.com/programando-un-miniservo-en-bitbloq/';
        RoboBlocks.URL_LCD = 'http://diwo.bq.com/programando-una-pantalla-lcd-en-bitbloq/';
        RoboBlocks.URL_US = 'http://diwo.bq.com/programando-el-sensor-ultrasonido-en-bitbloq/';
        RoboBlocks.URL_BUTTONS = 'http://diwo.bq.com/programando-la-botonera-en-bitbloq/';
        RoboBlocks.URL_JOYSTICK = 'http://diwo.bq.com/programando-un-joystick-con-bitbloq/';
        RoboBlocks.URL_SERIE = 'http://diwo.bq.com/comunicacion-puerto-serie-en-windows-7/';
        RoboBlocks.URL_IF = 'http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-si-ejecutar/';
        RoboBlocks.URL_SWITCH = 'http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-si-switch-case/';
        RoboBlocks.URL_WHILE = 'http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-mientras/';
        RoboBlocks.URL_FOR = 'http://diwo.bq.com/programando-los-bloques-de-control-el-bloque-contar/';
        RoboBlocks.URL_FLOW_STATEMENTS = 'http://diwo.bq.com/programando-los-bloques-de-control-interrumpir/';
        RoboBlocks.URL_LOGIC = 'http://diwo.bq.com/programando-los-bloques-logicos/';
        RoboBlocks.URL_MATH = 'http://diwo.bq.com/programando-los-bloques-matematicos/';
        RoboBlocks.URL_TEXT = 'http://diwo.bq.com/programando-los-bloques-de-texto/';
        RoboBlocks.URL_BT = 'http://diwo.bq.com/ejemplo-en-bitbloq-de-comunicacion-bluetooth/';
        RoboBlocks.URL_VAR = 'http://diwo.bq.com/programando-con-variables-en-bitbloq/';
        RoboBlocks.URL_PROC_NO_RET = 'http://diwo.bq.com/programando-con-funciones-en-bitbloq/';
        RoboBlocks.URL_PROC = 'http://diwo.bq.com/programando-con-funciones-en-bitbloq-2/';
        RoboBlocks.URL_PIN_FUNC = 'http://diwo.bq.com/programando-los-bloques-funciones-pin';

        // RGB block colors
        RoboBlocks.LANG_COLOUR_BQ = '#D04141';
        RoboBlocks.LANG_COLOUR_ZUM = '#CC7B44';
        RoboBlocks.LANG_COLOUR_SERVO = '#CECE42';
        RoboBlocks.LANG_COLOUR_LCD = '#ACCE42';
        RoboBlocks.LANG_COLOUR_CONTROL = '#44CC44';
        RoboBlocks.LANG_COLOUR_LOGIC = '#42CE91';
        RoboBlocks.LANG_COLOUR_MATH = '#42CBCE';
        RoboBlocks.LANG_COLOUR_TEXT = '#42A3CE';
        RoboBlocks.LANG_COLOUR_COMMUNICATION = '#4263CE';
        RoboBlocks.LANG_COLOUR_MODULAR = '#007fff';
        RoboBlocks.LANG_COLOUR_BETTO = '#733B2F';
        RoboBlocks.LANG_COLOUR_CARLITTO = '#D7C017';
        RoboBlocks.LANG_COLOUR_ADVANCED = '#9142CE';
        RoboBlocks.LANG_COLOUR_VARIABLES = '#B244CC';
        RoboBlocks.LANG_COLOUR_PROCEDURES = '#CE42B3';
        RoboBlocks.setColors = function(colorArray) {
            RoboBlocks.LANG_COLOUR_BQ = colorArray[0];
            RoboBlocks.LANG_COLOUR_ZUM = colorArray[1];
            RoboBlocks.LANG_COLOUR_SERVO = colorArray[2];
            RoboBlocks.LANG_COLOUR_LCD = colorArray[3];
            RoboBlocks.LANG_COLOUR_CONTROL = colorArray[4];
            RoboBlocks.LANG_COLOUR_LOGIC = colorArray[5];
            RoboBlocks.LANG_COLOUR_MATH = colorArray[6];
            RoboBlocks.LANG_COLOUR_TEXT = colorArray[7];
            RoboBlocks.LANG_COLOUR_COMMUNICATION = colorArray[8];
            RoboBlocks.LANG_COLOUR_MODULAR = colorArray[9];
            RoboBlocks.LANG_COLOUR_BETTO = colorArray[10];
            RoboBlocks.LANG_COLOUR_CARLITTO = colorArray[11];
            RoboBlocks.LANG_COLOUR_ADVANCED = colorArray[12];
            RoboBlocks.LANG_COLOUR_VARIABLES = colorArray[13];
            RoboBlocks.LANG_COLOUR_PROCEDURES = colorArray[14];
        };
        // Source: src/profiles.js
        /*
         * Arduino Board profiles
         */
        var profiles = {
            arduino: {
                description: 'Standard-compatible board',
                digital: [
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['10', '10'],
                    ['11', '11'],
                    ['12', '12'],
                    ['13', '13']
                ],
                bluetooth: [
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['10', '10'],
                    ['11', '11']
                ],
                pwm: [
                    ['#3', '3'],
                    ['#5', '5'],
                    ['#6', '6'],
                    ['#9', '9'],
                    ['#10', '10'],
                    ['#11', '11']
                ],
                analog: [
                    ['A0', 'A0'],
                    ['A1', 'A1'],
                    ['A2', 'A2'],
                    ['A3', 'A3'],
                    ['A4', 'A4'],
                    ['A5', 'A5']
                ],
                serial: 115200,
            },
            'arduino_mega': {
                description: 'Mega-compatible board',
            },
        };

        // Set default profile to arduino standard-compatible board
        profiles['default'] = profiles.arduino;

        // Source: src/blockly.extensions.js
        /* global Blockly */
        /* jshint sub:true */

        /**
         * Generates toolbox XML with all blocks defined in Blockly.Blocks
         * @return {String} Blockly toolbox XML
         */
        Blockly.createToolbox = function() {

            var blocks = {};

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                    var category = this.Blocks[block].category;
                    blocks[category] = blocks[category] || [];
                    blocks[category].push(block);
                }
            }

            var toolbox = '<xml id="toolbox" style="display: none">';

            var categoryItem = function(type) {
                toolbox += '<block type="' + type + '"></block>';
            };

            for (block in blocks) {

                if (blocks.hasOwnProperty(block)) {
                    toolbox += '<category id="' + block + '" name="' + block + '">';
                    blocks[block].forEach(categoryItem);
                    toolbox += '</category>';
                }

            }
            toolbox += '</xml>';

            return toolbox;
        };

        // Source: tmp/jst.js
        // Source: tmp/jst.js
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

        this["JST"]["bq_test_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (name_mod)) == null ? '' : __t) +
                    '.init();\n';
            }
            return __p
        };

        this["JST"]["bq_test"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ');\n';

            }
            return __p
        };

        this["JST"]["bq_test_definition"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += dropdown_mod + ' ' + name_mod + '(' + dropdown_pin + ');\n';

            }
            return __p
        };

        this["JST"]["bq_test_def_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Modular.h>\n';

            }
            return __p
        };

        this["JST"]["mod_def_declare"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += dropdown_mod + ' ' + name_mod + '(' + dropdown_pin + ');\n';

            }
            return __p
        };

        this["JST"]["test_inout_digital_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (var_mod)) == null ? '' : __t) +
                    '.read()';

            }
            return __p
        };

        this["JST"]["test_inout_digital_write"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (dropdown_pin)) == null ? '' : __t) + '.write(' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["test_inout_digital_write_bool"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (dropdown_pin)) == null ? '' : __t) + '.write(' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';
            }
            return __p
        };

        this["JST"]["test_motor_stepper"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (dropdown_pin)) == null ? '' : __t) + '.write(' +
                    ((__t = (dropdown_num)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["test_motor_servo"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (dropdown_pin)) == null ? '' : __t) + '.write(' +
                    ((__t = (dropdown_num)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["test_motor_dc"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ((__t = (dropdown_pin)) == null ? '' : __t) + '.write(' +
                    ((__t = (dropdown_dir)) == null ? '' : __t) + ',' + ((__t = (dropdown_velo)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        //BETTO
        this["JST"]["betto_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Betto.h>\n';

            }
            return __p
        };

        this["JST"]["mod_def_declare_betto"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Betto betto;\n';
            }
            return __p
        };

        this["JST"]["betto_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'betto.init();\n';
            }
            return __p
        };

        this["JST"]["betto_home"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'betto.home();\n';
            }
            return __p
        };

        this["JST"]["declare_betto_movement"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'betto.' + action + ';\n';
            }
            return __p
        };

        //CARLITTO
        this["JST"]["carlitto_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Carlitto.h>\n';

            }
            return __p
        };

        this["JST"]["mod_def_declare_carlitto"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Carlitto carlitto(' + MOT_LEFT + ',' + POT_LEFT + ',' + MOT_RIGHT + ',' + POT_RIGHT + ',' + POT + ');\n';
            }
            return __p
        };
        

        this["JST"]["carlitto_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'carlitto.init();\n';
            }
            return __p
        };

        this["JST"]["carlitto_stop"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'carlitto.stop();\n';
            }
            return __p
        };

        var JST = this.JST;

        // Source: src/blocks/advanced_conversion/advanced_conversion.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * advanced_conversion code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.advanced_conversion = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = RoboBlocks.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];


            var convertion = this.getFieldValue('CONV');
            code += JST['advanced_conversion']({
                'value_num': value_num,
                'convertion': convertion
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * advanced_conversion block definition
         * @type {Object}
         */
        Blockly.Blocks.advanced_conversion = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            /**
             * advanced_conversion initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_CONVERT'))
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_DECIMAL') || 'DEC', 'DEC'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_HEXADECIMAL') || 'HEX', 'HEX'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_OCTAL') || 'OCT', 'OCT'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_BINARY') || 'BIN', 'BIN']
                    ]), 'CONV');
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_VALUE'))
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .setCheck(Number);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_TOOLTIP'));
            }
        };

        // Source: src/blocks/advanced_map/advanced_map.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * advanced_map code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.advanced_map = function() {
            var num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var from_min = Blockly.Arduino.valueToCode(this, 'FROM_MIN', Blockly.Arduino.ORDER_NONE);
            var from_max = Blockly.Arduino.valueToCode(this, 'FROM_MAX', Blockly.Arduino.ORDER_NONE);
            var to_min = Blockly.Arduino.valueToCode(this, 'TO_MIN', Blockly.Arduino.ORDER_NONE);
            var to_max = Blockly.Arduino.valueToCode(this, 'TO_MAX', Blockly.Arduino.ORDER_NONE);

            var code = '';
            var a = RoboBlocks.findPinMode(num);
            code += a['code'];
            num = a['pin'];

            a = RoboBlocks.findPinMode(from_min);
            code += a['code'];
            from_min = a['pin'];

            a = RoboBlocks.findPinMode(from_max);
            code += a['code'];
            from_max = a['pin'];

            a = RoboBlocks.findPinMode(to_min);
            code += a['code'];
            to_min = a['pin'];

            a = RoboBlocks.findPinMode(to_max);
            code += a['code'];
            to_max = a['pin'];


            code += JST['advanced_map']({
                'num': num,
                'from_min': from_min,
                'from_max': from_max,
                'to_min': to_min,
                'to_max': to_max
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * advanced_map block definition
         * @type {Object}
         */
        Blockly.Blocks.advanced_map = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.URL_MATH,
            /**
             * advanced_map initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_MAP'))
                    .setCheck(Number);
                this.appendValueInput('FROM_MIN', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_FROM'))
                    .setCheck(Number);
                this.appendValueInput('FROM_MAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
                this.appendValueInput('TO_MIN', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_TO'))
                    .setCheck(Number);
                this.appendValueInput('TO_MAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_TOOLTIP'));
            }
        };

        // Source: src/blocks/array_get/array_get.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */
        /**
         * array_get code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.array_get = function() {
            // Numeric value.
            var variable = this.getFieldValue('VAR');
            var index = this.getFieldValue('INDEX');
            var code = variable + '[' + index + ']';
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            // var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        Blockly.Blocks.array_get = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'),
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldVariable(' '), 'VAR');
                // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                this.appendDummyInput('DUMMY2').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET1')).appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.array_get.validator), 'INDEX').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET2'));
                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ARRAY_GET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                this.last_variable = this.getFieldValue('VAR');
                if (!this.last_variables) {
                    this.last_variables = Blockly.Variables.allVariables();
                }
                var variables = Blockly.Variables.allVariables();
                for (var i in variables) {
                    if (Blockly.Variables.allVariables()[i] !== this.last_variables[i]) {
                        try {
                            this.removeInput('DUMMY');
                            this.removeInput('DUMMY2');
                        } catch (e) {}
                        this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                        this.appendDummyInput('DUMMY2').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET1')).appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.array_get.validator), 'INDEX').appendField(RoboBlocks.locales.getKey('LANG_ARRAY_GET_BRACKET2'));
                        this.setFieldValue(this.last_variable, 'VAR');
                        this.last_variables = Blockly.Variables.allVariables();
                    }
                }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                if (this.getFieldValue('VAR')) {
                    for (var i in Blockly.Variables.allVariables()) {
                        if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                            return true;
                        }
                    }
                }
                return false;
            }
        };
        Blockly.Blocks.array_get.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };
        // Source: src/blocks/base_delay/base_delay.js
        /* global Blockly, JST, RoboBlocks */


        // COPIA DE LED PRUEBAS
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_led_2 = function() {

            var sensorTypeMappings = {
                '0': 'analogInput',
                '1': 'analogInput',
                '2': 'digitalInput',
                '3': 'distanceSensor',
                '4': 'digitalOutput',
                '5': 'digitalOutput',
                '6': 'stepperMotor',
                '7': 'display7seg',
                '8': 'servoMotor',
                '9': 'dcMotor',
                '10': 'imuSensor',
                '11': 'displayLcd',
                '12': 'displayOled',
                '13': 'SoftwareSerial', // Modulo Bluetooth
                '14': 'SoftwareSerial'  // Modulo Wifi
            };
            
            
            var sensorType = sensorTypeMappings[this.getFieldValue('MOD')];

            var dropdown_pin = this.getFieldValue('PORT');
            var dropdown_mod = this.getFieldValue('MOD');
            var name_mod = this.getFieldValue('VAR');

            var sensor = sensorTypeMappings[this.getFieldValue('MOD')];

            var code = '';
            Blockly.Arduino.definitions_['define_test_mod'] = JST['bq_test_def_definitions']({});
            Blockly.Arduino.definitions_['declare_var_mod'+dropdown_mod+dropdown_pin] = JST['mod_def_declare']({
                'dropdown_mod': sensor,
                'dropdown_pin': dropdown_pin,
                'name_mod' : name_mod
            });

            dropdown_mod + ' ' + name_mod + '(' + dropdown_pin + ');\n';

            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['bq_test_setups']({
                    'name_mod': name_mod
                });
            } else {
                code += JST['bq_test_setups']({
                    'name_mod' : name_mod
                });
            }

            return code;
        };
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_led_2 = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            tags: ['modular'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/DELCARARMODULAR.png', 30, 30, "*"))
                .appendField('Declarar el modulo')
                .appendField(new Blockly.FieldTextInput('name'), 'VAR')
                .appendField('de tipo')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([
                    ['Sensor Potenciometro', '0'],
                    ['Sensor Infarrojo', '1'],
                    ['Sensor Pulsador', '2'],
                    ['Sensor Distancia', '3'],
                    ['Actuador Led', '4'],
                    ['Actuador Zumbador', '5'],
                    ['Actuador Motor de Pasos', '6'],
                    ['Actuador Display 7 segs', '7'],
                    ['Actuador Servomotor', '8'],
                    ['Actuador Motor DC', '9'],
                    ['Sensor IMU', '10'],
                    ['Actuador LCD', '11'],
                    ['Actuador OLED', '12'],
                    ['Modulo Bluetooth', '13'],
                    ['Modulo Wifi', '14'],
                ]), "MOD")
                .appendField('en el puerto')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['10', '10'],
                ]), "PORT");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('VAR')) {
                    var name = this.getFieldValue('VAR');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'VAR');
                    } catch (e) {}
                    this.last_variable = name;
                }
                
            }
        };

        //Copia de DigitalRead
        // Source: src/blocks/inout_digital_read/inout_digital_read.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_read code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_read = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            var_mod = a['pin'];

            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_read_setups']({
            //         'dropdown_pin': dropdown_pin,
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
            //         'dropdown_pin': dropdown_pin,
            //     });
            // }
            code += JST['test_inout_digital_read']({
                'var_mod': var_mod,
            });
            
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * inout_digital_read block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_read initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/LEERMODULAR.png', 20, 20, "*"))
                    .appendField('Leer el estado de ')
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.setOutput(true);
                this.setOutput(true, Boolean);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
            },

            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };        

        // Copia de digital Write 1 argumento true-false
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_op = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // }
            code += JST['test_inout_digital_write']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_op = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour('#E5BE01');
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en el actuador')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendDummyInput().appendField('el estado').appendField(new Blockly.FieldDropdown([
                    ['Encendido', 'HIGH'],
                    ['Apagado', 'LOW']
                ]), 'STAT');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Copia de digital Write 1 argumento true-false 2
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_bool = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_stat = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            code += JST['test_inout_digital_write_bool']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_bool = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour('#E5BE01');
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en el actuador')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendDummyInput().appendField('el estado');
                this.appendValueInput('BOOL', Boolean)
                    .setCheck(Boolean);
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Copia de digital Write 1 argumento number
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_number = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

            console.log(dropdown_num);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // }
            code += JST['test_motor_stepper']({
                'dropdown_pin': dropdown_pin,
                'dropdown_num': dropdown_num
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_number = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en el motor de pasos')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('NUM')
                    .setCheck(Number)
                    .appendField('el valor');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Copia de digital Write 1 argumento number 4 digitos
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_number_4 = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_stat = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
            console.log(dropdown_stat);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // }
            code += JST['test_inout_digital_write']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_number_4 = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en el display 7 segmentos')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField('Valor (4 digitos):');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };


        // Copia de digital Write 1 argumento number servo
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_number_servo = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // }
            code += JST['test_motor_servo']({
                'dropdown_pin': dropdown_pin,
                'dropdown_num': dropdown_num
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_number_servo = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour('#FF8000');
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en el servo motor')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField('el valor (0 - 180)');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Copia de digital Write 1 argumento number servo
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_number_dc = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
            var dropdown_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // }
            code += JST['test_motor_dc']({
                'dropdown_pin': dropdown_pin,
                'dropdown_velo': dropdown_stat,
                'dropdown_dir': dropdown_num
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_number_dc = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour('#666666');
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en el motor de corriente continua')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('NUM')
                .setCheck(Number)
                .appendField('la potencia');
                this.appendValueInput('STAT')
                    .setCheck(Boolean)
                    .appendField('y la direccion');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Copia de digital Write 1 argumento i2c
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write_i2c = function() {
            var dropdown_pin = this.getFieldValue('VAR');
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            // if (RoboBlocks.isVariable(dropdown_pin)) {
            //     code += JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // } else {
            //     Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
            //         'dropdown_pin': dropdown_pin,
            //         'dropdown_stat': dropdown_stat
            //     });
            // }
            code += JST['test_inout_digital_write']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write_i2c = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"));
                this.appendDummyInput('DUMMY').appendField('Escribir en la pantalla')
                    //.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendDummyInput().appendField('el texto')
                    .appendField(new Blockly.FieldTextInput('', String), 'VAR');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };

        // copia de inout
        // Source: src/blocks/inout_highlow/inout_highlow.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * inout_highlow code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_highlow = function() {
            var bool_value = this.getFieldValue('BOOL');

            var code = JST['inout_highlow']({
                'bool_value': bool_value,
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * inout_highlow block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_highlow = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MODULAR'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_highlow initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/ESCRIBIRMODULAR.png', 20, 20, "*"))
                    .appendField(new Blockly.FieldDropdown([
                        ['ADELANTE', 'HIGH'],
                        ['ATRAS', 'LOW']
                    ]), 'BOOL');
                this.setOutput(true, Boolean);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
            }
        };

        // BETTO BLOQUES
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_def_variables = function() {
            
            var code = '';
            Blockly.Arduino.definitions_['define_betto_mod'] = JST['betto_definitions']({});
            Blockly.Arduino.definitions_['declare_var_mod'] = JST['mod_def_declare_betto']({});
            
            code += JST['betto_setups']({});

            return code;
        };
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_def_variables = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_BETTO);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/otto.jpg', 30, 30, "*"))
                .appendField('Declarar Betto')
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_movs_select = function() {
            var actions = {
                '0': 'walk(1,',
                '1': 'walk(1,',
                '2': 'turn(1,',
                '3': 'turn(1,',
                '4': 'bend(1,',
                '5': 'bend(1,',
                '6': 'shakedLeg(1,',
                '7': 'shakedLeg(1,',
                '8': 'jump(1,',
            };
        
            var actionKey = this.getFieldValue('ACTION');
            var action = actions[actionKey];
            var speed = parseInt(this.getFieldValue('VEL'));
            var speedValue;
        
            switch (speed) {
                case 0:
                    speedValue = '1000';
                    break;
                case 1:
                    speedValue = '2000';
                    break;
                case 2:
                    speedValue = '3000';
                    break;
                case 3:
                    speedValue = '750';
                    break;
                case 4:
                    speedValue = '500';
                    break;
                case 5:
                    speedValue = '250';
                    break;
                default:
                    speedValue = '1000';
            }
        
            var code = 'betto.' + action + speedValue;
        
            // Añadir la dirección al final de la llamada de función
            if (actionKey === '0' || actionKey === '2' || actionKey === '4' || actionKey === '6') {
                code += ',1';
            } else if( actionKey === '8' ) {
                code += '';
            } else {
                code += ',-1';
            }
        
            code += ');\n';
        
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_movs_select = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput('VALUE')
                .appendField('Movimiento ')
                .appendField(new Blockly.FieldDropdown([
                    ['Adelante', '0'],
                    ['Atras', '1'],
                    ['Girar a la izquierda', '2'],
                    ['Girar a la derecha', '3'],
                    ['Inclinar a la izquierda', '4'],
                    ['Inclinar a la derecha', '5'],
                    ['Agitar para la izquierda', '6'],
                    ['Agitar para la derecha', '7'],
                    ['Sube', '8'],
                ]), "ACTION")
                .appendField('con velocidad')
                .appendField(new Blockly.FieldDropdown([
                    ['Normal', '0'],
                    ['Lento', '1'],
                    ['Muy Lento', '2'],
                    ['Rapido', '3'],
                    ['Muy Rapido', '4'],
                    ['Demasiado Rapido', '5']
                ]), "VEL");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_movs_select_dance = function() {
            var actions = {
                '0': 'moonwalker(1,',
                '1': 'moonwalker(1,',
                '2': 'crusaito(1,',
                '3': 'crusaito(1,',
                '4': 'flapping(1,',
                '5': 'flapping(1,',
            };
        
            var actionKey = this.getFieldValue('ACTION');
            var action = actions[actionKey];
            var speed = parseInt(this.getFieldValue('VEL'));
            var speedValue;
            var size = parseInt(this.getFieldValue('SIZE')); // Obtener el tamaño seleccionado
        
            // Determinar el valor de velocidad basado en la selección
            switch (speed) {
                case 0:
                    speedValue = '1000';
                    break;
                case 1:
                    speedValue = '2000';
                    break;
                case 2:
                    speedValue = '3000';
                    break;
                case 3:
                    speedValue = '750';
                    break;
                case 4:
                    speedValue = '500';
                    break;
                case 5:
                    speedValue = '250';
                    break;
                default:
                    speedValue = '1000';
            }
        
            // Determinar el valor de tamaño basado en la selección
            var sizeValue;
            switch (size) {
                case 0:
                    sizeValue = '25';
                    break;
                case 1:
                    sizeValue = '10';
                    break;
                case 2:
                    sizeValue = '40';
                    break;
                default:
                    sizeValue = '25';
            }
        
            var code = 'betto.' + action + speedValue + ',' + sizeValue; // Añadir tamaño al código
        
            // Añadir la dirección al final de la llamada de función
            if (actionKey === '0' || actionKey === '2' || actionKey === '4' || actionKey === '6') {
                code += ',1';
            } else if( actionKey === '8' ) {
                code += '';
            } else {
                code += ',-1';
            }
        
            code += ');\n';
        
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_movs_select_dance = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput('VALUE')
                .appendField('Bailar ')
                .appendField(new Blockly.FieldDropdown([
                    ['Moonwalk Izquierda', '0'],
                    ['Moonwalk Derecha', '1'],
                    ['Crusaito Izquierda', '2'],
                    ['Crusaito Derecha', '3'],
                    ['Aleteo Arriba', '4'],
                    ['Aleteo Abajo', '5'],
                ]), "ACTION")
                .appendField('velocidad')
                .appendField(new Blockly.FieldDropdown([
                    ['Normal', '0'],
                    ['Lento', '1'],
                    ['Muy Lento', '2'],
                    ['Rapido', '3'],
                    ['Muy Rapido', '4'],
                    ['Demasiado Rapido', '5']
                ]), "VEL")
                .appendField('tamaño')
                .appendField(new Blockly.FieldDropdown([
                    ['Normal', '0'],
                    ['Pequeño', '1'],
                    ['Grande', '2']
                ]), "SIZE");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos MOVE
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_movs_select_move = function() {
            var actions = {
                '0': 'swing(1,',
                '1': 'updown(1,',
                '2': 'tiptoeSwing(1,',
                '3': 'jitter(1,',
                '4': 'ascendingTurn(1,'
            };
        
            var actionKey = this.getFieldValue('ACTION');
            var action = actions[actionKey];
            var speed = parseInt(this.getFieldValue('VEL'));
            var speedValue;
            var size = parseInt(this.getFieldValue('SIZE')); // Obtener el tamaño seleccionado
        
            // Determinar el valor de velocidad basado en la selección
            switch (speed) {
                case 0:
                    speedValue = '1000';
                    break;
                case 1:
                    speedValue = '2000';
                    break;
                case 2:
                    speedValue = '3000';
                    break;
                case 3:
                    speedValue = '750';
                    break;
                case 4:
                    speedValue = '500';
                    break;
                case 5:
                    speedValue = '250';
                    break;
                default:
                    speedValue = '1000';
            }
        
            // Determinar el valor de tamaño basado en la selección
            var sizeValue;
            switch (size) {
                case 0:
                    sizeValue = '25';
                    break;
                case 1:
                    sizeValue = '10';
                    break;
                case 2:
                    sizeValue = '40';
                    break;
                default:
                    sizeValue = '25';
            }
        
            var code = 'betto.' + action + speedValue + ',' + sizeValue; // Añadir tamaño al código
        
            code += ');\n';
        
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_movs_select_move = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput('VALUE')
                .appendField('Mover ')
                .appendField(new Blockly.FieldDropdown([
                    ['Meneito', '0'],
                    ['Sube Baja', '1'],
                    ['Puntillas y Meneo', '2'],
                    ['Inquieto', '3'],
                    ['Giro Ascendente', '4']
                ]), "ACTION")
                .appendField('velocidad')
                .appendField(new Blockly.FieldDropdown([
                    ['Normal', '0'],
                    ['Lento', '1'],
                    ['Muy Lento', '2'],
                    ['Rapido', '3'],
                    ['Muy Rapido', '4'],
                    ['Demasiado Rapido', '5']
                ]), "VEL")
                .appendField('tamaño')
                .appendField(new Blockly.FieldDropdown([
                    ['Normal', '0'],
                    ['Pequeño', '1'],
                    ['Grande', '2']
                ]), "SIZE");
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_select_sound = function() {
            var actions = {
                '0': 'S_superHappy',
                '1': 'S_happy',
                '2': 'S_happy_short',
                '3': 'S_sad',
                '4': 'S_confused',
                '5': 'S_cuddly',
                '6': 'S_OhOoh',
                '7': 'S_OhOoh2',
                '8': 'S_surprise',
                '9': 'S_connection',
                '10': 'S_disconnection',
                '11': 'S_buttonPushed',
                '12': 'S_mode1',
                '13': 'S_mode2',
                '14': 'S_mode3',
                '15': 'S_sleeping',
                '16': 'S_fart1',
                '17': 'S_fart2',
                '18': 'S_fart3'
            };
        
            var actionKey = this.getFieldValue('ACTION');
            var action = actions[actionKey];
        
            var code = 'betto.sing(' + action;
        
            code += ');\n';
        
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_select_sound = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput('VALUE')
                .appendField('Mover ')
                .appendField(new Blockly.FieldDropdown([
                    ['Feliz', '0'],
                    ['Alegre', '1'],
                    ['Content@', '2'],
                    ['Triste', '3'],
                    ['Confundid@', '4'],
                    ['Cariños@', '5'],
                    ['Oh', '6'],
                    ['Oohh', '7'],
                    ['Sorpresa', '8'],
                    ['Conexion', '9'],
                    ['Desconexion', '10'],
                    ['Boton', '11'],
                    ['Modo 1', '12'],
                    ['Modo 2', '13'],
                    ['Modo 3', '14'],
                    ['Dormir', '15'],
                    ['Peo 1', '16'],
                    ['Peo 2', '17'],
                    ['Peo 3', '18'],
                ]), "ACTION")
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_select_sound = function() {
            var dropdown_otto_sound = this.getFieldValue('otto_note');
            var dropdown_otto_duration = this.getFieldValue('otto_note_duration');

            var code = 'betto.sing(' + dropdown_otto_sound +','+ dropdown_otto_duration + ',1);\n';
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_select_sound = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput().appendField("🎼")
                    .appendField(new Blockly.FieldDropdown([["C₄ | Do₄", "262"], ["D₄ | Re₄", "294"], ["E₄ | Mi₄", "330"], ["F₄ | Fa₄", "349"], ["G₄ | Sol₄", "392"], ["A₄ | La₄", "440"], ["B₄ | Si₄", "494"], ["C₅ | Do₅", "523"], ["D₅ | Re₅", "587"] ,["E₅ | Mi₅", "659"], ["F₅ | Fa₅", "698"], ["G₅ | Sol₅", "784"], ["A₅ | La₅", "880"], ["B₅ | Si₅", "988"], ["C₆ | Do₆", "1047"], ["D₆ | Re₆", "1175"], ["E₆ | Mi₆", "1319"], ["F₆ | Fa₆", "1397"], ["G₆ | Sol₆", "1568"], ["A₆ | La₆", "1760"], ["B₆ | Si₆", "1976"]]), "otto_note");
                this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(" ")
                    .appendField(new Blockly.FieldDropdown([["\u266B", "125"], ["\u266A", "250"], ["\u2669", "500"], ["𝅗𝅥", "1000"], ["𝅝", "2000"]]), "otto_note_duration");
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour("#FF63BB");
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND 3 campos
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_select_sound_vars = function() {
            var Hz1 = Blockly.Arduino.valueToCode(this, 'Hz1', Blockly.Arduino.ORDER_ATOMIC);
            var duration = Blockly.Arduino.valueToCode(this, 'duration', Blockly.Arduino.ORDER_ATOMIC);
            var silent = Blockly.Arduino.valueToCode(this, 'silent', Blockly.Arduino.ORDER_ATOMIC);
          
            var code = "betto._tone( " + Hz1 + "," + duration + "," + silent + ");\n";
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_select_sound_vars = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput() .appendField("🎼 Hz")
                this.appendValueInput("Hz1")
                this.appendValueInput("duration") .setCheck("Number").appendField("⏰");
                this.appendValueInput("silent") .setCheck("Number").appendField("🔇");
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour("#FF63BB");
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos SOUND 5 campos
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_select_sound_5_vars = function() {
            var Hz1 = Blockly.Arduino.valueToCode(this, 'Hz1', Blockly.Arduino.ORDER_ATOMIC);
            var Hz2 = Blockly.Arduino.valueToCode(this, 'Hz2', Blockly.Arduino.ORDER_ATOMIC);
            var prop = Blockly.Arduino.valueToCode(this, 'prop', Blockly.Arduino.ORDER_ATOMIC);
            var duration = Blockly.Arduino.valueToCode(this, 'duration', Blockly.Arduino.ORDER_ATOMIC);
            var silent = Blockly.Arduino.valueToCode(this, 'silent', Blockly.Arduino.ORDER_ATOMIC);
          
            var code = "betto.bendTones( " + Hz1 + "," + Hz2 + "," + prop + "," + duration + "," + silent + ");\n";
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_select_sound_5_vars = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput() .appendField("🎼 Hz1")
                this.appendValueInput("Hz1")
                this.appendValueInput("Hz2") .appendField("Hz2");
                this.appendValueInput("prop") .setCheck("Number").appendField("P");
                this.appendValueInput("duration") .setCheck("Number").appendField("⏰");
                this.appendValueInput("silent") .setCheck("Number").appendField("🔇");
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour("#FF63BB");
            },
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos Gesto
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_select_gest = function() {
            var dropdown_otto_gesture = this.getFieldValue('otto_gesture');

            var code = 'betto.playGesture(' + dropdown_otto_gesture + ');\n';
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_select_gest = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            tags: ['Betto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MODULAR);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/otto_emoji.png', 22, 22, "*"))
                .appendField("Gesto")
                .appendField(new Blockly.FieldDropdown([
                    ["😃 Feliz", "BettoSuperHappy"],
                    ["🙂 Alegre", "BettoHappy"],
                    ["🙁 Triste", "BettoSad"],
                    ["😴 Durmiendo", "BettoSleeping"],
                    ["😕 Confundid@", "BettoConfused"],
                    [" 😰 Asustad@", "BettoFretful"],
                    ["😍 Enamorad@", "BettoLove"],
                    ["😡 Enfadad@", "BettoAngry"],
                    ["🤩 Magia", "BettoMagic"],
                    ["😐 Ola", "BettoWave"],
                    ["😎 Victoria", "BettoVictory"],
                    ["😞 Fracaso", "BettoFail"],
                    ["💩 Peo", "BettoFart"]
                ]), "otto_gesture");
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour("#4759F5");
            },
        };

        //Matriz 8x8
        Blockly.Arduino.mouth_matrix8x8 = function(block) {
            var code = '';
            for (var i=0; i<64; i++) {
            
            if (this.getFieldValue('Pixel' + i) != 'rgb(255, 255, 255)') {
                var on = this.getFieldValue('Pixel' + i)== "TRUE"? "1" : "0";
                var row= i +1
                {if  (i >= 0 && i <= 7)row=0}{if  (i >= 8 && i < 16)row=1}{if  (i >= 16 && i < 24)row=2}{if  (i >= 24 && i < 32)row=3}
                {if  (i >= 32 && i < 40)row=4}{if  (i >= 40 && i < 48)row=5}{if  (i >= 48 && i < 56)row=6}{if  (i >= 56 && i < 64)row=7}
                var col= i
                {if  (i > 1 && i <= 7)col=i}{if  (i >= 8 && i < 16)col=i-8}{if  (i >= 16 && i < 24)col=i-16}{if  (i >= 24 && i < 32)col=i-24}
                {if  (i >= 32 && i < 40)col=i-32}{if  (i >= 40 && i < 48)col=i-40}{if  (i >= 48 && i < 56)col=i-48}{if  (i >= 56 && i < 64)col=i-56}
                code += ' betto.setLed('+row+','+col+',' + on + ');'
            }
            };
            for (var i=0; i<8; i++) {if (this.getFieldValue('eyes_pixel' + i) == 'TRUE')row = 0;};
            return code+'\n';
        };

        Blockly.Blocks.mouth_matrix8x8 = {  
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            init: function() {
            this.appendDummyInput().appendField('  ').appendField(' 0').appendField(' 1').appendField(' 2').appendField('  3').appendField('  4').appendField(' 5').appendField(' 6').appendField(' 7');
            Blockly.FieldCheckbox.CHECK_CHAR= '🔴';
            this.appendDummyInput().appendField('0 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel0')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel8')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel16')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel24')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel32')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel40')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel48')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel56');
            this.appendDummyInput().appendField('1 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel1')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel9')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel17')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel25')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel33')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel41')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel49')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel57');
            this.appendDummyInput().appendField('2 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel2')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel10')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel18')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel26')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel34')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel42')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel50')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel58');
            this.appendDummyInput().appendField('3 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel3')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel11')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel19')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel27')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel35')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel43')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel51')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel59');
            this.appendDummyInput().appendField('4 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel4')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel12')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel20')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel28')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel36')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel44')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel52')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel60');
            this.appendDummyInput().appendField('5 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel5')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel13')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel21')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel29')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel37')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel45')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel53')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel61');
            this.appendDummyInput().appendField('6 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel6')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel14')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel22')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel30')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel38')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel46')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel54')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel62');
            this.appendDummyInput().appendField('7 ')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel7')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel15')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel23')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel31')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel39')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel47')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel55')
                .appendField(new Blockly.FieldCheckbox("1"), 'Pixel63');
            this.setInputsInline(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#B655F5");
            },
        };

        // Copia de digital Write 1 argumento true-false para BETTO
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.test_inout_digital_write = function() {
            var code = '';
            code += JST['betto_home']({});
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.test_inout_digital_write = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour('#E5BE01');
                this.appendDummyInput('DUMMY').appendField('Posicion parado');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            }
        };

        // Copia de digital Write 1 argumento true-false para BETTO 2
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_clear_mouth = function() {
            var code = '';
            code += 'betto.clearMouth();'
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_clear_mouth = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour('#E5BE01');
                this.appendDummyInput('DUMMY').appendField('Borrar Boca');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            }
        };

        // Mouth
        Blockly.Blocks.betto_mouth_text = {
            
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            init: function() {
                this.appendDummyInput() .appendField('Texto de boca').appendField(new Blockly.FieldTextInput('I AM OTTO'), 'input');
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour("#B655F5");
            }
        };
        Blockly.Arduino.betto_mouth_text = function(block) {
            var text_input = block.getFieldValue('input');
            var code = 'betto.writeText('+ '"' + text_input +'"' +',80);\n';
            return code;
        };

        // Brightness
        Blockly.Blocks.betto_mouth_brightness = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            init: function() {
                this.appendValueInput("brightness")
                    .setCheck(Number)
                    .appendField("👄 Brillo de Boca");
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour("#B655F5");
            }
        };

        Blockly.Arduino.betto_mouth_brightness = function(block) {
            var brightness = Blockly.Arduino.valueToCode(block, "brightness", Blockly.Arduino.ORDER_ATOMIC);
            var code = "betto.matrixIntensity(" + brightness + ");\n";
            return code;
        };

        // Boca
        Blockly.Blocks.betto_mouth_face = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            init: function() {
            this.appendDummyInput()  .appendField("👄 Boca").appendField(new Blockly.FieldDropdown([
                ["😃 Feliz", "happyOpen"], ["🙂 Alegre", "happyClosed"], ["😊 Sonrisa", "smile"], ["😦Triste", "23"], ["🙁 Decaid@","24"], ["😮 Asombrad@","smallSurprise"], ["😲 Sorprendid@","bigSurprise"], ["😕 Confundid@","confused"], ["😛 Lengua","tongueOut"], ["🙃 Tont@ ","culito"], ["😑 Seri@","lineMouth"], ["🙄 Decepcionad@","21"], ["💖 Enamorad@","heart"], ["🦇 Vampiro","vamp1"], ["🦇 Dientes","vamp2"], ["❌ No","xMouth"], ["✅ OK","okMouth"], ["❓ Interrogacion","27"], ["⚡ Trueno","thunder"]
            ]), "otto9_mouth_choice");
            this.setInputsInline(true);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#B655F5");
          }
        };
        Blockly.Arduino.betto_mouth_face = function(block) {
          var dropdown_otto9_mouth_choice = block.getFieldValue('otto9_mouth_choice');
          var code = 'betto.putMouth(' + dropdown_otto9_mouth_choice + ');\n';
          return code;
        };

        // MIC
        Blockly.Blocks.Sound_sensor2 = {
            helpUrl: '',
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            init: function() {
              var card=window.localStorage.card;
              this.setColour("#54BCF7");
              this.appendDummyInput()
                  .appendField(new Blockly.FieldImage("media/sensor_noise.png",33,33))
                  .appendField(Blockly.Msg.SOUND_NAME)
                  .appendField(Blockly.Msg.PIN)
                  .appendField(new Blockly.FieldDropdown([
                    ["A0","A0"],
                    ["A1","A1"],
                    ["A2","A2"],
                    ["A3","A3"],
                    ["A4","A4"],
                    ["A5","A5"],
                    ["A6","A6"],
                    ["A7","A7"]
                  ]), "PIN_SOUND")
              this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["Valor (0-1023)", "1"], ["Porcentaje (0-100%)", "0"]]), "OUTPUT_VALUE");
              this.setOutput(true, 'Number');
              this.setInputsInline(true);
              this.setTooltip('Analog sound sensor.Value');
            }
          };
          
        Blockly.Arduino.Sound_sensor2 = function(block) {
            var PinSound = block.getFieldValue('PIN_SOUND');
            var Status = this.getFieldValue('OUTPUT_VALUE');
              var code;
              var card=window.localStorage.card;
          
                if (card =="MRTnode")
                    Blockly.Arduino.setups_['setup_analogResolutionESP32'] = 'analogReadResolution(10);\n';
            
            
                //Blockly.Arduino.setups_['setup_input_'+PinPotentiometer] = 'pinMode('+PinPotentiometer+', INPUT);';
                if(Status=='0')
                    var code = 'map(analogRead('+PinSound+'),0,1023,0,100)';
                else
                    var code = 'analogRead('+PinSound+')';
          
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        
        // Ultrasonido
        Blockly.Blocks.ultrasonic_distance={
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_BETTO'),
            init:function(){
            this.appendDummyInput()
              .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png",25,15))
            .appendField("#")	.appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
              .appendField("Distancia en cm");
            this.setColour("#54BCF7");
            this.setInputsInline(false);
            this.setOutput(true, "Number");
            }
        };
        Blockly.Arduino.ultrasonic_distance=function(block){
            var code;
            var us_number = this.getFieldValue('US_NUMBER');
        
            code = 'ultrasound_distance_simple()';
            return code;
        };

        // CARLITTO BLOQUES
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.carlitto_def_variables = function() {
            
            var code = '';
            var MOT_LEFT = this.getFieldValue('MOT_LEFT');
            var MOT_RIGHT = this.getFieldValue('MOT_RIGHT');
            var POT_LEFT = this.getFieldValue('POT_LEFT');
            var POT_RIGHT = this.getFieldValue('POT_RIGHT');
            var POT = this.getFieldValue('POT');
            Blockly.Arduino.definitions_['define_carlitto_mod'] = JST['carlitto_definitions']({});
            Blockly.Arduino.definitions_['declare_var_mod_carlitto'] = JST['mod_def_declare_carlitto']({
                'MOT_LEFT': MOT_LEFT,
                'MOT_RIGHT': MOT_RIGHT,
                'POT_LEFT': POT_LEFT,
                'POT_RIGHT': POT_RIGHT,
                'POT': POT
            });
            
            code += JST['carlitto_setups']({});

            return code;
        };
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.carlitto_def_variables = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CARLITTO'),
            tags: ['Carlitto'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CARLITTO);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/DECLARARCARLITO.png', 30, 30, "*"))
                .appendField('Declarar Carlitto')
                .appendField("con motor izquierdo:")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), "MOT_LEFT")
                .appendField('potencia izquierda')
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_dc.validator), 'POT_LEFT')
                .appendField("motor Derecha:")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), "MOT_RIGHT")
                .appendField('potencia derecha')
                .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_dc.validator), 'POT_RIGHT')
                .appendField("potenciómetro:")
                .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]),"POT");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
        };
        
        // Copia de digital Write 1 argumento true-false para BETTO
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.carlitto_stop = function() {
            var code = '';
            code += JST['carlitto_stop']({});
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.carlitto_stop = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CARLITTO'),
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CARLITTO);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/PARARCARLITO.png', 20, 20, "*"))
                .appendField('Detener Carlitto');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
            }
        };

        // COPIA DE LED PRUEBAS para BETTO Movimientos Gesto
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.betto_select_gest = function() {
            var dropdown_carlitto_move = this.getFieldValue('carlitto_move');

            var code = 'carlitto.move(' + dropdown_carlitto_move + ');\n';
            return code;
        };
        
        
        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.betto_select_gest = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CARLITTO'),
            tags: ['Carlitto'],
            helpUrl: '',
            /**
             * bq_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CARLITTO);
                this.appendDummyInput().appendField(new Blockly.FieldImage('media/MOVIMIENTOCARLITO.png', 20, 20, "*"))
                .appendField("Movimiento en ")
                .appendField(new Blockly.FieldDropdown([
                    ["ADELANTE", "ADELANTE"],
                    ["ATRAS", "ATRAS"],
                    ["DERECHA", "DERECHA"],
                    ["IZQUIERDA", "IZQUIERDA"]
                ]), "carlitto_move");
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            },
        };


        // Source: src/blocks/base_map/base_map.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * base_map code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.base_map = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = RoboBlocks.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];

            a = RoboBlocks.findPinMode(value_dmax);
            code += a['code'];
            value_dmax = a['pin'];

            code += JST['base_map']({
                'value_num': value_num,
                'value_dmax': value_dmax
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.base_map = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP'))
                    .setCheck(Number);
                this.appendValueInput('DMAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_VALUE_TO'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_BRACKET'));
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_TOOLTIP'));
            }
        };

        // Source: src/blocks/base_millis/base_millis.js
        /* global Blockly, JST, RoboBlocks */

        //register with blockly arduino
        Blockly.Arduino.base_millis = function() {
            var code = 'millis()';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.base_millis = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_LED,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_MILLIS'));
                this.setOutput(true, 'Number');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_MILLIS_TOOLTIP'));
            }
        };

        // // Source: src/blocks/bq_bat/bq_bat.js
        // /* global Blockly, options, JST, RoboBlocks */
        // /* jshint sub:true */
        // /**
        //  * bq_bat code generation
        //  * @return {String} Code generated with block parameters
        //  */
        // Blockly.Arduino.bq_bat = function() {
        //     var echo_pin = Blockly.Arduino.valueToCode(this, 'RED PIN', Blockly.Arduino.ORDER_ATOMIC);
        //     var trigger_pin = Blockly.Arduino.valueToCode(this, 'BLUE PIN', Blockly.Arduino.ORDER_ATOMIC);
        //     var code = '';
        //     var a = RoboBlocks.findPinMode(echo_pin);
        //     code += a['code'];
        //     echo_pin = a['pin'];

        //     a = RoboBlocks.findPinMode(trigger_pin);
        //     code += a['code'];
        //     trigger_pin = a['pin'];

        //     Blockly.Arduino.definitions_['define_bq_bat_tp_init'] = JST['bq_bat_definitions_tp_init']({});
        //     Blockly.Arduino.definitions_['define_bq_bat_distance'] = JST['bq_bat_definitions_distance']({});
        //     if (RoboBlocks.isVariable(echo_pin)) {
        //         code += JST['bq_bat_setups_echo']({
        //             'echo_pin': echo_pin
        //         });
        //     } else {
        //         Blockly.Arduino.setups_['setup_bq_bat_' + echo_pin + trigger_pin] = JST['bq_bat_setups_echo']({
        //             'echo_pin': echo_pin
        //         });
        //     }
        //     if (RoboBlocks.isVariable(trigger_pin)) {
        //         code += JST['bq_bat_setups_trigger']({
        //             'trigger_pin': trigger_pin
        //         });
        //     } else {
        //         Blockly.Arduino.setups_['setup_bq_bat_2' + trigger_pin + echo_pin] = JST['bq_bat_setups_trigger']({
        //             'trigger_pin': trigger_pin
        //         });
        //     }
        //     code += JST['bq_bat']({
        //         'trigger_pin': trigger_pin,
        //         'echo_pin': echo_pin
        //     });
        //     return [code, Blockly.Arduino.ORDER_ATOMIC];
        // };
        // /**
        //  * bq_bat block definition
        //  * @type {Object}
        //  */
        // Blockly.Blocks.bq_bat = {
        //     category: RoboBlocks.locales.getKey('LANG_CATEGORY_ZUM'),
        //     tags: ['bat'],
        //     helpUrl: RoboBlocks.URL_US,
        //     init: function() {
        //         this.setColour(RoboBlocks.LANG_COLOUR_ZUM);
        //         this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_BQ_BAT')).appendField(new Blockly.FieldImage('img/blocks/bqmod09.png', 208 * options.zoom, 140 * options.zoom));
        //         this.appendValueInput('RED PIN').appendField(RoboBlocks.locales.getKey('LANG_BQ_BAT_RED_PIN')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
        //         this.appendValueInput('BLUE PIN').appendField(RoboBlocks.locales.getKey('LANG_BQ_BAT_BLUE_PIN')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
        //         this.setInputsInline(false);
        //         this.setOutput(true, Number);
        //         this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BAT_TOOLTIP'));
        //     }
        // };
        //register with blockly arduino
        Blockly.Arduino.base_delay = function() {
            var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];

            code += JST['base_delay']({
                'delay_time': delay_time
            });
            return code;
        };

        Blockly.Blocks.base_delay = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_LED,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('DELAY_TIME', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT'))
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_DELAY_TOOLTIP'));
            }
        };
        // Source: src/blocks/bq_bluetooth_def/bq_bluetooth_def.js
        /* global Blockly, options, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * bq_bluetooth_def code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_bluetooth_def = function() {
            var dropdown_pin, NextPIN;
            if (this.getFieldValue('TOGGLE') === 'FALSE') {
                dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
                NextPIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
                var a = RoboBlocks.findPinMode(dropdown_pin);
                Blockly.Arduino.setups_['setup_bluetooth_pinmode'] = a['code'];
                dropdown_pin = a['pin'];
                a = RoboBlocks.findPinMode(NextPIN);
                Blockly.Arduino.setups_['setup_bluetooth_pinmode2'] = a['code'];
                NextPIN = a['pin'];
            } else {
                dropdown_pin = 0;
                NextPIN = 1;
            }
            var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
            var b = RoboBlocks.findPinMode(baud_rate);
            Blockly.Arduino.setups_['setup_bluetooth_pinmode3'] = b['code'];
            baud_rate = b['pin'];

            Blockly.Arduino.definitions_['declare_var_blueToothSerial' + dropdown_pin] = 'SoftwareSerial blueToothSerial(' + dropdown_pin + ',' + NextPIN + ');\n';
            Blockly.Arduino.definitions_['define_softwareserial'] = JST['bq_bluetooth_def_definitions']({
                'dropdown_pin': dropdown_pin,
                'NextPIN': NextPIN
            });
            Blockly.Arduino.setups_['setup_bluetooth_'] = JST['bq_bluetooth_def_setups']({
                'baud_rate': baud_rate,
                'dropdown_pin': dropdown_pin,
                'NextPIN': NextPIN
            });
            return '';
        };
        /**
         * bq_bluetooth__def block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bluetooth_def = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            tags: ['bluetooth'],
            helpUrl: RoboBlocks.URL_BT,
            /**
             * bq_bluetooth_slave initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF')).appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));
                this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
                this.appendDummyInput().appendField('zum?').appendField(new Blockly.FieldCheckbox('FALSE'), 'TOGGLE').setAlign(Blockly.ALIGN_RIGHT);
                this.checkBT();
                this.last_toogle = this.getFieldValue('TOGGLE');
                this.setInputsInline(false);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_TOOLTIP'));
            },
            checkBT: function() {
                if (this.getFieldValue('TOGGLE') === 'FALSE') {
                    try {
                        this.removeInput('PIN');
                        this.removeInput('PIN2');
                    } catch (e) {}
                    this.appendValueInput('PIN').setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_PIN1')).setAlign(Blockly.ALIGN_RIGHT);
                    this.appendValueInput('PIN2').setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_DEF_PIN2')).setAlign(Blockly.ALIGN_RIGHT);
                } else {
                    try {
                        this.removeInput('PIN');
                        this.removeInput('PIN2');
                    } catch (e) {}
                }
            },
            onchange: function() {
                if (this.getFieldValue('TOGGLE') !== this.last_toogle) {
                    this.checkBT();
                    this.last_toogle = this.getFieldValue('TOGGLE');
                }
            }
        };
        // Source: src/blocks/bq_bluetooth_receive/bq_bluetooth_receive.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * bq_bluetooth_slave code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.bq_bluetooth_receive = function() {
            var code = JST['bq_bluetooth_receive']({});
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * bq_bluetooth_slave block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bluetooth_receive = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            tags: ['bluetooth'],
            helpUrl: RoboBlocks.URL_BT,
            /**
             * bq_bluetooth_slave initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_RECEIVE'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));

                this.setInputsInline(false);


                this.setOutput(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_RECEIVE_TOOLTIP'));
            }
        };

        // Source: src/blocks/bq_bluetooth_send/bq_bluetooth_send.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * bq_bluetooth_slave code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.bq_bluetooth_send = function() {
            var statement_send = Blockly.Arduino.valueToCode(this, 'SNT', Blockly.Arduino.ORDER_ATOMIC) || '';

            var code = '';
            var a = RoboBlocks.findPinMode(statement_send);
            code += a['code'];
            statement_send = a['pin'];

            code += JST['bq_bluetooth_send']({
                'statement_send': statement_send
            });

            return code;
        };

        /**
         * bq_bluetooth_send block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bluetooth_send = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            tags: ['bluetooth'],
            helpUrl: RoboBlocks.URL_BT,
            /**
             * bq_bluetooth_send initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_SEND'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));

                this.appendValueInput('SNT')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_SEND_SEND'));

                this.setInputsInline(false);


                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BLUETOOTH_SEND_TOOLTIP'));
            }
        };


        // Source: src/blocks/bt_serial_available/bt_serial_available.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * serial_available code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bt_serial_available = function() {
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');

            var code = JST['bt_serial_available']({
                'branch': branch
            });
            return code;
        };

        /**
         * serial_available block definition
         * @type {Object}
         */
        Blockly.Blocks.bt_serial_available = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_BT,
            tags: ['bluetooth'],
            /**
             * bt_serial_available initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BT_SERIAL_AVAILABLE'));
                this.appendStatementInput('DO')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_BT_SERIAL_AVAILABLE_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_doWhile/controls_doWhile.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * controls_doWhile code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.controls_doWhile = function() {
            // Do while/until loop.
            var argument0 = Blockly.Arduino.valueToCode(this, 'WHILE', Blockly.Arduino.ORDER_NONE) || '';
            argument0 = argument0.replace(/&quot;/g, '"');
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');
            var code = '';
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
                // branch = branch.substring(0, branch.length - 2);
            }
            // branch=branch.replace(/&amp;/g, '');
            if (this.getFieldValue('MODE') === 'UNTIL') {
                if (!argument0.match(/^\w+$/)) {
                    argument0 = '(' + argument0 + ')';
                }
                argument0 = '!' + argument0;
            }
            code += JST['controls_doWhile']({
                'argument0': argument0,
                'branch': branch
            });
            return code;
        };
        Blockly.Blocks.controls_doWhile = {
            // Do/while loop.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            // helpUrl: RoboBlocks.URL_DOWHILE,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO'));
                this.appendValueInput('WHILE').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
                ]), 'MODE');
                // this.appendValueInput('WHILE').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_WHILE'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_execute/controls_execute.js
        /* global Blockly, profiles, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * controls_execute code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_execute = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            content = content.replace(/^"/, '');
            content = content.replace(/"$/g, '');
            if (content.match(/^#include /)) {
                var include_code = JST['controls_execute']({
                    'content': content
                });
                if ('define_include' in Blockly.Arduino.definitions_) {
                    Blockly.Arduino.definitions_['define_include'] += include_code;
                } else {
                    Blockly.Arduino.definitions_['define_include'] = include_code;
                }
            } else {
                code += JST['controls_execute']({
                    'content': content
                });
            }
            return code;
        };
        /**
         * control_execute block definition
         * @type {Object}
         */
        Blockly.Blocks.controls_execute = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            // helpUrl: RoboBlocks.URL_SERIE,
            /**
             * controls_execute initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_EXECUTE'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_EXECUTE_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_flow_statements/controls_flow_statements.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * controls_flow_statements code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_flow_statements = function() {
            // Flow statements: continue, break.
            switch (this.getFieldValue('FLOW')) {
                case 'BREAK':
                    return 'break;\n';
                case 'CONTINUE':
                    return 'continue;\n';
            }
            throw 'Unknown flow statement.';
        };


        Blockly.Blocks.controls_flow_statements = {
            // Flow statements: continue, break.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_FLOW_STATEMENTS,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                var dropdown = new Blockly.FieldDropdown(
                    [
                        [RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK') || 'BREAK', 'BREAK'],
                        [RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE') || 'CONTINUE', 'CONTINUE']
                    ]);
                this.appendDummyInput()
                    .appendField(dropdown, 'FLOW')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP'));
                this.setPreviousStatement(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('FLOW');
                    return Blockly.Blocks.controls_flow_statements.TOOLTIPS[op];
                });
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a control statement?
                var block = this;
                do {
                    if (block.type === 'controls_repeat' ||
                        block.type === 'controls_forEach' ||
                        block.type === 'controls_for' ||
                        block.type === 'controls_whileUntil') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        Blockly.Blocks.controls_flow_statements.TOOLTIPS = {
            BREAK: RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK'),
            CONTINUE: RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE')
        };

        // Source: src/blocks/controls_for/controls_for.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */
        /**
         * controls_for code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_for = function() {
            var variable0 = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
            var argument0 = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }

            var code = '';
            var a = RoboBlocks.findPinMode(variable0);
            code += a['code'];
            variable0 = a['pin'];

            a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            var up = parseFloat(argument0) <= parseFloat(argument1);
            code += 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0 + (up ? '++' : '--') + ') {\n' + branch + '}\n';
            return code;
        };
        Blockly.Blocks.controls_for = {
            // For loop.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_FOR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('VAR').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'));
                // .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('FROM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
                this.appendValueInput('TO').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
                this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    return RoboBlocks.LANG_CONTROLS_FOR_TOOLTIP.replace('%1', thisBlock.getFieldValue('VAR'));
                });
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            onchange: function() {
                try {
                    if (this.isVariable(Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ATOMIC))) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_FROM_WARNING'));
                    } else if (this.isVariable(Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ATOMIC))) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_TO_WARNING'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}


                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //             this.removeInput('FROM');
                //             this.removeInput('TO');
                //             this.removeInput('DO');
                //             this.appendDummyInput('DUMMY')
                //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'))
                //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //             this.appendValueInput('FROM')
                //                 .setCheck(Number)
                //                 .setAlign(Blockly.ALIGN_RIGHT)
                //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
                //             this.appendValueInput('TO')
                //                 .setCheck(Number)
                //                 .setAlign(Blockly.ALIGN_RIGHT)
                //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
                //             this.appendStatementInput('DO')
                //                 .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO'));
                //         }catch(e){}
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                // try {
                //     if (!this.exists()) {
                //         this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                //     } else {
                //         this.setWarningText(null);
                //     }
                // } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            // exists: function() {
            //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', Blockly.Variables.allVariables(), this.getFieldValue('VAR'));
            //     if (this.getFieldValue('VAR') === ' ') {
            //         return false;
            //     }
            //     for (var i in Blockly.Variables.allVariables()) {
            //         if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
            //             console.log('controls_for, variable!', this.getFieldValue('VAR'), Blockly.Variables.allVariables()[i]);
            //             return true;
            //         }
            //     }
            //     return false;
            // }
        };
        // Source: src/blocks/controls_if/controls_if.js
        /* global Blockly, JST,  RoboBlocks */
        /* jshint sub:true */

        /**
         * controls_if code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_if = function() {
            // If/elseif/else condition.
            var n = 0;
            var argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
            argument = argument.replace(/&quot;/g, '"');

            var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);

            var code = '';
            var a = RoboBlocks.findPinMode(argument);
            code += a['code'];
            argument = a['pin'];

            code += JST['controls_if']({
                'argument': argument,
                'branch': branch
            });


            for (n = 1; n <= this.elseifCount_; n++) {
                argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
                branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
                // branch=branch.replace(/&amp;/g, '');

                code += JST['controls_elseif']({
                    'argument': argument,
                    'branch': branch
                });
            }
            if (this.elseCount_) {
                branch = Blockly.Arduino.statementToCode(this, 'ELSE');
                // branch=branch.replace(/&amp;/g, '');

                code += JST['controls_else']({
                    'argument': argument,
                    'branch': branch
                });
            }
            branch = branch.replace(/&quot;/g, '"');
            code = code.replace(/&quot;/g, '"');

            return code + '\n';
        };

        /**
         * controls_if block definition
         * @type {Object}
         */
        Blockly.Blocks.controls_if = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_IF,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('IF0')
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
                this.appendStatementInput('DO0')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                    'controls_if_else'
                ]));
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_1');
                    } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_2');
                    } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_3');
                    } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_4');
                    }
                    return '';
                });
                this.elseifCount_ = 0;
                this.elseCount_ = 0;
            },
            mutationToDom: function() {
                if (!this.elseifCount_ && !this.elseCount_) {
                    return null;
                }
                var container = document.createElement('mutation');
                if (this.elseifCount_) {
                    container.setAttribute('elseif', this.elseifCount_);
                }
                if (this.elseCount_) {
                    container.setAttribute('else', 1);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
                this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
                for (var x = 1; x <= this.elseifCount_; x++) {
                    this.appendValueInput('IF' + x)
                        .setCheck(Boolean)
                        .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSEIF'));
                    this.appendStatementInput('DO' + x)
                        .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
                if (this.elseCount_) {
                    this.appendStatementInput('ELSE')
                        .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSE'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 1; x <= this.elseifCount_; x++) {
                    var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
                    elseifBlock.initSvg();
                    connection.connect(elseifBlock.previousConnection);
                    connection = elseifBlock.nextConnection;
                }
                if (this.elseCount_) {
                    var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
                    elseBlock.initSvg();
                    connection.connect(elseBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect the else input blocks and remove the inputs.
                if (this.elseCount_) {
                    this.removeInput('ELSE');
                }
                this.elseCount_ = 0;
                // Disconnect all the elseif input blocks and remove the inputs.
                for (var x = this.elseifCount_; x > 0; x--) {
                    this.removeInput('IF' + x);
                    this.removeInput('DO' + x);
                }
                this.elseifCount_ = 0;
                // Rebuild the block's optional inputs.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_if_elseif':
                            this.elseifCount_++;
                            var ifInput = this.appendValueInput('IF' + this.elseifCount_)
                                .setCheck(Boolean)
                                .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSEIF'));
                            var doInput = this.appendStatementInput('DO' + this.elseifCount_);
                            doInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.valueConnection_) {
                                ifInput.connection.connect(clauseBlock.valueConnection_);
                            }
                            if (clauseBlock.statementConnection_) {
                                doInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        case 'controls_if_else':
                            this.elseCount_++;
                            var elseInput = this.appendStatementInput('ELSE');
                            elseInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_ELSE'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.statementConnection_) {
                                elseInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 1;
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_if_elseif':
                            var inputIf = this.getInput('IF' + x);
                            var inputDo = this.getInput('DO' + x);
                            clauseBlock.valueConnection_ =
                                inputIf && inputIf.connection.targetConnection;
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            x++;
                            break;
                        case 'controls_if_else':
                            inputDo = this.getInput('ELSE');
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
            }
        };

        Blockly.Blocks.controls_if_if = {
            // If condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_IF_Field_IF'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendStatementInput('STACK');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_IF_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_if_elseif = {
            // Else-If condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_if_else = {
            // Else condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_TOOLTIP'));
                this.contextMenu = false;
            }
        };



        // Source: src/blocks/controls_setupLoop/controls_setupLoop.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * controls_setup code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.controls_setupLoop = function() {
            // Add statements to setup.
            var branch = Blockly.Arduino.statementToCode(this, 'SETUP');
            branch = branch.replace(/&quot;/g, '"');

            Blockly.Arduino.setups_['X_SETUP'] = JST['controls_setupLoop']({
                'branch': branch
            });

            var content = Blockly.Arduino.statementToCode(this, 'LOOP');
            content = content.replace(/&quot;/g, '"');
            content = JST['controls_setupLoop']({
                'branch': content
            });
            return content;
        };
        Blockly.Blocks.controls_setupLoop = {
            // Setup statements.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            // helpUrl: RoboBlocks.URL_SETUP,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendStatementInput('SETUP').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE'));
                this.appendStatementInput('LOOP').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE'));
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_switch/controls_switch.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * controls_switch code generation
         * @return {String} Code generated with block parameters
         */
        var indentSentences = function(sentences) {
            var splitted_sentences = sentences.split('\n');
            var final_sentences = '';
            for (var i in splitted_sentences) {
                final_sentences += '  ' + splitted_sentences[i] + '\n';
            }
            return final_sentences;
        };

        Blockly.Arduino.controls_switch = function() {
            // switch condition.
            var n = 0;
            var argument = Blockly.Arduino.valueToCode(this, 'IF0',
                Blockly.Arduino.ORDER_NONE) || '';
            var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            branch = indentSentences(branch);
            // branch=branch.replace(/&amp;/g, '');

            var code = '';
            var a = RoboBlocks.findPinMode(argument);
            code += a['code'];
            argument = a['pin'];

            code += 'switch (' + argument + ')\n{';
            for (n = 1; n <= this.switchCount_; n++) {
                argument = Blockly.Arduino.valueToCode(this, 'SWITCH' + n, Blockly.Arduino.ORDER_NONE) || '';
                branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
                branch = indentSentences(branch);
                branch = branch.substring(0, branch.length - 1);
                // branch=branch.replace(/&amp;/g, '');

                code += ' \n  case ' + argument + ': \n  {\n' + branch + '  break;\n  }';
            }
            if (this.defaultCount_) {
                branch = Blockly.Arduino.statementToCode(this, 'DEFAULT');
                branch = indentSentences(branch);
                branch = branch.substring(0, branch.length - 1);
                // branch=branch.replace(/&amp;/g, '');

                code += '  \n  default:\n  {\n' + branch + '}';
            }
            return code + '\n}\n';
        };


        Blockly.Blocks.controls_switch = {
            // switch condition.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_SWITCH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('IF0')
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setMutator(new Blockly.Mutator(['controls_switch_case', 'controls_switch_default']));
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    if (!thisBlock.switchCount_ && !thisBlock.defaultCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_1');
                    } else if (!thisBlock.switchCount_ && thisBlock.defaultCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_2');
                    } else if (thisBlock.switchCount_ && !thisBlock.defaultCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_3');
                    } else if (thisBlock.switchCount_ && thisBlock.defaultCount_) {
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_4');
                    }
                    return '';
                });
                this.defaultCount_ = 0;
            },
            mutationToDom: function() {
                if (!this.switchCount_ && !this.defaultCount_) {
                    return null;
                }
                var container = document.createElement('mutation');
                if (this.switchCount_) {
                    container.setAttribute('case', this.switchCount_);
                }
                if (this.defaultCount_) {
                    container.setAttribute('default', 1);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.switchCount_ = window.parseInt(xmlElement.getAttribute('case'), 10);
                this.defaultCount_ = window.parseInt(xmlElement.getAttribute('default'), 10);
                for (var x = 1; x <= this.switchCount_; x++) {
                    this.appendValueInput('SWITCH' + x)
                        .setCheck(Number)
                        .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                    this.setInputsInline(true);
                    this.appendStatementInput('DO' + x)
                        .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
                if (this.defaultCount_) {
                    this.appendStatementInput('DEFAULT')
                        .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'controls_switch_switch');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 1; x <= this.switchCount_; x++) {
                    var switchBlock = Blockly.Block.obtain(workspace, 'controls_switch_case');
                    switchBlock.initSvg();
                    connection.connect(switchBlock.previousConnection);
                    connection = switchBlock.nextConnection;
                }
                if (this.defaultCount_) {
                    var defaultBlock = Blockly.Block.obtain(workspace, 'controls_switch_default');
                    defaultBlock.initSvg();
                    connection.connect(defaultBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect the switch blocks and remove the inputs.
                if (this.defaultCount_) {
                    this.removeInput('DEFAULT');
                }
                this.defaultCount_ = 0;
                // Disconnect all the switch input blocks and remove the inputs.
                for (var x = this.switchCount_; x > 0; x--) {
                    this.removeInput('SWITCH' + x);
                    this.removeInput('DO' + x);
                }
                this.switchCount_ = 0;
                // Rebuild the block's optional inputs.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_switch_case':
                            this.switchCount_++;
                            var case_lang;
                            if (this.switchCount_ === 1) {
                                case_lang = RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_IS');
                            } else {
                                case_lang = RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE');
                            }
                            var switchInput = this.appendValueInput('SWITCH' + this.switchCount_)
                                .setCheck(Number)
                                .appendField(case_lang)
                                .setAlign(Blockly.ALIGN_RIGHT);
                            this.setInputsInline(true);

                            var doInput = this.appendStatementInput('DO' + this.switchCount_);
                            doInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DO'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.valueConnection_) {
                                switchInput.connection.connect(clauseBlock.valueConnection_);
                            }
                            if (clauseBlock.statementConnection_) {
                                doInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        case 'controls_switch_default':
                            this.defaultCount_++;
                            var defaultInput = this.appendStatementInput('DEFAULT');
                            defaultInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.statementConnection_) {
                                defaultInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 1;
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_switch_case':
                            var inputSwitch = this.getInput('SWITCH' + x);
                            var inputDo = this.getInput('DO' + x);
                            clauseBlock.valueConnection_ =
                                inputSwitch && inputSwitch.connection.targetConnection;
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            x++;
                            break;
                        case 'controls_switch_default':
                            inputDo = this.getInput('DEFAULT');
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            }
        };


        Blockly.Blocks.controls_switch_switch = {
            // If condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendStatementInput('STACK');
                this.setTooltip('Switch');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_switch_case = {
            // case condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip('Switch case');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_switch_default = {
            // default condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setTooltip('Switch default');
                this.contextMenu = false;
            }
        };
        // Source: src/blocks/controls_whileUntil/controls_whileUntil.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * controls_whileUntil code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.controls_whileUntil = function() {
            // Do while/until loop.
            var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_NONE) || '';
            argument0 = argument0.replace(/&quot;/g, '"');
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');

            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
                // branch = branch.substring(0, branch.length - 2);
            }
            // branch=branch.replace(/&amp;/g, '');

            if (this.getFieldValue('MODE') === 'UNTIL') {
                if (!argument0.match(/^\w+$/)) {
                    argument0 = '(' + argument0 + ')';
                }
                argument0 = '!' + argument0;
            }
            code += JST['controls_whileUntil']({
                'argument0': argument0,
                'branch': branch
            });
            return code;
        };
        Blockly.Blocks.controls_whileUntil = {
            // Do while/until loop.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: RoboBlocks.URL_WHILE,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('BOOL').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
                ]), 'MODE');
                this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('MODE');
                    return Blockly.Blocks.controls_whileUntil.TOOLTIPS[op];
                });
            }
        };
        Blockly.Blocks.controls_whileUntil.TOOLTIPS = {
            WHILE: RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE'),
            UNTIL: RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL')
        };
        // Source: src/blocks/inout_analog_read/inout_analog_read.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_analog_read code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_analog_read = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';

            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_analog_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_green_analog_read' + dropdown_pin] = JST['inout_analog_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['inout_analog_read']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * inout_analog_read block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_analog_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_analog_read initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ'));
                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_analog_write/inout_analog_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_analog_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_analog_write = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            var b = RoboBlocks.findPinMode(value_num);
            code += b['code'];
            value_num = b['pin'];


            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_analog_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'value_num': value_num
                });
            } else {
                Blockly.Arduino.setups_['setup_analog_write' + dropdown_pin] = JST['inout_analog_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'value_num': value_num
                });
            }

            code += JST['inout_analog_write']({
                'dropdown_pin': dropdown_pin,
                'value_num': value_num
            });
            return code;
        };
        /**
         * inout_analog_write block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_analog_write = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_analog_write initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE'));
                this.appendValueInput('NUM', Number).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE')).setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_builtin_led/inout_builtin_led.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * inout_builtin_led code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.inout_builtin_led = function() {
            var dropdown_stat = this.getFieldValue('STAT');

            Blockly.Arduino.setups_['setup_green_led_13'] = JST['inout_builtin_led_setups']({});

            var code = JST['inout_builtin_led']({
                'dropdown_stat': dropdown_stat
            });

            return code;
        };

        /**
         * inout_builtin_led block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_builtin_led = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_LED,
            /**
             * inout_builtin_led initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED'))
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_STATE'))
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_ON') || 'ON', 'HIGH'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_OFF') || 'OFF', 'LOW']
                    ]), 'STAT');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOOLTIP'));
            }
        };

        // Source: src/blocks/inout_digital_read/inout_digital_read.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_read code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_digital_read = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_digital_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['inout_digital_read']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * inout_digital_read block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_digital_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_read initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ'));
                this.setOutput(true, Boolean);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_digital_write = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['inout_digital_write']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_digital_write = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE')).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN'));
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE')).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_HIGH') || 'HIGH', 'HIGH'],
                    [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_LOW') || 'LOW', 'LOW']
                ]), 'STAT');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_highlow/inout_highlow.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * inout_highlow code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_highlow = function() {
            var bool_value = this.getFieldValue('BOOL');

            var code = JST['inout_highlow']({
                'bool_value': bool_value,
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * inout_highlow block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_highlow = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            /**
             * inout_highlow initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_HIGH') || 'HIGH', 'HIGH'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_LOW') || 'LOW', 'LOW']
                    ]), 'BOOL');
                this.setOutput(true, Boolean);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
            }
        };

        // // Source: src/blocks/lcd_clear/lcd_clear.js

        // /* global Blockly, JST, RoboBlocks */
        // /* jshint sub:true */

        // /**
        //  * lcd_clear code generation
        //  * @return {String} Code generated with block parameters
        //  */

        // Blockly.Arduino.lcd_clear = function() {
        //     var code = JST['lcd_clear']({});
        //     return code;
        // };

        // /**
        //  * lcd_clear block definition
        //  * @type {Object}
        //  */
        // Blockly.Blocks.lcd_clear = {
        //     category: RoboBlocks.locales.getKey('LANG_CATEGORY_LCD'),
        //     tags: ['lcd'],
        //     helpUrl: RoboBlocks.URL_LCD,
        //     /**
        //      * lcd_slave initialization
        //      */
        //     init: function() {
        //         this.setColour(RoboBlocks.LANG_COLOUR_LCD);
        //         this.appendDummyInput()
        //             .appendField(RoboBlocks.locales.getKey('LANG_LCD_CLEAR'));
        //         // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));



        //         this.setInputsInline(false);

        //         this.setPreviousStatement(true, null);
        //         this.setNextStatement(true, null);
        //         this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_CLEAR_TOOLTIP'));
        //     }
        // };

        // // Source: src/blocks/lcd_def/lcd_def.js
        // /* global Blockly, JST, options, RoboBlocks */
        // /* jshint sub:true */
        // /**
        //  * lcd_def code generation
        //  * @return {String} Code generated with block parameters
        //  */
        // Blockly.Arduino.lcd_def = function() {
        //     var lcd_pins = {};
        //     lcd_pins['lcd_1'] = this.getFieldValue('LCD_1');
        //     lcd_pins['lcd_2'] = this.getFieldValue('LCD_2');
        //     lcd_pins['lcd_3'] = this.getFieldValue('LCD_3');
        //     lcd_pins['lcd_4'] = this.getFieldValue('LCD_4');
        //     lcd_pins['lcd_5'] = this.getFieldValue('LCD_5');
        //     lcd_pins['lcd_6'] = this.getFieldValue('LCD_6');
        //     Blockly.Arduino.definitions_['define_lcd'] = JST['lcd_def_definitions']({});
        //     Blockly.Arduino.definitions_['declare_var_LCD'] = JST['lcd_def_declare'](lcd_pins);
        //     Blockly.Arduino.setups_['setup_lcd_'] = JST['lcd_def_setups']({});
        //     return '';
        // };
        // /**
        //  * lcd_def block definition
        //  * @type {Object}
        //  */
        // Blockly.Blocks.lcd_def = {
        //     category: RoboBlocks.locales.getKey('LANG_CATEGORY_LCD'),
        //     tags: ['lcd'],
        //     helpUrl: RoboBlocks.URL_LCD,
        //     /**
        //      * lcd_slave initialization
        //      */
        //     init: function() {
        //         this.setColour(RoboBlocks.LANG_COLOUR_LCD);
        //         this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_LCD_DEF')).appendField(new Blockly.FieldImage('img/blocks/lcd.png', 208 * options.zoom, 100 * options.zoom));
        //         this.appendDummyInput()
        //             .appendField(RoboBlocks.locales.getKey('LANG_LCD_PINS'))
        //             .appendField(new Blockly.FieldTextInput('11'), 'LCD_1')
        //             .appendField(new Blockly.FieldTextInput('12'), 'LCD_2')
        //             .appendField(new Blockly.FieldTextInput('3'), 'LCD_3')
        //             .appendField(new Blockly.FieldTextInput('4'), 'LCD_4')
        //             .appendField(new Blockly.FieldTextInput('5'), 'LCD_5')
        //             .appendField(new Blockly.FieldTextInput('6'), 'LCD_6');
        //         this.setInputsInline(false);
        //         this.setPreviousStatement(true, null);
        //         this.setNextStatement(true, null);
        //         this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_DEF_TOOLTIP'));
        //     }
        // };

        // // Source: src/blocks/lcd_print/lcd_print.js
        // /* global Blockly, JST, RoboBlocks */
        // /* jshint sub:true */
        // /**
        //  * lcd_print code generation
        //  * @return {String} Code generated with block parameters
        //  */
        // Blockly.Arduino.lcd_print = function() {
        //     var val = Blockly.Arduino.valueToCode(this, 'VAL', Blockly.Arduino.ORDER_ATOMIC);
        //     var xcoor = Blockly.Arduino.valueToCode(this, 'XCOOR', Blockly.Arduino.ORDER_ATOMIC);
        //     var ycoor = Blockly.Arduino.valueToCode(this, 'YCOOR', Blockly.Arduino.ORDER_ATOMIC);
        //     var code = '';

        //     var a = RoboBlocks.findPinMode(xcoor);
        //     code += a['code'];
        //     xcoor = a['pin'];

        //     a = RoboBlocks.findPinMode(ycoor);
        //     code += a['code'];
        //     ycoor = a['pin'];

        //     a = RoboBlocks.findPinMode(val);
        //     code += a['code'];
        //     val = a['pin'];

        //     if (this.getFieldValue('POS') === 'TRUE') {
        //         code += JST['lcd_print_pos']({
        //             'val': val,
        //             'xcoor': xcoor,
        //             'ycoor': ycoor
        //         });
        //     } else {
        //         code += JST['lcd_print']({
        //             'val': val
        //         });
        //     }
        //     code = code.replace(/&quot;/g, '"');
        //     return code;
        // };
        // /**
        //  * lcd_print block definition
        //  * @type {Object}
        //  */
        // Blockly.Blocks.lcd_print = {
        //     category: RoboBlocks.locales.getKey('LANG_CATEGORY_LCD'),
        //     tags: ['lcd'],
        //     helpUrl: RoboBlocks.URL_LCD,
        //     /**
        //      * lcd_slave initialization
        //      */
        //     init: function() {
        //         this.setColour(RoboBlocks.LANG_COLOUR_LCD);
        //         this.appendValueInput('VAL').appendField(RoboBlocks.locales.getKey('LANG_LCD_PRINT'));
        //         // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));
        //         this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_LCD_PRINT_POSITION')).appendField(new Blockly.FieldCheckbox('TRUE'), 'POS').setAlign(Blockly.ALIGN_RIGHT);
        //         this.last_pos = this.getFieldValue('POS');
        //         this.getPosition();
        //         this.setInputsInline(false);
        //         this.setPreviousStatement(true, null);
        //         this.setNextStatement(true, null);
        //         this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_PRINT_TOOLTIP'));
        //     },
        //     getPosition: function() {
        //         try {
        //             this.removeInput('XCOOR');
        //             this.removeInput('YCOOR');
        //         } catch (e) {}
        //         if (this.getFieldValue('POS') === 'TRUE') {
        //             this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
        //             this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
        //         }
        //     },
        //     onchange: function() {
        //         if (this.getFieldValue('POS') !== this.last_pos) {
        //             this.getPosition();
        //             this.last_pos = this.getFieldValue('POS');
        //         }
        //     },
        //     mutationToDom: function() {
        //         var container = document.createElement('mutation');
        //         if (this.getFieldValue('POS') === 'TRUE') {
        //             container.setAttribute('fixed', true);
        //         } else if (this.getFieldValue('POS') === 'FALSE') {
        //             container.setAttribute('fixed', false);
        //         }
        //         return container;
        //     },
        //     domToMutation: function(xmlElement) {
        //         this.setFieldValue(xmlElement.getAttribute('fixed'), 'POS');
        //         if (this.getFieldValue('POS') === 'TRUE') {
        //             this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
        //             this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
        //         }
        //     }
        // };

        // // Source: src/blocks/lcd_setBacklight/lcd_setBacklight.js
        // /* global Blockly, JST, RoboBlocks */
        // /* jshint sub:true */

        // /**
        //  * lcd_setBacklight code generation
        //  * @return {String} Code generated with block parameters
        //  */

        // Blockly.Arduino.lcd_setBacklight = function() {
        //     var state = this.getFieldValue('STATE');
        //     var code = JST['lcd_setBacklight']({
        //         'state': state
        //     });
        //     return code;
        // };

        // /**
        //  * lcd_setBacklight block definition
        //  * @type {Object}
        //  */
        // Blockly.Blocks.lcd_setBacklight = {
        //     category: RoboBlocks.locales.getKey('LANG_CATEGORY_LCD'),
        //     helpUrl: RoboBlocks.URL_LCD,
        //     tags: ['lcd'],
        //     /**
        //      * lcd_slave initialization
        //      */
        //     init: function() {
        //         this.setColour(RoboBlocks.LANG_COLOUR_LCD);
        //         this.appendDummyInput()
        //             .appendField(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT'))
        //             .appendField(new Blockly.FieldDropdown([
        //                 ['LOW', 'LOW'],
        //                 ['HIGH', 'HIGH']
        //             ]), 'STATE')
        //             .appendField(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT_CLOSE'));
        //         // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));


        //         this.setInputsInline(false);

        //         this.setPreviousStatement(true, null);
        //         this.setNextStatement(true, null);
        //         this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT_TOOLTIP'));
        //     }
        // };

        // Source: src/blocks/logic_boolean/logic_boolean.js
        /* global Blockly, RoboBlocks */

        /**
         * logic_boolean code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.logic_boolean = function() {
            // Boolean values true and false.
            var code = (this.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.logic_boolean = {
            // Boolean data type: true and false.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.URL_LOGIC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE'), 'TRUE'],
                        [RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_FALSE'), 'FALSE']
                    ]), 'BOOL');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_TOOLTIP'));
            }
        };
        // Source: src/blocks/logic_compare/logic_compare.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * logic_compare code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.logic_compare = function() {
            // Comparison operator.
            var mode = this.getFieldValue('OP');
            var operator = Blockly.Arduino.logic_compare.OPERATORS[mode];
            var order = (operator === '==' || operator === '!=') ?
                Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';

            var code = '';

            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            code += JST['logic_compare']({
                'argument0': argument0,
                'argument1': argument1,
                'operator': operator
            });

            return [code, order];
        };

        Blockly.Arduino.logic_compare.OPERATORS = {
            EQ: '==',
            NEQ: '!=',
            LT: '<',
            LTE: '<=',
            GT: '>',
            GTE: '>='
        };


        Blockly.Blocks.logic_compare = {
            // Comparison operator.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.URL_LOGIC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('A');
                this.appendValueInput('B')
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.logic_compare.TOOLTIPS[op];
                });
            }
        };

        Blockly.Blocks.logic_compare.OPERATORS = [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['<', 'LT'],
            ['\u2264', 'LTE'],
            ['>', 'GT'],
            ['\u2265', 'GTE']
        ];

        Blockly.Blocks.logic_compare.TOOLTIPS = {
            EQ: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_EQ'),
            NEQ: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_NEQ'),
            LT: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LT'),
            LTE: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LTE'),
            GT: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GT'),
            GTE: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GTE')
        };

        // Source: src/blocks/logic_negate/logic_negate.js
        /* global Blockly, JST, RoboBlocks */

        /**
         * logic_negate code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.logic_negate = function() {
            // Negation.
            var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
            var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || 'false';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += JST['logic_negate']({
                'argument0': argument0
            });

            //'!' + argument0;
            return [code, order];
        };


        Blockly.Blocks.logic_negate = {
            // Negation.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.URL_LOGIC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('BOOL')
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_INPUT_NOT'));
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_TOOLTIP'));
            }
        };

        // Source: src/blocks/logic_operation/logic_operation.js
        /* global Blockly, RoboBlocks */
        /**
         * logic_operation code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.logic_operation = function() {
            // Operations 'and', 'or'.
            var operator = (this.getFieldValue('OP') === 'AND') ? '&&' : '||';
            var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : Blockly.Arduino.ORDER_LOGICAL_OR;
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
            // var code = JST['logic_operation']({
            //     'operator': operator,
            //     'argument0': argument0,
            //     'argument1': argument1
            // });
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];
            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            code += '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';
            return [code, order];
        };
        Blockly.Blocks.logic_operation = {
            // Logical operations: 'and', 'or'.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.URL_LOGIC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('A').setCheck(Boolean);
                this.appendValueInput('B').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_AND') || 'AND', 'AND'],
                    [RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_OR') || 'OR', 'OR']
                ]), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.logic_operation.TOOLTIPS[op];
                });
            }
        };
        Blockly.Blocks.logic_operation.TOOLTIPS = {
            AND: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_AND'),
            OR: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_OR')
        };
        // Source: src/blocks/math_arithmetic/math_arithmetic.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_arithmetic code generation
         * @return {String} Code generated with block parameters
         */


        Blockly.Arduino.math_arithmetic = function() {
            // Basic arithmetic operators, and power.
            var mode = this.getFieldValue('OP');
            var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
            var operator = tuple[0];
            var order = tuple[1];
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];
            if (!operator) {
                code = JST['math_arithmetic_pow']({
                    'argument0': argument0,
                    'argument1': argument1
                });
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }
            code += JST['math_arithmetic']({
                'argument0': argument0,
                'argument1': argument1,
                'operator': operator
            });
            return [code, order];
        };

        Blockly.Arduino.math_arithmetic.OPERATORS = {
            ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
            MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
            MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
            DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
            POWER: [null, Blockly.Arduino.ORDER_NONE]
        };




        Blockly.Blocks.math_arithmetic = {
            // Basic arithmetic operator.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('A')
                    .setCheck(Number);
                this.appendValueInput('B')
                    .setCheck(Number)
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var mode = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.math_arithmetic.TOOLTIPS[mode];
                });
            }
        };

        Blockly.Blocks.math_arithmetic.OPERATORS = [
            ['+', 'ADD'],
            ['-', 'MINUS'],
            ['\u00D7', 'MULTIPLY'],
            ['\u00F7', 'DIVIDE'],
            ['^', 'POWER']
        ];

        Blockly.Blocks.math_arithmetic.TOOLTIPS = {
            ADD: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_ADD'),
            MINUS: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MINUS'),
            MULTIPLY: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY'),
            DIVIDE: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE'),
            POWER: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_POWER')
        };

        // Source: src/blocks/math_array/math_array.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_array code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_array = function() {
            // Numeric value.
            var code = '{';
            code += window.parseFloat(this.getFieldValue('NUM0'));
            code += ',';
            code += window.parseFloat(this.getFieldValue('NUM1'));
            code += ',';
            code += window.parseFloat(this.getFieldValue('NUM2'));
            code += '}';

            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            // var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_array = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_ARRAY3'))
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_BRACKET3'))
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM0')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_COMMA'));


                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM1')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_COMMA'));

                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM2')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_BRACKET4'));

                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_ARRAY_TOOLTIP'));
            }
        };


        Blockly.Blocks.math_array.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };
        // Source: src/blocks/math_modulo/math_modulo.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_modulo code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_modulo = function() {
            // Remainder computation.
            var argument0 = Blockly.Arduino.valueToCode(this, 'DIVIDEND',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'DIVISOR',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];
            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];
            code += JST['math_modulo']({
                'argument0': argument0,
                'argument1': argument1
            });

            //argument0 + ' % ' + argument1;
            return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
        };

        Blockly.Blocks.math_modulo = {
            // Remainder of a division.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('DIVIDEND')
                    .setCheck(Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_MODULO_INPUT_DIVIDEND'));
                this.appendValueInput('DIVISOR')
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('%');
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_MODULO_TOOLTIP'));
            }
        };

        // Source: src/blocks/math_number/math_number.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_number code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_number = function() {
            // Numeric value.
            var code = window.parseFloat(this.getFieldValue('NUM'));
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, order];
        };

        Blockly.Blocks.math_number = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM');
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_number.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };

        // copia de math number
        // Source: src/blocks/math_number/math_number.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_number code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_integer = function() {
            // Numeric value.
            var code = window.parseFloat(this.getFieldValue('NUM'));
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, order];
        };

        Blockly.Blocks.math_integer = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer.validator), 'NUM');
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_integer.validator = function(text) {
            // Ensure that only a valid integer with up to 4 digits may be entered.
            var n = window.parseInt(text || 0, 10);
            
            // Check if it's a valid integer with up to 4 digits.
            if (Number.isInteger(n) && n >= 0 && n <= 9999) {
                return String(n);
            } else {
                return null;
            }
        };

        // copia de math number
        // Source: src/blocks/math_number/math_number.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_number code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_integer_servo = function() {
            // Numeric value.
            var code = window.parseFloat(this.getFieldValue('NUM'));
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, order];
        };

        Blockly.Blocks.math_integer_servo = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_servo.validator), 'NUM');
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_integer_servo.validator = function(text) {
            // Ensure that only a valid integer with up to 4 digits may be entered.
            var n = window.parseInt(text || 0, 10);
            
            // Check if it's a valid integer with up to 4 digits.
            if (Number.isInteger(n) && n >= 0 && n <= 180) {
                return String(n);
            } else {
                return null;
            }
        };

        // copia de math number
        // Source: src/blocks/math_number/math_number.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_number code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_integer_dc = function() {
            // Numeric value.
            var code = window.parseFloat(this.getFieldValue('NUM'));
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, order];
        };

        Blockly.Blocks.math_integer_dc = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_integer_dc.validator), 'NUM');
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_integer_dc.validator = function(text) {
            // Ensure that only a valid integer with up to 4 digits may be entered.
            var n = window.parseInt(text || 0, 10);
            
            // Check if it's a valid integer with up to 4 digits.
            if (Number.isInteger(n) && n >= 0 && n <= 255) {
                return String(n);
            } else {
                return null;
            }
        };
        // Blockly.Blocks.math_servo.validator = function(text) {
        //     // Ensure that only a valid integer within the range [0, 180] may be entered.
        //     var n = window.parseInt(text || 0, 10);
            
        //     // Check if it's a valid integer within the range [0, 180].
        //     if (Number.isInteger(n) && n >= 0 && n <= 180) {
        //         return String(n);
        //     } else {
        //         return null;
        //     }
        // };
        
        

        // Source: src/blocks/math_random/math_random.js
        /* global Blockly, JST, RoboBlocks */

        /**
         * math_random code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.math_random = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];

            a = RoboBlocks.findPinMode(value_dmax);
            code += a['code'];
            value_dmax = a['pin'];

            code += JST['math_random']({
                'value_num': value_num,
                'value_dmax': value_dmax
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_random = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM'))
                    .setCheck(Number);
                this.appendValueInput('DMAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND'))
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM_TOOLTIP'));
            }
        };

        // Source: src/blocks/math_single/math_single.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */

        /**
         * math_single code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_single = function() {
            // Math operators with single operand.
            var operator = this.getFieldValue('OP');
            var arg;
            var code = '';
            var a;

            if (operator === 'NEG') {
                // Negation is a special case given its different operator precedents.
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
                if (arg[0] === '-') {
                    // --3 is not legal in Dart.
                    arg = ' ' + arg;
                }
                code += '-' + arg;
                return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
            } else if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
            } else if (operator === 'LOG10') {
                code = '';
            } else {
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
            }
            var PI = 3.14159;
            // First, handle cases which generate values that don't need parentheses.
            switch (operator) {
                case 'ABS':
                    code += 'abs(' + arg + ')';
                    break;
                case 'ROOT':
                    code += 'sqrt(' + arg + ')';
                    break;
                case 'LN':
                    code += 'log(' + arg + ')';
                    break;
                case 'EXP':
                    code += 'exp(' + arg + ')';
                    break;
                case 'POW10':
                    code += 'pow(10,' + arg + ')';
                    break;
                case 'SIN':
                    code += 'sin(' + arg + ' / 180 * ' + PI + ')';
                    break;
                case 'COS':
                    code += 'cos(' + arg + ' / 180 * ' + PI + ')';
                    break;
                case 'TAN':
                    code += 'tan(' + arg + ' / 180 * ' + PI + ')';
                    break;
            }
            if (code) {
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }

            // Second, handle cases which generate values that may need parentheses.
            switch (operator) {
                case 'LOG10':
                    arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                    a = RoboBlocks.findPinMode(arg);
                    code += a['code'];
                    arg = a['pin'];
                    code += 'log(' + arg + ') / log(10)';
                    break;
                case 'ASIN':
                    code += 'asin(' + arg + ') / ' + PI + ' * 180';
                    break;
                case 'ACOS':
                    code += 'acos(' + arg + ') / ' + PI + ' * 180';
                    break;
                case 'ATAN':
                    code += 'atan(' + arg + ') / ' + PI + ' * 180';
                    break;
                default:
                    throw 'Unknown math operator: ' + operator;
            }
            return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
        };


        Blockly.Blocks.math_single = {
            // Advanced math operators with single operand.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.URL_MATH,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('NUM')
                    .setCheck(Number)
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_MATH_SINGLE_OP_ROOT') || 'SQR ROOT', 'ROOT'],
                        [RoboBlocks.locales.getKey('LANG_MATH_SINGLE_OP_ABSOLUTE') || 'ABS', 'ABS'],
                        ['-', 'NEG'],
                        ['ln', 'LN'],
                        ['log10', 'LOG10'],
                        ['e^', 'EXP'],
                        ['10^', 'POW10']
                    ]), 'OP');
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var mode = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.math_single.TOOLTIPS[mode];
                });
            }
        };

        Blockly.Blocks.math_single.TOOLTIPS = {
            ROOT: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ROOT'),
            ABS: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ABS'),
            NEG: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_NEG'),
            LN: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LN'),
            LOG10: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LOG10'),
            EXP: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_EXP'),
            POW10: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_POW10')
        };

        // Source: src/blocks/pin_analog/pin_analog.js
        /* global Blockly, profiles, RoboBlocks */

        /**
         * pin code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.pin_analog = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_analog = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_ANALOG'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.analog), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            }
        };

        // Source: src/blocks/pin_digital/pin_digital.js
        /* global Blockly, profiles, RoboBlocks */

        /**
         * pin code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.pin_digital = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_digital = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: RoboBlocks.URL_PIN_FUNC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_DIGITAL'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.digital), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PIN') === '0') {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_DIGITAL0'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            }
        };

        // Source: src/blocks/procedures_callnoreturn/procedures_callnoreturn.js
        /* global Blockly, JST, RoboBlocks */
        /**
         * procedures_callnoreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_callnoreturn = function() {
            // Call a procedure with a return value.
            var funcName = this.getFieldValue('PROCEDURES');
            var args = [];
            var code = '';
            var a;
            try {
                for (var x = 0; x < this.getVariables(funcName).length; x++) {
                    args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || '';
                    a = RoboBlocks.findPinMode(args[x]);
                    code += a['code'];
                    args[x] = a['pin'];
                }
            } catch (e) {}
            var funcArgs = args.join(', ');
            code += JST['procedures_callnoreturn']({
                'funcName': funcName,
                'funcArgs': funcArgs
            });
            return code;
        };
        Blockly.Blocks.procedures_callnoreturn = {
            // Variable getter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_PROC_NO_RET,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALLNORETURN_TOOLTIP'));
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.quarkConnections_ = null;
                this.quarkArguments_ = null;
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                }
                return name;
            },
            getProcedures: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        var proc_name = procedures[0][i][0];
                        proc_name = this.validName(proc_name);
                        procedures_dropdown.push([proc_name, proc_name]);
                    }
                } else {
                    procedures_dropdown.push([RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')]);
                }
                return procedures_dropdown;
            },
            maxVariableNumber: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                var max_num = 0;
                if (procedures[0].length > 0 || procedures[1].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                            max_num = procedures[0][i][1].length;
                        }
                    }
                    return max_num;
                } else {
                    procedures_dropdown.push(['', '']);
                }
            },
            getVariables: function(funcName) {
                try {
                    var procedures = Blockly.Procedures.allProcedures();
                    var procedures_dropdown = [];
                    if (procedures[0].length > 0) {
                        for (var i in procedures[0]) {
                            if (procedures[0][i][0] === funcName) {
                                return procedures[0][i][1];
                            }
                        }
                    } else {
                        procedures_dropdown.push(['', '']);
                    }
                } catch (e) {}
            },
            exists: function() {
                var procedures = Blockly.Procedures.allProcedures();
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][0] === this.getFieldValue('PROCEDURES')) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                    this.changeVariables();
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                    this.addVariables();
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                }
                if (!this.exists()) {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            },
            addVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                var var_num = 0;
                if (func_variables) {
                    if (!this.last_variables) {
                        this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    }
                    if (func_variables.length >= this.last_variables.length) {
                        var_num = func_variables.length;
                    } else if (this.last_variables) {
                        try {
                            var_num = this.last_variables.length;
                        } catch (e) {}
                    }
                    for (var x = 0; x < var_num; x++) {
                        if (this.getInput('ARG' + x) === null) {
                            this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                        } else {
                            if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                                this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                            } else {
                                this.removeInput('ARG' + x);
                            }
                        }
                    }
                    this.arguments_ = func_variables;
                }
            },
            renameProcedure: function(oldName, newName) {
                if (this.last_procedure) {
                    var procedures = this.getProcedures();
                    for (var i in procedures) {
                        if (Blockly.Names.equals(oldName, procedures[i][0])) {
                            this.removeInput('DUMMY');
                            this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                        }
                    }
                    if (this.last_procedure === oldName) {
                        this.last_procedure = newName;
                    }
                    try {
                        this.setFieldValue(this.last_procedure, 'PROCEDURES');
                    } catch (e) {}
                }
            },
            changeVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
                for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                    if (this.getInput('ARG' + i) === null) {
                        break;
                    }
                    this.removeInput('ARG' + i);
                }
                for (var variable in func_variables) {
                    this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
                }
                this.arguments_ = func_variables;
            },
            mutationToDom: function() {
                // Save the name and arguments (none of which are editable).
                var container = document.createElement('mutation');
                container.setAttribute('name', this.getFieldValue('PROCEDURES'));
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = [];
                }
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.xmlElement = xmlElement;
                // Restore the name and parameters.
                var name = xmlElement.getAttribute('name');
                this.last_procedure = name;
                this.setFieldValue(name, 'PROCEDURES');
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/procedures_callreturn/procedures_callreturn.js
        /* global Blockly, JST, RoboBlocks */
        /**
         * procedures_callreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_callreturn = function() {
            // Call a procedure with a return value.
            var funcName = this.getFieldValue('PROCEDURES');
            var args = [];
            var a;
            var code = '';
            for (var x = 0; x < this.getVariables(funcName).length; x++) {
                args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'null';

                a = RoboBlocks.findPinMode(args[x]);
                code += a['code'];
                args[x] = a['pin'];
            }
            var funcArgs = args.join(', ');
            code += JST['procedures_callreturn']({
                'funcName': funcName,
                'funcArgs': funcArgs
            });
            //funcName + '(' + args.join(', ') + ')';
            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        };
        Blockly.Blocks.procedures_callreturn = {
            // Variable getter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_PROC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALLRETURN_TOOLTIP'));
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.quarkConnections_ = null;
                this.quarkArguments_ = null;
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            getProcedures: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        var proc_name = procedures[1][i][0];
                        proc_name = this.validName(proc_name);
                        procedures_dropdown.push([proc_name, proc_name]);
                    }
                } else {
                    procedures_dropdown.push([RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')]);
                }
                return procedures_dropdown;
            },
            maxVariableNumber: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                var max_num = 0;
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                            max_num = procedures[1][i][1].length;
                        }
                    }
                    return max_num;
                } else {
                    procedures_dropdown.push(['', '']);
                }
            },
            getVariables: function(funcName) {
                try {
                    var procedures = Blockly.Procedures.allProcedures();
                    var procedures_dropdown = [];
                    if (procedures[1].length > 0) {
                        for (var i in procedures[1]) {
                            if (procedures[1][i][0] === funcName) {
                                return procedures[1][i][1];
                            }
                        }
                    } else {
                        procedures_dropdown.push(['', '']);
                    }
                } catch (e) {}
            },
            exists: function() {
                var procedures = Blockly.Procedures.allProcedures();
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][0] === this.getFieldValue('PROCEDURES')) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                    this.changeVariables();
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                    this.addVariables();
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                }
                if (!this.exists()) {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            },
            addVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                var var_num = 0;
                if (func_variables) {
                    if (!this.last_variables) {
                        this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    }
                    if (func_variables.length >= this.last_variables.length) {
                        var_num = func_variables.length;
                    } else if (this.last_variables) {
                        try {
                            var_num = this.last_variables.length;
                        } catch (e) {}
                    }
                    for (var x = 0; x < var_num; x++) {
                        if (this.getInput('ARG' + x) === null) {
                            this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                        } else {
                            if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                                this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                            } else {
                                this.removeInput('ARG' + x);
                            }
                        }
                    }
                    this.arguments_ = func_variables;
                }
            },
            renameProcedure: function(oldName, newName) {
                if (this.last_procedure) {
                    var procedures = this.getProcedures();
                    for (var i in procedures) {
                        if (Blockly.Names.equals(oldName, procedures[i][0])) {
                            this.removeInput('DUMMY');
                            this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                        }
                    }
                    if (this.last_procedure === oldName) {
                        this.last_procedure = newName;
                    }
                    try {
                        this.setFieldValue(this.last_procedure, 'PROCEDURES');
                    } catch (e) {}
                }
            },
            changeVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
                for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                    if (this.getInput('ARG' + i) === null) {
                        break;
                    }
                    this.removeInput('ARG' + i);
                }
                for (var variable in func_variables) {
                    this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
                }
                this.arguments_ = func_variables;
            },
            mutationToDom: function() {
                // Save the name and arguments (none of which are editable).
                var container = document.createElement('mutation');
                container.setAttribute('name', this.getFieldValue('PROCEDURES'));
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = [];
                }
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.xmlElement = xmlElement;
                // Restore the name and parameters.
                var name = xmlElement.getAttribute('name');
                this.last_procedure = name;
                this.setFieldValue(name, 'PROCEDURES');
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/procedures_defnoreturn/procedures_defnoreturn.js
        /* global Blockly, JST, RoboBlocks */
        /**
         * procedures_defnoreturn code generation
         * @return {String} Code generated with block parameters
         */
        // Defining a procedure without a return value uses the same generator as
        // a procedure with a return value.
        Blockly.Arduino.procedures_defnoreturn = function() {
            // Define a procedure with a return value.
            var funcName = this.getFieldValue('NAME');
            var branch = Blockly.Arduino.statementToCode(this, 'STACK');
            branch = branch.replace(/&quot;/g, '"');
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }
            // branch=branch.replace(/&amp;/g, '');

            var returnType = 'void';
            var args = this.paramString;
            var code = JST['procedures_defnoreturn']({
                'returnType': returnType,
                'funcName': funcName,
                'args': args,
                'branch': branch
            });
            // code=code.replace(/&amp;/g, '');

            code = Blockly.Arduino.scrub_(this, code);
            Blockly.Arduino.definitions_[funcName] = code;
            return null;
        };
        Blockly.Blocks.procedures_defnoreturn = {
            // Define a procedure with no return value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: RoboBlocks.URL_PROC_NO_RET,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                var name = Blockly.Procedures.findLegalName(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), this);
                this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
                // this.appendDummyInput().appendField(new Blockly.FieldTextInput(name), 'NAME').appendField('', 'PARAMS');
                this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_DO'));
                this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_TOOLTIP'));
                this.arguments_ = [];
                this.type_arguments_ = [];
            },
            updateParams_: function() {
                // Check for duplicated arguments.
                var badArg = false;
                var hash = {};
                for (var x = 0; x < this.arguments_.length; x++) {
                    if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
                        badArg = true;
                        break;
                    }
                    hash['arg_' + this.arguments_[x].toLowerCase()] = true;
                }
                if (badArg) {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEF_DUPLICATE_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                } else {
                    this.setWarningText(null);
                }
                // Merge the arguments into a human-readable list.
                var params = [];
                for (var i in this.arguments_) {
                    params.push(this.type_arguments_[i] + ' ' + this.arguments_[i]);
                }
                this.paramString = params.join(', ');
                this.setFieldValue(this.paramString, 'PARAMS');
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg_name');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                    parameter = document.createElement('arg_type');
                    parameter.setAttribute('name', this.type_arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.arguments_ = [];
                this.type_arguments_ = [];
                var childNode;
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    childNode = xmlElement.childNodes[x];
                    if (childNode.nodeName.toLowerCase() === 'arg_name') {
                        this.arguments_.push(childNode.getAttribute('name'));
                    }
                    if (childNode.nodeName.toLowerCase() === 'arg_type') {
                        this.type_arguments_.push(childNode.getAttribute('name'));
                    }
                }
                this.updateParams_();
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorcontainer');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 0; x < this.arguments_.length; x++) {
                    var paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
                    paramBlock.initSvg();
                    paramBlock.setFieldValue(this.type_arguments_[x], 'TYPE');
                    paramBlock.setFieldValue(this.arguments_[x], 'NAME');
                    // Store the old location.
                    paramBlock.oldLocation = x;
                    connection.connect(paramBlock.previousConnection);
                    connection = paramBlock.nextConnection;
                }
                // Initialize procedure's callers with blank IDs.
                Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, null);
                Blockly.Procedures.mutateCallers(this.getFieldValue('TYPE'), this.workspace, this.type_arguments_, null);
                return containerBlock;
            },
            compose: function(containerBlock) {
                this.arguments_ = [];
                this.paramIds_ = [];
                this.type_arguments_ = [];
                var paramBlock = containerBlock.getInputTargetBlock('STACK');
                var varName;
                while (paramBlock) {
                    varName = paramBlock.getFieldValue('NAME');
                    this.type_arguments_.push(paramBlock.getFieldValue('TYPE'));
                    this.arguments_.push(varName);
                    this.paramIds_.push(paramBlock.id);
                    paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
                }
                this.updateParams_();
                Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, this.paramIds_);
            },
            dispose: function() {
                var name = this.getFieldValue('NAME');
                var editable = this.editable;
                var workspace = this.workspace;
                // Call parent's destructor.
                Blockly.Block.prototype.dispose.apply(this, arguments);
                if (editable) {
                    // Dispose of any callers.
                    Blockly.Procedures.disposeCallers(name, workspace);
                }
            },
            getProcedureDef: function() {
                // Return the name of the defined procedure,
                // a list of all its arguments,
                // and that it DOES NOT have a return value.
                return [this.getFieldValue('NAME'), this.arguments_, false];
            },
            getVars: function() {
                return this.arguments_;
            },
            renameVar: function(oldName, newName) {
                var change = false;
                for (var x = 0; x < this.arguments_.length; x++) {
                    if (Blockly.Names.equals(oldName, this.arguments_[x])) {
                        newName = this.validName(newName);
                        this.arguments_[x] = newName;
                        change = true;
                    }
                }
                if (change) {
                    this.updateParams_();
                    // Update the mutator's variables if the mutator is open.
                    if (this.mutator.isVisible_()) {
                        var blocks = this.mutator.workspace_.getAllBlocks();
                        var block;
                        for (x = 0; blocks.length; x++) {
                            block = blocks[x];
                            if (block.type === 'procedures_mutatorarg' && Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                                block.setFieldValue(newName, 'NAME');
                            }
                        }
                    }
                }
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        this.reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === this.reserved_words[j]) {
                            this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_procedure !== this.getFieldValue('NAME')) {
                    var name = this.getFieldValue('NAME');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'NAME');
                    } catch (e) {}
                    this.last_procedure = name;
                }
            }
        };
        Blockly.Blocks.procedures_mutatorcontainer = {
            // Procedure container (for mutator dialog).
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
                this.appendStatementInput('STACK');
                this.setTooltip('');
                this.contextMenu = false;
            }
        };
        Blockly.Blocks.procedures_mutatorarg = {
            // Procedure argument (for mutator dialog).
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORARG_Field')).appendField(new Blockly.FieldDropdown([
                    ['int', 'int'],
                    ['String', 'String']
                ]), 'TYPE').appendField(new Blockly.FieldTextInput('x', Blockly.Blocks.procedures_mutatorarg.validator), 'NAME');
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip('');
                this.contextMenu = false;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('NAME')) {
                    var name = this.getFieldValue('NAME');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'NAME');
                    } catch (e) {}
                    this.last_variable = name;
                }
            },
            validName: Blockly.Blocks.procedures_defnoreturn.validName
        };
        Blockly.Blocks.procedures_mutatorarg.validator = function(newVar) {
            // Merge runs of whitespace.  Strip leading and trailing whitespace.
            // Beyond this, all names are legal.
            newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
            return newVar || null;
        };

        // Source: src/blocks/procedures_defreturn/procedures_defreturn.js
        /* global Blockly, JST, RoboBlocks */
        /**
         * procedures_defreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_defreturn = function() {
            // Define a procedure with a return value.
            var funcName = this.getFieldValue('NAME');
            var branch = Blockly.Arduino.statementToCode(this, 'STACK');
            branch = branch.replace(/&quot;/g, '"');

            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }
            var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
            var code = '';

            returnValue = returnValue.replace(/&quot;/g, '"');
            var returnType = this.getReturnType();
            if (returnValue) {
                var a = RoboBlocks.findPinMode(returnValue);
                returnValue = a['code'];
                returnValue += '  return ' + a['pin'] + ';\n';
            }
            var args = this.paramString;
            code += JST['procedures_defreturn']({
                'returnType': returnType,
                'funcName': funcName,
                'args': args,
                'branch': branch,
                'returnValue': returnValue
            });
            // code=code.replace(/&amp;/g, '');

            code = Blockly.Arduino.scrub_(this, code);
            Blockly.Arduino.definitions_[funcName] = code;
            return null;
        };
        Blockly.Blocks.procedures_defreturn = {
            // Define a procedure with a return value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Procedures are handled specially.
            helpUrl: RoboBlocks.URL_PROC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                var name = Blockly.Procedures.findLegalName(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), this);
                this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
                this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_DO'));
                this.appendValueInput('RETURN').setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
                this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_TOOLTIP'));
                this.arguments_ = [];
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            getReturnType: function() {
                var returnType;
                var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
                var a = RoboBlocks.findPinMode(returnValue);
                // code+=a['code'];
                returnValue = a['pin'];

                var isFunction = false;

                for (var i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(returnValue + ' \\(') >= 0) {
                        isFunction = true;
                        break;
                    }
                }
                if (!returnValue) {
                    returnType = 'void';
                }
                if (returnValue.search('"') >= 0) {
                    returnType = 'String';
                } else if (isFunction) { //returnValue.search('\\(') >= 0 && returnValue.search('\\)') >= 0) {
                    for (i in Blockly.Arduino.definitions_) {
                        if (Blockly.Arduino.definitions_[i].search(returnValue) >= 0) {
                            if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                                if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                    returnType = 'int *';
                                } else {
                                    returnType = 'int';
                                }
                            } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                                returnType = 'String';
                            } else {
                                returnType = '';
                            }
                        }
                    }
                } else if (this.isVariable(returnValue)) {
                    returnType = RoboBlocks.variables[returnValue][0];
                } else if ((returnValue.search('analogRead') >= 0) || (returnValue.search('digitalRead') >= 0) || (returnValue.search('Distanc') >= 0) || (!isNaN(parseFloat(returnValue)) || (returnValue.search('random') >= 0)) || (returnValue.search('map') >= 0) || returnValue.search('\\[') >= 0 || (returnValue.search('abs') >= 0) || (returnValue.search('sqrt') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('exp') >= 0) || (returnValue.search('pow') >= 0)) {
                    returnType = 'int';
                } else if (returnValue.search('readJoystick') >= 0 || returnValue[0] === '{') {
                    returnType = 'int *';
                } else {
                    returnType = 'void';
                }
                return returnType;
            },
            updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
            decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
            compose: Blockly.Blocks.procedures_defnoreturn.compose,
            dispose: Blockly.Blocks.procedures_defnoreturn.dispose,
            getProcedureDef: function() {
                // Return the name of the defined procedure,
                // a list of all its arguments,
                // and that it DOES have a return value.
                return [this.getFieldValue('NAME'), this.arguments_, true];
            },
            getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
            renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
            mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
            domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
            validName: Blockly.Blocks.procedures_defnoreturn.validName,
            onchange: Blockly.Blocks.procedures_defnoreturn.onchange
        };

        // Source: src/blocks/procedures_ifreturn/procedures_ifreturn.js
        /* global Blockly, RoboBlocks */

        /**
         * procedures_ifreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_ifreturn = function() {
            // Conditionally return value from a procedure.
            var condition = Blockly.Arduino.valueToCode(this, 'CONDITION',
                Blockly.Arduino.ORDER_NONE) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(condition);
            code += a['code'];
            condition = a['pin'];

            code += 'if (' + condition + ') {\n';
            // if (this.hasReturnValue_) {
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            a = RoboBlocks.findPinMode(value);
            code += a['code'];
            code += '  return (' + value + ');\n';
            // } else {
            //     code += '  return;\n';
            // }
            code += '}\n';
            return code;
        };



        Blockly.Blocks.procedures_ifreturn = {
            // Conditionally return value from a procedure.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: RoboBlocks.URL_PROC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendValueInput('CONDITION')
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
                this.appendValueInput('VALUE');
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_TOOLTIP'));
                this.hasReturnValue_ = true;
            },
            mutationToDom: function() {
                // Save whether this block has a return value.
                var container = document.createElement('mutation');
                container.setAttribute('value', Number(this.hasReturnValue_));
                return container;
            },
            domToMutation: function(xmlElement) {
                // Restore whether this block has a return value.
                var value = xmlElement.getAttribute('value');
                this.hasReturnValue_ = (value === 1);
                // if (!this.hasReturnValue_) {
                //     this.removeInput('VALUE');
                // }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a procedure?
                var block = this;
                do {
                    if (block.type === 'procedures_defreturn') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    // If needed, toggle whether this block has a return value.
                    // if (block.type === 'procedures_defnoreturn' && this.hasReturnValue_) {
                    //     this.removeInput('VALUE');
                    //     this.hasReturnValue_ = false;
                    // } else if (block.type === 'procedures_defreturn' && !this.hasReturnValue_) {
                    //     this.appendValueInput('VALUE');
                    //     this.hasReturnValue_ = true;
                    // }
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        // Source: src/blocks/procedures_return/procedures_return.js
        /* global Blockly, RoboBlocks */

        /**
         * procedures_ifreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_return = function() {
            // Conditionally return value from a procedure.
            var code = '';
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            var a = RoboBlocks.findPinMode(value);
            code += a['code'];
            code += '  return (' + value + ');\n';
            return code;
        };



        Blockly.Blocks.procedures_return = {
            // Conditionally return value from a procedure.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: RoboBlocks.URL_PROC,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_RETURN'));
                this.appendValueInput('VALUE');
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_RETURN_TOOLTIP'));
                this.hasReturnValue_ = true;
            },
            mutationToDom: function() {
                // Save whether this block has a return value.
                var container = document.createElement('mutation');
                container.setAttribute('value', Number(this.hasReturnValue_));
                return container;
            },
            domToMutation: function(xmlElement) {
                // Restore whether this block has a return value.
                var value = xmlElement.getAttribute('value');
                this.hasReturnValue_ = (value === 1);
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a procedure?
                var block = this;
                do {
                    if (block.type === 'procedures_defreturn') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        // Source: src/blocks/serial_available/serial_available.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * serial_available code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_available = function() {
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');
            // branch=branch.replace(/&amp;/g, '');

            var code = JST['serial_available']({
                'branch': branch
            });
            return code;
        };

        /**
         * serial_available block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_available = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_available initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE'));
                this.appendStatementInput('DO')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_parseint/serial_parseint.js
        /* global Blockly, profiles, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * serial_parseint code generation
         * @return {Number} First valid (long) integer number from the serial buffer
         */

        Blockly.Arduino.serial_parseint = function() {
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_parseint_setups']({
                'bitrate': profiles.default.serial
            });
            var code = 'Serial.parseInt()'; // JST['serial_parseint']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_parseint block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_parseint = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_paraseint initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT'));
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_print/serial_print.js
        /* global Blockly, profiles, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * serial_print code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_print = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(content);
            code += a['code'];
            content = a['pin'];
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_print_setups']({
                'bitrate': profiles.
                default.serial
            });
            code += JST['serial_print']({
                'content': content
            });
            return code;
        };
        /**
         * serial_print block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_print = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],
            /**
             * serial_print initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINT'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_println/serial_println.js
        /* global Blockly, profiles, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * serial_println code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_println = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(content);
            code += a['code'];
            content = a['pin'];
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_println_setups']({
                'bitrate': profiles.
                default.serial
            });
            code += JST['serial_println']({
                'content': content
            });
            return code;
        };
        /**
         * serial_println block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_println = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],
            /**
             * serial_println initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_read/serial_read.js
        /* global Blockly, profiles, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * serial_read code generation
         * @return {int} Code generated with block parameters
         */

        Blockly.Arduino.serial_read = function() {

            Blockly.Arduino.setups_['setup_serial'] = JST['serial_read_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_read']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_read block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_read initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READ'));
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READ_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_readstring/serial_readstring.js
        /* global Blockly, profiles, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * serial_readstring code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.serial_readstring = function() {

            Blockly.Arduino.setups_['setup_serial'] = JST['serial_readstring_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_readstring']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_readstring block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_readstring = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_readstring initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING'));
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_special/serial_special.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */

        /**
         * serial_special code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_special = function() {
            var char = this.getFieldValue('CHAR');
            var code = JST['serial_special']({
                'char': char
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_special block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_special = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: RoboBlocks.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_special initialization
             */
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL'))
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TAB') || 'TAB', '\\t'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN') || 'CARRIAGE RETURN', '\\r'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED') || 'LINE FEED', '\\n']
                    ]), 'CHAR');
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'));
            }
        };

        // Source: src/blocks/text/text.js
        /* global Blockly, RoboBlocks */

        /**
         * text code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text = function() {
            // Text value.
            var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text = {
            // Text value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: RoboBlocks.URL_TEXT,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField('"')
                    .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                    .appendField('"');
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_TEXT_TOOLTIP'));
            }
        };

        // Source: src/blocks/text_append/text_append.js
        /* global Blockly, RoboBlocks */
        /**
         * text_append code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_append = function() {
            // Append to a variable in place.
            var varName = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
            var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';

            var code = '';

            var a = RoboBlocks.findPinMode(varName);
            code += a['code'];
            varName = a['pin'];
            a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += varName + ' += String(' + argument0 + ');\n';
            return code;
        };
        Blockly.Blocks.text_append = {
            // Append to a variable in place.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: RoboBlocks.URL_TEXT,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('VAR')
                    // .appendField(new Blockly.FieldVariable(' '), 'VAR')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TO'));
                this.appendValueInput('TEXT').appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('TEXT');
                //             this.appendValueInput('TEXT')
                //                 .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TO'))
                //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                //                 .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
                //             this.setInputsInline(true);
                //         }catch(e){}
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
            }
        };
        // Source: src/blocks/text_equalsIgnoreCase/text_equalsIgnoreCase.js
        /* global Blockly, JST, RoboBlocks */

        /**
         * text_equalsIgnoreCase code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_equalsIgnoreCase = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
            string1 = string1.replace(/&quot;/g, '"');
            var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
            string2 = string2.replace(/&quot;/g, '"');

            var code = '';

            var a = RoboBlocks.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];

            a = RoboBlocks.findPinMode(string2);
            code += a['code'];
            string2 = a['pin'];

            code += JST['text_equalsIgnoreCase']({
                'string1': string1,
                'string2': string2
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_equalsIgnoreCase = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: RoboBlocks.URL_TEXT,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_IS'));

                this.appendValueInput('STRING2')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_EQUAL'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_QUESTION'));

                this.setInputsInline(true);

                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'));
            }
        };
        // Source: src/blocks/text_join/text_join.js
        /* global Blockly, RoboBlocks */

        /**
         * text_join code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_join = function() {
            // Create a string made up of any number of elements of any type.
            var code = '';
            var a;
            console.log('this.itemCount_', this.itemCount_);
            if (this.itemCount_ === 0) {
                return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
            } else if (this.itemCount_ === 1) {
                var argument0 = Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
                a = RoboBlocks.findPinMode(argument0);
                code += a['code'];
                argument0 = a['pin'];

                code += 'String(' + argument0 + ')';
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            } else {
                var i = (Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE) || '');
                console.log('Blockly.Arduino.valueToCode(this, ADD0, Blockly.Arduino.ORDER_NONE)', Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE));
                a = RoboBlocks.findPinMode(i);
                code = a['code'];
                i = a['pin'];

                var final_line = 'String(' + i;
                console.log('iteration 0', '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);

                for (var n = 1; n < this.itemCount_; n++) {
                    i = (Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE) || '');
                    console.log('Blockly.Arduino.valueToCode(this, ADDn, Blockly.Arduino.ORDER_NONE)', Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE));
                    a = RoboBlocks.findPinMode(i);
                    code += a['code'];
                    i = a['pin'];
                    final_line += ') + String(' + i;
                    console.log('iteration', n, '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);
                }


                code += final_line + ')';

                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }
        };

        Blockly.Blocks.text_join = {
            // Create a string made up of any number of elements of any type.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: RoboBlocks.URL_TEXT,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('ADD0')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                this.appendValueInput('ADD1');
                this.setOutput(true, String);
                this.setMutator(new Blockly.Mutator(['text_create_join_item']));
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_TOOLTIP'));
                this.itemCount_ = 2;
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                return container;
            },
            domToMutation: function(xmlElement) {
                for (var x = 0; x < this.itemCount_; x++) {
                    this.removeInput('ADD' + x);
                }
                this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
                for (x = 0; x < this.itemCount_; x++) {
                    var input = this.appendValueInput('ADD' + x);
                    if (x === 0) {
                        input.appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                    }
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote0.png', 12, 12))
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote1.png', 12, 12));
                }
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'text_create_join_container');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 0; x < this.itemCount_; x++) {
                    var itemBlock = Blockly.Block.obtain(workspace, 'text_create_join_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect all input blocks and remove all inputs.
                if (this.itemCount_ === 0) {
                    this.removeInput('EMPTY');
                } else {
                    for (var x = this.itemCount_ - 1; x >= 0; x--) {
                        this.removeInput('ADD' + x);
                    }
                }
                this.itemCount_ = 0;
                // Rebuild the block's inputs.
                var itemBlock = containerBlock.getInputTargetBlock('STACK');
                while (itemBlock) {
                    var input = this.appendValueInput('ADD' + this.itemCount_);
                    if (this.itemCount_ === 0) {
                        input.appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                    }
                    // Reconnect any child blocks.
                    if (itemBlock.valueConnection_) {
                        input.connection.connect(itemBlock.valueConnection_);
                    }
                    this.itemCount_++;
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote0.png', 12, 12))
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote1.png', 12, 12));
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var itemBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 0;
                while (itemBlock) {
                    var input = this.getInput('ADD' + x);
                    itemBlock.valueConnection_ = input && input.connection.targetConnection;
                    x++;
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
            }
        };



        Blockly.Blocks.text_create_join_container = {
            // Container.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_Field_JOIN'));
                this.appendStatementInput('STACK');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.text_create_join_item = {
            // Add items.
            init: function() {
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_Field_ITEM'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
                this.contextMenu = false;
            }
        };


        Blockly.Blocks.text_create_join_container = {
            // Container.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TITLE_JOIN'));
                this.appendStatementInput('STACK');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.text_create_join_item = {
            // Add items.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
                this.contextMenu = false;
            }
        };



        // Source: src/blocks/text_length/text_length.js
        /* global Blockly, JST, RoboBlocks */

        /**
         * text_length code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.text_length = function() {
            // String length.
            var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += JST['text_length']({
                'argument0': argument0
            });

            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        };

        Blockly.Blocks.text_length = {
            // String length.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: RoboBlocks.URL_TEXT,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('VALUE')
                    .setCheck([String, Array])
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_LENGTH_INPUT_LENGTH'));
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_LENGTH_TOOLTIP'));
            }
        };
        // Source: src/blocks/text_substring/text_substring.js
        /* global Blockly, JST, RoboBlocks */

        /**
         * text_substring code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_substring = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
            var from = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_NONE);
            var to = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = RoboBlocks.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];

            a = RoboBlocks.findPinMode(from);
            code += a['code'];
            from = a['pin'];

            a = RoboBlocks.findPinMode(to);
            code += a['code'];
            to = a['pin'];

            code += JST['text_substring']({
                'string1': string1,
                'from': from,
                'to': to
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_substring = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: RoboBlocks.URL_TEXT,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1')
                    // .setCheck(String)
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING'));

                this.appendValueInput('FROM')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_FROM'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);

                this.appendValueInput('TO')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TO'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);
                // this.appendDummyInput()
                //     .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_QUESTION'));

                this.setInputsInline(true);

                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TOOLTIP'));
            }
        };
        // Source: src/blocks/variables_get/variables_get.js
        /* global Blockly, RoboBlocks */
        /* jshint sub:true */
        /**
         * variables_get code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_get = function() {
            // Variable setter.
            var varName = this.getFieldValue('VAR') || '';
            if (RoboBlocks.variables[this.getFieldValue('VAR')] !== undefined) {
                this.var_type = RoboBlocks.variables[this.getFieldValue('VAR')][0];
            }
            return [varName, Blockly.Arduino.ORDER_ATOMIC];
        };
        Blockly.Blocks.variables_get = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                    // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };
        // Source: src/blocks/variables_global/variables_global.js
        /* global Blockly,  RoboBlocks */
        /* jshint sub:true */
        /**
         * variables_global code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_global = function() {
            // Variable setter.
            var varType;
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var a = RoboBlocks.findPinMode(varValue);
            Blockly.Arduino.setups_['pinMode' + varValue] = a['code'];
            varValue = a['pin'];

            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
                varType = 'String';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';';
            } else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                varType = 'int *';
                            } else {
                                varType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            varType = 'String';
                        } else {
                            varType = '';
                        }
                        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
                        break;
                    }
                }
            } else if (varValue[0] === '{') {
                varType = 'int *';
                varValue = varValue.replace('{', '');
                varValue = varValue.replace('}', '');
                varValue = varValue.split(',');
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                // Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '[0]=' + varValue[0] + ';\n  ' + varName + '[1]=' + varValue[1] + ';\n  ' + varName + '[2]=' + varValue[2] + ';\n';
            } else if (this.isVariable(varValue)) {
                varType = RoboBlocks.variables[varValue][0];
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            } else if (varValue.search('readJoystick') >= 0) {
                varType = 'int *';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue)) || (varValue.search('random') >= 0)) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                varType = 'int';
                if (!isNaN(parseFloat(varValue))) {
                    Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';
                } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                    Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                    Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
                }
            } else {
                varType = 'unknown';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            }
            RoboBlocks.variables[varName] = [varType, 'global'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };
        Blockly.Blocks.variables_global = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('VAR')) {
                    var name = this.getFieldValue('VAR');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'VAR');
                    } catch (e) {}
                    this.last_variable = name;
                }
            }
        };
        // Source: src/blocks/variables_global_type/variables_global_type.js
        /* global Blockly,  RoboBlocks */
        /* jshint sub:true */
        /**
         * variables_global_type code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_global_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';

            RoboBlocks.variables[varName] = [varType, 'global'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };

        Blockly.Blocks.variables_global_type = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(RoboBlocks.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('VAR')) {
                    var name = this.getFieldValue('VAR');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'VAR');
                    } catch (e) {}
                    this.last_variable = name;
                }
            }
        };

        // Source: src/blocks/variables_local/variables_local.js
        /* global Blockly,  RoboBlocks */
        /* jshint sub:true */
        /**
         * variable code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_local = function() {
            // Variable setter.
            var varType;
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var sufix = '';
            var code = '';
            var isFunction = false;


            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];


            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
                varType = 'String';
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            } else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                varType = 'int *';
                            } else {
                                varType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            varType = 'String';
                        } else {
                            varType = '';
                        }
                        code += varType + ' ' + varName + '=' + varValue + ';\n';
                    }
                }
            } else if (varValue[0] === '{') {
                varType = 'int *';
                varValue = varValue.replace('{', '');
                varValue = varValue.replace('}', '');
                varValue = varValue.split(',');
                code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                // code += varType + varName + ';\n';
                code += varName + '[0]=' + varValue[0] + ';\n' + varName + '[1]=' + varValue[1] + ';\n' + varName + '[2]=' + varValue[2] + ';\n';
            } else if (this.isVariable(varValue)) {
                varType = RoboBlocks.variables[varValue][0];
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            } else if (varValue.search('readJoystick') >= 0) {
                varType = 'int *';
                code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                code += varName + '=' + varValue + ';\n';
            } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue))) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                varType = 'int';
                code += varType + ' ' + varName + sufix + '=' + varValue + ';\n';
            } else {
                varType = 'unknown';
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            }

            RoboBlocks.variables[varName] = [varType, 'local'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'local'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

            return code;
        };
        Blockly.Blocks.variables_local = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_global.isVariable,
            onchange: Blockly.Blocks.variables_global.onchange,
            validName: Blockly.Blocks.variables_global.validName
        };
        // Source: src/blocks/variables_local_type/variables_local_type.js
        /* global Blockly,  RoboBlocks */
        /* jshint sub:true */
        /**
         * variable code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_local_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            code += varType + ' ' + varName + '=' + varValue + ';\n';

            RoboBlocks.variables[varName] = [varType, 'local'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'local'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

            return code;
        };
        Blockly.Blocks.variables_local_type = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_global.isVariable,
            onchange: Blockly.Blocks.variables_global.onchange,
            validName: Blockly.Blocks.variables_global.validName
        };

        // Source: src/blocks/variables_set/variables_set.js
        /* global Blockly, JST, RoboBlocks */
        /* jshint sub:true */
        /**
         * variables_set code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_set = function() {
            // Variable setter.
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];


            code += JST['variables_set']({
                'varName': varName,
                'varValue': varValue
            });
            return code;
        };
        Blockly.Blocks.variables_set = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.URL_VAR,
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_SET'))
                    // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                    .appendField(new Blockly.FieldVariable(' '), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_SET_AS')).setAlign(Blockly.ALIGN_RIGHT);
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_SET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };
        return Blockly.Blocks;
    }
    var RoboBlocks = {
        load: load
    };
    if (typeof define === 'function' && define.amd) {
        return RoboBlocks;
    } else {
        window.RoboBlocks = RoboBlocks;
    }
}));
