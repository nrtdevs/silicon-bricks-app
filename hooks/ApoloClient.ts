import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: process.env.BackendUrl,
  cache: new InMemoryCache(),
});
