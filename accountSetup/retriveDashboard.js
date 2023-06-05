import jwt from "jsonwebtoken";
import database from "../database/userData.js";
import path from "path";
const ejsFolderPath = path.join(path.resolve(), "views");

async function retriveDashboard(req, res) {
  let userid = req.params.user;
  let user = await database.findOne({ userid });
  if (user != null) {
    res.render(ejsFolderPath + "/dashboard.ejs", { user });
  } else {
    let token = req.cookies.login;
    let verify = jwt.verify(token, "thisisasecretkeyfortodoapp");
    let user = await database.findById(verify._id);
    res.redirect(`${user.userid}`);
  }
}

export default { retriveDashboard };
