import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Card, Typography, Button, List } from "antd";

const { Title, Text } = Typography;

const StripeCheckoutForm = ({ eventCost, setPaymentComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://yourdomain.com/payment-success",
      },
    });

    if (result.error) {
      setMessage(result.error.message);
      setIsLoading(false);
    } else {
      setMessage("Payment processing succeeded!");
      setIsLoading(false);
      setPaymentComplete(true);
    }
  };

  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        <Title level={3}>Payment</Title>
        <Title level={3}>${eventCost}</Title>
      </div>

      <form
        id="payment-form"
        onSubmit={handleSubmit}
        style={{ width: "100%", boxShadow: "none" }}
      >
        <PaymentElement id="payment-element" />
        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading || !stripe || !elements}
          loading={isLoading}
          style={{ width: "100%", height: "40px", marginTop: "20px" }}
        >
          Pay now
        </Button>
        {message && (
          <div style={{ color: "red", marginTop: "20px" }}>{message}</div>
        )}
      </form>
    </Card>
  );
};

export default StripeCheckoutForm;
