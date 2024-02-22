#include <Modular.h>

/***   Global variables   ***/
digitalOutput name(0);

/***   Function declaration   ***/

void setup()
{
    name.init();

}


void loop()
{
    name.write(HIGH);

}

/***   Function definition   ***/
