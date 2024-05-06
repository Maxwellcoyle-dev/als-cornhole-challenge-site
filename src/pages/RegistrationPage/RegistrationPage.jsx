// Library Imports
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Row, Col } from "antd";

// Components
import RegistrationForm from "../../components/Registration/RegistrationForm";
import CheckoutInfoCard from "../../components/Registration/CheckoutInfoCard";

// Hooks
import useCreateRegistration from "../../hooks/useCreateRegistration";

// import demo data from json file
import events from "../../demoEventTableData.json";

import styles from "./RegistrationPage.module.css";
import RegistrationConfirmation from "../../components/Registration/RegistrationConfirmation";

const defaultRegistrationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  skillLevel: "",
  registrationType: "team",
  teamName: "",
  partnerName: "",
  partnerEmail: "",
  cost: 0,
};

const RegistrationPage = () => {
  const { event_id } = useParams();
  const [registrationFormData, setRegistrationFormData] = useState(
    defaultRegistrationFormData
  ); // Store registration data
  const [showRegistrationForm, setShowRegistrationForm] = useState(true); // Store registration completion status
  const [paymentComplete, setPaymentComplete] = useState(false); // Store payment completion status

  const { putRegistration, isPending, isError, registration } =
    useCreateRegistration();

  // const { events, isPending, isError } = useListEvents();

  const event = events?.find((event) => event.event_id === event_id);

  const handleRegister = () => {
    putRegistration({
      event_id: event_id,
      event_date: event.event_date,
      registrationFormData,
    });
  };

  useEffect(() => {
    console.log("event_id: ", event_id);
    console.log("event: ", event);
  }, [event]);

  return (
    <Row className={styles.registrationPage} justify="center">
      <Col
        lg={{ span: 12, order: 1 }}
        sm={{ span: 20, order: 2 }}
        xs={{ span: 22, order: 2 }}
      >
        {showRegistrationForm ? (
          <RegistrationForm
            registrationFormData={registrationFormData}
            setRegistrationFormData={setRegistrationFormData}
            setShowRegistrationForm={setShowRegistrationForm}
          />
        ) : (
          <RegistrationConfirmation
            registrationFormData={registrationFormData}
            setShowRegistrationForm={setShowRegistrationForm}
            handleRegister={handleRegister}
            registrationPending={isPending}
            registrationError={isError}
            registration={registration}
          />
        )}
      </Col>
      <Col
        lg={{ span: 8, order: 2 }}
        sm={{ span: 20, order: 1 }}
        xs={{ span: 22, order: 1 }}
      >
        <CheckoutInfoCard
          registrationFormData={registrationFormData}
          event={event}
        />
      </Col>

      {paymentComplete && <h2>Registration and Payment Complete!</h2>}
    </Row>
  );
};

export default RegistrationPage;
