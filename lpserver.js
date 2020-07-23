const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Lp @key(fields: "title") {
        title: String
        artist: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        lp: [Lp]
    }
`

const lps = [
    {
        title: 'Presence',
        artist: 'Led Zeppelin',
    },
    {
        title: 'Cosmic Slop',
        artist: 'Funkadelic',
    },
]

const resolvers = {
    Query: {
        lps: () => lps,
    },
    Lp: {
        __resolveReference(lp, {getLp}) {
            return getBook(lp.title)
        }
    }
}

// @todo make this actually do something
const getBook = function(title) {
    return     {
        title: 'Cosmic Slop',
        author: 'Funkadelic',
    }
}

const server = new ApolloServer({ schema: buildFederatedSchema([{ typeDefs, resolvers }]) });

// The `listen` method launches a web server.
server.listen({port:3001}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log(resolvers.Query)
})