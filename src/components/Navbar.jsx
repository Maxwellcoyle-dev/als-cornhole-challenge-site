import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Navbar = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <Menu style={{ background: "none", border: 0 }} mode="horizontal">
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
  );
};

export default Navbar;
