import { Router } from "express";
import { authorizeRole } from "../middleware/role.middleware.js";
import { getAllRestaurants } from "../controllers/user.controller.js";

const userRouter =  Router();

userRouter.get("/profile", authorizeRole("user"));
userRouter.put("/profile", authorizeRole("user"));


userRouter.get("/restaurants", authorizeRole("user"), getAllRestaurants);
userRouter.get("/restaurants/:id/menu", authorizeRole("user"));


userRouter.post("/addcart", authorizeRole("user"));
userRouter.get("/orders", authorizeRole("user"));
userRouter.get("/orders/:id", authorizeRole("user"));
userRouter.patch("/orders/id/cancel", authorizeRole("user"));


export default userRouter;