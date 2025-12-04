// knexfile.js
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from "dotenv";
dotenv.config();
export default {
    development: {
        client: "postgresql",
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: false,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },
};
