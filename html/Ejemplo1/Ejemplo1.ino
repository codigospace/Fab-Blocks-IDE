#include <Modular.h>
distanceSensor medidor(3);
digitalOutput lampara(1);
digitalInput pulsa(2);

void setup() {
  medidor.init();
  lampara.init();
  pulsa.init();
}

void loop() {
  if (medidor.read()<15){
    lampara.write(HIGH);
  }
  else{
    lampara.write(LOW);
  }
}
