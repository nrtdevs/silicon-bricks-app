// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import * as SecureStore from "expo-secure-store";
// import Constants from "expo-constants";

// // Define the HTTP link
// const httpLink = createHttpLink({
//   uri: "http://192.168.1.36:5001/graphql",
// });

// // Define the Authentication Link
// const authLink = setContext(async (_, { headers }) => {
//   try {
//     const token = await SecureStore.getItemAsync("accessToken"); // Make sure the key is "accessToken" if you're using that.
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching token from SecureStore:", error);
//     return { headers };
//   }
// });

// // Create Apollo Client
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

// Define the HTTP link
const httpLink = createHttpLink({
  uri: 'http://192.168.1.36:5001/graphql'
})

const getAccessToken = async () => {
  const storedData = await SecureStore.getItemAsync("userData");
  if (!storedData) return null;
  let parsedUserData = JSON.parse(storedData);
  return parsedUserData?.accessToken
}

// Define the Authentication Link (Fixing Async Issue)
const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken()
  return accessToken
    .then(token => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }))
    .catch(error => {
      console.error('Error fetching token from SecureStore:', error)
      return { headers } // Return headers even if an error occurs
    })
})

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
