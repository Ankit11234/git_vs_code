const User = require("../models/usermodel.js");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const hashed= await bcrypt.hash(password,12);
    const user = await User.create({ email, password:hashed, username, });

    // const user = new User({
    //   email,
    //   password:hashed,
    //   username,
    //   createdAt:Date.now()
    //   // token:createSecretToken(user._id)
    // })
    const token = createSecretToken(user._id);
    
    // await us.save();
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    res
      .status(201)
      .json({ message: "User registered in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
    //   console.log("user is ",user);
      if(!user){
        return res.json({message:'user not found' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }