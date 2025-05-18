const { Op } = require("sequelize");
const { products, variation } = require("../../models");
const Redis = require("redis");
const redisClient = Redis.createClient({
  username: process.env.REDIS_DBNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    legacyMode: true,
  },
});
redisClient.connect(console.log("rediss connected")).catch(console.error);


const getAllproducts = async (req, res) => {
  try {
    let allProducts;

    if (redisClient.isReady) {
      allProducts = await redisClient.get("products");
    }
    if (allProducts) {
      // console.log("Cache hit");
      return res.status(200).json(JSON.parse(allProducts));
    } else {
      // console.log("cache miss");
      allProducts = await products.findAll({ include: variation });
      if (!allProducts) {
        return res.status(204).json({ message: "no products found" });
      }
      if (redisClient.isReady) {
        redisClient.setEx("products", process.env.REDIS_EX_TTL, JSON.stringify(allProducts));
      }
    }

    return res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
  }
};

const getSliderProducts = async (req, res) => {
  try {
    let productSlider;

    if(redisClient.isReady){
      productSlider = await redisClient.get("productSlider");
    }
    if(productSlider){
      // console.log("Cache hit");
      return res.status(200).json(JSON.parse(productSlider))
    }else{
      // console.log("cache miss");
      productSlider = await await products.findAll({
        where: { isSlider: "slider" },
      });
      if (!productSlider) {
        return res.status(204).json({ message: "No products found" });
      }
      if(redisClient.isReady){
        redisClient.setEx("productSlider",process.env.REDIS_EX_TTL,JSON.stringify(productSlider))
      }
    }

    return res.status(200).json(productSlider);
  } catch (err) {
    console.log(err);
  }
};

const getNewProducts = async (req, res) => {
  try {
    let newProducts;

    if(redisClient.isReady){
      newProducts = await redisClient.get("newProducts");
    }
    if(newProducts){
      // console.log("Cache hit");
      return res.status(200).json(JSON.parse(newProducts))
    }else{
      // console.log("cache miss");
      newProducts = await products.findAll({
        where: { newProduct: "newPrd" },
      });
      if (!newProducts) {
        return res.status(204).json({ message: "No new products found" });
      }
      if(redisClient.isReady){
        redisClient.setEx("newProducts",process.env.REDIS_EX_TTL,JSON.stringify(newProducts));
      }
    }

    return res.status(200).json(newProducts);
  } catch (err) {
    console.log(err);
  }
};

const getOffer = async (req, res) => {
  try {
    let offerProduct;

    if(redisClient.isReady){
      offerProduct = await redisClient.get("offerProduct");
    }
    if(offerProduct){
      // console.log("Cache hit");
      return res.status(200).json(JSON.parse(offerProduct));
    }else{
      // console.log("Cache miss");
      offerProduct = await products.findOne({
        where: { isOffer: "yes" },
        include: variation,
      });
      if (!offerProduct) {
        return res.status(204).json({ message: "No offer found" });
      }
      if(redisClient.isReady){
        redisClient.setEx("offerProduct",process.env.REDIS_EX_TTL, JSON.stringify(offerProduct));
      }
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
      let prdCategoryName;

      if(redisClient.isReady){
        prdCategoryName = await redisClient.get(`prdCategoryName:${categoryName}`);
      }
      if(prdCategoryName){
        // console.log("Cache hit");
        return res.status(200).json(JSON.parse(prdCategoryName));
      }else{
        // console.log("cache miss");
        prdCategoryName = await products.findAll({
          where: { category: categoryName, isOffer: "no" },
          include: variation,
        });
        if(!prdCategoryName){
          return res.status(204).json({ message: "No products found" });
        }
        if(redisClient.isReady){
          redisClient.setEx(`prdCategoryName:${categoryName}`,process.env.REDIS_EX_TTL,JSON.stringify(prdCategoryName));
        }
      }
      return res.json(prdCategoryName);
    } else if (categoryName == "all") {
      let prdCategoryNameAll;

      if(redisClient.isReady){
        prdCategoryNameAll = await redisClient.get("prdCategoryNameAll")
      }
      if(prdCategoryNameAll){
        // console.log("Cache hit");
        return res.status(200).json(JSON.parse(prdCategoryNameAll));
      }else{
        // console.log("Cache miss");
        prdCategoryNameAll = await products.findAll({
          where: { isOffer: "no" },
          include: variation,
        });
        if(!prdCategoryNameAll){
          return res.status(204).json({ message: "No products found" });
        }
        if(redisClient.isReady){
          redisClient.setEx("prdCategoryNameAll",process.env.REDIS_EX_TTL,JSON.stringify(prdCategoryNameAll));
        }
      }
      return res.json(prdCategoryNameAll);
    } else if (q != "") {
      const productss = await products.findAll({
        where: { isOffer: "no", nameShop: { [Op.substring]: q } },
        include: variation,
      });
      return res.json(productss);
    } else {
      let allProducts;

      if (redisClient.isReady) {
        allProducts = await redisClient.get("allProduct");
      }
      if (allProducts) {
        // console.log("Cache hit");
        return res.status(200).json(JSON.parse(allProducts));
      } else {
        // console.log("cache miss");
        allProducts = await products.findAll({
          where: { isOffer: "no" },
          include: variation,
        });
        if (!allProducts) {
          return res.status(204).json({ message: "no products found" });
        }
        if (redisClient.isReady) {
          redisClient.setEx("allProduct", process.env.REDIS_EX_TTL, JSON.stringify(allProducts));
        }
      }
      return res.json(allProducts);
    }
  } catch (err) {
    console.log(err);
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    let relatedProducts;

    if(redisClient.isReady){
      relatedProducts = await redisClient.get("relatedProducts");
    }
    if(relatedProducts){
      // console.log("Cache hit");
      return res.status(200).json(JSON.parse(relatedProducts));
    }else{
      // console.log("cache miss");
      relatedProducts = await products.findAll({
        where: { relatedProduct: "related" },
      });
      if (!relatedProducts) {
        return res.status(204).json({ message: "no related products found" });
      }
      if(redisClient.isReady){
        redisClient.setEx("relatedProducts",process.env.REDIS_EX_TTL,JSON.stringify(relatedProducts))
      }
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
