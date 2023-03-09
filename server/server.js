////TODO: Implement the Apollo Server and apply it to the Express server as middleware. ////
const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes'); // Routes not needed
// Import the ApolloServer class
const { ApolloServer } = require("@apollo/server");
// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;
const httpServer = http.createServer(app); //TODO: Do i need this?

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // TODO: do I need this?
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes); // not using express routes anymore so we will replace
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once('open', () => {
  // app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`
  httpServer.listen(PORT, () => { //TODO: or should this still be app.listen?
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
