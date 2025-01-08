import mongoose from "mongoose";
import User from "../../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

let error = new Error();
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a strong secret key

export const login = async (req, res) => {
  const { email, password} = req.body;

  try {
    const existUser = await User.findOne({
      email,
      role : 'admin'
    });
    
    if(!existUser){
      return res.status(401).json({
        message : "User does not exist!",
      })
    }
    
    const isMatch = await bcrypt.compare(password, existUser.password);

    if(!isMatch) {
      return res.status(401).json({
        message : "Invalid credentials!",
      })
    }

    const token = jwt.sign(
      {
      id: existUser._id
      },
      JWT_SECRET,
      {
        expiresIn : "2d"
      }
    )

    const profile = {
      name : existUser.name,
      email : existUser.email
    }

    res.status(200).json({
      message : 'Login success!',
      data : {
        token : `Bearer ${token}`,
        profile : profile
      }
    });

  } catch (error) {
    res.status(500).json(error);
  }
};