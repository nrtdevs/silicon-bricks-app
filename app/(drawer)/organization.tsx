import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CreateOrganizationDocument, DeleteOrganizationDocument, EnableOrganizationStatusDocument, PaginatedOrganizationDocument, UpdateOrganizationDocument } from "@/graphql/generated";
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

const defaultValue = {
  name: "",
  description: "",
  id: "",
}

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
    setValue
  } = useForm<{ name: string, description: string, status: any }>({
    defaultValues: {},
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [organizationData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedOrganizationDocument
  );
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
  const [createOrganization, createOrganizationState] = useMutation(CreateOrganizationDocument, {
    onCompleted: (data) => {
      reset()
      refetch();
      setModalVisible(false);
      Alert.alert("success", "Project create successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  const [updateOrganization, updateOrganizationState] = useMutation(UpdateOrganizationDocument, {
    onCompleted: (data) => {
      reset()
      refetch();
      setEditModal(false);
      setModalVisible(false);
      Alert.alert("success", "Project updated successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  const [deleteOrganization, deleteOrganizationState] = useMutation(DeleteOrganizationDocument, {
    onCompleted: (data) => {
      refetch();
      Alert.alert("success", "Project deleted successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  const [updateOrganizationStatus, updateOrganizationStatusState] = useMutation(EnableOrganizationStatusDocument, {
    onCompleted: (data) => {
      refetch();
      setStatusModalVisible(false);
      Alert.alert("success", "Status updated successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  // const setCurrentOrganizationData() => {
  //   setValue("name", currentOrganization?.name)
  //   setValue("description", currentOrganization?.description)
  // }

  useEffect(() => {
    setValue("name", currentOrganization?.name)
    setValue("description", currentOrganization?.description)
  }, [currentOrganization])

  useEffect(() => {
    fetchOrganization();
  }, []);

  useEffect(() => {
    if (watch("status")) {
      updateOrganizationStatus({
        variables: {
          data: {
            id: Number(currentOrganization?.id),
            status: watch("status")?.value
          }
        },
      });
    }
  }, [watch("status")])

  const onSubmit = (data: any) => {
    try {
      let param = {
        id: Number(currentOrganization?.id),
        ...data
      }
      editModal ?
        updateOrganization({
          variables: {
            updateOrganizationInput: param,
          },
        })
        : createOrganization({
          variables: {
            createOrganizationInput: {
              ...data
            },
          },
        });
    } catch (error) {
      console.log('onSubmit error', error);
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
          <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.name}</ThemedText>
          <View style={styles.organizationInfo}>
            <MaterialIcons
              name="attractions"
              size={ms(20)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentOrganization({
                  name: item?.name,
                  description: item?.description,
                  id: item?.id,
                });
                setStatusModalVisible(true);
              }}
            />
            <Feather
              name="edit"
              size={ms(20)}
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
            />
            <MaterialIcons
              name="delete-outline"
              size={ms(20)}
              color={Colors[theme].text}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete?",
                  [
                    {
                      text: "Yes", onPress: () => {
                        deleteOrganization({
                          variables: {
                            deleteOrganizationId: Number(item?.id),
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
        <ThemedText
          style={[
            styles.status,
            {
              color:
                item.status == "active" ? Colors?.green : "#6d6d1b",
              backgroundColor:
                theme == "dark" ? Colors?.white : "#e6e2e2",
            },
          ]}
        >
          {item?.status}
        </ThemedText>
        <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
          {item?.description}
        </ThemedText>
      </View>
    )
  }

  const fetchOrganization = async (isRefreshing = false) => {
    if (isRefreshing) {
      setPage(1);
      setRefreshing(true);
    }

    const params = {
      per_page_record: 10,
      page: isRefreshing ? 1 : page,
    };

    await organizationData({
      variables: {
        listInputDto: {},
      },
    });;
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      organizationData({
        variables: {
          listInputDto: {
            limit: 10,
            page: 1,
            search: text,
          },
        },
      });
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
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
          >
            <Feather name="plus-square" size={24} color={Colors[theme].text} />
          </Pressable>
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={data?.paginatedOrganization?.data}
            renderItem={({ item, index }: any) => renderItem({ item, index })}
            showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => fetchOrganization(true)}
            //   />
            // }
            contentContainerStyle={{ paddingBottom: vs(40) }}
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
          // ListFooterComponent={
          //   hasMore ? (
          //     <ActivityIndicator size="small" color={Colors.primary} />
          //   ) : null
          // }
          // onEndReached={() => {
          //   if (hasMore && !isLoading) {
          //     fetchNotification();
          //   }
          // }}
          // onEndReachedThreshold={0.5}
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
            height: vs(400),
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
              bottom: 30
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
                required: editModal ? "Text organization is required" : "Module name is required"
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
              rules={{
                required: editModal ? "Test organization description is required" : "Description is required",
              }}
            />
          </View>

          <CustomButton
            title="Submit"
            isLoading={createOrganizationState.loading || updateOrganizationState.loading}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
            style={{ backgroundColor: Colors[theme].background, marginTop: vs(10) }}
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
            height: 380,
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <CustomValidation
            data={pickerData}
            type="picker"
            hideStar
            control={control}
            name="status"
            placeholder="Select Status"
            inputStyle={{ height: vs(50) }}
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
  selectedContainer: {

  },
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
  buttonContainer: {},
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
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
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
