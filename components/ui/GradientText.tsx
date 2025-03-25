import React from 'react'
import { View, Text, StyleSheet, TextStyle, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '../ThemedText'
import { vs } from 'react-native-size-matters'

const GradientText: React.FC<any> = ({ textStyle, children, onpress }) => {
  return (
    <Pressable onPress={onpress}>
      <MaskedView maskElement={<Text style={textStyle}>{children}</Text>}>
        <LinearGradient
          colors={[Colors.gradient2, Colors.gradient1]} // Customize your gradient colors
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[textStyle, { opacity: 0 }]}>{children}</Text>
        </LinearGradient>
      </MaskedView>
    </Pressable>
  )
}

export default GradientText
