import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels";
import { useTheme } from "@/context/ThemeContext";
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Alert, ScrollView, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import Toggle from "react-native-toggle-element";

const SettingScreen = () => {
  const { theme, setTheme } = useTheme();
  const [toggleValue, setToggleValue] = useState<any>(false);
  const logoutFunc = () => {
    Alert.alert(labels.logout_title, labels.logout_msg, [
      {
        text: labels.cancel,
        onPress: () => { },
        style: "cancel",
      },
      {
        text: labels.logout,
        onPress: async () => { },
      },
    ]);
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
        // setValue("name", data?.findUserById?.name);
        // setValue("email", data?.findUserById?.email);
        // setValue("phoneNo", (data?.findUserById?.mobileNo as number).toString());
        // setModalVisible(true);
      },
    },
    {
      id: 2,
      title: labels.notification,
      iconLib: Ionicons,
      iconName: "notifications-outline",
      onTouchAction: () => { },
    },
    {
      id: 3,
      title: labels.language,
      iconLib: FontAwesome,
      iconName: "language",
      onTouchAction: () => { },
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
      onTouchAction: () => { },
    },
    {
      id: 6,
      title: labels.help,
      iconLib: Feather,
      iconName: "help-circle",
      onTouchAction: () => { },
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
        <ThemedView>
          <View style={styles.userInfo}>
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: "100%",
                backgroundColor: "#808080",
              }}
            ></View>
            <View>
              <ThemedText style={styles.userName}>Addd</ThemedText>
              <ThemedText style={styles.userEmail}>sdaad</ThemedText>
            </View>
          </View>
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
        </ThemedView>
      </ScrollView>
    </CustomHeader>
  );
};
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
  userInfo: {
    marginVertical: vs(15),
    flexDirection: "row",
    alignItems: "center",
    gap: ms(15),
    width: "100%",
  },
  userName: {},
  userEmail: {
    color: 'gray'
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
});

export default SettingScreen;