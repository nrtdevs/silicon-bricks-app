import { Alert, FlatList, Pressable, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangePlanStatusDocument,
  DeletePlanDocument,
  PaginatedPlansDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import Modal from "react-native-modal";
import { set, useForm } from "react-hook-form";
import CustomValidation from "@/components/CustomValidation";
import Loader from "@/components/ui/Loader";
import NoDataFound from "@/components/NoDataFound";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";
import CustomPlan from "@/components/master/CustomPlan";
import { router, useFocusEffect } from "expo-router";
import { FAB } from "@rneui/themed";

const defaultValue = {
  name: "",
  discountPrice: "",
  duration: "",
  price: "",
  package: "",
  coupon: "",
  description: "",
  status: "",
  id: "",
};

const statusData = [
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Inactive", value: "inactive" },
];

const PlanScreen = () => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string>("");
  const [currentPlan, setCurrentPlan] = useState<{
    name: string;
    discountPrice: string;
    duration: string;
    price: string;
    package: any;
    coupon: any;
    description: string;
    status: any;
    id: string;
  }>(defaultValue);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<{
    name: string;
    discountPrice: string;
    duration: string;
    price: string;
    package: any;
    coupon: any;
    description: string;
    status: any;
  }>({
    defaultValues: {},
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Plan:Delete");
  const updatePermission = can("MasterApp:Plan:Update");
  const createPermission = can("MasterApp:Plan:Create");
  const readPermission = can("MasterApp:Plan:Read");
  const statusUpdatePermission = can("MasterApp:Plan:Action");

  const [plansData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedPlansDocument
  );

  const [deletePlan, deletePlanState] = useMutation(DeletePlanDocument, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updatePlanStatus, updatePlanStatusState] = useMutation(
    ChangePlanStatusDocument,
    {
      onCompleted: (data) => {
        refetch();
        setStatusModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  useFocusEffect(
    useCallback(() => {
      plansData({
        variables: {
          listInputDto: {},
        },
        fetchPolicy: "network-only",
      });
      setSearch(false);
    }, [])
  );

  //   useEffect(() => {
  //     if (watch("status")) {
  //       updatePlanStatus({
  //         variables: {
  //           updatePlanStatusInput: {
  //             ids: [Number(currentPlanId)],
  //             status: watch("status")?.value,
  //           },
  //         },
  //       });
  //     }
  //   }, [watch("status")]);

  // packageData?.data?.paginatedPackages?.data

  // useEffect(() => {
  //     console.log('00000', currentPlan);

  // setValue("name", currentPlan?.name || "");
  // setValue("discountPrice", currentPlan?.discountPrice);
  // setValue("duration", currentPlan?.duration || "");
  // setValue("price", currentPlan?.price || "");
  // setValue("offer", currentPlan?.offer || "");
  // setValue("package", currentPlan?.package || "");
  // setValue("coupon", currentPlan?.coupon || "");
  // setValue("description", currentPlan?.description || "");
  // }, [currentPlan]);
  // console.log('00000', currentPlan);

  const renderItem = ({ item, index }: any) => {
    // console.log(item?.price);
    // console.log(item?.discountedPrice);

    return (
      <CustomPlan
        name={item?.name ?? ""}
        couponCode={item?.couponCode ?? ""}
        status={item?.status ?? ""}
        price={item?.price ?? 0}
        discountedPrice={item?.discountedPrice ?? 0}
        duration={item?.duration ?? 0}
        description={item?.description ?? ""}
        editPermission={updatePermission}
        deletePermission={deletePermission}
        statusPermission={statusUpdatePermission}
        onEdit={() => {
          router.push({
            pathname: `/(subComponents)/addEditPlan`,
            params: {
              data: JSON.stringify(item),
            },
          });
        }}
        onDelete={() =>
          Alert.alert("Delete", "Are you sure you want to delete?", [
            {
              text: "Yes",
              onPress: () => {
                deletePlan({
                  variables: {
                    ids: [Number(item?.id)],
                  },
                });
              },
            },
            { text: "No", onPress: () => {} },
          ])
        }
        onChangeStatus={() => {
          setCurrentPlanId(item?.id);
          setValue("status", item?.status);
          setStatusModalVisible(true);
        }}
      />
    );
  };

  // const renderItem = ({ item, index }: any) => {
  //     // console.log('0987654321', item);

  //     return (
  //         <View
  //             key={index}
  //             style={[
  //                 styles.organizationContainer,
  //                 { backgroundColor: Colors[theme].cart }
  //             ]}
  //         >
  //             <View style={styles.organizationHeader}>
  //                 <ThemedText type="subtitle" style={{ flex: 1 }}>
  //                     {item?.name}
  //                 </ThemedText>
  //                 <View style={styles.organizationInfo}>
  //                     {statusUpdatePermission && <MaterialIcons
  //                         name="attractions"
  //                         size={ms(22)}
  //                         color={Colors[theme].text}
  //                         onPress={() => {
  //                             setCurrentPlanId(item?.id);
  //                             setStatusModalVisible(true);
  //                         }}
  //                     />}

  //                     {updatePermission && <Feather
  //                         name="edit"
  //                         size={ms(22)}
  //                         color={Colors[theme].text}
  //                         onPress={() => {
  //                             setCurrentPlan({
  //                                 name: item?.name,
  //                                 discountPrice: String(item?.discountedPrice),
  //                                 duration: String(item?.duration),
  //                                 price: String(item?.price),
  //                                 package: item?.package?.id,
  //                                 coupon: item?.couponId,
  //                                 description: item?.description,
  //                                 status: item?.status,
  //                                 id: item?.id,
  //                             });
  //                             setEditModal(true);
  //                             setModalVisible(true);
  //                         }}
  //                     />}

  //                     {deletePermission && <MaterialIcons
  //                         name="delete-outline"
  //                         size={ms(22)}
  //                         color={Colors[theme].text}
  //                         onPress={() => {
  //                             Alert.alert("Delete", "Are you sure you want to delete?", [
  //                                 {
  //                                     text: "Yes",
  //                                     onPress: () => {
  //                                         deletePlan({
  //                                             variables: {
  //                                                 ids: [Number(item?.id)],
  //                                             }
  //                                         });
  //                                     },
  //                                 },
  //                                 { text: "No", onPress: () => { } },
  //                             ]);
  //                         }}
  //                     />}
  //                 </View>
  //             </View>

  //             <ThemedText
  //                 style={[
  //                     styles.status,
  //                     {
  //                         color:
  //                             item.status == "active" ? Colors?.green : "#6d6d1b",
  //                         backgroundColor: theme == "dark" ? Colors?.white : "#e6e2e2",
  //                     },
  //                 ]}
  //             >
  //                 {item?.status}
  //             </ThemedText>

  //             <View style={styles.userInfo}>
  //                 <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
  //                     ${item?.price}
  //                 </ThemedText>
  //                 <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
  //                     ${item?.discountedPrice} (after discount)
  //                 </ThemedText>
  //             </View>
  //         </View>
  //     );
  // };

  const debouncedSearch = useCallback(
    debounce((text) => {
      plansData({
        variables: {
          listInputDto: {
            search: text,
          },
        },
      });
    }, 500),
    [searchQuery]
  );

  if (loading) {
    return <Loader />;
  }

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
      title="Plan"
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
          {search &&<View style={{ flex: 1 }}>
            <CustomSearchBar
              searchQuery={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                debouncedSearch(text);
              }}
              placeholder={labels?.searchPlan}
              loading={loading}
              onClear={() => {
                setSearchQuery("");
              }}
            />
          </View>}
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            data={data?.paginatedPlans?.data}
            renderItem={renderItem}
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: vs(100),
            }}
          />
        </View>
      </ThemedView>

      {createPermission && (
        <FAB
          size="large"
          title="Add Plan"
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
          onPress={() => router.push("/(subComponents)/addEditPlan")}
        />
      )}

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
            data={statusData}
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
                ids: [Number(currentPlan?.id)],
                status: watch("status")?.value,
              };
              watch("status")?.value &&
                updatePlanStatus({
                  variables: {
                    updatePlanStatusInput: {
                      ids: [Number(currentPlanId)],
                      status: watch("status")?.value,
                    },
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

export default PlanScreen;

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
  },
  searchContainer: {
    marginHorizontal: "12@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
