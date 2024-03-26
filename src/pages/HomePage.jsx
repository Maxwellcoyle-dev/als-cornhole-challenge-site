import React from "react";
import { Link } from "react-router-dom";
import { events } from "../events"; // Double-check this path
import { Card, List, Button, Typography, Flex, Image } from "antd";
const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <Flex style={{ padding: "20px" }} vertical>
      <Flex style={{ marginBottom: "20px" }}>
        <Typography>
          <Title>Welcome to Cornhole Tournaments</Title>
          <Paragraph>
            Join us for our exciting cornhole tournaments and support a great
            cause! All proceeds from these events will be donated to support the
            fight against ALS, contributing directly to the ALS Foundation
            through the CEO Soak initiative.
          </Paragraph>
          <Paragraph>
            We warmly welcome participants of all skill levels to our events.
            Whether you're a seasoned pro or just looking to have fun and
            support a great cause, your participation makes a difference.
          </Paragraph>
        </Typography>
        <Image
          src="https://cornhole-site-asset-bucket.s3.us-east-2.amazonaws.com/hero-image-cornhole-board.svg"
          width="100%"
        />
      </Flex>

      <Title level={2}>Upcoming Tournaments</Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item>
            <Card
              title={event.name}
              cover={
                <img
                  alt="Event"
                  src={event.imagePath}
                  style={{ width: "100%", height: "auto" }}
                />
              }
            >
              <Paragraph>Date: {event.date}</Paragraph>
              <Paragraph>Location: {event.location}</Paragraph>
              <Link to={`/event/${event.id}`}>
                <Button type="primary" block>
                  View Details
                </Button>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
};

export default HomePage;
