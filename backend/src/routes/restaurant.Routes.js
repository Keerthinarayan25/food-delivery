import { Router } from "express";
import { authorizeRole } from "../middleware/role.middleware.js";
import { addDish, deleteItem, displayMenu, getAllOrders, modifyItem, updateOrderStatus } from "../controllers/restaurant.controller.js";

const restaurantRouter = Router();


restaurantRouter.get("/profile", authorizeRole("user","restaurant","admin"));

restaurantRouter.get("/menu", authorizeRole("user","restaurant"), displayMenu);
restaurantRouter.get("/orders", authorizeRole("admin","restaurant"),getAllOrders);

restaurantRouter.post("/profile", authorizeRole("restaurant"));
restaurantRouter.post("/menu", authorizeRole("restaurant"),addDish);

restaurantRouter.put("/menu/:id", authorizeRole("restaurant"),modifyItem);

restaurantRouter.patch("/order/:id",authorizeRole("restaurant"), updateOrderStatus);

restaurantRouter.delete("/menu/:id",authorizeRole("restaurant"), deleteItem);

export default restaurantRouter;
