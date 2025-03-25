import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import { GetAllProjects } from '@/graphql/Query';
import { useLazyQuery } from '@apollo/client';
import { Dialog, Portal } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { Colors } from '@/constants/Colors';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
interface ProjectData {
  id: number;
  name: string;
  description: string;
  status: string;
}

const Project = () => {
  const [visible, setVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [editVisible, setEditVisible] = useState(false);
  const [getProjects, { data, refetch }] = useLazyQuery(GetAllProjects);
  const datax = data?.paginatedProjects?.data;
  const hideDialogue = () => {
    setVisible(false);
    refetch();
  };
  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });
  const {control,formState: { errors }} = useForm({
    resolver: zodResolver(schema),
  });
  const hideDeleteDialogue = () => {
    refetch();
    setDeletePopupVisible(false);
  };

  const showDeleteDialogue = () => {
    setDeletePopupVisible(true);
  };
  const showEditDialogue = () => {
    setEditVisible(true);
  };
  const hideEditDialogue = () => {
    refetch();
    setEditVisible(false);
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
  }, [getProjects])
  return (
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
                <Text style={styles.cardTitle}>Name</Text>
                <Text style={styles.cardDot}>:</Text>
                <Text style={styles.cardDot}>{item.name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.cardTitle}>Status</Text>
                <Text style={styles.cardDot}>:</Text>
                <Text style={styles.cardDot}>{item.status}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.cardTitle}>Description</Text>
                <Text style={styles.cardDot}>:</Text>
                <Text style={styles.cardDot}>{item.description}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.cardTitle}>Action</Text>
                <Text style={styles.cardDot}>: </Text>
                <TouchableOpacity
                  onPress={() => showEditDialogue()}>
                  <Feather name="edit" color="white" size={24} />
                </TouchableOpacity>
                <View style={{width : 10}}></View>
                <TouchableOpacity
                  onPress={() => showDeleteDialogue()}
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
        <Dialog visible={visible} onDismiss={hideDialogue}>
          <Dialog.Title style={styles.dialogueTitle}>
            Add Project
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="Name..."
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
            <Text style={styles.label}>Description</Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="Description..."
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              // onPress={handleSubmit(onSubmit)}
              style={styles.buttonContainerSave}
            >
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={hideDialogue}
              style={styles.buttonContainerClose}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={editVisible} onDismiss={hideEditDialogue}>
          <Dialog.Title style={styles.dialogueTitle}>Edit Project</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              defaultValue={""}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="Name..."
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
            <Text style={styles.label}>Description</Text>
            <Controller
              control={control}
              name="description"
              defaultValue={""}
              render={({ field: { onChange, onBlur, value } }: any) => (
                <TextInput
                  placeholder="Description..."
                  style={styles.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              // onPress={handleSubmit(handleEdit)}
              style={styles.buttonContainerSave}
            >
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={hideEditDialogue}
              style={styles.buttonContainerClose}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={deletePopupVisible} onDismiss={hideDeleteDialogue}>
          <Dialog.Title style={styles.dialogueTitle}>Delete Project</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.label}>
              Do You Want To Really Delete The Project{" "}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              // onPress={handleDelete}
              style={styles.buttonContainerSave}
            >
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={hideDeleteDialogue}
              style={styles.buttonContainerClose}
            >
              <Text>No</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Project;

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundColorPrimary,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainerClose: {
    backgroundColor: "gray",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainerSave: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});