import { View, TouchableOpacity, FlatList, Alert, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { gql, useMutation } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';
import { set, useForm } from "react-hook-form";
import { Colors } from '@/constants/Colors';
import { z } from "zod";
import CustomHeader from '@/components/CustomHeader';
import { ThemedText } from '@/components/ThemedText';
import {useTheme } from '@/context/ThemeContext';
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
  project_name: "",
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
  const [getProjects, { data, refetch, loading: listLoading }] = useLazyQuery(GetAllProjects);


  /// serach state 
  const [searchQuery, setSearchQuery] = useState<string>("");

  /// Add and Edit state
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState<{
    project_name: string,
    description: string,
    id: string,
  }>(defaultValue);


  const [updateProject] = useMutation(UPDATE_PROJECT, {
    onCompleted: (data) => {
      refetch();
      setEditVisible(false);
      setModalVisible(false);
      setCurrentProject(defaultValue)
      Alert.alert("success", "Project create successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });
  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [editVisible, setEditVisible] = useState(false);


  const [createProject,] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: (data) => {
      refetch();
      setEditVisible(false);
      setModalVisible(false);
      setCurrentProject(defaultValue)
      Alert.alert("success", "Project create successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  const onSubmit = (data) => {
    console.log(data);

    const params = {
      name: data?.project_name,
      organizationId: 1,
      description: data?.description
    }

    editVisible ?
      updateProject({
        variables: {
          updateProjectInput: {
            id: Number(currentProject?.id),
            ...params,
          },
        },
      }) :
      createProject({
        variables: {
          createProjectInput: { ...params }
        }
      })
  }

  const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm();

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

  useEffect(() => {
    setValue('project_name', currentProject?.project_name)
    setValue('description', currentProject?.description)
  }, [currentProject])


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
              onPress={() => { setCurrentProject(defaultValue), setModalVisible(true), showDialogue() }}
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
                        onPress={() => {
                          setModalVisible(true), setEditVisible(true)
                          setCurrentProject({
                            id: String(item.id),
                            project_name: item?.name,
                            description: item?.description
                          })
                        }}
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
                  <View style={{ width: 5 }}></View>
                </View>
              )}
              ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
            />
          </View>

          
        </View>
      </ThemedView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setCurrentProject(defaultValue)
          setEditVisible(false);
          setModalVisible(false);
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
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text}
                onPress={() => {
                  setEditVisible(false);
                  setModalVisible(false);
                  setCurrentProject(defaultValue)
                }}
              />
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
