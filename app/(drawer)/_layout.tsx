// import Icon from "@expo/vector-icons/FontAwesome";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Drawer } from "expo-router/drawer";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { Text, View, StyleSheet, Image } from "react-native";
// import Octicons from "@expo/vector-icons/Octicons";
// import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import {
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList,
// } from "@react-navigation/drawer";

// export default function Layout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           drawerStyle: {
//             paddingTop: 50,
//             paddingRight: 10,
//             backgroundColor: "#f0f0f0", // Background color for better visibility
//           },
//         }}
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//       >
//         {/* Drawer Screens */}
//         <Drawer.Screen
//           name="index"
//           options={{
//             drawerLabel: "Dashboard",
//             title: "Dashboard",
//             drawerIcon: ({ size, color }) => (
//               <MaterialIcons name="dashboard" size={24} color="black" />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="organization"
//           options={{
//             drawerLabel: "Organization",
//             title: "Organization",
//             drawerIcon: ({ size, color }) => (
//               <Octicons name="organization" size={24} color="black" />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="project"
//           options={{
//             drawerLabel: "Project",
//             title: "Project",
//             drawerIcon: ({ size, color }) => (
//               <Octicons name="project" size={24} color="black" />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="permissions"
//           options={{
//             drawerLabel: "Permission",
//             title: "Permission",
//             drawerIcon: ({ size, color }) => (
//               <AntDesign name="book" size={24} color="black" />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="roles"
//           options={{
//             drawerLabel: "Role",
//             title: "Role",
//             drawerIcon: ({ size, color }) => (
//               <FontAwesome6 name="user-pen" size={24} color="black" />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="user"
//           options={{
//             drawerLabel: "User",
//             title: "User",
//             drawerIcon: ({ size, color }) => (
//               <AntDesign name="user" size={size} color={color} />
//             ),
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }
// const CustomDrawerContent = (props: any) => {
//   return (
//     <View style={{ flex: 1 }}>
//       {/* User Info Section */}
//       <View style={styles.user}>
//         <Image
//           source={require("@/assets/university_3297709.png")}
//           style={styles.userImage}
//         />
//         <View style={styles.nameEmailContainer}>
//           <Text style={styles.name}>Ankit Pratap</Text>
//           <Text style={styles.email}>PratapGuptaAnkit@gmail.com</Text>
//           <View style={styles.line} />
//         </View>
//       </View>

//       {/* Render Drawer Items */}
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} style={styles.drawerContainer} />
//         <DrawerItem
//           label="Logout"
//           icon={({ size, color }) => (
//             <AntDesign name="logout" size={size} color={color} />
//           )}
//           onPress={() => {
//             // Handle logout action here, make sure to clear the session or token
//             console.log("Logging out...");
//           }}
//         />
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   user: {
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     borderRadius: 10,
//     marginTop: 20,
//     marginHorizontal: 20,
//     padding: 5,
//     alignItems: "center",
//     fontFamily: "helevetica",
//   },
//   userImage: {
//     width: 75,
//     height: 75,
//     borderRadius: 50,
//     marginRight: 20,
//   },
//   nameEmailContainer: {
//     flexDirection: "column",
//     justifyContent: "center",
//     fontFamily: "sans-serif",
//   },
//   name: {
//     fontFamily: "sans-serif",
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   email: {
//     fontFamily: "sans-serif",
//     fontSize: 14,
//     color: "black",
//     fontWeight: "500",
//   },
//   line: {
//     height: 1,
//     backgroundColor: "black",
//     marginVertical: 10,
//     width: "100%",
//   },
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: "red",
//   },
// });

import Icon from "@expo/vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View, StyleSheet, Image } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 , }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            paddingTop: 50,
            paddingRight: 10,
            backgroundColor: "#f5f5f5", // Background color for better visibility
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* Drawer Screens with unified style */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  styles.drawerItemLabel,
                  focused && styles.activeDrawerItemLabel,
                ]}
              >
                Dashboard
              </Text>
            ),
            title: "Dashboard",
            drawerIcon: ({ size, color, focused }) => (
              <MaterialIcons
                name="dashboard"
                size={24}
                color={focused ? "#3B82F6" : color}
                style={focused && styles.iconActive}
              />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
        <Drawer.Screen
          name="organization"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  styles.drawerItemLabel,
                  focused && styles.activeDrawerItemLabel,
                ]}
              >
                Organization
              </Text>
            ),
            title: "Organization",
            drawerIcon: ({ size, color, focused }) => (
              <Octicons
                name="organization"
                size={24}
                color={focused ? "#3B82F6" : color}
                style={focused && styles.iconActive}
              />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
        <Drawer.Screen
          name="project"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  styles.drawerItemLabel,
                  focused && styles.activeDrawerItemLabel,
                ]}
              >
                Project
              </Text>
            ),
            title: "Project",
            drawerIcon: ({ size, color, focused }) => (
              <Octicons
                name="project"
                size={24}
                color={focused ? "#3B82F6" : color}
                style={focused && styles.iconActive}
              />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
        <Drawer.Screen
          name="permissions"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  styles.drawerItemLabel,
                  focused && styles.activeDrawerItemLabel,
                ]}
              >
                Permission
              </Text>
            ),
            title: "Permission",
            drawerIcon: ({ size, color, focused }) => (
              <AntDesign
                name="book"
                size={24}
                color={focused ? "#3B82F6" : color}
                style={focused && styles.iconActive}
              />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
        <Drawer.Screen
          name="roles"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  styles.drawerItemLabel,
                  focused && styles.activeDrawerItemLabel,
                ]}
              >
                Role
              </Text>
            ),
            title: "Role",
            drawerIcon: ({ size, color, focused }) => (
              <FontAwesome6
                name="user-pen"
                size={24}
                color={focused ? "#3B82F6" : color}
                style={focused && styles.iconActive}
              />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
        <Drawer.Screen
          name="user"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={[
                  styles.drawerItemLabel,
                  focused && styles.activeDrawerItemLabel,
                ]}
              >
                User
              </Text>
            ),
            title: "User",
            drawerIcon: ({ size, color, focused }) => (
              <AntDesign
                name="user"
                size={size}
                color={focused ? "#3B82F6" : color}
                style={focused && styles.iconActive}
              />
            ),
            drawerItemStyle: styles.drawerItemStyle,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const CustomDrawerContent = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      {/* User Info Section */}
      <View style={styles.user}>
        <Image
          source={require("@/assets/university_3297709.png")}
          style={styles.userImage}
        />
        <View style={styles.nameEmailContainer}>
          <Text style={styles.name}>Ankit Pratap</Text>
          <Text style={styles.email}>PratapGuptaAnkit@gmail.com</Text>
          <View style={styles.line} />
        </View>
      </View>

      {/* Render Drawer Items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} style={styles.drawerContainer} />
        <DrawerItem
          label={({ focused }) => (
            <Text
              style={[
                styles.drawerItemLabel,
                focused && styles.activeDrawerItemLabel,
              ]}
            >
              Logout
            </Text>
          )}
          icon={({ size, color, focused }) => (
            <AntDesign
              name="logout"
              size={24}
              color={focused ? "#3B82F6" : color} // Change color when focused
              style={focused && styles.iconActive} // Add scaling effect when focused
            />
          )}
          onPress={() => {
            // Handle logout action here
            console.log("Logging out...");
          }}
          style={styles.drawerItemStyle} // Apply the same drawer item style
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // User Profile Section
  user: {
    backgroundColor: "#fff",
    flexDirection: "row",
    // borderRadius: 20,
    padding: 5,
    marginTop: 20,
    alignItems: "center",
    fontFamily: "Helvetica",
    paddingVertical:10,
    marginHorizontal:20,
  },
  userImage: {
    width: 70,  // Slightly larger image for prominence
    height: 70, 
    borderRadius: 35,  // Perfect circle for the profile picture
    marginRight: 20,
    borderWidth: 3,  // Border for a sleek modern look
    borderColor: "#3B82F6",  // Color that ties with the theme
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,  // Light shadow to make it pop
    shadowRadius: 5, // Slight blur for depth
  },
  nameEmailContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 20,
    color: "#3B82F6"
  },
  email: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "black",
    fontWeight: "medium",
    letterSpacing: 0.3,
  },
  line: {
    height: 1,
    backgroundColor: "#3B82F6",
    marginVertical: 10,
    width: "100%",
  },

  // Drawer Item Styles
  drawerContainer: {
    flex: 1,
  },
  drawerItemLabel: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "#333333",
    letterSpacing: 0.3,
    
  },
  activeDrawerItemLabel: {
    color: "#3B82F6", // Active color for labels
    fontWeight: "bold",
    
  },
  iconActive: {
    transform: [{ scale: 1.1 }], // Slight scaling effect on active icons
    
  },
  drawerItemStyle: {
    borderRadius: 1, // Rounded corners for the drawer item
    backgroundColor: "#fff", // Light background color
    marginHorizontal: 15, // Slight margin for separation
    marginVertical: 5, // Slight margin for separation
  },
});
