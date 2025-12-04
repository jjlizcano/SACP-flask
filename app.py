from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp 

app = Flask(__name__)

CORS(app, supports_credentials=True) # supports_credentials es necesario para sesiones
app.secret_key = 'super_secreto_desarrollo' # Clave para sesiones, en producción estaría en variable de entorno
app.register_blueprint(auth_bp, url_prefix='/auth') # Todas las rutas de auth empiezan con /auth

@app.route('/')
def index():
    return {"message": "API del Consultorio funcionando correctamente"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)