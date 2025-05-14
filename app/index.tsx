import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ScaledSheet } from "react-native-size-matters";

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

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>

      <Pressable onPress={() => router.replace("/(meeting)/(tabs)")}>
        <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
              <ThemedText style={styles.cardHeading}>M</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Meetings</ThemedText>
          </View>
        </View>
      </Pressable>

      <Pressable>
        <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
              <ThemedText style={styles.cardHeading}>V</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Vehicle</ThemedText>
          </View>
        </View>
      </Pressable>

      <Pressable>
        <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
              <ThemedText style={styles.cardHeading}>M</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Material</ThemedText>
          </View>
        </View>
      </Pressable>

    </SafeAreaView>
  )



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

