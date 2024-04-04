import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    // Parse the body from the event
    const body = JSON.parse(event.body);
    console.log("Body: ", body);
    const { items } = body;
    console.log("Items: ", items);

    // Calculate order amount on the server to prevent manipulation
    const calculateOrderAmount = (items) => {
      // Replace this with actual calculation logic
      return 5000;
    };

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // In the latest API version, specifying `automatic_payment_methods` is optional
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
