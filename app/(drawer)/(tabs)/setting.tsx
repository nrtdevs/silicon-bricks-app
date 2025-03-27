import { Pressable, View, ScrollView, Alert, Button, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "@rneui/themed";
import CustomHeader from "@/components/CustomHeader";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { labels } from "@/constants/Labels";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import asyncKeys from "@/constants/asyncKeys";
import alertMsg from "@/constants/alertMsg";
import Loader from "@/components/ui/Loader";
import { NativeModules } from "react-native";
import GradientText from "@/components/ui/GradientText";
import CustomSwitch from "@/components/ui/CustomSwitch";
import Toggle from "react-native-toggle-element";


const { NetworkManager } = NativeModules;

const SettingScreen = () => {
  //global hooks
  const { theme, setTheme } = useTheme();

  // local states
  const [toggleValue, setToggleValue] = useState<any>(false);

  useEffect(() => {
    setToggleValue(theme === "light" ? true : false);
  }, [theme]);

  const rightIcon = () => {
    return (
      <CustomSwitch
        thumbColor={Colors.white}
        onValueChange={() => {
        }}
        value={false}
        style={styles.switchStyle}
      />
    );
  };

  const rightIcon2 = () => {
    return (
      <View
        style={{
          position: "absolute",
          right: s(10),
        }}
      >
        <Toggle
          value={toggleValue}
          onPress={(newState) => {
            setToggleValue(newState);
            setTheme(theme === "light" ? "dark" : "light");
          }}
          thumbButton={{
            width: ms(28),
            height: ms(28),
            radius: 30,
            // activeBackgroundColor: Colors.transparent,
            // inActiveBackgroundColor: Colors.transparent,
          }}
          leftComponent={
            <MaterialCommunityIcons
              name="weather-night"
              size={ms(18)}
              color={Colors.white}
            />
          }
          rightComponent={
            <Feather name="sun" size={ms(18)} color={Colors.orange} />
          }
          trackBar={{
            activeBackgroundColor: Colors[theme].toggleBtnBackground,
            inActiveBackgroundColor: Colors[theme].toggleBtnBackground,
            borderWidth: 1,
            borderActiveColor: Colors.black,
            borderInActiveColor: Colors.white,
            width: s(45),
            height: vs(22),
          }}
        />
      </View>
    );
  };
  const firstData = [
    {
      id: 1,
      title: labels.profile,
      iconLib: AntDesign,
      iconName: "profile",
      onTouchAction: () => {
      },
    },
    {
      id: 2,
      title: labels.notification,
      iconLib: Ionicons,
      iconName: "notifications-outline",
      onTouchAction: () => {
      },
    },
    {
      id: 3,
      title: labels.language,
      iconLib: FontAwesome,
      iconName: "language",
      onTouchAction: () => {
      },
    },
    {
      id: 4,
      title: labels.appearance,
      iconLib: Ionicons,
      iconName: "moon",
      onTouchAction: () => { },
      rightIcon: rightIcon2(),
    },
    {
      id: 5,
      title: labels.support,
      iconLib: FontAwesome,
      iconName: "support",
      onTouchAction: () => {
      },
    },
    {
      id: 6,
      title: labels.help,
      iconLib: Feather,
      iconName: "help-circle",
      onTouchAction: () => {
      },
    },
    {
      id: 7,
      title: labels.about,
      iconLib: AntDesign,
      iconName: "infocirlceo",
      onTouchAction: () => {
        router.push("/about");
      },
    },
  ];

  const logoutFunc = () => {
    Alert.alert(labels.logout_title, labels.logout_msg, [
      {
        text: labels.cancel,
        onPress: () => { },
        style: "cancel",
      },
      {
        text: labels.logout,
        onPress: async () => {
        },
      },
    ]);
  };

  return (
    <CustomHeader
      toggleValue={toggleValue}
      leftComponent={
        <ThemedText style={styles.headerLeft}>{labels.settings}</ThemedText>
      }
      rightComponent={
        <Pressable style={styles.iconStyle} onPress={logoutFunc}>
          <MaterialIcons
            name="logout"
            size={ms(20)}
            color={Colors[theme].text}
          />
        </Pressable>
      }
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: ms(10),
          paddingBottom: vs(15),
        }}
        showsVerticalScrollIndicator={false}
      >
        {firstData.map((item: any, i: number) => {
          return (
            <Pressable
              key={i}
              onPress={item?.onTouchAction}
              style={[
                styles.container,
                { backgroundColor: Colors[theme].cartBg },
              ]}
            >
              {item.image ? (
                item.image
              ) : item.iconLib ? (
                <item.iconLib
                  name={item.iconName}
                  size={ms(22)}
                  color={Colors[theme].text}
                />
              ) : null}

              <View style={{ width: "80%" }}>
                <ThemedText type="default">{item.title}</ThemedText>
                {item.subtitle && (
                  <ThemedText
                    type="default"
                    style={{
                      fontSize: ms(12),
                      lineHeight: ms(17),
                    }}
                  >
                    {item.subtitle}
                  </ThemedText>
                )}
              </View>

              {item.rightIcon && item.rightIcon}
            </Pressable>
          );
        })}
      </ScrollView>
    </CustomHeader>
  );
};

export default SettingScreen;

const styles = ScaledSheet.create({
  headerLeft: {
    fontSize: "18@ms",
    fontWeight: 600,
    textAlign: "center",
  },
  iconStyle: {
    padding: "10@ms",
    borderRadius: "100%",
  },
  container: {
    minHeight: "45@vs",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: "5@ms",
    padding: "10@ms",
    borderRadius: "12@ms",
    gap: "10@ms",
  },
  switchStyle: {
    position: "absolute",
    right: "10@s",
  },
});
