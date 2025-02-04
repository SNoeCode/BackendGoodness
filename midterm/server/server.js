const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
//be able to use json
app.use(express.json());
app.use(cors());
//got some errors with the sort method on front wnd it keep aisaying data.sort wasnt a method, then i had to remeber bc i at first i had created set to a date and not a number
const Schema = mongoose.Schema;
const ToDoSchema = new Schema({
  todo: { type: String, required: true },
  created:{type: Number},
});
const ToDo = mongoose.model("ToDo", ToDoSchema);
app.get("/gettodos", (req, res) => {
  console.log("get todos", req.body);
  ToDo.find(req.body).then((found) => res.json(found));
  console.log(req.body);
});
app.post("/create", (req, res) => {
  console.log("Todo created", req.body);
  const todo = req.body;
  ToDo.create(req.body)
    .then((created) => res.json(created))
    .catch((err) => console.log("err", err));
});
//found out that if you dont use the findByIdAnd Update and u just use findById it does not update the updated to the screen or show in mongo
app.put("/edit/:id", (req, res) => {
  console.log("updated hit", req.params.id);
  ToDo.findByIdAndUpdate(req.params.id, req.body).then((updated) => {
    res.json(updated);
  });
});
app.delete("/delete/:id", (req, res) => {
  console.log("updated hit", req.params.id);

  ToDo.findByIdAndDelete(req.params.id, req.body).then((deleted) => {
    res.json(deleted);
  });
});
app.listen(port, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("err", err));
  console.log(`Server is running on port ${port}`);
});
