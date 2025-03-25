import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { labels } from "@/constants/Labels";
import CustomValidation from "@/components/CustomValidation";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import alertMsg from "@/constants/alertMsg";
import Loader from "@/components/ui/Loader";
import { RegisterDocument } from "@/graphql/generated";
import { useMutation } from "@apollo/client";

// Define form data types
interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const { theme } = useTheme();

  // Api Call

  const [RegisterUser, { loading, error }] = useMutation(RegisterDocument);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({ mode: "onBlur" });

  const onSubmit = async (data: SignUpFormData) => {};

  return (
    <CustomHeader>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <View style={styles.content}>
          {/* signup text  */}
          <View>
            <ThemedText type="title" style={styles.title}>
              {labels.welcomeToSiliconBricks}
            </ThemedText>
            <ThemedText type="title" style={styles.subtitle}>
              {labels.createNewSiliconBricksAccount}
            </ThemedText>
          </View>

          {/* signup form */}
          <View style={styles.form}>
            <CustomValidation
              type="input"
              control={control}
              name="email"
              label={`${labels.email}/${labels.username}`}
              placeholder={`${labels.enterEmail}/${labels.username}`}
              rules={{
                required: labels.emailIsRequired,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: labels.enterAValidEmail,
                },
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsFocused("email")}
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
              onFocus={() => setIsFocused("password")}
              label={labels.password}
              placeholder={labels.enterPassword}
              secureTextEntry={!passwordVisible}
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "password"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
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
                  value: 8,
                  message: labels?.passwordLength,
                },
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              onFocus={() => setIsFocused("confirmPassword")}
              name="confirmPassword"
              label={labels.confirm}
              placeholder={`${labels.confirm} ${labels.password}`}
              secureTextEntry={!confirmPasswordVisible}
              containerStyle={[
                {
                  borderRadius: ms(20),
                },
                isFocused == "confirmPassword"
                  ? { borderColor: Colors[theme].text, borderWidth: 1 }
                  : {},
              ]}
              rightIcon={
                <Pressable
                  style={styles.eyeButton}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={ms(25)}
                    color="#666"
                  />
                </Pressable>
              }
              rules={{
                required: labels.pleaseConfirmYourPassword,
                validate: (value: string) =>
                  value === watch("password") || labels.passwordDontMatch,
              }}
            />

            <View style={{ height: vs(20) }} />
            <CustomButton
              title={labels?.signUp}
              onPress={handleSubmit(onSubmit)}
              isGradient
            />
          </View>

          {/* footer  */}
          <View style={styles.footer}>
            <ThemedText type="defaultSemiBold" style={styles.footerText}>
              {labels.alreadyHaveAccount}
              <Pressable onPress={() => router.dismissTo("/login2")}>
                <Text
                  style={[
                    styles.linkText,
                    { fontSize: ms(14), color: "#155B8E" },
                  ]}
                >
                  {labels.signIn}
                </Text>
              </Pressable>
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </CustomHeader>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1A1A1A",
    padding: "12@ms",
    paddingBottom: "10@vs",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: "32@ms",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "19@ms",
    marginBottom: "32@ms",
  },
  form: {
    gap: 8,
  },
  eyeButton: {
    //  padding: "5@ms",
  },
  footer: {
    alignItems: "center",
    width: "100%",
    marginTop: "10@vs",
  },
  footerText: {
    fontSize: "14@ms",
    fontWeight: "600",
  },
  linkText: {
    color: "#155B8E",
    textDecorationLine: "underline",
    fontWeight: "600",
    top: "2@vs",
    left: "2@ms",
    fontFamily: "bold",
  },
});
