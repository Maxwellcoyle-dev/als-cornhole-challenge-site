import React from "react";
import { Card, Typography, Divider } from "antd";
import {
  TeamOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const CheckoutInfoCard = ({ registrationType }) => {
  const eventName = "June Cornhole Challenge";

  const teamName = "";
  const eventDate = "June 15, 2024";

  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Title level={4}>{eventName}</Title>
        <Text>
          <CalendarOutlined /> {eventDate}
        </Text>
        {registrationType === "team" ? (
          <Text>
            <TeamOutlined /> Team Registration
          </Text>
        ) : (
          <Text>
            <UserOutlined /> Individual Registration (Player Pool)
          </Text>
        )}
      </div>

      <Divider style={{ margin: "20px 0" }} />
      <Title level={5} style={{ margin: 0, paddingBottom: "1rem" }}>
        Included
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        <Text type="secondary">
          <CheckCircleOutlined /> Doubles Tournament
        </Text>
        <Text type="secondary">
          <CheckCircleOutlined /> One Shot Challenge
        </Text>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text strong style={{ padding: 0, margin: 0 }}>
          Total
        </Text>
        <Title level={3} style={{ padding: 0, margin: 0 }}>
          {registrationType === "team" ? `$50` : "$25"}
        </Title>
      </div>
    </Card>
  );
};

export default CheckoutInfoCard;
