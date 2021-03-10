import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TODO_DETAIL } from "./fragments";
import Todos from "./todos/todos";
import TodoInput from "./todos/todo-input/todo-input";

export const GET_TODOS = gql`
  ${TODO_DETAIL}
  query {
    readAll {
      ...TodoDetail
    }
  }
`;

export const ADD_TODO = gql`
  ${TODO_DETAIL}
  mutation($description: String) {
    create(description: $description) {
      ...TodoDetail
    }
  }
`;

export const REMOVE_TODO = gql`
  ${TODO_DETAIL}
  mutation($id: String) {
    delete(id: $id) {
      ...TodoDetail
    }
  }
`;

export const EDIT_TODO = gql`
  ${TODO_DETAIL}
  mutation($id: String, $description: String) {
    update(id: $id, description: $description) {
      ...TodoDetail
    }
  }
`;

function TodosApp() {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const [editTodo] = useMutation(EDIT_TODO);

  function add(description) {
    addTodo({ variables: { description } });
    refetch();
  }

  function remove(id) {
    removeTodo({ variables: { id } });
    refetch();
  }

  function edit(id, description) {
    editTodo({ variables: { id, description } });
    refetch();
  }

  if (loading) return <h1>Loading</h1>;
  if (error || !data) return <p>ERROR</p>;

  return (
    <div className="App">
      <h1>TODO list</h1>

      <TodoInput addTodo={(value) => add(value)} />
      <hr />

      <Todos
        todos={data.readAll}
        editTodo={(id, value) => edit(id, value)}
        removeTodo={(id) => remove(id)}
      />
    </div>
  );
}

export default TodosApp;
