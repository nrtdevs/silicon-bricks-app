import {
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

const defaultValue = {
  name: "",
  email: "",
  phoneNo: "",
  roles: [],
  usertype: "",
  id: "",
};

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
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phoneNo: string;
    roles: any[];
    usertype: any;
    id: string;
  }>(defaultValue);
  console.log("currentUser", currentUser);

  const [userData, { error, data, loading, refetch }] = useLazyQuery<any>(
    PaginatedUsersDocument
  );

  const [createUser, createUserState] = useMutation(CreateUserDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setModalVisible(false);
      Alert.alert("success", "Project create successfully!");
    },
    onError: (error) => {
      console.log("Error", error.message);
      Alert.alert("Error", error.message);
    },
  });

  const [updateUserStatus, updateUserStatusState] = useMutation(ChangeUserStatusDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setStatusModalVisible(false);
      Alert.alert("success", "Project create successfully!");
    },
    onError: (error) => {
      setStatusModalVisible(false);
      console.log("Error", error.message);
      Alert.alert("Error", error.message);
    },
  });

  const [
    getUserRoles,
    { data: roleData, loading: roleLoading, error: roleError },
  ] = useLazyQuery(PaginatedRolesDocument);

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

  const [deleteUser, deleteUserState] = useMutation(DeleteUserDocument, {
    onCompleted: (data) => {
      refetch();
      Alert.alert("success", "user deleted successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  //test

  const userTypeData = [
    { label: "admin", value: "admin" },
    { label: "adminEmployee", value: "adminEmployee" },
    { label: "organization", value: "organization" },
    { label: "organizationEmployee", value: "organizationEmployee" },
  ];

  useEffect(() => {
    setValue("name", currentUser?.name);
    setValue("email", currentUser?.email);
    setValue("phoneNo", currentUser?.phoneNo);
    setValue("roles", currentUser?.roles);
    setValue("usertype", currentUser?.usertype);
  }, [currentUser]);


  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    await userData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    await getUserRoles({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    await organizationData({
      variables: {
        listInputDto: {},
      },
    });
  }

  // useEffect(() => {
  //   const params = {
  //     id: Number(currentUser?.id),
  //     status: watch("status")?.value
  //   }
  //   console.log("params", params);
  //   if (watch("status")) {
  //     updateUserStatus({
  //       variables: {
  //         data: params
  //       },
  //     });
  //   }
  // }, [watch("status")])

  useEffect(() => {
    const status = watch("status");
    if (status && currentUser?.id) {
      const params = {
        id: Number(currentUser.id),
        status: status?.value,
      };
      updateUserStatus({ variables: { data: params } });
    }
  }, [watch("status")]);


  const onSubmit = (data: any) => {
    try {
      const roleIds = data.roles.map(Number);

      const params = {
        email: data?.email,
        mobileNo: Number(data?.phoneNo),
        name: data?.name,
        roleIds: roleIds,
        userType: watch("usertype")?.label as UserType,
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

  const renderItem = (item, index) => {
    let rolesId = item.roles.map((item) => {
      return item.id
    })
    return (
      <View
        key={index}
        style={[
          styles.organizationContainer,
          { backgroundColor: Colors[theme].cartBg },
        ]}
      >
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

        <View style={styles.organizationHeader}>
          <ThemedText type="subtitle">{item?.name}</ThemedText>
          <View style={styles.organizationInfo}>
            <MaterialIcons
              name="attractions"
              size={ms(20)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentUser({
                  name: item?.name,
                  email: item?.email,
                  phoneNo: item.mobileNo.toString(),
                  roles: rolesId,
                  usertype: item?.userType,
                  id: item?.id,
                });
                setStatusModalVisible(true);
              }}
            />

            <AntDesign
              name="eyeo"
              size={ms(20)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentUser({
                  name: item?.name,
                  email: item?.email,
                  phoneNo: item.mobileNo.toString(),
                  roles: rolesId,
                  usertype: item?.userType,
                  id: item?.id,
                });
                setInfoModalVisible(true);
              }}
            />

            <Feather
              name="edit"
              size={ms(20)}
              color={Colors[theme].text}
              onPress={() => {
                setCurrentUser({
                  name: item?.name,
                  email: item?.email,
                  phoneNo: item?.mobileNo.toString(),
                  roles: rolesId,
                  usertype: item?.userType,
                  id: item?.id,
                });
                setEditModal(true);
                setModalVisible(true);
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
                      text: "Yes",
                      onPress: () => {
                        deleteUser({
                          variables: {
                            deleteUserId: Number(item?.id),
                          }

                        });
                      },
                    },
                    { text: "No", onPress: () => { } },
                  ]
                );
              }}
            />
          </View>
        </View>

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

      const uploadResponse = await fetch("http://192.168.1.58:5001/api/files/upload", {
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
      console.log("Upload successful:", responseData?.files[0]);
      setImage(responseData?.files[0]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };


  if (OrganizationLoading) {
    return <Loader />;
  } 

  const debouncedSearch = useCallback(
    debounce((text) => {
      userData({
        variables: {
          listInputDto: {
            limit: 10,
            page: 1,
            search: text,
          },
        },
      });
    }, 500),
    []
  );


  // const uploadImage = async (uri: string) => {
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();

  //     const formData = new FormData();
  //     formData.append("file", {
  //       uri,
  //       type: "image/jpeg",
  //       name: "image.jpg",
  //     } as any);

  //     const uploadResponse = await fetch("http://192.168.1.3:5001/api/files/upload", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     const responseData = await uploadResponse.json();
  //     console.log("Upload successful:", responseData);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //   }
  // };

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
            <Feather name="plus-square" size={24} color={Colors[theme].text} />
          </Pressable>
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={data?.paginatedUsers?.data}
            renderItem={({ item, index }: any) => {
              return renderItem(item, index);
            }}
            contentContainerStyle={{ paddingBottom: vs(40) }}
            showsVerticalScrollIndicator={false}
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
          setModalVisible(false);
        }}
      >
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Colors[theme].cartBg,
            // height: vs(640),
            width: "100%",
            borderRadius: 10,
            alignSelf: "center",
            paddingHorizontal: 10,
            paddingVertical: 20,
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
                setModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>

          <View style={{ padding: 10 }}>
            <Pressable
              onPress={handleImagePickerPress}
              style={styles.imageContainer}
            >
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </Pressable>
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
              data={roleData?.paginatedRoles?.data}
              type="picker"
              hideStar
              keyToCompareData="id"
              keyToShowData="name"
              control={control}
              name="roles"
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
              hideStar
              control={control}
              keyToCompareData="value"
              keyToShowData="label"
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
            backgroundColor: Colors[theme].cartBg,
            height: vs(300),
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
    width: "35%",
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
  userInfo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(50),
    marginBottom: "12@ms",
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});
