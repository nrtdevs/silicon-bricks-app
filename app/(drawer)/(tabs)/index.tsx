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
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ScaledSheet } from "react-native-size-matters";

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

const styles = ScaledSheet.create({
  appBar: {
    fontSize: "18@ms",
    fontWeight: "500",
    color: "black"
  },
  cardTitle: {
    fontSize: "16@ms",
    color: "white",
    fontWeight: '500'
  },
  cardHeading: {
    fontSize: "22@ms",
    color: 'white',
    fontWeight: "bold"
  },
  cardSub: {
    fontSize: "14@ms",
    color: "white",
    fontWeight: "400"
  },
  cardStyle: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 5,
  },
});
export default index;