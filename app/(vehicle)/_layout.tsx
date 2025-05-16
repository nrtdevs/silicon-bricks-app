import React from "react";
import { Slot, Stack, useNavigation } from "expo-router";
import { Pressable } from "react-native";


const VehicleLayout = () => {
  const navigation = useNavigation();

  return (
    <Stack>
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
