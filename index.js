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
        posts: [Post]
        post(id: ID): Post
        authors: [Person]
        author(id: ID): Person
    }

    type Post {
        id: ID
        author: Person
        body: String
    }

    type Person {
        id: ID
        posts: [Post]
        firstName: String
        lastName: String
    }
`
)

const People = new Map();
const Posts = new Map();

class Post {
    constructor (data) {
        Object.assign(this, data)
    }
    get author() {
        return People.get(this.authorId)
    }
}

class Person {
    constructor (data) {
        Object.assign(this, data)
    }
    get posts() {
        return [...Posts.values()].filter(post => post.authorId === this.id)
    }
}

const initialize = () => {
    const peopleData = [
        { id: '1', firstName: 'John', lastName: 'Deer' }
    ]

    peopleData.forEach(
        person => People.set(person.id, new Person(person))
    )

    const postsData = [
        { id: '1', authorId: '1', body: 'Hi-Oh' }
    ]

    postsData.forEach(
        post => Posts.set(post.id, new Post(post))
    )
}

const rootValue = {
    posts: () => Posts.values(),
    post: ({ id }) => Posts.get(id),
    authors: () => People.values(),
    author: ({ id }) => People.get(id)
}

initialize();

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