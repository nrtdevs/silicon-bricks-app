// import { ms, ScaledSheet, vs } from 'react-native-size-matters';
// import CustomHeader from "@/components/CustomHeader";
// import { ThemedText } from "@/components/ThemedText";
// import { FlatList, Pressable, View } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ThemedView } from '@/components/ThemedView';
// import { Feather, MaterialIcons } from '@expo/vector-icons';
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { Portal, Dialog } from 'react-native-paper';
// import { ThemeProvider, useTheme } from '@/context/ThemeContext';
// import React, { useCallback, useEffect, useState } from 'react'
// import { router } from 'expo-router';
// import { gql, useLazyQuery, useMutation } from "@apollo/client";
// import { Colors } from '@/constants/Colors';
// import AddPromotion from '@/components/addPromotions';
// import EditPromotion from '@/components/EditPromotion';
// import CustomSearchBar from '@/components/CustomSearchBar';
// import debounce from "lodash.debounce";
// import { labels } from '@/constants/Labels';

// const GetAllPromotion = gql`
//   query PaginatedOffers($listInputDto: ListInputDTO!) {
//   paginatedOffers(ListInputDTO: $listInputDto) {
//     data {
//       id
//       title
//       description
//       offerType
//       discountType
//       discountValue
//       maxDiscountAmount
//       cashbackAmount
//       minOrderAmount
//       usageLimit
//       status
//       startDate
//       endDate
//     }
//   }
// }
// `;
// const DELETE_PROMOTION = gql`
//   mutation DeleteOffer($deleteOfferId: Int!) {
//   deleteOffer(id: $deleteOfferId)
// }
// `;
// const Promotions = () => {

//     /// Delete promotions state --
//     const [selectedPromptionId, setSelectedPromotionId] = useState<number | null>(null);
//     const [deleteVisible, setDeleteVisible] = React.useState(false);
//     const [searchQuery, setSearchQuery] = useState<string>("");
//     const [editScreen, setEditScreen] = useState<boolean>(false)
//     const hideDeleteDialogue = () => { setDeleteVisible(false) };
//     const { theme } = useTheme()
//     const showDeleteDialogue = (id: number) => {
//         setSelectedPromotionId(id);
//         setDeleteVisible(true)
//     };
//     const [deleteProject] = useMutation(DELETE_PROMOTION, {
//         onCompleted: () => {
//             console.log("Project deleted successfully");
//             setDeleteVisible(false);
//         },
//         onError: (error) => {
//             console.error("Error deleting project:", error);
//         },
//     });
//     const handleDelete = async () => {
//         if (selectedPromptionId !== null) {
//             try {
//                 await deleteProject({ variables: { deleteProjectId: Number(setSelectedPromotionId) } });
//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         }
//     };

//     /// get All promotions --

//     const [getAllPromotion, { data, loading, error }] = useLazyQuery(GetAllPromotion);
//     useEffect(() => {
//         console.log("Get All Promotions", data);
//         getAllPromotion({
//             variables: {
//                 listInputDto: {
//                     page: 1,
//                     limit: 10,
//                 },
//             },
//         });
//     }, []);

//     const debouncedSearch = useCallback(
//         debounce((text) => {
//             // organizationData({
//             //     variables: {
//             //         listInputDto: {
//             //             limit: 10,
//             //             page: 1,
//             //             search: text,
//             //         },
//             //     },
//             // });
//         }, 500),
//         [searchQuery]
//     );

//     const promotions = data?.paginatedOffers.data || [];

//     return (
//         <CustomHeader>
//             <ThemedView style={styles.contentContainer}>
//                 <View style={styles.searchContainer}>
//                     <View style={{ width: "90%" }}>
//                         <CustomSearchBar
//                             searchQuery={searchQuery}
//                             onChangeText={(text) => {
//                                 setSearchQuery(text);
//                                 debouncedSearch(text);
//                             }}
//                             placeholder={labels?.searchOrganization}
//                             // loading={loading}
//                             onClear={() => {
//                                 setSearchQuery("");
//                             }}
//                         />
//                     </View>
//                     <Pressable
//                         style={styles.buttonContainer}
//                     // onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
//                     >
//                         <Feather name="plus-square" size={24} color={Colors[theme].text} />
//                     </Pressable>
//                 </View>
//                 <FlatList
//                     data={promotions}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <View
//                             style={{ backgroundColor: "#C9C9C9", margin: 15, borderRadius: 8, padding: 10 }}>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Title</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={styles.cardDot}>{item.title}</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Offer Type</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={styles.cardDot}>{item.offerType}</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Discount</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={styles.cardDot}>{item.discountValue}</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Usage Limit</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={styles.cardDot}>{item.usageLimit}</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Status</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={{ color: "green", fontWeight: 'normal', fontSize: 18, paddingHorizontal: 10 }}>{item.status}</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Action</ThemedText>
//                                 <ThemedText style={styles.cardDot}>: </ThemedText>
//                                 <Feather
//                                     name="edit"
//                                     size={ms(22)}
//                                     color="black"
//                                     onPress={() => {
//                                         router.push({
//                                             pathname: "/(subComponents)/addPromotions",
//                                             params: { id: 1, title: "poprpro" },
//                                         })
//                                     }}
//                                 />
//                                 <View style={{ width: 5 }}></View>
//                                 <MaterialIcons
//                                     name="delete-outline"
//                                     size={ms(24)}
//                                     color="black"
//                                     onPress={() => showDeleteDialogue(item.id)}
//                                 />
//                                 <View style={{ width: 10 }}></View>
//                             </View>
//                         </View>
//                     )}
//                 />
//                 <Pressable
//                     style={styles.fab}
//                     onPress={() => <AddPromotion />}
//                 >
//                     <Feather name="plus" color="black" size={24}></Feather>
//                 </Pressable>

//                 <Portal>
//                     <ThemeProvider>
//                         <Dialog visible={deleteVisible} onDismiss={hideDeleteDialogue}>
//                             <Dialog.Content>
//                                 <ThemedText style={styles.label}>
//                                     Do You Want To Really Delete The Project
//                                 </ThemedText>
//                             </Dialog.Content>
//                             <Dialog.Actions>
//                                 <Pressable
//                                     onPress={handleDelete}
//                                     style={styles.buttonContainerSave}
//                                 >
//                                     <ThemedText style={{ color: 'white', fontSize: 14, fontWeight: "normal" }}>Yes</ThemedText>
//                                 </Pressable>
//                                 <Pressable
//                                     onPress={hideDeleteDialogue}
//                                     style={styles.buttonContainerClose}
//                                 >
//                                     <ThemedText style={{ color: 'black', fontSize: 14, fontWeight: "normal" }}>No</ThemedText>
//                                 </Pressable>
//                             </Dialog.Actions>
//                         </Dialog>
//                     </ThemeProvider>
//                 </Portal>
//             </ThemedView>
//         </CustomHeader>
//     );
// }
// export default Promotions;

// const styles = ScaledSheet.create({
//     contentContainer: {
//         flex: 1,
//         padding: "12@ms",
//     },
//     container: {
//         flexGrow: 1,
//     },
//     card: {
//         marginHorizontal: 10,
//         marginVertical: 10,
//         borderRadius: 10,
//         padding: 10,
//     },
//     cardTitle: {
//         fontSize: 18,
//         width: 110,
//         color: "black",
//         fontWeight: "500",
//     },
//     buttonContainer: {},
//     cardDot: {
//         fontSize: 18,
//         paddingHorizontal: 10,
//         color: "black",
//         fontWeight: "normal",
//     },
//     organizationParentContainer: {
//         marginTop: "12@ms",
//     },
//     searchContainer: {
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "12@ms",
//     },
//     fab: {
//         position: "absolute",
//         bottom: 20,
//         right: 20,
//         width: 50,
//         height: 50,
//         borderRadius: 35,
//         backgroundColor: "#C9C9C9",
//         alignItems: "center",
//         justifyContent: "center",
//         elevation: 3,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3,
//     },
//     buttonContainerClose: {
//         borderRadius: 10,
//         paddingVertical: 5,
//         marginTop: 10,
//         paddingHorizontal: 20,
//         borderColor: "black",
//         borderWidth: 0.5,
//     },
//     buttonContainerSave: {
//         backgroundColor: "#E06557",
//         borderRadius: 10,
//         paddingVertical: 5,
//         marginTop: 10,
//         paddingHorizontal: 20,
//     },
//     label: {
//         fontSize: "16@ms",
//         fontWeight: "normal",
//         color: "black",
//         marginBottom: 5,
//         textAlign: "left",
//         alignSelf: "flex-start",
//     },
// });

import { Alert, FlatList, Pressable, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangeCouponStatusDocument,
  ChangeOfferStatusDocument,
  CreateCouponDocument,
  CreateCouponMutation,
  CreateOfferDocument,
  DeleteCouponDocument,
  DeleteOfferDocument,
  PaginatedCouponsDocument,
  PaginatedOffersDocument,
  UpdateCouponDocument,
  UpdateOfferDocument,
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
import { string } from "zod";
import { useFocusEffect } from "expo-router";

const defaultValue = {
  title: "",
  offerType: "",
  discountType: "",
  discountValue: "",
  maxDiscountAmount: "",
  minOrderAmount: "",
  usageLimit: "",
  cashbackAmount: "",
  description: "",
  start_date: " ",
  end_date: " ",
  status: "",
  id: "",
};

const pickerData = [
  { label: "Percentage", value: "PERCENTAGE" },
  { label: "Fixed Amount", value: "FIXED_AMOUNT" },
];

const pickerOfferData = [
  { label: "Buy One Get One", value: "BUY_ONE_GET_ONE" },
  { label: "Discount", value: "DISCOUNT" },
  { label: "CASHBACK", value: "CASHBACK" },
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
  const [isFocused, setIsFocused] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<{
    title: string;
    offerType: string;
    discountType: string;
    discountValue: string;
    maxDiscountAmount: string;
    minOrderAmount: string;
    usageLimit: string;
    cashbackAmount: string;
    description: string;
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
    discountType: string;
    usageLimit: string;
    description: string;
    maxDiscountAmount: string;
    minOrderAmount: string;
    start_date: string;
    end_date: string;
    status: any;
    title: string;
    offerType: string;
    couponValue: string;
    discountValue: string;
    cashbackAmount: string;
  }>({
    defaultValues: {},
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { can, hasAny } = useUserContext();

  const deletePermission = can("MasterApp:Offer:Delete");
  const updatePermission = can("MasterApp:Offer:Update");
  const createPermission = can("MasterApp:Offer:Create");
  const statusPermission = can("MasterApp:Offer:Action");

  const [offerData, { error, data, loading, refetch }] = useLazyQuery(
    PaginatedOffersDocument
  );

  const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
    getDateTimePickerProps(false)
  );

  const [dateModal, setDateModal] = useState({
    start: false,
    end: false,
  });

  const [createOffer, createOfferState] = useMutation<any>(
    CreateOfferDocument,
    {
      onCompleted: (data) => {
        reset();
        refetch();
        setModalVisible(false);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    }
  );

  const [updateOffer, updateOfferState] = useMutation(UpdateOfferDocument, {
    onCompleted: (data) => {
      reset();
      refetch();
      setEditModal(false);
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [deleteOffer, deleteOfferState] = useMutation(DeleteOfferDocument, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const [updateOfferStatus, updateOfferStatusState] = useMutation(
    ChangeOfferStatusDocument,
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

  useEffect(() => {
    fetchCoupons();
  }, []);
  useFocusEffect(
      useCallback(() => {
        fetchCoupons();
        // setSearch(false);
      }, [])
    );

  useEffect(() => {
    if (watch("status")) {
      updateOfferStatus({
        variables: {
          updateOfferStatusInput: {
            ids: [Number(currentOffer?.id)],
            status: watch("status")?.value,
          },
        },
      });
    }
  }, [watch("status")]);

  useEffect(() => {
    setValue("title", currentOffer?.title);
    setValue("offerType", currentOffer?.offerType);
    setValue("discountType", currentOffer?.discountType);
    setValue("discountValue", currentOffer?.discountValue.toString() || "");
    setValue(
      "maxDiscountAmount",
      currentOffer?.maxDiscountAmount?.toString() || ""
    );
    setValue("minOrderAmount", currentOffer?.minOrderAmount?.toString() || "");
    setValue("usageLimit", currentOffer?.usageLimit?.toString() || "");
    setValue("cashbackAmount", currentOffer?.cashbackAmount?.toString() || "");
    setValue("description", currentOffer?.description || "");
    setValue(
      "start_date",
      formatTimeForAPI(currentOffer?.start_date, "yyyy-mm-dd") || ""
    );
    setValue(
      "end_date",
      formatTimeForAPI(currentOffer?.end_date, "yyyy-mm-dd") || ""
    );
    // setValue("status", currentOffer?.status || "");
  }, [currentOffer]);

  const fetchCoupons = async (isRefreshing = false) => {
    if (isRefreshing) {
      setPage(1);
      setRefreshing(true);
    }
    // Params for API
    const params = {
      per_page_record: 10,
      page: isRefreshing ? 1 : page,
    };
    await offerData({
      variables: {
        listInputDto: {
          limit: 10,
          page: 1,
        },
      },
    });
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

      let params = {
        cashbackAmount: Number(data?.cashbackAmount),
        description: data?.description,
        discountType:
          typeof data?.discountType === "string"
            ? data?.discountType
            : data?.discountType?.value,
        discountValue: Number(data?.discountValue),
        endDate: data?.end_date,
        maxDiscountAmount: Number(data?.maxDiscountAmount),
        minOrderAmount: Number(data?.minOrderAmount),
        offerType:
          typeof data?.offerType === "string"
            ? data?.offerType
            : data?.offerType?.value,
        startDate: data?.start_date,
        title: data?.title,
        usageLimit: Number(data?.usageLimit),
      };
      let params2 = {
        id: Number(currentOffer?.id),
        ...params,
      };

      editModal
        ? updateOffer({
            variables: {
              updateOfferInput: params2,
            },
          })
        : createOffer({
            variables: {
              createOfferInput: params,
            },
          });
    } catch (error) {
      console.log("error in onSubmit", error);
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={[
          styles.organizationContainer,
          { backgroundColor: Colors[theme].cart },
        ]}
      >
        <View style={styles.organizationHeader}>
          <ThemedText type="subtitle" style={{ flex: 1 }}>
            {item?.title}
          </ThemedText>
          <View style={styles.organizationInfo}>
            {statusPermission && (
              <MaterialIcons
                name="attractions"
                size={ms(20)}
                color={Colors[theme].text}
                onPress={() => {
                  setCurrentOffer({
                    title: item?.title,
                    offerType: item?.offerType,
                    discountType: item?.discountType,
                    discountValue: item?.discountValue,
                    maxDiscountAmount: item?.maxDiscountAmount,
                    minOrderAmount: item?.minOrderAmount,
                    usageLimit: item?.usageLimit,
                    cashbackAmount: item?.cashbackAmount,
                    description: item?.description,
                    start_date: item?.startDate,
                    end_date: item?.endDate,
                    status: item?.status,
                    id: item?.id,
                  });
                  setStatusModalVisible(true);
                }}
              />
            )}

            {updatePermission && (
              <Feather
                name="edit"
                size={ms(20)}
                color={Colors[theme].text}
                onPress={() => {
                  setCurrentOffer({
                    title: item?.title,
                    offerType: item?.offerType,
                    discountType: item?.discountType,
                    discountValue: item?.discountValue,
                    maxDiscountAmount: item?.maxDiscountAmount,
                    minOrderAmount: item?.minOrderAmount,
                    usageLimit: item?.usageLimit,
                    cashbackAmount: item?.cashbackAmount,
                    description: item?.description,
                    start_date: item?.startDate,
                    end_date: item?.endDate,
                    status: item?.status,
                    id: item?.id,
                  });
                  setModalVisible(true);
                  setEditModal(true);
                }}
              />
            )}

            {deletePermission && (
              <MaterialIcons
                name="delete-outline"
                size={ms(20)}
                color={Colors[theme].text}
                onPress={() => {
                  Alert.alert("Delete", "Are you sure you want to delete?", [
                    {
                      text: "Yes",
                      onPress: () => {
                        setCurrentOffer({
                          title: item?.title,
                          offerType: item?.offerType,
                          discountType: item?.discountType,
                          discountValue: item?.discountValue,
                          maxDiscountAmount: item?.maxDiscountAmount,
                          minOrderAmount: item?.minOrderAmount,
                          usageLimit: item?.usageLimit,
                          cashbackAmount: item?.cashbackAmount,
                          description: item?.description,
                          start_date: item?.startDate,
                          end_date: item?.endDate,
                          status: item?.status,
                          id: item?.id,
                        });
                        deleteOffer({
                          variables: {
                            ids: [Number(item?.id)],
                          },
                        });
                      },
                    },
                    { text: "No", onPress: () => {} },
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

        <View style={styles.userInfo}>
          <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
            ${item?.offerType}
          </ThemedText>
          <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
            {item?.discountType}
          </ThemedText>
        </View>
      </View>
    );
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      offerData({
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
              placeholder={labels?.searchOffer}
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
                setModalVisible(true), setCurrentOffer(defaultValue);
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
            data={data?.paginatedOffers?.data}
            renderItem={renderItem}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={() => fetchCoupons(true)}
            //     />
            // }
            ListEmptyComponent={!loading ? <NoDataFound /> : null}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
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
          />
        </View>
      </ThemedView>

      {/* CREATE AND EDIT MODAL */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          reset();
          setCurrentOffer(defaultValue);
          setEditModal(false);
          setModalVisible(false);
        }}
      >
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Colors[theme].cart,
            // height: vs(500),
            width: s(300),
            borderRadius: 10,
            alignSelf: "center",
            padding: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
            }}
          >
            <ThemedText type="subtitle">
              {editModal ? "Edit" : "Create Offer"}
            </ThemedText>

            <Pressable
              onPress={() => {
                reset();
                setEditModal(false);
                setCurrentOffer(defaultValue);
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
              name={"title"}
              inputStyle={[{ lineHeight: ms(20) }]}
              label={"Title"}
              placeholder={"Provide Title"}
              rules={{
                required: "Title is required",
              }}
              autoCapitalize="none"
            />

            <CustomValidation
              data={pickerOfferData}
              type="picker"
              control={control}
              label="Offer Type"
              labelStyle={styles.label}
              name="offerType"
              placeholder="Select Offer Type"
              inputStyle={{ height: vs(50) }}
              rules={{
                required: {
                  value: true,
                  message: "Select offerType",
                },
              }}
            />

            <CustomValidation
              data={pickerData}
              type="picker"
              control={control}
              label="Discount Type"
              labelStyle={styles.label}
              name="discountType"
              placeholder="Select discount type"
              inputStyle={{ height: vs(50) }}
              rules={{
                required: {
                  value: true,
                  message: "Select discountType",
                },
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name={"discountValue"}
              label={"Discount Value"}
              placeholder={"Enter Discount Value"}
              keyboardType="number-pad"
              labelStyle={styles.label}
              rules={{
                required: "Discount Value is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name={"maxDiscountAmount"}
              label={"Max Discount Amount"}
              placeholder={"Enter max discount amount"}
              keyboardType="number-pad"
              labelStyle={styles.label}
              rules={{
                required: "Max discount amount is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name={"minOrderAmount"}
              keyboardType="number-pad"
              label={"Min Order Amount"}
              placeholder={"Enter min order amount"}
              labelStyle={styles.label}
              rules={{
                required: "Min order amount is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name={"usageLimit"}
              keyboardType="number-pad"
              label={"Usage Limit"}
              placeholder={"Enter usageLimit"}
              labelStyle={styles.label}
              rules={{
                required: "Usage limit is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              name={"cashbackAmount"}
              keyboardType="number-pad"
              label={"Cashback Amount"}
              placeholder={"Enter cashbackAmount"}
              labelStyle={styles.label}
              rules={{
                required: "Cashback amount is required",
              }}
            />

            <CustomValidation
              type="input"
              control={control}
              placeholder="Start Date"
              name="start_date"
              editable={true}
              rightIcon={
                <Fontisto
                  name="date"
                  size={ms(20)}
                  color={Colors[theme]?.text}
                />
              }
              onPress={() => {
                setDateModal({
                  start: !dateModal.start,
                  end: false,
                });
                setDateTimePickerProps(getDateTimePickerProps(true));
              }}
              pointerEvents="none"
            />

            <CustomValidation
              type="input"
              control={control}
              placeholder="End Date"
              name="end_date"
              editable={false}
              rightIcon={
                <Fontisto
                  name="date"
                  size={ms(20)}
                  color={Colors[theme]?.text}
                />
              }
              onPress={() => {
                setDateModal({
                  end: !dateModal.end,
                  start: false,
                });
                setDateTimePickerProps(getDateTimePickerProps(true));
              }}
              pointerEvents="none"
            />

            <CustomValidation
              type="input"
              control={control}
              name={"description"}
              multiline
              label={"Description"}
              // placeholder={editModal ? "Test organization description" : "Enter description"}
              labelStyle={styles.label}
              inputContainerStyle={{
                height: vs(100),
              }}
              inputStyle={{
                height: vs(100),
              }}
              containerStyle={{
                height: vs(100),
              }}
              autoCapitalize="none"
            />

            <CustomButton
              title="Submit"
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
              style={{
                backgroundColor: Colors[theme].background,
                marginTop: vs(50),
              }}
            />
          </View>
        </ScrollView>
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
            data={statusData}
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

      {/* date time picker modal */}
      <DateTimePickerModal
        mode="date"
        dateTimePickerProps={dateTimePickerProps}
        setDateTimePickerProps={setDateTimePickerProps}
        onDateTimeSelection={(event: any, selectedDate: any) => {
          console.log("selectedDate", selectedDate);
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  organizationInfo: {
    width: "30%",
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
