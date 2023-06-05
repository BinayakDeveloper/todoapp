import express from "express";
import path from "path";
import cookie from "cookie-parser";
import authentication from "./authentication/authentication.js";
import accountSetup from "./accountSetup/setup.js";
import retriveDashboard from "./accountSetup/retriveDashboard.js";
import updateNotes from "./todoOperation/updateTodo.js";
import deleteNote from "./todoOperation/deleteTodo.js";

const ejsFolderPath = path.join(path.resolve(), "views");

const app = express();
app.use(cookie());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), "public")));
app.set("views engine", "ejs");

// Get Requests

app.get("/", (req, res) => {
  accountSetup.index(req, res);
});

app.get("/signin", authentication.isLogOut, (req, res) => {
  res.render(ejsFolderPath + "/signin.ejs");
});

app.get("/signup", authentication.isLogOut, (req, res) => {
  res.render(ejsFolderPath + "/signup.ejs");
});

app.get("/dashboard", authentication.isLogin, (req, res) => {
  res.redirect("/dashboard/:user");
});

app.get("/dashboard/:user", authentication.isLogin, async (req, res) => {
  retriveDashboard.retriveDashboard(req, res);
});

app.get("/logout", authentication.isLogin, (req, res) => {
  res.cookie("login", undefined, {
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.get("*", (_, res) => {
  res.send("<h1 align='center'>404 not found</h1>");
});

// Post Requests

app.post("/signin", authentication.isLogOut, async (req, res) => {
  accountSetup.signin(req, res);
});

app.post("/signup", authentication.isLogOut, async (req, res) => {
  accountSetup.signup(req, res);
});

app.post("/dashboard", authentication.isLogin, async (req, res) => {
  updateNotes(req, res);
});

// Delete From Database

app.post("/drop/:id", authentication.isLogin, async (req, res) => {
  deleteNote(req, res);
});

app.listen(500);
