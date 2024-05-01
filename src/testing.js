<Col span={24}>
<Title level={2}>What's Included</Title>
{event.included.map((include, index) => (
  <Card key={index} title={include.name}>
    <Paragraph>{include.description}</Paragraph>
  </Card>
))}
</Col>
<Col span={24}>
<Title level={2}>Registration Options</Title>
{event.registration[0].registration_type.map((type, index) => (
  <Paragraph key={index}>
    {type.registration_type}: ${type.price}
  </Paragraph>
))}
</Col>
<Col span={24}>
<Title level={2}>Payment Options</Title>
{event.payment_options.map((option, index) => (
  <Card key={index} title={option.optionName}>
    <Paragraph>{option.optionDescription}</Paragraph>
  </Card>
))}
</Col>