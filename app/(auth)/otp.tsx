import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { labels } from "@/constants/Labels";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import OtpInput from "@/components/OtpInput";
import { LoginDocument } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const LoginCodeScreen = () => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState("123456");
  const params = useLocalSearchParams();
  const [verifyOtp, verifyState] = useMutation(LoginDocument);

  const handleOtpFilled = (code: string) => {
    setOtp(code);
    console.log(code);
  };


  const onSubmit = async () => {
    try {
      const otpValue = Number(otp);
      if (params?.otp == otp) {
        console.log(otpValue);
        const response = await verifyOtp({
          variables: {
            loginData: {
              email: String(params.email),
              password: String(params.password),
              otp: otpValue,
            },
          },
        });

        // Log the accessToken if it exists
        const accessToken: any = response?.data?.login?.accessToken;
        if (accessToken) {
          // Save the accessToken to SecureStore
          await SecureStore.setItemAsync("accessToken", accessToken);
          await SecureStore.setItemAsync("userId", response?.data?.login?.user?.id as string);
          // Retrieve the token from SecureStore
          const token = await SecureStore.getItemAsync("accessToken");
          router.replace("/(drawer)/(tabs)");
        } else {
          console.log("Failed to retrieve accessToken");
        }
      } else {
        console.log("otp not match");
        Alert.alert("Otp not match");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <CustomHeader
      leftComponent={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={ms(34)}
            color={Colors[theme].text}
            onPress={() => router.back()}
          />
          <ThemedText style={styles.headerLeft}>{labels?.loginCode}</ThemedText>
        </View>
      }
    >
      <ThemedView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ marginVertical: vs(20) }}>
            <ThemedText style={{ textAlign: "center" }} type="title">
              {labels?.enterCode}
            </ThemedText>
            <ThemedText style={{ textAlign: "center", fontSize: ms(14) }}>
              {labels?.enterCodeMsg}
            </ThemedText>
          </View>
          <OtpInput
            codeLength={6}
            onCodeFilled={(code: any) => {
              handleOtpFilled(code);
            }}
            error={verifyState?.error?.message ? true : false}
            setError={(value: any) => { }}
            errorMessage={labels?.errorMessage}
            defaultValue={otp}
          />
        </View>

        <CustomButton
          titleStyle={{ color: Colors?.white }}
          isLoading={verifyState?.loading}
          title={labels?.confirm}
          isGradient
          onPress={onSubmit}
        />
      </ThemedView>
    </CustomHeader>
  );
};

const styles = ScaledSheet.create({
  headerLeft: {
    fontSize: "18@ms",
    fontWeight: 500,
    textAlign: "center",
  },
  container: {
    paddingHorizontal: "12@ms",
    paddingVertical: "20@ms",
    gap: "20@ms",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default LoginCodeScreen;