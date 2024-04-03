import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import useListEvents from "../hooks/useListEvents";

import { Card, List, Button, Typography, Flex, Image } from "antd";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const { events, isError, isPending } = useListEvents();

  useEffect(() => {
    // sessionStorage.removeItem("postSignInRedirect");
    console.log("homepage events: ", events);
    // extract session storage
    const storedSessionState = sessionStorage.getItem("postSignInRedirect");

    if (storedSessionState) {
      const sessionState = JSON.parse(storedSessionState);
      console.log("session state: ", sessionState);

      const pathname = sessionState.pathname;
      const event = sessionState.state?.event;
      console.log("pathname: ", pathname);
      console.log("eventID: ", event);

      console.log("authStatus: ", authStatus);

      const navigateToRegistration = () =>
        navigate("/registration", { state: { event } });
      if (
        pathname === "/registration" &&
        event &&
        authStatus === "authenticated"
      ) {
        console.log("navigating to registration page");
        navigateToRegistration();
        // clear session storage
        sessionStorage.removeItem("postSignInRedirect");
      }
    }
  }, [authStatus]);

  useEffect(() => {
    console.log("events: ", events);
  }, []);

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
              // cover={
              //   <img
              //     alt="Event"
              //     src={event.imagePath}
              //     style={{ width: "100%", height: "auto" }}
              //   />
              // }
            >
              <Paragraph>Date: {event.event_date}</Paragraph>
              <Paragraph>Location: {event.location}</Paragraph>
              <Link to={`/event/${event.event_id}`}>
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
