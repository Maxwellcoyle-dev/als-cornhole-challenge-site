import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../events"; // Ensure this path is correct
import { Typography, Button, List, Card, Collapse } from "antd";
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = events.find((event) => event.id === parseInt(id, 10));
  console.log("Event: ", event);

  // Placeholder for registered teams, replace with actual data structure
  const registeredTeams = event.registeredTeams || [];

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
                  {/* Placeholder for additional team details */}
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
