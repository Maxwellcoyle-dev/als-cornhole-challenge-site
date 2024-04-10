import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const listEventRaegistrationsEndpoint =
  "https://dk7qlt962d.execute-api.us-east-2.amazonaws.com/Stage/list-event-registrations";

// use the eventId to get the list of registrations for that event
const useListEventRegistrations = (eventId) => {
  const fetchEventRegistrations = async (eventId) => {
    const response = await axios.get(
      `${listEventRaegistrationsEndpoint}?eventId=${eventId}`
    );

    return response.data;
  };

  const queryInfo = useQuery({
    queryKey: ["event-registrations", eventId],
    queryFn: () => fetchEventRegistrations(eventId),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
  });

  return {
    eventRegistrations: queryInfo.data,
    eventRegistrationsIsFetching: queryInfo.isFetching,
    eventRegistrationsIsError: queryInfo.isError,
  };
};

export default useListEventRegistrations;
