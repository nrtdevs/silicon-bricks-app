import { View, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import { gql, useMutation } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';
import { Dialog, Portal, } from "react-native-paper";
import { useForm } from "react-hook-form";
import { Colors } from '@/constants/Colors';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomHeader from '@/components/CustomHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemeProvider } from '@/context/ThemeContext';
import CustomValidation from '@/components/CustomValidation';
import { labels } from '@/constants/Labels';
import { ms, ScaledSheet } from 'react-native-size-matters';

interface ProjectData {
  id: number;
  name: string;
  description: string;
  status: string;
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
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [visible, setVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [editVisible, setEditVisible] = useState(false);
  const [getProjects, { data, refetch,loading:listLoading }] = useLazyQuery(GetAllProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const datax = data?.paginatedProjects?.data;
  
  const [createProject, { loading:loadingCreate }] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: (data) => {
      reset()
      Alert.alert("success", "Project create successfully!");
      hideDialogue();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });
  type fromDataType = {
    name: string;
    description: string;
  }
  const onSubmit = (fromData: fromDataType) => {
    createProject({
      variables: {
        createProjectInput: { ...fromData, organizationId: 1 }
      }
    })
  }

  const hideDialogue = () => {
    setVisible(false);
    refetch();
  };
  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
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

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      console.log("Project deleted successfully");
      setDeletePopupVisible(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  const showDeleteDialogue = (id: number) => {
    setSelectedProjectId(id);
    setDeletePopupVisible(true);
  };

  const hideDeleteDialogue = () => {
    setDeletePopupVisible(false);
    setSelectedProjectId(null);
  };

  const handleDelete = async () => {
    if (selectedProjectId !== null) {
      try {
        await deleteProject({ variables: { deleteProjectId: Number(selectedProjectId)} });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if(listLoading) return <ActivityIndicator size={'large'} style={{flex:1,justifyContent:'center',alignItems:'center'}} />
  return (
    <CustomHeader>
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <FlatList
            data={datax}
            keyExtractor={(item: ProjectData) => item.id.toString()}
            renderItem={({ item }) => (
              <LinearGradient
                colors={["#0a54c9", "#5087de"]}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={{ flexDirection: "row" }}>
                  <ThemedText style={styles.cardTitle}>Name</ThemedText>
                  <ThemedText style={styles.cardDot}>:</ThemedText>
                  <ThemedText style={styles.cardDot}>{item.name}</ThemedText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <ThemedText style={styles.cardTitle}>Status</ThemedText>
                  <ThemedText style={styles.cardDot}>:</ThemedText>
                  <ThemedText style={styles.cardDot}>{item.status}</ThemedText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <ThemedText style={styles.cardTitle}>Description</ThemedText>
                  <ThemedText style={styles.cardDot}>:</ThemedText>
                  <ThemedText style={styles.cardDot}>{item.description}</ThemedText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <ThemedText style={styles.cardTitle}>Action</ThemedText>
                  <ThemedText style={styles.cardDot}>: </ThemedText>
                  <TouchableOpacity
                    onPress={() => showEditDialogue(item)}>
                    <Feather name="edit" color="white" size={24} />
                  </TouchableOpacity>
                  <View style={{ width: 10 }}></View>
                  <TouchableOpacity
                   onPress={() => showDeleteDialogue(item.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete-empty"
                      size={26}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />

        </View>
        <TouchableOpacity style={styles.fab}
          onPress={showDialogue}>
          <Feather name="plus" color="white" size={24}></Feather>
        </TouchableOpacity>

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
        </Portal>

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
    </CustomHeader>
  );
};

export default Project;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    paddingBottom: 100,
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
    fontSize: 18,
    width: 110,
    color: "white",
    fontWeight: "500",
  },
  cardDot: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "normal",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#0a54c9",
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
