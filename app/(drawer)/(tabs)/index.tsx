import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react"; 
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const index = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <ThemedView style={{ paddingTop: 0, flex: 1 }}>
      <ScrollView style={{ flex: 1, paddingTop: 50 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Entypo name="menu" size={34} color={Colors[theme].text} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default index;
