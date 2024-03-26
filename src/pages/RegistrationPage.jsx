// Import useEffect and useState if not already imported
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const RegistrationPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const event = location.state?.event;

  useEffect(() => {
    // Your existing createPaymentIntent logic, slightly modified
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

    if (event) {
      createPaymentIntent();
    }
  }, [event]);

  return (
    <div className="App">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm event={event} />
        </Elements>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default RegistrationPage;
