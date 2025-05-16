import React from "react";
import { Slot, Stack, useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";


const VehicleLayout = () => {
  const {theme} = useTheme();

  return (
    <Stack screenOptions={{
      statusBarStyle: theme == 'dark' ? 'light' : 'dark',
      statusBarBackgroundColor: Colors[theme].background, 
      headerStyle: { backgroundColor: Colors[theme].background,},
      headerTitleStyle: { color: Colors[theme].text }, 
      
    headerTintColor: Colors[theme].text,  

    }}>
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Vehicle App", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="vehicle-list"
        options={{
          title: "Vehicle List",
          headerTitleAlign: "center",
         
        }}
      />
      <Stack.Screen
        name="add-edit-vehicle"
        options={{ title: "Vehicle Add", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="vehicle-details"
        options={{ title: "Vehicle Details", headerTitleAlign: "center" }}
      />
    </Stack>
  );
};

export default VehicleLayout;
