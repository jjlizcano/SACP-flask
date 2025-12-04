import mysql.connector

def conectar_db():
    try:
        conexion = mysql.connector.connect(
            host='localhost',
            port=3307,
            user='root',
            password='M@ma2004ms', 
            database='consultorio_db'
        )
        return conexion
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None