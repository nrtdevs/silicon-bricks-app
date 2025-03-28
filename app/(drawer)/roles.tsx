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
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useLazyQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useScrollToTop } from '@react-navigation/native'
import { gql, useMutation } from "@apollo/client";
import CustomHeader from '@/components/CustomHeader'
import { ThemedText } from '@/components/ThemedText'
import CustomValidation from '@/components/CustomValidation';
import { Dialog, Portal, } from "react-native-paper";
import { ThemeProvider } from '@/context/ThemeContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { ms, ScaledSheet } from 'react-native-size-matters';
import { labels } from '@/constants/Labels';

interface PermissionData {
  id: string;
  appName: string;
  groupName: string;
  module: string;
  action: string;
  slug: string;
  description: string;
};

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

const Delete_Permission = gql`
  mutation DeletePermission($deletePermissionId: Float!) {
  deletePermission(id: $deletePermissionId)
}
`;

const Permissions = () => {
  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });
  const [getAllPermissions, { data, loading, error }] = useLazyQuery(RoleModule);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const showDeleteDialogue = (id: number) => {
    setSelectedProjectId(id);
    setDeletePopupVisible(true);
  };
  const hideDeleteDialogue = () => {
    setDeletePopupVisible(false);
    setSelectedProjectId(null);
  };
  useEffect(() => {
    getAllPermissions();
  }, []);
  const hideDialogue = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (error) {
      console.error("GraphQL Error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // console.log("Fetched Data:", data);
    }
  }, [data]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading permissions!</Text>
      </View>
    );
  }

  const permissions = data?.allPermissions || [];
  const [deleteProject] = useMutation(Delete_Permission, {
    onCompleted: () => {
      console.log("Project deleted successfully");
      setDeletePopupVisible(false);
      //refetch();
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });
  const handleDelete = async () => {
    console.log(selectedProjectId);

    if (selectedProjectId !== null) {
      try {
        await deleteProject({ variables: { deletePermissionId: Number(selectedProjectId) } });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <CustomHeader>
      <View style={styles.container}>
        <FlatList
          data={permissions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <LinearGradient
              colors={["#0a54c9", "#5087de"]}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <View>
                <ThemedText style={styles.name}>{item.appName}</ThemedText>
                <ThemedText style={styles.cardDot}>{item.groupName}</ThemedText>
              </View>
              <View>
                <TouchableOpacity
                  onPress={showDialogue}
                >
                  <Feather name="edit" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ height: 5, width: 5 }}>
                </View>
                <TouchableOpacity
                  onPress={() => showDeleteDialogue(item.id)}
                >
                  <MaterialCommunityIcons
                    name="delete-empty"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>

            </LinearGradient>
          )}
        />
        <Portal>
          <ThemeProvider>
            <Dialog visible={visible} onDismiss={hideDialogue}>
              <Dialog.Content>
                <CustomValidation
                  type="input"
                  control={control}
                  labelStyle={styles.label}
                  name="name"
                  inputStyle={[{ lineHeight: ms(20) }]}
                  label={`${labels.projectName}`}
                  placeholder={`${labels.projectName}`}
                  // onFocus={() => setIsFocused("email")}
                  rules={{
                    required: labels.projectName,
                  }}
                />
                <CustomValidation
                  type="input"
                  control={control}
                  labelStyle={styles.label}
                  name="description"
                  inputStyle={[{ lineHeight: ms(20) }]}
                  label={`${labels.description}`}
                  placeholder={`${labels.description}`}
                  // onFocus={() => setIsFocused("email")}
                  rules={{
                    required: labels.description,
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <TouchableOpacity
                  // onPress={handleSubmit(onSubmit)}
                  style={styles.buttonContainerSave}
                >
                  <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Save</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={hideDialogue}
                  style={styles.buttonContainerClose}
                >
                  <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>Close</ThemedText>
                </TouchableOpacity>
              </Dialog.Actions>
            </Dialog>
          </ThemeProvider>
        </Portal>

        <Portal>
          <ThemeProvider>
            <Dialog visible={deletePopupVisible} onDismiss={hideDeleteDialogue}>
              <Dialog.Title style={styles.dialogueTitle}>Delete Project</Dialog.Title>
              <Dialog.Content>
                <ThemedText style={styles.label}>
                  Do You Want To Really Delete The Project
                </ThemedText>
              </Dialog.Content>
              <Dialog.Actions>
                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.buttonContainerSave}
                >
                  <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Yes</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={hideDeleteDialogue}
                  style={styles.buttonContainerClose}
                >
                  <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>No</ThemedText>
                </TouchableOpacity>
              </Dialog.Actions>
            </Dialog>
          </ThemeProvider>
        </Portal>
      </View>
    </CustomHeader >
  )
}

export default Permissions

const styles = ScaledSheet.create({
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
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
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
    fontSize: 18,
    width: 110,
    color: "white",
    fontWeight: "500",
  },
  cardDot: {
    fontSize: 16,
    color: "white",
    fontWeight: "normal",
  },
  label: {
    fontSize: "16@ms",
    fontWeight: "normal",
    color: "black",
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  buttonContainerClose: {
    borderRadius: 10,
    paddingVertical: 5,
    marginTop: 10,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 0.5,
  },
  buttonContainerSave: {
    backgroundColor: "#E06557",
    borderRadius: 10,
    paddingVertical: 5,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dialogueTitle: {
    fontSize: "14@ms",
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center"
  },
})