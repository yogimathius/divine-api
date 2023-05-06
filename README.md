# NestJS GraphQL Auth App

This is a basic NestJS GraphQL Auth app that allows users to sign up, log in, and manage their accounts.

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager (if you choose to run the app with npm instead of Docker)

## Getting Started

### Running with Docker

1. Clone this repository.
2. Navigate to the root directory of the project.
3. Build the Docker image by running `docker build -t network .`
4. Start the Docker container by running `docker run -p 3000:3000 network`
5. Open your web browser and go to `http://localhost:3000/graphql` to access the GraphQL Playground.

### Running with `npm start`

1. Clone this repository.
2. Navigate to the root directory of the project.
3. Install the required dependencies by running `npm install` or `yarn install`.
4. Start the app by running `npm start` or `yarn start`.
5. Open your web browser and go to `http://localhost:3000/graphql` to access the GraphQL Playground.

## GraphQL Schema

The GraphQL schema for this app is as follows:

```graphql
"""
user
"""
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  online: Boolean!
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

## Playground Queries

### Mutations

#### createUser

```
mutation {
  createUser(newUserData:{ username: "test", email: "test@tst.ca", password: "password" }) {
    id
    username
    email
    online
  }
}
```

Response:

```
{
  "data": {
    "createUser": {
      "id": "e8afbb6c-2c56-4f9e-8faf-0fa29c9b9a52",
      "username": "test",
      "email": "test@tst.ca",
      "online": false
    }
  }
}
```

#### updateUser

```
mutation {
  updateUser(id: "e8afbb6c-2c56-4f9e-8faf-0fa29c9b9a52", updateUserInput:{ online: true }) {
    id
    username
    email
    online
  }
}
```

response:

```
{
  "data": {
    "updateUser": {
      "id": "e8afbb6c-2c56-4f9e-8faf-0fa29c9b9a52",
      "username": "test",
      "email": "test@tst.ca",
      "online": true
    }
  }
}
```

Note that by default, the app will run on port 3000. If you want to change the port, you can modify the `PORT` environment variable in the `.env` file or set it as an environment variable before running the app.
