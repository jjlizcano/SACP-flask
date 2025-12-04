from flask import Blueprint, request, jsonify
from models import CitaModel, PacienteModel

citas_bp = Blueprint('citas', __name__)

# Obtener todas las citas (GET)
@citas_bp.route('/citas', methods=['GET'])
def get_citas():
    modelo = CitaModel()
    citas = modelo.obtener_citas_detalladas()
    return jsonify(citas), 200

# Crear una nueva cita (POST)
@citas_bp.route('/citas', methods=['POST'])
def add_cita():
    data = request.get_json()
    
    # Validaciones
    if not data or 'paciente_id' not in data or 'fecha_cita' not in data:
        return jsonify({"success": False, "message": "Faltan datos (paciente_id, fecha_cita)"}), 400

    paciente_documento = data['paciente_id'] # El id del paciente es su documento
    fecha_cita = data['fecha_cita']
    motivo = data.get('motivo', 'Consulta General') # Si motivo viene vacío, queda como 'Consulta General'

    # Verificar que el paciente exista antes de crear la cita
    paciente_model = PacienteModel()
    if not paciente_model.buscar_por_documento(paciente_documento):
        return jsonify({"success": False, "message": "El paciente no existe. Regístrelo primero."}), 404

    # Crear la cita
    modelo = CitaModel()
    exito = modelo.crear_cita(paciente_documento, fecha_cita, motivo)

    if exito:
        return jsonify({"success": True, "message": "Cita agendada correctamente"}), 201
    else:
        return jsonify({"success": False, "message": "Error al guardar la cita"}), 500

# Actualizar una cita (PUT)
# Permite cambiar fecha, motivo o estado (ej: de 'Pendiente' a 'Realizada')
@citas_bp.route('/citas/<int:id>', methods=['PUT'])
def update_cita(id):
    data = request.get_json()
    
    fecha_cita = data.get('fecha_cita')
    motivo = data.get('motivo')
    estado = data.get('estado')

    # Validar que al menos envíen algo para actualizar
    if not any([fecha_cita, motivo, estado]):
        return jsonify({"success": False, "message": "No se enviaron datos para actualizar"}), 400
    
    # NOTA: Para simplificar, aquí asumimos que se envían los 3 datos. 
    # En un sistema real, primero leería la cita actual para no borrar datos si alguno viene vacío.
    # Por ahora hay que asegurarse de enviar los 3 campos desde el Frontend o Postman.

    modelo = CitaModel()
    exito = modelo.actualizar_cita(id, fecha_cita, motivo, estado)

    if exito:
        return jsonify({"success": True, "message": "Cita actualizada"}), 200
    else:
        return jsonify({"success": False, "message": "Error al actualizar la cita"}), 500

# Eliminar una cita (DELETE)
@citas_bp.route('/citas/<int:id>', methods=['DELETE'])
def delete_cita(id):
    modelo = CitaModel()
    exito = modelo.eliminar_cita(id)

    if exito:
        return jsonify({"success": True, "message": "Cita eliminada"}), 200
    else:
        return jsonify({"success": False, "message": "Error al eliminar la cita"}), 500