import { useState } from "react";

function Todo({ data, editTodo, removeTodo }) {
  const [todo, setTodo] = useState(data.description);
  const [disabled, setDisabled] = useState(true);
  let todoClasses = `
    todo__input 
    ${disabled ? "" : "todo__input--border"}
  `;

  function saveTodo() {
    editTodo(data.id, todo);
    setDisabled(true);
  }

  return (
    <li className="todo">
      <span className="icon todo__save" hidden={disabled} onClick={saveTodo}>
        ✅
      </span>
      <span
        className="icon todo__edit"
        hidden={!disabled}
        onClick={() => setDisabled(false)}
      >
        ✏️
      </span>
      <input
        disabled={disabled}
        className={todoClasses}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <span className="icon todo__remove" onClick={() => removeTodo(data.id)}>
        🗑️
      </span>
    </li>
  );
}

export default Todo;
