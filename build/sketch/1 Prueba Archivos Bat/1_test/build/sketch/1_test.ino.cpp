#line 1 "D:\\Proyectos\\modulinoQt\\1 Prueba Archivos Bat\\1_test\\build\\sketch\\1_test.ino.cpp"
#include <Arduino.h>
#line 1 "D:\\Modular\\1_Modular_hardware\\5_Modular_Library\\Compile-Uploader\\1 Prueba Archivos Bat\\1_test\\1_test.ino"
#include <Modular.h>
digitalOutput led(9);
#line 3 "D:\\Modular\\1_Modular_hardware\\5_Modular_Library\\Compile-Uploader\\1 Prueba Archivos Bat\\1_test\\1_test.ino"
void setup();
#line 6 "D:\\Modular\\1_Modular_hardware\\5_Modular_Library\\Compile-Uploader\\1 Prueba Archivos Bat\\1_test\\1_test.ino"
void loop();
#line 3 "D:\\Modular\\1_Modular_hardware\\5_Modular_Library\\Compile-Uploader\\1 Prueba Archivos Bat\\1_test\\1_test.ino"
void setup() {
  led.init();
}
void loop() {
  led.write(!led.read());
  delay(1000);
}

