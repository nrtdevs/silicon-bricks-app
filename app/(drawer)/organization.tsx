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
import { router } from "expo-router";
import CustomCard from "@/components/master/CustomCard";
import { Env } from "@/constants/ApiEndpoints";

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
  const [organizationData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedOrganizationDocument
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<{
    name: string;
    description: string;
    id: string;
  }>(defaultValue);
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
  }, []);

  const onSubmit = (data: any) => {
    try {
      let params = {
        name: data?.name,
        description: data?.description ?? "",
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
      <CustomCard
        name={item?.name}
        status={item?.status}
        description={item?.description}
        editPermission={updatePermission}
        deletePermission={deletePermission}
        statusPermission={statusUpdatePermission}
        onEdit={() => {
          setCurrentOrganization({
            name: item?.name,
            description: item?.description,
            id: item?.id,
          });
          // setCurrentOrganizationData();
          setModalVisible(true);
          setEditModal(true);
        }}
        onDelete={() =>
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
          ])
        }
        onChangeStatus={() => {
          setCurrentOrganization({
            name: item?.name,
            description: item?.description,
            id: item?.id,
          });
          setValue("status", item?.status);
          setStatusModalVisible(true);
        }}
      />
    );
  };
  // console.log('page',data?.paginatedOrganization?.meta?.totalItems);

  const fetchOrganization = async (isRefreshing = false, searchParams = "") => {
    let currentPage = isRefreshing ? 1 : page;

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
      const res: any = await organizationData({
        variables: {
          listInputDto: params,
        },
        fetchPolicy: "network-only",
      });

      if (res?.data?.paginatedOrganization) {
        const data: any = res?.data?.paginatedOrganization;
        const newItems = data?.data || [];

        setOrganizationList((prev: any) => {
          return isRefreshing && currentPage == 1
            ? newItems
            : [...prev, ...newItems];
        });
        const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
        setPage(currentPage + 1);
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


  const debouncedSearch = useCallback(
    debounce((text) => {
      fetchOrganization(true, text);
    }, 500),
    [searchQuery]
  );

  if (
    ((loading && page == 1 && !refreshing) ||
      deleteOrganizationState.loading ||
      updateOrganizationStatusState?.loading)
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
          {createPermission && (
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setModalVisible(true), setCurrentOrganization(defaultValue);
              }}
            >
              <Feather
                name="plus-square"
                size={ms(25)}
                color={Colors[theme].text}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={organizationList}
            renderItem={({ item, index }: any) => renderItem({ item, index })}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing && !loading}
            onRefresh={() => {
              fetchOrganization(true);
            }}
            keyExtractor={(item: any, index: number) => index.toString()}
            contentContainerStyle={{ paddingBottom: vs(60) }}
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
            backgroundColor: Colors[theme].cart,
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
              labelStyle={[styles.label, { color: Colors[theme].text }]}
              onFocus={() => setIsFocused("description")}
              autoCapitalize="none"
            />
          </View>

          <CustomButton
            title="Submit"
            isLoading={
              editModal
                ? updateOrganizationState.loading
                : createOrganizationState.loading
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
            onChangeText={() => {
              const params = {
                ids: [Number(currentOrganization?.id)],
                status: watch("status")?.value,
              };
              watch("status")?.value && updateOrganizationStatus({
                variables: {
                  data: params,
                },
              });
            }}
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
    // padding: "12@ms",
  },
  selectedContainer: {},
  searchedResult: {
    marginBottom: "12@ms",
    borderRadius: "10@ms",
    padding: "8@ms",
  },
  searchContainer: {
    marginHorizontal: "12@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: { marginLeft: "12@ms" },
  organizationParentContainer: {
    // marginTop: "12@ms",
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
    gap: "15@ms",
  },
  status: {
    color: "green",
    borderRadius: "10@ms",
    width: "60@ms",
    textAlign: "center",
    fontSize: "12@ms",
  },
  label: {
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
});
