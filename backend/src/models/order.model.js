import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
  restaurantId:{
    type:mongoose.Types.ObjectId,
    ref:'Restaurants',
    required:true,
  },
  items:[{
    menuItem:{
      type:mongoose.Types.ObjectId,
      ref:"MenuItem",
      required:true
    },
    quantity:{
      type:Number,
      required:true,
      min:1
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['placed', 'accepted', 'preparing', 'out for delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);

export default Order;