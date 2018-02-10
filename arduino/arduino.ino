/*
Trying to control led from serial
*/
int ledPin = 11;
float sinVal;
int ledVal;
String inData = "0";

void setup() {
    pinMode(ledPin, OUTPUT);
    Serial.begin(9600);
}

void loop() {
  
    while (Serial.available() > 0) {
        char received = Serial.read();
        inData.concat(received);

        // Process message when new line character is received
        if (received == '\n') {
            // Message is ready in inDate
            Serial.println(inData);
            ledVal = inData.toInt();
            inData = "";
            analogWrite(ledPin, ledVal);
        }
    }
    
    
    /*
    for(int x=0; x<180; x++) {
      sinVal = sin(x*(3.1416/180));
      ledVal = int(sinVal*255);
      analogWrite(ledPin, ledVal);
      delay(25);
    }
    */
}
