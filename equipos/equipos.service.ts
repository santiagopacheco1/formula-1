import { equipo } from './equipos.entity';
import { CharacterRepository } from './character.repository.interface';

export class CharacterService {

    constructor(private readonly characterRepository: CharacterRepository) {}

    async getAllequipos(): Promise<equipo[]> {
        return await this.characterRepository.getCharacters();
    }

    async getEquipoById(id: string): Promise<equipo | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('Equipo ID is required');
        }

        const equipo = await this.characterRepository.getCharacterById(id);

        if (!equipo) {
            return null;
        }

        return equipo;
    }

    async createequipo(equipoData: Omit<equipo, 'id' | 'create_time'>): Promise<equipo> {
        this.validateEquipoData(equipoData);

        const equipo = await this.characterRepository.createCharacter(equipoData);

        return equipo;
    }

    async updateEquipo(id: string, equipoData: Partial<Omit<equipo, 'id' | 'create_time'>>): Promise<equipo | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('Equipo ID is required');
        }

        if (Object.keys(equipoData).length === 0) {
            throw new Error('No data provided for update');
        }

        if (equipoData.level !== undefined) {
            this.validateLevel(equipoData.level);
        }

        if (equipoData.experience_points !== undefined) {
            this.validateExperiencePoints(equipoData.experience_points);
        }

        if (equipoData.health_points !== undefined) {
            this.validateHealthPoints(equipoData.health_points);
        }

        const equipo = await this.characterRepository.updateCharacter(id, equipoData);

        return equipo;
    }

    async deleteEquipo(id: string): Promise<boolean> {
        if (!id || id.trim().length === 0) {
            throw new Error('Equipo ID is required');
        }

        const deleted = await this.characterRepository.deleteCharacter(id);

        return deleted;
    }

    private validateEquipoData(data: Omit<equipo, 'id' | 'create_time'>): void {
        if (!data.name || data.name.trim().length === 0) {
            throw new Error('Equipo name is required');
        }

        if (data.name.length > 100) {
            throw new Error('Equipo name must not exceed 100 characters');
        }

        this.validateLevel(data.level);
        this.validateExperiencePoints(data.experience_points);
        this.validateHealthPoints(data.health_points);
        this.validateManaPoints(data.mana_points);
        this.validateStats(data.strength, 'strength');
        this.validateStats(data.agility, 'agility');
        this.validateStats(data.intelligence, 'intelligence');
        this.validateStats(data.defense, 'defense');
    }

    private validateLevel(level: number): void {
        if (level < 1 || level > 100) {
            throw new Error('Equipo level must be between 1 and 100');
        }
    }

    private validateExperiencePoints(xp: number): void {
        if (xp < 0) {
            throw new Error('Experience points cannot be negative');
        }
    }

    private validateHealthPoints(hp: number): void {
        if (hp < 1) {
            throw new Error('Health points must be at least 1');
        }
    }

    private validateManaPoints(mp: number): void {
        if (mp < 0) {
            throw new Error('Mana points cannot be negative');
        }
    }

    private validateStats(value: number, statName: string): void {
        if (value < 1 || value > 100) {
            throw new Error(`${statName} must be between 1 and 100`);
        }
    }
}