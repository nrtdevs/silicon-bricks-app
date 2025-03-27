import React, { useEffect, useRef } from 'react'
import { Animated, TouchableOpacity, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'

const CustomSwitch = ({
  trackColor = { false: '#000000', true: Colors.gradient1 },
  thumbColor = '#333333',
  onValueChange,
  value,
  style
}: any) => {
  const thumbPosition = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    // Animate the thumb position when `value` changes
    Animated.spring(thumbPosition, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 100
    }).start()
  }, [value])

  const toggleSwitch = () => {
    const newValue = !value // Toggle the value
    onValueChange(newValue) // Notify the parent
    // Do NOT update any local state here; wait for the parent to update `value`
  }

  const thumbTranslateX = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20] // Adjusted for smooth movement
  })

  return (
    <TouchableOpacity onPress={toggleSwitch} style={style} activeOpacity={0.8}>
      <View
        style={[
          styles.track,
          { backgroundColor: value ? trackColor.true : trackColor.false }
        ]}
      >
        <LinearGradient
          colors={
            value
              ? [Colors.gradient2, Colors.gradient1]
              : ['#000000', '#000000']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                backgroundColor: thumbColor,
                transform: [{ translateX: thumbTranslateX }]
              }
            ]}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    overflow: 'hidden' // Ensure the gradient doesn't overflow
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 2
  }
})

export default CustomSwitch
