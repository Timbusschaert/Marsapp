import Adafruit_DHT
import time

class DHT22Reader:
    def __init__(self, pin):
        # Configuration du type de capteur et du numéro de pin GPIO
        self.sensor = Adafruit_DHT.DHT22
        self.pin = pin

    def read_data(self):
        # Lecture des données du capteur
        humidity, temperature = Adafruit_DHT.read_retry(self.sensor, self.pin)
        return humidity, temperature