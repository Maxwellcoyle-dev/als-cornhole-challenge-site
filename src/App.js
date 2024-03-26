import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd"; // Importing Layout from Ant Design
import Navbar from "./Navbar.jsx";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import RegistrationPage from "./pages/RegistrationPage";

const { Header, Content, Footer } = Layout; // Destructuring Layout components

const App = () => {
  return (
    <Router>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header style={{ padding: "0 50px", background: "#7dbcea" }}>
          <Navbar />
        </Header>
        <Content style={{ padding: "20px 50px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Cornhole Tournaments ©2024 Created for a Cause
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
