import React, { useEffect } from "react";
import { signOut } from "aws-amplify/auth";
import { Card, List, Button, Avatar, Typography, Space, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Hooks
import useUserAttributes from "../hooks/useUserAttributes";
import useGetUserRegistrations from "../hooks/useGetUserRegistrations";

const { Title, Text } = Typography;

const MyAccountPage = () => {
  const { userAttributes } = useUserAttributes();
  const { userRegistrations } = useGetUserRegistrations();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", paddingTop: 20 }}>
      {/* User Account Information */}
      <Card bordered={false}>
        <Space
          direction="vertical"
          size="middle"
          style={{ display: "flex", alignItems: "left" }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <Title level={2}>My Account</Title>
          <Text strong>Email: </Text>
          {userAttributes?.email}
          <Text strong>Full Name: </Text>
          {userAttributes?.given_name} {userAttributes?.family_name}
          <Space>
            <Button type="primary" onClick={handleSignOut}>
              Sign Out
            </Button>
            {/* Placeholder for future Delete Account Button */}
            {/* <Button type="danger" onClick={handleDeleteAccount}>Delete Account</Button> */}
          </Space>
        </Space>
      </Card>

      <Divider />

      {/* Event Registrations List */}
      <Card title="Your Event Registrations">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={userRegistrations}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.event_name}
                extra={<a href={`events/${item.event_id}`}>More details</a>}
              >
                <p>
                  <strong>Team Name:</strong> {item.team_name}
                </p>
                <p>
                  <strong>Date:</strong> {item.event_date} at {item.start_time}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Registration Fee:</strong> Paid
                </p>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default MyAccountPage;
