import { useState } from "react";

function TodoInput({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");
  const [withError, setWithError] = useState(false);

  function addNewTodo(value) {
    if (value !== "") {
      addTodo(value);
      setNewTodo("");
      setWithError(false);
    } else {
      setWithError(true);
    }
  }

  return (
    <div>
      <p className="error" hidden={!withError || (withError && newTodo)}>
        You didn't write anything
      </p>

      <label htmlFor="newTodo">Add todo:</label>
      <input
        type="text"
        value={newTodo}
        id="newTodo"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="icon todos__add" onClick={() => addNewTodo(newTodo)}>
        ➕
      </button>
    </div>
  );
}

export default TodoInput;
