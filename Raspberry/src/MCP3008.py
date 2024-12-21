from spidev import SpiDev

class MCP3008:
	def __init__(self,bus = 0 , device = 0):
		self.bus, self.device = bus , device
		self.spi = SpiDev()
		self.open()
		self.spi.max_speed_hz = 1000000
	def open(self):
		self.spi.open(self.bus,self.device)
		self.spi.max_speed_hz = 1000000

	def read(self,channel = 0 ):
		adc = self.spi.xfer2([1,(8 + channel) << 4,0])
		data = ((adc[1] & 3) << 8 ) + adc [2]
		return data /1024 * 100

	def close(self):
		self.spi.close()



if __name__ == "__main__":
	adc = MCP3008()
	while True :
		value = adc.read(channel = 0)
		print(str((value/1024 * 100)) + "%")
 