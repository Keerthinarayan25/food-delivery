import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  address:{
    type:String
  },
  image: {
    type: String, // URL to the image
    default: ''
  },
  phone:{
    type:String
  }
},{timestamps: true});

const Restaurants = mongoose.model('Restaurants', restaurantSchema);

export default Restaurants;