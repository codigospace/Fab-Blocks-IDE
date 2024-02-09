#line 1 "D:\\Proyectos\\modulinoQt\\1 Prueba Archivos Bat\\1_test\\build\\preproc\\ctags_target_for_gcc_minus_e.cpp"
# 1 "D:\\Modular\\1_Modular_hardware\\5_Modular_Library\\Compile-Uploader\\1 Prueba Archivos Bat\\1_test\\1_test.ino"
# 2 "D:\\Modular\\1_Modular_hardware\\5_Modular_Library\\Compile-Uploader\\1 Prueba Archivos Bat\\1_test\\1_test.ino" 2
digitalOutput led(9);
void setup() {
  led.init();
}
void loop() {
  led.write(!led.read());
  delay(1000);
}
