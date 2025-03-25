import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useTheme } from '@/context/ThemeContext'
import { Colors } from '@/constants/Colors'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )
  const { theme } = useTheme()

  return (
    <Animated.View
      style={[{ backgroundColor: Colors[theme].background }, style]}
      {...otherProps}
    />
  )
}
