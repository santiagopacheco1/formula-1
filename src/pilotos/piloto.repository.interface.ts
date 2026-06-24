import { Piloto } from "./piloto.entity";

export interface PilotoRepository {
    createPiloto(piloto: Omit<Piloto, 'id' | 'create_time'>): Promise<Piloto>;
    getPilotoById(id: string): Promise<Piloto | null>;
    getPilotos(): Promise<Piloto[]>;
    updatePiloto(id: string, piloto: Partial<Omit<Piloto, 'id' | 'create_time'>>): Promise<Piloto | null>;
    deletePiloto(id: string): Promise<boolean>;
}