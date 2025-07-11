import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CreateOrganizationDocument,
  DeleteOrganizationDocument,
  EnableOrganizationStatusDocument,
  PaginatedOrganizationDocument,
  PaginatedSubscriptionsDocument,
  PaginatedUsersDocument,
  UpdateOrganizationDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView } from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import Modal from "react-native-modal";
import { set, useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/ui/Loader";
import { router, useFocusEffect } from "expo-router";
import debounce from "lodash.debounce";

const defaultValue = {
  name: "",
  description: "",
  id: "",
};

const SubscriptionScreen = () => {
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{ name: string; description: string; topic: any }>({
    defaultValues: {},
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [subscriptionsData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedSubscriptionsDocument
  );

  console.log("00000", data?.paginatedSubscriptions?.data[0]);

  // const [createOrganization, createOrganizationState] = useMutation(CreateOrganizationDocument, {
  //   onCompleted: (data) => {
  //     reset()
  //     refetch();
  //     setModalVisible(false);
  //     Alert.alert("success", "Project create successfully!");
  //   },
  //   onError: (error) => {
  //     Alert.alert("Error", error.message);
  //   }
  // });

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

  // const [deleteOrganization, deleteOrganizationState] = useMutation(DeleteOrganizationDocument, {
  //   onCompleted: (data) => {
  //     refetch();
  //     Alert.alert("success", "Project deleted successfully!");
  //   },
  //   onError: (error) => {
  //     Alert.alert("Error", error.message);
  //   }
  // });

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

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState<{
    name: string;
    description: string;
    id: string;
  }>(defaultValue);

  // const setCurrentOrganizationData() => {
  //   setValue("name", currentOrganization?.name)
  //   setValue("description", currentOrganization?.description)
  // }

  // useEffect(() => {
  //   setValue("name", currentOrganization?.name)
  //   setValue("description", currentOrganization?.description)
  // }, [currentOrganization])

  // const
  const pickerData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
    { label: "Pending", value: "pending" },
  ];

  const statusTextColorsOptions = {
    active: "success",
    inactive: "danger",
    used: "warning",
    expired: "blocked",
  };

  // useEffect(() => {
  //   subscriptionsData({
  //     variables: {
  //       listInputDto: {},
  //     },
  //   });
  //   setSearchQuery("")
  // }, []);

  useFocusEffect(
    useCallback(() => {
      subscriptionsData({
        variables: {
          listInputDto: {},
        },
      });
      setSearchQuery("");
      setSearch(false);
    }, [])
  );

  const onSubmit = (data: any) => {
    let param = {
      id: Number(currentOrganization?.id),
      ...data,
    };
    console.log(param);
    // editModal ?
    //   updateOrganization({
    //     variables: {
    //       updateOrganizationInput: param,
    //     },
    //   })
    //   : createOrganization({
    // variables: {
    //   createOrganizationInput: {
    //     ...data
    //       },
    //     },
    //   });
  };

  const debouncedSearch = useCallback(
    debounce(async (text) => {
      const res = await subscriptionsData({
        variables: {
          listInputDto: { search: text },
        },
      });
    }, 500),
    [searchQuery]
  );

  // console.log(watch("topic"));

  // useEffect(() => {
  //   if (watch("topic")) {
  //     updateOrganizationStatus({
  //       variables: {
  //         data: {
  //           id: Number(currentOrganization?.id),
  //           status: watch("topic")?.value
  //         }
  //       },
  //     });
  //   }
  // }, [watch("topic")])

  // if (loading) {
  //   return <Loader />
  // }

  // const handleImagePickerPress = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ['images'],
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1
  //   })
  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri)
  //   }
  // }
  // console.log('image',image);

  return (
    <CustomHeader
      leftComponent={
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={{ padding: ms(10) }}
        >
          <FontAwesome5
            name="arrow-left"
            size={22}
            color={Colors[theme].text}
          />
        </Pressable>
      }
      title="Subscription"
      rightComponent={
        <Pressable
          onPress={() => {
            setSearch((prev) => !prev);
          }}
          style={{ padding: ms(10) }}
        >
          <FontAwesome5 name="search" size={22} color={Colors[theme].text} />
        </Pressable>
      }
    >
      <ThemedView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          {search && (
            <View style={{ width: "100%" }}>
              <CustomSearchBar
                searchQuery={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  debouncedSearch(text);
                }}
                placeholder={labels?.searchTeam}
                loading={loading}
                onClear={() => {
                  setSearchQuery("");
                }}
              />
            </View>
          )}
          {/* <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setModalVisible(true), setCurrentOrganization(defaultValue);
            }}
          >
            <Feather name="plus-square" size={24} color={Colors[theme].text} />
          </Pressable> */}
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={data?.paginatedSubscriptions?.data}
            renderItem={({ item, index }: any) => (
              <View
                key={index}
                style={[
                  styles.organizationContainer,
                  {
                    backgroundColor:
                      theme == "light"
                        ? Colors?.cartBackground
                        : Colors[theme].cart,
                  },
                ]}
              >
                {/* <ThemedText
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
                </ThemedText> */}
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        Colors[theme]?.[statusTextColorsOptions[item?.status]]
                          ?.bg,
                      borderColor:
                        Colors[theme]?.[statusTextColorsOptions[item?.status]]
                          ?.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          Colors[theme]?.[statusTextColorsOptions[item?.status]]
                            ?.text,
                      },
                    ]}
                  >
                    {item?.status.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.organizationHeader}>
                  <ThemedText type="subtitle" style={{ flex: 1 }}>
                    {item?.name}
                  </ThemedText>
                </View>

                <View style={styles.userInfo}>
                  <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                    {item?.duration} days ago
                  </ThemedText>
                  <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                    ${item?.price}
                  </ThemedText>
                </View>
              </View>
            )}
            contentContainerStyle={{
              paddingBottom: vs(50),
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ThemedView>

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
            backgroundColor: Colors[theme].background,
            height: vs(500),
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
              bottom: 30,
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
              // placeholder={editModal ? "Test Organization" : "Enter Module"}
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
              // placeholder={editModal ? "Test organization description" : "Enter description"}
              labelStyle={styles.label}
              onFocus={() =>
                setIsFocused(editModal ? "testDescription" : "description")
              }
              rules={{
                required: editModal
                  ? "Test organization description is required"
                  : "Description is required",
              }}
            />
          </View>

          <CustomButton
            title="Submit"
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
            style={{ backgroundColor: Colors[theme].cart, marginTop: vs(10) }}
          />
        </View>
      </Modal>
    </CustomHeader>
  );
};

export default SubscriptionScreen;

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
    paddingHorizontal: "12@ms",
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
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
