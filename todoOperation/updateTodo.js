import jwt from 'jsonwebtoken'
import database from '../database/userData.js';
async function updateTodo(req, res) {    
    let { title, message } = req.body;
    let token = req.cookies.login;
    let jwtVerify = jwt.verify(token, "thisisasecretkeyfortodoapp");
    let user = await database.findById(jwtVerify._id);
    let data = { title, message };
    user.data = user.data.concat(data);
    await user.save();
    res.redirect("dashboard");
}

export default updateTodo;