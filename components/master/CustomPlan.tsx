import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "../ThemedText";

interface CustomPlanProps {
  name: string;
  status: "active" | "inactive" | "pending" | "blocked" | "used" | "expired";
  price: number;
  discountedPrice: number;
  couponCode: string;
  duration: number;
  description: string;
  editPermission: boolean;
  statusPermission: boolean;
  deletePermission: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
}

const statusTextColorsOptions = {
  active: "success",
  inactive: "danger",
  used: "warning",
  expired: "blocked",
};

const CustomPlan: React.FC<CustomPlanProps> = ({
  name,
  status,
  price,
  discountedPrice,
  couponCode,
  duration,
  description,
  editPermission,
  statusPermission,
  deletePermission,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const { theme } = useTheme();
  console.log("price", price);
  console.log("dis price", discountedPrice);
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: Colors[theme].border,
          shadowColor: Colors[theme].shadow,
          backgroundColor: Colors[theme].cart,
        },
      ]}
    >
      <View style={{}}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 6,
            width: s(200),
          }}
        >
          <View>
            <ThemedText type="subtitle">{name}</ThemedText>
          </View>
          <View style={{}}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    Colors[theme]?.[statusTextColorsOptions[status]]?.bg,
                  borderColor:
                    Colors[theme]?.[statusTextColorsOptions[status]]?.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      Colors[theme]?.[statusTextColorsOptions[status]]?.text,
                  },
                ]}
              >
                {status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Details */}
        <View style={{ width: s(200) }}>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
            <ThemedText type="subtitle" style={{ fontSize: ms(18) }}>
              Coupon code:
            </ThemedText>{" "}
            {couponCode}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
            <ThemedText type="subtitle" style={{ fontSize: ms(18) }}>
              price:
            </ThemedText>{" "}
            {price}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
            <ThemedText type="subtitle" style={{ fontSize: ms(18) }}>
              Discounted Price:
            </ThemedText>{" "}
            {discountedPrice}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
            <ThemedText type="subtitle" style={{ fontSize: ms(18) }}>
              Duration:
            </ThemedText>{" "}
            {duration}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: 4 }}>
            <ThemedText type="subtitle" style={{ fontSize: ms(18) }}>
              Description:
            </ThemedText>{" "}
            {description}
          </ThemedText>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ gap: 20, marginTop: 15 }}>
        {editPermission && (
          <ActionButton
            icon={<Feather name="edit" size={ms(18)} color={Colors.white} />}
            text="Edit"
            bgColor="#3B82F6"
            onPress={onEdit}
          />
        )}
        {statusPermission && (
          <ActionButton
            icon={
              <MaterialIcons
                name="autorenew"
                size={ms(18)}
                color={Colors.white}
              />
            }
            bgColor="#8B5CF6"
            text="Status"
            onPress={onChangeStatus}
          />
        )}
        {deletePermission && (
          <ActionButton
            icon={
              <FontAwesome5 name="trash" size={ms(16)} color={Colors.white} />
            }
            bgColor="#EF4444"
            text="Delete"
            onPress={onDelete}
          />
        )}
      </View>
    </View>
  );
};

const ActionButton = ({
  icon,
  text,
  onPress,
  bgColor,
}: {
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: vs(8),
        paddingHorizontal: ms(12),
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.white,
        backgroundColor: bgColor,
        opacity: 0.8,
      }}
    >
      {icon}
      {/* <Text style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>{text}</Text> */}
    </TouchableOpacity>
  );
};

export default CustomPlan;

const styles = ScaledSheet.create({
  container: {
    borderRadius: "20@ms",
    marginHorizontal: "12@ms",
    marginVertical: "10@ms",
    padding: "16@ms",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
