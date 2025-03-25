import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const { BACKEND_URL }: any = Constants?.expoConfig?.extra;

console.log(BACKEND_URL, "url"); // Should log "https://your-backend.com"

// Define the HTTP link
const httpLink = createHttpLink({
  uri: BACKEND_URL,
});

// Define the Authentication Link
const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await SecureStore.getItemAsync("accessToken"); // Make sure the key is "accessToken" if you're using that.
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (error) {
    console.error("Error fetching token from SecureStore:", error);
    return { headers };
  }
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
