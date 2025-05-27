import React, { useEffect, useState } from 'react'
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Entypo, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';
import { ms } from 'react-native-size-matters';
import * as SecureStore from "expo-secure-store";
import { UserProvider } from '@/context/RoleContext';

const CustomDrawerContent = (props: any) => {
  const [userType, setUserType] = useState<string | null>();

  const { theme } = useTheme();
  const getUserType = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    setUserType(parsedUserData?.userType);
  };

  useEffect(() => {
    getUserType();
  }, [])

  return (
    <>
      {
        userType === 'admin' ? (
          <DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].cart }}>
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
              icon={({ color, size }) => <Feather name="user" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.user}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/user')}
            />

            <DrawerItem
              icon={({ color, size }) => <Octicons name="project" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.project}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/project')}
            />

            <DrawerItem
              icon={({ color, size }) => <MaterialIcons name="subscriptions" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.subscriptions}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/subscriptions')}
            />

            <DrawerItem
              icon={({ color, size }) => <MaterialCommunityIcons name="view-module-outline" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.module}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/module')}
            />

            <DrawerItem
              icon={({ color, size }) => <Feather name="package" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.packages}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/packages')}
            />

            <DrawerItem
              icon={({ color, size }) => <Ionicons name="people-outline" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.RolesPermission}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/roles')}
            />

            {/* <DrawerItem
              icon={({ color, size }) => <MaterialIcons name="create" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.pages}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/pages')}
            /> */}

            <DrawerItem
              icon={({ color, size }) => <MaterialIcons name="local-offer" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.coupons}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/coupons')}
            />

            {/* <DrawerItem
              icon={({ color, size }) => <Ionicons name="people-outline" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.permission}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/permission')}
            /> */}

            {/* <DrawerItem
              icon={({ color, size }) => <MaterialIcons name="local-offer" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.offerPromotions}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/offer')}
            /> */}

            <DrawerItem
              icon={({ color, size }) => <Entypo name="light-bulb" size={ms(24)} color={Colors[theme].text} />}
              label={labels?.plans}
              labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
              onPress={() => router.push('/plans')}
            />

          </DrawerContentScrollView>
        ) : (<DrawerContentScrollView {...props} style={{ backgroundColor: Colors[theme].cart }}>
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
            icon={({ color, size }) => <MaterialIcons name="subscriptions" size={ms(24)} color={Colors[theme].text} />}
            label={labels?.subscriptions}
            labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
            onPress={() => router.push('/subscriptions')}
          />

          <DrawerItem
            icon={({ color, size }) => <Octicons name="project" size={ms(24)} color={Colors[theme].text} />}
            label={labels?.project}
            labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
            onPress={() => router.push('/project')}
          />

          {/* <DrawerItem
            icon={({ color, size }) => <MaterialIcons name="local-offer" size={ms(24)} color={Colors[theme].text} />}
            label={labels?.offerPromotions}
            labelStyle={{ color: Colors[theme].text, fontWeight: 'semibold', fontSize: ms(18) }}
            onPress={() => router.push('/promotions')}
          /> */}
        </DrawerContentScrollView>
        )
      }
    </>
  )
}

const Layout = () => {
  const { theme } = useTheme();
  return (
    <UserProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: Colors[theme].cart,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />} />
    </UserProvider>

  )
}

export default Layout