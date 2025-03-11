import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';

const countryCodes = [
  { code: '+1', name: 'USA' },
  { code: '+44', name: 'UK' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+33', name: 'France' },
  // Add more country codes as needed
];

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+1');
  const {theme}=useTheme()
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const selectCode = (code:any) => {
    setSelectedCode(code);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.dropdownButton,{backgroundColor:Colors[theme].inputBg}]} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>{selectedCode}</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent={true} animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
          <View style={styles.dropdownList}>
            <ScrollView>
              {countryCodes.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => selectCode(country.code)}
                >
                  <Text style={styles.dropdownItemText}>{`${country.code} (${country.name})`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  dropdownButton: {
    flex:0.75,
    borderWidth: 1,
    borderColor: Colors.inputBorder,

    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:10
  },
  dropdownButtonText: {
    fontSize: 16,
    color:"#666"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownList: {
    width: '80%',
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default App;