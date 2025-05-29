import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScaledSheet, vs } from 'react-native-size-matters'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from './ThemedText'

const CustomHeader = ({
  title,
  toggleValue,
  children,
  leftComponent,
  rightComponent
}: any) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].background,
          paddingTop: insets.top + vs(0)
        }
      ]}
    >
      <View
        style={[
          styles.iconView,
          { justifyContent: leftComponent ? 'space-between' : 'flex-end' }
        ]}
      >
        {leftComponent ? leftComponent : null}
        <ThemedText
          style={{
            color: Colors[theme].text,
            fontSize: 18,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center'
          }}
        >
          {title}
        </ThemedText>
        {rightComponent ? rightComponent : null}
      </View>
      {children}
    </SafeAreaView>
  )
}

export default CustomHeader

const styles = ScaledSheet.create({
  logo: {
    width: '25@ms',
    height: '25@ms'
  },
  container: {
    flex: 1
  },
  iconView: {
    flexDirection: 'row',
    paddingHorizontal: '12@ms'
  }
})
