import "reflect-metadata";
import * as path from "path";
import * as cors from "cors";
import * as express from "express";
import { Connection } from "typeorm";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { config as dotenvConfig } from "dotenv";
import { resolvers } from "../../api/src/resolvers";
import { authChecker } from "../../api/src/middlewares/auth-checker";
import { ApolloServer } from "apollo-server-express";
import * as OktaJwtVerifier from "@okta/jwt-verifier";
import fileRoutes from "../../api/src/routes/file.routes";
import { getLocallyConnection } from "./services/database-connection";
import { checkIsUploadsFolderExists } from "./services/directories-checker";
import { Context } from "../../api/src/objects/context";
import { createOktaSdkClient } from "./services/okta-sdk-client-creator";

const startServer = async (): Promise<void> => {
  dotenvConfig({ path: process.env.TEST_ENV ? "./test.env" : "./.env" });
  checkIsUploadsFolderExists();

  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER,
    clientId: process.env.OKTA_CLIENT_ID,
    assertClaims: {
      aud: "api://default",
    },
  });
  const connection: Connection = await getLocallyConnection();
  const oktaSdkClient = createOktaSdkClient();
  const schema: GraphQLSchema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, "../", "schema.gql"),
    authChecker: authChecker,
  });
  const server: ApolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }): Promise<Context> => {
      const authHeader = req.headers.authorization;
      const match = authHeader.match(/Bearer (.+)/);

      if (!match) {
        throw new Error("You must be logged in");
      }

      const accessToken = match[1];
      const expectedAudience = "api://default";
      let validJwt = null;

      try {
        const jwt = await oktaJwtVerifier.verifyAccessToken(
          accessToken,
          expectedAudience
        );

        validJwt = jwt;
      } catch (e) {
        console.info("invalid authHeader: ", authHeader);
        // throw new Error("Error in verifyAccessToken");
      }

      return { connection, validJwt, oktaSdkClient };
    },
    introspection: true,
    playground: true,
  });
  const app = express();

  app.use(cors());
  app.use("/file", fileRoutes);
  app.use(express.static(path.join(__dirname, "../../../uploads/")));

  server.applyMiddleware({
    app,
    path: "/",
  });

  app.listen(process.env.SERVER_PORT || 4000);
  console.log(`Server has been started at ${process.env.SERVER_PORT} port`);
};

startServer();
