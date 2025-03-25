// // import { StyleSheet, Text, View } from "react-native";
// // import React, { useEffect } from "react";
// // import { useLazyQuery } from "@apollo/client";
// // import { GetAllOrganisations, GetAllPermissions } from "@/graphql/Query";
// // import { ScrollView } from "react-native-gesture-handler";

// // const Permissions = () => {
// //   const [getAllPermissions, { data, loading, refetch, error }] =
// //     useLazyQuery(GetAllPermissions);

// //   useEffect(() => {
// //     getAllPermissions();
// //   }, [getAllPermissions]);

// //   console.log(
// //     data?.permissionGroup?.modules[0]?.groups[0]?.permissions[0]?.appName
// //   );

// //   const appNameData = data?.permissionGroup?.modules?.flatMap((module: any) =>
// //     module.groups?.flatMap((group: any) =>
// //       group.permissions?.map((permission: any) => permission.appName)
// //     )
// //   );

// //   const module = data?.permissionGroup?.modules?.flatMap((module: any) =>
// //     module.groups?.flatMap((group: any) =>
// //       group.permissions?.map((permission: any) => permission.module)
// //     )
// //   );
// //   const groupName = data?.permissionGroup?.modules?.flatMap((module: any) =>
// //     module.groups?.flatMap((group: any) =>
// //       group.permissions?.map((permission: any) => permission.groupName)
// //     )
// //   );
// //   // .forEach((appName: any) => console.log(appName));

// //   // const descriptionData = data?.permissionGroup?.modules?.flatMap(
// //   //   (module: any) =>
// //   //     module.groups?.flatMap((group: any) =>
// //   //       group.permissions?.map((permission: any) => permission.description)
// //   //     )
// //   // );
// //   return (
// //     <ScrollView>
// //       <View>
// //         {appNameData?.map((appName: any, index: number) => (
// //           <Text key={index}>{appName}</Text>
// //         ))}
// //         {module?.map((description: any, index: number) => (
// //           <Text key={index}>{description}</Text>
// //         ))}
// //         {groupName?.map((description: any, index: number) => (
// //           <Text key={index}>{description}</Text>
// //         ))}
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // export default Permissions;

// // const styles = StyleSheet.create({});
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Touchable,
//   TouchableOpacity
// } from 'react-native'
// import React, { useEffect } from 'react'
// import { useLazyQuery } from '@apollo/client'
// import { GetAllPermissions } from '@/graphql/'
// import { FlatList } from 'react-native-gesture-handler'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
// import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
// import { useScrollToTop } from '@react-navigation/native'

// const Permissions = () => {
//   const ref = React.useRef(null)

//   const handlescroll = () => {
//     useScrollToTop(ref)
//   }

//   const [getAllPermissions, { data, loading, error }] =
//     useLazyQuery(GetAllPermissions)

//   useEffect(() => {
//     getAllPermissions()
//   }, [getAllPermissions])

//   // Extracting data more simply
//   const permissions =
//     data?.permissionGroup?.modules?.flatMap((module: any) =>
//       module.groups?.flatMap((group: any) =>
//         group.permissions?.map((permission: any) => ({
//           appName: permission.appName,
//           module: permission.module,
//           groupName: permission.groupName
//         }))
//       )
//     ) || []

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     )
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {error.message}</Text>
//       </View>
//     )
//   }

//   const handleDelete = () => {
//     console.log('deleted')
//   }

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* {permissions.length === 0 ? (
//           <Text style={styles.noDataText}>No permissions available.</Text>
//         ) : (
//           permissions.map((permission: any, index: number) => (
//             <View style={styles.row} key={index}>
//               <Text style={styles.rowItem}>{permission.appName}</Text>
//               <Text style={styles.rowItem}>{permission.module}</Text>
//               <Text style={styles.rowItem}>{permission.groupName}</Text>
//             </View>
//           ))
//         )} */}

//         {permissions.length === 0 ? (
//           <Text style={styles.noDataText}>No permissions available.</Text>
//         ) : (
//           <FlatList
//             data={permissions}
//             onScroll={handlescroll}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Text style={styles.name}>{item.appName}</Text>
//                 <Text style={styles.name}>{item.module}</Text>
//                 <Text style={styles.name}>{item.groupName}</Text>
//                 <TouchableOpacity
//                   onPress={handleDelete}
//                   style={styles.editButton}
//                 >
//                   <Feather name="edit" size={24} color="white" />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={handleDelete}
//                   style={styles.deleteButton}
//                 >
//                   <MaterialCommunityIcons
//                     name="delete-empty"
//                     size={24}
//                     color="white"
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         )}
//       </View>
//     </ScrollView>
//   )
// }

// export default Permissions

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.backgroundColorPrimary
//   },
//   innerContainer: {
//     paddingVertical: 10
//   },

//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#007BFF'
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red'
//   },
//   noDataText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center'
//   },
//   deleteButton: {
//     backgroundColor: '#ee0b0b',
//     padding: 6,
//     borderRadius: 20
//   },
//   editButton: {
//     backgroundColor: '#007AFF',
//     padding: 6,
//     borderRadius: 20
//   },
//   card: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#dadada',
//     padding: 10,
//     margin: 8,
//     borderRadius: 12,
//     height: 80,
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     shadowColor: 'black',
//     elevation: 5,
//     marginHorizontal: 20
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: Colors.title
//   }
// })

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const permissions = () => {
  return (
    <View>
      <Text>permissions</Text>
    </View>
  );
};

export default permissions;

const styles = StyleSheet.create({});
