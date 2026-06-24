import { Piloto } from './piloto.entity';
import { PilotoRepository } from './piloto.repository.interface';

export class PilotoService {

    constructor(private readonly pilotoRepository: PilotoRepository) {}

    async getAllPilotos(): Promise<Piloto[]> {
        return await this.pilotoRepository.getPilotos();
    }

    async getPilotoById(id: string): Promise<Piloto | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('Piloto ID is required');
        }

        const piloto = await this.pilotoRepository.getPilotoById(id);

        if (!piloto) {
            return null;
        }

        return piloto;
    }

    async createPiloto(pilotoData: Omit<Piloto, 'id' | 'create_time'>): Promise<Piloto> {
        this.validatePilotoData(pilotoData);

        const piloto = await this.pilotoRepository.createPiloto(pilotoData);

        return piloto;
    }

    async updatePiloto(id: string, pilotoData: Partial<Omit<Piloto, 'id' | 'create_time'>>): Promise<Piloto | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('Piloto ID is required');
        }

        if (Object.keys(pilotoData).length === 0) {
            throw new Error('No data provided for update');
        }

        if (pilotoData.nombre !== undefined) {
            this.validateNombre(pilotoData.nombre);
        }

        if (pilotoData.apellido !== undefined) {
            this.validateApellido(pilotoData.apellido);
        }

        if (pilotoData.nacionalidad !== undefined) {
            this.validateNacionalidad(pilotoData.nacionalidad);
        }

        if (pilotoData.fechaNacimiento !== undefined) {
            this.validateFechaNacimiento(pilotoData.fechaNacimiento);
        }

         if (pilotoData.escuderia !== undefined) {
            this.validateEscuderia(pilotoData.escuderia);
        }

        if (pilotoData.campeonatosGanados !== undefined) {
            this.validateCampeonatosGanados(pilotoData.campeonatosGanados);
        }

        if (pilotoData.victorias !== undefined) {
            this.validateVictorias(pilotoData.victorias);
        }

        if (pilotoData.podios !== undefined) {
            this.validatePodios(pilotoData.podios);
        }

        if (pilotoData.poles !== undefined) {
            this.validatePoles(pilotoData.poles);
        }
        if (pilotoData.puntos !== undefined) {
            this.validatePuntos(pilotoData.puntos);
        }

        const piloto = await this.pilotoRepository.updatePiloto(id, pilotoData);

        return piloto;
    }

    async deletePiloto(id: string): Promise<boolean> {
        if (!id || id.trim().length === 0) {
            throw new Error('Piloto ID is required');
        }

        const deleted = await this.pilotoRepository.deletePiloto(id);

        return deleted;
    }

    private validatePilotoData(data: Omit<Piloto, 'id' | 'create_time'>): void {
        if (!data.nombre || data.nombre.trim().length === 0) {
            throw new Error('Piloto name is required');
        }

        if (data.nombre.length > 100) {
            throw new Error('Piloto name must not exceed 100 characters');
        }

        this.validateNombre(data.nombre);
        this.validateApellido(data.apellido);
        this.validateNacionalidad(data.nacionalidad);
        this.validateFechaNacimiento(data.fechaNacimiento);
        this.validateEscuderia(data.escuderia);
        this.validateCampeonatosGanados(data.campeonatosGanados);
        this.validateVictorias(data.victorias);
        this.validatePodios(data.podios);
        this.validatePoles(data.poles);
        this.validatePuntos(data.puntos);
    }

    private validateNombre(nombre: string): void {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('Piloto name is required');
        }
        if (nombre.length > 100) {
            throw new Error('Piloto name must not exceed 100 characters');
        }
    }

    private validateApellido(apellido: string): void {
        if (!apellido || apellido.trim().length === 0) {
            throw new Error('Piloto apellido is required');
        }
        if (apellido.length > 100) {
            throw new Error('Piloto apellido must not exceed 100 characters');
        }
    }

    private validateNacionalidad(nacionalidad: string): void {
        if (!nacionalidad || nacionalidad.trim().length === 0) {
            throw new Error('Piloto nacionalidad is required');
        }
        if (nacionalidad.length > 100) {
            throw new Error('Piloto nacionalidad must not exceed 100 characters');
        }
    }

    private validateFechaNacimiento(fechaNacimiento: Date): void {
        if (!fechaNacimiento) {
            throw new Error('Piloto fecha de nacimiento is required');
        }
    }

    private validateEscuderia(escuderia: string): void {
        if (!escuderia || escuderia.trim().length === 0) {
            throw new Error('Piloto escuderia is required');
        }
        if (escuderia.length > 100) {
            throw new Error('Piloto escuderia must not exceed 100 characters');
        }
    }

    private validateCampeonatosGanados(campeonatosGanados: number): void {
        if (campeonatosGanados < 0) {
            throw new Error('Piloto campeonatos ganados cannot be negative');
        }

    }
    private validateVictorias(victorias: number): void {
        if (victorias < 0) {
            throw new Error('Piloto victorias cannot be negative');
        }
    }

    private validatePodios(podios: number): void {
        if (podios < 0) {
            throw new Error('Piloto podios cannot be negative');
        }
    }

    private validatePoles(poles: number): void {
        if (poles < 0) {
            throw new Error('Piloto poles cannot be negative');
        }
    }

    private validatePuntos(puntos: number): void {
        if (puntos < 0) {
            throw new Error('Piloto puntos cannot be negative');
        }
    }
}
