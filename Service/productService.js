const productModel = require("../model/productModel");

const uploadProductService = async (data) => {
  try {
    const uploadProduct = new productModel(data);
    return await uploadProduct.save();
  } catch (error) {
    console.error("Error in uploadProductService:", error);
    throw new Error("Failed to upload product");
  }
};

const getProductService = async () => {
  try {
    return await productModel.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error in getProductService:", error);
    throw new Error("Failed to fetch products");
  }
};

const updateProductService = async (data) => {
  try {
    const { _id, ...updateData } = data;
    return await productModel.findByIdAndUpdate(_id, updateData, { new: true });
  } catch (error) {
    console.error("Error in updateProductService:", error);
    throw new Error("Failed to update product");
  }
};

const getCategoryService = async () => {
  try {
    const productCategories = await productModel.distinct("category");

    const productPromises = productCategories.map((category) =>
      productModel.findOne({ category })
    );

    const products = await Promise.all(productPromises);
    return products.filter((product) => product !== null);
  } catch (error) {
    console.error("Error in getCategoryService:", error);
    throw new Error("Failed to fetch category products");
  }
};

const getCategoryWiseProductService = async (data) => {
  try {
    const { category } = data;
    return await productModel.find({ category });
  } catch (error) {
    console.error("Error in getCategoryWiseProductService:", error);
    throw new Error("Failed to fetch products by category");
  }
};

const getProductDetailService = async (productId) => {
  try {
    return await productModel.findById(productId);
  } catch (error) {
    console.error("Error in getProductDetailService:", error);
    throw new Error("Failed to fetch product details");
  }
};
const searchProductService = async (query) => {
  const regex = new RegExp(query, "i", "g");
  const product = await productModel.find({
    $or: [
      {
        productName: regex,
      },
      {
        category: regex,
      },
    ],
  });
  return product;
};
const filterProductService = async (category) => {
  const product = await productModel.find({
    category: {
      $in: category,
    },
  });
  return product;
};
module.exports = {
  uploadProductService,
  getProductService,
  updateProductService,
  getCategoryService,
  getCategoryWiseProductService,
  getProductDetailService,
  searchProductService,
  filterProductService,
};
