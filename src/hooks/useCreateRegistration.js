import { useState } from "react";
import axios from "axios";

const createRegistrationEndpoint =
  "https://dk7qlt962d.execute-api.us-east-2.amazonaws.com/Stage/create-registration";

const useCreateRegistration = () => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [registration, setRegistration] = useState({
    registrationId: "",
    registered: false,
  });

  const putRegistration = async ({ event_id, event_date, user_id }) => {
    console.log("putRegistration: ", event_id, user_id, event_date);
    setIsPending(true);
    setIsError(false);

    const header = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const response = await axios.post(
        createRegistrationEndpoint,
        {
          event_id,
          event_date,
          user_id,
        },
        {
          headers: header,
        }
      );
      console.log("response: ", response.data);
      setRegistration(response.data);
    } catch (error) {
      console.error("error: ", error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  return { putRegistration, isPending, isError, registration };
};

export default useCreateRegistration;