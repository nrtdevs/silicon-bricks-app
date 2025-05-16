import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Env } from "@/constants/ApiEndpoints";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { DeleteVehicleDocument } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import Loader from "@/components/ui/Loader";
 

const statusColors: Record<string, string> = {
  active: "#10B981",
  inactive: "#EF4444",
  pending: "#FBBF24",
};

const vehicle = {
     imageUrl: "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",

};

const VehicleDetailsScreen = () => {
  const { data } = useLocalSearchParams<any>();
  const { theme } = useTheme();
  const vehicleDetails = JSON.parse?.(data);
  const [deleteVehicleApi, deleteVehicleStat] = useMutation(
    DeleteVehicleDocument,
    {
      onCompleted: (data) => {
        router.back();
      },
      onError: (error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      },
    }
  );

  if (deleteVehicleStat.loading) return <Loader />;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      <Image
        source={{
          uri: vehicleDetails?.avatar
            ? `${Env?.SERVER_URL}${vehicleDetails?.avatar}`
            : vehicle.imageUrl,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>
            {vehicleDetails?.make} {vehicleDetails?.model}
          </Text>
          <Text
            style={[
              styles.status,
              { backgroundColor: statusColors[vehicleDetails.status] },
            ]}
          >
            {vehicleDetails?.status?.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.subTitle}>
          Vehicle No: {vehicleDetails?.numberPlate}
        </Text>

        <View style={styles.infoGroup}>
          <InfoRow label="Owner Name" value={"Admin"} />
          <InfoRow label="Chassis No." value={vehicleDetails?.chassisNumber} />
          <InfoRow label="Model Year" value={vehicleDetails?.year} />
          <InfoRow label="Color" value={vehicleDetails?.color} />
          <InfoRow label="Reg. Date" value={vehicleDetails?.createdAt} />
          <InfoRow
            label="Insurance"
            value={vehicleDetails?.insurance ? "Yes" : "No"}
          />
          {vehicleDetails?.insurance && (
            <InfoRow
              label="Insurance Expiry"
              value={vehicleDetails?.insuranceValidTill}
            />
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#3B82F6" }]}
            onPress={() => {
              router.navigate({
                pathname: "/add-edit-vehicle",
                params: { data: data },
              });
            }}
          >
            <Feather name="edit-2" size={18} color="#fff" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#EF4444" }]}
            onPress={() => {
              deleteVehicleApi({
                variables: {
                  deleteVehicleId: Number(vehicleDetails?.id),
                },
              });
            }}
          >
            <MaterialIcons name="delete" size={20} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default VehicleDetailsScreen;

const styles = ScaledSheet.create({
  container: {
    paddingBottom: "24@vs",
  },
  image: {
    width: "100%",
    height: "220@vs",
  },
  content: {
    padding: "16@ms",
    backgroundColor: Colors.white,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    color: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subTitle: {
    fontSize: "14@ms",
    color: "#6B7280",
    marginTop: 6,
  },
  infoGroup: {
    marginTop: "20@vs",
    gap: "14@ms",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: "14@ms",
    color: "#6B7280",
  },
  value: {
    fontSize: "14@ms",
    fontWeight: "500",
    color: "#111827",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "30@vs",
  },
  button: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
  },
});
