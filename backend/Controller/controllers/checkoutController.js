const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { products } = require("../../models");

const handleCheckout = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        cart: JSON.stringify(req.body.cartItems),
      },
    });

    const line_items = await Promise.all(
      await req.body.cartItems.map(async (item) => {
        const validItem = await products.findOne({where: {id: item.productId}})
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: validItem.nameShop,
              description: item.variationName,
            },
            metadata: {
              id: item.id,
            },
            unit_amount: validItem.price * 100,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: "https://e-commerce2-0-1.onrender.com/orders?success=true",
      cancel_url: "https://e-commerce2-0-1.onrender.com/cart?cancel=true",
    });

    
    // req.session.cart = null;
    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleCheckout };
