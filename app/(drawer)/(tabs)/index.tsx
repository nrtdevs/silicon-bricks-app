import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { ScaledSheet } from 'react-native-size-matters';
import CustomHeader from "@/components/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { DashboardCountDocument } from "@/graphql/generated";
import * as SecureStore from "expo-secure-store";

const index = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [fetchDashboardData, { loading, error, data }] = useLazyQuery(DashboardCountDocument);

  useEffect(() => {
    fetchDashboardData({
      variables: {
        filters: {},
      },
      fetchPolicy: 'network-only',
    });
  }, []);

  // console.log('Dashboard Data:', error);

  // if (loading) return <ThemedText>Loading...</ThemedText>;
  // if (error) return <ThemedText>Error: {error.message}</ThemedText>; jkj
  const userCount = data?.dashboardCount || {};

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
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Entypo name="menu" size={34} color={Colors[theme].text} />
            </TouchableOpacity>
            <Text style={styles.appBar}>Dashboard</Text>
          </View>
          <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <ThemedText style={styles.cardTitle}>User</ThemedText>
              <ThemedText style={styles.cardHeading}>{userCount.userCount}</ThemedText>
            </View>
          </View>
          <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
            <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Role</ThemedText>
                <ThemedText style={styles.cardHeading}>{userCount.roleCount}</ThemedText>
              </View>
            </View>
            <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Projects</ThemedText>
                <ThemedText style={styles.cardHeading}>{userCount.projectCount}</ThemedText>
              </View>
            </View>
            <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Permission</ThemedText>
                <ThemedText style={styles.cardHeading}>{userCount.permissionCount}</ThemedText>
              </View>
            </View>
            <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Organization</ThemedText>
                <ThemedText style={styles.cardHeading}>{userCount.organizationCount}</ThemedText>
              </View>
            </View>
            <View style={[styles.cardStyle, { backgroundColor: Colors[theme].cart }]}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Assigned Permission</ThemedText>
                <ThemedText style={styles.cardHeading}>{userCount.assignedPermissionCount}</ThemedText>
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
    color: "black"
  },
  cardStyle: {
    backgroundColor: "#C9C9C9",
    borderRadius: '12@ms',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5
  },
  cardTitle: {
    fontWeight: '500'
  },
  cardHeading: {
    fontWeight: "bold"
  },
  cardSub: {
    fontSize: "14@ms",
    color: "white",
    fontWeight: "400"
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 5,
  },
});
export default index;