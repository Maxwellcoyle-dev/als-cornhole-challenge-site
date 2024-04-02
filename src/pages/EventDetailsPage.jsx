import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useListEvents from "../hooks/useListEvents";
import { Typography, Button, List, Card, Collapse } from "antd";
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const { events } = useListEvents();
  const navigate = useNavigate();
  const { event_id } = useParams();

  useEffect(() => {
    const selectedEvent = events.find((event) => event.id === event_id);
    setEvent(selectedEvent);
  }, [events, event_id]);

  useEffect(() => {
    console.log("events: ", events);
    console.log("event: ", event);
  }, [event]);

  // Placeholder for registered teams, replace with actual data structure
  const registeredTeams = event?.registeredTeams || [];

  if (!event) {
    return <Title>Loading...</Title>;
  }
  return (
    <Card bordered={false} style={{ margin: "20px" }}>
      <Title>{event.name}</Title>
      <Paragraph>Date: {event.date}</Paragraph>
      <Paragraph>Location: {event.location}</Paragraph>
      <Paragraph>Start Time: {event.startTime}</Paragraph>
      <Paragraph>Cost: ${event.cost}</Paragraph>

      <Title level={2}>Event Information</Title>
      <Paragraph>{event.eventInformation}</Paragraph>

      <Title level={2}>Registration Details</Title>
      <Paragraph>{event.depositInfo}</Paragraph>
      {event.registrationButton && (
        <Button
          type="primary"
          block
          onClick={() => navigate("/registration", { state: { event } })}
        >
          Register
        </Button>
      )}
      {}
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
