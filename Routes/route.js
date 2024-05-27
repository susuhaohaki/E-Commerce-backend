const express = require("express");
//import user
const {
  userSignUpController,
  userSignInController,
  userDetailsController,
  userLogoutController,
  getallUserController,
  updateUserController,
} = require("../Controller/userController.js");
//import product
const {
  uploadProductController,
  getProductController,
  updateProductController,
  getCategoryProduct,
  getCategoryWiseProductController,
  getProductDetailController,
} = require("../Controller/productController.js");
//import cart
const {
  addToCartController,
  countAddToCartProductController,
  cartViewProductController,
  deleteCartProductController,
} = require("../Controller/cartController.js");
const authToken = require("../middleware/authToken.js");
const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogoutController);

//admin panel
router.get("/all-user", authToken, getallUserController);
router.post("/update-user", authToken, updateUserController);

//product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProductController);
router.post("/product-details", getProductDetailController);

//cart
router.post("/addtocart", authToken, addToCartController);
router.get(
  "/countAddToCartProduct",
  authToken,
  countAddToCartProductController
);
router.get("/view-card-product", authToken, cartViewProductController);
router.post("/delete-cart-product", deleteCartProductController);
module.exports = router;
