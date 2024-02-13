# 1 "D:\\Proyectos\\fab2\\extracted_code.ino"
# 2 "D:\\Proyectos\\fab2\\extracted_code.ino" 2

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
# 1 "D:\\Proyectos\\fab2\\cases.ino"
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char input = Serial.read();
    int output;
    switch(input) {
      case 'A':
        output = 1;
        break;
      case 'B':
        output = 2;
        break;
      case 'C':
        output = 3;
        break;
      case 'D':
        output = 4;
        break;
      case 'E':
        output = 5;
        break;
      default:
        output = 0;
        break;
    }

    Serial.println(output);
  }
  delay(500);
}
# 1 "D:\\Proyectos\\fab2\\threedata.ino"
void setup() {
  Serial.begin(9600);
}

void loop() {
  int valor1 = random(20);
  int valor2 = random(20);
  int valor3 = random(20);

  Serial.print(valor1);
  Serial.print(",");
  Serial.print(valor2);
  Serial.print(",");
  Serial.println(valor3);

  delay(500);
}
