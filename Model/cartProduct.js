const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: mongoose.Schema.Types.ObjectId,
    },
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const CartModel = mongoose.model("addToCart", addToCartSchema);

module.exports = CartModel;
