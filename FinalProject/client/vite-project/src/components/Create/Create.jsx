
import React, { useState } from "react";
import axios from "axios";

const Create = ({ onCreate }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      console.warn("Todo cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/create",
        { todo: newTodo,
          createdAt: new Date().toISOString() 
         },
        { withCredentials: true }
      );
      console.log("Create Hit", response.data);
      if (response.status === 200) {
        console.log("Todo created successfully:", response.data);
        setNewTodo("");
        if (onCreate) onCreate();
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleChange}
          placeholder="Add a new todo"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;