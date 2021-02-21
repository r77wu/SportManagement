const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const isAuth = require("./middleware/isAuth");

const schema = require("./graphql/schema/index");
const rootResolver = require("./graphql/resolvers/index");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(isAuth);

app.use("/graphql", (req, res) => {
  return graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    context: { req, res },
    graphiql: true,
  })(req, res);
});

module.exports = app;
