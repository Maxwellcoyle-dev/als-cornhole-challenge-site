import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import StripeCheckoutForm from "./StripeCheckoutForm";

// Stripe promise - use publishable key from .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePaymentWrapper = ({ event, setPaymentComplete }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!event) {
      return;
    }

    // YGet the stripe client secret from Lambda Function - see Amplify/backend/function/stripePaymentIntentCreator/src/index.js
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "https://cc8gl6kr3h.execute-api.us-east-2.amazonaws.com/staging/stripe-payment-intent-creator-api",
          { items: [{ id: event.id }] },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error:", error.response);
      }
    };

    createPaymentIntent();
  }, [event]);

  return (
    <>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckoutForm
            eventCost={event.cost}
            setPaymentComplete={setPaymentComplete}
          />
        </Elements>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default StripePaymentWrapper;
