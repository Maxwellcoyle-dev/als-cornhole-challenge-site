import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "antd"; // Importing Layout from Ant Design

import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import RegistrationPage from "./pages/RegistrationPage";
import SigninPage from "./pages/SigninPage.jsx";
import MyAccountPage from "./pages/MyAccountPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const { Header, Content, Footer } = Layout; // Destructuring Layout components

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout className="layout" style={{ minHeight: "100vh", margin: 0 }}>
          <Header style={{ background: "none" }}>
            <Navbar />
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/event/:event_id" element={<EventDetailsPage />} />
              <Route
                path="/registration"
                element={
                  <ProtectedRoute>
                    <RegistrationPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/myAccount" element={<MyAccountPage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center", fontSize: ".75rem" }}>
            Cornhole Tournaments ©2024 Created for a Cause
          </Footer>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
