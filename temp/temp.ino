#include <Modular.h>

/***   Global variables   ***/
digitalOutput led(8);
digitalInput boton(1);

/***   Function declaration   ***/

void setup()
{
    led.init();
  boton.init();

}


void loop()
{
    if (boton.read()) {
      led.write(HIGH);
     }else {
      led.write(LOW);
     }

}

/***   Function definition   ***/
