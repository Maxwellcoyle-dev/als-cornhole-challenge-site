import React from "react";
import { Row, Col, Image, Typography, Button } from "antd";

import logo from "../../assets/site-logo.svg";

import styles from "../../pages/HomePage/HomePage.module.css";

const HeroComponent = ({ setScrollToEvents }) => {
  return (
    <Row style={{ height: "80vh" }} align="center">
      <Col
        lg={20}
        xs={22}
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
          className={styles.heroImage}
          style={{
            maxWidth: "600px",
            height: "auto",
            paddingBottom: "2rem",
          }}
        />
        <Typography.Title
          level={1}
          className={styles.levelOneFont}
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "1.6rem",
          }}
        >
          Cornhole events in Western PA, raising funds for local ALS causes.
        </Typography.Title>
        <Typography.Paragraph
          style={{ width: "100%", textAlign: "center" }}
          className={styles.levelFourFont}
        >
          Explore our upcoming cornhole events and discover more ways to
          contribute.
        </Typography.Paragraph>

        <Button
          type="primary"
          size="large"
          className={styles.eventsButton}
          style={{ width: "fit-content", fontSize: "1.5rem", height: "3rem" }}
          onClick={() => setScrollToEvents(true)}
        >
          See Events
        </Button>
      </Col>
    </Row>
  );
};

export default HeroComponent;
