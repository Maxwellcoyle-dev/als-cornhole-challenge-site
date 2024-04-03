import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registrationInfo } from "../registrationInfo";

import { Typography, Button, List, Card, Collapse } from "antd";

import useListEvents from "../hooks/useListEvents";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { event_id } = useParams();
  const { events, isPending, isError } = useListEvents();

  const event = events?.find((event) => event.id === event_id);
  console.log(event);

  const [registeredTeams, setRegisteredTeams] = useState([]); // place holder for registered teams list

  if (isPending) {
    return <Title>Loading...</Title>;
  }

  if (isError) {
    return <Title>Error loading events</Title>;
  }

  return (
    <Card bordered={false} style={{ margin: "20px" }}>
      <Title>{event.name}</Title>
      <Paragraph>Date: {event.event_date}</Paragraph>
      <Paragraph>Location: {event.location}</Paragraph>
      <Paragraph>Start Time: {event.start_time}</Paragraph>
      <Paragraph>Cost: ${event.cost}</Paragraph>

      <Title level={2}>Event Information</Title>
      <Paragraph>{event.description}</Paragraph>

      <Title level={2}>Registration Details</Title>
      <Paragraph>{registrationInfo.introDescription}</Paragraph>
      <List
        dataSource={registrationInfo.registrationOptions}
        renderItem={(option) => (
          <List.Item>
            <List.Item.Meta
              title={option.optionName}
              description={option.optionDescription}
            />
          </List.Item>
        )}
      />
      <Paragraph>{registrationInfo.endingDescription}</Paragraph>
      <Paragraph>Note: {registrationInfo.refundNote}</Paragraph>

      <Button
        type="primary"
        block
        onClick={() => navigate("/registration", { state: { event } })}
      >
        Register
      </Button>

      <Title level={2}>Registered Teams</Title>
      <List
        dataSource={registeredTeams}
        renderItem={(team) => (
          <List.Item>
            <Card>
              <Collapse bordered={false} defaultActiveKey={["1"]}>
                <Panel header={team.name} key="1">
                  <Paragraph>Additional details about {team.name}</Paragraph>
                </Panel>
              </Collapse>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EventDetailsPage;
