import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { labels } from "@/constants/Labels";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import CustomButton from "@/components/CustomButton";

const AboutScreen = () => {
    const { theme } = useTheme();
    return (
        <CustomHeader
            leftComponent={
                <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={ms(34)}
                        color={Colors[theme].text}
                        onPress={() => router.back()}
                    />
                    <ThemedText style={styles.headerLeft}>{labels?.about}</ThemedText>
                </ThemedView>
            }
        >
            <ThemedView
                style={{
                    flex: 1,
                    paddingHorizontal: ms(12),
                    flexDirection: "column",
                    gap: ms(16),
                    marginBottom: ms(20),
                }}
            >
                <ThemedView
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ fontSize: ms(30), marginTop: vs(10) }}
                    >
                        {labels?.siliconBricks}
                    </ThemedText>
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ fontSize: ms(16), marginTop: vs(10) }}
                    >
                        {labels?.version} : 5.18.1
                    </ThemedText>
                    <ThemedText type="defaultSemiBold" style={{ fontSize: ms(16) }}>
                        Silicon Bricks
                    </ThemedText>
                    <ThemedText type="defaultSemiBold" style={{ fontSize: ms(16) }}>
                        Id : 2024.34560
                    </ThemedText>
                    <ThemedText type="defaultSemiBold" style={{ fontSize: ms(16) }}>
                        Date : 2024 Dec
                    </ThemedText>
                    <ThemedText style={{ fontSize: ms(16) }}>
                        Silicon bricks app
                    </ThemedText>
                    <ThemedText style={{ fontSize: ms(16), textAlign: 'center' }}>
                        {labels?.copyRight}
                    </ThemedText>
                </ThemedView>
                <ThemedView
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: ms(15),
                    }}
                >
                    <CustomButton
                        title={labels?.termsOfService}
                        onPress={() => { }}
                        style={{ backgroundColor: Colors[theme].middleContainerBg }}
                        titleStyle={{ textAlign: 'center' }}
                    />
                    <CustomButton
                        title={labels?.privacyPolicy}
                        onPress={() => { }}
                        style={{ backgroundColor: Colors[theme].middleContainerBg }}
                    />
                </ThemedView>
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
    service: {
        fontSize: ms(16),
        paddingVertical: ms(5),
        borderRadius: ms(16),
        textAlign: "center",
    },
});

export default AboutScreen;
