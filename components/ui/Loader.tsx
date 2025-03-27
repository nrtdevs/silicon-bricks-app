import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const Loader = ({ size }: { size?: 'small' | 'large' }) => {
  return (
    <ActivityIndicator
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent
      }}
      size={size ?? 'large'}
      color={Colors.gradient1}
    />
  )
}

export default Loader

const styles = StyleSheet.create({})
