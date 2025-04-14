const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user with this username or email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
      },
      secretKey,
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({
      success: true,
      message: "user created successfully",
      accessToken,
    });
  } catch (error) {
    console.log("some error occured registering user : ", error);
    res.status(500).json({
      success: false,
      message: "some error occured while registering user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exists",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      secretKey,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      message: "user logged in",
      accessToken,
    });
  } catch (error) {
    console.log("some error occured registering user : ", error);
    res.status(500).json({
      success: false,
      message: "some error occured while signing in user",
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "old password is not correct",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newPaswordHash = await bcrypt.hash(newPassword, salt);

    user.password = newPaswordHash;
    await user.save();

    res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    console.log("some error occured changing password");
    res.status(500).json({
      success: false,
      message: "some error occured changing password",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, changePassword };
