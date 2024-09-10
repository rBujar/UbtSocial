import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users'; 
  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving users', error: err });
      }
      res.status(200).json(results);
    });
  };

  export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const { id } = req.params; 
      const { username, name, role, profilePic, coverPic, email } = req.body; 
  
      const q = "UPDATE users SET `username`=?, `name`=?, `role`=?, `profilePic`=?, `coverPic`=?, `email`=? WHERE id = ?";
  
      db.query(q, [
        username,
        name,
        role,
        profilePic,
        coverPic,
        email, 
        id 
      ], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can only update your own details.");
      });
    });
  };

  export const deleteUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const userId = req.params.id;
  
      const q = "DELETE FROM users WHERE id = ?";
  
      db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("User deleted!");
        return res.status(404).json("User not found.");
      });
    });
  };
  