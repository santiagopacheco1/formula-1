import { equipo } from './equipos.entity';

export interface equipoRepository {
    createequipo(equipo: Omit<equipo, 'id' | 'create_time'>): Promise<equipo>;
    getequipoById(id: string): Promise<equipo | null>;
    getequipos(): Promise<equipo[]>;
    updateequipo(id: string, equipo: Partial<Omit<equipo, 'id' | 'create_time'>>): Promise<equipo | null>;
    deleteequipo(id: string): Promise<boolean>;
}