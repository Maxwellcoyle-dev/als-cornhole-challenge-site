import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import useListEvents from "../hooks/useListEvents";
import { Card, List, Button, Typography, Flex } from "antd";
import dayjs from "dayjs";
import { IoLocationOutline } from "react-icons/io5";

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
    <Flex vertical>
      <Flex
        style={{
          position: "relative",
          height: "30rem",
          width: "100%",
          backgroundImage: `url(https://cornhole-site-asset-bucket.s3.us-east-2.amazonaws.com/hero-image-cornhole-board.svg)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#000",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#000",
            zIndex: 1,
            opacity: 0.4,
          }}
        />
        <Typography
          style={{
            position: "relative",
            zIndex: 2,
            width: "40%",
            marginLeft: "2rem",
          }}
        >
          <Title style={{ color: "#fff" }}>
            Welcome to Cornhole Tournaments
          </Title>
          <Paragraph style={{ color: "#fff" }}>
            Join us for our exciting cornhole tournaments and support a great
            cause! All proceeds from these events will be donated to support the
            fight against ALS, contributing directly to the ALS Foundation
            through the CEO Soak initiative.
          </Paragraph>
          <Paragraph style={{ color: "#fff" }}>
            We warmly welcome participants of all skill levels to our events.
            Whether you're a seasoned pro or just looking to have fun and
            support a great cause, your participation makes a difference.
          </Paragraph>
        </Typography>
      </Flex>
      <div style={{ marginLeft: "2rem", marginBottom: "4rem" }}>
        <Title style={{ marginBottom: "2rem" }} level={2}>
          Upcoming Tournaments
        </Title>
        <List
          grid={{ column: events?.length }}
          dataSource={events}
          renderItem={(event) => (
            <List.Item>
              <Card
                // cover={
                //   <img
                //     alt="Event"
                //     src={event.imagePath}
                //     style={{ width: "100%", height: "auto" }}
                //   />
                // }
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                }}
              >
                <Paragraph>
                  {dayjs(event.event_date).format("ddd, MMM d, YYYY")}
                </Paragraph>
                <Title level={5}>{event.name}</Title>
                <Paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <IoLocationOutline />
                  {event.location}
                </Paragraph>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "4rem",
                  }}
                >
                  <span>*ATTENDEES*</span>
                  <Link to={`/event/${event.event_id}`}>
                    <Button type="primary" block>
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Flex>
  );
};

export default HomePage;
