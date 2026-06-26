export interface PostgresConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export interface AppConfig {
    port: number;
    postgres: PostgresConfig;
}

export const config: AppConfig = {
    port: Number(process.env.PORT ?? 3000),
    postgres: {
        user: process.env.POSTGRES_USER ?? 'postgres',
        host: process.env.POSTGRES_HOST ?? 'localhost',
        database: process.env.POSTGRES_DB ?? 'f1_db',
        password: process.env.POSTGRES_PASSWORD ?? 'postgres',
        port: Number(process.env.POSTGRES_PORT ?? 5432),
    },

};
