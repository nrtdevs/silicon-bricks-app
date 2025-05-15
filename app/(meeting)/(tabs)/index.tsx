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

const index = () => {
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
            <ThemedText >Dashboard</ThemedText>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>AM</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Active Meetings</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.activeMeetings}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#ab7f59" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>TM</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Total Meetings</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.totalMeetings}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#956fc9" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>TM</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Today Meetings</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.totalMeetings}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>UM</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Upcoming Meeting</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.upComingMeeting}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#ab7f59" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>CM</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Complete Meetings</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.upComingMeeting}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#956fc9" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>IM</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Inactive Meetings</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.inactiveMeetings}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>OT</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Ongoing Task</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.ongoingTasks}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#ab7f59" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>CT</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Completed Task</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.completedTasks}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#956fc9" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>TT</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Total Task</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.totalTasks}</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.cardStyle, { backgroundColor: "#5b79ab" }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ borderRadius: "100%", backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={styles.cardHeading}>IT</ThemedText>
              </View>
              <View >
                <ThemedText style={styles.cardTitle}>Incomplete Task</ThemedText>
                <ThemedText style={styles.cardSub}>{userCount.inComingTasks}</ThemedText>
              </View>
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