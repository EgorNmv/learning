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
import OktaJwtVerifier = require('@okta/jwt-verifier');

const startServer = async (): Promise<void> => {
    dotenvConfig();

    const oktaJwtVerifier = new OktaJwtVerifier({
        issuer: 'https://dev-417692.okta.com/oauth2/default',
        clientId: '0oagqwp45W4HIpio94x6',
        assertClaims: {
            aud: 'api://default',
        },
    });
    const context: Context = {
        connection: await getLocallyConnection(),
    };
    const schema: GraphQLSchema = await buildSchema({
        resolvers,
        emitSchemaFile: path.resolve(__dirname, "../", "schema.gql")
    });
    const server: ApolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => {
            const authHeader = req.headers.authorization || '';
            const match = authHeader.match(/Bearer (.+)/);
            let _jwt;

            // if (!match) {
            //     throw new Error("You must be logged in");
            // }

            // const accessToken = match[1];
            // const expectedAudience = 'api://default';

            // try {
            //     oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
            //         .then((jwt) => {
            //             _jwt = jwt;
            //         })
            // } catch (e) {
            //     throw new Error("Error in verifyAccessToken");
            // }

            return { ...context, _jwt };
        },
        introspection: true,
        // uploads: { maxFieldSize: 10000000, maxFiles: 20 } // disable apollo upload property
    });
    const app = express();

    app.use(cors());
    app.use("/file", fileRoutes);
    app.use(express.static(path.join(__dirname, "../../uploads/")));

    server.applyMiddleware({
        app, path: "/"
    });


    app.listen(process.env.SERVER_PORT || 4000);
    console.log(`Server has been started at ${process.env.SERVER_PORT} port`);
};

startServer();
