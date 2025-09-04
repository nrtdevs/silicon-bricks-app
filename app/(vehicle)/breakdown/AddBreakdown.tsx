import CustomHeader from "@/components/CustomHeader";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import StepIndicator from "react-native-step-indicator";

const labels = ["Details", "Location", "Media"];

const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#3B82F6",
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: "#3B82F6",
  stepStrokeUnFinishedColor: "#D1D5DB", 
  separatorFinishedColor: "#3B82F6",
  separatorUnFinishedColor: "#D1D5DB",
  stepIndicatorFinishedColor: "#3B82F6",
  stepIndicatorUnFinishedColor: "#F3F4F6", 
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

const AddBreakdown = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const { theme } = useTheme();
  const { data } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data as string) : null;
  return (
    <CustomHeader
      title={parsedData?.id ? "Update Service" : "Create Service"}
      leftComponent={
        <Pressable
          style={styles.menuButton}
          onPress={() => {
            router.navigate({
              pathname: "/(vehicle)/breakdown/BreakdownList",
            })
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <View style={styles.container}>
        <StepIndicator
        customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
          onPress={setCurrentPosition}
        />

        <View style={styles.content}>
          {currentPosition === 0 &&
            <>
              <View>
                <Text>
                  fdgfdgh
                </Text>
              </View>
            </>}
        </View>
      </View>
    </CustomHeader>
  );
}

export default AddBreakdown

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    padding: ms(10),
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
