# 1 "D:\\Proyectos\\fab2\\extracted_code.ino"
# 2 "D:\\Proyectos\\fab2\\extracted_code.ino" 2

/***   Global variables   ***/
digitalOutput name(4);

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
