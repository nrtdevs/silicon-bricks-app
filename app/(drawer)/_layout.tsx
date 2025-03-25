import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { ms } from 'react-native-size-matters';

 
export const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].background }}>
      <DrawerItem
        icon={({ color, size }) => <MaterialCommunityIcons name="view-dashboard-edit-outline" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.home}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/home')}
      />

      <DrawerItem
        icon={({ color, size }) => <Octicons name="organization" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.organization}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/organization')}
      />

      <DrawerItem
        icon={({ color, size }) => <Octicons name="project" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.project}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/project')}
      />

      <DrawerItem
        icon={({ color, size }) => <Feather name="user" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.user}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/user')}
      />

      <DrawerItem
        icon={({ color, size }) => <Ionicons name="people-outline" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.RolesPermission}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/roles')}
      />

    </DrawerContentScrollView>
  )
}

  