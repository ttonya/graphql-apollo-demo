"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = __importDefault(require("./google"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_import_1 = require("graphql-import");
const resolvers_1 = require("./resolvers");
// import express from "express";
let typeDefs = graphql_import_1.importSchema("./schema.graphql");
require("dotenv").config();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
    dataSources: () => ({
        googleApi: new google_1.default(),
    }),
});
// const app = express();
// server.applyMiddleware();
server.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=index.js.map