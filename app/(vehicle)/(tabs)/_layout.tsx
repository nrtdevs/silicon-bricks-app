import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { ms, vs } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { labels } from "@/constants/Labels";

const _layout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
        initialRouteName="home" 
      screenOptions={{ 
        headerShown:false,
        tabBarStyle: Platform.select({
          ios: {},
          default: {
            height: vs(45),
            backgroundColor: Colors[theme].background,
            alignItems: "center",
            justifyContent: "center",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                color:  focused
                  ? Colors.gradient1
                  : Colors[theme].text
              }}
            >
              {labels?.home}
            </Text>
          ),
          tabBarIcon: ({ focused }: any) => (
            <Entypo
              name="home"
              size={ms(24)}
              color={
                focused
                  ? Colors.gradient1
                  : Colors[theme].text
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                color: focused
                  ? Colors.gradient1
                  : Colors[theme].text
              }}
            >
              {labels?.settings}
            </Text>
          ),
          tabBarIcon: ({ color, focused }: any) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={
                focused
                  ? Colors.gradient1
                  : Colors[theme].text
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
