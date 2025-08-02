import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import Restaurants from "../models/restaurant.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized no token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized token not verified" });
    }
    console.log(decoded);
    let account;
    if (decoded.role === "user") {
      account = await User.findById(decoded.userId).select("-password");
      if (account) {
        req.user = account;
        return next();
      }
    } else if (decoded.role === "restaurant") {
      account = await Restaurants.findById(decoded.userId).select("-password");
      if (account) {
        console.log("Restaurant account found:", account);
        req.restaurant = account;
        return next();
      }
    }

    return res.status(404).json({ message: "User or Restaurant not found" });
  } catch (error) {
    console.log("Error in Auth  middleware: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
