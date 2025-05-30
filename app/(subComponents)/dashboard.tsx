import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import * as SecureStore from "expo-secure-store";
import CustomHeader from "@/components/CustomHeader";
import { Fontisto } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SmallCart from "@/components/vehicle/SmallCart";
import { ThemedView } from "@/components/ThemedView";

const dashboard = () => {
  const [userType, setUserType] = useState<string | null>();

  const { theme } = useTheme();
  const getUserType = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    setUserType(parsedUserData?.userType);
  };

  useEffect(() => {
    getUserType();
  }, []);

  return (
    <ThemedView style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
      <ThemedText type="title">Silicon Bricks</ThemedText>
      <View style={styles.container}>
        {userType === "admin" && (
          <SmallCart
            icon={"family-tree"}
            label={"Admin"}
            onPress={() => {
              router.push("/(drawer)/(tabs)");
            }}
          />
        )}
        <SmallCart
          icon={"shield-car"}
          label={"Vehicle"}
          onPress={() => {
            router.push("/(vehicle)/(tabs)/home");
          }}
        />
        <SmallCart
          icon={"handshake"}
          label={"Meeting"}
          onPress={() => {
            router.push("/(meeting)/(tabs)");
          }}
        /> 
       
      </View>
             <Pressable
              onPress={() => router.push("/(subComponents)/purchasePlane")}
                style={[styles.gradient,]}

            >
              <LinearGradient
                colors={[Colors.gradient2, Colors.gradient1]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{padding:10,borderRadius:10}}
              >
                <ThemedText type="defaultSemiBold" style={{color:Colors.white}}>Purchase Plans</ThemedText>
              </LinearGradient>
            </Pressable>
    </ThemedView>
  );
};

const styles = ScaledSheet.create({
  container: { 
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: "16@vs",
    // marginTop: "70%",
    justifyContent: "space-around",
  },
  cardStyle: {
    // backgroundColor: "#C9C9C9",
    borderRadius: 8,
    paddingHorizontal: 15,
    flex: 1,
    // width: "45%",
    // height: "25%",
  },
  cardHeading: {
    fontSize: "28@ms",
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: "28@ms",
    fontWeight: "700",
    marginVertical: 20,
  },
  cartLogo: {
    borderRadius: "100%",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // right: 10,
    // bottom: 10,
  },
  gradient: {
      alignItems: 'center',
    justifyContent: 'center',  
  },
});

export default dashboard;
