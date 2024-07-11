#include <Arduino.h>
#line 1 "D:\\Proyectos\\fab2\\extracted_code.ino"
#include <Modular.h>

/***   Global variables   ***/
analogInput name(2);

/***   Function declaration   ***/

#line 8 "D:\\Proyectos\\fab2\\extracted_code.ino"
void setup();
#line 17 "D:\\Proyectos\\fab2\\extracted_code.ino"
void loop();
#line 8 "D:\\Proyectos\\fab2\\extracted_code.ino"
void setup()
{
    name.init();

  Serial.begin(115200);

}


void loop()
{
    Serial.println(name.read());
    delay(300);

}

/***   Function definition   ***/

