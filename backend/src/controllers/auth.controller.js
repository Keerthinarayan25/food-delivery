import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  const { userName, restaurantName, restaurantAddress, email, password, role } =
    req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    if (role === "user" && !userName) {
      return res.status(400).json({ message: "User name is required" });
    }

    if (role === "restaurant" && (!restaurantName || !restaurantAddress)) {
      return res
        .status(400)
        .json({ message: "Restaurant name and address are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("user already exist");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUsers;
    if (role === "user") {
      newUsers = new User({
        userName,
        email,
        password: hashedPassword,
        role,
      });
    } else if (role === "restaurant") {
      newUsers = new User({
        restaurantName,
        restaurantAddress,
        email,
        password: hashedPassword,
        role,
      });
    } else if (role === "admin") {
      newUsers = new User({
        userName,
        email,
        password: hashedPassword,
        role,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (newUsers) {
      generateToken(newUsers._id, user.role, res);
      await newUsers.save();

      if (role === "user" || role === "admin") {
        return res.status(201).json({
          _id: newUsers._id,
          userName: newUsers.userName,
          email: newUsers.email,
          role: newUsers.role,
        });
      } else if (role === "restaurant") {
        return res.status(201).json({
          _id: newUsers._id,
          restaurantName: newUsers.restaurantName,
          restaurantAddress: newUsers.restaurantAddress,
          email: newUsers.email,
          role: newUsers.role,
        });
      }
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Incorrect input" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found Create one" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateToken(user._id, user.role, res);

    let response = {
      _id: user._id,
      role: user.role,
      email: user.email,
    };

    if (user.role === "user" || user.name === "admin") {
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      });
    } else if (user.role === "restaurant") {
      res.status(200).json({
        _id: user._id,
        restaurantName: user.restaurantName,
        restaurantAddress: user.restaurantAddress,
        email: user.email,
        role: user.role,
      });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = async (req, res) => {

  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({
      message: "Logged out successfully"
    })
  } catch (error) {
    console.log("Error in logout  controller", error.message);
    res.status(500).json({message: "Internal server Error"});
  }
};
