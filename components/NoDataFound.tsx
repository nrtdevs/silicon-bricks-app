import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { ThemedView } from "./ThemedView";
import CustomButton from "./CustomButton";
import assets from "@/assets";

const NoDataFound = ({
  onPress,
  loading,
  containerStyle,
}: {
  onPress?: () => void;
  loading?: boolean;
  containerStyle?: any;
}) => {
  return (
    <View style={containerStyle}>
      <Image
        resizeMode="contain"
        style={styles.imgStyle}
        // source={assets.images.noDataFound}
        source={assets?.images.noDataFound}
      />
      {onPress && (
        <CustomButton
          title="Refresh"
          onPress={()=>{}}
          style={{ width: "50%" }}
          isLoading={loading}
        />
      )}
    </View>
  );
};

export default NoDataFound;

const styles = ScaledSheet.create({
  imgStyle: {
    width: "300@ms",
    height: "300@ms",
    alignSelf: "center",
    marginTop: "100@ms",
  },
});
