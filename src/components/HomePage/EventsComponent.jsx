import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Typography, Button, Spin } from "antd";
import {
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import dayjs from "dayjs";

import useListEvents from "../../hooks/useListEvents";

import styles from "../../pages/HomePage/HomePage.module.css";

const { Title, Paragraph } = Typography;

const EventsComponent = ({ eventsUseRef }) => {
  const navigate = useNavigate();
  const { events, eventsIsPending } = useListEvents();

  console.log("events", events);

  const isFutureEvent = (event, currentDate) => {
    if (!event.event_date) {
      console.error("event_date is missing in the event object");
      return false;
    }

    // Parse the event_date correctly
    const eventDateTimeString = `${event.event_date} ${
      event.event_time || "00:00:00"
    }`;
    const eventDateTime = dayjs(eventDateTimeString, "MMMM D, YYYY HH:mm:ss");

    console.log("Parsed eventDateTime", eventDateTime.format());

    return eventDateTime.isAfter(currentDate);
  };

  const currentDate = dayjs();

  const handleViewEventDetailsClick = (eventId) => {
    console.log("eventId", eventId);
    console.log(typeof eventId);
    navigate(`/event/${eventId}`);
  };

  // Filter events to show only future events
  const futureEvents =
    events?.filter((event) => isFutureEvent(event, currentDate)) || [];

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

      {eventsIsPending && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "2rem 0",
          }}
        >
          <Spin size="large" />
        </div>
      )}

      {futureEvents.length === 0 && (
        <Col sm={19} md={18} lg={22} xl={22}>
          <Title
            style={{ margin: 0, marginBottom: "1rem", textAlign: "center" }}
            className={styles.levelFourFont}
            level={4}
          >
            No upcoming events
          </Title>
        </Col>
      )}

      {futureEvents.map((event, index) => (
        <Col
          xs={22}
          sm={20}
          md={20}
          lg={7}
          xl={7}
          xxl={7}
          style={{ width: "min-content" }}
          key={index}
        >
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
              {event.event_date} - Doors Open @ {event.doors_open}
            </Paragraph>
            <Title level={5} className={styles.levelFourFont}>
              {event.event_name}
            </Title>
            <div className={styles.flexVertical}>
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
                <IoCheckmarkCircleOutline
                  color="#228b22"
                  style={{ fontSize: 22 }}
                />{" "}
                Registration Open
              </Paragraph>
            </div>
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
        </Col>
      ))}
    </Row>
  );
};

export default EventsComponent;
