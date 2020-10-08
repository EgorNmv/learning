import "reflect-metadata";
import { createConnection, Connection, getConnection } from "typeorm";
import { entities } from "../../../api/src/objects/entities/index";

export async function getLocallyConnection(): Promise<Connection> {
    try {
        const connection: Connection = getConnection();

        if (connection && !connection.isConnected) {
            console.log("Connection to Database are already exists");
            await connection.connect();
        };

        return connection;
    } catch (error) {
        const connection: Connection = await createConnection({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities,
            synchronize: true,
        });

        console.log("Created new connection to Database");
        return connection;
    }
}