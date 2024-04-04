// Library Imports
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// Components
import StripePaymentWrapper from "../components/StripePaymentWrapper";
import RegistrationForm from "../components/RegistrationForm";

const defaultRegistrationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  partners: [""],
};

const RegistrationPage = () => {
  const [registrationFormData, setRegistrationFormData] = useState(
    defaultRegistrationFormData
  ); // Store registration data

  const [registrationComplete, setRegistrationComplete] = useState(false); // Store registration completion status

  // Get Event speficic data from location state
  const location = useLocation();
  const event = location.state?.event;

  useEffect(() => {
    console.log("Event:", event);
    if (!event) {
      return;
    }
  }, [event]);

  return (
    <div className="App">
      <h1>Register for {event?.name}</h1>
      <RegistrationForm
        registrationFormData={registrationFormData}
        setRegistrationFormData={setRegistrationFormData}
        setRegistrationComplete={setRegistrationComplete}
        eventCost={event?.cost}
      />
      {registrationComplete && <StripePaymentWrapper event={event} />}
    </div>
  );
};

export default RegistrationPage;
