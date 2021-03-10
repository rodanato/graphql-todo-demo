import react from "react";
import "./todos.css";
import Todo from "./todo/todo";

function Todos({ todos, editTodo, removeTodo }) {
  return (
    <ul className="todos__list">
      {todos.length > 0
        ? todos.map((todo) => (
            <Todo
              key={todo.id}
              data={todo}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))
        : "No todos"}
    </ul>
  );
}

export default Todos;
