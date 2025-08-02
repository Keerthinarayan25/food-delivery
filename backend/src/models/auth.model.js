import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    trim:true,
    minLength:4,
    maxLength:15,
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
  role:{
    type:String,
    enum:["user"],
  }
},{timestamps:true});


const User = mongoose.model('User', userSchema);

export default User;
