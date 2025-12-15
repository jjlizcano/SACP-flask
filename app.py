from flask import Flask
from flask_cors import CORS

# rutas o blueprints
from routes.auth import auth_bp 
from routes.pacientes import pacientes_bp
from routes.citas import citas_bp

app = Flask(__name__)

# Configuración de CORS para permitir solicitudes desde el frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:3000"])
app.secret_key = 'super_secreto_desarrollo' # Clave para sesiones (en producción, usar variable de entorno)

# Registro de blueprints
# Login queda en: http://localhost:5000/auth/login
app.register_blueprint(auth_bp, url_prefix='/auth')

# Pacientes queda en: http://localhost:5000/api/pacientes
app.register_blueprint(pacientes_bp, url_prefix='/api')

# Citas queda en: http://localhost:5000/api/citas
app.register_blueprint(citas_bp, url_prefix='/api')

@app.route('/')
def index():
    return {"message": "Servidor Flask SACP corriendo correctamente 🚀"}

if __name__ == '__main__':
    # Arranca el servidor en el puerto 5000
    app.run(debug=True, port=5000)