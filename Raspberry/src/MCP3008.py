import busio
import digitalio
import board
from adafruit_mcp3xxx.mcp3008 import MCP3008
from adafruit_mcp3xxx.analog_in import AnalogIn

class MCP3008Reader:
    def __init__(self, channel):
        # Créer le bus SPI
        spi = busio.SPI(clock=board.SCK, MISO=board.MISO, MOSI=board.MOSI)

        # Créer le chip select (CS)
        cs = digitalio.DigitalInOut(board.D18)  # Modifier selon votre câblage

        # Créer l'objet MCP3008
        self.mcp = MCP3008(spi, cs)

        # Créer un objet AnalogIn sur le canal spécifié
        self.channel = AnalogIn(self.mcp, channel)

    def read_value(self):
        # Lire la valeur du canal
        return self.channel.value

    def read_voltage(self):
        # Lire la tension du canal
        return self.channel.voltage

if __name__ == "__main__":
    test = MCP3008Reader(5)
    print(test.read_value())

