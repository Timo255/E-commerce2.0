const { Op } = require("sequelize");
const { products, variation } = require("../../models");


const getAllproducts = async (req, res) => {
  try {
    const allProducts = await products.findAll({ include: variation });

    if (!allProducts) {
      return res.status(204).json({ message: "no products found" });
    }

    return res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
  }
};

const getSliderProducts = async (req, res) => {
  try {
    const productSlider = await products.findAll({
      where: { isSlider: "slider" },
    });

    if (!productSlider) {
      return res.status(204).json({ message: "No products found" });
    }
    return res.status(200).json(productSlider);
  } catch (err) {
    console.log(err);
  }
};

const getNewProducts = async (req, res) => {
  try {
    const newProducts = await products.findAll({
      where: { newProduct: "newPrd" },
    });

    if (!newProducts) {
      return res.status(204).json({ message: "No new products found" });
    }

    res.status(200).json(newProducts);
  } catch (err) {
    console.log(err);
  }
};

const getOffer = async (req, res) => {
  try {
    const offerProduct = await products.findOne({
      where: { isOffer: "yes" },
      include: variation,
    });
    if (!offerProduct) {
      return res.status(204).json({ message: "No offer found" });
    }

    return res.status(200).json(offerProduct);
  } catch (err) {
    console.log(err);
  }
};
// keyword=black futon
const getQueryProducts = async (req, res) => {
  const { categoryName, q } = req.query;

  try {
    if (categoryName != "" && categoryName != "all") {
      const productss = await products.findAll({
        where: { category: categoryName, isOffer: "no" },
        include: variation,
      });
      return res.json(productss);
    } else if (categoryName == "all") {
      const productss = await products.findAll({
        where: { isOffer: "no" },
        include: variation,
      });
      return res.json(productss);
    } else if (q != "") {
      const productss = await products.findAll({
        where: { isOffer: "no", nameShop: { [Op.substring]: q } },
        include: variation,
      });
      return res.json(productss);
    } else {
      const productss = await products.findAll({
        where: { isOffer: "no" },
        include: variation,
      });
      return res.json(productss);
    }
  } catch (err) {
    console.log(err);
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const relatedProducts = await products.findAll({
      where: { relatedProduct: "related" },
    });

    if (!relatedProducts) {
      return res.status(204).json({ message: "no related products found" });
    }

    return res.status(200).json(relatedProducts);
  } catch (err) {
    console.log(err);
  }
};

const getProductsById = async (req, res) => {
  try {
    const productsAll = await products.findByPk(1, {
      include: variation,
    });

    res.json(productsAll);
  } catch (err) {
    console.log(err);
  }
};

// function for seting data to cache and getting it
function getorSetCache(key, cb) {
  const defaultExp = 3600;
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await cb();
      redisClient.setex(key, defaultExp, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}

module.exports = {
  // createProduct,
  getAllproducts,
  getSliderProducts,
  getNewProducts,
  getOffer,
  getQueryProducts,
  getRelatedProducts,
  getProductsById,
};
