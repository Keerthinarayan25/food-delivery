import User from "../models/auth.model.js";
import Restaurants from "../models/restaurant.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  const { userName, address, email, password, role } = req.body;

  try {
    if (!email || !address|| !password || !userName) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("user already exist");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUsers = new User({
      userName,
      address,
      email,
      password:hashedPassword,
      role
    });

    await newUsers.save();

    generateToken(newUsers._id, newUsers.role, res);
    
    return res.status(201).json({
      _id: newUsers._id,
      userName: newUsers.userName,
      address: newUsers.address,
      email: newUsers.email,
      role: newUsers.role,
    });
  }catch (error) {
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
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      generateToken(user._id, user.role, res);
      
      return res.status(200).json({
        _id: user._id,
        userName: user.userName,
        address: user.address,
        email: user.email,
        role: user.role,
      });
    }

    const restaurant = await Restaurants.findOne({ email });
    if(restaurant){
      const isPasswordValid = await bcrypt.compare(password, restaurant.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      generateToken(restaurant._id, restaurant.role, res);
      return res.status(200).json({
        _id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        restaurantAddress: restaurant.restaurantAddress,
        email: restaurant.email,
        role: restaurant.role,
      });
    }
    return res.status(400).json({ message: "No account found. Create one." });
  }catch (error) {
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

export const RestaurantSignUp = async (req, res) => {
  const { restaurantName, restaurantAddress, email, password,role } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing." });
  }
  try {
    if (!restaurantName || !restaurantAddress || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    const existingRestaurant = await Restaurants.findOne({ email });

    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newRestaurant = new Restaurants({
      restaurantName,
      restaurantAddress,
      email,
      password: hashedPassword,
      role
    });

    await newRestaurant.save();
    
    generateToken(newRestaurant._id, newRestaurant.role, res);
    return res.status(201).json({
      _id: newRestaurant._id,
      restaurantName: newRestaurant.restaurantName,
      restaurantAddress: newRestaurant.restaurantAddress,
      email: newRestaurant.email,
      role: newRestaurant.role,
    });
  } catch (error) {
    console.log("Error in restaurant signup controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const checkAuth = (req, res) => {
  try{
    res.status(200).json(req.user);
  } catch(error){
    console.log("Error in checkauth controller:",error.message);
    return res.status(500).json({message:"Internal server error"});
  }
}