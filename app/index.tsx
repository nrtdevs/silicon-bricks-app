import { StyleSheet} from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  const [token, setToken] = React.useState<string | null>(null);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("accessToken");
    setToken(token);
    return token; // Make sure the key is "accessToken" if you're using that.
  };

  React.useEffect(() => {
    getToken();
  }, []);
  return token ? (
    <Redirect href="/(auth)/login" />
  ) : (
    // <Redirect href="/(drawer)/(tabs)/promotions" />
    <Redirect href="/(drawer)/plans"/>
  );
};

export default Index;

const styles = StyleSheet.create({});
