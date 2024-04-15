import React, { useState } from "react";
import { Image, Menu, Flex } from "antd";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import logo from "../../assets/site-logo.svg";

import styles from "./Navbar.module.css";
import { signIn } from "aws-amplify/auth";

const Navbar = (setScrollToEvents) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <DesktopNav authStatus={authStatus} setScrollToEvents={setScrollToEvents} />
  );
};

export default Navbar;

const DesktopNav = (authStatus, setScrollToEvents) => {
  console.log(authStatus.authStatus);

  return (
    <Flex className={styles.navFlexContainer} width="100%" justify="center">
      <Flex xs={24} sm={4} className={styles.navLogoFlex}>
        <Link to="/" className={styles.navLogo}>
          <Image
            src={logo}
            className={styles.navLogo}
            height="3rem"
            preview={false}
          />
        </Link>
      </Flex>

      <Menu
        mode="horizontal"
        className={styles.navMenu}
        inlineCollapsed={false}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="events">
          <Link to="/#events">Events</Link>
        </Menu.Item>
        {authStatus.authStatus === "authenticated" ? (
          <Menu.Item key="account">
            <Link to="/myAccount">My Account</Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="signin">
            <Link to="/signin">Sign In/Sign Up</Link>
          </Menu.Item>
        )}
      </Menu>
    </Flex>
  );
};
