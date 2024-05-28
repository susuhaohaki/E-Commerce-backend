const CartModel = require("../model/cartProduct.js");

const addToCartService = async (productId, currentUser) => {
  try {
    const isProductAvailable = await CartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return {
        message: "Product already exists in cart",
        success: true,
        error: false,
      };
    }

    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new CartModel(payload);
    const saveProduct = await newAddToCart.save();

    return {
      data: saveProduct,
      message: "Product added to cart",
      success: true,
      error: false,
    };
  } catch (error) {
    console.error("Error in addToCartService:", error);
    throw new Error("Failed to add product to cart");
  }
};

const countAddToCartProductService = async (userId) => {
  try {
    const count = await CartModel.countDocuments({ userId });
    return count;
  } catch (error) {
    console.error("Error in countAddToCartProductService:", error);
    throw new Error("Failed to count cart products");
  }
};

const cartViewProductService = async (currentUser) => {
  try {
    return await CartModel.find({ userId: currentUser }).populate("productId");
  } catch (error) {
    console.error("Error in cartViewProductService:", error);
    throw new Error("Failed to retrieve cart products");
  }
};

const deleteCartProductService = async (id) => {
  try {
    return await CartModel.deleteOne({ _id: id });
  } catch (error) {
    console.error("Error in deleteCartProductService:", error);
    throw new Error("Failed to delete cart product");
  }
};

const updateAddToCartProductService = async (data) => {
  try {
    return await CartModel.updateOne(
      { _id: data._id },
      { quantity: data.quantity }
    );
  } catch (error) {
    console.error("Error in updateAddToCartProductService:", error);
    throw new Error("Failed to update cart product");
  }
};

module.exports = {
  addToCartService,
  countAddToCartProductService,
  cartViewProductService,
  deleteCartProductService,
  updateAddToCartProductService,
};
