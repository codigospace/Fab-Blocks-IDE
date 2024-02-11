#include <Arduino.h>
#line 1 "D:\\Proyectos\\fab2\\extracted_code.ino"
#include <Modular.h>

/***   Global variables   ***/
digitalOutput name(4);

/***   Function declaration   ***/

#line 8 "D:\\Proyectos\\fab2\\extracted_code.ino"
void setup();
#line 15 "D:\\Proyectos\\fab2\\extracted_code.ino"
void loop();
#line 8 "D:\\Proyectos\\fab2\\extracted_code.ino"
void setup()
{
    name.init();

}


void loop()
{
    name.write(HIGH);

}

/***   Function definition   ***/

