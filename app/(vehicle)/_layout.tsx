import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ms } from 'react-native-size-matters';

const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].background }}>
      <View style={styles.drawerHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://cdn.creazilla.com/icons/3251108/person-icon-md.png' }}
            style={styles.userImage}
          />
        </View>
        <ThemedText type='default' style={styles.drawerTitle}>Vehicle Management</ThemedText>
      </View>
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="home" size={ms(24)} color={Colors[theme].primary.main} />}
        label="Dashboard"
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(vehicle)/(tabs)/home')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="directions-car" size={ms(24)} color={Colors[theme].primary.main} />}
        label="Vehicle"
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(vehicle)/vehicle-list')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="build" size={ms(24)} color={Colors[theme].primary.main} />}
        label="Service Center"
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(vehicle)/service/ServiceCenterList')}
      />
      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="history" size={ms(24)} color={Colors[theme].primary.main} />}
        label="Activity Log"
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(vehicle)/activity/ActivityList')}
      />

      <DrawerItem
        icon={({ color, size }) => <MaterialIcons name="notifications" size={ms(24)} color={Colors[theme].primary.main} />}
        label="Notifications"
        labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
        onPress={() => router.push('/(vehicle)/Notification')}
      />
    </DrawerContentScrollView>
  )
}

const VehicleLayout = () => {
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

export default VehicleLayout

const getStyles = (theme: string) => StyleSheet.create({
  drawerHeader: {
    backgroundColor: Colors[theme].card,
    paddingVertical: ms(20),
    paddingHorizontal: ms(15),
    marginBottom: ms(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors[theme].border,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(10),
  },
  userImage: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    borderWidth: 2,
    borderColor: Colors[theme].primary.main, // Changed to .main
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    alignSelf: "center",
    marginBottom: ms(5),
    color: Colors[theme].text,
  },
  drawerTitle: {
    alignSelf: "center",
    fontWeight: 'bold',
    fontSize: ms(20),
    color: Colors[theme].text,
  },
});