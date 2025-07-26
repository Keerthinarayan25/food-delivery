import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const verifyToken = async(req, res, next) =>{

  try {
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({message:"Unauthorized no token found"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({message:"Unauthorized token not verified"});
    }
    console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
      return res.status(404).json({message: "Unauthorized  user not found"});
    }
    console.log(user);
    req.user = user;
    next();


  } catch (error) {
    console.log("Error in Auth  middleware: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
    
  }
}