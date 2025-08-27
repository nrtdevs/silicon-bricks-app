// import { ThemedText } from "@/components/ThemedText";
// import { Env } from "@/constants/ApiEndpoints";
// import { Colors } from "@/constants/Colors";
// import { useTheme } from "@/context/ThemeContext";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from 'expo-linear-gradient';
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useRef } from "react";
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { ScaledSheet, ms } from "react-native-size-matters";

// const { width } = Dimensions.get('window');

// const statusColors: Record<string, readonly [string, string]> = {
//   active: ["#10B981", "#059669"],
//   inactive: ["#EF4444", "#DC2626"],
//   pending: ["#FBBF24", "#F59E0B"],
// };

// const statusIcons: Record<string, "checkmark-circle" | "close-circle" | "time" | "help"> = {
//   active: "checkmark-circle",
//   inactive: "close-circle",
//   pending: "time",
// };

// const VehicleDetailsScreen = () => {
//   const { data } = useLocalSearchParams<any>();
//   const { theme } = useTheme();
//   const vehicleDetails = JSON.parse?.(data);
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const imageOpacity = scrollY.interpolate({
//     inputRange: [0, 250],
//     outputRange: [1, 0.3],
//     extrapolate: 'clamp',
//   });

//   const imageScale = scrollY.interpolate({
//     inputRange: [-100, 0, 100],
//     outputRange: [1.2, 1, 0.8],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
//       <Animated.View
//         style={[
//           styles.imageContainer,
//           {
//             opacity: imageOpacity,
//             transform: [{ scale: imageScale }]
//           }
//         ]}
//       >
//         <Image
//           source={{
//             uri: vehicleDetails?.avatar
//               ? `${Env?.SERVER_URL}${vehicleDetails?.avatar}`
//               : "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
//           }}
//           style={styles.image}
//         />
//         <LinearGradient
//           colors={['transparent', Colors[theme].background]}
//           style={styles.gradientOverlay}
//         />

//         <TouchableOpacity
//           style={[styles.backButton, { backgroundColor: Colors[theme].cart }]}
//           onPress={() => router.navigate({
//             pathname: "/(vehicle)/vehicle-list"
//           })}

//         >
//           <Ionicons name="arrow-back" size={ms(20)} color={Colors[theme].text} />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.ScrollView
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.content}>
//           {/* Header with status badge */}
//           <View style={styles.header}>
//             <View style={styles.titleContainer}>
//               <ThemedText type="title" style={styles.vehicleName}>
//                 {vehicleDetails?.make} {vehicleDetails?.model}
//               </ThemedText>
//               <ThemedText type="subtitle" style={styles.vehicleYear}>
//                 {vehicleDetails?.year}
//               </ThemedText>
//             </View>

//             <LinearGradient
//               colors={statusColors[vehicleDetails.status] || statusColors.pending}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.statusBadge}
//             >
//               <Ionicons
//                 name={statusIcons[vehicleDetails.status] || "help"}
//                 size={ms(12)}
//                 color={Colors.white}
//               />
//               <Text style={styles.statusText}>
//                 {vehicleDetails?.status?.toUpperCase()}
//               </Text>
//             </LinearGradient>
//           </View>

//           {/* License Plate */}
//           <View style={[styles.licensePlate, { backgroundColor: Colors[theme].cart }]}>
//             <FontAwesome5 name="certificate" size={ms(16)} color="#F59E0B" />
//             <ThemedText type="defaultSemiBold" style={styles.plateText}>
//               {vehicleDetails?.numberPlate}
//             </ThemedText>
//           </View>

//           {/* Info Cards */}
//           <View style={styles.infoCards}>
//             <InfoCard
//               icon="person"
//               title="Owner"
//               value="Admin"
//               theme={theme}
//             />
//             <InfoCard
//               icon="color-palette"
//               title="Color"
//               value={vehicleDetails?.color}
//               theme={theme}
//             />
//             <InfoCard
//               icon="document-text"
//               title="Chassis No"
//               value={vehicleDetails?.chassisNumber}
//               theme={theme}
//             />
//             <InfoCard
//               icon="calendar"
//               title="Registration"
//               value={new Date(vehicleDetails?.createdAt).toLocaleDateString()}
//               theme={theme}
//             />
//           </View>

//           {/* Insurance Section */}
//           <View style={[styles.insuranceCard, { backgroundColor: Colors[theme].cart }]}>
//             <View style={styles.insuranceHeader}>
//               <Ionicons name="shield-checkmark" size={ms(20)} color="#3B82F6" />
//               <ThemedText type="defaultSemiBold">Insurance</ThemedText>
//             </View>

//             <View style={styles.insuranceInfo}>
//               <InfoRow
//                 icon="checkmark-circle"
//                 label="Coverage"
//                 value={vehicleDetails?.insurance ? "Active" : "Not Insured"}
//                 theme={theme}
//               />
//               {vehicleDetails?.insurance && (
//                 <InfoRow
//                   icon="calendar"
//                   label="Expiry Date"
//                   value={vehicleDetails?.insuranceValidTill}
//                   theme={theme}
//                 />
//               )}
//             </View>
//           </View>
//         </View>
//       </Animated.ScrollView>
//     </View>
//   );
// };

// const InfoCard = ({ icon, title, value, theme }) => (
//   <View style={[styles.infoCard, { backgroundColor: Colors[theme].card }]}>
//     <View style={styles.infoCardHeader}>
//       <Ionicons name={icon} size={ms(16)} color={Colors[theme].text} />
//       <ThemedText type="defaultSemiBold" style={styles.infoCardTitle}>
//         {title}
//       </ThemedText>
//     </View>
//     <ThemedText type="default" style={styles.infoCardValue}>
//       {value}
//     </ThemedText>
//   </View>
// );

// const InfoRow = ({ icon, label, value, theme }) => (
//   <View style={styles.infoRow}>
//     <View style={styles.infoLabel}>
//       <Ionicons name={icon} size={ms(14)} color={Colors[theme].text} style={styles.infoRowIcon} />
//       <ThemedText type="default">{label}</ThemedText>
//     </View>
//     <ThemedText type="defaultSemiBold">{value}</ThemedText>
//   </View>
// );

// export default VehicleDetailsScreen;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingTop: width * 0.5,
//     paddingBottom: "24@vs",
//   },
//   imageContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: width * 0.7,
//     zIndex: 10,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '100@vs',
//   },
//   backButton: {
//     position: 'absolute',
//     top: "40@vs",
//     left: "16@ms",
//     width: "40@ms",
//     height: "40@ms",
//     borderRadius: "20@ms",
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   content: {
//     padding: "16@ms",
//     paddingTop: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: "16@vs",
//   },
//   titleContainer: {
//     flex: 1,
//   },
//   vehicleName: {
//     fontSize: "24@ms",
//     marginBottom: "4@vs",
//   },
//   vehicleYear: {
//     fontSize: "16@ms",
//     opacity: 0.7,
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: "12@ms",
//     paddingVertical: "6@vs",
//     borderRadius: "20@ms",
//     marginLeft: "10@ms",
//   },
//   statusText: {
//     color: Colors.white,
//     fontSize: "12@ms",
//     fontWeight: 'bold',
//     marginLeft: "4@ms",
//   },
//   licensePlate: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: "12@ms",
//     borderRadius: "12@ms",
//     marginBottom: "20@vs",
//   },
//   plateText: {
//     marginLeft: "8@ms",
//     fontSize: "16@ms",
//   },
//   infoCards: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: "20@vs",
//     gap: "12@ms",
//   },
//   infoCard: {
//     width: (width - 44) / 2,
//     padding: "12@ms",
//     borderRadius: "12@ms",
//     marginBottom: "12@vs",
//   },
//   infoCardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: "8@vs",
//   },
//   infoCardTitle: {
//     marginLeft: "8@ms",
//     fontSize: "12@ms",
//   },
//   infoCardValue: {
//     fontSize: "14@ms",
//   },
//   insuranceCard: {
//     padding: "16@ms",
//     borderRadius: "12@ms",
//     marginBottom: "20@vs",
//   },
//   insuranceHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: "12@vs",
//   },
//   insuranceInfo: {
//     gap: "10@vs",
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   infoLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   infoRowIcon: {
//     marginRight: "6@ms",
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: "12@ms",
//   },
//   actionButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: "12@vs",
//     paddingHorizontal: "16@ms",
//     borderRadius: "12@ms",
//     gap: "8@ms",
//   },
//   actionButtonText: {
//     color: Colors.white,
//     fontWeight: '600',
//     fontSize: "14@ms",
//   },
// });


import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";

const { width } = Dimensions.get('window');

const statusColors: Record<string, readonly [string, string]> = {
  active: ["#10B981", "#059669"],
  inactive: ["#EF4444", "#DC2626"],
  pending: ["#FBBF24", "#F59E0B"],
};

const statusIcons: Record<string, "checkmark-circle" | "close-circle" | "time" | "help"> = {
  active: "checkmark-circle",
  inactive: "close-circle",
  pending: "time",
};

const VehicleDetailsScreen = () => {
  const { data } = useLocalSearchParams<any>();
  const { theme } = useTheme();
  const vehicleDetails = JSON.parse?.(data);
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: imageOpacity,
            transform: [{ scale: imageScale }]
          }
        ]}
      >
        <Image
          source={{
            uri: vehicleDetails?.avatar
              ? `${Env?.SERVER_URL}${vehicleDetails?.avatar}`
              : "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
          }}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', Colors[theme].background]}
          style={styles.gradientOverlay}
        />

        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: Colors[theme].cart }]}
          onPress={() => router.navigate({
            pathname: "/(vehicle)/vehicle-list"
          })}

        >
          <Ionicons name="arrow-back" size={ms(20)} color={Colors[theme].text} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* Header with status badge */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.vehicleName}>
                {vehicleDetails?.make} {vehicleDetails?.model}
              </ThemedText>
              <ThemedText type="subtitle" style={styles.vehicleYear}>
                {vehicleDetails?.year}
              </ThemedText>
            </View>

            <LinearGradient
              colors={statusColors[vehicleDetails.status] || statusColors.pending}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statusBadge}
            >
              <Ionicons
                name={statusIcons[vehicleDetails.status] || "help"}
                size={ms(12)}
                color={Colors.white}
              />
              <Text style={styles.statusText}>
                {vehicleDetails?.status?.toUpperCase()}
              </Text>
            </LinearGradient>
          </View>

          {/* License Plate */}
          <View style={[styles.licensePlate, { backgroundColor: Colors[theme].cart }]}>
            <FontAwesome5 name="certificate" size={ms(16)} color="#F59E0B" />
            <ThemedText type="defaultSemiBold" style={styles.plateText}>
              {vehicleDetails?.numberPlate}
            </ThemedText>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <InfoCard
              icon="person"
              title="Owner"
              value="Admin"
              theme={theme}
            />
            <InfoCard
              icon="color-palette"
              title="Color"
              value={vehicleDetails?.color}
              theme={theme}
            />
            <InfoCard
              icon="document-text"
              title="Chassis No"
              value={vehicleDetails?.chassisNumber}
              theme={theme}
            />
            <InfoCard
              icon="calendar"
              title="Registration"
              value={new Date(vehicleDetails?.createdAt).toLocaleDateString()}
              theme={theme}
            />
          </View>

          {/* Insurance Section */}
          <View style={[styles.insuranceCard, { backgroundColor: Colors[theme].cart }]}>
            <View style={styles.insuranceHeader}>
              <Ionicons name="shield-checkmark" size={ms(20)} color="#3B82F6" />
              <ThemedText type="defaultSemiBold">Insurance</ThemedText>
            </View>

            <View style={styles.insuranceInfo}>
              <InfoRow 
                icon="checkmark-circle"
                label="Coverage"
                value={vehicleDetails?.insurance ? "Active" : "Not Insured"}
                theme={theme}
              />
              {vehicleDetails?.insurance && (
                <InfoRow 
                  icon="calendar"
                  label="Expiry Date"
                  value={vehicleDetails?.insuranceValidTill} 
                  theme={theme} 
                />
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const InfoCard = ({ icon, title, value, theme }) => (
  <View style={[styles.infoCard, { backgroundColor: Colors[theme].card }]}>
    <View style={styles.infoCardHeader}>
      <Ionicons name={icon} size={ms(16)} color={Colors[theme].text} />
      <ThemedText type="defaultSemiBold" style={styles.infoCardTitle}>
        {title}
      </ThemedText>
    </View>
    <ThemedText type="default" style={styles.infoCardValue}>
      {value}
    </ThemedText>
  </View>
);

const InfoRow = ({ icon, label, value, theme }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLabel}>
      <Ionicons name={icon} size={ms(14)} color={Colors[theme].text} style={styles.infoRowIcon} />
      <ThemedText type="default">{label}</ThemedText>
    </View>
    <ThemedText type="defaultSemiBold">{value}</ThemedText>
  </View>
);

export default VehicleDetailsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: width * 0.5,
    paddingBottom: "24@vs",
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: width * 0.7,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100@vs',
  },
  backButton: {
    position: 'absolute',
    top: "40@vs",
    left: "16@ms",
    width: "40@ms",
    height: "40@ms",
    borderRadius: "20@ms",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: "16@ms",
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: "16@vs",
  },
  titleContainer: {
    flex: 1,
  },
  vehicleName: {
    fontSize: "24@ms",
    marginBottom: "4@vs",
  },
  vehicleYear: {
    fontSize: "16@ms",
    opacity: 0.7,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "12@ms",
    paddingVertical: "6@vs",
    borderRadius: "20@ms",
    marginLeft: "10@ms",
  },
  statusText: {
    color: Colors.white,
    fontSize: "12@ms",
    fontWeight: 'bold',
    marginLeft: "4@ms",
  },
  licensePlate: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: "12@ms",
    borderRadius: "12@ms",
    marginBottom: "20@vs",
  },
  plateText: {
    marginLeft: "8@ms",
    fontSize: "16@ms",
  },
  infoCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: "20@vs",
    gap: "12@ms",
  },
  infoCard: {
    width: (width - 44) / 2,
    padding: "12@ms",
    borderRadius: "12@ms",
    marginBottom: "12@vs",
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: "8@vs",
  },
  infoCardTitle: {
    marginLeft: "8@ms",
    fontSize: "12@ms",
  },
  infoCardValue: {
    fontSize: "14@ms",
  },
  insuranceCard: {
    padding: "16@ms",
    borderRadius: "12@ms",
    marginBottom: "20@vs",
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: "12@vs",
  },
  insuranceInfo: {
    gap: "10@vs",
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRowIcon: {
    marginRight: "6@ms",
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: "12@ms",
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: "12@vs",
    paddingHorizontal: "16@ms",
    borderRadius: "12@ms",
    gap: "8@ms",
  },
  actionButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: "14@ms",
  },
});
