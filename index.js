const express = require('express');
const cors = require('cors');
const gql = require('graphql-tag');
const graphqlHttp = require('express-graphql');
const { buildASTSchema } = require('graphql');

const app = express();
app.use(cors());

const port = process.env.PORT || 4000

const schema = buildASTSchema(gql`
    type Query {
    hello: String
    }
`
)

const rootValue = {
    hello: () => 'Hello World'
}

app.use('/graphql', graphqlHttp({ 
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));
/*app.use('/graphql', graphqlHttp({ 
    schema,
    rootValue
}));*/
app.listen(port);
console.log("Server's up at " + port);