import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";

const SigninPage = () => {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

export default SigninPage;
