import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { labels } from "@/constants/Labels";
import CustomValidation from "@/components/CustomValidation";
import asyncKeys from "@/constants/asyncKeys";
import CustomButton from "@/components/CustomButton";
import alertMsg from "@/constants/alertMsg";
import { useMutation } from "@apollo/client";
import { RequestOtpDocument } from "@/graphql/generated";
import Toast from "react-native-toast-message";

// Define form data types
interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [createRequestOpt, createRequestState] = useMutation(RequestOtpDocument);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "admin@newrise.in",
      password: "Password@123",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const response = await createRequestOpt({
        variables: {
          otpRequestData: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (response?.data?.requestOtp?.otp) {
        Toast.show({
          type: "success",
          text1: "Otp Send Successfully",
        });
        router.push({
          pathname: "/otp",
          params: {
            email: data.email,
            password: data.password,
            otp: response?.data?.requestOtp?.otp,
          },
        });
      } else {
        console.log("Otp Not Send");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CustomHeader>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <View style={styles.content}>
          {/* login Text for silicon bricks */}
          <View>
            <ThemedText type="title" style={styles.title}>
              {labels.loginToSiliconBricks}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.subtitle}>
              {labels?.loginToAccount}
            </ThemedText>
          </View>

          <View style={styles.form}>
            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name="email"
              inputStyle={[{ lineHeight: ms(20) }]}
              label={`${labels.email} / ${labels.username}`}
              placeholder={`${labels.enter} ${labels.username}/${labels.email}`}
              onFocus={() => setIsFocused("email")}
              rules={{
                required: labels.emailIsRequired,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: labels.enterAValidEmail,
                },
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "email"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
            />

            <CustomValidation
              type="input"
              control={control}
              name="password"
              label={labels.password}
              placeholder={labels.password}
              labelStyle={styles.label}
              secureTextEntry={!passwordVisible}
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "password"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
              onFocus={() => setIsFocused("password")}
              rightIcon={
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={ms(25)}
                    color="#666"
                  />
                </Pressable>
              }
              rules={{
                required: labels.passwordIsRequired,
                minLength: {
                  value: 6,
                  message: labels?.passwordLength,
                },
              }}
            />

            {/* Forgot Password */}
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <TouchableOpacity onPress={() => router.push("/forgotpassword2")}>
                <ThemedText
                  style={[styles.forgotPassword, { color: Colors.grayText }]}
                >
                  {labels.forgotPassword}
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View />

            {/* Login Button */}
            <CustomButton
              title={labels.login}
              isLoading={createRequestState?.loading}
              onPress={handleSubmit(onSubmit)}
              isGradient
            />

            {/* Footer */}
            <View style={styles.footerText}>
              <ThemedText type="defaultSemiBold" style={styles.footerText}>
                {labels.dontHaveAnAccount}
              </ThemedText>
              <Pressable onPress={() => router.push("/signup2")}>
                <ThemedText
                  style={[
                    styles.linkText,
                    { fontSize: ms(14), color: "#155B8E" },
                  ]}
                >
                  {labels?.signUp}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </CustomHeader>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    padding: "12@ms",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: "10@vs",
    gap: "8@ms",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: "32@ms",
  },
  subtitle: {
    fontSize: "18@ms",
    marginBottom: "32@ms",
  },
  form: {
    gap: "10@vs",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
  input: {
    borderRadius: "18@ms",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    width: "100%",
    padding: "16@ms",
    fontSize: "16@ms",
    fontWeight: 500,
  },
  eyeButton: {
    position: "absolute",
    right: "16@ms",
  },
  forgotPassword: {
    color: Colors.grayText,
    textAlign: "right",
    fontSize: "14@ms",
    fontFamily: "medium",
  },
  socialLogin: {
    marginTop: "10@ms",
    width: "100%",
  },
  footerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: "5@vs",
    textDecorationLine: "underline",
    fontWeight: 600,
    textAlign: "center",
    fontFamily: "bold",
  },
});
