const {
  uploadProductService,
  getProductService,
  updateProductService,
  getCategoryService,
  getCategoryWiseProductService,
  getProductDetailService,
  searchProductService,
  filterProductService,
} = require("../service/productService");
const uploadProductPermission = require("../helpers/permission");

const uploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const result = await uploadProductService(req.body);
    res.status(200).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in uploadProductController:", error);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const allProduct = await getProductService();
    res.status(200).json({
      message: "All products",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    console.error("Error in getProductController:", error);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const data = await updateProductService(req.body);
    res.status(200).json({
      message: "Product updated successfully",
      data: data,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in updateProductController:", error);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const getCategoryProduct = async (req, res) => {
  try {
    const data = await getCategoryService();
    res.status(200).json({
      message: "Category products",
      data: data,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in getCategoryProduct:", error);
    res.status(400).json({
      message: error.message,
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
      message: "Products by category",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in getCategoryWiseProductController:", error);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const getProductDetailController = async (req, res) => {
  try {
    const { productId } = req.body;
    const data = await getProductDetailService(productId);
    res.status(200).json({
      data: data,
      message: "Product details",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in getProductDetailController:", error);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
const searchProductController = async (req, res) => {
  try {
    const query = req.query.q;
    console.log("query", query);
    const product = await searchProductService(query);
    res.status(200).json({
      data: product,
      message: "search product list",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in searchProductController:", error);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
const filterProductController = async (req, res) => {
  const product = await filterProductService(req.body.category);
  res.status(200).json({
    data: product,
    message: "product filter",
    error: false,
    success: true,
  });
};
module.exports = {
  uploadProductController,
  getProductController,
  updateProductController,
  getCategoryProduct,
  getCategoryWiseProductController,
  getProductDetailController,
  searchProductController,
  filterProductController,
};
