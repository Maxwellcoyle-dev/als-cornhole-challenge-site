import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Radio,
  Divider,
} from "antd";
import { UserOutlined, MailOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Item } = Form;

const RegistrationForm = ({
  registrationType,
  setRegistrationType,
  registrationFormData,
  setRegistrationFormData,
}) => {
  // Function to handle registration type change
  const onRegistrationTypeChange = (e) => {
    setRegistrationType(e.target.value);
  };

  const handleRegistrationFormSubmit = (values) => {
    // Include the registrationType in the form data
    const formData = {
      ...values,
      registrationType: registrationType,
    };
    console.log("Received values of form: ", formData);
    setRegistrationFormData(formData);
  };

  // Helper function to render teammate input fields
  const renderTeammateFields = () => (
    <>
      <Divider
        style={{ padding: 0, marginTop: "1rem", marginBottom: "1rem" }}
        orientation="left"
      >
        Team Info
      </Divider>
      <Col xs={24}>
        <Paragraph>
          Please provide a team name along with the first name and email of your
          teammates. We'll send a confirmation to everyone on your team.
        </Paragraph>
        <Item
          name="teamName"
          rules={[{ required: true, message: "Please input your team name!" }]}
        >
          <Input prefix={<TeamOutlined />} placeholder="Team Name" />
        </Item>
      </Col>
      {[...Array(2)].map((_, index) => (
        <React.Fragment key={index}>
          <Col xs={24} sm={12}>
            <Item
              name={`teammate${index + 1}FirstName`}
              rules={[
                {
                  required: index === 0 ? true : false,
                  message: "Teammate first name required",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={`Teammate ${index + 1} First Name`}
              />
            </Item>
          </Col>
          <Col xs={24} sm={12}>
            <Item
              name={`teammate${index + 1}Email`}
              rules={[
                {
                  required: index === 0 ? true : false,
                  message: "Teammate email required",
                  type: "email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={`Teammate ${index + 1} Email`}
              />
            </Item>
          </Col>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "24px",
        width: "100%",
      }}
    >
      <Form
        layout="vertical"
        style={{ boxShadow: "none", width: "100%" }}
        onFinish={handleRegistrationFormSubmit}
        initialValues={registrationFormData}
      >
        <Title
          level={4}
          style={{
            marginBottom: "24px",
          }}
        >
          Registration
        </Title>
        <Paragraph>
          Please provide your information below to register for the event.
        </Paragraph>
        <Item>
          <Radio.Group
            defaultValue="team"
            buttonStyle="solid"
            onChange={onRegistrationTypeChange}
          >
            <Radio.Button value="team">Team</Radio.Button>
            <Radio.Button value="individual">Individual</Radio.Button>
          </Radio.Group>
        </Item>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Item>
          </Col>
          <Col xs={24} sm={12}>
            <Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
              style={{ padding: 0, margin: 0 }}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Item>
          </Col>
          <Col xs={24}>
            <Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Item>
          </Col>

          {registrationType === "team" && renderTeammateFields()}
          <Col xs={24}>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={handleRegistrationFormSubmit}
              >
                Register
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegistrationForm;
