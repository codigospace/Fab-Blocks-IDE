#include "Modular.h"
#include <Servo.h>

//-----------------------------------------------------------------------------
//                       0   1   2   3   4   5   6   7   8   9  
byte pines_dos[14]    ={A5, A0, A1, A2, A3,  4, A7, A6, 10, 12};
byte pines_cuatro[14] ={A4,  9,  6,  5,  3,  2,  7,  8, 11, 13};

//---------------------------------------------------------------------------------------
// Funciones para Entradas Analogicas
// It is funcionally correct
analogInput::analogInput (byte Port){
  pinAnalogIn = pines_dos[Port];
}
void analogInput::init(){
  dataAdcLast = read();
}
int analogInput::read(){
  return analogRead(pinAnalogIn);
}
float analogInput::readVolt(){
  dataAdc = analogRead(pinAnalogIn);
  return (float)dataAdc*5.0/1023.0;
}
bool analogInput::change(int Porcentaje){
  dataAdc = read();
  if (abs(dataAdc - dataAdcLast) >= (1023/(Porcentaje*10))) { dataAdcLast = dataAdc;  return 1; }
  else {                                                                              return 0; }
}

//---------------------------------------------------------------------------------------
// Funciones para Salidas Analogicas
// It is funcionally correct
analogOutput::analogOutput (byte Port){
  pinAnalogOut = pines_cuatro[Port];
}
void analogOutput::init(){
  pinMode(pinAnalogOut,OUTPUT);
}
byte analogOutput::read(){
  return dataDac;
}
void analogOutput::write(byte data){
  dataDac = data;
  analogWrite(pinAnalogOut,dataDac);
}

//---------------------------------------------------------------------------------------
// Funciones para Entradas Digitales
// It is funcionally correct
digitalInput::digitalInput (byte Port){
  pinDigitalIn=pines_cuatro[Port];
}
void digitalInput::init(){
  pinMode(pinDigitalIn,INPUT);
  stateInLast = read();
}
bool digitalInput::read(){
  return digitalRead(pinDigitalIn);
}
bool digitalInput::change(){
  stateIn = read();
  if (stateIn!=stateInLast) { stateInLast=stateIn;  return 1; }
  else {                                            return 0; }
}
bool digitalInput::change(bool state){
  stateIn = read();
  if (stateIn!=stateInLast) {
    stateInLast=stateIn;
    if (state == stateIn){  return 1; }
    else{                   return 0; }
  }
  else {                    return 0; }
}

//---------------------------------------------------------------------------------------
// Funciones para Salidas Digitales
// It is funcionally correct
digitalOutput::digitalOutput (byte Port){
  pinDigitalOut=pines_cuatro[Port];
}
void digitalOutput::init(){
  pinMode(pinDigitalOut,OUTPUT);
}
bool digitalOutput::read(){
  return stateOut;
}
void digitalOutput::write(bool state){
  stateOut = state;
  digitalWrite(pinDigitalOut,stateOut);
}

//---------------------------------------------------------------------------------------
// Funciones para Salidas de Servomotor
// The basic commands of Servo 
servoAngle::servoAngle (byte Port){
  pinServoOut = pines_cuatro[Port];
}
void servoAngle::init(){
  Servo::attach(pinServoOut,550,2550);
}
byte servoAngle::read(){
  return dataServo;
}
void servoAngle::write(byte angle){
  if (angle>180) { angle=180; }
  dataServo = angle;
  Servo::write(dataServo);
}
// The advance commands of Servo 
void servoAngle::config(byte angle, byte velo, byte accel){
  dataAngle = angle;
  dataVelo = velo;
  dataAccel = accel;
}
void servoAngle::start(){
}
void servoAngle::stop(){
}
//------------------------------------------------------
// Funciones para Actuador de Motor DC
servoDc::servoDc (byte Port){
  pinMotorDc = pines_cuatro[Port];
}
void servoDc::init(){
  Servo::attach(pinMotorDc,550,2550);
  dataVelo = 90;
  Servo::write(dataVelo);
}
byte servoDc::read(){
  return dataVelo;
}
void servoDc::write(byte velo){
  if (velo>180) { velo=180; }
  dataVelo = velo;
  Servo::write(dataVelo);
}
//------------------------------------------------------
// Funciones para Actuador de Motor DC
motorDc::motorDc (byte Port){
  pinMotorDcPwm = pines_cuatro[Port];
  pinMotorDcDir = pines_dos[Port];
}
void motorDc::init(){
  pinMode(pinMotorDcPwm,OUTPUT);
  pinMode(pinMotorDcDir,OUTPUT);
}
byte motorDc::read(){
  return dataDc;
}
void motorDc::write(byte velo, bool dir){
  dataDc = velo;
  digitalWrite(pinMotorDcDir,dir);
  analogWrite(pinMotorDcPwm,velo);
}
void motorDc::config(byte velo, byte accel, bool dir){
  dataDir = dir;
  dataAccel = accel;
  if (dataDir){ dataVelo = 90+map(velo,0,100,0,90);   }
  else {        dataVelo = 90-map(velo,0,100,0,90);   }
}
void motorDc::start(){
  //servoDc.write(dataVelo);
}
void motorDc::stop(){
  //servoDc.write(90);
}
//------------------------------------------------------
// Funciones para Sensor de Ultrasonido
distanceSensor::distanceSensor (byte Port){
  pinUltrasonicTrig = pines_cuatro[Port];
  pinUltrasonicEcho = pines_dos[Port];
}
void distanceSensor::init(){
  pinMode(pinUltrasonicTrig,OUTPUT);
  pinMode(pinUltrasonicEcho,INPUT);
  digitalWrite(pinUltrasonicTrig,LOW);
}
float distanceSensor::read(){
  digitalWrite(pinUltrasonicTrig, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinUltrasonicTrig, LOW);
  float dataDist = pulseIn(pinUltrasonicEcho,HIGH);
  return dataDist / 29.0 / 2.0 ;
}

//------------------------------------------------------
// Funciones para Stepper Motor
stepperMotor::stepperMotor (byte Port){

}
void stepperMotor::init(){

}
int stepperMotor::read(){
  return 10;
}
void stepperMotor::origin(){

}
void stepperMotor::config(int velo, int accel){

}
void stepperMotor::steps(int steps){

}
