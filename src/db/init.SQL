-- Create equipo table
CREATE TABLE IF NOT EXISTS "equipo" (
    id SERIAL PRIMARY KEY,
    create_time TIMESTAMP NOT NULL DEFAULT NOW(),
    nombre VARCHAR(50) NOT NULL,
    jefedeequipo VARCHAR(50),
    presidente VARCHAR(50),
    pais VARCHAR(50),
    campeonatosdepilotosganados INTEGER NOT NULL DEFAULT 0,
    campeonatosdeconstructoresganados INTEGER NOT NULL DEFAULT 0,
    campeonatoscorridos INTEGER NOT NULL DEFAULT 0,
    fechadefundacion DATE,
    logo TEXT
);

-- Create piloto table
CREATE TABLE IF NOT EXISTS "piloto" (
    id SERIAL PRIMARY KEY,
    create_time TIMESTAMP NOT NULL DEFAULT NOW(),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    escuderia VARCHAR(100) NOT NULL,
    campeonatosGanados INTEGER NOT NULL DEFAULT 0,
    victorias INTEGER NOT NULL DEFAULT 0,
    podios INTEGER NOT NULL DEFAULT 0,
    poles INTEGER NOT NULL DEFAULT 0,
    puntos INTEGER NOT NULL DEFAULT 0
);
