-- Create equipo table
CREATE TABLE IF NOT EXISTS "equipo" (
    id SERIAL PRIMARY KEY,
    create_time TIMESTAMP NOT NULL DEFAULT NOW(),
    nombre VARCHAR(50) NOT NULL,
    jefeequipo VARCHAR(50),
    precidente VARCHAR(50),
    pais VARCHAR(50),
    campeonatosdepilotosganados INTEGER NOT NULL DEFAULT 0,
    campeonatosdeconstructoresganados INTEGER NOT NULL DEFAULT 0,
    campeonatoscorridos INTEGER NOT NULL DEFAULT 0,
    fechadefundacion DATE,
    logo TEXT,
);

-- Insert sample data
INSERT INTO "equipo" 
(nombre, jefeequipo, precidente, pais, campeonatosdepilotosganados, campeonatosdeconstructoresganados, campeonatoscorridos, fechadefundacion, logo)
VALUES 
('Ferrari', 'Fred Vasseur', 'John Elkann', 'Italia', 15, 16, 1094, 1929, 'logo_ferrari.png'),
('Mercedes', 'Toto Wolff', 'Toto Wolff', 'Alemania', 9, 8, 311, 1954, 'logo_mercedes.png'),
('McLaren', 'Andrea Stella', 'Zak Brown', 'Reino Unido', 13, 10, 968, 1963, 'logo_mclaren.png'),
('Alpine', 'Flavio Briatore', 'Philippe Krief', 'Francia', 0, 0, 84, 2021, 'logo_alpine.png');
