const stripeAPI = require("../stripe");

async function createCheckOutSession(req, res) {
  console.log(req);
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items, customer_email } = req.body;
  //  check req body has line items & email and

  if (!line_items || !customer_email) {
    return res.status(400).json({ error: "missing required session" });
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ["GB", "US"] },
    });
    console.log(session);
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "an err occured, unable to create session" });
  }
}

module.exports = createCheckOutSession;
