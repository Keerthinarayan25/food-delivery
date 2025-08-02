import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  restaurantName:{
    type:String,
    trim:true,
    minLength:4,
    required:true
  },
  restaurantAddress:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    match:[/\S+@\S+\.\S+/,'Please fill a valid email address']
  },
  password:{
    type:String,
    required:true,
    minLength:6
  },
  image: {
    type: String, // URL to the image
    default: ''
  },
  role:{
    type:String,
    enum:["restaurant"]
  },
},{timestamps: true});

const Restaurants = mongoose.model('Restaurants', restaurantSchema);

export default Restaurants;