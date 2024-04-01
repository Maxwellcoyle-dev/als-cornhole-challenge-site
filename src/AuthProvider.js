import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // default theme
import App from "./App";

const AuthProvider = () => {
  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
};

export default AuthProvider;
