import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Typography, Button, List, Row, Col, Card, Image, Divider } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import {
  IoArrowDownOutline,
  IoCheckboxOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPricetagOutline,
  IoPersonOutline,
} from "react-icons/io5";

// Assets
import cornholeBoard from "../../assets/cornholeboard.jpg";

// components
import MapComponent from "../../components/Map/MapComponent";

// Hooks
import useListEvents from "../../hooks/useListEvents";
import useListEventRegistrations from "../../hooks/useListEventRegistrations";

import styles from "./EventDetailsPage.module.css";

const { Title, Paragraph } = Typography;

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  const { events, eventsIsPending, eventsIsError } = useListEvents();

  const navigate = useNavigate();
  const { event_id } = useParams();

  useEffect(() => {
    const selectedEvent = events.find((e) => e.event_id === event_id);
    if (selectedEvent) {
      setEvent(selectedEvent);
    } else {
      setError(true);
    }
  }, [event_id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  if (error) {
    return <div>Error: Event not found!</div>;
  }

  if (event === null) {
    return <div>Loading...</div>;
  }

  if (event !== null) {
    return (
      <>
        <Row
          style={{ margin: 0, padding: 0, marginBottom: "4rem" }}
          id="eventDetailsPage"
          className={styles.eventDetailsPage}
          justify="center"
          alignItems="center"
          gutter={[16, 0]} // [horizontal, vertical]}
        >
          <Col
            xl={{ span: 10 }}
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
                  {event.event_location}
                </Paragraph>
              </div>
              <div className={styles.heroCardListItem}>
                <IoTimeOutline size={28} className={styles.basicIcon} />
                <Paragraph className={[styles.cardText, styles.textStyle]}>
                  {event.start_time}
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  paddingTop: "2rem",
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  className={styles.registerButton}
                  onClick={() => navigate(`/registration/${event_id}`)}
                >
                  Register
                </Button>
                <Paragraph
                  style={{ margin: 0, padding: 0, paddingLeft: "2rem" }}
                >
                  More Information
                </Paragraph>
                <IoArrowDownOutline />
              </div>
            </Card>
          </Col>
          <Col
            xl={{ span: 10 }}
            lg={8}
            md={20}
            sm={20}
            xs={22}
            className={styles.mapSectionCol}
            justify="center"
          >
            <MapComponent />
          </Col>

          <Col span={20}>
            <Title level={2}>About</Title>
            {event.event_description.split("\n").map((line, index) => (
              <Paragraph key={index}>{line}</Paragraph>
            ))}
          </Col>
          <Col span={20}>
            <Title level={2}>What's Included</Title>
            {event.included.map((include, index) => (
              <Card key={index} title={include.name}>
                <Paragraph>{include.description}</Paragraph>
              </Card>
            ))}
          </Col>
        </Row>
      </>
    );
  }
};

export default EventDetailsPage;
