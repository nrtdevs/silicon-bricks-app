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
          paddingTop: insets.top + vs(0),
        },
      ]}
    >
      {(leftComponent || rightComponent || title) && (
        <View
          style={[
            styles.headerContent,
            {
              backgroundColor: Colors[theme].background,
              borderBottomColor: Colors[theme].border,
              shadowColor: Colors[theme].shadow,
            },
            leftComponent ? styles.headerContentWithLeft : styles.headerContentWithoutLeft,
          ]}
        >
          {leftComponent ? leftComponent : <View style={styles.emptyComponentPlaceholder} />}
          <ThemedText style={[styles.title, { color: Colors[theme].text }]}>
            {title}
          </ThemedText>
          {rightComponent ? rightComponent : <View style={styles.emptyComponentPlaceholder} />}
        </View>
      )}

      {children}
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ms(10),
    marginBottom: vs(8),
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: ms(2) },
    shadowOpacity: 0.1,
    shadowRadius: ms(3),
    elevation: ms(3),
  },
  headerContentWithLeft: {
    justifyContent: "space-between",
  },
  headerContentWithoutLeft: {
    justifyContent: "flex-end",
  },
  title: {
    fontSize: ms(20),
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  emptyComponentPlaceholder: {
    width: ms(24),
  },
});
