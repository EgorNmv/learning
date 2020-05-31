import "reflect-metadata";
import * as path from "path";
import {GraphQLSchema} from "graphql";
import {buildSchema} from "type-graphql";
import {ApolloServer} from 'apollo-server';
import {config as dotenvConfig} from "dotenv";
import {resolvers} from "../../api/src/resolvers";
import {getLocallyConnection} from "./database-connection/database-connection";
import {Context} from "../../api/src/objects/context";


const startServer = async (): Promise<void> => {
    dotenvConfig({path: "../.env"});

    const context: Context = {
        connection: await getLocallyConnection()
    };
    const schema: GraphQLSchema = await buildSchema({
        resolvers,
        emitSchemaFile: path.resolve(__dirname, "../", "schema.gql")
    });
    const server: ApolloServer = new ApolloServer({
        schema,
        context,
        // formatError: (error: any) => ({ message: error.message, statusCode: error.statusCode })
    });

    await server.listen(process.env.SERVER_PORT || 4000);
    console.log(`Server has been started at ${process.env.SERVER_PORT} port`);
};

startServer();
