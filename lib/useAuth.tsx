import { useState, useContext, createContext, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import { useSigninMutation } from "lib/graphql/signin.graphql";
import { useSignupMutation } from "lib/graphql/signup.graphql";
import { useCurrentUserQuery } from "lib/graphql/currentUser.graphql";

type AuthProps = {
  user: any;
  error: string;
  signIn: (email: any, password: any) => Promise<void>;
  signUp: (email: any, password: any) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<Partial<AuthProps>>({});

// YOU CAN WRAP YOUR _APP.TS WITH THIS PROVICER
export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// CUSTOM REACT HOOK TO ACCESS THE CONTEXT
export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const client = useApolloClient();
  const router = useRouter();

  const [error, setError] = useState("");
  const { data } = useCurrentUserQuery({
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  });

  const user = data && data.currentUser;

  // SIGNIN AND SIGNUP
  const [signInMutation] = useSigninMutation();
  const [signUpMutation] = useSignupMutation();

  const signIn = async (email, password) => {
    try {
      const { data } = await signInMutation({
        variables: {
          email,
          password,
        },
      });
      if (data.login.token && data.login.user) {
        sessionStorage.setItem("token", data.login.token);
        client.resetStore().then(() => {
          router.push("/");
        });
      } else {
        setError("Invalid Login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      const { data } = await signUpMutation({
        variables: {
          email,
          password,
        },
      });
      if (data.register.token && data.register.user) {
        sessionStorage.setItem("token", data.register.token);
        client.resetStore().then(() => {
          router.push("/");
        });
      } else {
        setError("Invalid Register");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("token");
    client.resetStore().then(() => {
      router.push("/");
    });
  };

  return {
    user,
    error,
    signIn,
    signUp,
    signOut,
  };
}
