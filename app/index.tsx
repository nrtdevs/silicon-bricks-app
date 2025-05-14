import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

const Index = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const getToken = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    return parsedUserData.accessToken;
  };
  const { theme } = useTheme()

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
      setLoading(false);
    };
    fetchToken();
  }, []);

  if (loading) return null;

  if(!token) return <Redirect href="/(auth)/login" />;
  // return <Redirect href="/(subComponents)/dashboard" />;
  return <Redirect href="/(drawer)/organization" />;
};


const styles = ScaledSheet.create({
  appBar: {
    fontSize: "18@ms",
    fontWeight: "500",

  },
  cardStyle: {
    backgroundColor: "#C9C9C9",
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5
  },
  cardTitle: {
    fontSize: "18@ms",
    fontWeight: '700'
  },
  cardSub: {
    fontSize: "18@ms",
    fontWeight: '700',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardHeading: {
    fontSize: "16@ms",
    fontWeight: "normal"
  },
});
export default Index;

