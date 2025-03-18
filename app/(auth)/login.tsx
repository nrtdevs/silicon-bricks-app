import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";


const Index = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                <Text style={styles.welcomeText}>Welcome</Text>
                <TextInput
                    placeholder="Enter Email"
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                >
                </TextInput>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter Password"
                    onChangeText={text => setPassword(text)}
                >
                </TextInput>
                <Pressable style={styles.buttonLog}
                    onPress={() => router.push('/dashboard')}
                >
                    <Text style={styles.loginStyle}>Login</Text>
                </Pressable>
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
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20
    },
    welcomeText: {
        fontSize: 30,
        color: 'black',
        fontWeight: "500",
        alignSelf: 'center',
    },
    buttonLog: {
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    loginStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: "500"
    }
})