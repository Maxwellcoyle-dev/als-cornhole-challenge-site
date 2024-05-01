import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Row, Col, Card, Typography, Button, Skeleton } from "antd";
import {
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
  IoBusinessOutline,
} from "react-icons/io5";
import dayjs from "dayjs";

import useListEvents from "../../hooks/useListEvents";
import events from "../../demoEventTableData.json";

import styles from "../../pages/HomePage/HomePage.module.css";

const { Title, Paragraph } = Typography;

const EventsComponent = ({ authStatus, eventsUseRef }) => {
  const navigate = useNavigate();
  // const { events, eventsIsPending } = useListEvents();

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

  const handleViewEventDetailsClick = (eventId) => {
    console.log("eventId", eventId);
    console.log(typeof eventId);
    navigate(`/event/${eventId}`);
  };

  return (
    <Row
      ref={eventsUseRef}
      className={styles.eventCardRow}
      gutter={[16, 16]}
      justify="center"
      style={{
        backgroundColor: "lightgray",
      }}
    >
      <Col sm={19} md={18} lg={22} xl={22}>
        <Title
          style={{ margin: 0, marginBottom: "1rem", textAlign: "center" }}
          className={styles.levelTwoFont}
          level={2}
        >
          Upcoming Events
        </Title>
      </Col>

      {events?.map((event, index) => (
        <Col
          xs={24}
          sm={20}
          md={20}
          lg={7}
          xl={7}
          xxl={7}
          style={{ width: "min-content" }}
          key={index}
        >
          {events && (
            <Card
              className={styles.eventCard}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            >
              <Paragraph className={styles.cardSubTitle}>
                {dayjs(event.event_date).format("ddd, MMM d, YYYY")} @{" "}
                {formattedStartTime(event.start_time)}
              </Paragraph>
              <Title level={5} className={styles.levelFourFont}>
                {event.event_name}
              </Title>
              <Flex vertical gap=".5rem">
                <Paragraph
                  className={styles.textStyle}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    margin: 0,
                  }}
                >
                  <IoLocationOutline color="#228b22" style={{ minWidth: 22 }} />
                  {event.event_location} - {event.event_address}
                </Paragraph>

                <Paragraph
                  className={styles.textStyle}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    margin: 0,
                  }}
                >
                  {eventDateTime(event) < currentDate ? (
                    <>
                      <IoLockClosedOutline
                        color="red"
                        style={{ fontSize: 22 }}
                      />{" "}
                      Registration Closed
                    </>
                  ) : (
                    <>
                      <IoCheckmarkCircleOutline
                        color="#228b22"
                        style={{ fontSize: 22 }}
                      />{" "}
                      Registration Open
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
                <Button
                  onClick={() => handleViewEventDetailsClick(event.event_id)}
                  block
                  type="default"
                  className={styles.eventCardButton}
                  size="large"
                >
                  View Details
                </Button>
              </div>
            </Card>
          )}
        </Col>
      ))}
    </Row>
  );
};

export default EventsComponent;