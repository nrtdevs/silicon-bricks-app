import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, Text, View } from "react-native";

const Index = () => { 
  const getToken = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    return parsedUserData.accessToken;
  };

  useEffect(() => {
    getToken();
  }, []);
  return token ? (
    <Redirect href="/(auth)/login" />
  ) : (
    <Redirect href="/(auth)/login" />
    // <Redirect href="/(drawer)/(tabs)/settings" />
    // <Redirect href="/(drawer)/packages" />
    // <Redirect href="/createPage" />
  );
};

export default Index;
 
