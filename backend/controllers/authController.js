const User=require('../models/User');
const bcrypt=require("bcrypt");
const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Just save the plain password; pre-save hook will hash it
    const userCreated = await User.create({ email, username, password });

    res.status(200).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      email: userCreated.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Password doesn't match" });
    }

    const token = await userExist.generateToken();

    res.status(200).json({
      msg: "Login Successful",
      token,
      email: userExist.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
  
module.exports={registerController,loginController};