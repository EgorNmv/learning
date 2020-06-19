import "reflect-metadata";
import * as path from "path";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { config as dotenvConfig } from "dotenv";
import { resolvers } from "../../api/src/resolvers";
import { getLocallyConnection } from "./database-connection/database-connection";
import { Context } from "../../api/src/objects/context";
import { ApolloServer } from "apollo-server-express";
import express = require('express');
import fileRoutes from "../../api/src/routes/file.routes";
import cors = require("cors");

const startServer = async (): Promise<void> => {
    dotenvConfig({ path: "../.env" });

    const context: Context = {
        connection: await getLocallyConnection(),
    };
    const schema: GraphQLSchema = await buildSchema({
        resolvers,
        emitSchemaFile: path.resolve(__dirname, "../", "schema.gql")
    });
    const server: ApolloServer = new ApolloServer({
        schema,
        context,
        introspection: true,
        // uploads: { maxFieldSize: 10000000, maxFiles: 20 } // disable apollo upload property
    });
    const app = express();

    app.use(cors());
    app.use("/file", fileRoutes);
    app.use(express.static("../../../uploads"));

    server.applyMiddleware({
        app, path: "/"
    });


    app.listen(process.env.SERVER_PORT || 4000);
    console.log(`Server has been started at ${process.env.SERVER_PORT} port`);
};

startServer();
