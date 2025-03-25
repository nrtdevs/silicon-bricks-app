import React, { PropsWithChildren, ReactElement } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset
} from 'react-native-reanimated'

import { ThemedView } from '@/components/ThemedView'
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'
import { ScaledSheet } from 'react-native-size-matters'

const HEADER_HEIGHT = 250

export default function ParallaxScrollView({ children }: { children: any }) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{}}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    padding: '12@ms',
    gap: '16@ms',
    overflow: 'hidden'
  }
})
