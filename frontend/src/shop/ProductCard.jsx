import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import ProductDetails from "./ProductDetails";
import axios from "../axiosApi/axios";

const ProductCard = () => {
  const [product, setProducts] = useState();
  const { uuid } = useParams();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await axios.get("/products");
      setProducts(allProducts.data);
    };

    getAllProducts();
  }, []);

  const results = product && product.filter((p) => p.uuid === uuid);

  return (
    <div className="wrapper-div detailPage">
      {results &&
        results.map((item) => <ProductDetails key={item.uuid} item={item} />)}

      {/* Related Product */}
      <RelatedProducts />
    </div>
  );
};

export default ProductCard;
