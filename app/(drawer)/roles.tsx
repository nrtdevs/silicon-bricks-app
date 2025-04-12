import {
  View,
  TouchableOpacity,
  Alert
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useLazyQuery } from '@apollo/client'
import { FlatList } from 'react-native-gesture-handler'
import { Feather, MaterialIcons, } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { gql, useMutation } from "@apollo/client";
import CustomHeader from '@/components/CustomHeader'
import { ThemedText } from '@/components/ThemedText'
import CustomValidation from '@/components/CustomValidation';
import { Dialog, Portal, } from "react-native-paper";
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { ms, ScaledSheet } from 'react-native-size-matters';
import { labels } from '@/constants/Labels';
import { ThemedView } from '@/components/ThemedView';
import CustomSearchBar from '@/components/CustomSearchBar';
import { Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import debounce from "lodash.debounce";



const RoleModule = gql`
  query PaginatedRoles($listInputDto: ListInputDTO!) {
  paginatedRoles(ListInputDTO: $listInputDto) {
    data {
      id
      name
      description
      roleType
      status
      permissionCount
      
    }
  }
}
`;

const Delete_Permission = gql`
  mutation DeletePermission($deletePermissionId: Float!) {
  deletePermission(id: $deletePermissionId)
}
`;

const Update_Permission = gql`
 mutation UpdatePermission($data: UpdatePermissionDto!) {
  updatePermission(data: $data) {
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

const RolesScreen = () => {
  const { theme } = useTheme();
  /// fetch Roles data
  const [page, setPage] = useState<number>(1);
  const [rolesData, { error: errorData, data: dataD, loading: errorLoading, refetch }] = useLazyQuery(
    RoleModule
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchRoles = async (isRefreshing = false) => {
    if (isRefreshing) {
      setPage(1);
      setRefreshing(true);
    }
    const params = {
      per_page_record: 10,
      page: isRefreshing ? 1 : page,
    };

    await rolesData({
      variables: {
        listInputDto: {},
      },
    });;
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  /// serach state 
  const [searchQuery, setSearchQuery] = useState<string>("");

  /// delete role state --
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const showDeleteDialogue = (id: number) => {
    setSelectedProjectId(id);
    setDeletePopupVisible(true);
  };
  const hideDeleteDialogue = () => {
    setDeletePopupVisible(false);
    setSelectedProjectId(null);
  };
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


  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [updatePermission] = useMutation(Update_Permission);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const hideDialogue = () => {
    setVisible(false);
  };


  const handleEdit = async (formData: any) => {
    if (!selectedProjectId) {
      console.error("No project selected for update");
      return;
    }
    try {
      const { data } = await updatePermission({
        variables: {
          data: {
            id: Number(selectedProjectId),
            appName: formData.name,
            description: formData.description,
            module: "",
            action: ""
          },
        },
      });

      console.log("Project Updated:", data);
      hideDialogue();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      // organizationData({
      //     variables: {
      //         listInputDto: {
      //             limit: 10,
      //             page: 1,
      //             search: text,
      //         },
      //     },
      // });
    }, 500),
    [searchQuery]
  );


  return (
    <CustomHeader>

      <ThemedView style={styles.contentContainer}>

        <View style={styles.searchContainer}>
          <View style={{ width: "90%" }}>
            <CustomSearchBar
              searchQuery={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                debouncedSearch(text);
              }}
              placeholder={labels?.searchOrganization}
              // loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
          <Pressable
            style={styles.buttonContainer}
          // onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
          >
            <Feather name="plus-square" size={24} color={Colors[theme].text} />
          </Pressable>
        </View>

        <View style={styles.organizationParentContainer}>
          <FlatList
            data={dataD?.paginatedRoles?.data}
            renderItem={({ item, index }: any) =>
              <View
                key={index}
                style={[
                  styles.organizationContainer,
                  { backgroundColor: Colors[theme].cartBg },
                ]}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <ThemedText style={styles.name}>{item.name}</ThemedText>
                  <View style={styles.organizationInfo}>
                    <Feather
                      name="edit"
                      size={ms(20)}
                      color="black"
                      onPress={showDialogue}
                    />
                    <View style={{ width: 5 }}></View>
                    <MaterialIcons
                      name="delete-outline"
                      size={ms(22)}
                      color={Colors[theme].text}
                      onPress={() => {
                        Alert.alert(
                          "Delete",
                          "Are you sure you want to delete?",
                          [
                            {
                              text: "Yes", onPress: () => {
                                // deleteRoles({
                                //   variables: {
                                //     deletePlanId: Number(item?.id),
                                //   }
                                // });
                              }
                            },
                            { text: "No", onPress: () => { } },
                          ]
                        );

                      }}
                    />
                  </View>

                </View>
                <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                  {item?.description}
                </ThemedText>
              </View>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ThemedView>

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
                onPress={handleSubmit(handleEdit)}
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
    </CustomHeader >
  )
}

export default RolesScreen

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
    padding: "12@ms",
  },
  innerContainer: {
    paddingVertical: 10
  },
  buttonContainer: {},
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  organizationParentContainer: {
    marginTop: "12@ms",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  organizationContainer: {
    width: "100%",
    padding: "12@ms",
    borderRadius: "8@ms",
    marginBottom: "16@ms",
    gap: "8@ms",
  },
  organizationInfo: {
    flexDirection: "row",
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
    color: "black",
    fontWeight: "500",
  },
  cardDot: {
    fontSize: 16,
    color: "black",
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