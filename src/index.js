import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./AuthProvider";
import { ConfigProvider } from "antd";

import "./App.css";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
config.oauth.domain = "auth.alscornholechallenge.com";
Amplify.configure(config);

// Define your custom theme variables
const theme = {
  token: {
    fontSize: 18, // Update the font size here as per your requirements
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AuthProvider />
    </ConfigProvider>
  </React.StrictMode>
);
