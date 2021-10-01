const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require('./server/schema/schema');
const app = express();
const port = 4000;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://****@cluster1.t93pi.mongodb.net/blogger?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
    console.log('connected');
})
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(port);
