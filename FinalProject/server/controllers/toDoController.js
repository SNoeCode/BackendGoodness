const ToDo = require("../models/toDoModel");

module.exports = {
  getTodo: (req, res) => {
    console.log("GetToDos HIT");

    const userId = req.user.id;

    ToDo.find({ userId: userId })
      .then((todos) => {
        res.json(todos);
        console.log("todos", todos);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        res.status(500).json({ msg: "Server error" });
      });
  },
  createTodo: (req, res) => {
    console.log("Create Hit", req.body);

    const newTodo = new ToDo({
      ...req.body,
      userId: req.user.id,
    });

    newTodo
      .save()
      .then((todo) => {
        res.json(todo);
      })
      .catch((err) => {
        console.error("Error creating todo:", err);
        res.status(500).json({ msg: "Server error" });
      });
  },
  deleteTodo: (req, res) => {
    {
      console.log("Delete HIT", req.params);
      console.log("Authenticated User:", req.user);
      ToDo.findByIdAndDelete(req.params.id)
        .then((deleted) => {
          console.log("deleted", deleted);
          res.json(deleted);
        })
        .catch((err) => {
          console.error("Error deleting todo:", err);
          res.status(500).json({ msg: "Internal server error" });
        });
    }
  },

  editTodo: (req, res) => {
    console.log("Edit Hit", req.params.id, req.body);
    ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
      (updated) => {
        console.log("updatead", updated);
        res.json(updated);
      }
    );
  },
};
