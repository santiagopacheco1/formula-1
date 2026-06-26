import { Pool } from "pg";
import { equipo } from "./equipos.entity";
import { equipoRepository } from "./equipos.repository.interface";

export class EquiposRepositoryPostgres implements equipoRepository {

    private client: Pool;

    constructor(client: Pool) {
        this.client = client;
    }

    private toEquipo(row: any): equipo {
        return { ...row, id: String(row.id) };
    }

    async createequipo(equipo: Omit<equipo, 'id' | 'create_time'>): Promise<equipo> {
        const query = `INSERT INTO "equipo" (nombre, jefedeequipo, presidente, pais, fechadefundacion, campeonatosganados, campeonatoscorridos, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        const values = [
            equipo.nombre,
            equipo.jefedeequipo,
            equipo.presidente,
            equipo.pais,
            equipo.fechadefundacion,
            equipo.campeonatosdepilotosganados,
            equipo.campeonatosdeconstructoresganados,
            equipo.campeonatoscorridos,
            equipo.logo
        ];
        const result = await this.client.query(query, values);
        return this.toEquipo(result.rows[0]);
    }

    async getequipoById(id: string): Promise<equipo | null> {
        const result = await this.client.query('SELECT * FROM "equipo" WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            return this.toEquipo(result.rows[0]);
        }
        return null;
    }

    async getequipos(): Promise<equipo[]> {
        const result = await this.client.query('SELECT * FROM "equipo"');
        return result.rows.map(row => this.toEquipo(row));
    }

    async updateequipo(id: string, equipo: Partial<Omit<equipo, 'id' | 'create_time'>>): Promise<equipo | null> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        Object.entries(equipo).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        });

        if (fields.length === 0) {
            return this.getequipoById(id);
        }

        values.push(id);
        const query = `UPDATE "equipo" SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        const result = await this.client.query(query, values);

        if (result.rows.length > 0) {
            return this.toEquipo(result.rows[0]);
        }
        return null;
    }

    async deleteequipo(id: string): Promise<boolean> {
        const result = await this.client.query('DELETE FROM "equipo" WHERE id = $1', [id]);
        return result.rowCount !== null && result.rowCount > 0;
    }
}