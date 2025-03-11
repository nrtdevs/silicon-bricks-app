import { View, Text } from "react-native";
import React from "react";
import GradientText from "./GradientText";
import { ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "../ThemedText";
import { labels } from "@/constants/Labels";

type Props = {};

const Tnc = (props: Props) => {
  return (
    <ThemedText type="defaultSemiBold" style={styles.termsText}>
      {labels.ts}{" "}
      <GradientText textStyle={styles.linkText}>
        {labels.termsOfUse}
      </GradientText>{" "}
      and{" "}
      <GradientText textStyle={styles.linkText}>
        {labels.privacyPolicy}
      </GradientText>
    </ThemedText>
  );
};

export default Tnc;

const styles = ScaledSheet.create({
  footerText: {
    fontSize: "14@ms",
    fontWeight: 600,
    fontFamily: "bold",
  },
  linkText: { 
    fontSize: "8@ms",
    textDecorationLine: "underline", 
    fontFamily: "bold",
    marginTop: "8@vs",
  },
  footer: {
    marginTop: "auto",
    gap: 16,
    alignItems: "center",
  },
  termsText: {
    fontWeight: "600",
    fontSize: "10@ms",
    fontFamily: "bold",
    textAlign: "center",
  },
});
