import "reflect-metadata";
import * as path from "path";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server';
import { config as dotenvConfig } from "dotenv";
import { resolvers } from "../../api/src/resolvers/index";
import { getLocallyConnection } from ".//database-connection/database-connection";

// const startServer = async (): Promise<void> => {
//     dotenvConfig({ path: "../.env" });
//     createConnection({
//         logger: "advanced-console",
//         logging: "all",
//         type: "postgres",
//         host: process.env.DATABASE_HOST,
//         port: Number(process.env.DATABASE_PORT),
//         username: process.env.DATABASE_USERNAME,
//         password: process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE_NAME,
//         entities,
//         synchronize: true,
//     }).then(async connection => {
//         connection && console.info("1) Database connected");

//         const schema: GraphQLSchema = await buildSchema({
//             resolvers,
//             emitSchemaFile: path.resolve(__dirname, "../", "schema.gql")
//         });
//         const server: ApolloServer = new ApolloServer({ schema });

//         await server.listen(process.env.SERVER_PORT);
//         console.log(`2) Server has been started at ${process.env.SERVER_PORT} port`);

//         const b = await getRepository(UserEntity).find();
//         console.info(b);

//     }).catch(error => console.log(`!) Starting server failed: ${error}`));
// };

const startServer = async (): Promise<void> => {
    dotenvConfig({ path: "../.env" });
    await getLocallyConnection();

    const schema: GraphQLSchema = await buildSchema({
        resolvers,
        emitSchemaFile: path.resolve(__dirname, "../", "schema.gql")
    });
    const server: ApolloServer = new ApolloServer({
        schema,
        // formatError: (error: any) => ({ message: error.message, statusCode: error.statusCode })
    });

    await server.listen(process.env.SERVER_PORT);
    console.log(`Server has been started at ${process.env.SERVER_PORT} port`);
};

startServer();
