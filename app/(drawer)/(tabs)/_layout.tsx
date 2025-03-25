import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { labels } from '@/constants/Labels'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { ms, vs } from 'react-native-size-matters'

const _layout = () => {
  const { theme } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: Platform.select({
        ios: {

        },
        default: {
          height: vs(45),
          backgroundColor: Colors[theme].cartBg,
          alignItems: "center",
          justifyContent: "center",
        },
      }),
      
    }}>
      <Tabs.Screen name="index"

        options={{
          tabBarLabel: ({ focused }: any) => (
            <Text style={{ color: focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray }}>{labels?.home}</Text>
          ),
          tabBarIcon: ({ focused }: any) => (
            <Entypo name="home" size={ms(24)} color={focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray} />
          ),
        }}
      />
      <Tabs.Screen name="setting"
        options={{
          tabBarLabel: ({ focused }: any) => (
            <Text style={{ color: focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray }}>{labels?.settings}</Text>
          ),
          tabBarIcon: ({ color, focused }: any) => (
            <MaterialIcons name="settings" size={24} color={focused ? Colors.gradient1 : theme == 'dark' ? Colors.white : Colors.gray} />
          )
        }}
      />
    </Tabs>
  )
}

export default _layout