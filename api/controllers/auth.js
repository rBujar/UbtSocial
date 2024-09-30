import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Z][a-zA-Z\d]{6,}$/

    const q = "SELECT * FROM users WHERE username = ?";

    if(!passRegex.test(req.body.password)){
        return res.status(400).json(`Password must contain at least 6 characters,
                                     start with a capital letter,
                                     and contain a mix of letters and numbers`)
    }

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exist!")
       
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });

    })



}
export const login = (req, res) => {

const q = "SELECT * FROM users WHERE username = ?"

db.query(q, [req.body.username], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

    if(!checkPassword) return res.status(400).json("User password or username!")

    const token = jwt.sign({id : data[0].id}, "secretkey");

    const {password, ...others} = data[0]

    res.cookie("accessToken", token, {
        httpOnly : true,
    }).status(200).json(others);
});

};
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out.")
};

export const getLogin = (req, res) => {
   
    const userId = req.user.id; 

    const q = "SELECT id, username, role FROM users WHERE username = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        res.status(200).json(data[0]);
    });
}