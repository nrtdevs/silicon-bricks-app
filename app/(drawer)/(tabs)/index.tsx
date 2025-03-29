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
import CustomHeader from "@/components/CustomHeader";

const index = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <CustomHeader
      leftComponent={
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Entypo name="menu" size={34} color={Colors[theme].text} />
        </TouchableOpacity>
      }
    >
      <ThemedView style={{ paddingTop: 0, flex: 1 }}>
        <ScrollView style={{ flexGrow: 1}}>
          <View>
          <View>
            <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
              User
            </ThemedText>
          </View>
          </View>
        </ScrollView>
      </ThemedView>
    </CustomHeader>
  );
};

export default index;
