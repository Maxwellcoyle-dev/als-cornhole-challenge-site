import React from "react";
import { Image, Menu, Flex } from "antd";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import logo from "../../assets/site-logo.svg";

const Navbar = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const navFlex = {
    height: "4rem",
    position: "relative",
    width: "100%",
  };

  const navLogo = {
    position: "absolute",
    left: "3rem",
  };

  const navStyles = {
    background: "transparent",
    border: "none",
    margnin: "auto",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  return (
    <Flex align="middle" style={navFlex} width="100%" justify="center">
      <Flex xs={24} sm={4} style={navLogo}>
        <Link to="/">
          <Image src={logo} height="3rem" preview={false} />
        </Link>
      </Flex>

      <Menu mode="horizontal" style={navStyles}>
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        {authStatus === "authenticated" ? (
          <Menu.Item key="myAccount">
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

export default Navbar;
