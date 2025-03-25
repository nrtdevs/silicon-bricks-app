import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

const Roles = () => {
  return (
    <View>
      <Text style={styles.text}>roles</Text>
    </View>
  );
};

export default Roles;

const styles = ScaledSheet.create({
  text:{
    fontSize:"24@ms"
  }
});
