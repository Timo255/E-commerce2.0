const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { products, user, orderDetail, shipping } = require("../../models");

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

// create order in database using data from the webhook
const createOrder = async (customer, data) => {
  const items = await JSON.parse(customer.metadata.cart);

  try {
    const userId = customer.metadata.userId;
    const foundUser = await user.findOne({ where: { id: userId } });

    // creating orderDetail
    const userOrder = await foundUser.createOrderDetail({
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      payment_status: data.payment_status,
      customerId: data.customer,
      // userId: foundUser
    });

    await items.forEach(async (item) => {
      await userOrder.createOrderItem({
        productName: item.productName,
        quantity: item.quantity,
        imgUrl: item.imgUrl,
        productId: item.productId,
        variationName: item.variationName,
        price: item.price,
      });
    });

    // creating order shipping info
    const orderShipping = await userOrder.createShipping({
      email: data.customer_details.email,
      name: data.customer_details.name,
      phone: data.customer_details.phone,
      tax_exempt: data.customer_details.tax_exempt,
    });

    const shippingAddress = await orderShipping.createShippingAddress({
      city: data.customer_details.address.city,
      country: data.customer_details.address.country,
      line1: data.customer_details.address.line1,
      line2: data.customer_details.address.line2,
      postal_code: data.customer_details.address.postal_code,
      state: data.customer_details.address.state,
    });

    // after this you can send and email to the user to tell them order is completed and you can send a receit which includes order details
  } catch (err) {
    console.log(err);
  }
};


// handle webHook
const handleWebhook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // verifing that is coming from stripe
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Extract the object and eventType from the event.
  const data = event.data.object;
  const eventType = event.type;

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event

  res.sendStatus(200).end();
};

module.exports = { handleWebhook };
