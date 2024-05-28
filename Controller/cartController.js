const {
  addToCartService,
  countAddToCartProductService,
  cartViewProductService,
  deleteCartProductService,
  updateAddToCartProductService,
} = require("../service/cartService.js");

const addToCartController = async (req, res) => {
  try {
    const currentUser = req.userId;
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
        count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in countAddToCartProductController:", error);
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
    console.error("Error in cartViewProductController:", error);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const updateAddToCartProductController = async (req, res) => {
  try {
    const currentUser = req.userId;
    const data = await updateAddToCartProductService(req.body);
    res.status(200).json({
      message: "Product Updated",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateAddToCartProductController:", error);
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
      message: "Product deleted from cart",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in deleteCartProductController:", error);
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
  updateAddToCartProductController,
};
