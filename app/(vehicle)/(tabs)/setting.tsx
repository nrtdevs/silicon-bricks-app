import { Alert, Pressable, ScrollView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import Toggle from 'react-native-toggle-element';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const setting = () => {
  const { theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const logoutFunc = () => {
    Alert.alert(labels.logout_title, labels.logout_msg, [
      {
        text: labels.cancel,
        onPress: () => { },
        style: "cancel",
      },
      {
        text: labels.logout,
        onPress: async () => { },
      },
    ]);
  };

  const rightIcon2 = () => {
    return (
      <Toggle
        value={theme === 'dark'}
        onPress={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
        thumbButton={{
          width: ms(24),
          height: ms(24),
          radius: ms(12),
          activeBackgroundColor: Colors[theme].background,
          inActiveBackgroundColor: Colors[theme].background,
        }}
        leftComponent={
          <MaterialCommunityIcons
            name="weather-night"
            size={ms(14)}
            color={theme === "dark" ? Colors.white : Colors.grayText}
          />
        }
        rightComponent={
          <Feather name="sun" size={ms(14)} color={theme === "light" ? Colors.orange : Colors.grayText} />
        }
        trackBar={{
          activeBackgroundColor: Colors[theme].primary?.main || '#007AFF',
          inActiveBackgroundColor: Colors[theme].border,
          borderWidth: 1,
          borderActiveColor: Colors[theme].primary?.main || '#007AFF',
          borderInActiveColor: Colors[theme].border,
          width: s(45),
          height: vs(22),
        }}
      />
    );
  };

  const firstData = [
    {
      id: 1,
      title: labels.profile,
      iconLib: AntDesign,
      iconName: "user",
      onTouchAction: () => {
        // setValue("name", data?.findUserById?.name);
        // setValue("email", data?.findUserById?.email);
        // setValue("phoneNo", (data?.findUserById?.mobileNo as number).toString());
        // setModalVisible(true);
      },
    },
    {
      id: 2,
      title: labels.notification,
      iconLib: Ionicons,
      iconName: "notifications-outline",
      onTouchAction: () => { },
    },
    {
      id: 3,
      title: labels.language,
      iconLib: FontAwesome,
      iconName: "language",
      onTouchAction: () => { },
    },
    {
      id: 4,
      title: labels.appearance,
      iconLib: Ionicons,
      iconName: "moon-outline",
      onTouchAction: () => { },
      rightIcon: rightIcon2(),
    },
    {
      id: 5,
      title: labels.support,
      iconLib: MaterialIcons,
      iconName: "support-agent",
      onTouchAction: () => { },
    },
    {
      id: 6,
      title: labels.help,
      iconLib: Feather,
      iconName: "help-circle",
      onTouchAction: () => { },
    },
    {
      id: 7,
      title: labels.about,
      iconLib: AntDesign,
      iconName: "infocirlceo",
      onTouchAction: () => {
        router.push("/about");
      },
    },
  ];

  return (
    <ThemedView style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={Colors[theme].background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors[theme].background }]}>
        <ThemedText type="title" style={styles.headerTitle}>Settings</ThemedText>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={[styles.userInfo, { backgroundColor: Colors[theme].cart }]}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("@/assets/images/dog.jpeg")} // Placeholder image
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
          <View style={styles.userDetails}>
            <ThemedText style={styles.userName} type="title">John Doe</ThemedText>
            <ThemedText style={styles.userEmail} type="subtitle">john.doe@example.com</ThemedText>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {firstData.map((item: any, i: number) => {
            const IconComponent = item.iconLib;
            return (
              <Pressable
                key={item.id}
                onPress={item?.onTouchAction}
                style={({ pressed }) => [
                  styles.settingItem,
                  {
                    backgroundColor: Colors[theme].cart,
                    shadowColor: Colors[theme].shadow,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                android_ripple={{
                  color: Colors[theme].primary?.main + '20' || '#007AFF20',
                  borderless: false
                }}
              >
                <View style={styles.settingItemLeft}>
                  <View style={[styles.iconBackground, { backgroundColor: Colors[theme].primary?.bg || '#E3F2FD' }]}>
                    <IconComponent
                      name={item.iconName}
                      size={ms(18)}
                      color={Colors[theme].primary?.main || '#007AFF'}
                    />
                  </View>
                  <View style={styles.itemTextContent}>
                    <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
                      {item.title}
                    </ThemedText>
                    {item.subtitle && (
                      <ThemedText
                        type="default"
                        style={[styles.itemSubtitle, { color: Colors[theme].textSecondary }]}
                      >
                        {item.subtitle}
                      </ThemedText>
                    )}
                  </View>
                </View>

                <View style={styles.settingItemRight}>
                  {item.rightIcon ? (
                    item.rightIcon
                  ) : (
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={ms(20)}
                      color={Colors[theme].icon}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={logoutFunc}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              backgroundColor: Colors[theme].cart,
              shadowColor: Colors[theme].shadow,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          android_ripple={{
            color: '#FF000020',
            borderless: false
          }}
        >
          <View style={styles.settingItemLeft}>
            <View style={[styles.iconBackground, { backgroundColor: '#FFEBEE' }]}>
              <MaterialIcons
                name="logout"
                size={ms(18)}
                color="#F44336"
              />
            </View>
            <ThemedText type="defaultSemiBold" style={[styles.itemTitle, { color: '#F44336' }]}>
              {labels.logout}
            </ThemedText>
          </View>
        </Pressable>
      </ScrollView>
    </ThemedView>
  )
}

export default setting;

const styles = ScaledSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: '24@ms',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: '20@s',
    paddingVertical: '15@vs',
    paddingBottom: Platform.OS === 'ios' ? '30@vs' : '20@vs',
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: '18@ms',
    borderRadius: '16@ms',
    marginBottom: '25@vs',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatarContainer: {
    height: '65@ms',
    width: '65@ms',
    borderRadius: '32.5@ms',
    overflow: "hidden",
    marginRight: '15@s',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: '18@ms',
    fontWeight: "700",
    marginBottom: '4@vs',
  },
  userEmail: {
    fontSize: '14@ms',
    color: '#757575',
  },
  settingsList: {
    marginBottom: '20@vs',
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '12@vs',
    paddingHorizontal: '16@ms',
    paddingVertical: '14@vs',
    borderRadius: '12@ms',
    minHeight: '60@vs',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemRight: {
    marginLeft: '10@s',
  },
  iconBackground: {
    width: '38@ms',
    height: '38@ms',
    borderRadius: '19@ms',
    alignItems: "center",
    justifyContent: "center",
    marginRight: '12@s',
  },
  itemTextContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '16@ms',
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: '12@ms',
    lineHeight: '16@ms',
    marginTop: '2@vs',
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: '16@ms',
    paddingVertical: '14@vs',
    borderRadius: '12@ms',
    minHeight: '60@vs',
    marginTop: '10@vs',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
