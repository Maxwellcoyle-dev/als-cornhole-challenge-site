import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { I18n } from "aws-amplify/utils";
import useUserAttributes from "../hooks/useUserAttributes";

const SigninPage = () => {
  const { user: userAttributes } = useUserAttributes();
  return (
    <Authenticator
      socialProviders={["google"]}
      formFields={formFields}
      signUpAttributes={additionalAttributes}
    >
      {({ signOut, user }) => (
        <main>
          {userAttributes && <h1>User: {userAttributes.email}</h1>}
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

export default SigninPage;

const formFields = {
  signUp: {
    given_name: {
      order: 1,
    },
    family_name: {
      order: 2,
    },
    email: {
      order: 3,
    },
    password: {
      order: 4,
    },
    confirm_password: {
      order: 5,
    },
  },
};

I18n.putVocabulariesForLanguage("en", {
  "Given Name": "First Name",
  "Enter your given name": "Enter your first name",
  "Family Name": "Last Name",
  "Enter your family name": "Enter your last name",
});

const additionalAttributes = ["family_name", "given_name"];
