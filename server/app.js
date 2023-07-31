const express = require("express");
const app = express();
require("dotenv").config({ path: "./config.env" });
require("./db/conn");

// const User = require('./model/userSchema'); // this is the way to use mongoose user schema

app.use(express.json());

// link the router files to make the routes
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// Middleware
const middleware = (req, res, next) => {
  console.log(`Hello my Middleware`);
  next();
};

// Express App
// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// });
// commented due to router defined in auth.js

app.get("/about", middleware, (req, res) => {
  console.log("Hello My About");
  res.send("<h1>About Page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Page</h1>");
});

app.get("/signin", (req, res) => {
  res.send("<h1>Login Page</h1>");
});

app.get("/signup", (req, res) => {
  res.send("<h1>Register Page</h1>");
});

// Listening PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
