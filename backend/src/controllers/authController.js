const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt=require("jsonwebtoken")
const signup = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
  return res.status(400).json({
    success: false,
    message: "Identifier and password are required",
  });
}
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (user===null) {
      return res.status(404).json({
        success: false,
        message: "NO USER FOUND",
      });
    }
   const check=await bcrypt.compare(password,user.password);
   if(!check)
   {
    return res.status(401).json({
        success: false,
        message: "INVALID PASSWORD",
      });
   }
   const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
   return res.status(200).json({
    success:true,
    message:"LOGIN SUCCESSFUL",
    token:token
   });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = { signup,login };
