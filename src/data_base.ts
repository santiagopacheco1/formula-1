import { Pool } from 'pg';

export interface DatabaseProvider {
    pool: Pool;
    close: () => Promise<void>;
}

export function createDatabaseProvider(): DatabaseProvider {
    const pool = new Pool({
        user: process.env.POSTGRES_USER ?? 'postgres',
        host: process.env.POSTGRES_HOST ?? 'localhost',
        database: process.env.POSTGRES_DB ?? 'characters_db',
        password: process.env.POSTGRES_PASSWORD ?? 'postgres',
        port: Number(process.env.POSTGRES_PORT ?? 5432),
    });

    return {
        pool,
        close: async () => {
            await pool.end();
        },
    };
}
