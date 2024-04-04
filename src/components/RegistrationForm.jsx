import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const RegistrationForm = ({
  setRegistrationFormData,
  registrationFormData,
  eventCost, // Assuming eventCost is a prop passed down to this component
  setRegistrationComplete,
}) => {
  const onFinish = (values) => {
    console.log("Success:", values);

    setRegistrationFormData({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      teamName: values.teamName,
      partners: values.partners,
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
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        bordered={false}
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Title level={3} style={{ color: "#1890ff" }}>
          Step 1: Registration
        </Title>
        <Paragraph>
          Please fill out the registration form. After completing this step, you
          will proceed to the payment process.
        </Paragraph>
        <Paragraph strong style={{ marginBottom: "20px" }}>
          Event Cost: <span style={{ color: "#52c41a" }}>${eventCost}</span>
        </Paragraph>

        <Form
          form={form}
          name="registration"
          initialValues={{
            firstName: registrationFormData.firstName,
            lastName: registrationFormData.lastName,
            email: registrationFormData.email,
            partners: registrationFormData.partners,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[
              { required: true, message: "Please input your team name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px" }}
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
