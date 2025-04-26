import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CreateOrganizationDocument,
  DeleteOrganizationDocument,
  EnableOrganizationStatusDocument,
  PaginatedOrganizationDocument,
  UpdateOrganizationDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView } from "react-native";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import Modal from "react-native-modal";
import { set, useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/ui/Loader";
import NoDataFound from "@/components/NoDataFound";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";

const defaultValue = {
  name: "",
  description: "",
  id: "",
};

const pickerData = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
  { label: "Pending", value: "pending" },
];

const OrganizationScreen = () => {
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{ name: string; description: string; status: any }>({
    defaultValues: {},
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [organizationList, setOrganizationList] = useState<any>([]);
  const [organizationData, { error, data, loading, refetch }] = useLazyQuery(PaginatedOrganizationDocument);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<{
    name: string;
    description: string;
    id: string;
  }>(defaultValue);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [createOrganization, createOrganizationState] = useMutation(
    CreateOrganizationDocument,
    {
      onCompleted: (data) => {
        reset();
        fetchOrganization(true);
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Organization:Delete");
  const updatePermission = can("MasterApp:Organization:Update");
  const createPermission = can("MasterApp:Organization:Create");
  const statusUpdatePermission = can("MasterApp:Organization:Action");


  //   const ckeckall = hasAny(['MasterApp:Organization:Create', 'MasterApp:Organization:Update', 'MasterApp:Organization:Delete'])

  //  console.log('9999',ckeckall);

  const [updateOrganization, updateOrganizationState] = useMutation(
    UpdateOrganizationDocument,
    {
      onCompleted: (data) => {
        fetchOrganization(true);
        setCurrentOrganization(defaultValue);
        setEditModal(false);
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [deleteOrganization, deleteOrganizationState] = useMutation(
    DeleteOrganizationDocument,
    {
      onCompleted: (data) => {
        fetchOrganization(true);
        setCurrentOrganization(defaultValue);
        setEditModal(false);
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [updateOrganizationStatus, updateOrganizationStatusState] = useMutation(
    EnableOrganizationStatusDocument,
    {
      onCompleted: (data) => {
        fetchOrganization(true);
        setStatusModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  // const setCurrentOrganizationData() => {
  //   setValue("name", currentOrganization?.name)
  //   setValue("description", currentOrganization?.description)
  // }

  useEffect(() => {
    setValue("name", currentOrganization?.name);
    setValue("description", currentOrganization?.description);
  }, [currentOrganization]);

  useEffect(() => {
    fetchOrganization();
  }, [!refreshing]);

  useEffect(() => {
    if (watch("status")) {
      updateOrganizationStatus({
        variables: {
          data: {
            ids: [Number(currentOrganization?.id)],
            status: watch("status")?.value,
          },
        },
      });
    }
  }, [watch("status")]);

  const onSubmit = (data: any) => {
    try {
      let params = {
        name: data?.name,
        description: data?.description,
      };

      editModal
        ? updateOrganization({
          variables: {
            updateOrganizationInput: {
              id: Number(currentOrganization?.id),
              ...params,
            },
          },
        })
        : createOrganization({
          variables: {
            createOrganizationInput: {
              ...data,
            },
          },
        });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };


  const renderItem = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={[
          styles.organizationContainer,
          { backgroundColor: Colors[theme].cartBg },
        ]}
      >
        <View style={styles.organizationHeader}>
          <ThemedText type="subtitle" style={{ flex: 1 }}>
            {item?.name}
          </ThemedText>
          <View style={styles.organizationInfo}>
            {statusUpdatePermission && <MaterialIcons
              name="attractions"
              size={ms(22)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentOrganization({
                  name: item?.name,
                  description: item?.description,
                  id: item?.id,
                });
                setStatusModalVisible(true);
              }}
            />}

            {updatePermission && <Feather
              name="edit"
              size={ms(22)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentOrganization({
                  name: item?.name,
                  description: item?.description,
                  id: item?.id,
                });
                // setCurrentOrganizationData();
                setModalVisible(true);
                setEditModal(true);
              }}
            />}

            {deletePermission && (
              <MaterialIcons
                name="delete-outline"
                size={ms(22)}
                color={Colors[theme].text}
                onPress={() => {
                  Alert.alert("Delete", "Are you sure you want to delete?", [
                    {
                      text: "Yes",
                      onPress: () => {
                        deleteOrganization({
                          variables: {
                            ids: [Number(item?.id)],
                          },
                        });
                      },
                    },
                    { text: "No", onPress: () => { } },
                  ]);
                }}
              />
            )}
          </View>
        </View>
        <ThemedText
          style={[
            styles.status,
            {
              color: item.status == "active" ? Colors?.green : "#6d6d1b",
              backgroundColor: theme == "dark" ? Colors?.white : "#e6e2e2",
            },
          ]}
        >
          {item?.status}
        </ThemedText>
        <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
          {item?.description}
        </ThemedText>
      </View>
    );
  };

  const fetchOrganization = async (isRefreshing = false, searchParams = "") => {

    if (isRefreshing) {
      setPage(1);
      setRefreshing(true);
    }

    const params = {
      limit: 6,
      page: isRefreshing ? 1 : page,
      search: searchParams,
    };

    let res: any = await organizationData({
      variables: {
        listInputDto: params,
      },
      fetchPolicy: "network-only",
    });

    if (res?.data?.paginatedOrganization) {
      const data: any = res?.data?.paginatedOrganization;
      setOrganizationList((prev: any) => {
        const updatedData =
          isRefreshing ? data?.data : [...prev, ...data?.data];
        return updatedData;
      });

      setRefreshing(false);
      setPage((prevPage) => prevPage + 1);
      const lastPage = Math.ceil(data?.meta?.totalItems / 6);
      setHasMore(data?.meta?.currentPage < lastPage);
    } else {
      console.log("API call failed:", res?.errors);
      setRefreshing(false);
      setHasMore(false)
    }
  };


  const debouncedSearch = useCallback(
    debounce((text) => {
      fetchOrganization(true, text);
      console.log(text);
    }, 500),
    [searchQuery]
  );

  if (
    (loading ||
      deleteOrganizationState.loading) &&
    page == 1 &&
    !refreshing
  ) {
    return <Loader />;
  }

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={{ flex: 1 }}>
            <CustomSearchBar
              searchQuery={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                debouncedSearch(text);
              }}
              placeholder={labels?.searchOrganization}
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
          {createPermission && <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setModalVisible(true), setCurrentOrganization(defaultValue);
            }}
          >
            <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
          </Pressable>}
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={organizationList}
            renderItem={({ item, index }: any) => renderItem({ item, index })}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing && !loading}
                onRefresh={async () => {
                  fetchOrganization(true);
                }}
              />
            }
            keyExtractor={(item: any, index: number) => index.toString()}
            contentContainerStyle={{ paddingBottom: vs(40) }}
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
            ListFooterComponent={
              hasMore ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : null
            }
            onEndReached={() => {
              if (hasMore && !loading) {
                fetchOrganization();
              }
            }}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ThemedView>

      {/* create and edit modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          reset();
          setCurrentOrganization(defaultValue);
          setEditModal(false);
          setModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cartBg,
            height: vs(350),
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
            <ThemedText type="subtitle">
              {editModal ? "Edit" : labels?.createOraganization}
            </ThemedText>
            <Pressable
              onPress={() => {
                reset();
                setEditModal(false);
                setCurrentOrganization(defaultValue);
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
              name={"name"}
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Name"}
              onFocus={() => setIsFocused("name")}
              rules={{
                required: editModal
                  ? "Text organization is required"
                  : "Module name is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              type="input"
              control={control}
              name={"description"}
              label={"Description"}
              labelStyle={styles.label}
              onFocus={() => setIsFocused("description")}
              autoCapitalize="none"
            />
          </View>

          <CustomButton
            title="Submit"
            isLoading={
              createOrganizationState.loading || updateOrganizationState.loading
            }
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
            style={{
              backgroundColor: Colors[theme].background,
              marginTop: vs(10),
            }}
          />
        </View>
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
            backgroundColor: Colors[theme].cartBg,
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
            <ThemedText type="subtitle">
              {"Change Status"}
            </ThemedText>
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
          />
        </View>
      </Modal>
    </CustomHeader>
  );
};

export default OrganizationScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: "12@ms",
  },
  selectedContainer: {},
  searchedResult: {
    marginBottom: "12@ms",
    borderRadius: "10@ms",
    padding: "8@ms",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: { marginLeft: "12@ms" },
  organizationParentContainer: {
    marginTop: "12@ms",

  },
  organizationContainer: {
    width: "100%",
    padding: "12@ms",
    borderRadius: "8@ms",
    marginBottom: "16@ms",
    gap: "8@ms",
  },
  organizationHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  organizationInfo: {
    flexDirection: "row",
    gap: '15@ms'
  },
  status: {
    color: "green",
    borderRadius: "10@ms",
    width: "60@ms",
    textAlign: "center",
    fontSize: "12@ms",
  },
  label: {
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
});
