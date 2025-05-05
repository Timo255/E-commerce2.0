import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Offer = () => {
  const [productsOffer, setProductOffer] = useState();

  useEffect(() => {
    const getOffer = async () => {
      const offerProduct = await axios.get(
        "http://localhost:3000/products/offer"
      );
      setProductOffer(offerProduct?.data);
    };
    getOffer();
  }, []);

  return (
    <>
      {
        <Link
          key={productsOffer?.uuid}
          to={`/shop/${productsOffer?.uuid}`}
          onClick={() => window.scroll(0, 0)}
          className="offerLink"
        >
          <div id="offer">
            <div className="offer-details">
              <p className="discount">DISCOUNTED</p>
              <p className="sofa">Wonder Sofa</p>
              <p className="offer-discount">25% </p> <p className="off">off</p>{" "}
              <p className="on"> On Sale</p>
            </div>
            <div className="offer-img">
              <img
                src={`http://localhost:3000/images/${productsOffer?.imgLg439}`}
                alt=""
                srcSet={`http://localhost:3000/images/${productsOffer?.imgLg439} 437w,
                      http://localhost:3000/images/${productsOffer?.imgMd360} 360w`}
                sizes="(max-width: 480px) 360px, 437px"
              />
            </div>
          </div>
        </Link>
      }
    </>
  );
};

export default Offer;
