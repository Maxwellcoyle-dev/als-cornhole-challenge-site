import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registrationInfo, includedItems } from "../../registrationInfo";

import {
  Typography,
  Button,
  List,
  Collapse,
  Divider,
  Row,
  Col,
  Card,
} from "antd";

// components
import MapComponent from "../../components/Map/MapComponent";

// Hooks
import useListEvents from "../../hooks/useListEvents";
import useListEventRegistrations from "../../hooks/useListEventRegistrations";

import styles from "./EventDetailsPage.module.css";
import {
  IoArrowDownOutline,
  IoCheckboxOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import { max } from "lodash";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { event_id } = useParams();
  const { events, isPending, isError } = useListEvents();

  const event = events?.find((event) => event.event_id === event_id);
  const { eventRegistrations } = useListEventRegistrations(event_id);

  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scrolls to the top of the page
  // }, []);

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

            <Button
              type="primary"
              size="large"
              className={styles.registerButton}
            >
              Register <IoArrowDownOutline />
            </Button>
          </Card>
        </Col>
        <Col
          xl={{ span: 10 }}
          lg={8}
          md={20}
          sm={20}
          xs={22}
          className={styles.mapSectionCol}
          style={{ maxWidth: 600 }}
        >
          <MapComponent />
        </Col>
      </Row>
      <Row>
        <Col
          xl={24}
          className={styles.sectionTwoCol}
          style={{ paddingBottom: "2rem" }}
        >
          <div className={styles.sectionFlexDiv} style={{ maxWidth: 1200 }}>
            <Title level={2} className={styles.level2SectionTitle}>
              Basic Info
            </Title>
            <Paragraph style={{ width: "90%" }} className={styles.textStyle}>
              The proceeds from this event will be donated directly to the ALS
              Association supporting Matt Henderson in the 2024 CEO Soak.
            </Paragraph>
            <Paragraph className={styles.textStyle}>
              This event is designed to bring people together, create some fun
              competition, and support an important cause. All skill levels are
              welcome. Depending on the number of registrations we may create 2
              brackets based on skill level.
            </Paragraph>
          </div>
        </Col>
        <Col xl={24} className={styles.sectionThreeCol}>
          <Title level={2} className={styles.level2SectionTitle}>
            Rules
          </Title>
        </Col>
        <Col xl={24} className={styles.sectionFourCol}>
          <Title level={2} className={styles.level2SectionTitle}>
            What's included
          </Title>
          <Paragraph className={styles.textStyle}>
            Registering for this event enters you into 2 events. The{" "}
            <strong> Double Elimination Team Tournament</strong> and the{" "}
            <strong>One Shot Challenge</strong>.
          </Paragraph>
          <Card className={styles.card}>
            {includedItems.map((option, index) => (
              <Card
                type="inner"
                className={styles.innerCard}
                title={
                  <Title style={{ fontSize: "24px" }} level={5}>
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <IoCheckboxOutline
                          style={{
                            width: "1rem",
                            minHeight: "1rem",
                            minWidth: "1rem",
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
            ))}
          </Card>
        </Col>

        <Col xl={20}>
          <Card collapsible="disabled">
            {registrationInfo.registrationOptions.map((option, index) => (
              <Card type="inner" header={option.optionName} key={index}>
                <Paragraph>
                  <Text strong>Includes:</Text>
                </Paragraph>
                <List
                  split={false}
                  dataSource={option.optionDescriptionItems.includes}
                  className={styles.textStyle}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                <Divider />
                <Paragraph>
                  Cost: ${option.optionDescriptionItems.cost}
                </Paragraph>
              </Card>
            ))}
          </Card>
        </Col>

        <Title level={2}>Payment Options</Title>
        <List
          itemLayout="vertical"
          dataSource={registrationInfo.PaymentOptions}
          renderItem={(option, index) => (
            <List.Item>
              <List.Item.Meta
                title={option.optionName}
                description={option.optionDescription}
              />
              <Button
                type="primary"
                style={{ width: "auto" }}
                onClick={() =>
                  navigate("/registration", {
                    state: {
                      event,
                      method: index === 0 ? "online" : "atEvent",
                    },
                  })
                }
              >
                {index === 0 ? "Register" : "Tell Us You're Coming"}
              </Button>
            </List.Item>
          )}
        />

        <Title level={3}>
          Registered Teams: {eventRegistrations?.length}/20
        </Title>
        <Collapse bordered={false}>
          <Panel header="Team Names" key="1">
            <List
              dataSource={eventRegistrations}
              renderItem={(team) => (
                <List.Item>
                  <Text strong>{team?.team_name}</Text>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </Row>
    </>
  );
};

export default EventDetailsPage;
