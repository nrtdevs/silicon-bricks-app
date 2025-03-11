import { View, Modal, TouchableOpacity, Pressable } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import GradientButton from "../ui/GradientButton";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@rneui/base";

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  onYes: () => void;
  onNo: () => void;
}

export function ConfirmationModal({ visible, message, onYes, onNo }: ConfirmationModalProps) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onNo}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: Colors[theme].middleContainerBg }]}>
          <ThemedText type="defaultSemiBold" style={styles.messageText}>{message}</ThemedText>
            <View style={styles.buttonContainer}>
            <Pressable style={[styles.button]} onPress={onNo}>
              <ThemedText type="defaultSemiBold">Cancel</ThemedText>
            </Pressable>
            <Pressable style={styles.button} onPress={onYes}>
              <ThemedText type="defaultSemiBold" style={{color:Colors.primaryRed}}>Delete</ThemedText>
            </Pressable>
            </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = ScaledSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "75%",
    backgroundColor: "#1E1E1E",
    borderRadius: "14@s",
    padding: "16@s",
    alignItems: "center",
  },
  messageText: {
    fontSize: "16@s",
    textAlign: "center",
    marginBottom: "10@vs",
  
  },
  buttonContainer: {
    flexDirection: "row",
    gap:"10@vs",
    width: "100%",
  },
  button: {
    borderRadius: 100,
   paddingVertical:"4@vs",
flex:1,alignItems:"center"



   
  },
  
});