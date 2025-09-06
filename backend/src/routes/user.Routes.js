import { Router } from "express";
import { authorizeRole } from "../middleware/role.middleware.js";
import { addToCart, cancelUserOrder, CreateOrder, getAllRestaurants, getMenu, getUserOrderById, getUserOrders } from "../controllers/user.controller.js";
import { get } from "mongoose";

const userRouter =  Router();

userRouter.get("/profile", authorizeRole("user"));
userRouter.put("/profile", authorizeRole("user"));


userRouter.get("/restaurants", authorizeRole("user"), getAllRestaurants); 
userRouter.get("/restaurants/:id/menu", authorizeRole("user"),getMenu); 


userRouter.post("/add-cart", authorizeRole("user"), addToCart);
userRouter.get("/orders", authorizeRole("user"),getUserOrders);
userRouter.post("/sendOrders", authorizeRole("user"), CreateOrder);
userRouter.get("/orders/:id", authorizeRole("user"), getUserOrderById);
userRouter.patch("/orders/:id/cancel", authorizeRole("user"),cancelUserOrder);


export default userRouter;