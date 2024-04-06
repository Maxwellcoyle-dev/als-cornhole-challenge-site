import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const listEventsEndpoint =
  "https://dk7qlt962d.execute-api.us-east-2.amazonaws.com/Stage/list-events";

const useListEvents = () => {
  const fetchEvents = async () => {
    const response = await axios.get(listEventsEndpoint);
    console.log("response: ", response.data);
    return response.data;
  };

  const {
    data: events,
    isPending: eventsIsPending,
    isError: eventsIsError,
  } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });

  return { events, eventsIsPending, eventsIsError };
};

export default useListEvents;
