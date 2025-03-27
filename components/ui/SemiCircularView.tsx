import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ms } from 'react-native-size-matters' // For scaling

const SemiCircularView = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: ms(16) }}>
        Semi-Circular View
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'red', // Solid red background
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SemiCircularView
