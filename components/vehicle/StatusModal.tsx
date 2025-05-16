import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ThemedView } from '../ThemedView';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { ScaledSheet } from 'react-native-size-matters';

interface StatusModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  dropdown: React.ReactNode;  
  title:string;
}

const StatusModal: React.FC<StatusModalProps> = ({ visible, onClose, onSubmit, dropdown,title }) => {
  const {theme} = useTheme()
  return ( 
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ThemedView style={[styles.modalContainer,{backgroundColor:Colors[theme].cart}]}>
          <ThemedText type='subtitle' style={styles.title}>{title}</ThemedText>

          {/* Your dropdown component */}
          <View style={styles.dropdownContainer}>
            {dropdown}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.cancelButton,{borderColor:Colors[theme].border}]} onPress={onClose}>
              <ThemedText type='default'>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <ThemedText type='default'>Update</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>
    </Modal> 
  );
};

export default StatusModal;

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%', 
    borderRadius: "16@ms",
    padding: "20@ms",
    elevation: 5,
  },
  title: { 
    marginBottom: "16@vs",
    textAlign: 'center',
    fontSize:"16@ms"
  },
  dropdownContainer: {
    marginBottom: "24@vs",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingVertical: "10@vs",
    paddingHorizontal: "16@ms",
    marginRight: "10@s",
    borderRadius: "8@ms",
    borderWidth: 0.5,

  },
  
  submitButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: "10@vs",
    paddingHorizontal: "20@ms",
    borderRadius: "8@ms",
  }, 
});
