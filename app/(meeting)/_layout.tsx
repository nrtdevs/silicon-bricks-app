import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons, } from '@expo/vector-icons';
import { router } from 'expo-router';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { ms } from 'react-native-size-matters';
import { View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Divider } from '@rneui/themed';


const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].background }}>
      <View style={{
        height: 150, borderColor: Colors[theme].border,
        shadowColor: Colors[theme].shadow,
        backgroundColor: "#e3e4e6", borderRadius: 5
      }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
        }}>
          <Image
            source={{ uri: 'https://cdn.creazilla.com/icons/3251108/person-icon-md.png' }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#ccc',
            }}
          />
        </View>
        <ThemedText type='subtitle' style={{ alignSelf: "center" }}>User name</ThemedText>
      </View>
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color="#3B82F6" />}
        label={labels?.meeting}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/meeting')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color="#3B82F6" />}
        label={labels?.upcomingMeeting}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/upcomingMeeting')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color="#3B82F6" />}
        label={labels?.exitingMeeting}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/exitingMeeting')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color="#3B82F6" />}
        label={labels?.meetingType}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/meetingType')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="meeting-room" size={ms(24)} color="#3B82F6" />}
        label={labels?.meetingVenue}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/meetingVenue')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="note-alt" size={ms(24)} color="#3B82F6" />}
        label={labels?.myNotes}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/myNotes')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="task" size={ms(24)} color="#3B82F6" />}
        label={labels?.task}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/tasks')}
      />
      {/* <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="task" size={ms(24)} color={Colors.primary} />}
        label={labels?.upcomingTasks}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/upcommingTask')}
      /> */}
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="report" size={ms(24)} color="#3B82F6" />}
        label={labels?.report}
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(meeting)/report')}
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
          backgroundColor: Colors[theme].cart,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} />
  )
}

export default Layout