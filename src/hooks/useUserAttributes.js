import { useQuery } from "@tanstack/react-query";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";

const useUserAttributes = () => {
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const fetchUser = async () => {
    console.log("authStatus: ", authStatus);
    if (authStatus === "authenticated") {
      const response = await fetchUserAttributes();
      console.log("fetchUserAttributes response: ", response);
      return response;
    }
    return null; // Return null if not authenticated to avoid unnecessary executions
  };

  const {
    data: userAttributes,
    isPending: userIsPending,
    isError: userIsError,
  } = useQuery({
    queryKey: ["userAttributes", user],
    queryFn: fetchUser,
    enabled: authStatus === "authenticated",
    staleTime: Infinity, // Do not refetch data after it is fetched once, as long as the query is in the cache
    cacheTime: 1000 * 60 * 30, // Keep the cache for 5 minutes or consider using a longer duration if appropriate
  });

  return {
    userAttributes,
    userIsPending,
    userIsError,
  };
};

export default useUserAttributes;
