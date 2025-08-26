import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { GetMeetingDashboardDocument } from "@/graphql/generated";
import { useQuery } from "@apollo/client";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router/build/useNavigation";
import React from "react";
import {
  Dimensions,
  Pressable,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ms, ScaledSheet } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const CARD_GAP = ms(16);
const CARD_WIDTH = (width - CARD_GAP * 3) / 2;

const home = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GetMeetingDashboardDocument, {
    variables: {},
  });

  if (loading) return <ThemedText style={styles.loadingText}>Loading...</ThemedText>;
  if (error) return <ThemedText style={styles.errorText}>Error: {error.message}</ThemedText>;

  const dashboardData = data?.getMeetingDashboard || {};

  const cards = [
    {
      name: "Active Meetings",
      count: dashboardData.activeMeetings || 0,
      icon: "calendar-check",
      iconColor: "#3B82F6",
      bgColor: '#DBEAFE',
    },
    {
      name: "Upcoming Meetings",
      count: dashboardData.upComingMeeting || 0,
      icon: "calendar-clock",
      iconColor: "#F59E0B",
      bgColor: '#FEF3C7',
    },
    {
      name: "Total Tasks",
      count: dashboardData.totalTasks || 0,
      icon: "clipboard-text-multiple",
      iconColor: "#10B981",
      bgColor: '#D1FAE5',
    },
    {
      name: "Incoming Tasks",
      count: dashboardData.inComingTasks || 0,
      icon: "clipboard-arrow-left",
      iconColor: "#EF4444",
      bgColor: '#FEE2E2',
    },
  ];

  return (
    <CustomHeader
      title="Dashboard"
      leftComponent={
        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Entypo name="menu" size={ms(28)} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
              <View
                key={index}
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
                  <View style={[styles.iconContainer, { backgroundColor: card.bgColor }]}>
                    <MaterialCommunityIcons name={card.icon as any} size={ms(20)} color={card.iconColor} />
                  </View>
                  <ThemedText style={styles.cardCount}>{card.count}</ThemedText>
                </View>
                <ThemedText style={styles.cardName}>{card.name}</ThemedText>
              </View>
            ))}
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
    paddingHorizontal: CARD_GAP,
    paddingTop: ms(10),
  },
  scrollViewContent: {
    paddingBottom: ms(20),
  },
  menuButton: {
    padding: ms(10),
  },
  loadingText: {
    textAlign: 'center',
    marginTop: ms(20),
    fontSize: ms(16),
  },
  errorText: {
    textAlign: 'center',
    marginTop: ms(20),
    fontSize: ms(16),
    color: 'red',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: ms(10),
  },
  card: {
    width: CARD_WIDTH,
    padding: ms(16),
    borderRadius: ms(12),
    marginVertical: ms(8),
    shadowOffset: { width: 0, height: ms(4) },
    shadowOpacity: 0.1,
    shadowRadius: ms(6),
    elevation: ms(5),
    borderWidth: 1,
    justifyContent: 'space-between',
    gap: ms(10),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  iconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: ms(22),
    fontWeight: '700',
  },
  cardName: {
    fontSize: ms(14),
    fontWeight: '500',
    marginTop: ms(5),
  },
  // Removed unused styles to clean up
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
