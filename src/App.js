import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Layout } from "antd"; // Importing Layout from Ant Design

import { Navbar } from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AboutPage from "./pages/AboutPage";
import EventDetailsPage from "./pages/EventDetailsPage/EventDetailsPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import FooterComponent from "./components/Footer/FooterComponent.jsx";

const { Header, Content, Footer } = Layout; // Destructuring Layout components

const queryClient = new QueryClient();

const App = () => {
  const [scrollToEvents, setScrollToEvents] = useState(false);

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout className="layout">
          <Header
            style={{
              background: "none",
              height: "4rem",
              padding: 0,
              width: "100%",
            }}
          >
            <Navbar
              setScrollToEvents={setScrollToEvents}
              authStatus={authStatus}
            />
          </Header>
          <Content>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    scrollToEvents={scrollToEvents}
                    setScrollToEvents={setScrollToEvents}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/event/:event_id" element={<EventDetailsPage />} />
              <Route
                path="/registration/:event_id"
                element={<RegistrationPage />}
              />
            </Routes>
          </Content>
          <Footer style={{ padding: 0, margin: 0 }}>
            <FooterComponent setScrollToEvents={setScrollToEvents} />
          </Footer>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
