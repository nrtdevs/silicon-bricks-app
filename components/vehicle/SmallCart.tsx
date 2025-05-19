
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';

interface SmallCartProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

const SmallCart: React.FC<SmallCartProps> = ({ icon, label, onPress }) => {
  const { theme } = useTheme()
  return (
    <Pressable style={[styles.container, { backgroundColor: Colors[theme].cart }]} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={30} color={Colors.primary} />
      </View>
      <ThemedText type='default' style={styles.label}>{label}</ThemedText>
    </Pressable>
  );
};

// Inside SmallCart.tsx — adjust the container style
const styles = ScaledSheet.create({
  container: {
    width: '45%', // Change this from 80 to 45%
    height: "100@vs",
    borderRadius: "16@ms",
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8, // spacing between items
  },
  iconWrapper: {
    marginBottom: 6,
  },
  label: {
    fontSize: "14@ms",
    textAlign: 'center',
  },
});


export default SmallCart;
