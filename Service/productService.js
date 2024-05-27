const productModel = require("../Model/productModel");

const uploadProductService = async (data) => {
  try {
    const uploadProduct = new productModel(data);
    return await uploadProduct.save();
  } catch (error) {
    console.log(error);
  }
};
const getProductService = async () => {
  try {
    return await productModel.find().sort({ createdAt: -1 });
  } catch (error) {
    console.log(error);
  }
};
const updateProductService = async (data) => {
  const { _id, ...resBody } = data;
  return await productModel.findByIdAndUpdate(_id, resBody);
};
const getCategoryService = async () => {
  try {
    const productCategory = await productModel.distinct("category");

    // Tạo mảng các promise để tìm một sản phẩm từ mỗi danh mục
    const productPromises = productCategory.map((category) =>
      productModel.findOne({ category })
    );

    // Chờ tất cả các promise hoàn thành
    const products = await Promise.all(productPromises);

    // Lọc ra các sản phẩm hợp lệ (không phải null hoặc undefined)
    const productByCategory = products.filter((product) => product !== null);

    return productByCategory;
  } catch (error) {
    console.log(error);
  }
};
const getCategoryWiseProductService = async (data) => {
  const { category } = data;
  return await productModel.find({ category });
};

const getProductDetailService = async (productId) => {
  try {
    return await productModel.findById(productId);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  uploadProductService,
  getProductService,
  updateProductService,
  getCategoryService,
  getCategoryWiseProductService,
  getProductDetailService,
};
