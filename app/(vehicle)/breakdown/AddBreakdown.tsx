import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator";

const labels = ["Cart", "Payment", "Confirm"];

const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#3B82F6", // primary blue
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: "#3B82F6",
  stepStrokeUnFinishedColor: "#D1D5DB", // gray
  separatorFinishedColor: "#3B82F6",
  separatorUnFinishedColor: "#D1D5DB",
  stepIndicatorFinishedColor: "#3B82F6",
  stepIndicatorUnFinishedColor: "#F3F4F6", // light background
  stepIndicatorCurrentColor: "#FFFFFF",
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: "#3B82F6",
  stepIndicatorLabelFinishedColor: "#FFFFFF",
  stepIndicatorLabelUnFinishedColor: "#9CA3AF",
  labelColor: "#9CA3AF",
  labelSize: 13,
  currentStepLabelColor: "#3B82F6",
};

export default function PremiumStepIndicator() {
  const [currentPosition, setCurrentPosition] = useState(1);

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={labels.length}
        onPress={setCurrentPosition}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{labels[currentPosition]}</Text>
        <Text style={styles.subtitle}>
          {currentPosition === 0 && "Review items in your cart."}
          {currentPosition === 1 && "Enter payment details securely."}
          {currentPosition === 2 && "Confirm and place your order."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#F9FAFB",
  },
  content: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});
