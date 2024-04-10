import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useUserAttributes from "./useUserAttributes";

const getUserRegistrationsEndpoint =
  "https://dk7qlt962d.execute-api.us-east-2.amazonaws.com/Stage/get-user-registrations";

const useGetUserRegistrations = () => {
  const { userAttributes, userIsError } = useUserAttributes();

  const fetchUserRegistrations = async (userId) => {
    const response = await axios.get(
      `${getUserRegistrationsEndpoint}?userId=${userId}`
    );

    return response.data;
  };

  const queryInfo = useQuery({
    queryKey: ["user-registrations", userAttributes?.email],
    queryFn: () => fetchUserRegistrations(userAttributes?.email),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    enabled: !userIsError && !!userAttributes,
  });

  return {
    userRegistrations: queryInfo.data,
    userRegistrationsIsFetching: queryInfo.isFetching,
    userRegistrationsIsError: queryInfo.isError,
  };
};

export default useGetUserRegistrations;
