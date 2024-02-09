# 1 "D:\\Proyectos\\modulinoQt\\extracted_code.ino"
# 2 "D:\\Proyectos\\modulinoQt\\extracted_code.ino" 2

/***   Global variables   ***/
digitalOutput name(0);

/***   Function declaration   ***/

void setup()
{
    name.init();

}


void loop()
{
    name.write(0x1);

}

/***   Function definition   ***/
