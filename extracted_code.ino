#include <Modular.h>

/***   Global variables   ***/
digitalOutput name(2);

/***   Function declaration   ***/

void setup()
{
    name.init();

}


void loop()
{
    name.write(!name.read);

}