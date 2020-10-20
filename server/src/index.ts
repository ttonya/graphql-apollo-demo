import GoogleApi from "./google";

import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import cors from "cors";
import express from "express";

import { typeDefs } from "./schema";

require("dotenv").config();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		googleApi: new GoogleApi(),
	}),
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
