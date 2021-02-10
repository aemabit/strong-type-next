import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  // CREATE AN AUTH LINK
  const authLink = setContext((_, { headers }) => {
    // GET AUTH TOKEN FROM LOCALSTORAGE IF IT EXIST
    // SESSION STORAGE or LOCALSTORAGE
    const token = sessionStorage.getItem("token");
    // RETURN THE HEADERS TO THE CONTEXT SO HTTPLINK CAN READ THEM
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

// INITIALIZE APOLLO CLIENT WITH CONTEXT
export function initializeApollo(inititalState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // INITIAL APOLLO CLIENT STATE GETS RE-HYDRATED HERE
  if (inititalState) {
    _apolloClient.cache.restore(inititalState);
  }
  // FOR SSR O SSG ALWAYS CREATE A NEW APOLLO CLIENT
  if (typeof window === "undefined") return _apolloClient;
  // CREATE THE APOLLO CLIENT ONCE IN THE CLIENT
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(inititalState: any) {
  const store = useMemo(() => initializeApollo(inititalState), [inititalState]);
  return store;
}
