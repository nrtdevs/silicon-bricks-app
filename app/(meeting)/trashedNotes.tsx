import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const TrashedNotePad = () => {
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
                    <ThemedText style={{ fontSize: 20, fontWeight: "600", right: 10, }}>Trashed Notes</ThemedText>
                    <ThemedText></ThemedText>
                </View>
                <View style={[
                    styles.trashedContainer,
                    {
                        borderColor: Colors[theme].border,
                        shadowColor: Colors[theme].shadow,
                        backgroundColor: Colors[theme].cart
                    },
                ]}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                        <ThemedText type='subtitle'>title</ThemedText>
                        {/* <View
                                    style={{
                                        backgroundColor: item.status == "active" ? "#10B981" : item.status == "completed" ? "#F59E0B" : "#EF4444",
                                        paddingHorizontal: ms(10),
                                        padding: vs(2),
                                        borderRadius: ms(14),
                                    }}
                                >
                                    <ThemedText style={{ fontSize: ms(10), color: Colors.white, fontWeight: 'bold' }} type='default'>{item.status.toUpperCase()}</ThemedText>
                                </View> */}
                    </View>
                    <View style={{ gap: 20, flexDirection: 'row', marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    "Restore",
                                    `note will be restored`,
                                    [
                                        {
                                            text: "Yes", onPress: () => {
                                                // restoreMeeting({
                                                //     variables: {
                                                //         ids: Number(item?.id),
                                                //     }
                                                // });
                                            }
                                        },
                                        { text: "No", onPress: () => { } },
                                    ]
                                );
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: vs(8),
                                paddingHorizontal: ms(12),
                                borderRadius: 10,
                                backgroundColor: "#8B5CF6",
                                opacity: 0.8
                            }}
                        >
                            <MaterialIcons name="autorenew" size={18} color='#fff' />
                            <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Restore</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    "Delete",
                                    "Are you sure you want to delete?",
                                    [
                                        {
                                            text: "Yes", onPress: () => {
                                                // deleteMeetingTask({
                                                //     variables: {
                                                //         ids: Number(item?.id),
                                                //     }
                                                // });
                                            }
                                        },
                                        { text: "No", onPress: () => { } },
                                    ]
                                );
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: vs(8),
                                paddingHorizontal: ms(12),
                                borderRadius: 10,
                                backgroundColor: "#EF4444",
                                opacity: 0.8
                            }}
                        >
                            <FontAwesome5 name="trash" size={14} color="#fff" />
                            <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Delete</ThemedText>
                        </TouchableOpacity>
                    </View>
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
    trashedContainer: {
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
export default TrashedNotePad;