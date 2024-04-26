import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registrationInfo, includedItems } from "../../registrationInfo";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Typography, Button, List, Row, Col, Card, Image } from "antd";
import {
  IoArrowDownOutline,
  IoCheckboxOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPricetagOutline,
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
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const navigate = useNavigate();
  const { event_id } = useParams();
  const { events, isPending, isError } = useListEvents();

  const event = events?.find((event) => event.event_id === event_id);
  const { eventRegistrations } = useListEventRegistrations(event_id);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  useEffect(() => {
    console.log("eventRegistrations", eventRegistrations);
  }, [eventRegistrations]);

  if (isPending) {
    return <Title>Loading...</Title>;
  }

  if (isError) {
    return <Title>Error loading events</Title>;
  }

  return (
    <>
      <Row
        style={{ margin: 0, padding: 0 }}
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
              {event?.name}
            </Title>
            <div className={styles.heroCardListItem}>
              <IoCalendarOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                {event?.event_date}
              </Paragraph>
            </div>
            <div className={styles.heroCardListItem}>
              <IoLocationOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                {event?.location}
              </Paragraph>
            </div>
            <div className={styles.heroCardListItem}>
              <IoTimeOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                {event?.start_time}
              </Paragraph>
            </div>
            <div className={styles.heroCardListItem}>
              <IoPricetagOutline size={28} className={styles.basicIcon} />
              <Paragraph className={[styles.cardText, styles.textStyle]}>
                ${event?.cost}
              </Paragraph>
            </div>

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
              <Paragraph style={{ margin: 0, padding: 0, paddingLeft: "2rem" }}>
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

        <Col
          xl={19}
          lg={20}
          md={20}
          sm={20}
          xs={22}
          className={styles.sectionTwoCol}
          justify="center"
          alignItems="center"
          style={{ paddingBottom: "2rem" }}
        >
          <Title level={2} className={styles.level2SectionTitle}>
            Basic Info
          </Title>
          <Paragraph
            style={{ paddingBottom: ".75rem" }}
            className={styles.textStyle}
          >
            The proceeds from this event will be donated directly to the ALS
            Association supporting Matt Henderson in the 2024 CEO Soak.
          </Paragraph>
          <Paragraph className={styles.textStyle}>
            This event is designed to bring people together, create some fun
            competition, and support an important cause. All skill levels are
            welcome. Depending on the number of registrations we may create 2
            brackets based on skill level.
          </Paragraph>
        </Col>
        <Col
          xl={19}
          lg={20}
          md={20}
          sm={20}
          xs={22}
          className={styles.sectionThreeCol}
          justify="center"
          alignItems="center"
          style={{ paddingBottom: "2rem" }}
        >
          <Title level={2} className={styles.level2SectionTitle}>
            Registration
          </Title>
          <Paragraph className={styles.textStyle}>
            Registration is open for teams (max 3 per team) and individuals
            (partner draw). $50 for team registration. Max 3 players per team.
            $25 for individual registration. We will place you on a team.
          </Paragraph>
        </Col>

        <Col
          xl={19}
          lg={20}
          md={20}
          sm={20}
          xs={22}
          className={styles.sectionFourCol}
        >
          <Title level={2} className={styles.level2SectionTitle}>
            What's included
          </Title>
          <Paragraph className={styles.textStyle}>
            Registering for this event enters you into 2 events. The{" "}
            <strong> Double Elimination Team Tournament</strong> and the{" "}
            <strong>One Shot Challenge</strong>.
          </Paragraph>
        </Col>

        {includedItems.map((option, index) => (
          <Col
            xl={{ span: 9 }}
            lg={12}
            md={20}
            sm={20}
            xs={22}
            style={{ paddingTop: "1rem" }}
            key={index}
          >
            <Card
              className={styles.innerCard}
              style={{ padding: 0 }}
              title={
                <Title style={{ fontSize: "24px", textWrap: "wrap" }} level={5}>
                  {option.optionName}
                </Title>
              }
              key={index}
            >
              <List
                split={false}
                dataSource={option.descipriton}
                renderItem={(item) => (
                  <List.Item className={styles.innerCardListItem}>
                    <div style={{}}>
                      <IoCheckboxOutline
                        style={{
                          minWidth: "1.5rem",
                          minHeight: "1rem",
                          color: "green",
                        }}
                      />
                      <Paragraph
                        style={{
                          margin: 0,
                          padding: 0,
                          textWrap: "wrap",
                          fontSize: "21px",
                        }}
                      >
                        {item}
                      </Paragraph>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
        <Col
          xl={8}
          lg={8}
          md={10}
          sm={10}
          xs={20}
          className={[styles.sectionRegisterCol, styles.imageCol]}
        >
          <Image src={cornholeBoard} alt="Cornhole Board" />
        </Col>
        <Col
          xl={8}
          lg={8}
          md={16}
          sm={20}
          xs={20}
          className={styles.sectionRegisterCol}
        >
          <div className={styles.registrationFlexDiv}>
            <Title level={2} style={{ textAlign: "center" }}>
              Register and save your spot today.
            </Title>
            {authStatus === "authenticated" ? (
              <Button
                type="primary"
                size="large"
                className={styles.registerButton}
                onClick={() => navigate(`/registration/${event_id}`)}
              >
                Register
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                className={styles.registerButton}
                onClick={() => navigate("/login")}
              >
                Create an Account or Login to Register <IoArrowDownOutline />
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EventDetailsPage;
