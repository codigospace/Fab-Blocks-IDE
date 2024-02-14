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
