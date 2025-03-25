import { GetAllOrganisations } from "@/graphql/Query";
import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { z } from "zod";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import {
  Text,
  ActivityIndicator,
  Dialog,
  Portal,
  FAB,
} from "react-native-paper";

import Feather from "@expo/vector-icons/Feather";
import { Controller, useForm } from "react-hook-form";
import {
  AddOrganization,
  DeleteOrgaization,
  UpdateOrganization,
} from "@/graphql/Mutations";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

interface OrganizationData {
  id: number;
  name: string;
  description: string;
  status: string;
}

const Organization = () => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [viewButtonVisible, setViewButtonVisible] = useState(false);

  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationData | null>(null);

  const [deleteOrganizationId, setDeleteOrganizationId] = useState<
    number | null
  >(null);

  const [createAddRequestOrganization] = useMutation(AddOrganization);
  const [updateOrganization] = useMutation(UpdateOrganization);
  const [deleteOrganization] = useMutation(DeleteOrgaization);

  const showDialogue = () => setVisible(true);
  const hideDialogue = () => {
    setVisible(false);
    refetch();
  };
  const showEditDialogue = (organization: OrganizationData) => {
    setSelectedOrganization(organization);
    setEditVisible(true);
  };
  const hideEditDialogue = () => {
    refetch();
    setEditVisible(false);
  };
  const showDeleteDialogue = (organization: OrganizationData) => {
    setDeleteOrganizationId(organization.id);
    setDeletePopupVisible(true);
  };
  const hideDeleteDialogue = () => {
    refetch();
    setDeletePopupVisible(false);
  };

  const showViewButton = (organization: OrganizationData) => {
    setSelectedOrganization(organization);
    setViewButtonVisible(true);
  };
  const hideViewButton = () => {
    setViewButtonVisible(false);
  };

  const [getOrganizations, { data, loading, refetch, error }] =
    useLazyQuery(GetAllOrganisations);

  useEffect(() => {
    getOrganizations({
      variables: {
        listInputDto: {
          page: 1,
          limit: 10,
        },
      },
    });
  }, [getOrganizations]);

  const datax = data?.paginatedOrganization?.data;

  const statusStyle = (status: string) => {
    switch (status) {
      case "active":
        return styles.score;
      case "inactive":
        return styles.score;
      case "pending":
        return styles.score;
      case "blocked":
        return styles.score;
    }
  };

  const schema = z.object({
    name: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const AddOrganization = await createAddRequestOrganization({
        variables: {
          createOrganizationInput: {
            name: data.name,
            description: data.description,
          },
        },
      });

      refetch();
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleEdit = async (data: any) => {
    if (!selectedOrganization) return;
    let param = {
      id: Number(selectedOrganization.id),
      name: data.name,
      description: data.description,
    };
    try {
      const UpdateEditOrganization = await updateOrganization({
        variables: {
          updateOrganizationInput: param,
        },
      });

      refetch();
      setEditVisible(false);
    } catch (error) {
      console.log("error", error);
    }
    reset();
  };

  const handleView = async (data: any) => {
    if (!selectedOrganization) return;
    let param = {
      id: Number(selectedOrganization.id),
      name: data.name,
      description: data.description,
    };
    try {
      const UpdateEditOrganization = await updateOrganization({
        variables: {
          updateOrganizationInput: param,
        },
      });

      refetch();
      setEditVisible(false);
    } catch (error) {
      console.log("error", error);
    }
    reset();
  };

  const handleDelete = async () => {
    try {
      const DeleteOrganization = await deleteOrganization({
        variables: {
          deleteOrganizationId: Number(deleteOrganizationId),
        },
      });

      refetch();
      setDeletePopupVisible(false);
    } catch (error) {
      console.log("error", error);
    }
    reset();
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  if (error) {
    return <Text>Error fetching organizations: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={datax}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>
                {item.name.slice(0, 20)}
                {item.name.length > 15 && "..."}
              </Text>

              {/* <Text style={styles.title}>{item.description}</Text> */}
            </View>
            <View style={styles.actions}>
              {/* <View style={styles.scoreContainer}>
                <Text style={statusStyle(item.status)}>{item.status}</Text>
              </View> */}

              <TouchableOpacity
                onPress={() => showViewButton(item)}
                style={styles.ViewButton}
              >
                <Feather name="eye" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => showEditDialogue(item)}
                style={styles.editButton}
              >
                <Feather name="edit" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => showDeleteDialogue(item)}
                style={styles.deleteButton}
              >
                <MaterialCommunityIcons
                  name="delete-empty"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item: OrganizationData) => item.id.toString()}
      />

      {/* Floating Action Button (FAB) */}
      <View style={styles.fabButtonContainer}>
        <FAB
          icon="plus"
          style={styles.fabButton}
          color="white"
          onPress={showDialogue}
        />
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialogue}>
          <Dialog.Title style={styles.dialogueTitle}>
            Add Organization
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
              onPress={handleSubmit(onSubmit)}
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
          <Dialog.Title style={styles.dialogueTitle}>Edit Org</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              defaultValue={selectedOrganization?.name || ""}
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
              defaultValue={selectedOrganization?.description || ""}
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
              onPress={handleSubmit(handleEdit)}
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
        <Dialog visible={viewButtonVisible} onDismiss={hideViewButton}>
          <Dialog.Title style={styles.dialogueTitle}>View Org</Dialog.Title>
          <Dialog.Content>
            <View style={styles.dialogueContent}>
              <Text style={styles.viewLabel}>Name : </Text>
              <Text style={styles.viewLabelFooter}>
                {selectedOrganization?.name}
              </Text>
            </View>
            <View style={styles.dialogueContent}>
              <Text style={styles.viewLabel}>Description : </Text>
              <Text style={styles.viewLabelFooter}>
                {selectedOrganization?.description}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              onPress={hideViewButton}
              style={styles.buttonContainerClose}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={deletePopupVisible} onDismiss={hideDeleteDialogue}>
          <Dialog.Title style={styles.dialogueTitle}>Delete Org</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.label}>
              Do You Want To Really Delete The Organization{" "}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity
              onPress={handleDelete}
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

export default Organization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fabButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  fabButton: {
    backgroundColor: Colors.backgroundColorPrimary,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.backgroundColorPrimary,
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  error: {
    color: "red",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
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
  dialogueTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainerSave: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainerClose: {
    backgroundColor: "gray",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#8ea8ff6e",
    backgroundColor: "#dadada",
    padding: 10,
    margin: 8,
    borderRadius: 12,
    height: 80,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "black !important",
    backgroundColor: "#ff00aa",
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 8,
  },
  score: {
    color: "blue",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ee0b0b",
    padding: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 20,
    marginRight: 3,
  },
  ViewButton: {
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  dialogueContent: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Make sure items are vertically aligned
    position: "relative",
    flexWrap: "nowrap", // Prevent wrapping, so items stay in a single line
  },

  viewLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
    maxWidth: "40%", // Adjust as per your layout requirement
    flexShrink: 1,
  },

  viewLabelFooter: {
    fontSize: 16,
    color: "black",
    position: "relative",
    maxWidth: "55%", // Adjust as per your layout requirement
    flexShrink: 1,
  },
});
