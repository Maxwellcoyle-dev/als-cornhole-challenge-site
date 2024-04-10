// Library Imports
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// Components
import StripePaymentWrapper from "../components/StripePaymentWrapper";
import RegistrationForm from "../components/RegistrationForm";

// Hooks
import useCreateRegistration from "../hooks/useCreateRegistration";
import useUserAttributes from "../hooks/useUserAttributes";

const defaultRegistrationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  teamName: "",
};

const RegistrationPage = () => {
  const [registrationFormData, setRegistrationFormData] = useState(
    defaultRegistrationFormData
  ); // Store registration data

  const [registrationComplete, setRegistrationComplete] = useState(false); // Store registration completion status
  const [paymentComplete, setPaymentComplete] = useState(false); // Store payment completion status

  const { putRegistration } = useCreateRegistration();
  const { userAttributes } = useUserAttributes();

  // Get Event speficic data from location state
  const location = useLocation();
  const event = location.state?.event;

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
    <div className="App">
      <h1>Register for {event?.name}</h1>
      <RegistrationForm
        registrationFormData={registrationFormData}
        setRegistrationFormData={setRegistrationFormData}
        setRegistrationComplete={setRegistrationComplete}
        eventCost={event?.cost}
      />
      {registrationComplete && (
        <StripePaymentWrapper
          event={event}
          setPaymentComplete={setPaymentComplete}
        />
      )}
      {paymentComplete && <h2>Registration and Payment Complete!</h2>}
    </div>
  );
};

export default RegistrationPage;
