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