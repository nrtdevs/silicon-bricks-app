import { View, Pressable } from "react-native";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ScaledSheet } from "react-native-size-matters";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

const PermissionScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { theme } = useTheme();
    return (
        <CustomHeader>
            <ThemedView>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder={labels?.searchTeam}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />

                    </View>
                    <Pressable
                        style={styles.buttonContainer}
                        // onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
                    >
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    searchContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12@ms",
    },
    buttonContainer: {},
    organizationParentContainer: {
        marginTop: "12@ms",
    },
});
export default PermissionScreen;