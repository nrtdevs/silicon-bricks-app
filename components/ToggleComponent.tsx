import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import Toggle from "react-native-toggle-element";
import { Colors } from "@/constants/Colors";
import { ms, mvs, s, ScaledSheet, vs } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/ThemeContext";
import { SvgIcons } from "@/assets";

interface Props {
  toggleValue: boolean;
  toggleLoading?: boolean;
  normalToggle?: boolean;
  onPress?: (newState: boolean | undefined) => void;
}

const ToggleComponent = ({
  toggleValue,
  toggleLoading,
  normalToggle,
  onPress,
}: Props) => {
  const { theme } = useTheme();

  // Define the width of the track and the thumb button
  const trackWidth = s(160);
  const thumbWidth = ms(80);

  // Calculate the translation value
  const translationValue = trackWidth - thumbWidth - 8; // 8 is the marginHorizontal

  // Create an animated value for the thumb position
  const thumbPosition = useRef(new Animated.Value(toggleValue ? translationValue : 0)).current;

  // Animate the thumb position when toggleValue changes
  useEffect(() => {
    Animated.timing(thumbPosition, {
      toValue: toggleValue ? translationValue : 0,
      duration: 300, // Adjust the duration for smoother or faster animation
      easing: Easing.out(Easing.ease),
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [toggleValue]);

  if (normalToggle) {
    return (
      <View style={[styles.container, { backgroundColor: Colors.gradient1 }]}>
        <View style={[styles.powerImgView, { backgroundColor: Colors.white }]}>
          <SvgIcons.PowerIcon
            width={ms(32)}
            height={ms(32)}
            fill={Colors.gradient1}
          />
        </View>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={
        toggleValue
          ? [Colors.gradient1, Colors.gradient2]
          : [
              Colors[theme].toggleBtnBackground,
              Colors[theme].toggleBtnBackground,
            ]
      }
      style={styles.container}
    >
      <Toggle
        value={toggleValue}
        onPress={(newState?: boolean) => {
          onPress && onPress(newState);
        }}
        thumbStyle={{
          marginHorizontal: 5,
          transform: [{ translateX: thumbPosition }], // Use the animated value here
        }}
        disabled={toggleLoading}
        disabledTitleStyle={{ color: Colors[theme].toggleBtnBackground }}
        disabledStyle={{ backgroundColor: "gray", opacity: 0.3 }}
        thumbButton={{
          width: thumbWidth,
          height: ms(80),
          radius: ms(40),
          inActiveBackgroundColor: Colors[theme].toggleCircleBg,
          activeBackgroundColor: Colors.white,
        }}
        trackBar={{
          width: trackWidth,
          height: vs(80),
          radius: ms(50),
          activeBackgroundColor: "transparent",
          inActiveBackgroundColor: "transparent",
        }}
        thumbInActiveComponent={
          <SvgIcons.PowerInactive
            width={ms(40)}
            height={ms(40)}
            fill={theme == "dark" ? Colors.gray : Colors.white}
            style={{ alignSelf: "center", flexGrow: 1 }}
          />
        }
        thumbActiveComponent={
          <SvgIcons.PowerIcon
            width={ms(40)}
            height={ms(40)}
            fill={Colors.gradient1}
            style={{ alignSelf: "center", flexGrow: 1 }}
          />
        }
      />
    </LinearGradient>
  );
};

export default ToggleComponent;

const styles = ScaledSheet.create({
  container: {
    width: "160@s",
    height: "80@vs",
    borderRadius: "50@ms",
    padding: "5@ms",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  powerImgView: {
    width: "80@ms",
    height: "80@ms",
    borderRadius: "40@ms",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
  },
  trackbarStyle: {
    width: "152@s",
    height: "70@vs",
    borderRadius: "48@ms",
    activeBackgroundColor: "transparent",
    inActiveBackgroundColor: "transparent",
  },
});