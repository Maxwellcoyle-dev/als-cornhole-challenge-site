// Library Imports
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Row, Col } from "antd";

// Components
import RegistrationForm from "../../components/Registration/RegistrationForm";
import CheckoutInfoCard from "../../components/Registration/CheckoutInfoCard";

// Hooks
import useCreateRegistration from "../../hooks/useCreateRegistration";
import useListEvents from "../../hooks/useListEvents";

import styles from "./RegistrationPage.module.css";
import RegistrationConfirmation from "../../components/Registration/RegistrationConfirmation";
import { type } from "@testing-library/user-event/dist/type";

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
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);

  const { events, eventsIsPending, eventsIsError } = useListEvents();

  const { event_id } = useParams();

  const [registrationFormData, setRegistrationFormData] = useState(
    defaultRegistrationFormData
  ); // Store registration data

  const [showRegistrationForm, setShowRegistrationForm] = useState(true); // Store registration completion status
  const [paymentComplete, setPaymentComplete] = useState(false); // Store payment completion status

  const { putRegistration, isPending, isError, registration } =
    useCreateRegistration();

  // const { events, isPending, isError } = useListEvents();
  // const event = events?.find((event) => event.event_id === event_id);

  const handleRegister = () => {
    putRegistration({
      event_id: event_id,
      event_date: event.event_date,
      registrationFormData,
    });
  };

  useEffect(() => {
    if (events) {
      console.log("events: ", events);
      console.log("event_id: ", event_id);
      const selectedEvent = events?.find((e) => e.event_id === event_id);
      if (selectedEvent) {
        setEvent(selectedEvent);
      } else {
        setError(true);
      }
    }
  }, [events, event_id]);

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
          eventsIsPending={eventsIsPending}
        />
      </Col>

      {paymentComplete && <h2>Registration and Payment Complete!</h2>}
    </Row>
  );
};

export default RegistrationPage;
