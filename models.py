import mysql.connector
from db import conectar_db

class UsuarioModel:
    def login(self, username, password): # Verificación si el usuario y contraseña coinciden
        conn = conectar_db()
        usuario = None
        if conn: 
            try:
                cursor = conn.cursor(dictionary=True) # Obtener resultados como diccionario
                sql = "SELECT * FROM usuarios WHERE username = %s AND password = %s"
                cursor.execute(sql, (username, password))
                usuario = cursor.fetchone()
            except mysql.connector.Error as err:
                print(f"Error en login: {err}")
            finally:
                cursor.close()
                conn.close()
        return usuario

class PacienteModel:
    def registrar(self, documento, nombre, telefono, email): # Registro de pacientes
        conn = conectar_db()
        if conn:
            try:
                cursor = conn.cursor()
                sql = """
                    INSERT INTO pacientes (documento, nombre, telefono, email)
                    VALUES (%s, %s, %s, %s)
                """ # La fecha de registro se maneja automáticamente en la base de datos
                cursor.execute(sql, (documento, nombre, telefono, email))
                conn.commit()
                return True
            except mysql.connector.Error as err:
                print(f"Error al registrar paciente: {err}")
                return False
            finally:
                cursor.close()
                conn.close()

    def obtener_todos(self): # Obtener todos los pacientes
        conn = conectar_db()
        pacientes = []
        if conn:
            try:
                cursor = conn.cursor(dictionary=True)
                cursor.execute("SELECT * FROM pacientes")
                pacientes = cursor.fetchall()
            except mysql.connector.Error as err:
                print(f"Error al obtener pacientes: {err}")
            finally:
                cursor.close()
                conn.close()
        return pacientes
    
    def actualizar(self, documento_original, nuevo_documento, nombre, telefono, email): # Actualizar datos del paciente
        conn = conectar_db()
        if conn:
            try:
                cursor = conn.cursor()
                sql = """
                    UPDATE pacientes 
                    SET documento = %s, nombre = %s, telefono = %s, email = %s 
                    WHERE documento = %s
                """
                cursor.execute(sql, (nuevo_documento, nombre, telefono, email, documento_original))
                conn.commit()
                return True
            except mysql.connector.Error as err:
                print(f"Error actualizar paciente: {err}")
                return False
            finally:
                cursor.close()
                conn.close()

    def eliminar(self, documento): # Eliminar un paciente (y sus citas asociadas)
        conn = conectar_db()
        if conn:
            try:
                cursor = conn.cursor()
                sql = "DELETE FROM pacientes WHERE documento = %s"
                cursor.execute(sql, (documento,))
                conn.commit()
                return True
            except mysql.connector.Error as err:
                print(f"Error eliminar paciente: {err}")
                return False
            finally:
                cursor.close()
                conn.close()
    
    def buscar_por_documento(self, documento): # Busca un paciente específico (útil para validar antes de crear cita)
        conn = conectar_db()
        paciente = None
        if conn:
            try:
                cursor = conn.cursor(dictionary=True)
                cursor.execute("SELECT * FROM pacientes WHERE documento = %s", (documento,))
                paciente = cursor.fetchone()
            except mysql.connector.Error as err:
                print(f"Error búsqueda: {err}")
            finally:
                cursor.close()
                conn.close()
        return paciente

class CitaModel:
    def crear_cita(self, paciente_documento, fecha_cita, motivo): # Crear una nueva cita
        conn = conectar_db()
        if conn:
            try:
                cursor = conn.cursor()
                sql = """
                    INSERT INTO citas (paciente_id, fecha_cita, motivo) 
                    VALUES (%s, %s, %s)
                """
                # paciente_id en la tabla citas referencia a pacientes(documento)
                cursor.execute(sql, (paciente_documento, fecha_cita, motivo))
                conn.commit()
                return True
            except mysql.connector.Error as err:
                print(f"Error al crear cita: {err}")
                return False
            finally:
                cursor.close()
                conn.close()

    def obtener_citas_detalladas(self): # Obtener todas las citas con detalles del paciente
        conn = conectar_db()
        citas = []
        if conn:
            try:
                cursor = conn.cursor(dictionary=True)
                # Hacemos JOIN para traer el nombre del paciente usando el documento
                sql = """
                    SELECT c.id, p.nombre, p.documento, c.fecha_cita, c.motivo, c.estado 
                    FROM citas c
                    JOIN pacientes p ON c.paciente_id = p.documento
                    ORDER BY c.fecha_cita ASC
                """
                cursor.execute(sql)
                citas = cursor.fetchall()
            except mysql.connector.Error as err:
                print(f"Error al obtener citas: {err}")
            finally:
                cursor.close()
                conn.close()
        return citas
    
    def actualizar_cita(self, id_cita, fecha_cita, motivo, estado):
        conn = conectar_db()
        if conn:
            try:
                cursor = conn.cursor()
                sql = """
                    UPDATE citas 
                    SET fecha_cita = %s, motivo = %s, estado = %s 
                    WHERE id = %s
                """
                cursor.execute(sql, (fecha_cita, motivo, estado, id_cita))
                conn.commit()
                return True
            except mysql.connector.Error as err:
                print(f"Error actualizar cita: {err}")
                return False
            finally:
                cursor.close()
                conn.close()
    
    def eliminar_cita(self, id_cita):
        conn = conectar_db()
        if conn:
            try:
                cursor = conn.cursor()
                sql = "DELETE FROM citas WHERE id = %s"
                cursor.execute(sql, (id_cita,))
                conn.commit()
                return True
            except mysql.connector.Error as err:
                print(f"Error eliminar cita: {err}")
                return False
            finally:
                cursor.close()
                conn.close()