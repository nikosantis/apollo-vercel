const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

const app = express()

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers
})

server.applyMiddleware({ app });

app.get('/', (_req, res) => {
  res.send('Welcome to Graphql Apollo Server in Vercel. Go to /graphql')
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

module.exports = app