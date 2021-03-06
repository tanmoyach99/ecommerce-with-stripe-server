const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const createCheckOutSession = require("./api/checkout.js");
const paymentIntent = require("./api/paymentIntent");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: true }));

app.get("/", (req, res) => res.send("Hello Worlds"));

app.post("/create-checkout-session", createCheckOutSession);

app.post("/create-payment-intent", paymentIntent);

app.listen(port, () => console.log("server listening on port", port));
