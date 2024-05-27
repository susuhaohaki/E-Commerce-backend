const userModel = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserSignUpService = async (data) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
const allUserService = async () => {
  return await userModel.find();
};

const updateUserService = async (data, sessionUser) => {
  try {
    const payload = {
      ...(data.email && { email: data.email }),
      ...(data.name && { name: data.name }),
      ...(data.role && { role: data.role }),
    };
    const result = await userModel.findByIdAndUpdate(data.userId, payload, {
      new: true,
    });
    const user = await userModel.findById(sessionUser);
    console.log("user.role", user.role);
    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  UserSignUpService,
  userSignInService,
  userDetailsService,
  allUserService,
  updateUserService,
};
