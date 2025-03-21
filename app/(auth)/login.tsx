import { KeyboardAvoidingView, Image, StyleSheet, View, ActivityIndicator, TouchableOpacity, ScrollView, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../query/requestOtp";
import * as SecureStore from "expo-secure-store";


const Index = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    const validationInput = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Enter a valid eamil");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }
        return isValid;
    };
    const handleLogin = async () => {
        if (!validationInput()) return;
        try {
            const { data } = await login({
                variables: {
                    otpRequestData: {
                        email,
                        password,
                    },
                },
            });
            if (data?.login?.token) {
                await SecureStore.setItemAsync("authToken", data.login.token);
                alert(`Welcome, ${data.login.user.name}!`);
                router.push("/(tabs)");
            }
        } catch (err) {
            console.error("Login Error:", err);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
            <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    margin: 30,
                }}
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={false}>
                <Image
                    source={require("../../assets/images/react-logo.png")}
                    style={{ width: 100, height: 100,alignSelf : 'center',borderRadius : 50,margin : 10}}
                />
                <Text style={styles.welcomeText}>Login</Text>
                <Text style={{ marginTop: 20, color: 'black', fontSize: 16, fontWeight: '400' }}>Email</Text>
                <TextInput
                    placeholder="Enter Email"
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                >
                </TextInput>
                {emailError ? <Text style={{ color: 'red', fontSize: 14 }}>{emailError}</Text> : null}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ marginTop: 15, color: 'black', fontSize: 16, fontWeight: '400' }}>Password</Text>
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/forgotPassword")}>
                        <Text style={{ marginTop: 15, color: '#056EE9', fontSize: 16, fontWeight: '400' }}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter Password"
                    onChangeText={text => setPassword(text)}
                >
                </TextInput>
                {passwordError ? <Text style={{ color: 'red', fontSize: 14 }}>{passwordError}</Text> : null}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? 'blue' : undefined}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 14, color: 'black' }}> Remeber Me</Text>
                </View>
                <Pressable style={styles.buttonLog}
                    // onPress={handleLogin}
                    onPress={() => router.push("/(tabs)")}
                >
                    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginStyle}>Login</Text>}
                </Pressable>
                {error && <Text style={{ color: "red", fontSize: 14 }}>{error.message}</Text>}
                <TouchableOpacity
                    style={styles.buttonLog}
                    onPress={() => router.push("/signup")}
                >
                    <Text style={styles.loginStyle}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default Index;
const styles = StyleSheet.create({
    imgStyle: {
        height: "35%",
        width: "100%",
        left: "5%",
    },
    input: {
        padding: 13,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5
    },
    welcomeText: {
        fontSize: 30,
        color: 'black',
        fontWeight: "500",
        alignSelf: 'center',
    },
    buttonLog: {
        padding: 10,
        backgroundColor: "#056EE9",
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    loginStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: "500",

    }
})