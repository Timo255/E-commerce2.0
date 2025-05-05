import React from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const CheckoutBtn = ({ cartItems, setCartItems }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post(
        "/checkout",
        JSON.stringify({ cartItems, userId: auth?.userId })
      );
      if(res?.data?.url){
        window.location.href = res.data.url
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <form className="cartContent">
      {auth.uuid ? (
        <button
          onClick={handleCheckout}
          type="button"
          className="checkout"
          style={{ cursor: "pointer", borderColor: "#F1510F" }}
        >
          Proceed To Checkout
        </button>
      ) : (
        <Link className="cartContent" to={"/login"}>
          <button
            type="button"
            className="checkout"
            style={{ cursor: "pointer", borderColor: "#F1510F" }}
          >
            Login To Checkout
          </button>
        </Link>
      )}
    </form>
  );
};

export default CheckoutBtn;
