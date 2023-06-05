import database from "../database/userData.js";
import jwt from "jsonwebtoken";
async function isLogin(req, res, next) {
  let token = req.cookies.login;
  if (token != undefined) {
    try {
      let verify = jwt.verify(token, "thisisasecretkeyfortodoapp");
      let user = await database.findById(verify);
      if (user != null) {
        next();
      } else {
        res.redirect("/signin");
      }
    } catch (e) {
      if (e) {
        res.redirect("/signin");
      }
    }
  } else {
    res.redirect("/signin");
  }
}

async function isLogOut(req, res, next) {
  let token = req.cookies.login;
  if (token == undefined) {
    next();
  } else {
      let verify = jwt.verify(token, "thisisasecretkeyfortodoapp");
      let user = await database.findById(verify);
      if (user != null) {
        res.redirect(`dashboard/${user.userid}`);
      } else {
        res.redirect("/signin");
      }
  }
}
export default { isLogin, isLogOut };
