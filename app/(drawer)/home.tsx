// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, Text } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";

// const Tab = createBottomTabNavigator();

// const HomeScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
//         <Text>Home Screen</Text>
//     </View>
// );
// const PostScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Post Screen</Text>
//     </View>
// );
// const ProfileScreen = () => (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Profile Screen</Text>
//     </View>
// );

// const Dashboard = () => {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ color, size }) => {
//                         let iconName;
//                         if (route.name === "Home") {
//                             iconName = "home";
//                         } else if (route.name === "Post") {
//                             iconName = "add-circle";
//                         } else if (route.name === "Profile") {
//                             iconName = "person";
//                         }
//                         return <Ionicons names ={iconName} size={size} color={color} />;
//                     },
//                     tabBarActiveTintColor: "blue",
//                     tabBarInactiveTintColor: "gray",
//                 })}
//             >
//                 <Tab.Screen name="Home" component={HomeScreen} />
//                 <Tab.Screen name="Post" component={PostScreen} />
//                 <Tab.Screen name="Profile" component={ProfileScreen} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// };
// export default Dashboard;

import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

const Index = () => {
  const [message, setMessage] = useState('Hello World!!')

  const changeMessage = () => {
    setMessage('You clicked the button!')
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to My App</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.mainText}>{message}</Text>
        <Button title="Click Me" onPress={changeMessage} color="#3B82F6" />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Click here for more info</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#f8f9fa',
  },
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3B82F6', 

    marginBottom: 20
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  footer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3B82F6', 
    borderRadius: 10
  },
  footerText: {
    fontSize: 16,
    color: '#fff', 
    textAlign: 'center'
  }
})

export default Index
