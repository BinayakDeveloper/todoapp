import jwt from "jsonwebtoken";
import database from "../database/userData.js";
async function deleteTodo(req, res) {
   let id = req.params.id;
   let token = req.cookies.login;
   let jwtVerify = jwt.verify(token, "thisisasecretkeyfortodoapp");
   let user = await database.findById(jwtVerify._id);
   user.data.splice(id, 1);
   await user.save();
   res.redirect("/dashboard");
}

export default deleteTodo;