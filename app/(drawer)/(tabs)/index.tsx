import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo,  MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { ScaledSheet } from 'react-native-size-matters';
import CustomHeader from "@/components/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { useQuery, gql } from "@apollo/client";

const DASHBOARD_COUNT_QUERY = gql`
  query DashboardCount($filters: ReportFilters!) {
    dashboardCount(filters: $filters) {
      userCount
      roleCount
      permissionCount
      assignedPermissionCount
      projectCount
      organizationCount
      couponCount
      offerCount
      moduleCount
      packageCount
      planCount
      subscriptionCount
      packageModuleCount
      subscriptionPlanCount
    }
  }
`;
const index = () => {

  const { loading, error, data } = useQuery(DASHBOARD_COUNT_QUERY, {
    variables: { filters: {} },
  });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;
  const userCount = data?.dashboardCount || 0;
  const navigation = useNavigation();
  const { theme } = useTheme();
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

          <LinearGradient
            colors={["#0a54c9", "#5087de"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>User</ThemedText>
                <View style={{ flexDirection: 'row', borderColor: "white", borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={20}
                    color="white"
                  />
                  <ThemedText style={{color :"white",fontSize : 16,fontWeight : "500"}}> 123</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardHeading}>{userCount.userCount}</ThemedText>
              <View style={{ flexDirection: 'row' }}>
                <ThemedText style={styles.cardSub}>Trending up this month </ThemedText>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={[ "#AA6097","#E06557"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Role</ThemedText>
                <View style={{ flexDirection: 'row', borderColor: "white", borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <MaterialCommunityIcons
                    name="arrow-bottom-right"
                    size={20}
                    color="white"
                  />
                  <ThemedText style={{color :"white",fontSize : 16,fontWeight : "500"}}> 123</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardHeading}>{userCount.roleCount}</ThemedText>
              <View style={{ flexDirection: 'row' }}>
                <ThemedText style={styles.cardSub}>Down 20% this period </ThemedText>
                <MaterialCommunityIcons
                  name="arrow-bottom-right"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#0a54c9", "#5087de"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Projects</ThemedText>
                <View style={{ flexDirection: 'row', borderColor: "white", borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={20}
                    color="white"
                  />
                  <ThemedText style={{color :"white",fontSize : 16,fontWeight : "500"}}> 123</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardHeading}>{userCount.projectCount}</ThemedText>
              <View style={{ flexDirection: 'row' }}>
                <ThemedText style={styles.cardSub}>Strong user retention </ThemedText>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#AA6097","#E06557"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Permission</ThemedText>
                <View style={{ flexDirection: 'row', borderColor: "white", borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={20}
                    color="white"
                  />
                  <ThemedText style={{color :"white",fontSize : 16,fontWeight : "500"}}> 123</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardHeading}>{userCount.permissionCount}</ThemedText>
              <View style={{ flexDirection: 'row' }}>
                <ThemedText style={styles.cardSub}>Strong user retention </ThemedText>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#0a54c9", "#5087de"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Organization</ThemedText>
                <View style={{ flexDirection: 'row', borderColor: "white", borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={20}
                    color="white"
                  />
                  <ThemedText style={{color :"white",fontSize : 16,fontWeight : "500"}}> 123</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardHeading}>{userCount.organizationCount}</ThemedText>
              <View style={{ flexDirection: 'row' }}>
                <ThemedText style={styles.cardSub}>Strong user retention </ThemedText>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#AA6097","#E06557"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>Assigned Permission</ThemedText>
                <View style={{ flexDirection: 'row', borderColor: "white", borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={20}
                    color="white"
                  />
                  <ThemedText style={{color :"white",fontSize : 16,fontWeight : "500"}}> 123</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.cardHeading}>{userCount.assignedPermissionCount}</ThemedText>
              <View style={{ flexDirection: 'row' }}>
                <ThemedText style={styles.cardSub}>Strong user retention </ThemedText>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>

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