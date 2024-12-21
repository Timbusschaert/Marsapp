from flask import Flask, request, jsonify
import json
import random
import schedule
import time
import os
from src.MCP3008 import MCP3008
from src.MySQLHelper import MySQLHelper
from src.DHT22 import DHT22Reader
from src.SIM900 import SIM900  # Ajouter un module pour envoyer des SMS
from datetime import datetime, timedelta

app = Flask(__name__)
mcp_reader_light = MCP3008()
mcp_reader_light.open()

mcp_reader_ground = MCP3008()
mcp_reader_ground.open()
mcp_reader_temp_hum = DHT22Reader(4)

# Charger les configurations depuis le fichier JSON
with open('/home/tim/Documents/didier/Raspberry/config/config.json', 'r') as config_file:
    config_data = json.load(config_file)

<<<<<<< HEAD
=======
dir_path = os.path.dirname(os.path.realpath(__file__))
config_path = os.path.join(dir_path, 'config', 'config.json')
# Configuration de la base de données
>>>>>>> 06f1725 (original push)
db_config = config_data["db"]
temperature_limit = config_data.get("temperature_limit", 30)  
sms_recipient = config_data.get("sms_recipient", "+32479647787")  

db_connection = MySQLHelper(
    host=db_config["host"],
    port=db_config["port"],
    user=db_config["user"],
    password=db_config["password"],
    database=db_config["database"]
)

# Initialiser le module SIM900 pour les SMS
sim = SIM900(port="/dev/serial0", baudrate=19200, timeout=1.0)
if not sim.connect():
    print("Erreur : Impossible de se connecter au module SIM900")

last_sms_time = None
sms_cooldown_period = timedelta(minutes=10)  # Temps d'attente entre chaque SMS (ici 10 minutes)

def read_and_insert_sensor_data():
    global last_sms_time
    sensor_data_json = read_sensor_data()
    try:
        
        sensor_data = json.loads(sensor_data_json)

        # Extraire les valeurs du dictionnaire
        temperature = sensor_data["temperature"]
        humidity = sensor_data["humidity"]
        light = sensor_data["light"]

        insert_query = "INSERT INTO marsapp (temperature, humidity, lux) VALUES (%s, %s, %s)"
        db_connection.insert_data(insert_query, (temperature, humidity, light))

        print("Donnees des capteurs:", sensor_data)

        if temperature > temperature_limit_up:
            if last_sms_time is None or datetime.now() - last_sms_time >= sms_cooldown_period:
                message = f"Alerte : Temperature elevee detectee ({temperature:.2f}C)"
                print("Envoi du SMS : ", message)
                sim.sendMessage(sms_recipient, message)

                last_sms_time = datetime.now()
        if temperature > temperature_limit_down:
            if last_sms_time is None or datetime.now() - last_sms_time >= sms_cooldown_period:
                message = f"Alerte : Temperature basse detectee ({temperature:.2f}C)"
                print("Envoi du SMS : ", message)
                sim.sendMessage(sms_recipient, message)

                last_sms_time = datetime.now()

    except json.JSONDecodeError as e:
        print(f"Erreur de decodage JSON : {e}")
    except Exception as e:
        print(f"Erreur lors du traitement des donnees des capteurs : {e}")
# Planificateur pour appeler la fonction toutes les 5 secondes
schedule.every(60).seconds.do(read_and_insert_sensor_data)

def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(1)

def read_sensor_data():
    try:
        # Simuler la lecture des capteurs
<<<<<<< HEAD
        temperature, humidity = mcp_reader_temp_hum.read_data()
        light = mcp_reader_light.read_value()
        ground = mcp_reader_ground.read_value()

        temperature += random.uniform(0.0, 2.0)
        humidity += random.uniform(0.0, 2.0)
        light += random.uniform(0.0, 2.0)

=======
 
        # Lire la valeur analogique
        humidity,temperature = mcp_reader_temp_hum.read_data()
        light = mcp_reader_light.read(1)
        ground = mcp_reader_ground.read(0)

        temperature = temperature 
        humidity = humidity 
        light = ground 
        # Construire un dictionnaire avec les données
>>>>>>> 06f1725 (original push)
        sensor_data = {
            "temperature": temperature,
            "humidity": humidity,
            "light": light,
            "ground": ground
        }
<<<<<<< HEAD

=======
        print("Sensor data:", sensor_data)
>>>>>>> 06f1725 (original push)
        # Convertir le dictionnaire en format JSON
        json_data = json.dumps(sensor_data)
        return json_data
    except Exception as e:
        return jsonify(error=f"Erreur de lecture des capteurs : {str(e)}"), 500

# Point de terminaison pour lifesign (GET)
@app.route('/lifesign', methods=['GET'])
def lifesign():
    return "200"

# Point de terminaison pour getCurrentValue (GET)
@app.route('/getCurrentValue', methods=['GET'])
def get_current_value():
    return read_sensor_data()

# Point de terminaison pour jsonConfig (POST)
@app.route('/jsonConfig', methods=['POST'])
def json_config():
    try:
        config_data = request.get_json()

        with open('config/config.json', 'w') as config_file:
            json.dump(config_data, config_file)

        return jsonify(message='Configuration enregistre')

    except Exception as e:
        return jsonify(error=f"Erreur lors de l'enregistrement de la configuration : {str(e)}"), 500
@app.route('/getValueOfMonth', methods=['GET'])
def get_values_of_month():
    try:
        query = """SELECT 
                DAYOFMONTH(timestamp) AS day,
                AVG(temperature) AS avg_temperature,
                AVG(humidity) AS avg_humidity,
                AVG(lux) AS avg_lux,
		MAX(temperature) AS max_temperature,
		MIN(temperature) AS min_temperature,
		MAX(humidity) AS max_humidity,
		MIN(humidity) AS min_humidity
            FROM 
                marsapp
            WHERE 
                MONTH(timestamp) = MONTH(CURRENT_DATE())
            GROUP BY 
                DAYOFMONTH(timestamp)
            ORDER BY 
                DAYOFMONTH(timestamp);
        """

        result = db_connection.search_data(query)

        days = [str(0) for i in range(0, 31)]
        temperatures = [str(0) for i in range(0, 31)]
        humidities = [str(0) for i in range(0, 31)]
        lux_values = [str(0) for i in range(0, 31)]
        max_tempartures = [str(0) for i in range(0, 31)]
        min_tempartures = [str(0) for i in range(0, 31)]
        max_humidity = [str(0) for i in range(0, 31)]
        min_humidity = [str(0) for i in range(0, 31)]


        print(result)
        
        for row in result:
<<<<<<< HEAD
            temperatures[row[0]] = row[1]
            humidities[row[0]] = row[2]
            lux_values[row[0]] = row[3]
        
=======
            temperatures[row[0]]=row[1]
            humidities[row[0]]=row[2]
            lux_values[row[0]]=row[3]
            max_tempartures[row[0]]=row[4]
            min_tempartures[row[0]]=row[5]
            max_humidity[row[0]]=row[6]
            min_humidity[row[0]]=row[7]

>>>>>>> 06f1725 (original push)
        result_object = {
            'days': days,
            'temperatures': temperatures,
            'humidities': humidities,
            'lux_values': lux_values,
            'max_tempartures':max_tempartures,
            'min_tempartures':min_tempartures,
            'max_humidity':max_humidity,
            'min_humidity':min_humidity
        }

        return json.dumps(result_object)

    except Exception as e:
        print(e)
        return jsonify(error=f"Erreur gettind monthly data : {str(e)}"), 500

if __name__ == '__main__':
    import threading
    schedule_thread = threading.Thread(target=run_schedule)
    schedule_thread.start()

<<<<<<< HEAD
    app.run(host="0.0.0.0", debug=True)
=======
    # Démarrer l'application Flask
    app.run(host="0.0.0.0",debug=False)
>>>>>>> 06f1725 (original push)
