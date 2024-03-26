import React from "react";
import { Typography, Divider, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
  return (
    <Typography style={{ padding: "20px" }}>
      <Title>About Cornhole Tournaments</Title>
      <Paragraph>
        Cornhole Tournaments is an organization dedicated to hosting exciting
        cornhole events while raising funds for [Charity/Organization Name]. Our
        tournaments are open to players of all skill levels, and we strive to
        create a fun and inclusive environment for everyone.
      </Paragraph>

      <Divider />

      <Title level={2}>Contact Us</Title>
      <Paragraph>
        Have a question or want to get involved? Feel free to reach out to us:
      </Paragraph>
      <Space direction="vertical">
        <Paragraph>
          Email: <Text strong>[Email Address]</Text>
        </Paragraph>
        <Paragraph>
          Phone: <Text strong>[Phone Number]</Text>
        </Paragraph>
      </Space>
    </Typography>
  );
};

export default AboutPage;
