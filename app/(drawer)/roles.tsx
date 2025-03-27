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
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useScrollToTop } from '@react-navigation/native'
import { gql, useMutation } from "@apollo/client";
import CustomHeader from '@/components/CustomHeader'
import { ThemedText } from '@/components/ThemedText'

interface PermissionData {
  id: number;
  appName: string;
  description: string;
  status: string;
}
const RoleModule = gql`
  query AllPermissions {
  allPermissions {
    id
    appName
    groupName
    module
    action
    slug
    description
  }
}
`;

const Permissions = () => {
  const ref = React.useRef(null)
  const handlescroll = () => {
    useScrollToTop(ref)
  }
  const [getAllPermissions, { data, loading, error }] = useLazyQuery(RoleModule)
  useEffect(() => {
    console.log(data);
    getAllPermissions()
  }, [getAllPermissions])

  const permissions = data?.allPermissions;
  // const permissions =
  //   data?.permissionGroup?.modules?.flatMap((module: any) =>
  //     module.groups?.flatMap((group: any) =>
  //       group.permissions?.map((permission: any) => ({
  //         appName: permission.appName,
  //         module: permission.module,
  //         groupName: permission.groupName
  //       }))
  //     )
  //   ) || []

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={styles.loadingText}>Loading...</Text>
  //     </View>
  //   )
  // }

  const handleDelete = () => {
    console.log('deleted')
  }
  return (
   <CustomHeader>
      <View style={styles.container}>
          <FlatList
            data={permissions}
            onScroll={handlescroll}
            keyExtractor={(item: PermissionData) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <ThemedText style={styles.name}>{item.appName}</ThemedText>
                <ThemedText style={styles.name}>{item.status}</ThemedText>
                <ThemedText style={styles.name}>{item.description}</ThemedText>
                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.editButton}
                >
                  <Feather name="edit" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.deleteButton}
                >
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
      </View>
   </CustomHeader>
  )
}

export default Permissions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColorPrimary
  },
  innerContainer: {
    paddingVertical: 10
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: '#007BFF'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 18,
    color: 'red'
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    alignSelf : "center",
    justifyContent : "center",
    alignContent : "center"
  },
  deleteButton: {
    backgroundColor: '#ee0b0b',
    padding: 6,
    borderRadius: 20
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 6,
    borderRadius: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dadada',
    padding: 10,
    margin: 8,
    borderRadius: 12,
    height: 80,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    elevation: 5,
    marginHorizontal: 20
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.title
  }
})