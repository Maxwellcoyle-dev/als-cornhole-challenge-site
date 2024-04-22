import React, { useState, useEffect } from "react";
import { Menu, Flex, Image, Drawer } from "antd";
import { IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/site-logo.svg";

import styles from "./Navbar.module.css";
import { set } from "lodash";

export const Navbar = ({ authStatus = "authenticated" }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // update the width value anytime the window is resized
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.navBar}>
      <div className={styles.logoDiv}>
        <Link to="/" className={styles.navLogo}>
          <Image src={logo} className={styles.navLogo} preview={false} />
        </Link>
      </div>
      {width < 991 ? (
        <div className={styles.navMenuIconDiv}>
          <IoMenuOutline
            className={styles.menuIcon}
            onClick={() => setOpenMenu(true)}
          />
        </div>
      ) : (
        <AppMenu
          key={authStatus}
          isInline={false}
          authStatus={authStatus}
          setOpenMenu={setOpenMenu}
        />
      )}

      <Drawer
        width="100%"
        closable={true}
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        title="Menu"
        placement="right"
        className={styles.drawer}
      >
        <AppMenu
          key={authStatus}
          isInline
          authStatus={authStatus}
          setOpenMenu={setOpenMenu}
        />
      </Drawer>
    </div>
  );
};

const AppMenu = ({ isInline = false, authStatus, setOpenMenu }) => {
  return (
    <Menu
      mode={isInline ? "inline" : "horizontal"}
      inlineCollapsed={false}
      style={{
        backgroundColor: "transparent",
        height: "6rem",
        alignItems: "center",
        fontSize: "1.5rem",
      }}
      bodyStyle={{ backgroundColor: "none" }}
      onSelect={() => {
        setOpenMenu(false);
      }}
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
