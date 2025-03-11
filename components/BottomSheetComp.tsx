import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";
import { labels } from "@/constants/Labels";
import { Colors } from "@/constants/Colors";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import coupon from "@/app/(checkout)/coupon";
const BottomSheetComp = ({ coupon }: any) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <BottomSheetView style={[styles.contentContainer, {}]}>
      <View>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: ms(10),
            backgroundColor: Colors[theme].cartBg,
            padding: ms(10),
            borderRadius: ms(10),
          }}
        >
          <ThemedText type="subtitle" style={{ marginBottom: ms(10) }}>
            {labels?.orderSummary}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.orderSummary}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $229.0 / month
            </ThemedText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.plan}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $1523 / month
            </ThemedText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.dailyBackup}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $1523.00
            </ThemedText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.domainName}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $122.00
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
              borderBottomWidth: ms(1),
              borderBottomColor: Colors.gray,
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.setup}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $122.00
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.subTotal}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $1523 / month
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.tax}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $1523.oo
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            {
              coupon && <View style={{ flexDirection: "row", width:'100%', justifyContent:'space-between', alignItems: "center" }}>
                <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
                  {labels.coupon}
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
                  $23.oo
                </ThemedText>
              </View>
            }
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginTop: ms(5),
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              {labels.total}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={{ fontSize: ms(14) }}>
              $122.00
            </ThemedText>
          </View>
        </View>
        <CustomButton
          titleStyle={{ color: Colors?.white }}
          isLoading={loading}
          title={labels?.payInWallet}
          onPress={() => {
            router.push("/confirm");
          }}
          isGradient
        />
      </View>
    </BottomSheetView>
  );
};

export default BottomSheetComp;

const styles = ScaledSheet.create({
  contentContainer: {
    paddingHorizontal: "12@ms",
    paddingVertical: "12@ms",
    borderTopLeftRadius: "12@ms",
    borderTopRightRadius: "12@ms",
  },
});
