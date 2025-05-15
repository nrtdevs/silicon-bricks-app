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
        <CustomHeader>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    marginVertical: 'auto',
                    alignItems: "center",
                    padding: 12,
                    flexDirection: "row",
                    gap: 20,
                    flexWrap: "wrap",
                    marginTop: '50%'
                }}
            >
                {userType === "admin" && <LinearGradient
                    colors={[Colors.gradient2, Colors.gradient1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient,]}
                >
                    <Pressable
                        style={[
                            styles.cardStyle,
                            // { backgroundColor: Colors[theme]?.cartBg },
                        ]}
                        onPress={() => router.navigate("/(drawer)/(tabs)")}
                    >
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={[styles?.cartLogo, {
                                        backgroundColor: Colors[theme]?.cartBg,
                                    }]}
                                >
                                    <ThemedText style={styles.cardHeading}>A</ThemedText>
                                </View>
                                <ThemedText style={styles.cardTitle}>Admin</ThemedText>
                            </View>
                        </View>
                    </Pressable>
                </LinearGradient>}

                <LinearGradient
                    colors={[Colors.gradient2, Colors.gradient1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient,]}
                >
                    <Pressable
                        style={[
                            styles.cardStyle,
                            // { backgroundColor: Colors[theme]?.cartBg },
                        ]}
                        onPress={() => router.navigate("/(meeting)/(tabs)")}
                    >
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={[styles?.cartLogo, {
                                        backgroundColor: Colors[theme]?.cartBg,
                                    }]}
                                >
                                    <ThemedText style={styles.cardHeading}>M</ThemedText>
                                </View>
                                <ThemedText style={styles.cardTitle}>Meeting</ThemedText>
                            </View>
                        </View>
                    </Pressable>
                </LinearGradient>

                <LinearGradient
                    colors={[Colors.gradient2, Colors.gradient1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient,]}
                >
                    <Pressable
                        style={[
                            styles.cardStyle,
                            // { backgroundColor: Colors[theme]?.cartBg },
                        ]}
                        onPress={() => router.navigate("/vehicle/(tabs)/home")}
                    >
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={[styles?.cartLogo, {
                                        backgroundColor: Colors[theme]?.cartBg,
                                    }]}
                                >
                                    <ThemedText style={styles.cardHeading}>V</ThemedText>
                                </View>
                                <ThemedText style={styles.cardTitle}>Vehicle</ThemedText>
                            </View>
                        </View>
                    </Pressable>
                </LinearGradient>

                {/* <LinearGradient
                    colors={[Colors.gradient2, Colors.gradient1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient,]}
                >
                    {userType === "admin" && (
                        <Pressable
                            style={[
                                styles.cardStyle,
                                // { backgroundColor: Colors[theme]?.cartBg },
                            ]}
                            onPress={() => router.replace("/(drawer)/(tabs)")}
                        >
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        flex: 1,
                                    }}
                                >
                                    <ThemedText style={styles.cardTitle}></ThemedText>
                                    <View
                                        style={[styles?.cartLogo, {
                                            backgroundColor: Colors[theme]?.cartBg,
                                        }]}
                                    >
                                        <ThemedText style={styles.cardHeading}>M</ThemedText>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )}
                </LinearGradient> */}
            </View>
        </CustomHeader>
    );
};

const styles = ScaledSheet.create({
    cardStyle: {
        // backgroundColor: "#C9C9C9",
        borderRadius: 8,
        paddingHorizontal: 15,
        flex: 1
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
        // borderRadius: '5@ms',
        // alignItems: 'center',
        // justifyContent: 'center'
        width: "45%",
        height: "25%",
        position: "relative",
        borderRadius: 12,
    },
});

export default dashboard;
