from flask import Blueprint, request, jsonify
from models import PacienteModel

pacientes_bp = Blueprint('pacientes', __name__)

# Ruta para obtener un paciente por su documento (GET)
@pacientes_bp.route('/pacientes/<documento>', methods=['GET'])
def get_paciente(documento):
    modelo = PacienteModel()
    paciente = modelo.buscar_por_documento(documento)
    
    if paciente:
        return jsonify(paciente), 200
    else:
        return jsonify({"success": False, "message": "Paciente no encontrado"}), 404
    
# Ruta para obtener todos los pacientes (GET)
@pacientes_bp.route('/pacientes', methods=['GET'])
def get_pacientes():
    modelo = PacienteModel()
    pacientes = modelo.obtener_todos()
    return jsonify(pacientes), 200

# Ruta para registrar un paciente (POST)
@pacientes_bp.route('/pacientes', methods=['POST'])
def add_paciente():
    data = request.get_json()
    
    # Validar datos
    if not data or 'documento' not in data or 'nombre' not in data:
        return jsonify({"success": False, "message": "Faltan datos obligatorios"}), 400

    documento = data.get('documento')
    nombre = data.get('nombre')
    telefono = data.get('telefono')
    email = data.get('email')

    modelo = PacienteModel()
    
    # Validar si ya existe
    if modelo.buscar_por_documento(documento):
        return jsonify({"success": False, "message": "El paciente ya existe"}), 400

    exito = modelo.registrar(documento, nombre, telefono, email)

    if exito:
        return jsonify({"success": True, "message": "Paciente registrado exitosamente"}), 201
    else:
        return jsonify({"success": False, "message": "Error interno al registrar"}), 500

# Ruta para actualizar un paciente (PUT)
@pacientes_bp.route('/pacientes/<documento>', methods=['PUT'])
def update_paciente(documento):
    data = request.get_json()
    modelo = PacienteModel()

    # Verificar si el paciente existe
    if not modelo.buscar_por_documento(documento):
        return jsonify({"success": False, "message": "Paciente no encontrado"}), 404

    # Datos a actualizar
    nuevo_documento = data.get('documento', documento) # Si no envían nuevo, se mantiene el viejo
    nombre = data.get('nombre')
    telefono = data.get('telefono')
    email = data.get('email')

    exito = modelo.actualizar(documento, nuevo_documento, nombre, telefono, email)

    if exito:
        return jsonify({"success": True, "message": "Paciente actualizado"}), 200
    else:
        return jsonify({"success": False, "message": "Error al actualizar"}), 500

# Ruta para eliminar un paciente (DELETE)
@pacientes_bp.route('/pacientes/<documento>', methods=['DELETE'])
def delete_paciente(documento):
    modelo = PacienteModel()
    
    if not modelo.buscar_por_documento(documento):
        return jsonify({"success": False, "message": "Paciente no encontrado"}), 404

    exito = modelo.eliminar(documento)

    if exito:
        return jsonify({"success": True, "message": "Paciente eliminado"}), 200
    else:
        return jsonify({"success": False, "message": "Error al eliminar"}), 500