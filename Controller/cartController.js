const {
  addToCartService,
  countAddToCartProductService,
  cartViewProductService,
  deleteCartProductService,
} = require("../Service/cartService.js");

const addToCartController = async (req, res) => {
  try {
    const currentUser = req?.userId;
    const { productId } = req.body;

    const result = await addToCartService(productId, currentUser);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in addToCartController:", error);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
const countAddToCartProductController = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await countAddToCartProductService(userId);
    res.status(200).json({
      data: {
        count: count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in addToCartController:", error);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
const cartViewProductController = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduct = await cartViewProductService(currentUser);
    res.status(200).json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
const deleteCartProductController = async (req, res) => {
  try {
    const data = await deleteCartProductService(req.body._id);
    res.status(200).json({
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
module.exports = {
  addToCartController,
  countAddToCartProductController,
  cartViewProductController,
  deleteCartProductController,
};
