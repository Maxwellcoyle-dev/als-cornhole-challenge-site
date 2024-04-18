import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registrationInfo } from "../registrationInfo";

import {
  Typography,
  Button,
  List,
  Collapse,
  Divider,
  Row,
  Col,
  Card,
  Form,
  Switch,
} from "antd";

// components
import MapComponent from "../components/Map/MapComponent";

// Hooks
import useListEvents from "../hooks/useListEvents";
import useListEventRegistrations from "../hooks/useListEventRegistrations";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { event_id } = useParams();
  const { events, isPending, isError } = useListEvents();

  const event = events?.find((event) => event.event_id === event_id);
  const { eventRegistrations } = useListEventRegistrations(event_id);

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
    <Row
      vertical
      style={{ margin: "4rem 0", padding: 0 }}
      justify="space-around"
      gutter={[16, 16]} // [horizontal, vertical]}
    >
      <Col vertical xl={10} lg={11} md={20} sm={20} xs={22}>
        <Card>
          <Title level={1} style={{ fontSize: "2rem" }}>
            {event?.name}
          </Title>
          <Paragraph>Date: {event?.event_date}</Paragraph>
          <Paragraph>Location: {event?.location}</Paragraph>
          <Paragraph>Start Time: {event?.start_time}</Paragraph>
          <Paragraph>Cost: ${event?.cost}</Paragraph>
        </Card>
      </Col>
      <Col
        xl={10}
        lg={11}
        md={20}
        sm={20}
        xs={22}
        style={{ minHeight: "15rem", minWidth: "20rem" }}
      >
        <MapComponent />
      </Col>

      <Col xl={10} xxl={10}>
        <Title level={3}>Event Information</Title>
        <Paragraph>{event?.description}</Paragraph>
      </Col>

      <Col xl={10}>
        <Title level={3}>Registration Details</Title>
        <Paragraph>{registrationInfo.introDescription}</Paragraph>
      </Col>

      <Col xl={10}>
        <Form>
          <Row>
            <Col
              span={12}
              align="center"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Title level={4} style={{ padding: 0, margin: 0 }}>
                Team
              </Title>
            </Col>
            <Col span={12}>
              <Form.Item name="team" valuePropName="checked">
                <Switch style={{ width: "2rem" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <Collapse>
        {registrationInfo.registrationOptions.map((option, index) => (
          <Panel header={option.optionName} key={index}>
            <Paragraph>
              <Text strong>Includes:</Text>
            </Paragraph>
            <List
              split={false}
              dataSource={option.optionDescriptionItems.includes}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Divider />
            <Paragraph>Cost: ${option.optionDescriptionItems.cost}</Paragraph>
          </Panel>
        ))}
      </Collapse>

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
                  state: { event, method: index === 0 ? "online" : "atEvent" },
                })
              }
            >
              {index === 0 ? "Register" : "Tell Us You're Coming"}
            </Button>
          </List.Item>
        )}
      />

      <Title level={3}>Registered Teams: {eventRegistrations?.length}/20</Title>
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
  );
};

export default EventDetailsPage;
