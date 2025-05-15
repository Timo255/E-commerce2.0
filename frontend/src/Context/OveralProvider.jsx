import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";
import { toast } from "react-toastify";

export const ProductCart = createContext();

const OveralProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [updateBasket, setUpdateBasket] = useState(false);
  const { auth } = useAuth();
 
  
  useEffect(() => {
    let isMounted = true;
    // used to cancel the request if this component Unmount
    const controller = new AbortController(); 
    
    const getCartItems = async () => {
      try {
        const itemCart = await axios.get(`/cart`, {
          // enables to signal abort thats why we put the signal property in this request
          signal: controller.signal, 
        });
        isMounted && setCartItems(itemCart?.data?.cartDetails?.items);
        setUpdateBasket(false);
      } catch (err) {
        console.log(err)
      }
    };
    getCartItems();

    return () => {
      isMounted = false;

      // canceling the request when component Unmount
      controller.abort(); 
    };
  }, [updateBasket, auth]);

  // add to cart
  const addToCart = async ({
    productName,
    price,
    variationName,
    quantity,
    imgUrl,
    productId,
    variationUuid,
  }) => {
  
    const existingProductIndex =
    cartItems?.length > 0 && cartItems.filter(
        (item) =>
          item.productId == productId && item.variationName == variationName
      );

    if (!existingProductIndex.length) {
      try {
        await axiosPrivate.post(
          "/cart",
          JSON.stringify({
            productName,
            price,
            variationName,
            quantity,
            imgUrl,
            productId,
            variationUuid,
          })
        );
        setUpdateBasket(true);
        toast.success("item added to cart",{
          position: "top-center",
          autoClose: 2000,
        })
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("item already in cart",{
        position: "top-center",
        autoClose: 2000,
      })
      return;
    }
  };

  // updateQuantity
  const handleQuantity = async (item, e) => {
    const quantity = parseInt(e.target.value);
    const productId = item?.productId;

    try {
      await axios.put(`/cart/${productId}`, JSON.stringify({ quantity }));
      setCartItems(cartItems.map((item)=> item.productId === productId ? {...item, quantity} : item))
    } catch (err) {
      console.log(err);
    }
  };

  // single item subtotal calculation
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // delete item
  const removeItem = async (item) => {
    const productId = item.productId;
    try {
      await axios.delete(`/cart/${productId}`);
      setCartItems(cartItems.filter((cartItem) => cartItem.productId !== productId));

      toast.error("item deleted",{
        position: "top-center",
        autoClose: 2000,
      })
    } catch (err) {
      console.log(err);
    }
  };

  // icon cartNumber
  const cartNumber =
    cartItems &&
    cartItems.reduce((total, item) => {
      return parseInt(total) + item.quantity;
    }, 0);

  // cart subtotal
  const cartSubtotal =
    cartItems &&
    cartItems.reduce((total, item) => {
      return total + calculateTotalPrice(item);
    }, 0);


  const shipping = cartItems && cartItems.length > 0 ? 10 : 0;
  const finalTotal = parseInt(cartSubtotal) + shipping;

  const contextValue = {
    cartItems,
    setCartItems,
    updateBasket,
    setUpdateBasket,
    addToCart,
    handleQuantity,
    calculateTotalPrice,
    removeItem,
    cartNumber,
    cartSubtotal,
    finalTotal,
  };
  return (
    <ProductCart.Provider value={contextValue}>{children}</ProductCart.Provider>
  );
};

export default OveralProvider;
