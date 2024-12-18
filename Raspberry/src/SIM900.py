import time
import serial

class SIM900:
    def __init__(self, port, baudrate,timeout):
        self.mPort = port
        self.mPBaudrate=baudrate
        self.mTimeout=timeout
        self.mConn=None
        
    def connect(self):
        try:
            self.mConn = serial.Serial(port=self.mPort,baudrate=self.mPBaudrate,timeout=self.mTimeout)
            return True
        except Exception as e:
            print(str(e))
            return False


    def call(self,phoneNumber):
        try:
            print ("Set call mode")
            port.write("AT+CMGF=0\r".encode())
            time.sleep(1)
            print ("Start call")

            cmd = "ATD{};\r".format(phoneNumber)
            self.mConn.write(cmd.encode())
            time.sleep(30)
            print ("End call")
        except Exception as e:
            print(str(e))
            return False
            
    def sendCommand(self, command, wait_time=1.0):
        
        try:
            if not self.mConn or not self.mConn.is_open:
                return None
            
            self.mConn.reset_input_buffer()

            # Envoyer la commande
            self.mConn.write((command + '\r').encode())
            time.sleep(wait_time)

            response = self.mConn.readlines()
            for line in response :
                print(line.decode().strip())
            
            return response
        except Exception as e:
            print(f"Erreur en envoyant la commande : {str(e)}")
            return None


    def send_sms(self, phone_number, message):
        try:
            self.mConn.write(b'AT+CMGF=1\r')  # Mode texte
            time.sleep(3)
            self.mConn.write(f'AT+CMGS="{phone_number}"\r'.encode('ascii'))
            time.sleep(3)
            self.mConn.write(message.encode('ascii') + b'\r')
            time.sleep(3)
            self.mConn.write(bytes([26]))  # CTRL+Z
            time.sleep(3)
            print("Message envoyE.")
        except Exception as e:
            print(f"Erreur : {e}")


    def disconnect(self):
        try:
            self.mConn.close()
            return False
        except Exception as e:
            print(str(e))
            return False

if __name__=="__main__":
    sim = SIM900("/dev/serial0",19200,10.0)
    sim.connect()
    sim.send_sms("+33689851366","La temperature de la serre a dépassé le seuil de 35 C")
    sim.disconnect()
