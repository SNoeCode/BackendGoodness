const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // register: (req, res) => {
  //   console.log("Reg hit", req);
  //   const { username, password } = req.body;
  //   User.findOne({ username: req.body.username })
  //     .then((found) => {
  //       console.log("found", found);
  //       if (!found) {
  //         const hash = bcrypt.hashSync(req.body.password, 10);
  //         console.log("HASH", hash);

  //         User.create(newUser).then((created) => {
  //           console.log("created", created);
  //         });
  //       } else {
  //         console.log("Username TAKEN");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // },
  register: (req, res) => {
    console.log("Reg hit", req.body);

    const { username, password } = req.body;

    // Ensure both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password required" });
    }

    User.findOne({ username: username })
      .then((found) => {
        if (found) {
          console.log("Username TAKEN");
          return res.status(400).json({ msg: "Username already exists" });
        }

        const hash = bcrypt.hashSync(password, 10);
        console.log("HASH", hash);

        // Create user
        User.create({ username: username, password: hash })
          .then((created) => {
            console.log("User created:", created);

            const token = jwt.sign(
              { username: created.username, id: created._id },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );

            res.status(201).json({
              msg: "User created successfully",
              username: created.username,
              id: created._id,
              token: token,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ msg: "Error creating user" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
      });
  },
  
  login: (req, res) => {
    console.log("login", req.body);
    User.findOne({ username: req.body.username })
      .then((found) => {
        console.log("found", found);
        if (!found) {
          return res.status(400).json({ msg: "User not found" });
        }
          if (bcrypt.compareSync(req.body.password, found.password)) {
            console.log("Good Login");
            const token = jwt.sign(
              { username: found.username, id: found._id },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );
            console.log("TOKEN", token);
            res
            .cookie("token", token, {
              httpOnly: true,
              maxAge: 3600000,
            })
            .status(200)
            .json({ 
              msg: "good login", 
              found: {
                username: found.username,
                _id: found._id,
              },
              token: token,
            });
          } else {
            console.log("Bad Login");
            res.status(400).json({ msg: "Invalid credentials" });
          }
              })
      .catch((err) => {
        console.error("Error during login:", err);
        res.status(500).json({ msg: "Server error" });
      });
    },
  logout: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      res.clearCookie("token", { httpOnly: true, secure: false }); 
      console.log("User logged out successfully");

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Logout failed" });
    }
  },
  authCheck: (req, res) => {
    console.log("AUTH CHECK", req.headers.cookie);
    if (!req.headers.cookie) {
      console.log("NO COOKIE");
      res.json({ msg: "no coookie" });
    } else {
      console.log("$$$$", req.headers.cookie.split("="));
      const split = req.headers.cookie.split("=");
      console.log("SPILT", split[1]);

      const decoded = jwt.verify(split[1], process.env.SECRET_KEY);
      console.log("decoded", decoded);

      if (!decoded.username) {
        res.json({ msg: "bad token" });
      } else {
        res.json({ msg: "valid token" });
      }
    }
  },
};
