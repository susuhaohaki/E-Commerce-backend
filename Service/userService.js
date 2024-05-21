const userModel = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserSignUpService = async (data) => {
  try {
    if (!data.name) {
      throw new Error("Please provide name");
    }
    if (!data.email) {
      throw new Error("Please provide email");
    }

    if (!data.password) {
      throw new Error("Please provide password");
    }

    if (data.password.length < 8) {
      throw new Error("Password is not strong enough");
    }

    const emailExist = await userModel.findOne({ email: data.email });
    if (emailExist) {
      throw new Error("Email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(data.password, salt);
    const userData = new userModel({
      name: data.name,
      email: data.email,
      role: "GENERAL",
      password: hashPassword,
    });
    const saveUser = await userData.save();
    return saveUser;
  } catch (error) {
    throw error;
  }
};

const userSignInService = async (data) => {
  if (!data.email) {
    throw new Error("Please provide email");
  }
  if (!data.password) {
    throw new Error("Please provide password");
  }
  const user = await userModel.findOne({ email: data.email });
  if (!user) {
    throw new Error("user not found");
  }

  const checkPassword = await bcrypt.compare(data.password, user.password);
  if (checkPassword) {
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    return { token, user };
  } else {
    throw new Error("Please check password");
  }
};
const userDetailsService = async (userId) => {
  try {
    return await userModel.findById(userId);
  } catch (error) {}
};
module.exports = { UserSignUpService, userSignInService, userDetailsService };
