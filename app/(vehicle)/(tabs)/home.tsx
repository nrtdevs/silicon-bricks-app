import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SmallCart from "@/components/vehicle/SmallCart";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

const home = () => {
  return (
    <ThemedView style={styles.container}>
      <SmallCart icon={"car"} label={"Vehicle"} onPress={() => {router.navigate('/vehicle-list')}}/>
      <SmallCart icon={"hammer"} label={"Vehicle Breakdown"} onPress={()=>router.navigate("/vehicle-breakdown-list")}/>
      <SmallCart icon={"wallet-outline"} label={"Vehicle Expense"} />
      <SmallCart icon={"timelapse"} label={"Activity Logs"} />
    </ThemedView>
  );
};

export default home;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", // or 'space-between'
    paddingVertical: "16@vs", 
  },
});
