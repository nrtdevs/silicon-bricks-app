import { View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels"; 
import { ScaledSheet, vs } from "react-native-size-matters"; 
import { ThemedView } from "./ThemedView";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  setPauseMessage?: (message: string) => void;
  onClose?: () => void;
}

const PauseComponent  = ({setPauseMessage,onClose}: Props) => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <CustomButton
        title={labels.pause_for_30} 
          style={{ backgroundColor: Colors[theme].background }}
        onPress={() => {  
          setPauseMessage?.("30 minutes");
          onClose?.();
        }}
      />
      <View style={{ height: vs(11) }} />
      <CustomButton
              style={{ backgroundColor: Colors[theme].background }}


        title={labels.pause_for_2_hour} 
        onPress={() => { 
          setPauseMessage?.("2 hours");
          onClose?.();

        }}
      />
      <View style={{ height: vs(11) }} />

      <CustomButton
           style={{ backgroundColor: Colors[theme].background }}


        title={labels.pause_for_5_hour} 
        onPress={() => { 
          setPauseMessage?.("5 hours");
          onClose?.();

        }}
      />
    </View>
  );
};

export default PauseComponent;

const styles = ScaledSheet.create({
  container: {  
    width: "100%",
    paddingHorizontal: "15@s",
    paddingVertical: "10@vs",
    
  }, 
});
