import { Pool } from "pg";
import { Piloto } from "./piloto.entity";
import { PilotoRepository } from "./piloto.repository.interface";

export class PilotoRepositoryPostgres implements PilotoRepository {

    private client: Pool;

    constructor(client: Pool) {
        this.client = client;
    }

    private toPiloto(row: any): Piloto {
        return { ...row, id: String(row.id) };
    }

    async createPiloto(piloto: Omit<Piloto, 'id' | 'create_time'>): Promise<Piloto> {
        const query = `INSERT INTO "piloto" (name, nickname, team, nationality, birth_date, driver_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [
            piloto.nombre,
            piloto.apellido,
            piloto.escuderia,
            piloto.nacionalidad,
            piloto.fechaNacimiento,
            piloto.campeonatosGanados,
            piloto.victorias,
            piloto.podios,
            piloto.poles,
            piloto.puntos
        ];
        const result = await this.client.query(query, values);
        return this.toPiloto(result.rows[0]);
    }
    

    async getpilotoById(id: string): Promise<Piloto | null> {
        const result = await this.client.query('SELECT * FROM "piloto" WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            return this.toPiloto(result.rows[0]);
        }
        return null;
    }

    async getPilotos(): Promise<Piloto[]> {
        const result = await this.client.query('SELECT * FROM "piloto"');
        return result.rows.map(row => this.toPiloto(row));
    }

    async updatePiloto(id: string, piloto: Partial<Omit<Piloto, 'id' | 'create_time'>>): Promise<Piloto | null> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        Object.entries(piloto).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        });

        if (fields.length === 0) {
            return this.getpilotoById(id);
        }

        values.push(id);
        const query = `UPDATE "piloto" SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        const result = await this.client.query(query, values);

        if (result.rows.length > 0) {
            return this.toPiloto(result.rows[0]);
        }
        return null;
    }

    async deletePiloto(id: string): Promise<boolean> {
        const result = await this.client.query('DELETE FROM "piloto" WHERE id = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}