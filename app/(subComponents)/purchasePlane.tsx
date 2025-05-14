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
import NoDataFound from "@/components/NoDataFound";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";

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
        package: any;
        coupon: any;
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
    const statusUpdatePermission = can("MasterApp:Plan:Action");

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

    // packageData?.data?.paginatedPackages?.data
    useEffect(() => {
        if (watch("package")) {
            console.log('00000', watch('package'));
            setValue("price", watch("package")?.price.toString());
        }
    }, [watch("package")])

    // useEffect(() => {
    //     console.log('00000', currentPlan);

    //     setValue("name", currentPlan?.name || "");
    //     setValue("discountPrice", currentPlan?.discountPrice);
    //     setValue("duration", currentPlan?.duration || "");
    //     setValue("price", currentPlan?.price || "");
    //     setValue("offer", currentPlan?.offer || "");
    //     setValue("package", currentPlan?.package || "");
    //     setValue("coupon", currentPlan?.coupon || "");
    //     setValue("description", currentPlan?.description || "");
    // }, [currentPlan]);
    // console.log('00000', currentPlan);


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
                name: data?.name,
                duration: Number(data?.duration),
                packageId: typeof data?.package == 'string' ? Number(data?.package) : Number(data?.package?.id),
                price: Number(data?.price),
                // couponId: typeof data?.coupon == 'string' ? Number(data?.coupon) : Number(data?.coupon?.id),
                description: data?.description,
            }

            let params2 = {
                id: Number(currentPlan?.id),
                ...params,
            };

            console.log('params3', data?.coupon);
            console.log('params3', data?.package);
            console.log('params3', typeof data?.price);
            console.log('params3', params);

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
                        {statusUpdatePermission && <MaterialIcons
                            name="attractions"
                            size={ms(22)}
                            color={Colors[theme].text}
                            onPress={() => {
                                setCurrentPlanId(item?.id);
                                setStatusModalVisible(true);
                            }}
                        />}

                        {updatePermission && <Feather
                            name="edit"
                            size={ms(22)}
                            color={Colors[theme].text}
                            onPress={() => {
                                setCurrentPlan({
                                    name: item?.name,
                                    discountPrice: String(item?.discountedPrice),
                                    duration: String(item?.duration),
                                    price: String(item?.price),
                                    package: item?.package?.id,
                                    coupon: item?.couponId,
                                    description: item?.description,
                                    status: item?.status,
                                    id: item?.id,
                                });
                                setEditModal(true);
                                setModalVisible(true);
                            }}
                        />}

                        {deletePermission && <MaterialIcons
                            name="delete-outline"
                            size={ms(22)}
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
                        />}
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
                    <View style={{ flex: 1 }}>
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
                        <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
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
                            name={"duration"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Duration (in month)"}
                            placeholder={"Provide Duration"}
                            rules={{
                                required: "Duration is required",
                            }}
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                        <CustomValidation
                            data={packageData?.data?.paginatedPackages?.data}
                            type="picker"
                            control={control}
                            keyToCompareData="id"
                            keyToShowData="name"
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
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"price"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            editable={false}
                            label={"Price"}
                            placeholder={"Provide Price"}
                            rules={{
                                required: "Price is required",
                            }}
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                        <CustomValidation
                            data={couponData?.data?.paginatedCoupons?.data}
                            type="picker"
                            keyToCompareData="id"
                            keyToShowData="couponCode"
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
