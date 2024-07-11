# 1 "D:\\Proyectos\\fab2\\extracted_code.ino"
# 2 "D:\\Proyectos\\fab2\\extracted_code.ino" 2

/***   Global variables   ***/
analogInput name(2);

/***   Function declaration   ***/

void setup()
{
    name.init();

  Serial.begin(115200);

}


void loop()
{
    Serial.println(name.read());
    delay(300);

}

/***   Function definition   ***/
