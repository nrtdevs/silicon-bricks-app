import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CreateOrganizationDocument,
  CreateUserDocument,
  DeleteOrganizationDocument,
  EnableOrganizationStatusDocument,
  PaginatedOrganizationDocument,
  PaginatedRolesDocument,
  PaginatedUsersDocument,
  UpdateOrganizationDocument,
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

const defaultValue = {
  name: "",
  email: "",
  phoneNo: "",
  role: "",
};

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
    role: string;
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
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phoneNo: string;
    role: string;
  }>(defaultValue);
  const [selected, setSelected] = useState<any>([]);

  const [userData, { error, data, loading, refetch }] = useLazyQuery(
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

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct media type
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
    console.log('image', image)
  };

  const [
    getUserRoles,
    { data: roleData, loading: roleLoading, error: roleError },
  ] = useLazyQuery(PaginatedRolesDocument);
  useEffect(() => {
    getUserRoles();
  }, []);

  const [
    organizationData,
    {
      error: organizationError,
      data: organizationInfo,
      loading: OrganizationLoading,
    },
  ] = useLazyQuery(PaginatedOrganizationDocument);

  // const [updateOrganization, updateOrganizationState] = useMutation(UpdateOrganizationDocument, {
  //   onCompleted: (data) => {
  //     reset()
  //     refetch();
  //     setEditModal(false);
  //     setModalVisible(false);
  //     Alert.alert("success", "Project updated successfully!");
  //   },
  //   onError: (error) => {
  //     Alert.alert("Error", error.message);
  //   }
  // });

  const [deleteOrganization, deleteOrganizationState] = useMutation(DeleteOrganizationDocument, {
    onCompleted: (data) => {
      refetch();
      Alert.alert("success", "Project deleted successfully!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    }
  });

  // const [updateOrganizationStatus, updateOrganizationStatusState] = useMutation(EnableOrganizationStatusDocument, {
  //   onCompleted: (data) => {
  //     refetch();
  //     setStatusModalVisible(false);
  //     Alert.alert("success", "Status updated successfully!");
  //   },
  //   onError: (error) => {
  //     Alert.alert("Error", error.message);
  //   }
  // }); 


  useEffect(() => {
    setValue("name", currentUser?.name)
    setValue("email", currentUser?.email)
    setValue("phoneNo", currentUser?.phoneNo)
  }, [currentUser])

  useEffect(() => {
    userData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    getUserRoles({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
    organizationData({
      variables: {
        listInputDto: {},
      },
    });
  }, []);

  const onSubmit = (data: any) => {
    // console.log("000", data);
    const params = {
      email: data?.email,
      mobileNo: Number(data?.phoneNo),
      name: data?.name,
      organizationId: Number(data?.Organization?.id),
      roleId: Number(data?.role?.id),
    }
    console.log(params);

    // let param = {
    //   id: Number(currentOrganization?.id),
    //   ...data
    // }
    // console.log(param);
    editModal
      ? // updateOrganization({
      //   variables: {
      //     updateOrganizationInput: param,
      //   },
      // })
      {}
      : createUser({
        variables: {
          data: params,
        },
      });
  };

  if (OrganizationLoading) {
    return <Loader />
  }

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={{ width: "90%" }}>
            <CustomSearchBar
              searchQuery={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                // setSelected(
                //   dummyData.filter((item) =>
                //     item.language.toLowerCase().includes(text.toLowerCase())
                //   )
                // );
              }}
              placeholder={labels?.searchTeam}
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setModalVisible(true)
              // setCurrentOrganization(defaultValue);
            }}
          >
            <Feather name="plus-square" size={24} color={Colors[theme].text} />
          </Pressable>
        </View>
        {selected && (
          <View style={styles.selectedContainer}>
            {selected.map(() => (
              <View
                style={[
                  styles.searchedResult,
                  { backgroundColor: Colors[theme].cartBg },
                ]}
              >
                <ThemedText>lkjlkj</ThemedText>
              </View>
            ))}
          </View>
        )}
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={data?.paginatedUsers?.data}
            renderItem={({ item, index }: any) => {
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
                          setHierarchyModalVisible(true);
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
                            phoneNo: item?.mobileNo.toString(),
                            role: item?.name,
                          });
                          setInfoModalVisible(true);
                        }}
                      />

                      <Feather
                        name="edit"
                        size={ms(20)}
                        color={Colors[theme].text}
                        onPress={() => {
                          // setValue("name", item?.name)
                          // setValue("email", item?.email)
                          // setValue("phoneNo", item?.mobileNo.toString())
                          // setValue("role", )
                          console.log("item", item);

                          setCurrentUser({
                            name: item?.name,
                            email: item?.email,
                            phoneNo: item?.mobileNo.toString(),
                            role: item?.name,
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
                          console.log("item", item);
                          const params = {
                            deleteOrganizationId: Number(item?.id),
                          }

                          Alert.alert(
                            "Delete",
                            "Are you sure you want to delete?",
                            [
                              {
                                text: "Yes",
                                onPress: () => {
                                  deleteOrganization({
                                    variables: params
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
                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                      {item?.email}
                    </ThemedText>
                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                      {item?.mobileNo}
                    </ThemedText>
                  </View>
                </View>
              )
            }}
            contentContainerStyle={{ paddingBottom: vs(40) }}
          />
        </View>
      </ThemedView>

      {/* Edit modal */}
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
            height: vs(640),
            width: '100%',
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
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
            <Pressable onPress={handleImagePickerPress} style={styles.imageContainer}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </Pressable>
            <CustomValidation
              type="input"
              control={control}
              labelStyle={styles.label}
              name={"name"}
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Name"}
              onFocus={() => setIsFocused("name")}
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
              onFocus={() => setIsFocused("email")}
              rules={{
                required: "User email is required",
              }}
            />

            {/* <CustomValidation
              type="input"
              control={control}
              name={"phoneNo"}
              label={"Email"}
              labelStyle={styles.label}
              onFocus={() => setIsFocused("phoneNo")}
              rules={{
                required: "User email is required",
              }}
            /> */}

            <CustomValidation
              type="input"
              control={control}
              name={"phoneNo"}
              // keyboardType="phone-pad"
              label={"Phone No"}
              labelStyle={styles.label}
              // onFocus={() => setIsFocused("phoneNo")}
              rules={{
                required: "User phoneNo is required",
              }}
            />

            <CustomValidation
              data={roleData?.paginatedRoles?.data}
              type="picker"
              hideStar
              isSearch
              keyToCompareData="id"
              keyToShowData="name"
              control={control}
              name="role"
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
              data={organizationInfo?.paginatedOrganization?.data}
              isSearch
              type="picker"
              hideStar
              control={control}
              name="Organization"
              keyToCompareData="id"
              keyToShowData="name"
              placeholder="Select organization name"
              inputStyle={{ height: vs(50) }}
              rules={{
                required: {
                  value: true,
                  message: "Select a Organization",
                },
              }}
            />
          </View>

          <CustomButton
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            style={{ backgroundColor: Colors[theme].background, marginTop: vs(10) }}
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
            <ThemedText type="subtitle">
              User
            </ThemedText>
            <Pressable
              onPress={() => {
                setCurrentUser(defaultValue);
                setInfoModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>
          <View style={{ borderWidth: 1, borderColor: Colors[theme].text, borderStyle: "dashed" }} />
          <View style={{ gap: vs(10), padding: ms(10) }}>
            <View >
              <ThemedText type="subtitle">Name</ThemedText>
              <ThemedText type="default">{currentUser?.name}</ThemedText>
            </View>
            <View >
              <ThemedText type="subtitle">Email</ThemedText>
              <ThemedText type="default">{currentUser?.email}</ThemedText>
            </View>
            <View >
              <ThemedText type="subtitle">Phone No</ThemedText>
              <ThemedText type="default">{currentUser?.phoneNo}</ThemedText>
            </View>
            <View >
              <ThemedText type="subtitle">Role</ThemedText>
              <ThemedText type="default">{currentUser?.role}</ThemedText>
            </View>
          </View>
        </View>
      </Modal>

      {/* Hierarchy modal */}
      <Modal
        isVisible={isHierarchyModalVisible}
        onBackdropPress={() => {
          setHierarchyModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cartBg,
            height: vs(380),
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
            <ThemedText type="subtitle">
              Hierarchy
            </ThemedText>
            <Pressable
              onPress={() => {
                setHierarchyModalVisible(false);
              }}
            >
              <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
            </Pressable>
          </View>
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
