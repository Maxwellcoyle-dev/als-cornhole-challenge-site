import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Card,
  List,
  Button,
  Typography,
  Flex,
  Row,
  Col,
  Skeleton,
  Avatar,
  Image,
  Grid,
} from "antd";
import dayjs from "dayjs";
import {
  IoLocationOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
  IoOpenOutline,
} from "react-icons/io5";

import logo from "../../assets/site-logo.svg";
import mattsTeam from "../../assets/ceo-soak-team-matt.jpeg";
import ceoSoakImage from "../../assets/CEO_Soak_logo_with_ALSA_Logo.png";

import useListEvents from "../../hooks/useListEvents";

import styles from "./HomePage.module.css";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const { events } = useListEvents();

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
    <Flex vertical>
      <Row style={{ height: "80vh" }} align="center">
        <Col
          span={20}
          align="center"
          justify="center"
          style={{ margin: "auto" }}
          gap="2rem"
        >
          <Image
            preview={false}
            src={logo}
            alt="Hero Image"
            height="auto"
            width="90%"
            style={{
              maxWidth: "600px",
              height: "auto",
              paddingBottom: "2rem",
            }}
          />
          <Typography.Title
            level={1}
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "1.6rem",
            }}
          >
            Cornhole events in Western PA, raising funds for local ALS causes.
          </Typography.Title>
          <Typography.Paragraph style={{ width: "100%", textAlign: "center" }}>
            Explore our upcoming cornhole events and discover more ways to
            contribute.
          </Typography.Paragraph>

          <Button type="primary" size="large" style={{ width: "fit-content" }}>
            See Events
          </Button>
        </Col>
      </Row>

      <Row
        className={styles.eventCardRow}
        gutter={[16, 16]}
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
            <Card
              className={styles.eventCard}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                margin: "1rem",
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
          </Col>
        ))}
      </Row>

      <Row className={styles.aboutSectionRow}>
        <Row align="space-around" className={styles.aboutRow} justify="center">
          <Col
            xl={{ order: 1, span: 6 }}
            lg={{ order: 1, span: 8 }}
            md={{ order: 1, span: 10 }}
            sm={{ order: 2, span: 20 }}
            xs={{ order: 2, span: 21 }}
            align="center"
            justify="center"
          >
            <Image preview={false} src={ceoSoakImage} />
          </Col>

          <Col
            xs={{ order: 1, span: 21 }}
            sm={{ order: 1, span: 20 }}
            md={{ order: 2, span: 10 }}
            lg={{ order: 2, span: 9 }}
            xl={{ order: 2, span: 8 }}
            justify="center"
            align="center"
            style={{ textAlign: "left", alignContent: "center" }}
          >
            <Typography.Title style={{ fontSize: "1.6rem" }}>
              Our Mission
            </Typography.Title>
            <Typography.Paragraph>
              Our cornhole events are meant to bring people together around a
              simple game that we love, cornhole. At the same time, we want to
              do what we can to support the battle against ALS. All proceeds
              from the events go to support local ALS causes.
            </Typography.Paragraph>
          </Col>
        </Row>

        <Row align="space-around" className={styles.aboutRow}>
          <Col
            xs={{ order: 1, span: 21 }}
            sm={{ order: 1, span: 20 }}
            md={{ order: 2, span: 10 }}
            lg={{ order: 2, span: 9 }}
            xl={{ order: 2, span: 8 }}
            style={{ alignContent: "center" }}
          >
            <Typography.Title style={{ fontSize: "1.6rem" }}>
              Bringing people together
            </Typography.Title>
            <Typography.Paragraph style={{}}>
              During the summer of 2024, we are specifically reasing money to
              support Matt Henderson in the 2024 CEO Soak. Matt is the CEO of
              Henderson Construction Fabrics and Hope For Hispaniola. Matt has
              been battling ALS since 2021 and is raising participaing in the
              CEO Soak to raise funds for ALS research and support.
            </Typography.Paragraph>
          </Col>
          <Col
            xs={{ order: 1, span: 21 }}
            sm={{ order: 1, span: 20 }}
            md={{ order: 2, span: 10 }}
            lg={{ order: 2, span: 9 }}
            xl={{ order: 2, span: 8 }}
            align="center"
            justify="center"
          >
            <Image preview={false} src={mattsTeam} />
          </Col>
        </Row>
      </Row>

      <Row
        vertical
        align="center"
        justify="center"
        style={{ marginBottom: "8rem" }}
      >
        <Col xs={{ span: 21 }} lg={14} xl={16} align="center">
          <Typography.Title
            level={1}
            style={{
              textAlign: "center",
              paddingTop: "1.5rem",
              paddingBottom: ".5rem",
              fontSize: "1.6rem",
            }}
          >
            Want to donate directly?
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: "center" }}>
            Head over to the ALS Association website to donate directly to the
            ALS Association and support Matt Henderson in the 2024 CEO Soak.
          </Typography.Paragraph>
          <Button
            icon={<IoOpenOutline />}
            type="primary"
            style={{ width: "auto" }}
            size="large"
            href="https://secure2.convio.net/alsa/site/TR/ALSEvent/WesternPennsylvania?px=8776181&pg=personal&fr_id=16411"
            target="_blank"
          >
            Donate
          </Button>
        </Col>
      </Row>
    </Flex>
  );
};

export default HomePage;
