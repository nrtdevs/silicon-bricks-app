import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "../ThemedText";
import { s, ScaledSheet } from "react-native-size-matters";

type GradientButtonProps = {
  title: string | React.ReactNode;
  onClick: () => void;
  gradient?: boolean;
  style?: any;
  textStyle?: TextStyle;
};

const GradientButton: React.FC<GradientButtonProps> = ({ title, onClick, gradient = false, style, textStyle }) => {
  const {theme}=useTheme()
  
  return (
    <TouchableOpacity onPress={onClick} style={[styles.buttonContainer, style]}>
      {gradient ? (
        <LinearGradient
          colors={[Colors.gradient2, Colors.gradient1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, style]} // Spread `style` here to allow padding changes
        >
          <ThemedText type="defaultSemiBold" style={{textAlign:'center',color:"#fff"}}>{title}</ThemedText>
        </LinearGradient>
      ) : (
        <ThemedText type="defaultSemiBold" style={[ styles.plainButton, style, textStyle,{backgroundColor: Colors[theme].cartBg,color:theme=="dark"?Colors.white:Colors.black}]}>{title}</ThemedText> // Spread `style` here for padding override
      )}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: {
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: '14@vs',
    paddingHorizontal: '20@s',
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
  },
  plainButton: {
    paddingVertical: '14@vs',
    textAlign: "center",
  },
});

export default GradientButton;
