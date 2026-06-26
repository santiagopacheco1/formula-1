import express from 'express';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { config } from './config';
import { EquipoRoutes } from '../equipos/equipos.routes';
import { equipoController } from '../equipos/equipos.controller';
import { equipoService } from '../equipos/equipos.service';
import { EquiposRepositoryPostgres } from '../equipos/equipos.repository.postgres';

export class App {
    public readonly app: express.Express;
    private readonly database: { close: () => Promise<void> };
    private readonly pool: Pool;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.pool = new Pool(config.postgres);

        const equipoRepository = new EquiposRepositoryPostgres(this.pool);
        const equipoServiceInstance = new equipoService(equipoRepository);
        const equipoControllerInstance = new equipoController(equipoServiceInstance);
        const equipoRoutes = new EquipoRoutes(equipoControllerInstance);

        this.app.get('/', (_req, res) => {
            res.json({ message: 'API Formula 1' });
        });

        this.app.use('/api', equipoRoutes.router);

        this.database = {
            close: async () => {
                await this.pool.end();
            },
        };

        console.log(`Server configured on port ${config.port}`);
    }

    private async initializeDatabase(): Promise<void> {
        const initSqlPath = path.resolve(__dirname, 'db', 'init.SQL');
        const sql = fs.readFileSync(initSqlPath, 'utf8');
        const statements = sql
            .split(/;\s*\n/)
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        for (const statement of statements) {
            await this.pool.query(statement);
        }
    }

    public async start() {
        await this.initializeDatabase();

        this.app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }

    public async close() {
        await this.database.close();
    }
}
