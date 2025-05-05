import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ProductCart } from "../Context/OveralProvider";

const Orders = () => {
  const { auth } = useAuth;
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const [orderItems, setOrderItems] = useState();
  const [updateOrder, setUpdateOrder] = useState(false);
  const { setCartItems } = useContext(ProductCart);

  useEffect(() => {
    const clearCarts = async () => {
      if (searchParams.get("success") === "true") {
        try {
          await axiosPrivate.get("/cart/clearCart");
          setCartItems([]);
          toast.success("order created", {
            position: "top-center",
            autoClose: 2000,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    clearCarts();
  }, [searchParams]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await axiosPrivate.get("/orders");
      setOrderItems(res?.data?.orderData);
      setUpdateOrder(false);
    };
    getOrders();
  }, [updateOrder]);


  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.delete(`/orders/delete/${id}`);
      setUpdateOrder(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="wrapper-div">
      <div className="orderContainer">
        <h1 className="orderH1">Your Orders</h1>
        {orderItems?.length > 0 ? (
          orderItems.map((order) => (
            <div className="order" key={order.id}>
              <p className="orderDate">
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#F1510F",
                  }}
                >
                  Order date:{" "}
                </span>
                {order.updatedAt}
              </p>

              <div className="orderInfoBox">
                {order?.orderItems?.map((item) => (
                  <div className="orderInfo" key={item.id}>
                    <div className="orderImg">
                      <img
                        src={`http://localhost:3000/images/${item.imgUrl}`}
                        alt=""
                      />
                    </div>
                    <div className="orderDetails">
                      <p>{item.productName}</p>
                      <p>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "#f1530f85",
                          }}
                        >
                          Variation:{" "}
                        </span>{" "}
                        {item.variationName}
                      </p>
                      <p>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "#f1530f85",
                          }}
                        >
                          Qty:{" "}
                        </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "#f1530f85",
                          }}
                        >
                          price:{" "}
                        </span>
                        ${item.price}
                      </p>
                      <p>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "#f1530f85",
                          }}
                        >
                          Item Subtotal:{" "}
                        </span>
                        ${item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="orderTtl">
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#f1530f85",
                    }}
                  >
                    SubTotal:{" "}
                  </span>
                  ${order.subtotal / 100}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#f1530f85",
                    }}
                  >
                    Total:{" "}
                  </span>
                  ${order.total / 100}
                </p>
                <button
                  type="submit"
                  className="orderDelBtn"
                  onClick={(e) => handleDelete(e, order.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No Orders</h1>
        )}
      </div>
    </div>
  );
};

export default Orders;
