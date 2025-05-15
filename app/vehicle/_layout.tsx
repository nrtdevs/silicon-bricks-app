import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
  <Stack
                screenOptions={{headerShown:false }} 
                initialRouteName='(vehicleList)'
              >
                <Stack.Screen name="(vehicleList)" /> 
                <Stack.Screen name="(tabs)" />
              </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})