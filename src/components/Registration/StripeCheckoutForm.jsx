import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Card, Typography, Button, List } from "antd";

const { Title } = Typography;

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
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        bordered={false}
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ color: "#1890ff", marginBottom: "40px" }}>
          Step 2: Payment
        </Title>

        {/* Minimalist Itemized List */}
        <List
          size="small"
          split={false}
          dataSource={[{ title: "Event Registration", cost: eventCost }]}
          renderItem={(item) => (
            <List.Item style={{ padding: "5px 0" }}>
              <span style={{ color: "#bbb", fontSize: "14px" }}>
                {item.title}
              </span>
              <span style={{ float: "right", color: "#000", fontSize: "14px" }}>
                ${item.cost}
              </span>
            </List.Item>
          )}
        />
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "10px",
            marginTop: "20px",
            fontWeight: "500",
          }}
        >
          <span>Total</span>
          <span style={{ float: "right" }}>${eventCost}</span>
        </div>

        <form
          id="payment-form"
          onSubmit={handleSubmit}
          style={{ marginTop: "40px" }}
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
    </div>
  );
};

export default StripeCheckoutForm;
