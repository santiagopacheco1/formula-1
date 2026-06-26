import { equipo } from './equipos.entity';
import { equipoRepository } from './equipos.repository.interface';

export class equipoService {

    constructor(private readonly equipoRepository: equipoRepository) {}

    async getAllequipos(): Promise<equipo[]> {
        return await this.equipoRepository.getequipos();
    }

    async getequipoById(id: string): Promise<equipo | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('Equipo ID is required');
        }

        const equipo = await this.equipoRepository.getequipoById(id);

        if (!equipo) {
            return null;
        }

        return equipo;
    }

    async createequipo(equipoData: Omit<equipo, 'id' | 'create_time'>): Promise<equipo> {
        this.validateEquipoData(equipoData);

        const equipo = await this.equipoRepository.createequipo(equipoData);

        return equipo;
    }

    async updateequipo(id: string, equipoData: Partial<Omit<equipo, 'id' | 'create_time'>>): Promise<equipo | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('Equipo ID is required');
        }

        if (Object.keys(equipoData).length === 0) {
            throw new Error('No data provided for update');
        }

        const equipo = await this.equipoRepository.updateequipo(id, equipoData);

        return equipo;
    }

    async deleteequipo(id: string): Promise<boolean> {
        if (!id || id.trim().length === 0) {
            throw new Error('Equipo ID is required');
        }

        const deleted = await this.equipoRepository.deleteequipo(id);

        return deleted;
    }

    private validateEquipoData(data: Omit<equipo, 'id' | 'create_time'>): void {
        if (!data.nombre || data.nombre.trim().length === 0) {
            throw new Error('nombre del equipo is required');
        }

        if (data.nombre.length > 50) {
            throw new Error('nombre del equipo must not exceed 50 caracteres');
        }
        this.validatejefedeequipo(data.jefedeequipo);
        this.validatepresidente(data.presidente);
        this.validatepais(data.pais);
        this.validatefechadefundacion(data.fechadefundacion);
        this.validatecampeonatosdepilotosganados(data.campeonatosdepilotosganados);
        this.validatecampeonatosdeconstructoresganados(data.campeonatosdeconstructoresganados);
        this.validatecampeonatoscorridos(data.campeonatoscorridos);
    }

    private validatecampeonatosdepilotosganados(campeonatosGanados: number): void {
        if (campeonatosGanados < 0) {
            throw new Error('campeonatos de pilotos ganados del equipo cannot be negative');
        }
    }

    private validatecampeonatosdeconstructoresganados(campeonatosGanados: number): void {
        if (campeonatosGanados < 0) {
            throw new Error('campeonatos de constructores ganados del equipo cannot be negative');
        }
    }

    private validatecampeonatoscorridos(campeonatosCorridos: number): void {
        if (campeonatosCorridos < 0) {
            throw new Error('campeonatos corridos del equipo cannot be negative');
        }
    }

    private validatejefedeequipo(jefedeequipo: string): void {
        if (!jefedeequipo || jefedeequipo.trim().length === 0) {
            throw new Error('jefe de equipo is required');
        }
        if (jefedeequipo.length > 50) {
            throw new Error('jefe de equipo must not exceed 50 characters');
        }
    }

    private validatepais(pais: string): void {
        if (!pais || pais.trim().length === 0) {
        throw new Error('país del equipo is required');
        }
        if (pais.length > 50) {
        throw new Error('país del equipo must not exceed 50 characters');
        }
    }

    private validatepresidente(presidente: string): void {
        if (!presidente || presidente.trim().length === 0) {
            throw new Error('presidente de equipo is required');
        }
        if (presidente.length > 50) {
            throw new Error('presidente de equipo must not exceed 50 characters');
        }
    }

    private validatefechadefundacion(fechadefundacion: Date): void {
        if (!fechadefundacion) {
            throw new Error('fecha de la fundacion is required');
        }
    }

}




    