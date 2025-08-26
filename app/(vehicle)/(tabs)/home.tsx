// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import SmallCart from "@/components/vehicle/SmallCart";
// import { ScaledSheet } from "react-native-size-matters";
// import { router } from "expo-router";
// import { ThemedView } from "@/components/ThemedView";

// const home = () => {
//   return (
//     <ThemedView style={styles.container}>
//       <SmallCart icon={"car"} label={"Vehicle"} onPress={() => { router.navigate('/vehicle-list') }} />
//       <SmallCart icon={"hammer"} label={"Vehicle Breakdown"} onPress={() => router.navigate("/vehicle-breakdown-list")} />
//       <SmallCart icon={"wallet-outline"} label={"Vehicle Expense"} onPress={() => router.navigate("/vehicle-expense")} />
//       <SmallCart icon={"timelapse"} label={"Activity Logs"} onPress={() => router.navigate("/activity-log")} />
//       <SmallCart icon={"hammer"} label={"Service Center"} onPress={() => router.navigate("/service-center")} />
//     </ThemedView>
//   );
// };

// export default home;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-around", // or 'space-between'
//     paddingVertical: "16@vs",
//   },
// });


import {
  Dimensions,
  Pressable,
  View
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ms, ScaledSheet } from 'react-native-size-matters';
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

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = (width - CARD_GAP * 3) / 2;
const home = () => {
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
    <CustomHeader
      title="Dashboard" leftComponent={
        <Pressable
          style={{ padding: ms(10) }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Entypo name="menu" size={34} color={Colors[theme].text} />
        </Pressable>
      }>
      <ThemedView style={{ paddingTop: 0 }}>
        <ScrollView style={{ flexGrow: 1, paddingTop: 0 }}>
          <View style={styles.container}>
            <View style={styles.cardsContainer}>
              <View style={[styles.card, {
                borderColor: Colors[theme].border,
                shadowColor: Colors[theme].shadow,
                backgroundColor: Colors[theme].cart
              }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: '#dbd9d3' }]}>
                    <Feather name='home' size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.trendContainer}>
                    <ThemedText style={styles.cardCount}>{userCount.activeMeetings}</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.cardName}>Active Meetings</ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </CustomHeader>
  );
};

export default home;

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
  cardCount: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardName: {
    fontSize: "13@ms",
    fontWeight: '500',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  section: {
    width: '100%',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'space-between',

  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
});
