from flask import Flask
from flask_cors import CORS

# Importamos los 3 blueprints
from routes.auth import auth_bp 
from routes.pacientes import pacientes_bp
from routes.citas import citas_bp

app = Flask(__name__)

CORS(app, supports_credentials=True)
app.secret_key = 'super_secreto_desarrollo'

# REGISTRO DE RUTAS
app.register_blueprint(auth_bp, url_prefix='/auth')      # Login -> /auth/login
app.register_blueprint(pacientes_bp, url_prefix='/api')  # Pacientes -> /api/pacientes
app.register_blueprint(citas_bp, url_prefix='/api')      # Citas -> /api/citas

@app.route('/')
def index():
    return {"message": "API SACP funcionando correctamente"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)