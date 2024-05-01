import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Spin, Typography } from "antd";

// Components
import StripeCheckoutForm from "./StripeCheckoutForm";

// Stripe promise - use publishable key from .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePaymentWrapper = ({
  event,
  setPaymentComplete,
  registrationFormData,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [cost, setCost] = useState(0);

  useEffect(() => {
    console.log("form data: ", registrationFormData);
    if (event && event.registration) {
      const item = event.registration.find(
        (item) =>
          item.registration_type.toLowerCase() ===
          registrationFormData.registrationType.toLowerCase()
      );

      setCost(item.price);
    }
  }, []);

  useEffect(() => {
    if (!event) {
      return;
    }

    // YGet the stripe client secret from Lambda Function - see Amplify/backend/function/stripePaymentIntentCreator/src/index.js
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "https://cc8gl6kr3h.execute-api.us-east-2.amazonaws.com/staging/stripe-payment-intent-creator-api",
          { items: [{ id: event.id, cost }] },
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
            eventCost={cost}
            setPaymentComplete={setPaymentComplete}
          />
        </Elements>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography.Title level={3}>Loading Payment Form</Typography.Title>
          <Spin />
        </div>
      )}
    </>
  );
};

export default StripePaymentWrapper;
