import React from "react";
import { Card, Typography, Divider, Button } from "antd";
import {
  TeamOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";

const { Title, Text } = Typography;

const CheckoutInfoCard = ({ registrationFormData, event }) => {
  const {
    event_name: eventName,
    event_date: eventDate,
    event_location: eventLocation,
    event_address: eventAddress,
    start_time: startTime,
    doors_open: doorsOpen,
  } = event;

  const { registrationType } = registrationFormData;

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
          gap: ".5rem",
        }}
      >
        <Title level={4}>{eventName}</Title>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <CalendarOutlined style={{ width: "1.5rem", height: "1.5rem" }} />
          <Text>{eventDate}</Text>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <IoLocationOutline style={{ width: "1.5rem", height: "1.5rem" }} />
          <Text>
            {eventLocation} <br /> {eventAddress}
          </Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <IoTimeOutline style={{ width: "1.5rem", height: "1.5rem" }} />
          <Text>
            Doors Open @ {doorsOpen} <br /> Starts @ {startTime}{" "}
          </Text>
        </div>
      </div>

      <Divider style={{ margin: "20px 0" }} />
      <Title level={5} style={{ margin: 0, paddingBottom: "1rem" }}>
        Included
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {registrationType === "team" ? (
          <Text type="secondary">
            <TeamOutlined /> Team Registration
          </Text>
        ) : (
          <Text type="secondary">
            <UserOutlined /> Individual Registration (Player Pool)
          </Text>
        )}
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
      <Text type="secondary" style={{ padding: 0, margin: 0 }}>
        Payment due at the event (Cash or Venmo)
      </Text>
    </Card>
  );
};

export default CheckoutInfoCard;
