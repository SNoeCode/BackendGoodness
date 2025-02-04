import React, { useState } from "react";
import axios from "axios";
import "./Create.css";
const Create = () => {
  const [todo, setTodo] = useState();
  const handleSubmit = async () => {
    axios
      .post("http://localhost:3000/create", { todo: todo })
      .then((response) => {
        setTodo("");
        console.log(response);
        location.reload();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container-add">
      <input
        className="input-add-todo"
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add Task...."
      />
      <button className="btn-add" type="button" onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
};
export default Create;
