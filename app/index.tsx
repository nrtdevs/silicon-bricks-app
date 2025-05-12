import { StyleSheet } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  const [token, setToken] = React.useState<string | null>(null);

  const getToken = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    setToken(parsedUserData.accessToken);
    return parsedUserData.accessToken;
  };

  React.useEffect(() => {
    getToken();
  }, []);
  return !token ? (
    <Redirect href="/(auth)/login" />
  ) : (
    // <Redirect href="/(auth)/login" />
    // <Redirect href="/(drawer)/(tabs)/settings" />
    <Redirect href="/(drawer)/packages" />
    // <Redirect href="/createPage" />
  );
};

export default Index;

const styles = StyleSheet.create({});
