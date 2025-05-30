import {
  ActivityIndicator,
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
import {
  ChangeCouponStatusDocument,
  CreateCouponDocument,
  CreateCouponMutation,
  DeleteCouponDocument,
  PaginatedCouponsDocument,
  UpdateCouponDocument,
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
  Fontisto,
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
import NoDataFound from "@/components/NoDataFound";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";
import EditPromotion from "@/components/EditPromotion";
import CustomUserCard from "@/components/master/CustomUserCard";
import CustomCard from "@/components/master/CustomCard";
import { router, useFocusEffect } from "expo-router";
import { FAB } from "@rneui/themed";
import { Env } from "@/constants/ApiEndpoints";

const defaultValue = {
  couponCode: "",
  minOrderAmount: "",
  discountValue: "",
  usageLimit: "",
  start_date: " ",
  end_date: " ",
  description: "",
  status: "",
  id: "",
};

const pickerData = [
  { label: "Percentage", value: "PERCENTAGE" },
  { label: "Fixed Amount", value: "FIXED_AMOUNT" },
];

const statusData = [
  { label: "Active", value: "active" },
  { label: "Expired", value: "expired" },
  { label: "Inactive", value: "inactive" },
  { label: "Used", value: "used" },
];

const CouponScreen = () => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [couponList, setCouponList] = useState<any>([]);
  const [currentCoupon, setCurrentCoupon] = useState<{
    couponCode: any;
    usageLimit: string;
    description: string;
    discountValue: string;
    minOrderAmount: string;
    start_date: string;
    end_date: string;
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
    couponCode: any;
    usageLimit: string;
    description: string;
    discountValue: string;
    minOrderAmount: string;
    start_date: string;
    end_date: string;
    status: any;
  }>({
    defaultValues: {},
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Coupon:Delete");
  const updatePermission = can("MasterApp:Coupon:Update");
  const createPermission = can("MasterApp:Coupon:Create");
  const readPermission = can("MasterApp:Coupon:Read");
  const statusUpdatePermission = can("MasterApp:Coupon:Action");

  const [couponData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedCouponsDocument
  );

  const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
    getDateTimePickerProps(false)
  );

  const [dateModal, setDateModal] = useState({
    start: false,
    end: false,
  });

  const [createCoupon, createCouponState] = useMutation<any>(
    CreateCouponDocument,
    {
      onCompleted: (data) => {
        reset();
        refetch();
        setModalVisible(false);
        setCurrentCoupon(defaultValue);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [updateCoupon, updateCouponState] = useMutation(UpdateCouponDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setEditModal(false);
      setModalVisible(false);
      setCurrentCoupon(defaultValue);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [deleteCoupon, deleteCouponState] = useMutation(DeleteCouponDocument, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updateCouponStatus, updateCouponStatusState] = useMutation(
    ChangeCouponStatusDocument,
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
      fetchCoupons(true);
    }, [])
  );

  //   useEffect(() => {
  //     if (watch("status")) {
  //   updateCouponStatus({
  //     variables: {
  //       updateCouponStatusInput: {
  //         ids: [Number(currentCoupon?.id)],
  //         status: watch("status")?.value,
  //       },
  //     },
  //   });
  //     }
  //   }, [watch("status")]);

  useEffect(() => {
    setValue("couponCode", currentCoupon?.couponCode || "");
    setValue("usageLimit", currentCoupon?.usageLimit?.toString() || "");
    setValue("description", currentCoupon?.description || "");
    setValue("discountValue", currentCoupon?.discountValue?.toString() || "");
    setValue("minOrderAmount", currentCoupon?.minOrderAmount?.toString() || "");
    setValue(
      "start_date",
      formatTimeForAPI(currentCoupon?.start_date, "yyyy-mm-dd") || ""
    );
    setValue(
      "end_date",
      formatTimeForAPI(currentCoupon?.end_date, "yyyy-mm-dd") || ""
    );
  }, [currentCoupon]);

  // const fetchCoupons = async (isRefreshing = false) => {
  //     if (isRefreshing) {
  //         setPage(1);
  //         setRefreshing(true);
  //     }
  //     // Params for API
  //     const params = {
  //         per_page_record: 10,
  //         page: isRefreshing ? 1 : page,
  //     };

  //     await couponData({
  //         variables: {
  //             listInputDto: {},
  //         },
  //     });
  // };

  const fetchCoupons = async (isRefreshing = false, searchParams = "") => {
    if (loading && !isRefreshing) return;
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
      const res: any = await couponData({
        variables: {
          listInputDto: {},
        },
        fetchPolicy: "network-only",
      });

      if (res?.data?.paginatedCoupons) {
        const data: any = res?.data?.paginatedCoupons;
        const newItems = data?.data || [];

        setCouponList((prev: any) => {
          return isRefreshing || currentPage == 1
            ? newItems
            : [...prev, ...newItems];
        });

        const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
        if (!isRefreshing && currentPage < lastPage) {
          setPage(currentPage + 1);
        }
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

  const parseDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split("/");
    return new Date(+year, +month - 1, +day);
  };

  const onSubmit = (data: any) => {
    try {
      const startDate = parseDate(data?.start_date);
      const endDate = parseDate(data?.end_date);

      if (endDate < startDate) {
        console.log("End date should be greater than or equal to start date.");
        Alert.alert(
          "Error",
          "End date should be greater than or equal to start date."
        );
        return;
      }

      if (Number(data?.minOrderAmount) < Number(data?.discountValue)) {
        console.log("Min Order should be greater than discount value date.");
        Alert.alert(
          "Error",
          "Min Order should be greater than or equal to discount value."
        );
        return;
      }

      let params = {
        couponCode: data?.couponCode,
        minOrderAmount: Number(data?.minOrderAmount),
        discountValue: Number(data?.discountValue),
        // discountType: data?.discountType?.value,
        usageLimit: Number(data?.usageLimit),
        startDate: data?.start_date,
        endDate: data?.end_date,
        description: data?.description,
      };
      let params2 = {
        id: Number(currentCoupon?.id),
        ...params,
      };

      editModal
        ? updateCoupon({
            variables: {
              updateCouponInput: params2,
            },
          })
        : createCoupon({
            variables: {
              createCouponInput: params,
            },
          });
    } catch (error) {
      console.log("error in onSubmit", error);
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <CustomCard
        name={item?.couponCode}
        status={item?.status}
        description={item?.description}
        editPermission={updatePermission}
        deletePermission={deletePermission}
        statusPermission={statusUpdatePermission}
        readPermission={readPermission}
        onView={() => {
          setCurrentCoupon({
            couponCode: item?.couponCode,
            usageLimit: item?.usageLimit,
            description: item?.description,
            discountValue: item?.discountValue,
            minOrderAmount: item?.minOrderAmount,
            start_date: item?.startDate,
            end_date: item?.endDate,
            status: item?.status,
            id: item?.id,
          });
          setInfoModalVisible(true);
        }}
        onEdit={() => {
          router.push({
            pathname: "/(subComponents)/addEditCoupon",
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
                deleteCoupon({
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
          setCurrentCoupon({
            couponCode: item?.couponCode,
            usageLimit: item?.usageLimit,
            description: item?.description,
            discountValue: item?.discountValue,
            minOrderAmount: item?.minOrderAmount,
            start_date: item?.startDate,
            end_date: item?.endDate,
            status: item?.status,
            id: item?.id,
          });
          setValue("status", item?.status);
          setStatusModalVisible(true);
        }}
      />
    );
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      couponData({
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

  // if (loading) {
  //   return <Loader />
  // }

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
      title="Coupon"
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
            <View style={{ flex: 1 }}>
              <CustomSearchBar
                searchQuery={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  debouncedSearch(text);
                }}
                placeholder={labels?.searchCoupon}
                loading={loading}
                onClear={() => {
                  setSearchQuery("");
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.organizationParentContainer}>
          <FlatList
            // data={data?.paginatedCoupons?.data}
            // renderItem={renderItem}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={() => fetchCoupons(true)}
            //     />
            // }
            // ListEmptyComponent={!loading ? <NoDataFound /> : null}
            // showsVerticalScrollIndicator={false}
            // contentContainerStyle={{
            //     paddingBottom: 50,
            // }}
            // ListFooterComponent={
            //     hasMore ? (
            //         <ActivityIndicator size="small" color={Colors.primary} />
            //     ) : null
            // }
            // onEndReached={() => {
            //     if (hasMore && !isLoading) {
            //         fetchNotification();
            //     }
            // }}
            // onEndReachedThreshold={0.5}

            data={couponList}
            renderItem={({ item, index }: any) => renderItem({ item, index })}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing && !loading}
            onRefresh={() => {
              fetchCoupons(true);
            }}
            keyExtractor={(item: any, index: number) => index.toString()}
            contentContainerStyle={{ paddingBottom: vs(120) }}
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
            ListFooterComponent={
              hasMore ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : null
            }
            onEndReached={() => {
              if (hasMore && !loading) {
                fetchCoupons();
              }
            }}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ThemedView>

      {createPermission && (
        <FAB
          size="large"
          title="Add Coupon"
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
          onPress={() => router.push("/(subComponents)/addEditCoupon")}
        />
      )}

      {/* user info modal */}
      <Modal
        isVisible={infoModalVisible}
        onBackdropPress={() => {
          setInfoModalVisible(false);
          setCurrentCoupon(defaultValue);
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].cart,

            borderRadius: 10,
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
            <ThemedText type="subtitle">Coupon</ThemedText>
            <Pressable
              onPress={() => {
                setCurrentCoupon(defaultValue);
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
              <ThemedText type="subtitle">Coupon Code</ThemedText>
              <ThemedText type="default">
                {currentCoupon?.couponCode}
              </ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">Min Order Amount</ThemedText>
              <ThemedText type="default">
                {currentCoupon?.minOrderAmount}
              </ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">Discount Value</ThemedText>
              <ThemedText type="default">
                {currentCoupon?.discountValue}
              </ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">Usage Limit</ThemedText>
              <ThemedText type="default">
                {currentCoupon?.usageLimit}
              </ThemedText>
            </View>
            {/* <View>
                            <ThemedText type="subtitle">Start Date</ThemedText>
                            <ThemedText type="default">{parseDate(currentCoupon?.start_date)}</ThemedText>
                        </View> */}

            <View>
              <ThemedText type="subtitle">Start Date</ThemedText>
              <ThemedText type="default">
                {new Date(currentCoupon?.start_date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </ThemedText>
            </View>

            <View>
              <ThemedText type="subtitle">End Date</ThemedText>
              <ThemedText type="default">
                {new Date(currentCoupon?.end_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </ThemedText>
            </View>

            {currentCoupon?.description && (
              <View>
                <ThemedText type="subtitle">Description</ThemedText>
                <ThemedText type="default">
                  {currentCoupon?.description}
                </ThemedText>
              </View>
            )}
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
            height: vs(330),
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
                ids: [Number(currentCoupon?.id)],
                status: watch("status")?.value,
              };
              watch("status")?.value &&
                updateCouponStatus({
                  variables: {
                    updateCouponStatusInput: {
                      ids: [Number(currentCoupon?.id)],
                      status: watch("status")?.value,
                    },
                  },
                  fetchPolicy: "network-only",
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

      {/* date time picker modal */}
      <DateTimePickerModal
        mode="date"
        dateTimePickerProps={dateTimePickerProps}
        setDateTimePickerProps={setDateTimePickerProps}
        onDateTimeSelection={(event: any, selectedDate: any) => {
          if (event.type != "dismissed") {
            setValue(
              dateModal.start ? "start_date" : "end_date",
              formatTimeForAPI(selectedDate, "yyyy-mm-dd") || ""
            );
          }
          setDateTimePickerProps(getDateTimePickerProps(false));
        }}
      />
    </CustomHeader>
  );
};

export default CouponScreen;

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
