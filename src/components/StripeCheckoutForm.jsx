import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if Stripe.js has not yet loaded.
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // Call stripe.confirmPayment() with the PaymentElement
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Optional: Specify the behavior if additional authentication is needed
      confirmParams: {
        // Specify the return URL where the customer will be redirected after authentication
        return_url: "http://yourdomain.com/payment-success",
      },
    });

    if (result.error) {
      // Inform the customer that there was an error.
      setMessage(result.error.message);
      setIsLoading(false);
    } else {
      // The payment has been processed or is in the process of being processed
      setMessage("Payment processing or succeeded!");
      // You can check result.paymentIntent.status to provide more specific messaging
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default StripeCheckoutForm;
