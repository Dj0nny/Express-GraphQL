# Express-GraphQL

## Installation

Clone the repository using `git clone https://github.com/Dj0nny/Express-GraphQL`

## Running the application

Navigate into the root folder, open command line interface console and type `node index.js`. The default port is 4000.
After this, open a web browser and go to https://www.graphqlbin.com/v2/new and insert the local address: in this case http://127.0.0.1:4000/graphql.

Alternatively you can delete this code: 
```javascript
app.use('/graphql', graphqlHttp({ 
    schema,
    rootValue
}));

```
And replace it with this:

```javascript
app.use('/graphql', graphqlHttp({ 
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));
```

For using a local GraphQL dashborad that you can reach at http://127.0.0.1:4000/graphql

Inside the online web application, you'll see on your left a label named __Schema__ when are stored the schemas of Node's app.
In the local dashboard there is a lateral navbar with all schemas.

## Query

For doing a query you can test this code inside the query text area of GraphQL's dashboard:

```
query {
 authors {
    id
    firstName
    lastName
 }
}
```

In this case you'll fetch the authors infos.



