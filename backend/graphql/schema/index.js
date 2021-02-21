const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String
    age: Int!
    gender: String!
    role: String!
    points: Int
    wins: Int!
    loses: Int!
    createdAt: String!
    matches: [Match!]
  }
  
  type Match {
    _id: ID!
    title: String!
    description: String!
    date: String!
    players: [User!]!
    result: Score
  }

  type Score {
    _id: ID!
    winningScore: Int!
    losingScore: Int!
    winner: User
    loser: User
    belongToMatch: Match
  }
  
  type AuthData {
    user: User
    isLoggedIn: Boolean!
  }
  
  input SignupInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    age: Int!
    gender: String!
  }

  input updateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    age: Int!
    gender: String!
  }
  
  input MatchInput {
    title: String!
    description: String!
    date: String!
    players: [ID!]!
  }

  input ScoreInput {
    match: ID!
    winner: ID!
    loser: ID!
    winningScore: Int!
    losingScore: Int!
  }

  type RootQuery {
    users: [User!]!
    matches: [Match!]!
    login(email: String!, password: String!): AuthData!
    isLoggedIn: AuthData!
    logout: AuthData!
    
  }
  
  type RootMutation {
    signup(userInput: SignupInput): User
    updateUser(userInput: updateUserInput): User!
    createMatch(matchInput: MatchInput): Match
    updateScore(scoreInput: ScoreInput): Score!
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
