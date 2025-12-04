from flask import Blueprint, request, jsonify, session
from models import UsuarioModel

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() # En React, enviamos JSON
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"success": False, "message": "Datos incompletos"}), 400

    username = data['username']
    password = data['password']
    
    modelo = UsuarioModel()
    usuario = modelo.login(username, password)
    
    if usuario:
        session['username'] = usuario['username']
        session['nombre_completo'] = usuario['nombre_completo']
        
        return jsonify({
            "success": True, 
            "message": "Login exitoso",
            "user": {
                "username": usuario['username'],
                "nombre_completo": usuario['nombre_completo']
            }
        }), 200
    else:
        return jsonify({"success": False, "message": "Usuario o contraseña incorrectos"}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True, "message": "Sesión cerrada"}), 200

@auth_bp.route('/check-session', methods=['GET']) # Verifica si hay sesión activa
def check_session():
    if 'username' in session:
        return jsonify({
            "authenticated": True, 
            "user": {
                "username": session['username'],
                "nombre_completo": session['nombre_completo']
            }
        }), 200
    else:
        return jsonify({"authenticated": False}), 401