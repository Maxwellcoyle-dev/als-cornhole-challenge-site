import stripe from "stripe";

const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  // Make sure to use the right API version
  stripe.setApiVersion("2020-08-27");

  try {
    // Parse the body from the event
    const body = JSON.parse(event.body);
    const { items } = body;

    // Calculate order amount on the server to prevent manipulation
    const calculateOrderAmount = (items) => {
      // Replace this with actual calculation logic
      return 1400;
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
