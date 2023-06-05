import path from "path";
import database from "../database/userData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const ejsFolderPath = path.join(path.resolve(), "views");
async function index(req, res) {
  let cookie = req.cookies.login;
  if (cookie == undefined) {
    res.render(ejsFolderPath + "/index.ejs", {
      links: [
        {
          link: "/signin",
          text: "Login",
        },
        {
          link: "/signup",
          text: "Register",
        },
        {
          link: "",
          text: "",
        },
        {
          link: "",
          text: "",
        },
      ],
    });
  } else {
    res.render(ejsFolderPath + "/index.ejs", {
      links: [
        {
          link: "",
          text: "",
        },
        {
          link: "",
          text: "",
        },
        {
          link: "/dashboard",
          text: "Profile",
        },
        {
          link: "/logout",
          text: "Logout",
        },
      ],
    });
  }
}

async function signin(req, res) {
  let { userid, pass } = req.body;
  let user = await database.findOne({ userid });
  if (user != null) {
    let dbPass = user.pass;
    let passCompare = await bcrypt.compare(pass, dbPass);
    if (passCompare) {
      res.cookie("login", user.token[0].token, {
        maxAge: 1000 * 60 * 60 * 24 * 15,
      });
      res.redirect(`dashboard/${user.userid}`);
    } else {
      res.redirect("/signin");
    }
  } else {
    res.redirect("/signin");
  }
}

async function signup(req, res) {
  let { userid, pass } = req.body;
  let encryptedPass = await bcrypt.hash(pass, 10);
  let userData = await database({
    userid,
    pass: encryptedPass,
  });
  let generatedToken = jwt.sign(
    { _id: userData._id },
    "thisisasecretkeyfortodoapp"
  );
  userData.token = userData.token.concat({ token: generatedToken });
  await userData.save();
  res.redirect("/signin");
}
export default { index, signin, signup };
