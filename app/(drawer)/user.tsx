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
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ChangeUserStatusDocument,
  CreateOrganizationDocument,
  CreateUserDocument,
  DeleteOrganizationDocument,
  DeleteUserDocument,
  DropdownRolesDocument,
  EnableOrganizationStatusDocument,
  PaginatedOrganizationDocument,
  PaginatedRolesDocument,
  PaginatedUsersDocument,
  UpdateOrganizationDocument,
  UpdateUserDocument,
  UserType,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView } from "react-native";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import Modal from "react-native-modal";
import { set, useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/ui/Loader";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import debounce from "lodash.debounce";
import { Env } from "@/constants/ApiEndpoints";
import { useUserContext } from "@/context/RoleContext";
import NoDataFound from "@/components/NoDataFound";

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
  const updatePermission = can("MasterApp:User:Update");
  const createPermission = can("MasterApp:User:Create");
  const statusUpdatePermission = can("MasterApp:User:Action");

  const [userData, { error, data, loading, refetch }] = useLazyQuery<any>(
    PaginatedUsersDocument
  );

  const [createUser, createUserState] = useMutation(CreateUserDocument, {
    onCompleted: (data) => {
      reset();
      fetchUser(true);
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updateUserStatus, updateUserStatusState] = useMutation(ChangeUserStatusDocument, {
    onCompleted: (data) => {
      fetchUser(true);
      setStatusModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [
    getUserRoles,
    { data: roleData, loading: roleLoading, error: roleError },
  ] = useLazyQuery(DropdownRolesDocument);
  // console.log('000086', roleData?.dropdownRoles?.data);

  const [
    organizationData,
    {
      error: organizationError,
      data: organizationInfo,
      loading: OrganizationLoading,
    },
  ] = useLazyQuery(PaginatedOrganizationDocument);

  const [updateUser, updateUserState] = useMutation(UpdateUserDocument, {
    onCompleted: (data) => {
      reset();
      fetchUser(true);
      setModalVisible(false);
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


  useEffect(() => {
    fetchUser();
    getInitialData();
  }, []);

  const getInitialData = async () => {
    await getUserRoles({
      variables: {
        listInputDto: {},
      },
    });
    await organizationData({
      variables: {
        listInputDto: {},
      },
    });
  }

  const onSubmit = (data: any) => {
    try {
      const roleIds: number[] = [];
      if (data?.roles && Array.isArray(data.roles)) {
        for (let i = 0; i < data.roles.length; i++) {
          roleIds.push(Number(data.roles[i]));
        }
      }

      const params: any = {
        designation: typeof data?.designation == 'string' ? data?.designation : data?.designation?.value,
        email: data?.email,
        mobileNo: Number(data?.phoneNo),
        name: data?.name,
        roleIds: roleIds,
        userType: typeof data?.usertype == 'string' ? data?.usertype : data?.usertype?.value,
        avatar: image,
      };
      let updateParams = {
        id: Number(currentUser?.id),
        ...params,
      }
      console.log("updateParams", updateParams);

      editModal
        ? updateUser({
          variables: {
            data: updateParams,
          },
        })
        : createUser({
          variables: {
            data: params,
          },
        });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  const renderItem = (item: any, index: number) => {
    let rolesId = item?.roles?.map((item: any) => {
      return item?.id
    })
    return (
      <View
        key={index}
        style={[
          styles.organizationContainer,
          { backgroundColor: Colors[theme].cart },
        ]}
      >
        <View style={styles.organizationHeader}>
          <ThemedText type="subtitle">{item?.name}</ThemedText>
          <View style={styles.organizationInfo}>
            {statusUpdatePermission && <MaterialIcons
              name="attractions"
              size={ms(22)}
              color={Colors[theme].text}
              onPress={() => {
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
            />}

            <AntDesign
              name="eyeo"
              size={ms(22)}
              color={Colors[theme].text}
              onPress={() => {
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


            {updatePermission && <Feather
              name="edit"
              size={ms(22)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentUser({
                  name: item?.name,
                  email: item?.email,
                  phoneNo: item?.mobileNo.toString(),
                  roles: rolesId,
                  usertype: item?.userType,
                  id: item?.id,
                  imagePath: item?.avatar,
                  designation: item?.designation,
                });
                setImage(item?.avatar)
                setEditModal(true);
                setModalVisible(true);
              }}
            />}

            {deletePermission && <MaterialIcons
              name="delete-outline"
              size={ms(22)}
              color={Colors[theme].text}
              onPress={() => {

                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete?",
                  [
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
                  ]
                );
              }}
            />}
          </View>
        </View>

        <ThemedText
          style={[
            styles.status,
            {
              // color:
              //   item.status == "active" ? Colors?.green : "#6d6d1b",
              backgroundColor:
                theme == "dark" ? Colors?.white : "#e6e2e2",
            },
          ]}
        >
          {item?.status}
        </ThemedText>

        <View style={styles.userInfo}>
          <ThemedText
            style={{ fontSize: ms(14), lineHeight: ms(18) }}
          >
            {item?.email}
          </ThemedText>
          <ThemedText
            style={{ fontSize: ms(14), lineHeight: ms(18) }}
          >
            {item?.mobileNo}
          </ThemedText>
        </View>

      </View>
    );
  }

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        console.error("File does not exist:", uri);
        return;
      }

      const fileExtension = uri.split(".").pop() || "jpg"; // Default to jpg if no extension
      const mimeType = `image/${fileExtension}`;

      const formData = new FormData();

      formData.append("file", {
        uri,
        name: `upload.${fileExtension}`,
        type: mimeType,
      } as unknown as Blob);

      // formData.append("file", {
      //   uri: uri,
      //   name: `upload.${fileExtension}`,
      //   type: mimeType,
      // } as any);

      const uploadResponse = await fetch(`${Env.SERVER_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!uploadResponse.ok) {
        const err = await uploadResponse.text();
        throw new Error(`Upload failed: ${err}`);
      }
      const responseData = await uploadResponse.json();
      // console.log("Upload successful:", responseData?.files[0]);
      setImage(responseData?.files[0]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      fetchUser(true, text);
    }, 500),
    [searchQuery]
  );

  const fetchUser = async (isRefreshing = false, searchParams = "") => {
    const currentPage = isRefreshing ? 1 : page;
    console.log("ccc", currentPage);

    if (isRefreshing) {
      setRefreshing(true);
      setPage(1);
    }
    const params = {
      limit: 10,
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

        if (isRefreshing) setRefreshing(false);
        setPage((prev) => prev + 1);
        setRefreshing(false);
        const lastPage = Math.ceil(data?.meta?.totalItems / 10);
        setHasMore(data?.meta?.currentPage < lastPage);
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
  // if (true) {
  //   return <Loader />;
  // }


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
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setModalVisible(true);
              // setCurrentOrganization(defaultValue);
            }}
          >
            <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
          </Pressable>
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={userList}
            renderItem={({ item, index }: any) => renderItem(item, index)}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing && !loading}
            onRefresh={() => {
              fetchUser(true);
            }}
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


      {/* Create and Edit modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          reset();
          setCurrentUser(defaultValue);
          setEditModal(false);
          setImage("");
          setModalVisible(false);
        }}
      >
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Colors[theme].cart,
            // height: vs(640),
            width: "100%",
            borderRadius: 10,
            alignSelf: "center",
            paddingHorizontal: 10,
            paddingVertical: 22,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <ThemedText type="subtitle">
              {editModal ? "Edit User" : "Create User"}
            </ThemedText>
            <Pressable
              onPress={() => {
                reset();
                setEditModal(false);
                setCurrentUser(defaultValue);
                setImage("");
                setModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>

          <View style={{ padding: 10, position: "relative" }}>
            <Pressable
              style={styles.imageContainer}
            >
              <Image
                source={{
                  uri: `${Env?.SERVER_URL}${image}`,
                }}
                style={styles.image}
              />
            </Pressable>

            {<Pressable
              onPress={handleImagePickerPress}
              style={styles?.editImage}>
              <Feather name="edit-2" size={ms(18)} color='black' style={{ fontWeight: 'bold', }} />
            </Pressable>}

            {/* <Pressable
              onPress={handleImagePickerPress}
              style={styles.imageContainer}
            >
              {image && <Image source={{ uri: currentUser?.imagePath.length > 0 ? `http://192.168.1.62:5001${currentUser?.imagePath}` : image }} style={styles.image} />}
            </Pressable> */}
            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name={"name"}
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Name"}
              rules={{
                required: "Name is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              type="input"
              control={control}
              name={"email"}
              label={"Email"}
              labelStyle={styles.label}
              rules={{
                required: "User email is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name={"phoneNo"}
              // keyboardType="phone-pad"
              label={"Phone No"}
              labelStyle={styles.label}
              rules={{
                required: "User phoneNo is required",
              }}
            />

            <CustomValidation
              data={designationData}
              type="picker"
              hideStar={false}
              control={control}
              name="designation"
              label="Designation"
              labelStyle={styles.label}
              placeholder="Select Designation"
              inputStyle={{ height: vs(50) }}
              rules={{
                required: {
                  value: true,
                  message: "Select a designation",
                },
              }}
            />

            <CustomValidation
              data={roleData?.dropdownRoles?.data}
              type="picker"
              hideStar={false}
              keyToCompareData="id"
              keyToShowData="name"
              control={control}
              name="roles"
              label="Role"
              labelStyle={styles.label}
              multiSelect
              placeholder="Select role name"
              inputStyle={{ height: vs(50) }}
              rules={{
                required: {
                  value: true,
                  message: "Select a role",
                },
              }}
            />

            <CustomValidation
              data={userTypeData}
              type="picker"
              hideStar={false}
              control={control}
              keyToCompareData="value"
              keyToShowData="label"
              label="User Type"
              labelStyle={styles.label}
              name="usertype"
              placeholder="Select UserType"
              inputStyle={{ height: vs(50) }}
              rules={{
                required: {
                  value: true,
                  message: "Select a User Type",
                },
              }}
            />
          </View>

          <CustomButton
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: Colors[theme].background,
              marginTop: vs(10),
            }}
          />
        </ScrollView>
      </Modal>


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

    </CustomHeader>
  );
};

export default UserScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  selectedContainer: {
    width: "100%",
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
    padding: "12@ms",
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
