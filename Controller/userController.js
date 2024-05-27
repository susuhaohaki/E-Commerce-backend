const userModel = require("../Model/userModel.js");
const {
  UserSignUpService,
  userSignInService,
  userDetailsService,
  allUserService,
  updateUserService,
} = require("../Service/userService.js");

const userSignUpController = async (req, res) => {
  try {
    const data = req.body;
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
    const result = await UserSignUpService(data);
    return res.status(201).json({
      data: result,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const userSignInController = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) {
      throw new Error("Please provide email");
    }
    if (!data.password) {
      throw new Error("Please provide password");
    }
    const { user, token } = await userSignInService(data);
    const tokenOption = {
      httpOnly: true,
      secure: true,
    };
    return res.cookie("token", token, tokenOption).json({
      data: user,
      token: token,
      success: true,
      error: false,
      message: "login successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const userDetailsController = async (req, res) => {
  try {
    const response = await userDetailsService(req.userId);
    res.status(200).json({
      data: response,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getallUserController = async (req, res) => {
  try {
    const allUsers = await allUserService();
    res.status(200).json({
      message: "all user",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const sessionUser = req.userId;
    const data = await updateUserService(req.body, sessionUser);
    res.status(200).json({
      data: data,
      message: "update user successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = {
  userSignUpController,
  userSignInController,
  userDetailsController,
  userLogoutController,
  getallUserController,
  updateUserController,
};
