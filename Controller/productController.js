const {
  uploadProductService,
  getProductService,
  updateProductService,
  getCategoryService,
  getCategoryWiseProductService,
  getProductDetailService,
} = require("../Service/productService");
const uploadProductPermission = require("../helpers/permission");
const uploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new error("Permission denied");
    }
    const result = await uploadProductService(req.body);
    res.status(200).json({
      message: "product upload successfully",
      error: false,
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const getProductController = async (req, res) => {
  try {
    const allProduct = await getProductService();
    res.status(200).json({
      message: "All product",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new error("Permission denied");
    }
    const data = await updateProductService(req.body);
    res.status(200).json({
      message: "product update successfully",
      data: data,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const getCategoryProduct = async (req, res) => {
  try {
    const data = await getCategoryService(req.body);
    res.status(200).json({
      message: "category product",
      data: data,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const getCategoryWiseProductController = async (req, res) => {
  try {
    const data = await getCategoryWiseProductService(req.body);
    res.status(200).json({
      data: data,
      message: "product",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const getProductDetailController = async (req, res) => {
  try {
    console.log(req.body.productId);
    const data = await getProductDetailService(req.body.productId);
    res.status(200).json({
      data: data,
      message: "OK",
      success: true,
      error: false,
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
  uploadProductController,
  getProductController,
  updateProductController,
  getCategoryProduct,
  getCategoryWiseProductController,
  getProductDetailController,
};
