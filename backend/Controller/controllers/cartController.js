const { cart, products, variation, cartItem, user } = require("../../models");

const addProductCart = async (req, res) => {
  const { productName, price, variationName, quantity, imgUrl, productId } =
    req.body;
    
  try {
    const cartItem = {
      productId,
      productName,
      variationName,
      imgUrl,
      quantity,
      price,
    };
    const { cart } = req.session;

    //inserting cartDetails in session
    if (cart) {
      req.session.cart.items.push(cartItem);
    } else {
      req.session.cart = {
        items: [cartItem],
      };
    }

    return res.status(200).json({ success: "item added to cart" });
  } catch (err) {
    console.log(err);
  }
};

const getCartProducts = async (req, res) => {
  try {
    const { cart } = req.session;

    if(cart){
      return res.status(200).json({ cartDetails: req.session.cart });
    }else{
      return res.status(204).json({ msg: "No item in cart" });
    }
    // return res.status(200).json({ cartDetails: req.session.cart });
  } catch (err) {
    console.log(err);
  }
};

const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  // console.log(`qty: ${quantity}`);
  // console.log(`id,put : ${productId}`)

  try {
    const updatedCart = await req.session.cart.items.map((item) => {
      if (item.productId == Number(productId)) {
        console.log(`item is equal `)
        item.quantity = Number(quantity);
      }

      return item;
    });

    req.session.cart.items = updatedCart;
    console.log(updatedCart)
    return res.status(200).json({ msg: "item updated" });
  } catch (err) {
    console.log(err);
  }
};

const deleteCartItem = async (req, res) => {
  const { productId } = req.params;
  console.log(`id,del : ${productId}`)

  try {
    const remainedItem = await req.session.cart.items.filter(
      (item) => item.productId !== Number(productId)
    );

    req.session.cart.items = remainedItem;
    res.status(200).json({ message: "item deleted" });
  } catch (err) {
    console.log(err);
  }
};

const handleClearCart = async (req, res) =>{
  try {
    // const { cart } = req.session;

    // if(cart){
    //   cart = null;
    //   return res.sendStatus(200)
    // }else{
    //   return res.sendStatus(204)
    // }
    req.session.cart = null;
    res.status(200).json({msg: "cart cleared"})
  } catch (error) {
    console.log(err)
  }
}

module.exports = {
  addProductCart,
  getCartProducts,
  updateQuantity,
  deleteCartItem,
  handleClearCart
};
