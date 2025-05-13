import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { ms } from 'react-native-size-matters';


const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].cartBg }}>

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.meeting}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/meeting')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.upcomingMeeting}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/upcomingMeeting')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.meetingType}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/meetingType')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.meetingVenue}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/meetingVenue')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="note-alt" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.myNotes}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/myNotes')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="task" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.task}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/tasks')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="task" size={ms(24)} color={Colors[theme].text} />}
        label={labels?.upcomingTasks}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/upcommingTask')}
      />

    </DrawerContentScrollView>
  )
}

const Layout = () => {
  const { theme } = useTheme();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors[theme].cartBg,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} />
  )
}

export default Layout