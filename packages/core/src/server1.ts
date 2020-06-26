import "reflect-metadata";
import * as path from "path";
import cors = require("cors");
import express = require('express');
import { Connection } from "typeorm";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { config as dotenvConfig } from "dotenv";
import { resolvers } from "../../api/src/resolvers";
import { ApolloServer } from "apollo-server-express";
import OktaJwtVerifier = require('@okta/jwt-verifier');
import fileRoutes from "../../api/src/routes/file.routes";
import { getLocallyConnection } from "./database-connection/database-connection";

const startServer = async (): Promise<void> => {
    dotenvConfig();

    const oktaJwtVerifier = new OktaJwtVerifier({
        issuer: 'https://dev-417692.okta.com/oauth2/default',
        clientId: '0oagqwp45W4HIpio94x6',
        assertClaims: {
            aud: 'api://default',
        },
    });
    const connection: Connection = await getLocallyConnection();
    const schema: GraphQLSchema = await buildSchema({
        resolvers,
        emitSchemaFile: path.resolve(__dirname, "../", "schema.gql")
    });
    const server: ApolloServer = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || '';
            const match = authHeader.match(/Bearer (.+)/);
            let token = null;

            if (!match) {
                throw new Error("You must be logged in");
            }

            const accessToken = match[1];
            const expectedAudience = 'api://default';

            try {
                const jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience);
                token = jwt;
            } catch (e) {
                console.info("authHeader", authHeader);
                throw new Error("Error in verifyAccessToken");
            }

            return { connection, token };
        },
        introspection: true,
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
