import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SmallCart from "@/components/vehicle/SmallCart";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SmallCart icon={"car"} label={"Vehicle"} onPress={() => {router.navigate('/vehicleList')}}/>
      <SmallCart icon={"hammer"} label={"Vehicle Breakdown"} />
      <SmallCart icon={"wallet-outline"} label={"Vehicle Expense"} />
      <SmallCart icon={"timelapse"} label={"Activity Logs"} />
    </SafeAreaView>
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
    marginTop:"50%"
  },
});
