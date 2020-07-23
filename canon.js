const {ApolloServer} = require("apollo-server")
const {ApolloGateway} = require("@apollo/gateway")


const gateway = new ApolloGateway({
    serviceList: [
        {name: "books", url: "http://localhost:3000/graphql"},
        {name: "lps", url: "http://localhost:3001/graphql"},

        // List of federation-capable GraphQL endpoints...
    ]
})

const server = new ApolloServer({gateway, subscriptions: false})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
})