import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "lodash";

const createRegistrationEndpoint =
  "https://dk7qlt962d.execute-api.us-east-2.amazonaws.com/Stage/create-registration";

const useCreateRegistration = () => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [registration, setRegistration] = useState({
    registrationConfirmation: {},
    registered: false,
  });

  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  const putRegistration = async ({
    event_id,
    event_date,
    registrationFormData,
  }) => {
    console.log(
      "putRegistration: ",
      event_id,
      event_date,
      registrationFormData
    );
    setIsPending(true);
    setIsError(false);
    setRegistration({
      registrationId: "",
      registered: false,
    });

    const header = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        createRegistrationEndpoint,
        {
          event_id,
          event_date,
          registration: registrationFormData,
        },
        {
          headers: header,
        }
      );
      console.log("response: ", response.data);
      setRegistration({
        registrationConfirmation: response.data.registrationConfirmation,
        registered: true,
      });
      setIsError(false);
      console.log(response.data.registrationConfirmation);
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
