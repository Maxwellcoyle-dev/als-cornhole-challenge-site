import React, { useRef, useEffect } from "react";
import { throttle } from "lodash";
import { useLocation } from "react-router-dom";
import { Flex } from "antd";

import styles from "./HomePage.module.css";
import HeroComponent from "../../components/HomePage/HeroComponent";
import EventsComponent from "../../components/HomePage/EventsComponent";
import AboutComponent from "../../components/HomePage/AboutComponent";

const HomePage = ({ scrollToEvents, setScrollToEvents }) => {
  const location = useLocation();

  const eventsUseRef = useRef(null);
  const aboutUseRef = useRef(null);

  useEffect(() => {
    if (scrollToEvents) {
      eventsUseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToEvents]);

  useEffect(() => {
    if (location.hash === "#events" && eventsUseRef.current) {
      eventsUseRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (location.hash === "#about" && aboutUseRef.current) {
      aboutUseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const onScroll = throttle(() => {
      console.log("Window scrolled!", window.scrollY);
      setScrollToEvents(false);
    }, 10000); // Only fire once per 100 milliseconds

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Flex vertical className={styles.homePageFlex}>
      <HeroComponent setScrollToEvents={setScrollToEvents} />
      <EventsComponent eventsUseRef={eventsUseRef} />
      <AboutComponent aboutUseRef={aboutUseRef} />
    </Flex>
  );
};

export default HomePage;
