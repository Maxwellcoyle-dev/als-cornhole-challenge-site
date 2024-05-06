import React from "react";
import { Button, Row, Col, Typography, Image } from "antd";
import { IoOpenOutline } from "react-icons/io5";

import styles from "../../pages/HomePage/HomePage.module.css";

import ceoSoakImage from "../../assets/CEO_Soak_logo_with_ALSA_Logo.png";

const AboutComponent = ({ aboutUseRef }) => {
  return (
    <>
      <Row className={styles.aboutSectionRow} ref={aboutUseRef}>
        <Row align="space-around" className={styles.aboutRow} justify="center">
          <Col
            xl={{ order: 1, span: 6 }}
            lg={{ order: 1, span: 8 }}
            md={{ order: 1, span: 10 }}
            sm={{ order: 2, span: 20 }}
            xs={{ order: 2, span: 20 }}
            align="center"
            justify="center"
          >
            <Image preview={false} src={ceoSoakImage} />
          </Col>

          <Col
            xs={{ order: 1, span: 20 }}
            sm={{ order: 1, span: 20 }}
            md={{ order: 2, span: 10 }}
            lg={{ order: 2, span: 9 }}
            xl={{ order: 2, span: 8 }}
            justify="center"
            align="center"
            style={{ textAlign: "left", alignContent: "center" }}
          >
            <Typography.Title className={styles.levelTwoFont}>
              Our Mission
            </Typography.Title>
            <Typography.Paragraph className={styles.textStyle}>
              Our cornhole events are meant to bring people together around a
              simple game that we love, cornhole. At the same time, we want to
              do what we can to support the battle against ALS. All proceeds
              from the events go to support local ALS causes.
            </Typography.Paragraph>
          </Col>
        </Row>

        <Row align="space-around" className={styles.aboutRow}>
          <Col
            xs={{ order: 1, span: 20 }}
            sm={{ order: 1, span: 20 }}
            md={{ order: 2, span: 10 }}
            lg={{ order: 2, span: 9 }}
            xl={{ order: 2, span: 8 }}
            style={{ alignContent: "center" }}
          >
            <Typography.Title className={styles.levelTwoFont}>
              Bringing people together
            </Typography.Title>
            <Typography.Paragraph className={styles.textStyle}>
              During the summer of 2024, we're raising money to support Matt
              Henderson in the 2024 CEO Soak. Matt is the Founder & CEO of
              Henderson Construction Fabrics and Hope For Hispaniola. Matt has
              been battling ALS since 2021 and is participaing in the CEO Soak
              to raise funds for ALS research and support.
            </Typography.Paragraph>
          </Col>
          <Col
            xs={{ order: 1, span: 20 }}
            sm={{ order: 1, span: 20 }}
            md={{ order: 2, span: 10 }}
            lg={{ order: 2, span: 9 }}
            xl={{ order: 2, span: 8 }}
            align="center"
            justify="center"
          >
            <Image
              preview={false}
              src="https://cornhole-site-asset-bucket.s3.us-east-2.amazonaws.com/ceo-soak-team-matt.jpeg"
            />
          </Col>
        </Row>
      </Row>
      <Row
        align="center"
        justify="center"
        style={{ paddingTop: "2rem", paddingBottom: "6rem" }}
      >
        <Col xs={20} lg={14} xl={16} align="center">
          <Typography.Title
            level={1}
            style={{
              paddingTop: "1.5rem",
              paddingBottom: ".5rem",
              fontSize: "1.6rem",
            }}
          >
            Want to donate directly?
          </Typography.Title>
          <Typography.Paragraph className={styles.textStyle}>
            Use this link to directly support Matt Henderson in the 2024 CEO
            Soak.
          </Typography.Paragraph>
          <Button
            icon={<IoOpenOutline />}
            type="primary"
            style={{ width: "auto" }}
            className={styles.secondaryBtn}
            size="large"
            href="https://secure2.convio.net/alsa/site/TR/ALSEvent/WesternPennsylvania?px=8776181&pg=personal&fr_id=16411"
            target="_blank"
          >
            Donate
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AboutComponent;
