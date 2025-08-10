import Restaurants from '../models/restaurant.model.js';
import MenuItem from '../models/menuItems.model.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';


export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurants.find({});
    if (!restaurants || restaurants.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No restaurants found" });
    }
    const formattedRestaurants = restaurants.map(restaurant => ({
      _id: restaurant._id, 
      name: restaurant.restaurantName,
      address: restaurant.restaurantAddress,
      image: restaurant.image, 
    }));
    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: formattedRestaurants,
    });
  } catch (error) {
    console.log('Error in getAllRestaurants:', error.message);
    res.status(500).json({message: 'Server error: Unable to fetch restaurants' });
  }
};

export const getMenu = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurants.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const menuItems = await MenuItem.find({ restaurantId: restaurant._id });
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "No menu items found for this restaurant" });
    }
    res.status(200).json({
      success: true,
      message: "Menu items fetched successfully",
      data: menuItems,
    });
  } catch (error) {
    console.error("Error in getMenu:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }

}


export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Menu item and positive quantity required" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }


    const existingItem = cart.items.find(item => item.menuItem.toString() === menuItemId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
    }
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in getUserOrders:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const order = await Order.findOne({ _id: id, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in getUserOrderById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const cancelUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;


    const order = await Order.findOne({ _id: id, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.status === "cancelled" || order.status === "delivered") {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    console.error("Error in cancelUserOrder:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
