import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";

const CustomHeader = ({
  title,
  toggleValue,
  children,
  leftComponent,
  rightComponent,
}: any) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].background,
          paddingTop: insets.top,
          paddingBottom : insets.bottom
        },
      ]}
    >
      {(leftComponent || rightComponent || title) &&<View
        style={[
          styles.iconView,
          {
            flexDirection: "row",
            justifyContent: leftComponent ? "space-between" : "flex-end",
            alignItems: "center",
            backgroundColor: Colors[theme].background,
            paddingHorizontal: 10,
            marginBottom: vs(8),
            // Bottom border only
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.1)",

            // iOS shadow only at bottom
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,

            // Android shadow (bottom only simulation)
            elevation: 4,
          },
        ]}
      >
        {leftComponent ? leftComponent : <View style={{ width: 24 }} />}
        <ThemedText
          style={{
            color: Colors[theme].text,
            fontSize: ms(20),
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          {title}
        </ThemedText>
        {rightComponent ? rightComponent : <View style={{ width: 24 }} />}
      </View>}

      {children}
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = ScaledSheet.create({
  logo: {
    width: "25@ms",
    height: "25@ms",
  },
  container: {
    flex: 1,
  },
  iconView: {
    flexDirection: "row",
    paddingHorizontal: "12@ms",
  },
});
