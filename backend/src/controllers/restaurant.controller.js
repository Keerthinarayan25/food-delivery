import MenuItem from "../models/menuItems.model.js";
import Order from "../models/order.model.js";


export const addDish = async (req,res) => {

  try {
    const { name, description, category, price, image } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const addItem = new MenuItem({restaurantId:req.user._id, name, description, category, price,image});
    
    await addItem.save();
    res.status(201).json({success: true, data: addItem});
    
  } catch (error) {
    console.error("Error in addDish:", error.message);
    res.status(400).json({message:"Internal server error"});
  }
  
};

export const displayMenu = async(req, res) =>{
  
  try {
    const items =  await MenuItem.findOne({restaurantId: req.user._id});
    if (!items) {
      return res.status(404).json({ message: "No menu items found " });
    }
    res.status(200).json({count: items.length, data: items });
  } catch (error) {
    console.error("Error in displayMenu:", error.message);
    res.status(500).json({message: "Internal server error" });
    
  }
}

export const modifyItem = async (req, res) => {
  
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await MenuItem.findOneAndUpdate({_id: id, restaurantId: req.user._id},  { new: true } );

    if (!item) return res.status(404).json({ message: 'Item not  found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log("Error in modifyItem", error.message)
     res.status(400).json({message: "Internal server error" });
  }
}

export const deleteItem = async(req, res) =>{

  try {
    const deleteItem = await MenuItem.findOneAndDelete({
      _id: req.params.id,
      restaurantId: req.user.id,
    });
    if(!deleteItem) {
      return res.status(404).json({message: "Item not found"});
    }
    res.status(202).json({message:"Menu item deleted"});
  } catch (error) {
    res.status(500).json({message: "Internal server error" });
  }
}


export const getAllOrders = async(req, res) => {

  try{
    const orders = await Order.find({restaurantId: req.user._id}).populate('userId','username').populate('items.menuItem', 'name price');

    if(!orders){
      return res.status(404).json({ message: "No orders found ." });
    }
    res.status(200).json({count: orders.length, data: orders });

  }catch(error){
    console.error("Error in getAllOrders:", error.message);
    res.status(500).json({ message: "Internal server error " })

  }

}

export const updateOrderStatus = async( req, res) => {

  try{
    const { orderId } = req.params;
    const { status } = req.body;

    if(!status){
      return  res.status(400).json({ message: "Order status is not defined" });
    }

    const validStatuses = ['placed', 'accepted', 'preparing', 'out for delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findOneAndUpdate(
      {_id: orderId, restaurantId: req.user.id},
      {status}, {new: true}
    );

    if(!order){
      return res.status(404).json({mesage:"Order not found"});
    }
  }catch(error){
    reconsole.error("Error in Updating order:", error.message);
    res.status(500).json({ message: "Internal server error " })
    
  }

}