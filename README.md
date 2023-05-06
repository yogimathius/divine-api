Sure! Here's the README in Markdown format:

# NestJS GraphQL Auth App

This is a basic NestJS GraphQL Auth app that allows users to sign up, log in, and manage their accounts. It is dockerized and can be run on port 3000.

## Prerequisites

- Docker

## Getting Started

1. Clone this repository.
2. Navigate to the root directory of the project.
3. Run `docker build -t network .` to build the Docker image.
4. Run `docker run -p 3000:3000 network` to start the app in a Docker container.
5. Open your web browser and go to `http://localhost:3000/graphql` to access the GraphQL Playground.

## GraphQL Schema

The GraphQL schema for this app is as follows:

```graphql
# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

"""
user
"""
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  enabled: Boolean!
}

type AuthPayload {
  id: String!
  token: String!
  expiration: Float!
  user: User!
}

type Query {
  user(id: Float!): User!
  users(page: Int! = 1, limit: Int! = 10): [User!]!
}

type Mutation {
  login(input: AuthCredentialsDto!): AuthPayload!
  createUser(newUserData: NewUserInput!): User!
  updateUser(id: Float!, updateUserInput: UpdateUserInput!): User!
  deleteUser(id: Float!): Boolean!
}

input AuthCredentialsDto {
  username: String!
  password: String!
}

input NewUserInput {
  username: String!
  email: String!
  password: String!
}

input UpdateUserInput {
  id: Float!
  email: String!
  password: String!
}
```
