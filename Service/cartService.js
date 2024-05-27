const CartModel = require("../Model/cartProduct.js");

const addToCartService = async (productId, currentUser) => {
  try {
    console.log(productId, "------", currentUser);
    const isProductAvailable = await CartModel.findOne({ productId });

    if (isProductAvailable) {
      return {
        message: "Product already exists in cart",
        success: true,
        error: false,
      };
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new CartModel(payload);
    console.log("newAddToCart", newAddToCart);
    const saveProduct = await newAddToCart.save();
    console.log();
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
  const count = await CartModel.countDocuments({ userId: userId });
  console.log("count", count);
  return count;
};
const cartViewProductService = async (currentUser) => {
  try {
    console.log(currentUser);
    return await CartModel.find({ userId: currentUser }).populate("productId");
  } catch (error) {
    console.log(error);
  }
};
const deleteCartProductService = async (id) => {
  console.log("id>>>>>", id);
  return await CartModel.deleteOne({ _id: id });
};
module.exports = {
  addToCartService,
  countAddToCartProductService,
  cartViewProductService,
  deleteCartProductService,
};
