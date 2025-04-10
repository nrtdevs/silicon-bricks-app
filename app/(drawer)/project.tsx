import { View, TouchableOpacity, FlatList, Alert, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { gql, useMutation } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';
import { Dialog, Portal, } from "react-native-paper";
import { useForm } from "react-hook-form";
import { Colors } from '@/constants/Colors';
import { z } from "zod";
import CustomHeader from '@/components/CustomHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import CustomValidation from '@/components/CustomValidation';
import { labels } from '@/constants/Labels';
import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import { ThemedView } from '@/components/ThemedView';
import CustomSearchBar from '@/components/CustomSearchBar';
import NoDataFound from '@/components/NoDataFound';
import Modal from 'react-native-modal';
import CustomButton from '@/components/CustomButton';

interface ProjectData {
  id: number;
  name: string;
  description: string;
  status: string;
}
const defaultValue = {
  name: "",
  module: "",
  description: "",
  id: "",
}
const GetAllProjects = gql`
  query PaginatedProjects($listInputDto: ListInputDTO!) {
    paginatedProjects(ListInputDTO: $listInputDto) {
      data {
        id
        name
        description
        status
        organizationId
      }
    }
  }
`;
const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($createProjectInput: CreateProjectDto!) {
    createProject(createProjectInput: $createProjectInput) {
      id
      name
      description
      status
      organizationId
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: Int!) {
    deleteProject(id: $deleteProjectId)
  }
`;
const UPDATE_PROJECT = gql`
  mutation UpdateProject($updateProjectInput: UpdateProjectDto!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      id
      name
      description
      status
      organizationId
    }
  }
`;

const Project = () => {
  const { theme } = useTheme();

  /// serach state 
  const [searchQuery, setSearchQuery] = useState<string>("");

  /// Add and Edit state
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<{
    name: string;
    description: string;
    id: string;
  }>(defaultValue);

  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [editVisible, setEditVisible] = useState(false);
  const [getProjects, { data, refetch, loading: listLoading }] = useLazyQuery(GetAllProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [createProject, { loading: loadingCreate }] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: (data) => {
      reset()
      Alert.alert("success", "Project create successfully!");
      hideDialogue();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });
  
  const onSubmit = (data) => {
    console.log(data);

    createProject({
      variables: {
        createProjectInput: { ...data, organizationId: 1 }
      }
    })
  }

  const hideDialogue = () => {
    setVisible(false);
    refetch();
  };

  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const showEditDialogue = (project: any) => {
    setSelectedProjectId(project.id);
    reset({ name: project.name, description: project.description });
    setEditVisible(true);
  };
  const hideEditDialogue = () => {
    setEditVisible(false);
    refetch(); // Refresh Project List
  };

  const handleEdit = async (formData: any) => {
    if (!selectedProjectId) {
      console.error("No project selected for update");
      return;
    }
    try {
      const { data } = await updateProject({
        variables: {
          updateProjectInput: {
            id: Number(selectedProjectId),
            name: formData.name,
            description: formData.description,
            organizationId: 1,
          },
        },
      });

      console.log("Project Updated:", data);
      hideEditDialogue();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  useEffect(() => {
    getProjects({
      variables: {
        listInputDto: {
          page: 1,
          limit: 10,
        },
      },
    });
  }, [])


  /// delete project 
  const [deletePermission, deleteOrganizationState] = useMutation(DELETE_PROJECT, {
    onCompleted: (data) => {
      refetch();
      Alert.alert("success", "Permission deleted successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });
  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View>
          <View style={styles.searchContainer}>
            <View style={{ width: "90%" }}>
              <CustomSearchBar
                searchQuery={searchQuery}
                placeholder="Search Project"
                onChangeText={(text) => {
                  setSearchQuery(text);
                }}
              />
            </View>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => { setCurrentPermission(defaultValue), setModalVisible(true), showDialogue() }}
            >
              <Feather name="plus-square" size={24} color={Colors[theme].text} />
            </Pressable>
          </View>

          <View style={styles.scrollContainer}>
            <FlatList
              data={data?.paginatedProjects?.data}
              keyExtractor={(item: ProjectData) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={[
                  styles.organizationContainer,
                  { backgroundColor: Colors[theme].cartBg },
                ]}>
                  <View style={styles.organizationHeader}>
                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.name}</ThemedText>
                    <View style={styles.organizationInfo}>
                      <Feather
                        name="edit"
                        size={ms(20)}
                        color={Colors[theme].text}
                        onPress={() => { setModalVisible(true), setCurrentPermission(defaultValue) }}
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
                                  deletePermission({
                                    variables: {
                                      deleteProjectId: Number(item?.id),
                                    }
                                  });
                                }
                              },
                              { text: "No", onPress: () => { } },
                            ]
                          );

                        }}
                      />
                    </View>
                  </View>
                  <View style={{ width: 100, backgroundColor: item.status == "active" ? "#EAFFF1" : "#FFF8DD", borderColor: item.status == "active" ? "#17C76D" : "#F8B700", borderWidth: 0.5, borderRadius: 5 }}>
                    <ThemedText style={{ color: item.status == "active" ? "#17C76D" : "#F8B700", fontWeight: 'normal', fontSize: 18, paddingHorizontal: 10 }}>{item.status}</ThemedText>
                  </View>

                  <ThemedText style={styles.cardDot}>{item.description}</ThemedText>

                  <Feather
                    name="edit"
                    size={ms(22)}
                    color="black"
                    onPress={() => showEditDialogue(item)}
                  />
                  <View style={{ width: 5 }}></View>
                </View>
              )}
              ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
            />
          </View>


          {/* <TouchableOpacity style={styles.fab}
            onPress={showDialogue}>
            <Feather name="plus" color="black" size={24}></Feather>
          </TouchableOpacity> */}
        </View>

        {/* <Portal>
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
                  onPress={handleSubmit(onSubmit)}
                  style={styles.buttonContainerSave}
                  disabled={loadingCreate}
                >
                  {loadingCreate ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Save</ThemedText>
                  )}
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
        </Portal> */}

        <Portal>
          <ThemeProvider>
            <Dialog visible={editVisible} onDismiss={hideEditDialogue}>
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
                  onPress={hideEditDialogue}
                  style={styles.buttonContainerClose}
                >
                  <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>Close</ThemedText>
                </TouchableOpacity>
              </Dialog.Actions>
            </Dialog>
          </ThemeProvider>
        </Portal>

      </ThemedView>


      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          // reset();
          // setCurrentOrganization(defaultValue);
          // setEditModal(false);
          // setModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cartBg,
            height: vs(330),
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <ThemedText type="subtitle">Create Project
            </ThemedText>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>

          <View style={{ padding: 10 }}>
            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name={"project_name"}
              inputStyle={[{ lineHeight: ms(20) }]}
              label={`${labels.projectName}`}
              // onFocus={() => setIsFocused("name")}
              rules={{
                required: labels.projectName,
              }}
              autoCapitalize="none"
            />
            <CustomValidation
              type="input"
              control={control}
              name={"description"}
              label={`${labels.description}`}
              labelStyle={styles.label}
              //onFocus={() => setIsFocused("description")}
              rules={{
                required: labels.description,
              }}
            />
          </View>
          <CustomButton
            title="Submit"
            // isLoading={createOrganizationState.loading}
            onPress={handleSubmit(onSubmit)}
            style={{ backgroundColor: Colors[theme].background }}
          />
        </View>
      </Modal>

    </CustomHeader>
  );
};

export default Project;

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
    padding: "12@ms",
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
  organizationHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: {},
  organizationParentContainer: {
    marginTop: "12@ms",
  },
  deleteButton: {
    backgroundColor: "#ee0b0b",
    padding: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  input: {
    height: 59,
    borderWidth: 2,
    borderColor: Colors.backgroundColorPrimary,
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#F1F4FF",
  },
  scrollContainer: {
    marginTop: "12@ms",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontSize: "16@ms",
    fontWeight: "normal",
    color: "black",
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  cardTitle: {
    fontSize: "18@ms",
    width: 110,
    color: "black",
    fontWeight: "500",
  },
  cardDot: {
    fontSize: "18@ms",
    color: "black",
    fontWeight: "normal",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#C9C9C9",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  error: {
    color: "red",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  dialogueTitle: {
    fontSize: "14@ms",
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center"
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
});
