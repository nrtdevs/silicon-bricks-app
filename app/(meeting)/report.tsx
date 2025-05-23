import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";

const ReportScreen = () => {
    const { theme } = useTheme();
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={ms(20)}
                        color={Colors[theme]?.text}
                        onPress={() => router.back()}
                        style={{ left: 10 }} />
                    <ThemedText style={{ fontSize: 20, fontWeight: "600", right: 10 }}>Report </ThemedText>
                </View>
                <View style={[
                    styles.reportContainer,
                    {
                        borderColor: Colors[theme].border,
                        shadowColor: Colors[theme].shadow,
                        backgroundColor: Colors[theme].cart
                    },
                ]}>
                    <ThemedText type='subtitle'>title</ThemedText>
                    <ThemedText type='defaultSemiBold'>sub title</ThemedText>
                    <ThemedText type='defaultSemiBold'>sub title</ThemedText>
                </View>
            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        padding: "12@ms",
    },
    reportContainer: {
        borderRadius: "20@ms",
        marginHorizontal: "10@ms",
        marginVertical: "8@ms",
        padding: "16@ms",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        justifyContent: 'space-between',
        gap: 10,
    },
});
export default ReportScreen;