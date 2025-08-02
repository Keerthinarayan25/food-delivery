import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  menuItem:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true
  },
  quantity:{
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  items:[orderItemSchema],
  totalPrice:{
    type: Number,
    required: true
  },
  status:{
    type: String,
    enum: ["placed", "preparing", "ready", "delivered", "cancelled"],
    default: "placed"
  },
  deliveryAddress:{
    type: String
  }, 
}, { timestamps: true });


const Order = mongoose.model('Order',orderSchema);

export default Order;