const userModel = require("../models/user.models.js");

const bcrypt = require("bcryptjs");


const jwt = require("jsonwebtoken");


//register callback
 const registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exisitingUser = await userModel.findOne({ email });    
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      email,
      username:name,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(208).json({
        success: false,
        message: "user not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(201).json({
        success: false,
        message: "Invalid email or passowrd",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      token,
      message: "login successfull",
    });
  } catch (error) {
    console.log(`login api error ${error}`);
    res.status(500).json({
      success: false,
      message: `Error in login controller ${error}`,
    });
  }
};

module.exports = {
    loginController,
    registerController,
}