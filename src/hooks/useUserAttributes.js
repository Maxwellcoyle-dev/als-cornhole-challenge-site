import { useQuery } from "@tanstack/react-query";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";

const useUserAttributes = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const fetchUser = async () => {
    console.log("authStatus: ", authStatus);
    const response = await fetchUserAttributes();
    console.log("fetchUserAttributes response: ", response);
    return response;
  };

  const {
    data: user,
    isPending: userIsPending,
    isError: userIsError,
  } = useQuery({
    queryKey: ["userAttributes"],
    queryFn: fetchUser,
    enabled: authStatus === "authenticated",
  });

  return {
    user,
    userIsPending,
    userIsError,
  };
};

export default useUserAttributes;
