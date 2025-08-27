import { ThemedText } from "@/components/ThemedText";
import { Env } from "@/constants/ApiEndpoints";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";

const { width, height } = Dimensions.get('window');

const statusColors: Record<string, readonly [string, string]> = {
  active: ["#10B981", "#059669"],
  inactive: ["#EF4444", "#DC2626"],
  pending: ["#F59E0B", "#D97706"],
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

  const headerHeight = Platform.OS === 'ios' ? height * 0.5 : height * 0.45;

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: `${Colors[theme].background}E6` }]}
        onPress={() => router.navigate({ pathname: "/(vehicle)/vehicle-list" })}
      >
        <Ionicons name="arrow-back" size={ms(20)} color={Colors[theme].text} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image */}
        <View
          style={[
            styles.imageContainer,
            {
              height: headerHeight,
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
            resizeMode="cover"
          />

          {/* Premium Gradient Overlays */}
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent']}
            style={[styles.gradientOverlay, { top: 0, height: 100 }]}
          />
          <LinearGradient
            colors={['transparent', Colors[theme].background]}
            style={[styles.gradientOverlay, { bottom: 0, height: 120 }]}
          />

        </View>

        <View
          style={[
            styles.content,
          ]}
        >
          <View>

            {/* Header Section */}
            <View style={styles.cardHeader}>
              <View style={styles.titleSection}>
                <ThemedText type="title" style={styles.vehicleName}>
                  {vehicleDetails?.make} {vehicleDetails?.model}
                </ThemedText>
                <View style={styles.subtitleRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText type="subtitle" style={styles.vehicleYear}>
                      {vehicleDetails?.year}
                    </ThemedText>
                    <View style={styles.separator} />
                    <ThemedText type="subtitle" style={styles.vehicleColor}>
                      {vehicleDetails?.color}
                    </ThemedText>
                  </View>
                  <View>
                    <LinearGradient
                      colors={statusColors[vehicleDetails.status] || statusColors.pending}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.statusBadge}
                    >
                      <Ionicons
                        name={statusIcons[vehicleDetails.status] || "help"}
                        size={ms(14)}
                        color={Colors.white}
                      />
                      <Text style={styles.statusText}>
                        {vehicleDetails?.status?.toUpperCase()}
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>

              {/* Premium Status Badge */}
              <View style={styles.statusContainer}>

              </View>
            </View>

            {/* License Plate - Premium Design */}
            <View style={[styles.licensePlateContainer, {
              backgroundColor: Colors[theme].cart,
              shadowColor: Colors[theme].text,
            }]}>
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.plateIcon}
              >
                <MaterialCommunityIcons name="card-bulleted" size={ms(20)} color={Colors.white} />
              </LinearGradient>
              <View style={styles.plateInfo}>
                <ThemedText type="default" style={styles.plateLabel}>
                  License Plate
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.plateNumber}>
                  {vehicleDetails?.numberPlate}
                </ThemedText>
              </View>
            </View>

            {/* Premium Info Grid */}
            <View style={styles.infoSection}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Vehicle Information
              </ThemedText>

              <View style={styles.infoGrid}>
                <PremiumInfoCard
                  icon="car-sport"
                  iconColor="#3B82F6"
                  title="Model"
                  value={vehicleDetails?.model}
                  theme={theme}
                />
                <PremiumInfoCard
                  icon="calendar"
                  iconColor="#10B981"
                  title="Year"
                  value={vehicleDetails?.year}
                  theme={theme}
                />

              </View>
            </View>

            {/* Technical Details Section */}
            <View style={styles.technicalSection}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Technical Details
              </ThemedText>

              <View style={[styles.technicalCard, {
                backgroundColor: Colors[theme].cart,
                shadowColor: Colors[theme].text,
              }]}>
                <TechnicalInfoRow
                  icon="construct"
                  label="Chassis Number"
                  value={vehicleDetails?.chassisNumber}
                  theme={theme}
                />
                <View style={[styles.divider, { backgroundColor: Colors[theme].background }]} />
                <TechnicalInfoRow
                  icon="shield-checkmark"
                  label="Insurance Valid Till"
                  value={vehicleDetails?.insuranceValidTill}
                  theme={theme}
                />
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const PremiumInfoCard = ({ icon, iconColor, title, value, theme }) => (
  <View style={[styles.premiumInfoCard, {
    backgroundColor: Colors[theme].cart,
    shadowColor: Colors[theme].text,
  }]}>
    <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
      <Ionicons name={icon} size={ms(20)} color={iconColor} />
    </View>
    <ThemedText type="default" style={styles.cardTitle}>
      {title}
    </ThemedText>
    <ThemedText type="defaultSemiBold" style={styles.cardValue}>
      {value || 'N/A'}
    </ThemedText>
  </View>
);

const TechnicalInfoRow = ({ icon, label, value, theme }) => (
  <View style={styles.technicalRow}>
    <View style={styles.technicalRowLeft}>
      <View style={[styles.technicalIcon, { backgroundColor: `${Colors[theme].text}10` }]}>
        <Ionicons name={icon} size={ms(16)} color={Colors[theme].text} />
      </View>
      <ThemedText type="default" style={styles.technicalLabel}>
        {label}
      </ThemedText>
    </View>
    <ThemedText type="defaultSemiBold" style={styles.technicalValue}>
      {value || 'N/A'}
    </ThemedText>
  </View>
);

export default VehicleDetailsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: "40@vs",
  },
  imageContainer: {
    padding: 1,
  },
  image: {
    width: width,
    height: '100%', 
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  floatingHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? "44@vs" : "24@vs",
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "20@ms",
    paddingVertical: "12@vs",
    zIndex: 20,
  },
  headerBackButton: {
    width: "40@ms",
    height: "40@ms",
    borderRadius: "20@ms",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: "16@ms",
  },
  headerAction: {
    width: "40@ms",
    height: "40@ms",
    borderRadius: "20@ms",
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? ms(50) : ms(30),
    left: ms(20),
    width: ms(44),
    height: ms(44),
    borderRadius: ms(22),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)', // ✅ premium glassy look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 30, // Ensure it's always on top
  },
  content: {
    paddingHorizontal: "20@ms",
  },
  cardHeader: {
    marginBottom: "24@vs",
  },
  titleSection: {
    marginBottom: "16@vs",
  },
  vehicleName: {
    marginTop: "20@ms",
    fontSize: "28@ms",
    fontWeight: '700',
    marginBottom: "8@vs",
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  vehicleYear: {
    fontSize: "16@ms",
    opacity: 0.7,
  },
  separator: {
    width: "4@ms",
    height: "4@ms",
    borderRadius: "2@ms",
    backgroundColor: 'rgba(107, 114, 128, 0.5)',
    marginHorizontal: "12@ms",
  },
  vehicleColor: {
    fontSize: "16@ms",
    opacity: 0.7,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(14),
    paddingVertical: ms(6),
    borderRadius: ms(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  statusText: {
    color: Colors.white,
    fontSize: "12@ms",
    fontWeight: '700',
    marginLeft: "6@ms",
    letterSpacing: 0.5,
  },
  licensePlateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: "20@ms",
    borderRadius: "16@ms",
    marginBottom: "28@vs",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  plateIcon: {
    width: "48@ms",
    height: "48@ms",
    borderRadius: "24@ms",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: "16@ms",
  },
  plateInfo: {
    flex: 1,
  },
  plateLabel: {
    fontSize: "12@ms",
    opacity: 0.6,
    marginBottom: "4@vs",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  plateNumber: {
    fontSize: "18@ms",
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: "28@vs",
  },
  sectionTitle: {
    fontSize: "18@ms",
    fontWeight: '600',
    marginBottom: "16@vs",
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  premiumInfoCard: {
    flexBasis: '48%',   // ✅ responsive 2-column layout
    marginBottom: ms(16),
    padding: ms(20),
    borderRadius: ms(16),
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: "48@ms",
    height: "48@ms",
    borderRadius: "24@ms",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "12@vs",
  },
  cardTitle: {
    fontSize: "12@ms",
    opacity: 0.6,
    marginBottom: "4@vs",
    textAlign: 'center',
  },
  cardValue: {
    fontSize: "16@ms",
    textAlign: 'center',
  },
  technicalSection: {
    marginBottom: "28@vs",
  },
  technicalCard: {
    borderRadius: "16@ms",
    padding: "20@ms",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  technicalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: "12@vs",
  },
  technicalRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  technicalIcon: {
    width: "32@ms",
    height: "32@ms",
    borderRadius: "16@ms",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: "12@ms",
  },
  technicalLabel: {
    fontSize: "14@ms",
    flex: 1,
  },
  technicalValue: {
    fontSize: "14@ms",
    textAlign: 'right',
    marginLeft: "16@ms",
  },
  divider: {
    height: 1,
    marginVertical: "8@vs",
    opacity: 0.1,
  },
});
