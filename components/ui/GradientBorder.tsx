import React from "react";
import { View, StyleSheet } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const GradientBorder = ({ children, isSelected }:any) => {
  if (!isSelected) {
    return <View style={styles.chipContainer}>{children}</View>;
  }

  return (
    <LinearGradient
      colors={[Colors.gradient1, Colors.gradient2]} // Replace with your gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.chipContainer}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 16,
    padding: 0.5, // This will act as the border width
  },
  chipContainer: {
    borderRadius: 200, // Slightly less than gradientBorder to fit inside
    overflow: "hidden",
  },
});

export default GradientBorder;