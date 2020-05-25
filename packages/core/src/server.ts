import { ApolloServer } from 'apollo-server';
import * as path from "path";
import { buildSchemaSync } from "type-graphql";
import { GraphQLSchema } from "graphql";
import {createConnection, Connection} from "typeorm";
import { resolvers } from "../../api/src/resolvers/index";

const startServer = async () => {
    const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "test"
    });

    connection.connect();
}

startServer();

const schema: GraphQLSchema = buildSchemaSync({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, "../", "schema.gql"),
});

const server: ApolloServer = new ApolloServer({ schema });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});