import mysql.connector

class MySQLHelper:
    def __init__(self, host, port, user, password, database):
        self.connection = mysql.connector.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.connection.cursor()

    def insert_data(self, sql ,data):
        """
        Insère des données dans la table.
        :param data: Tuple contenant les données à insérer.
        """
      
        self.cursor.execute(sql, data)
        self.connection.commit()

    def search_data(self, sql):
        
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        return result

    def close_connection(self):
        """Ferme la connexion à la base de données."""
        self.cursor.close()
        self.connection.close()

# Exemple d'utilisation
def main():
    # Remplacez les valeurs suivantes par celles de votre configuration
    mysql_host = "localhost"
    mysql_port = 3306
    mysql_user = "root"
    mysql_password = "my-secret-pw"
    mysql_database = "ma_base_de_donnees"

    db_helper = MySQLHelper(
        host=mysql_host,
        port=mysql_port,
        user=mysql_user,
        password=mysql_password,
        database=mysql_database
    )

    # Insertion de données
    data_to_insert = ("John", 30, "Paris")
    db_helper.insert_data(data_to_insert)

    # Recherche de données
    search_criteria = "John"
    search_results = db_helper.search_data(search_criteria)

    print("Résultats de la recherche :")
    for record in search_results:
        print(record)

    # Fermeture de la connexion
    db_helper.close_connection()

if __name__ == "__main__":
    main()
