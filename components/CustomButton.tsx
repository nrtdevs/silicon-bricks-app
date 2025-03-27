import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { Colors } from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedView } from './ThemedView'
import { useTheme } from '@/context/ThemeContext'

interface CustomButtonProps {
  onPress: () => void
  isLoading?: boolean
  isIcon?: JSX.Element
  iconStyle?: any
  style?: any
  disabled?: boolean
  numberOfLines?: number
  title: string
  titleStyle?: any
  isGradient?: boolean
  textType?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

const CustomButton = (props: CustomButtonProps) => {
  const { theme } = useTheme()
  if (props.isGradient) {
    return (
      <Pressable
        disabled={props.disabled}
        onPress={props.onPress}
        style={[
          styles.button,
          {
            backgroundColor: !props.disabled
              ? Colors.gradient1
              : Colors.gradient1
          },
          props.style
        ]}
      >
        <LinearGradient
          colors={[Colors.gradient2, Colors.gradient1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, props.style]}
        >
          {props.isLoading ? (
            <ActivityIndicator size={'small'} color={Colors.white} />
          ) : (
            <View style={styles.iconContainer}>
              <View style={[styles.iconStyle, props.iconStyle]}>
                {props.isIcon}
              </View>

              <ThemedText
                numberOfLines={props.numberOfLines}
                style={[{ color: Colors.white }, props.titleStyle]}
                type={props.textType ?? 'defaultSemiBold'}
              >
                {props.title}
              </ThemedText>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    )
  } else {
    return (
      <Pressable
        disabled={props.disabled}
        onPress={props.onPress}
        style={[
          styles.gradient,
          {
            backgroundColor: props.disabled ? Colors.gray : Colors[theme].cartBg
          },
          props.style
        ]}
      >
        {props.isLoading ? (
          <ActivityIndicator size={'small'} color={Colors.white} />
        ) : (
          <View style={styles.iconContainer}>
            <View style={[styles.iconStyle, props.iconStyle]}>
              {props.isIcon}
            </View>

            <ThemedText
              numberOfLines={props.numberOfLines}
              type={props.textType ?? 'defaultSemiBold'}
              style={props.titleStyle}
            >
              {props.title}
            </ThemedText>
          </View>
        )}
      </Pressable>
    )
  }
}

export default CustomButton

const styles = ScaledSheet.create({
  button: {
    borderRadius: '25@ms',
    overflow: 'hidden',
    width: '100%'
  },
  gradient: {
    paddingVertical: '12@vs',
    paddingHorizontal: '32@s',
    borderRadius: '25@ms',
    alignItems: 'center',
    justifyContent: 'center'
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  loaderStyle: {
    position: 'relative',
    width: '80%',
    backgroundColor: 'transparent'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
