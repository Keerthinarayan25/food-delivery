import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  restaurantId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Restaurants",
    required:true
  },
  name:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  category:{
    type:String,
    enum: ["Veg", "Non-Veg"],
    required:true
  },
  price:{
    type:Number,
    required:true,
    min:0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  image: {
  type: String,
  contentType: String,
  },
},{timestamps:true});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;