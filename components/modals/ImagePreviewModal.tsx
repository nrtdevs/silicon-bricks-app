import { View, Modal, Image, TouchableOpacity } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import Icon from "react-native-vector-icons/Ionicons"
import { ThemedText } from "@/components/ThemedText"
import React from "react"
import GradientButton from "../ui/GradientButton"
import { Colors } from "@/constants/Colors"
import { useTheme } from "@/context/ThemeContext"

interface ImagePreviewModalProps {
  visible: boolean
  imageUri: string
  fileName:string | null
  onClose: () => void
  onDelete: () => void
  onSend: () => void
}

export function ImagePreviewModal({ visible, imageUri, onClose, onDelete, onSend,fileName }: ImagePreviewModalProps) {
    const {theme}=useTheme()
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent,{backgroundColor:Colors[theme].middleContainerBg}]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            
                <View style={styles.deleteBox}>
                <ThemedText style={styles.fileName} > {fileName && fileName.length <= 20 ? fileName : `${fileName?.slice(0, 8)}...${fileName?.slice(-9)}`}</ThemedText>
                <TouchableOpacity onPress={onDelete}>
                  <Icon name="trash-outline" size={23} color="#FF4234" />
                </TouchableOpacity>
                </View>
          </View>
          <GradientButton style={styles.sendButton} title="Send Files" onClick={onSend} gradient/>
        
        </View>
      </View>
    </Modal>
  )
}

const styles = ScaledSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    borderWidth:1,
    borderColor:Colors.inputBorder,
    backgroundColor: "#1E1E1E",
    borderRadius: "12@s",
    padding: "16@s",
  },
  imageContainer: {
    position: "relative",
    alignItems:"center",
    marginBottom: "16@vs",
  },
  previewImage: {
    width: "90%",
    height: "200@vs",
    borderRadius: "8@s",
  },
  deleteBox:{
    marginTop:"10@vs",
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  sendButton: {
    borderRadius:200
  },
  fileName:{
    lineHeight:"14@vs",
    fontFamily:"inter"
  },
  sendButtonText: {
    color: "#fff",
    fontSize: "16@s",
    fontWeight: "600",
  },
})

