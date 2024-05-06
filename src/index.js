import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";

import App from "./App";

import "./App.css";
import "./global.css";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
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
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
