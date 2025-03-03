const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())

const MiddleWare = (req, res, next) => {
  if (!req.headers.cookie) {
    console.log("NO COOKIE");
    return res.status(401).json({ msg: "No cookie provided" });
  } else {
    console.log("$$$$", req.headers.cookie.split("="));
    const split = req.headers.cookie.split("=");
    console.log("SPLIT", split[1]);
    
    try {
      const decoded = jwt.verify(split[1], process.env.SECRET_KEY);
      console.log("decoded", decoded);
      

      if (!decoded.username || !decoded.id) {
        return res.status(401).json({ msg: "Bad token" });
      }
      
    
      req.user = decoded;
      console.log("good login");
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  }
};



const auth = (req, res, next) => {
  
  const token = req.cookies.token;
  
 
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
  
    const decoded = jwt.verify(token, process.env.SECRET_KEY1);
    
   
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


module.exports = {MiddleWare,auth}

