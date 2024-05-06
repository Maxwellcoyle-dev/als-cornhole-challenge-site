import React from "react";
import { Col, Flex, Image, Row, Typography, Button } from "antd";
import { Link } from "react-router-dom";

import logo from "../../assets/site-logo.svg";

import styles from "./Footer.module.css";

const FooterComponent = ({ setScrollToEvents }) => {
  return (
    <Flex
      style={{
        width: "100%",
        backgroundColor: "lightgray",
        padding: 0,
        margin: 0,
      }}
    >
      <Row className={styles.footerRow} align="center">
        <Col xl={8} lg={6} md={20} sm={20} xs={20}>
          <Link to="/">
            <Image src={logo} height="6rem" preview={false} />
          </Link>
        </Col>
        <Col xl={4} lg={4} sm={6} xs={20}>
          <Flex vertical>
            <Typography.Text strong>Site Directory</Typography.Text>
            <Typography.Link
              onClick={() => setScrollToEvents(true)}
              className={styles.textStyle}
            >
              Events
            </Typography.Link>
            <Link to="/about">
              <Typography className={styles.textStyle}>About</Typography>
            </Link>
          </Flex>
        </Col>
        <Col xl={4} lg={4} sm={6} xs={20}>
          <Flex vertical>
            <Typography.Text strong>Donation Links</Typography.Text>
            <Typography.Link
              className={styles.textStyle}
              href="https://secure2.convio.net/alsa/site/TR/ALSEvent/WesternPennsylvania?px=8776181&pg=personal&fr_id=16411"
              target="_blank"
            >
              2024 CEO Soak
            </Typography.Link>
            <Typography.Link
              className={styles.textStyle}
              href="https://www.als.org/"
              target="_blank"
            >
              ALS Association
            </Typography.Link>
          </Flex>
        </Col>
        <Col xl={4} lg={8} sm={8} xs={20}>
          <Flex vertical>
            <Typography.Text strong>Contact</Typography.Text>
            <Typography.Link
              className={styles.textStyle}
              href="Max@alscornholechallenge.com"
              target="_blank"
            >
              Max@alscornholechallenge.com
            </Typography.Link>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default FooterComponent;
