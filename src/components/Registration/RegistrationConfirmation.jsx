import React, { useEffect } from "react";
import { Button, Card, Spin } from "antd";

// hooks
import useCreateRegistration from "../../hooks/useCreateRegistration";

import styles from "../../pages/RegistrationPage/RegistrationPage.module.css";

const RegistrationConfirmation = ({
  registrationFormData,
  setShowRegistrationForm,
  handleRegister,
  registrationPending,
  registrationError,
}) => {
  const {
    firstName,
    lastName,
    email,
    skillLevel,
    registrationType,
    teamName,
    partnerName,
    partnerEmail,
  } = registrationFormData;

  useEffect(() => {
    console.log(registrationPending);
  }, [registrationPending]);

  if (registrationPending) {
    return (
      <Card
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "24px",
          width: "100%",
        }}
      >
        <Spin />
      </Card>
    );
  }

  if (registrationError) {
    return (
      <Card
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "24px",
          width: "100%",
        }}
      >
        <h2>Looks like there was an error. So sorry for the inconvenience.</h2>
        <p>
          To complete your registration, please email us at:{" "}
          <a href="max@alscornholechallenge.com" target="_blank">
            max@alscornholechallenge.com
          </a>
        </p>
      </Card>
    );
  }

  return (
    <Card
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "24px",
        width: "100%",
      }}
    >
      <h2>Confirm Your Registration Details</h2>

      <p>
        <strong>Name:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Skill Level:</strong> {skillLevel}
      </p>
      <p>
        <strong>Registration Type:</strong> {registrationType}
      </p>
      {registrationType === "team" && (
        <>
          <p>
            <strong>Team Name:</strong> {teamName}
          </p>
          <p>
            <strong>Partner Name:</strong> {partnerName}
          </p>
          <p>
            <strong>Partner Email:</strong> {partnerEmail}
          </p>
        </>
      )}
      <div className={styles.registrationConfirmationButtonDiv}>
        <Button
          type="primary"
          className={styles.confirmationButton}
          size="large"
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </Button>
        <Button
          className={styles.confirmationButton}
          type="default"
          size="large"
          onClick={() => {
            setShowRegistrationForm(true);
          }}
        >
          Back
        </Button>
      </div>
    </Card>
  );
};

export default RegistrationConfirmation;
