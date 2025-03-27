// CustomToast.js
import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { BlurView } from 'expo-blur'
import { Colors } from '@/constants/Colors'

const CustomToast = ({ text1, text2 }: any) => {
  return (
    <BlurView
      style={styles.container}
      intensity={10}
      tint={Platform.OS === 'ios' ? 'light' : 'light'} // Adjust tint for iOS
    >
      <View style={styles.content}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: Colors.white,
    zIndex: 10
  },
  content: {
    alignItems: 'center'
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  text2: {
    fontSize: 14,
    color: '#000',
    marginTop: 5
  }
})

export default CustomToast
