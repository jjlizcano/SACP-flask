CREATE DATABASE consultorio_db;
USE consultorio_db;

-- Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(100)
);

-- Pacientes
CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id VARCHAR(20) NOT NULL,
    fecha_cita DATETIME NOT NULL,
    motivo TEXT,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    
    FOREIGN KEY (paciente_id) REFERENCES pacientes(documento) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);


-- DATOS DE PRUEBA

INSERT INTO usuarios (username, password, nombre_completo) 
VALUES ('admin', '1234', 'Secretaria Principal');

-- Insertamos pacientes con cédulas (ficticias)
INSERT INTO pacientes (id, nombre, telefono, email) 
VALUES 
('1098765432', 'Juan Perez', '3001234567', 'juan@email.com'),
('9876543210', 'Ana Gomez', '3109876543', 'ana@email.com');

-- Insertamos citas vinculadas a esas cédulas
INSERT INTO citas (paciente_id, fecha_cita, motivo, estado)
VALUES 
('1098765432', '2023-12-01 10:00:00', 'Ansiedad Generalizada', 'Pendiente'),
('9876543210', '2023-12-01 11:00:00', 'Terapia de Pareja', 'Pendiente');