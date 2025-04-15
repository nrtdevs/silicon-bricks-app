// import CustomHeader from "@/components/CustomHeader";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
// import { View, Pressable, FlatList, RefreshControl, ScrollView,Alert } from "react-native";
// import { ScaledSheet, ms, s, vs } from "react-native-size-matters";
// import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
// import React, { useEffect, useState, useMemo } from "react";
// import NoDataFound from "@/components/NoDataFound";
// import Modal from "react-native-modal";
// import CustomValidation from "@/components/CustomValidation";
// import { useForm } from "react-hook-form";
// import { Portal, Dialog } from 'react-native-paper';
// import { ThemeProvider, useTheme } from "@/context/ThemeContext";
// import { labels } from "@/constants/Labels";
// import CustomButton from "@/components/CustomButton";
// import CustomSearchBar from "@/components/CustomSearchBar";
// import { Colors } from "@/constants/Colors";
// import { PaginatedPlansDocument } from "@/graphql/generated";



// const GetAllPlansQuery = gql`
//   query PaginatedPlans($listInputDto: ListInputDTO!) {
//   paginatedPlans(ListInputDTO: $listInputDto) {
//     data {
//       id
//       name
//       description
//       price
//       duration
//       discountedPrice
//       status
//       couponId
//       offerId
//     }
//   }
// }
// `;

// const OFFER_QUERY = gql`
//   query PaginatedOffers($listInputDto: ListInputDTO!) {
//     paginatedOffers(ListInputDTO: $listInputDto) {
//       data {
//         id
//         title
//       }
//     }
//   }
// `;

// const PACKAGE_QUERY = gql`
//   query PaginatedPackages($listInputDto: ListInputDTO!) {
//   paginatedPackages(ListInputDTO: $listInputDto) {
//     data {
//       id
//       name
//       offerId
//     }
//   }
// }
// `;
// const COUPON_QUERY = gql`
//   query PaginatedCoupons($listInputDto: ListInputDTO!) {
//   paginatedCoupons(ListInputDTO: $listInputDto) {
//     data {
//       id
//       couponCode
//     }
//   }
// }
// `;

// const defaultValue = {
//     name: "",
//     description: "",
//     id: "",
// }
// const DELETE_PLAN = gql`
//  mutation DeletePlan($deletePlanId: Int!) {
//   deletePlan(id: $deletePlanId)
// }
// `;
// const Plans = () => {
//     /// Fetch All Plans -- Api
//     const [page, setPage] = useState<number>(1);
//     const [refreshing, setRefreshing] = useState<boolean>(false);
//     const [plansData, { error, data, loading, refetch }] = useLazyQuery(
//         PaginatedPlansDocument
//     );

//     const { theme } = useTheme();

//     /// serach state 
//     const [searchQuery, setSearchQuery] = useState<string>("");

//     // Fetch Plans
//     const fetchPlans = async (isRefreshing = false) => {
//         if (isRefreshing) {
//             setPage(1);
//             setRefreshing(true);
//         }
//         // Params for API
//         const params = {
//             per_page_record: 10,
//             page: isRefreshing ? 1 : page,
//         };

//         await plansData({
//             variables: {
//                 listInputDto: {},
//             },
//         });;
//     };
//     useEffect(() => {
//         fetchPlans();
//     }, []);

//     /// status change state 
//     const [isStatusModalVisible, setStatusModalVisible] = useState(false);
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         reset,
//         watch,
//         setValue
//     } = useForm<{ name: string, description: string, status: any }>({
//         defaultValues: {},
//     });
//     const [currentOrganization, setCurrentOrganization] = useState<{
//         name: string;
//         description: string;
//         id: string;
//     }>(defaultValue);

//     /// Add And Edit Plans
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [editModal, setEditModal] = useState<boolean>(false);
//     const [isFocused, setIsFocused] = useState("");

//     /// fetch offer data
//     const { data: offerData, loading: offerLoading, error: offerError,
//     } = useQuery(OFFER_QUERY, {
//         variables: {
//             listInputDto: {
//                 limit: 10,
//                 page: 1,
//             },
//         },
//     });

//     console.log('0909',data);


//     const pickerData = useMemo(() => {
//         if (!offerData?.paginatedOffers?.data) return [];
//         return offerData.paginatedOffers.data.map((item) => ({
//             label: item.title,
//             value: item.id,
//         }));
//     }, [offerData]);

//     /// fetch package data
//     const { data: packageData, loading: packageLoading, error: packageError, } = useQuery(PACKAGE_QUERY, {
//         variables: {
//             "listInputDto": {
//                 "limit": 10,
//                 "page": 1
//             }
//         }
//     });

//     const packagePickerData = useMemo(() => {
//         if (!packageData?.paginatedPackages?.data) return [];
//         return packageData.paginatedPackages.data.map((item) => ({
//             label: item.name,
//             value: item.id,
//         }));
//     }, [packageData]);

//     /// fetch coupon data
//     const { data: couponData, loading: couponLoading, error: couponError } = useQuery(COUPON_QUERY, {
//         variables: {
//             "listInputDto": {
//                 "limit": 10,
//                 "page": 1
//             }
//         }
//     });
//     const couponPickerData = useMemo(() => {
//         if (!couponData?.paginatedCoupons?.data) return [];
//         return couponData.paginatedCoupons.data.map((item => ({
//             label: item.couponCode,
//             value: item.id,
//         })))
//     }, [couponData]);
//     /// delete Roles 
//         const [deleteRoles, deleteOrganizationState] = useMutation(DELETE_PLAN, {
//             onCompleted: (data) => {
//                 refetch();
//                 Alert.alert("success", "Permission deleted successfully!");
//             },
//             onError: (error) => {
//                 Alert.alert("Error", error.message);
//             }
//         });
//     return (
//         <CustomHeader>
//             <ThemedView style={styles.contentContainer}>
//                 <View style={styles.searchContainer}>
//                     <View style={{ width: "90%" }}>
//                         <CustomSearchBar
//                             searchQuery={searchQuery}
//                             placeholder="Search Roles"
//                             onChangeText={(text) => {
//                                 setSearchQuery(text);
//                             }}
//                         />
//                     </View>
//                     <Pressable
//                         onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
//                     >
//                         <Feather name="plus-square" size={24} color={Colors[theme].text} />
//                     </Pressable>
//                 </View>

//                 <FlatList
//                     data={data?.paginatedPlans?.data}
//                     renderItem={({ item }: any) =>
//                         <View
//                             style={[
//                                 styles.organizationContainer,
//                                 { backgroundColor: Colors[theme].cartBg },
//                             ]}
//                         >
//                             <View style={styles.organizationHeader}>
//                                 <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.name}</ThemedText>
//                                 <View style={styles.organizationInfo}>
//                                     <Feather
//                                         name="edit"
//                                         size={ms(20)}
//                                         color={Colors[theme].text}
//                                         onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
//                                     />
//                                     <View style={{ width: 5 }}></View>
//                                     <MaterialIcons
//                                         name="delete-outline"
//                                         size={ms(22)}
//                                         color={Colors[theme].text}
//                                         onPress={() => {
//                                             Alert.alert(
//                                                 "Delete",
//                                                 "Are you sure you want to delete?",
//                                                 [
//                                                     {
//                                                         text: "Yes", onPress: () => {
//                                                             deleteRoles({
//                                                                 variables: {
//                                                                     deletePlanId: Number(item?.id),
//                                                                 }
//                                                             });
//                                                         }
//                                                     },
//                                                     { text: "No", onPress: () => { } },
//                                                 ]
//                                             );

//                                         }}
//                                     />
//                                     <View style={{ width: 5 }}></View>
//                                     <MaterialIcons
//                                     name="attractions"
//                                     size={ms(22)}
//                                     color="black"
//                                     onPress={() => {
//                                         setCurrentOrganization({
//                                             name: item?.name,
//                                             description: item?.description,
//                                             id: item?.id,
//                                         });
//                                         setStatusModalVisible(true);
//                                     }}
//                                 />
//                                 </View>
//                             </View>

//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Price</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={styles.cardDot}>100</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Discount</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <ThemedText style={styles.cardDot}>10</ThemedText>
//                             </View>
//                             <View style={{ flexDirection: "row" }}>
//                                 <ThemedText style={styles.cardTitle}>Status</ThemedText>
//                                 <ThemedText style={styles.cardDot}>:</ThemedText>
//                                 <View style={{ borderRadius: 5, borderColor: item.status == "active" ? "green" : "red", backgroundColor: item.status == "active" ? "#EAFFF1" : "#FFEEF3", borderWidth: 0.5 }}>
//                                     <ThemedText style={{ color: item.status == "active" ? "green" : "red", fontSize: 18, fontWeight: "normal", paddingHorizontal: 10 }}>
//                                         {item.status}</ThemedText>
//                                 </View>

//                             </View>

//                         </View>
//                     }
//                     refreshControl={
//                         <RefreshControl
//                             refreshing={refreshing}
//                             onRefresh={() => fetchPlans(true)}
//                         />
//                     }
//                     contentContainerStyle={{ paddingBottom: vs(40) }}
//                     ListEmptyComponent={!loading ? <NoDataFound /> : null}
//                 />

//             </ThemedView>

//             {/* Status change modal */}
//             <Modal
//                 isVisible={isStatusModalVisible}
//                 onBackdropPress={() => {
//                     setStatusModalVisible(false);
//                 }}
//             >
//                 <View
//                     style={{
//                         backgroundColor: "white",
//                         height: 200,
//                         width: s(300),
//                         borderRadius: 10,
//                         alignSelf: "center",
//                         padding: 10,
//                     }}
//                 >
//                     <CustomValidation
//                         data={pickerData}
//                         type="picker"
//                         hideStar
//                         control={control}
//                         name="status"
//                         placeholder="Select Status"
//                         inputStyle={{ height: vs(50) }}
//                         rules={{
//                             required: {
//                                 value: true,
//                                 message: "Select status",
//                             },
//                         }}
//                     />
//                 </View>
//             </Modal>

//             {/* Add and Edit Plans modal */}
//             <Modal
//                 isVisible={isModalVisible}
//                 onBackdropPress={() => {
//                     reset();
//                     setCurrentOrganization(defaultValue);
//                     setEditModal(false);
//                     setModalVisible(false);
//                 }}
//             >
//                 <ScrollView
//                     contentContainerStyle={{
//                         backgroundColor: "#faf7f7",
//                         // backgroundAttachment:'blue',
//                         height: vs(860),
//                         width: s(320),
//                         borderRadius: 10,
//                         // alignSelf: "center",
//                         padding: 10,

//                     }}
//                     showsVerticalScrollIndicator={false}
//                 >
//                     <ThemedView>
//                         <View
//                             style={{
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                                 padding: 10,
//                                 paddingBottom: 0,
//                             }}
//                         >
//                             <ThemedText type="subtitle">
//                                 {labels.createPlans}
//                             </ThemedText>
//                             <Pressable
//                                 onPress={() => {
//                                     reset();
//                                     setEditModal(false);
//                                     setCurrentOrganization(defaultValue);
//                                     setModalVisible(false);
//                                 }}
//                             >
//                                 <Entypo name="cross" size={ms(20)} color="grey" />
//                             </Pressable>
//                         </View>

//                         <View style={{ padding: 10 }}>
//                             <CustomValidation
//                                 type="input"
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 name={"name"}
//                                 inputStyle={[{ lineHeight: ms(20) }]}
//                                 label={"Name"}
//                                 onFocus={() => setIsFocused("name")}
//                                 rules={{
//                                     required: editModal ? "Plan Name is required" : "Module name is required"
//                                 }}
//                                 autoCapitalize="none"
//                             />
//                             <CustomValidation
//                                 type="input"
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 name={"discount_price"}
//                                 inputStyle={[{ lineHeight: ms(20) }]}
//                                 label={"Discount Price"}
//                                 onFocus={() => setIsFocused("discount_price")}
//                                 rules={{
//                                     required: editModal ? "Discount is required" : "Module name is required"
//                                 }}
//                                 autoCapitalize="none"
//                             />

//                             <CustomValidation
//                                 type="input"
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 name={"duration_price"}
//                                 inputStyle={[{ lineHeight: ms(20) }]}
//                                 label={"Duration Price"}
//                                 onFocus={() => setIsFocused("duration_price")}
//                                 rules={{
//                                     required: editModal ? "Duration is required" : "Module name is required"
//                                 }}
//                                 autoCapitalize="none"
//                             />

//                             <CustomValidation
//                                 type="input"
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 name={"price"}
//                                 inputStyle={[{ lineHeight: ms(20) }]}
//                                 label={"Price"}
//                                 onFocus={() => setIsFocused("price")}
//                                 rules={{
//                                     required: editModal ? "Price is required" : "Module name is required"
//                                 }}
//                                 autoCapitalize="none"
//                             />

//                             <CustomValidation
//                                 data={pickerData}
//                                 type="picker"
//                                 hideStar
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 onFocus={() => setIsFocused("offer")}
//                                 name="offer"
//                                 label={"Offer"}
//                                 placeholder={offerLoading ? "Loading..." : "Select Status"}
//                                 inputStyle={{ height: vs(50) }}
//                                 rules={{
//                                     required: {
//                                         value: true,
//                                         message: "Select status",
//                                     },
//                                 }}
//                             />
//                             <CustomValidation
//                                 data={packagePickerData}
//                                 type="picker"
//                                 hideStar
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 onFocus={() => setIsFocused("packages")}
//                                 name="packages"
//                                 label={"Packages"}
//                                 placeholder={packageLoading ? "Loading..." : "Select Status"}
//                                 inputStyle={{ height: vs(50) }}
//                                 rules={{
//                                     required: {
//                                         value: true,
//                                         message: "Select status",
//                                     },
//                                 }}
//                             />

//                             <CustomValidation
//                                 data={couponPickerData}
//                                 type="picker"
//                                 hideStar
//                                 control={control}
//                                 labelStyle={styles.label}
//                                 onFocus={() => setIsFocused("coupons")}
//                                 name="coupons"
//                                 label={"Coupons"}
//                                 placeholder={couponLoading ? "Loading..." : "Select Status"}
//                                 inputStyle={{ height: vs(50) }}
//                                 rules={{
//                                     required: {
//                                         value: true,
//                                         message: "Select status",
//                                     },
//                                 }}
//                             />

//                             <CustomValidation
//                                 type="input"
//                                 control={control}
//                                 name={"description"}
//                                 label={"Description"}
//                                 labelStyle={styles.label}
//                                 onFocus={() => setIsFocused("description")}
//                                 rules={{
//                                     required: editModal ? "Test organization description is required" : "Description is required",
//                                 }}
//                             />
//                         </View>

//                         <CustomButton
//                             title="Submit"
//                             // isLoading={createOrganizationState.loading || updateOrganizationState.loading}
//                             onPress={() => {
//                                 // handleSubmit(onSubmit)();
//                             }}
//                             style={{ marginTop: vs(10), marginBottom: vs(15) }}
//                         />
//                     </ThemedView>
//                 </ScrollView>
//             </Modal>

//         </CustomHeader>
//     );
// };
// const styles = ScaledSheet.create({
//     searchContainer: {
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "12@ms",
//     },
//     contentContainer: {
//         flex: 1,
//         padding: "12@ms",
//     },
//     organizationContainer: {
//         width: "100%",
//         padding: "12@ms",
//         borderRadius: "8@ms",
//         marginBottom: "16@ms",
//         gap: "8@ms",
//     },
//     organizationInfo: {
//         flexDirection: "row",
//     },
//     cardTitle: {
//         fontSize: "18@ms",
//         width: 110,
//         color: "black",
//         fontWeight: "700",
//     },
//     cardDot: {
//         fontSize: "18@ms",
//         paddingHorizontal: "10@ms",
//         color: "black",
//         fontWeight: "normal",
//     },
//     organizationHeader: {
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     label: {
//         fontSize: "16@ms",
//         fontWeight: "normal",
//         color: "black",
//         marginBottom: 5,
//         textAlign: "left",
//         alignSelf: "flex-start",
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
// });
// export default Plans;

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

import {
    Alert,
    FlatList,
    Pressable,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
    ChangePlanStatusDocument,
    CreatePlanDocument,
    DeletePlanDocument,
    DropdownOffersDocument,
    PaginatedCouponsDocument,
    PaginatedPackagesDocument,
    PaginatedPlansDocument,
    UpdatePlanDocument,
} from "@/graphql/generated";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView } from "react-native";
import { AntDesign, Entypo, Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
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

const defaultValue = {
    name: "",
    discountPrice: "",
    duration: "",
    price: "",
    offer: "",
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
    const [currentPlanId, setCurrentPlanId] = useState<string>("");
    const [currentPlan, setCurrentPlan] = useState<{
        name: string;
        discountPrice: string;
        duration: string;
        price: string;
        offer: string;
        package: string;
        coupon: string;
        description: string;
        status: any;
        id: string
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
        offer: string;
        package: string;
        coupon: string;
        description: string;
        status: any;
    }>({
        defaultValues: {},
    });

    const [searchQuery, setSearchQuery] = useState<string>("");

    const { can, hasAny } = useUserContext();

    const [plansData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedPlansDocument
    );

    const [dropdownOfferData, offerState] = useLazyQuery(
        DropdownOffersDocument
    );

    const [dropdownCouponData, couponData] = useLazyQuery(
        PaginatedCouponsDocument
    );

    const [dropdownPackageData, packageData] = useLazyQuery(
        PaginatedPackagesDocument
    );

    const [createPlan, createPlanState] = useMutation<any>(CreatePlanDocument, {
        onCompleted: (data) => {
            reset();
            refetch();
            setModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [updatePlan, updatePlanState] = useMutation(UpdatePlanDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setEditModal(false);
            setModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const [deletePlan, deletePlanState] = useMutation(DeletePlanDocument, {
        onCompleted: (data) => {
            refetch();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const [updatePlanStatus, updatePlanStatusState] = useMutation(ChangePlanStatusDocument, {
        onCompleted: (data) => {
            refetch();
            setStatusModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    useEffect(() => {
        if (watch("status")) {
            updatePlanStatus({
                variables: {
                    updatePlanStatusInput: {
                        ids: [Number(currentPlanId)],
                        status: watch("status")?.value
                    }
                },
            });
        }
    }, [watch("status")])

    useEffect(() => {
        setValue("name", currentPlan?.name || "");
        setValue("discountPrice", currentPlan?.discountPrice);
        setValue("duration", currentPlan?.duration || "");
        setValue("price", currentPlan?.price || "");
        setValue("offer", currentPlan?.offer || "");
        setValue("package", currentPlan?.package || "");
        setValue("coupon", currentPlan?.coupon || "");
        setValue("description", currentPlan?.description || "");
    }, [currentPlan]);

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

        await plansData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
    };

    const fetchDropdownData = () => {
        dropdownOfferData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
        dropdownCouponData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
        dropdownPackageData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
    }

    const onSubmit = (data: any) => {
        try {

            let params = {
                couponId: typeof data?.coupon == 'string' ? Number(data?.coupon) : Number(data?.coupon?.id),
                description: data?.description,
                discountedPrice: Number(data?.discountPrice),
                duration: Number(data?.duration),
                name: data?.name,
                offerId: typeof data?.coupon == 'string' ? Number(data?.offer) : Number(data?.offer?.id),
                packageId: typeof data?.coupon == 'string' ? Number(data?.package) : Number(data?.package?.id),
                price: Number(data?.price),
            }

            let params2 = {
                id: Number(currentPlan?.id),
                ...params,
            };

            console.log('params3', params2);

            editModal ?
                updatePlan({
                    variables: {
                        updatePlanInput: params2,
                    },
                })
                : createPlan({
                    variables: {
                        createPlanInput: params,
                    },
                });
        } catch (error) {
            console.log('error in onSubmit', error);
        }
    };

    const renderItem = ({ item, index }: any) => {
        // console.log('0987654321', item);

        return (
            <View
                key={index}
                style={[
                    styles.organizationContainer,
                    { backgroundColor: Colors[theme].cartBg }
                ]}
            >
                <View style={styles.organizationHeader}>
                    <ThemedText type="subtitle" style={{ flex: 1 }}>
                        {item?.name}
                    </ThemedText>
                    <View style={styles.organizationInfo}>
                        <MaterialIcons
                            name="attractions"
                            size={ms(20)}
                            color={Colors[theme].text}
                            onPress={() => {
                                setCurrentPlanId(item?.id);
                                setStatusModalVisible(true);
                            }}
                        />

                        <Feather
                            name="edit"
                            size={ms(20)}
                            color={Colors[theme].text}
                            onPress={() => {
                                setCurrentPlan({
                                    name: item?.name,
                                    discountPrice: String(item?.discountedPrice),
                                    duration: String(item?.duration),
                                    price: String(item?.price),
                                    offer: item?.offerId,
                                    package: item?.package?.id,
                                    coupon: item?.couponId,
                                    description: item?.description,
                                    status: item?.status,
                                    id: item?.id,
                                });
                                setModalVisible(true);
                                setEditModal(true);
                            }}
                        />
                        
                        <MaterialIcons
                            name="delete-outline"
                            size={ms(20)}
                            color={Colors[theme].text}
                            onPress={() => {
                                Alert.alert("Delete", "Are you sure you want to delete?", [
                                    {
                                        text: "Yes",
                                        onPress: () => {
                                            deletePlan({
                                                variables: {
                                                    ids: [Number(item?.id)],
                                                }
                                            });
                                        },
                                    },
                                    { text: "No", onPress: () => { } },
                                ]);
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
                            backgroundColor: theme == "dark" ? Colors?.white : "#e6e2e2",
                        },
                    ]}
                >
                    {item?.status}
                </ThemedText>

                <View style={styles.userInfo}>
                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                        ${item?.price}
                    </ThemedText>
                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                        ${item?.discountedPrice} (after discount)
                    </ThemedText>
                </View>

            </View>
        );
    };

    const debouncedSearch = useCallback(
        debounce((text) => {
            plansData({
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
                    <View style={{ width: "90%" }}>
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
                    </View>
                    <Pressable
                        style={styles.buttonContainer}
                        onPress={() => {
                            fetchDropdownData(),
                                setModalVisible(true),
                                setCurrentPlan(defaultValue);
                        }}
                    >
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={data?.paginatedPlans?.data}
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
                    setCurrentPlan(defaultValue);
                    setEditModal(false);
                    setModalVisible(false);
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: Colors[theme].cartBg,
                        // height: vs(500),
                        width: '100%',
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
                            {editModal ? "Edit" : "Create Plan"}
                        </ThemedText>

                        <Pressable
                            onPress={() => {
                                reset();
                                setEditModal(false);
                                setCurrentPlan(defaultValue);
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
                            placeholder={"Provide Name"}
                            rules={{
                                required: "Name is required",
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"discountPrice"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Discount Price"}
                            placeholder={"Provide Discount Price"}
                            rules={{
                                required: "Discount Price is required",
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"duration"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Duration"}
                            placeholder={"Provide Duration"}
                            rules={{
                                required: "Duration is required",
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"price"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Price"}
                            placeholder={"Provide Price"}
                            rules={{
                                required: "Price is required",
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            data={offerState?.data?.dropdownOffers?.data}
                            type="picker"
                            control={control}
                            keyToCompareData="id"
                            keyToShowData="title"
                            label="Offer"
                            labelStyle={styles.label}
                            name="offer"
                            placeholder="Select Offer"
                            inputStyle={{ height: vs(50) }}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select offerType",
                                },
                            }}
                        />

                        <CustomValidation
                            data={couponData?.data?.paginatedCoupons?.data}
                            type="picker"
                            control={control}
                            keyToCompareData="id"
                            keyToShowData="couponCode"
                            label="Package"
                            labelStyle={styles.label}
                            name="package"
                            placeholder="Select Package"
                            inputStyle={{ height: vs(50) }}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select PackageType",
                                },
                            }}
                        />

                        <CustomValidation
                            data={packageData?.data?.paginatedPackages?.data}
                            type="picker"
                            keyToCompareData="id"
                            keyToShowData="name"
                            control={control}
                            label="Coupon"
                            labelStyle={styles.label}
                            name="coupon"
                            placeholder="Select Coupon"
                            inputStyle={{ height: vs(50) }}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select CouponType",
                                },
                            }}
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
                            rules={{
                                required: editModal
                                    ? "Test organization description is required"
                                    : "Description is required",
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
                        backgroundColor: Colors[theme].cartBg,
                        height: 380,
                        width: s(300),
                        borderRadius: 10,
                        alignSelf: "center",
                        padding: 10,
                    }}
                >
                    <CustomValidation
                        data={statusData}
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
    userInfo: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
