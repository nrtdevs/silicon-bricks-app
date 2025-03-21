import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Login } from "@/graphql/Mutations";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const router = useRouter();

  // Refs for OTP inputs
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [verifyOtp, { error }] = useMutation(Login);
  const params = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: new Array(6).fill(""), // OTP as an array of 6 empty strings
    },
  });

  const onSubmit = async (data: { otp: string[] }) => {
    if (!params?.email || !params?.password) {
      console.log("Email or Password is missing");
      return;
    }

    try {
      const otpValue = Number(data.otp.join(""));
      const RequestOtp = await verifyOtp({
        variables: {
          loginData: {
            email: params.email,
            password: params.password,
            otp: otpValue,
          },
        },
      });

      // Log the accessToken if it exists
      const accessToken = RequestOtp?.data?.login?.accessToken;
      if (accessToken) {
        // Save the accessToken to SecureStore
        await SecureStore.setItemAsync("accessToken", accessToken);

        // Retrieve the token from SecureStore
        const token = await SecureStore.getItemAsync("accessToken");
        router.replace("/(drawer)");
      } else {
        console.log("Failed to retrieve accessToken");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Focus on the next input after entering a digit
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If backspace is pressed and the input is empty, focus on the previous input
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.text}>Login Account</Text>
        <Text style={styles.mainText}>
          Login to account so you can explore all{" "}
          <Text style={styles.spanText}> The Products</Text>
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <View key={index}>
            <Controller
              control={control}
              name={`otp.${index}`}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  placeholder="0"
                  value={value}
                  ref={(ref) => (inputRefs.current[index] = ref)} // Set ref for each input
                  onChangeText={(text) => {
                    handleChange(text, index);
                    onChange(text);
                  }}
                />
              )}
            />
            {errors.otp && errors.otp[index] && (
              <Text style={styles.error}>
                {errors.otp[index]?.message?.toString()}
              </Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Submit OTP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FF",
    paddingVertical: 20,
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  hero: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 20,
  },
  spanText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B82F6",
  },
  mainText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 50,
    alignItems: "center",
    width: width * 0.9,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    borderColor: "#3B82F6",
  },
  buttonContainer: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 15,
    width: width * 0.9,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
