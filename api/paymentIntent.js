const stripeAPI = require("../stripe");

const calculateOrderAmount = (cartItems) => {
  return (
    cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) * 100
  );
};

async function paymentIntent(req, res) {
  const { cartItems, description, receipt_email, shipping } = req.body;
  let paymentIntent;
  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "usd",
      description,
      payment_method_types: ["card"],
      receipt_email,
      shipping,
    });
    console.log(paymentIntent.client_secret);
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = paymentIntent;
