import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { set, useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { z } from "zod";
import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import CustomValidation from "@/components/CustomValidation";
import { labels } from "@/constants/Labels";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ThemedView } from "@/components/ThemedView";
import CustomSearchBar from "@/components/CustomSearchBar";
import NoDataFound from "@/components/NoDataFound";
import Modal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import {
  CreateProjectDocument,
  DeleteProjectDocument,
  EnableProjectStatusDocument,
  PaginatedProjectsDocument,
  UpdateProjectDocument,
} from "@/graphql/generated";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";
import CustomCard from "@/components/master/CustomCard";
import { Env } from "@/constants/ApiEndpoints";
import Loader from "@/components/ui/Loader";

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
};

const pickerData = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
  { label: "Pending", value: "pending" },
];

const Project = () => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const showDialogue = () => setVisible(true);
  const [editVisible, setEditVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [projectList, setProjectList] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<{
    project_name: string;
    description: string;
    id: string;
  }>(defaultValue);
  const { can, hasAny } = useUserContext();
  const deletePermission = can("MasterApp:Project:Delete");
  const updatePermission = can("MasterApp:Project:Update");
  const createPermission = can("MasterApp:Project:Create");
  const statusUpdatePermission = can("MasterApp:Project:Action");

  const [getProjects, { data, refetch, loading }] = useLazyQuery<any>(
    PaginatedProjectsDocument
  );

  const [updateProject] = useMutation(UpdateProjectDocument, {
    onCompleted: (data) => {
      reset();
      fetchProject(true);
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [createProject] = useMutation(CreateProjectDocument, {
    onCompleted: (data) => {
      reset();
      fetchProject(true);
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updateProjectStatus, updateProjectStatusState] = useMutation(EnableProjectStatusDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setStatusModalVisible(false);
      fetchProject(true);
    },
    onError: (error) => {
      setStatusModalVisible(false);
      Alert.alert("Error", error.message);
    },
  });

  const [deleteProject, deleteProjectState] = useMutation(
    DeleteProjectDocument,
    {
      onCompleted: (data) => {
        refetch();
        fetchProject(true);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const onSubmit = (data) => {
    const params = {
      name: data?.project_name,
      organizationId: 1,
      description: data?.description,
    };

    editVisible
      ? updateProject({
        variables: {
          updateProjectInput: {
            id: Number(currentProject?.id),
            ...params,
          },
        },
      })
      : createProject({
        variables: {
          createProjectInput: { ...params },
        },
      });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    setValue("project_name", currentProject?.project_name);
    setValue("description", currentProject?.description);
  }, [currentProject]);

  const debouncedSearch = useCallback(
    debounce((text) => {
      fetchProject(true, text);
    }, 500),
    [searchQuery]
  );

  const fetchProject = async (isRefreshing = false, searchParams = "") => {
    const currentPage = isRefreshing ? 1 : page;

    if (isRefreshing) {
      setRefreshing(true);
      setPage(1);
    }
    const params = {
      limit: Env?.LIMIT as number,
      page: currentPage,
      search: searchParams,
    };

    try {
      const res: any = await getProjects({
        variables: {
          listInputDto: params,
        },
        fetchPolicy: "network-only",
      });

      if (res?.data?.paginatedProjects) {
        const data: any = res?.data?.paginatedProjects;
        const newItems = data?.data || [];

        setProjectList((prev: any) => {
          return isRefreshing && currentPage == 1
            ? newItems
            : [...prev, ...newItems];
        });
        const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
        setPage(currentPage + 1);
        if (isRefreshing) setRefreshing(false);
        setHasMore(currentPage < lastPage);
        setRefreshing(false);
      } else {
        console.log("API call failed or returned no data:", res?.errors);
        setRefreshing(false);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setRefreshing(false);
      setHasMore(false);
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <CustomCard
        name={item?.name}
        status={item?.status}
        description={item?.description}
        editPermission={updatePermission}
        deletePermission={deletePermission}
        statusPermission={statusUpdatePermission}
        onEdit={() => {
          setCurrentProject({
            id: String(item.id),
            project_name: item?.name,
            description: item?.description,
          });
          setModalVisible(true);
        }}
        onDelete={() =>
          Alert.alert("Delete", "Are you sure you want to delete?", [
            {
              text: "Yes",
              onPress: () => {
                deleteProject({
                  variables: {
                    ids: [Number(item?.id)],
                  },
                });
              },
            },
            { text: "No", onPress: () => { } },
          ])
        }
        onChangeStatus={() => {
          setProjectId(item.id);
          setValue('status', item?.status);
          setStatusModalVisible(true);
        }}
      />
    );
  };

  if (
    ((loading && page == 1 && !refreshing) ||
      deleteProjectState.loading ||
      updateProjectStatusState?.loading)
  ) {
    return <Loader />;
  }

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View>
          <View style={styles.searchContainer}>
            <View style={{ flex: 1 }}>
              <CustomSearchBar
                searchQuery={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  debouncedSearch(text);
                }}
                placeholder={labels?.searchProject}
                loading={loading}
                onClear={() => {
                  setSearchQuery("");
                }}
              />
            </View>
            {createPermission && (
              <Pressable
                style={styles.buttonContainer}
                onPress={() => {
                  setCurrentProject(defaultValue),
                    setModalVisible(true),
                    showDialogue();
                }}
              >
                {createPermission && (
                  <Feather
                    name="plus-square"
                    size={ms(25)}
                    color={Colors[theme].text}
                  />
                )}
              </Pressable>
            )}
          </View>

          <View style={styles.scrollContainer}>
            <FlatList
              data={projectList}
              renderItem={({ item, index }: any) => renderItem({ item, index })}
              showsVerticalScrollIndicator={false}
              refreshing={refreshing && !loading}
              onRefresh={() => {
                fetchProject(true);
              }}
              keyExtractor={(item: any, index: number) => index.toString()}
              contentContainerStyle={{ paddingBottom: vs(100) }}
              ListEmptyComponent={!loading ? <NoDataFound /> : null}
              ListFooterComponent={
                hasMore ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : null
              }
              onEndReached={() => {
                if (hasMore && !loading) {
                  fetchProject();
                }
              }}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      </ThemedView>

      {/* create and edit modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setCurrentProject(defaultValue);
          setEditVisible(false);
          setModalVisible(false);
        }}
      >
        <ThemedView>
          <View
            style={{
              backgroundColor: Colors[theme].cart,
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
              <ThemedText type="subtitle">Create Project</ThemedText>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Entypo
                  name="cross"
                  size={ms(20)}
                  color={Colors[theme].text}
                  onPress={() => {
                    setCurrentProject(defaultValue);
                    setEditVisible(false);
                    setModalVisible(false);
                  }}
                />
              </Pressable>
            </View>

            <View style={{ padding: 10 }}>
              <CustomValidation
                type="input"
                control={control}
                labelStyle={styles?.label}
                name={"project_name"}
                label={`${labels.projectName}`}
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
              />
            </View>
            <CustomButton
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: Colors[theme].background,
                marginTop: 20,
              }}
            />
          </View>
        </ThemedView>
      </Modal>

      {/* status modal */}
      <Modal
        isVisible={isStatusModalVisible}
        onBackdropPress={() => {
          setStatusModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cart,
            height: vs(320),
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <ThemedText type="subtitle">{"Change Status"}</ThemedText>
            <Pressable
              onPress={() => {
                setStatusModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>
          <CustomValidation
            data={pickerData}
            type="picker"
            hideStar
            control={control}
            name="status"
            placeholder="Select Status"
            inputStyle={{ height: vs(50), marginTop: 0, paddingTop: 0 }}
            inputContainerStyle={{ marginTop: 0, paddingTop: 0 }}
            containerStyle={{ marginTop: 0, paddingTop: 0 }}
            rules={{
              required: {
                value: true,
                message: "Select status",
              },
            }}
            onChangeText={() => {
              updateProjectStatus({
                variables: {
                  data: {
                    ids: [Number(projectId)],
                    status: watch("status")?.value,
                  },
                },
              });
            }}
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
    gap: "15@ms",
  },
  organizationHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    marginHorizontal: '12@ms',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: { marginLeft: "12@ms" },
  organizationParentContainer: {
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
    alignSelf: "center",
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
  status: {
    color: "green",
    borderRadius: "10@ms",
    width: "60@ms",
    textAlign: "center",
    fontSize: "12@ms",
  },
});


