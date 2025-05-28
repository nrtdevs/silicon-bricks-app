import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangeUserStatusDocument,
  DeleteUserDocument,
  PaginatedUsersDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import Modal from "react-native-modal";
import { set, useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import * as FileSystem from "expo-file-system";
import debounce from "lodash.debounce";
import { Env } from "@/constants/ApiEndpoints";
import { useUserContext } from "@/context/RoleContext";
import NoDataFound from "@/components/NoDataFound";
import CustomUserCard from "@/components/master/CustomUserCard";
import { router, useFocusEffect } from "expo-router";
import { FAB } from "@rneui/themed";
import Loader from "@/components/ui/Loader";

const defaultValue = {
  name: "",
  email: "",
  phoneNo: "",
  roles: [],
  usertype: "",
  id: "",
  imagePath: "",
  designation: "",
};
const userTypeData = [
  { label: "admin", value: "admin" },
  { label: "adminEmployee", value: "adminEmployee" },
  { label: "organization", value: "organization" },
  { label: "organizationEmployee", value: "organizationEmployee" },
];

const designationData = [
  { label: "CEO", value: "CEO" },
  { label: "CTO", value: "CTO" },
  { label: "Employee", value: "EMPLOYEE" },
  { label: "HR", value: "HR" },
  { label: "Manager", value: "MANAGER" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Team Lead", value: "TEAM_LEAD" },
];

const pickerData = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
  { label: "Pending", value: "pending" },
];

const UserScreen = () => {
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{
    name: string;
    email: string;
    phoneNo: string;
    roles: any[];
    usertype: any;
    status: any;
    designation: any;
  }>({
    defaultValues: {},
  });
  const [image, setImage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [isHierarchyModalVisible, setHierarchyModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [userList, setUserLIst] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phoneNo: string;
    roles: any[];
    usertype: any;
    id: string;
    imagePath: string;
    designation: string;
  }>(defaultValue);

  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:User:Delete");
  const readPermission = can("MasterApp:User:Read");
  const updatePermission = can("MasterApp:User:Update");
  const createPermission = can("MasterApp:User:Create");
  const statusUpdatePermission = can("MasterApp:User:Action");

  const [userData, { error, data, loading, refetch }] = useLazyQuery<any>(
    PaginatedUsersDocument
  );

  const [updateUserStatus, updateUserStatusState] = useMutation(ChangeUserStatusDocument, {
    onCompleted: (data) => {
      fetchUser(true);
      setStatusModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [deleteUser, deleteUserState] = useMutation(DeleteUserDocument, {
    onCompleted: (data) => {
      reset();
      fetchUser(true);
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  //test

  useEffect(() => {
    setValue("name", currentUser?.name);
    setValue("email", currentUser?.email);
    setValue("phoneNo", currentUser?.phoneNo);
    setValue("roles", currentUser?.roles);
    setValue("usertype", currentUser?.usertype);
    setValue("designation", currentUser?.designation);
  }, [currentUser]);


  useFocusEffect(
    useCallback(() => {
      fetchUser(true);
    }, [])
  );

  const renderItem = ({ item, index }: any) => {
    let rolesId = item?.roles?.map((item: any) => {
      return item?.id
    })
    return (
      <CustomUserCard
        name={item?.name}
        status={item?.status}
        email={item?.email}
        mobileNo={item?.mobileNo.toString()}
        readPermission={readPermission}
        editPermission={updatePermission}
        deletePermission={deletePermission}
        statusPermission={statusUpdatePermission}
        onEdit={() => {
          router.push({
            pathname: "/addEditUser",
            params: {
              data: JSON.stringify(item),
            },
          })
        }}
        onDelete={() =>
          Alert.alert("Delete", "Are you sure you want to delete?", [
            {
              text: "Yes",
              onPress: () => {
                deleteUser({
                  variables: {
                    ids: [Number(item?.id)],
                  }
                });
              },
            },
            { text: "No", onPress: () => { } },
          ])
        }
        onChangeStatus={() => {
          setCurrentUser({
            name: item?.name,
            email: item?.email,
            phoneNo: item.mobileNo.toString(),
            roles: rolesId,
            usertype: item?.userType,
            id: item?.id,
            imagePath: item?.avatar,
            designation: item?.designation,
          });
          setValue("status", item?.status);
          setImage(item?.avatar)
          setStatusModalVisible(true);
        }}
        onView={() => {
          setCurrentUser({
            name: item?.name,
            email: item?.email,
            phoneNo: item.mobileNo.toString(),
            roles: rolesId,
            usertype: item?.userType,
            id: item?.id,
            imagePath: item?.avatar,
            designation: item?.designation,

          });
          setInfoModalVisible(true);
        }}
      />
    );
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      fetchUser(true, text);
    }, 500),
    [searchQuery]
  );

  const fetchUser = async (isRefreshing = false, searchParams = "") => {
    const currentPage = isRefreshing ? 1 : page;
    if (isRefreshing) {
      setRefreshing(true);
      setPage(1);
    }
    const params = {
      limit: Env?.LIMIT,
      page: currentPage,
      search: searchParams,
    };

    try {
      const res: any = await userData({
        variables: {
          listInputDto: params,
        },
        fetchPolicy: "network-only",
      });

      if (res?.data?.paginatedUsers) {
        const data: any = res?.data?.paginatedUsers;
        const newItems = data?.data || [];

        setUserLIst((prev: any) => {
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

  if (
    ((loading && page == 1 && !refreshing) ||
      deleteUserState.loading ||
      updateUserStatusState?.loading)
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
              placeholder={labels?.searchUser}
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={userList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing && !loading}
            onRefresh={() => {
              fetchUser(true);
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
                fetchUser();
              }
            }}
            onEndReachedThreshold={0.5}
            initialNumToRender={8}
            maxToRenderPerBatch={5}
            windowSize={7}
            removeClippedSubviews={true}
          />
        </View>
      </ThemedView>


      {/* user info modal */}
      <Modal
        isVisible={isInfoModalVisible}
        onBackdropPress={() => {
          setInfoModalVisible(false);
          setCurrentUser(defaultValue);
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
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: ms(10),
            }}
          >
            <ThemedText type="subtitle">User</ThemedText>
            <Pressable
              onPress={() => {
                setCurrentUser(defaultValue);
                setInfoModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors[theme].text,
              borderStyle: "dashed",
            }}
          />
          <View style={{ gap: vs(10), padding: ms(10) }}>
            <View>
              <ThemedText type="subtitle">Name</ThemedText>
              <ThemedText type="default">{currentUser?.name}</ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">Email</ThemedText>
              <ThemedText type="default">{currentUser?.email}</ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">Phone No</ThemedText>
              <ThemedText type="default">{currentUser?.phoneNo}</ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">User Type</ThemedText>
              <ThemedText type="default">{currentUser?.usertype}</ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">Designation</ThemedText>
              <ThemedText type="default">{currentUser?.designation}</ThemedText>
            </View>
          </View>
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
            onChangeText={() => {
              const params = {
                ids: [Number(currentUser.id)],
                status: watch('status')?.value,
              };
              updateUserStatus({ variables: { data: params } });
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

      {createPermission && <FAB
        size="large"
        title="Add User"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 30,
        }}
        icon={{
          name: "add",
          color: "white",
        }}
        onPress={() => router.push("/addEditUser")}
      />}

    </CustomHeader>
  );
};

export default UserScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  selectedContainer: {
    position: "absolute",
    top: "60@vs",
    alignSelf: "center",
  },
  searchedResult: {
    marginBottom: "12@ms",
    borderRadius: "10@ms",
    padding: "8@ms",
  },
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: '12@s',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12@ms",
  },
  buttonContainer: { marginLeft: "12@ms" },
  organizationParentContainer: {
  },
  organizationContainer: {
    width: "100%",
    padding: "12@ms",
    borderRadius: "8@ms",
    marginBottom: "16@ms",
    gap: "8@ms",
  },
  organizationHeader: {
    flex: 1,
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
    color: Colors.grayText,
    fontSize: "14@ms",
    marginBottom: "12@ms",
    fontWeight: 400,
  },
  userInfo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: '70@ms',
    height: '70@ms',
    borderRadius: '70@ms',
    marginBottom: '12@ms',
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: ms(50),
    resizeMode: 'cover',
  },
  editImage: {
    position: 'absolute',
    top: 3,
    left: 50,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
