import React, { useEffect } from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const RegistrationForm = ({
  defaultFirstName,
  defaultLastName,
  defaultEmail,
}) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  // Initialize one partner field
  useEffect(() => {
    form.setFieldsValue({
      partners: [""], // Initialize with one empty string to display one partner input by default
    });
  }, [form]);

  return (
    <Form
      form={form}
      name="registration"
      initialValues={{
        firstName: defaultFirstName,
        lastName: defaultLastName,
        email: defaultEmail,
        partners: [""], // Set initial value for partners
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
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
        rules={[{ required: true, message: "Please input your team name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.List
        name="partners"
        rules={[
          {
            validator: async (_, partners) => {
              if (!partners || partners.length < 1) {
                return Promise.reject(
                  new Error("At least one partner name is required.")
                );
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[
                    { required: true, message: "Partner name is required" },
                  ]}
                >
                  <Input placeholder="Partner's Name" />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                ) : null}
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                disabled={fields.length === 2}
              >
                <PlusOutlined /> Add another team member
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
