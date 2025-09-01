import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { FAB } from "@rneui/themed";
import { ms } from "react-native-size-matters";
import { ThemedText } from "@/components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatScreen = () => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    return(
        <CustomHeader
         title="Chat"
         leftComponent={(<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ padding: ms(10) }} />
            )}>
                <ThemedView>
                    <View>
                        <ThemedText>
                            Chat Screen
                        </ThemedText>
                    </View>
                </ThemedView>
                <FAB
                size="large"
                title="Create Chat"
                style={{
                    position: "absolute",
                    margin: 10,
                    right: 0,
                    bottom: insets.bottom,
                }}
                />
        </CustomHeader>
    );
};
export default ChatScreen;