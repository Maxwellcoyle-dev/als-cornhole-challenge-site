import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography } from "antd";

import useUserAttributes from "../hooks/useUserAttributes";

const { Title, Paragraph } = Typography;

const RegistrationForm = ({
  setRegistrationFormData,
  registrationFormData,
  eventCost, // Assuming eventCost is a prop passed down to this component
  setRegistrationComplete,
}) => {
  const { userAttributes } = useUserAttributes();

  useEffect(() => {
    userAttributes && console.log("User Attributes:", userAttributes);
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);

    setRegistrationFormData({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      teamName: values.teamName,
    });

    setRegistrationComplete(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      partners: [""],
    });
  }, [form]);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <Card
        bordered={false}
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.12)" }}
      >
        <Title level={4} style={{ color: "#1890ff", marginBottom: "10px" }}>
          Step 1: Registration
        </Title>
        <Paragraph style={{ fontSize: "14px" }}>
          Please fill out the registration form. After completing this step, you
          will proceed to the payment process.
        </Paragraph>
        <Paragraph strong style={{ marginBottom: "10px", fontSize: "16px" }}>
          Event Cost: <span style={{ color: "#52c41a" }}>${eventCost}</span>
        </Paragraph>

        <Form
          form={form}
          name="registration"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ width: 800, boxShadow: "none", marginTop: "20px" }}
          initialValues={{
            firstName: userAttributes?.given_name,
            lastName: userAttributes?.family_name,
            email: userAttributes?.email,
            teamName: registrationFormData.teamName,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email address!",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[
              { required: true, message: "Please input your team name!" },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "auto", margin: "10px" }}
            >
              Next Step
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
