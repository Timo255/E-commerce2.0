import React from "react";
import { Link } from "react-router-dom";

const Products = ({ items }) => {
  return (
    <div className="product-img-div">
      {items &&
        items?.map((item) => (
          <div
            className={`product-img-details ${item.category}`}
            key={item.uuid}
          >
            <div className="img-product">
              <Link
                to={`/shop/${item.uuid}`}
                onClick={() => window.scroll(0, 0)}
              >
                <img src={`http://localhost:3000/images/${item.img}`} alt="" />
              </Link>
            </div>
            <div className="product-details">
              <div className="name-price">
                <p className="product-name" id="pn">
                  {item.nameShop}
                </p>
                <p className="price">${item.price}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
