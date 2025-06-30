// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect } from "react";
// import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useTheme } from "@/context/ThemeContext";
// import { Colors } from "@/constants/Colors";
// import { ThemedView } from "@/components/ThemedView";
// import { useNavigation, DrawerActions } from "@react-navigation/native";
// import { ScaledSheet } from 'react-native-size-matters';
// import CustomHeader from "@/components/CustomHeader";
// import { LinearGradient } from "expo-linear-gradient";
// import { ThemedText } from "@/components/ThemedText";
// import { useQuery, gql, useLazyQuery } from "@apollo/client";
// import { DashboardCountDocument } from "@/graphql/generated";
// import * as SecureStore from "expo-secure-store";

// const index = () => {
//   const navigation = useNavigation();
//   const { theme } = useTheme();
//   const [fetchDashboardData, { loading, error, data }] = useLazyQuery(DashboardCountDocument);

//   useEffect(() => {
//     fetchDashboardData({
//       variables: {
//         filters: {},
//       },
//       fetchPolicy: 'network-only',
//     });
//   }, []);

//   // console.log('Dashboard Data:', error);

//   // if (loading) return <ThemedText>Loading...</ThemedText>;
//   // if (error) return <ThemedText>Error: {error.message}</ThemedText>; jkj
//   const userCount = data?.dashboardCount || {};

//   return (
//     <CustomHeader>
//       <ThemedView style={{ paddingTop: 0 }}>
//         <ScrollView style={{ flexGrow: 1, paddingTop: 0 }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 15,
//               paddingVertical: 10,
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//             >
//               <Entypo name="menu" size={34} color={Colors[theme].text} />
//             </TouchableOpacity>
//             <Text style={styles.appBar}>Dashboard</Text>
//           </View>
//           <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//             <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//               <ThemedText style={styles.cardTitle}>User</ThemedText>
//               <ThemedText style={styles.cardHeading}>{userCount.userCount}</ThemedText>
//             </View>
//           </View>
//           <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//             <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//               <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                 <ThemedText style={styles.cardTitle}>Role</ThemedText>
//                 <ThemedText style={styles.cardHeading}>{userCount.roleCount}</ThemedText>
//               </View>
//             </View>
//             <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//               <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                 <ThemedText style={styles.cardTitle}>Projects</ThemedText>
//                 <ThemedText style={styles.cardHeading}>{userCount.projectCount}</ThemedText>
//               </View>
//             </View>
//             <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//               <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                 <ThemedText style={styles.cardTitle}>Permission</ThemedText>
//                 <ThemedText style={styles.cardHeading}>{userCount.permissionCount}</ThemedText>
//               </View>
//             </View>
//             <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//               <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                 <ThemedText style={styles.cardTitle}>Organization</ThemedText>
//                 <ThemedText style={styles.cardHeading}>{userCount.organizationCount}</ThemedText>
//               </View>
//             </View>
//             <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
//               <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
//                 <ThemedText style={styles.cardTitle}>Assigned Permission</ThemedText>
//                 <ThemedText style={styles.cardHeading}>{userCount.assignedPermissionCount}</ThemedText>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </ThemedView>
//     </CustomHeader>
//   );
// };

// const styles = ScaledSheet.create({
//   appBar: {
//     fontSize: "18@ms",
//     fontWeight: "500",
//     color: "black"
//   },
//   cardStyle: {
//     backgroundColor: "#C9C9C9",
//     borderRadius: '12@ms',
//     padding: 15,
//     marginHorizontal: 15,
//     marginVertical: 5
//   },
//   cardTitle: {
//     fontWeight: '500'
//   },
//   cardHeading: {
//     fontWeight: "bold"
//   },
//   cardSub: {
//     fontSize: "14@ms",
//     color: "white",
//     fontWeight: "400"
//   },
//   card: {
//     marginHorizontal: 10,
//     marginVertical: 10,
//     borderRadius: 10,
//     padding: 5,
//   },
// });
// export default index;

import { Dimensions, Pressable, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ms, ScaledSheet } from "react-native-size-matters";
import CustomHeader from "@/components/CustomHeader";
import { Entypo, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router/build/useNavigation";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { useQuery } from "@apollo/client";
import { GetMeetingDashboardDocument } from "@/graphql/generated";
import SmallCart from "@/components/vehicle/SmallCart";

const { width } = Dimensions.get("window");
const CARD_GAP = 16;
const CARD_WIDTH = (width - CARD_GAP * 3) / 2;
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

  const cardData = [
    {
      id: "1",
      name: "Users",
      count: "1,245",
      icon: "users",
      trend: "up",
      change: "12%",
    },
    {
      id: "2",
      name: "Orders",
      count: "89",
      icon: "shopping-cart",
      trend: "down",
      change: "5%",
    },
    {
      id: "3",
      name: "Revenue",
      count: "$8,540",
      icon: "dollar-sign",
      trend: "up",
      change: "24%",
    },
    {
      id: "4",
      name: "Tasks",
      count: "7",
      icon: "check-circle",
      trend: "steady",
    },
  ];
  return (
    <CustomHeader
      title="Dashboard"
      leftComponent={
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ padding: ms(10) }}
        >
          <Entypo name="menu" size={34} color={Colors[theme].text} />
        </Pressable>
      }
    >
        <ScrollView style={{ flexGrow: 1, paddingTop: 0, paddingBottom:20}}>
          <View style={styles.container}>
            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#dbd9d3" },
                    ]}
                  >
                    <Feather name="home" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>
                      {userCount.activeMeetings}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>Active Meetings</ThemedText>
              </View>
            </View>

            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#dbd9d3" },
                    ]}
                  >
                    <Feather name="home" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>
                      {userCount.totalMeetings}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>Total Meetings</ThemedText>
              </View>
            </View>
            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#dbd9d3" },
                    ]}
                  >
                    <Feather name="home" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>
                      {userCount.todayMeeting}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>Today Meetings</ThemedText>
              </View>
            </View>
            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#dbd9d3" },
                    ]}
                  >
                    <Feather name="home" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>
                      {userCount.upComingMeeting}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>
                  Upcoming Meetings
                </ThemedText>
              </View>
            </View>
            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#dbd9d3" },
                    ]}
                  >
                    <Feather name="home" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>
                      {userCount.completedMeeting}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>
                  Complete Meetings
                </ThemedText>
              </View>
            </View>
            <View style={styles.cardsContainer}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "#dbd9d3" },
                    ]}
                  >
                    <Feather name="home" size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>
                      {userCount.inactiveMeetings}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>
                  Inactive Meetings
                </ThemedText>
              </View>
            </View>
            {/* Recent Activity */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText>Upcoming Activity</ThemedText>
                <ThemedText></ThemedText>
              </View>
              <View
                style={[
                  styles.activitiesContainer,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.activityItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={[
                        styles.activityIcon,
                        { backgroundColor: "#dbd9d3" },
                      ]}
                    >
                      <Feather name="home" size={16} color="#3B82F6" />
                    </View>
                    <ThemedText>Total Tasks</ThemedText>
                  </View>
                  <ThemedText>{userCount.totalTasks}</ThemedText>
                </View>
              </View>
              <View
                style={[
                  styles.activitiesContainer,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.activityItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={[
                        styles.activityIcon,
                        { backgroundColor: "#dbd9d3" },
                      ]}
                    >
                      <Feather name="home" size={16} color="#3B82F6" />
                    </View>
                    <ThemedText>Incomplete Tasks</ThemedText>
                  </View>
                  <ThemedText>{userCount.inComingTasks}</ThemedText>
                </View>
              </View>
              <View
                style={[
                  styles.activitiesContainer,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.activityItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={[
                        styles.activityIcon,
                        { backgroundColor: "#dbd9d3" },
                      ]}
                    >
                      <Feather name="home" size={16} color="#3B82F6" />
                    </View>
                    <ThemedText>Completed Tasks</ThemedText>
                  </View>
                  <ThemedText>{userCount.completedTasks}</ThemedText>
                </View>
              </View>
              <View
                style={[
                  styles.activitiesContainer,
                  {
                    borderColor: Colors[theme].border,
                    shadowColor: Colors[theme].shadow,
                    backgroundColor: Colors[theme].cart,
                  },
                ]}
              >
                <View style={styles.activityItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={[
                        styles.activityIcon,
                        { backgroundColor: "#dbd9d3" },
                      ]}
                    >
                      <Feather name="home" size={16} color="#3B82F6" />
                    </View>
                    <ThemedText>Ongoing Tasks</ThemedText>
                  </View>
                  <ThemedText>{userCount.ongoingTasks}</ThemedText>
                </View>
              </View>
            </View>

            {/* <SmallCart icon={"account-voice"} label={`Active Meetings (${userCount.activeMeetings})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"account-voice"} label={`Total Meetings (${userCount.totalMeetings})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"account-voice"} label={`Today Meetings (${userCount.todayMeeting})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"account-voice"} label={`Upcoming Meetings (${userCount.upComingMeeting})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"account-voice"} label={`Complete Meetings (${userCount.completedMeeting})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"account-voice"} label={`Inactive Meetings (${userCount.inactiveMeetings})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"note"} label={`Ongoing Tasks (${userCount.ongoingTasks})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"note"} label={`Completed Tasks (${userCount.completedTasks})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"note"} label={`Total Tasks (${userCount.totalTasks})`} onPress={() => { }} /> */}
            {/* <SmallCart icon={"note"} label={`Incomplete Tasks (${userCount.inComingTasks})`} onPress={() => { }} /> */}
          </View>
        </ScrollView>
    </CustomHeader>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "16@vs",
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
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: "18@ms",
    fontWeight: "700",
  },
  cardSub: {
    fontSize: "18@ms",
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardHeading: {
    fontSize: "16@ms",
    fontWeight: "normal",
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardName: {
    fontSize: "13@ms",
    fontWeight: "500",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  card: {
    width: CARD_WIDTH,
    padding: "16@ms",
    borderRadius: "20@ms",
    marginVertical: "5@ms",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    justifyContent: "space-between",
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  section: {
    width: "100%",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  activitiesContainer: {
    borderRadius: "20@ms",
    paddingHorizontal: "20@ms",
    marginVertical: "8@ms",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    justifyContent: "space-between",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
});
export default index;
