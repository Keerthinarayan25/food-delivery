import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    trim:true,
    minLength:4,
    maxLength:15,
    required:function(){
      return this.role ==="user" || this.role === "admin";
    },
  },
  restaurantName:{
    type:String,
    minLength:4,
    required: function () {
      return this.role === "restaurant";
    },
  },
  restaurantAddress:{
    type:String,
    required: function () {
      return this.role === "restaurant";
    },
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
  role:{
    type:String,
    required:true,
    enum:["admin","user","restaurant"]
  }
},{timestamps:true});


const User = mongoose.model('User', userSchema);

export default User;
