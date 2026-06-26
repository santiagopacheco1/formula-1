import express from 'express';
import { Pool } from 'pg';
import { config } from './config';
import { EquipoRoutes } from '../equipos/equipos.routes';
import { equipoController } from '../equipos/equipos.controller';
import { equipoService } from '../equipos/equipos.service';
import { EquiposRepositoryPostgres } from '../equipos/equipos.repository.postgres';

export class App {
    public readonly app: express.Express;
    private readonly database: { close: () => Promise<void> };

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        const pool = new Pool({
            user: process.env.POSTGRES_USER ?? 'postgres',
            host: process.env.POSTGRES_HOST ?? 'localhost',
            database: process.env.POSTGRES_DB ?? 'equipo_db',
            password: process.env.POSTGRES_PASSWORD ?? 'postgres',
            port: Number(process.env.POSTGRES_PORT ?? 5432),
        });

        const equipoRepository = new EquiposRepositoryPostgres(pool);
        const equipoServiceInstance = new equipoService(equipoRepository);
        const equipoControllerInstance = new equipoController(equipoServiceInstance);
        const equipoRoutes = new EquipoRoutes(equipoControllerInstance);

        this.app.get('/', (_req, res) => {
            res.json({ message: 'API Formula 1' });
        });

        this.app.use('/api', equipoRoutes.router);

        this.database = {
            close: async () => {
                await pool.end();
            },
        };

        console.log(`Server configured on port ${config.port}`);
    }

    public start() {
        this.app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }

    public async close() {
        await this.database.close();
    }
}
