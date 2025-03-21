import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import toast from "react-native-toast-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { REQUEST_OTP } from "@/graphql/Mutations";
import { useRouter } from "expo-router";

const schema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(4, { message: " Password is required" }),
});

const { width } = Dimensions.get("window");

const Home = () => {
  const [createRequestOpt] = useMutation(REQUEST_OTP);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@newrise.in",
      password: "Password@123",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const RequestOtp = await createRequestOpt({
        variables: {
          otpRequestData: {
            email: data.email,
            password: data.password,
          },
        },
      });

      console.log(RequestOtp, "RequestOtp");
      toast.show({
        type: "success",
        text1: "Otp Send Successfully",
      });
      router.push({
        pathname: "/otp",
        params: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.text}>Login Account</Text>

        {/* Create an account so you can explore jobs */}
        <Text style={styles.mainText}>
          Login to account so you can explore all{" "}
          <Text style={styles.spanText}> The Products</Text>
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <TextInput
              placeholder="Email..."
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }: any) => (
            <TextInput
              placeholder="Password..."
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.account}>Already ? have an account </Text>

        <View style={styles.orContainer}>
          <Text style={styles.continue}>Or Continue With </Text>
        </View>

        <View style={styles.socialContainer}>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/img/google.png")}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/img/facebook.png")}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/img/apple.png")}
              style={{ width: 24, height: 24 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 20,
    alignItems: "center",
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
  },
  inputContainer: {
    marginTop: 50,
    alignItems: "center",
    width: width * 0.9,
  },
  input: {
    width: width * 0.9,
    height: 64,
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
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
  account: {
    marginTop: 15,
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
  },
  orContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  continue: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logo: {
    width: 60,
    height: 44,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    borderRadius: 10,
    borderColor: "#3B82F6",
    borderWidth: 1,
  },
  error: {
    color: "red",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
