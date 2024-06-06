import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Typography, Button, Row, Col, Card, Divider, Spin } from "antd";

import {
  IoArrowDownOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";

// components
import MapComponent from "../../components/Map/MapComponent";

// Hooks
import useListEvents from "../../hooks/useListEvents";

import styles from "./EventDetailsPage.module.css";

const { Title, Paragraph } = Typography;

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  const { events, eventsIsPending, eventsIsError } = useListEvents();

  const navigate = useNavigate();
  const { event_id } = useParams();

  useEffect(() => {
    if (events) {
      console.log("events: ", events);
      console.log("event_id: ", event_id);
      const selectedEvent = events?.find((e) => e.event_id === event_id);
      if (selectedEvent) {
        setEvent(selectedEvent);
      } else {
        setError(true);
      }
    }
  }, [events, event_id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  if (error) {
    return <div>Error: Event not found!</div>;
  }

  if (eventsIsPending) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          gap: "2rem",
        }}
      >
        <Title level={4}>Loading...</Title>
        <Spin size="large" />
      </div>
    );
  }

  if (event !== null) {
    return (
      <Row
        className={styles.eventDetailsPage}
        justify="center"
        gutter={[16, 0]} // [horizontal, vertical]}
      >
        <Col
          xl={12}
          lg={12}
          md={20}
          sm={20}
          xs={22}
          className={styles.heroSectionCol}
          justify="center"
        >
          <Card className={styles.heroCard}>
            <Paragraph className={styles.sectionSubTitle}>
              {event?.event_date}
            </Paragraph>
            <Title level={1} className={styles.level1SectionTitle}>
              {event?.event_name}
            </Title>
            <div className={styles.heroCardListItem}>
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                {event?.event_short_description}
              </Paragraph>
            </div>
            <Divider />
            <div className={styles.heroCardListItem}>
              <IoCalendarOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                {event.event_date}
              </Paragraph>
            </div>
            <div className={styles.heroCardListItem}>
              <IoLocationOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                {event.event_location}, {event.event_address}
              </Paragraph>
            </div>
            <div className={styles.heroCardListItem}>
              <IoTimeOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                Doors Open: {event.doors_open}
              </Paragraph>
            </div>
            <div className={styles.heroCardListItem}>
              <IoTimeOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                Start Time: {event.start_time}
              </Paragraph>
            </div>
            <Divider />
            <Paragraph
              style={{
                fontWeight: 600,
                fontSize: 24,
                paddingBottom: ".5rem",
                marginBottom: 0,
              }}
            >
              Registration
            </Paragraph>
            {event.registration.map((item, index) => (
              <div key={index} className={styles.heroCardListItem}>
                <Paragraph className={[styles.cardText, styles.textStyle]}>
                  {item.registration_type} - ${item.price}
                </Paragraph>
              </div>
            ))}

            <div className={styles.herCardButtonDiv}>
              <Button
                type="primary"
                size="large"
                className={styles.registerButton}
                onClick={() => navigate(`/registration/${event_id}`)}
              >
                Register
              </Button>
              <div className={styles.scrollDownInstructionsDiv}>
                <Paragraph style={{ margin: 0, padding: 0 }}>
                  Scroll down for more Information
                </Paragraph>
                <IoArrowDownOutline fontSize="2rem" />
              </div>
            </div>
          </Card>
        </Col>
        <Col
          xl={8}
          lg={8}
          md={20}
          sm={20}
          xs={22}
          className={styles.mapSectionCol}
          justify="center"
        >
          <MapComponent
            locationParams={event.location_params}
            googleMapsLink={event.google_maps_link}
          />
        </Col>
        <Divider />
        <Col sm={20} xs={22}>
          <Title level={2} className={styles.level2SectionTitle}>
            About
          </Title>
          {event.event_description.split("\n").map((line, index) => (
            <Paragraph key={index}>{line}</Paragraph>
          ))}
        </Col>
        <Col sm={20} xs={22} className={styles.includedSectionCol}>
          <Title level={2} className={styles.level2SectionTitle}>
            What's Included
          </Title>
          <div className={styles.includedContainerDiv}>
            {event.included.map((include, index) => (
              <div
                key={index}
                title={include.name}
                className={styles.includedCard}
              >
                <Title className={styles.level3SectionTitle} level={3}>
                  {include.name}
                </Title>
                <Paragraph>{include.description}</Paragraph>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    );
  }
};

export default EventDetailsPage;
