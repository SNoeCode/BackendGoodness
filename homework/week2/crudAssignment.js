// Build a mini-project: Create a RESTful API with at least three resources and routes for each CRUD operation.

//make a server and endpoint, test with postman

// git stash

// git stash apply

const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3010;
// app.use("/api/user",(res,req,next) => {
//     console.log("user middleware hit");
//     next();
  
// });
// app.use("/api/item" ,(res,req,next) => {
//     console.log("item middleware hit");
//     next()
// })
app.get("/user", (req, res) => {
  console.log("/get user route hit");
  res.json({ msg: "/get user route hit" });
});

app.post("/user", (req, res) => {
  console.log("/post user route hit");
res.json({ msg: "/post user route hit" });

});
app.put("/user:id", (req, res) => {
  console.log("/put user route hit");
  res.json({ msg: "/put user route hit" });
});
app.delete("/user:id", (req, res) => {
  console.log("/delete user route hit");
  res.json({ msg: "/delete user route hit" });
});app.get("/item", (req, res) => {
    console.log("/get item route hit");
    res.json({ msg: "/get item route hit" });
  });
  
  app.post("/item", (req, res) => {
    console.log("/post item route hit");
  res.json({ msg: "/post item route hit" });
  
  });
  app.put("/item:id", (req, res) => {
    console.log("/put item route hit");
    res.json({ msg: "/put item route hit" });
  });
  app.delete("/item:id", (req, res) => {
    console.log("/delete item route hit");
    res.json({ msg: "/delete item route hit" });
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
