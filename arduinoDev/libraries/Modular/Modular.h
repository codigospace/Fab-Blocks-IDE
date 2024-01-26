#ifndef Modular_h
#define Modular_h

#include "Arduino.h"
#include <Servo.h>

//------------------------------------------------------
// Funciones para Entradas Analogicas
class analogInput{
  public:
    analogInput(byte Port);
    void init();
    int read();
    float readVolt();
    bool change(int Porcentaje);
  private:
    byte pinAnalogIn;
    int dataAdc,dataAdcLast;
};
//------------------------------------------------------
// Funciones para Salidas Analogicas
class analogOutput{
  public:
    analogOutput (byte Port);
    void init();
    byte read();
    void write(byte data);
  private:
    byte pinAnalogOut;
    byte dataDac;
};
//------------------------------------------------------
// Funciones para Entradas Digitales
class digitalInput{
  public:
    digitalInput(byte Port);
    void init();
    bool read();
    bool change();
    bool change(bool state);
  private:
    byte pinDigitalIn;
    bool stateIn, stateInLast;
};
//------------------------------------------------------
// Funciones para Salidas Digitales
class digitalOutput{
  public:
    digitalOutput(byte Port);
    void init();
    bool read();
    void write(bool state);
  private:
    byte pinDigitalOut;
    bool stateOut;
};
//------------------------------------------------------
// Funciones para Salidas de Servomotor
class servoAngle: public Servo{
  public:
    servoAngle (byte Port);
    void init();
    byte read();
    void write(byte angle);
    void config(byte angle, byte velo, byte accel);
    void start();
    void stop();
  private:
    byte pinServoOut;
    byte dataServo,dataAngle,dataVelo,dataAccel;
};
//------------------------------------------------------
// Funciones para Actuador de Servomotor DC
class servoDc: public Servo{
  public:
    servoDc (byte Port);
    void init();
    byte read();
    void write(byte velo);
  private:
    byte pinMotorDc;
    byte dataVelo;
};
//------------------------------------------------------
// Funciones para Actuador de Motor DC
class motorDc{
  #define FORWARD   1
  #define BACKWARD  0
  public:
    motorDc (byte Port);
    void init();
    byte read();
    void write(byte velo, bool dir);
    void config(byte velo, byte accel, bool dir);
    void start();
    void stop();
  private:
    byte pinMotorDcPwm, pinMotorDcDir;
    byte dataDc, dataVelo, dataAccel;
    bool dataDir;
};
//------------------------------------------------------
// Funciones para Sensor de Ultrasonido
class distanceSensor {
  public:
    distanceSensor (byte Port);
    void init();
    float read();
  private:
    byte pinUltrasonicTrig, pinUltrasonicEcho;
};
//------------------------------------------------------
// Funciones para Motor de Paso
class stepperMotor{
  public:
    stepperMotor (byte Port);
    void init();
    int read();
    void origin();
    void config(int velo, int accel);
    void steps(int steps);
  private:
    byte pinStepOut, pinDirOut;
    int dataVelo, dataAccel, dataSteps;
};

#endif