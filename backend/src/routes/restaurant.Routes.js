import { Router } from "express";
import { authorizeRole } from "../middleware/role.middleware.js";
import { addDish, deleteItem, displayMenu, getAllOrders, modifyItem, updateOrderStatus } from "../controllers/restaurant.controller.js";
import multer from "multer";
const restaurantRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

restaurantRouter.get("/profile", authorizeRole("user","restaurant","admin"));

restaurantRouter.get("/menu", authorizeRole("user","restaurant"), displayMenu); //done
restaurantRouter.get("/:id/orders", authorizeRole("admin","restaurant"),getAllOrders);

restaurantRouter.post("/profile", authorizeRole("restaurant"));
restaurantRouter.post("/add-dish", authorizeRole("restaurant"),upload.single("image") ,addDish); //done

restaurantRouter.put("/menu/:id", authorizeRole("restaurant"),modifyItem); //done

restaurantRouter.patch("/order/:id",authorizeRole("restaurant"), updateOrderStatus);

restaurantRouter.delete("/menu/:id",authorizeRole("restaurant"), deleteItem); //done

export default restaurantRouter;
