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

import styles from "../../pages/RegistrationPage/RegistrationPage.module.css";

const { Title, Paragraph } = Typography;
const { Item } = Form;

const RegistrationForm = ({
  registrationFormData,
  setRegistrationFormData,
  setShowRegistrationForm,
}) => {
  const registrationType = registrationFormData.registrationType;
  // Function to handle registration type change
  const onRegistrationTypeChange = (e) => {
    setRegistrationFormData({
      ...registrationFormData,
      registrationType: e.target.value,
    });
  };

  const handleRegistrationFormSubmit = (values) => {
    // Include the registrationType in the form data
    const formData = {
      ...values,
      registrationType: registrationType,
    };
    setRegistrationFormData(formData);
    setShowRegistrationForm(false);
  };

  // Helper function to render teammate input fields
  const renderTeammateFields = () => (
    <>
      <Divider
        style={{ padding: 0, marginTop: "1rem", marginBottom: "1rem" }}
        orientation="left"
      ></Divider>
      <Col xs={24}>
        <Title level={5}>Teammates</Title>
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

      <Col xs={24} sm={12}>
        <Item
          name="partnerName"
          rules={[
            {
              required: true,
              message: "Teammate first name required",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={`First Name`} />
        </Item>
      </Col>
      <Col xs={24} sm={12}>
        <Item
          name="partnerEmail"
          rules={[
            {
              required: true,
              message: "Teammate email required",
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={`Email`} />
        </Item>
      </Col>
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
          <Col xs={24}>
            <Item label="Skill Level" name="skillLevel" required>
              <Radio.Group className={styles.skillLevelItemContainer}>
                <Radio value="beginner">Beginner</Radio>
                <Radio value="intermediate">Intermediate</Radio>
                <Radio value="advanced">Advanced</Radio>
              </Radio.Group>
            </Item>
          </Col>

          {registrationType === "team" && renderTeammateFields()}

          <Col xs={24}>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ marginTop: "2rem", width: "auto" }}
              >
                Next
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegistrationForm;
