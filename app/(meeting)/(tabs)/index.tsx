import {
  Pressable,
  View
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ScaledSheet } from 'react-native-size-matters';
import CustomHeader from "@/components/CustomHeader";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router/build/useNavigation";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { useQuery } from "@apollo/client";
import { GetMeetingDashboardDocument } from "@/graphql/generated";
import SmallCart from "@/components/vehicle/SmallCart";


const index = () => {
  // test
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GetMeetingDashboardDocument, {
    variables: {},
  });
  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;
  const userCount = data?.getMeetingDashboard || {};
  return (
    <CustomHeader>
      <ThemedView style={{ paddingTop: 0 }}>
        <ScrollView style={{ flexGrow: 1, paddingTop: 0 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Entypo name="menu" size={34} color={Colors[theme].text} />
            </Pressable>
            <ThemedText>Dashboard</ThemedText>
            <ThemedText></ThemedText>
          </View>
          <View style={styles.container}>
            <SmallCart icon={"account-voice"} label={`Active Meetings (${userCount.activeMeetings})`} onPress={() => { }} />
            <SmallCart icon={"account-voice"} label={`Total Meetings (${userCount.totalMeetings})`} onPress={() => { }} />
            <SmallCart icon={"account-voice"} label={`Today Meetings (${userCount.todayMeeting})`} onPress={() => { }} />
            <SmallCart icon={"account-voice"} label={`Upcoming Meetings (${userCount.upComingMeeting})`} onPress={() => { }} />
            <SmallCart icon={"account-voice"} label={`Complete Meetings (${userCount.completedMeeting})`} onPress={() => { }} />
            <SmallCart icon={"account-voice"} label={`Inactive Meetings (${userCount.inactiveMeetings})`} onPress={() => { }} />
            <SmallCart icon={"note"} label={`Ongoing Tasks (${userCount.ongoingTasks})`} onPress={() => { }} />
            <SmallCart icon={"note"} label={`Completed Tasks (${userCount.completedTasks})`} onPress={() => { }} />
            <SmallCart icon={"note"} label={`Total Tasks (${userCount.totalTasks})`} onPress={() => { }} />
            <SmallCart icon={"note"} label={`Incomplete Tasks (${userCount.inComingTasks})`} onPress={() => { }} />
          </View>
        </ScrollView>
      </ThemedView>
    </CustomHeader>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", // or 'space-between'
    paddingVertical: "16@vs", 
  },
  appBar: {
    fontSize: "18@ms",
    fontWeight: "500",

  },
  cardStyle: {
    backgroundColor: "#C9C9C9",
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5
  },
  cardTitle: {
    fontSize: "18@ms",
    fontWeight: '700'
  },
  cardSub: {
    fontSize: "18@ms",
    fontWeight: '700',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardHeading: {
    fontSize: "16@ms",
    fontWeight: "normal"
  },
});
export default index;