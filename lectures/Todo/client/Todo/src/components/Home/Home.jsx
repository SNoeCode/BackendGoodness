import React, { useState, useEffect } from "react";
import Create from "../Create/Create";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
33;
import "./Home.css";

const Home = () => {
  //hold items gotten from the backend
  const [todo, setTodo] = useState([]);
// keeps track if updated
  const [isUpdating, setIsUpdating] = useState(false);
  //stores updated task if edited
  const [updated, setUpdated] = useState("");
  //stores id of current todo being edited
  const [editingId, setEditingId] = useState(null);
  //get all todos on backend
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/getTodos",
    })
      .then((response) => {
        console.log("res", response);
        setTodo(response.data);
      })
      .catch((err) => console.log("err", err));
  }, []);
// we use the id so that it will get the id from req.body.params from the backend
  const handleUpdate = (id, currentTodo) => {
    setIsUpdating(true);
    //stores scurrent task upadted
    setUpdated(currentTodo);
    //stores the todo id in the edited state
    setEditingId(id);

  };

  const saveUpdatedEdit = (id) => {
    axios({
      method: "put",
      url: `http://localhost:3000/update/${id}`,
      data: { todo: updated },
    })
      .then((response) => {
        console.log("res", response);

        if (response.status === 200) {
          console.log("Todo updated successfully:", response.data);
          setTodo(
            todo.map((item) =>
              item._id === id ? { ...item, todo: response.data.todo } : item
            )
          );
          console.log("res", response);
          // sets the upated state false bc it has already been efited
          setIsUpdating(false);
          setEditingId(null);
          //clearing the import
          setUpdated("");
          //found out the location.reload() messed up the saving an updated message
          // location.reload();
        } else {
          console.log("Error updating todo:", err);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const handleToggle = (id) => {
    // terney statement 
    const updatedTodos = todo.find((item) => item._id === id);
    axios
      .put(`http://localhost:3000/update/${id}`, {
        done: !updatedTodos.done,
      })
      .then((response) => {
        console.log("res", response);
        if (response.status === 200) {
          const updatedTodos = todo.map((item) =>
            item._id === id ? { ...item, done: !item.done } : item
          );
          setTodo(updatedTodos);
          setUpdated("")
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${id}`,
      data: { todo: todo },
    })
      .then(() => {
        location.reload();

        console.log("res", response);
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <>
      <div className="main">TO DO LIST</div>
      <Create />
      <br />

      {todo &&
        todo.map((item) => (
          <div key={item._id} className="container-todo">
            <h1 className="task-header">Task</h1>

            <div className="toggle-container">
              <p
                id="todo-task"
                className={item.done ? "mark-through" : ""}
                onClick={() => handleToggle()}
                style={{
                  textDecoration: item.done ? "line-through" : "none",
                  color: item.done ? "green" : "black",
                  flex: "1",
                }}
              >
                <div className="task-complete">{item.todo}</div>
              </p>
              <div className="span-text">
                <span className="span-check"> Mark Complete</span>
              </div>
              <button
                className="btn-toggle"
                onClick={() => handleToggle(item._id)}
              >
                {item.done ? "✔" : ""}
              </button>
            </div>

            {isUpdating && editingId === item._id ? (
              <div className="updated-container">
                <input
                  placeholder="Update text...."
                  className="update-input"
                  type="text"
                 
                  onChange={(e) => setUpdated(e.target.value)}
                />
                <button
                  className="save-btn"
                  onClick={() => saveUpdatedEdit(item._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                className="btn-edit-icon"
                onClick={() => handleUpdate(item._id, item.todo)}
              >
                <RiEdit2Line className="icon" />
                Edit
              </button>
            )}
            <button className="btn-delete" onClick={() => handleDelete(item._id)}>
              <RiDeleteBin5Line className="icon" />
              Delete
            </button>
          </div>
        ))}
    </>
  );
};

export default Home;
