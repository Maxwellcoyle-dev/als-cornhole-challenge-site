import { useState } from "react";
import axios from "axios";

const useListEvents = () => {
  const [events, setEvents] = useState([]);

  const listEventsEndpoint =
    "https://dk7qlt962d.execute-api.us-east-2.amazonaws.com/Stage/list-events";

  const fetchEvents = async () => {
    try {
      const response = await axios.get(listEventsEndpoint);
      setEvents(response.data);
    } catch (error) {
      console.error("error fetching events: ", error);
    }
  };

  return { fetchEvents, events };
};

export default useListEvents;
