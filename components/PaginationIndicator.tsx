import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

interface PaginationIndicatorProps {
  currentPage: number;
}

const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({ currentPage }) => {
  const barAnim = useRef(new Animated.Value(currentPage)).current;

  useEffect(() => {
    Animated.timing(barAnim, {
      toValue: currentPage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      {[0, 1, 2].map((index) => {
        const width = barAnim.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [10, 50, 10],
          extrapolate: "clamp",
        });

        const backgroundColor = barAnim.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: ["#444", "#444", "#444"],
          extrapolate: "clamp",
        });

        const isActive = index === currentPage; // Check if this dot is active

        return (
          <Animated.View key={index} style={[styles.dot, { width, backgroundColor }]}>
            {isActive && (
              <LinearGradient
                colors={[Colors.gradient1, Colors.gradient2]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {/* Empty content for gradient styling */}
              </LinearGradient>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    overflow: "hidden", // To ensure the gradient is clipped to the dot's shape
  },
  gradient: {
    flex: 1, // Ensures the gradient fills the entire dot
  },
});

export default PaginationIndicator;
