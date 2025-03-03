const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ToDoSchema = new Schema({
  todo: { type: String, required: true },
  created: { type: Number },
  createdAt: { type: Date, default: Date.now },
  editedAt: {type: Date, default: Date.now },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;
