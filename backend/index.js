const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const TodosSchema = buildSchema(`
  type Todo {
    id: String
    description: String
  }
  type Query {
    readAll: [Todo]
  }
  type Mutation {
    create(description: String): Todo
    update(id: String, description: String): [Todo]
    delete(id: String): [Todo]
  }
`);

let todos = [];

const root = {
  readAll: () => todos,
  create: ({ description }) => {
    const todo = {
      id: Date.now().toString(),
      description: description,
    };
    todos.push(todo);
    return todo;
  },
  update: ({ id, description }) => {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.description = description;
      }

      return todo;
    });
    return todos;
  },
  delete: ({ id }) => {
    todos = [...todos].filter((todo) => todo.id !== id);
    return todos;
  },
};

const TodoServer = express();
TodoServer.use(cors());
TodoServer.use(
  "/graphql",
  graphqlHTTP({
    schema: TodosSchema,
    rootValue: root,
    graphiql: true,
  })
);
TodoServer.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
