// Library Imports
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Row, Col, Typography } from "antd";

// Components
import StripePaymentWrapper from "../../components/Registration/StripePaymentWrapper";
import RegistrationForm from "../../components/Registration/RegistrationForm";
import CheckoutInfoCard from "../../components/Registration/CheckoutInfoCard";

// Hooks
import useCreateRegistration from "../../hooks/useCreateRegistration";
import useUserAttributes from "../../hooks/useUserAttributes";
import useListEvents from "../../hooks/useListEvents";

import styles from "./RegistrationPage.module.css";

const defaultRegistrationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  teamName: "",
};

const RegistrationPage = () => {
  const { event_id } = useParams();
  const [registrationFormData, setRegistrationFormData] = useState(
    defaultRegistrationFormData
  ); // Store registration data
  const [registrationType, setRegistrationType] = useState("team");
  const [registrationComplete, setRegistrationComplete] = useState(false); // Store registration completion status
  const [paymentComplete, setPaymentComplete] = useState(false); // Store payment completion status

  const { putRegistration } = useCreateRegistration();
  const { userAttributes } = useUserAttributes();

  const { events, isPending, isError } = useListEvents();
  const event = events?.find((event) => event.event_id === event_id);

  useEffect(() => {
    if (userAttributes) {
      setRegistrationFormData({
        ...registrationFormData,
        firstName: userAttributes.given_name,
        lastName: userAttributes.family_name,
        email: userAttributes.email,
      });
    }
  }, [userAttributes]);

  useEffect(() => {
    console.log("form data: ", registrationFormData);
  }, []);

  useEffect(() => {
    console.log(
      "registration event data:",
      event?.event_id,
      event?.event_date,
      userAttributes?.email
    );

    if (paymentComplete) {
      putRegistration({
        event_id: event?.event_id,
        event_date: event?.event_date,
        user_id: userAttributes?.email,
        first_name: registrationFormData?.firstName,
        last_name: registrationFormData?.lastName,
        team_name: registrationFormData?.teamName,
      });

      setPaymentComplete(false);
    }
  }, [paymentComplete]);

  return (
    <Row className={styles.registrationPage} justify="center" gutter={[32]}>
      <Col lg={14}>
        <RegistrationForm
          setRegistrationType={setRegistrationType}
          registrationType={registrationType}
          registrationFormData={registrationFormData}
          setRegistrationFormData={setRegistrationFormData}
          setRegistrationComplete={setRegistrationComplete}
          eventCost={event?.cost}
        />
      </Col>
      <Col lg={6}>
        <CheckoutInfoCard registrationType={registrationType} />
      </Col>
      {registrationComplete && (
        <StripePaymentWrapper
          event={event}
          setPaymentComplete={setPaymentComplete}
        />
      )}
      {paymentComplete && <h2>Registration and Payment Complete!</h2>}
    </Row>
  );
};

export default RegistrationPage;
