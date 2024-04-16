import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Row, Col, Card, Typography, Button, Skeleton } from "antd";
import {
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import dayjs from "dayjs";

import useListEvents from "../../hooks/useListEvents";

import styles from "../../pages/HomePage/HomePage.module.css";

const { Title, Paragraph } = Typography;

const EventsComponent = ({ authStatus, eventsUseRef }) => {
  const navigate = useNavigate();
  const { events, eventsIsPending } = useListEvents();

  // return date/time value like so: 2024-04-12T12:00:00
  const eventDateTime = (event) => {
    return `${event.event_date}T${event.event_time}`;
  };

  const formattedStartTime = (startTime) => {
    // Creating a full date-time string with a fixed date
    const dateTime = `2000-01-01T${startTime}:00`;

    // Using Day.js to format this date-time string into 12-hour time format
    return dayjs(dateTime).format("h:mm A");
  };

  const currentDate = new Date();

  useEffect(() => {
    // sessionStorage.removeItem("postSignInRedirect");
    // extract session storage
    const storedSessionState = sessionStorage.getItem("postSignInRedirect");

    if (storedSessionState) {
      const sessionState = JSON.parse(storedSessionState);

      const pathname = sessionState?.pathname;
      const event = sessionState.state?.event;

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

  return (
    <Row
      ref={eventsUseRef}
      className={styles.eventCardRow}
      gutter={[32, 16]}
      justify="center"
      style={{
        backgroundColor: "lightgray",
      }}
    >
      <Col sm={19} md={18} lg={22} xl={22}>
        <Title style={{ margin: 0, fontSize: "1.6rem" }} level={2}>
          Upcoming Events
        </Title>
      </Col>

      {events?.map((event) => (
        <Col
          sm={20}
          md={20}
          lg={8}
          xl={8}
          style={{ width: "100%", height: "100%" }}
        >
          <Skeleton
            loading={eventsIsPending}
            active
            style={{
              margin: "1rem",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: 8,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          />

          {events && (
            <Card
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            >
              <Paragraph>
                {dayjs(event.event_date).format("ddd, MMM d, YYYY")} @{" "}
                {formattedStartTime(event.start_time)}
              </Paragraph>
              <Title level={5}>{event.name}</Title>
              <Flex vertical gap=".5rem">
                <Paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    margin: 0,
                  }}
                >
                  <IoLocationOutline color="blue" />
                  {event.location}
                </Paragraph>
                <Paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    margin: 0,
                  }}
                >
                  {eventDateTime(event) < currentDate ? (
                    <>
                      <IoLockClosedOutline color="red" /> Registration Closed
                    </>
                  ) : (
                    <>
                      <IoCheckmarkCircleOutline color="green" /> Registration
                      Open
                    </>
                  )}
                </Paragraph>
              </Flex>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3rem",
                }}
              >
                <Link to={`/event/${event.event_id}`}>
                  <Button block>View Details</Button>
                </Link>
              </div>
            </Card>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default EventsComponent;
