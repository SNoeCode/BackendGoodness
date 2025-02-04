<<<<<<< HEAD
const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
=======
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
>>>>>>> 3d0805ad497be821b81e162db0684fb509010d4d

app.use(cors());
app.use(express.json());

require("dotenv").config();

const PORT = 3000;

const Schema = mongoose.Schema;

<<<<<<< HEAD
const ToDoSchema = new Schema(
    {

        todo:
        {
            type: String,
            required: true
        }
        ,
        created: Number

    }
)
const ToDo = mongoose.model('ToDo', ToDoSchema)
=======
const ToDoSchema = new Schema({
  todo: String,
  created: Date,
});
const ToDo = mongoose.model("ToDo", ToDoSchema);
>>>>>>> 3d0805ad497be821b81e162db0684fb509010d4d



app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.json({ msg: "success" });
});

app.get("/getTodos", (req, res) => {
  console.log("getTodos HIT");
  ToDo.find().then((found) => {
    console.log("Found", found);
    res.json(found);
  });
});

app.post("/create", (req, res) => {
<<<<<<< HEAD
    console.log("Create Route HIT", req.body)
    ToDo.create(req.body)
        .then(created => {
            console.log("created", created)
            res.json(created)
        })
})

app.delete("/delete/:id", (req, res) => {
    console.log("Delete Hit", req.params.id)
    ToDo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            console.log("deleted", deleted)
            res.json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database")
        })
        .catch(err => console.log(err))

    console.log(`Server is runnning on port ${PORT}`)
})
=======
  console.log("Create Route HIT", req.body);
  ToDo.create(req.body).then((created) => {
    console.log("created", created);
    res.json(created);
  });
});

app.listen(PORT, () => {
  `host:${PORT}`,
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to Database");
    });
  console.log(`Server is runnning on port ${PORT}`);
});
>>>>>>> 3d0805ad497be821b81e162db0684fb509010d4d
