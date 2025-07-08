import React, { useEffect, useState } from "react";
import { Redirect} from "expo-router";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const getToken = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    return parsedUserData.accessToken;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
      setLoading(false);
    };
    fetchToken();
  }, []);

  if (loading) return null;

  if (!token) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(auth)/login" />;
  // return <Redirect href="/(subComponents)/dashboard" />;
  return <Redirect href="/(meeting)/(tabs)" />;
  return <Redirect href="/(drawer)/subscriptions" />;
};
export default Index;
