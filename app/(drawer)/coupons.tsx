import {
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
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import debounce from "lodash.debounce";
import { useUserContext } from "@/context/RoleContext";
import EditPromotion from "@/components/EditPromotion";

const defaultValue = {
    couponCode: "",
    discountType: "",
    usageLimit: "",
    description: "",
    maxDiscountAmount: "",
    minOrderAmount: "",
    start_date: " ",
    end_date: " ",
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
    const [isFocused, setIsFocused] = useState("");
    const [editModal, setEditModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [currentCoupon, setCurrentCoupon] = useState<{
        couponCode: any;
        discountType: string;
        usageLimit: string;
        description: string;
        maxDiscountAmount: string;
        minOrderAmount: string;
        start_date: string;
        end_date: string;
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
        couponCode: any;
        discountType: string;
        usageLimit: string;
        description: string;
        maxDiscountAmount: string;
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

    const [createCoupon, createCouponState] = useMutation<any>(CreateCouponDocument, {
        onCompleted: (data) => {
            reset();
            refetch();
            setModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [updateCoupon, updateCouponState] = useMutation(UpdateCouponDocument, {
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

    const [deleteCoupon, deleteCouponState] = useMutation(DeleteCouponDocument, {
        onCompleted: (data) => {
            refetch();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const [updateCouponStatus, updateCouponStatusState] = useMutation(ChangeCouponStatusDocument, {
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
        console.log('9999', currentCoupon?.id);

        if (watch("status")) {
            updateCouponStatus({
                variables: {
                    updateCouponStatusInput: {
                        ids: [Number(currentCoupon?.id)],
                        status: watch("status")?.value
                    }
                },
            });
        }
    }, [watch("status")])

    useEffect(() => {
        setValue("couponCode", currentCoupon?.couponCode || "");
        setValue("discountType", currentCoupon?.discountType);
        setValue("usageLimit", currentCoupon?.usageLimit?.toString() || "");
        setValue("description", currentCoupon?.description || "");
        setValue("maxDiscountAmount", currentCoupon?.maxDiscountAmount?.toString() || "");
        setValue("minOrderAmount", currentCoupon?.minOrderAmount?.toString() || "");
        setValue("start_date", formatTimeForAPI(currentCoupon?.start_date, "yyyy-mm-dd") || "");
        setValue("end_date", formatTimeForAPI(currentCoupon?.end_date, "yyyy-mm-dd") || "");
    }, [currentCoupon]);


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

        await couponData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
    };

    const parseDate = (dateStr: string) => {
        const [month, day, year] = dateStr.split('/');
        return new Date(+year, +month - 1, +day);
    };

    const onSubmit = (data: any) => {
        try {
            const startDate = parseDate(data?.start_date);
            const endDate = parseDate(data?.end_date);

            if (endDate < startDate) {
                console.log("End date should be greater than or equal to start date.");
                Alert.alert("Error", "End date should be greater than or equal to start date.");
                return;
            }

            let params = {
                couponCode: data?.couponCode,
                description: data?.description,
                discountType: data?.discountType?.value,
                maxDiscountAmount: Number(data?.maxDiscountAmount),
                minOrderAmount: Number(data?.minOrderAmount),
                startDate: data?.start_date,
                endDate: data?.end_date,
                usageLimit: Number(data?.usageLimit),
            };
            let params2 = {
                id: Number(currentCoupon?.id),
                ...params,
            };
            console.log('params2', params2);
            console.log('params', editModal);

            editModal ?
                updateCoupon({
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
            console.log('error in onSubmit', error);
        }
    };

    const renderItem = ({ item, index }: any) => {
        return (
            <View
                key={index}
                style={[
                    styles.organizationContainer,
                    { backgroundColor: Colors[theme].cartBg },
                ]}
            >
                <View style={styles.organizationHeader}>
                    <ThemedText type="subtitle" style={{ flex: 1 }}>
                        {item?.couponCode}
                    </ThemedText>
                    <View style={styles.organizationInfo}>
                        {statusUpdatePermission && <MaterialIcons
                            name="attractions"
                            size={ms(22)}
                            color={Colors[theme].text}
                            onPress={() => {
                                // setCurrentOrganization({
                                //   name: item?.name,
                                //   description: item?.description,
                                //   id: item?.id,
                                // });
                                setCurrentCoupon({
                                    couponCode: item?.couponCode,
                                    discountType: item?.discountType,
                                    usageLimit: item?.usageLimit,
                                    description: item?.description,
                                    maxDiscountAmount: item?.maxDiscountAmount,
                                    minOrderAmount: item?.minOrderAmount,
                                    start_date: item?.startDate,
                                    end_date: item?.endDate,
                                    status: item?.status,
                                    id: item?.id,
                                });
                                setStatusModalVisible(true);
                            }}
                        />}

                        {updatePermission && <Feather
                            name="edit"
                            size={ms(22)}
                            color={Colors[theme].text}
                            onPress={() => {
                                setCurrentCoupon({
                                    couponCode: item?.couponCode,
                                    discountType: item?.discountType,
                                    usageLimit: item?.usageLimit,
                                    description: item?.description,
                                    maxDiscountAmount: item?.maxDiscountAmount,
                                    minOrderAmount: item?.minOrderAmount,
                                    start_date: item?.startDate,
                                    end_date: item?.endDate,
                                    status: item?.status,
                                    id: item?.id,
                                });
                                setModalVisible(true);
                                setEditModal(true);
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
                                            setCurrentCoupon({
                                                couponCode: item?.couponCode,
                                                discountType: item?.discountType,
                                                usageLimit: item?.usageLimit,
                                                description: item?.description,
                                                maxDiscountAmount: item?.maxDiscountAmount,
                                                minOrderAmount: item?.minOrderAmount,
                                                start_date: item?.startDate,
                                                end_date: item?.end_date,
                                                status: item?.status,
                                                id: item?.id,
                                            });
                                            deleteCoupon({
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
                            // color:
                            // item.status == "active" ? Colors?.green : "#6d6d1b",
                            backgroundColor: theme == "dark" ? Colors?.white : "#e6e2e2",
                        },
                    ]}
                >
                    {item?.status}
                </ThemedText>

                <View style={styles.userInfo}>
                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                        {item?.discountType}
                    </ThemedText>
                </View>
            </View>
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
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{flex:1}}>
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
                    <Pressable
                        style={styles.buttonContainer}
                        onPress={() => {
                            setModalVisible(true), setCurrentCoupon(defaultValue);
                        }}
                    >
                        <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={data?.paginatedCoupons?.data}
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
                    setCurrentCoupon(defaultValue);
                    setEditModal(false);
                    setModalVisible(false);
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: Colors[theme].cartBg,
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
                            {editModal ? "Edit" : "Create Coupon"}
                        </ThemedText>

                        <Pressable
                            onPress={() => {
                                reset();
                                setEditModal(false);
                                setCurrentCoupon(defaultValue);
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
                            name={"couponCode"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Coupon Code"}
                            placeholder={"Provide coupon code"}
                            rules={{
                                required: "couponCode is required",
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            data={pickerData}
                            type="picker"
                            hideStar={false}
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
                            placeholder="Start Date"
                            name="start_date"
                            label="Start Date"
                            labelStyle={styles.label}
                            editable={true}
                            rightIcon={
                                <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                            }
                            onPress={() => {
                                setDateModal({
                                    start: !dateModal.start,
                                    end: false,
                                });
                                setDateTimePickerProps(getDateTimePickerProps(true));
                            }}
                            pointerEvents="none"
                            rules={{
                                required: "Start date is required",
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            placeholder="Start Date"
                            name="end_date"
                            label="End Date"
                            labelStyle={styles.label}
                            editable={true}
                            rightIcon={
                                <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                            }
                            onPress={() => {
                                setDateModal({
                                    end: !dateModal.end,
                                    start: false,
                                });
                                setDateTimePickerProps(getDateTimePickerProps(true));
                            }}
                            pointerEvents="none"
                            rules={{
                                required: "End date is required",
                            }}
                        />

                        {/* <CustomValidation
                            type="input"
                            control={control}
                            placeholder="End Date"
                            name="end_date"
                            label="End Date"
                            labelStyle={styles.label}
                            rightIcon={
                                <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                            }
                            onPress={() => {
                                setDateModal({
                                    end: !dateModal.end,
                                    start: false,
                                });
                                setDateTimePickerProps(getDateTimePickerProps(true));
                            }}
                            pointerEvents="none"
                            rules={{
                                required: "End date is required",
                            }}
                        /> */}

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

            {/* date time picker modal */}
            <DateTimePickerModal
                dateTimePickerProps={dateTimePickerProps}
                setDateTimePickerProps={setDateTimePickerProps}
                onDateTimeSelection={(event: any, selectedDate: any) => {
                    console.log("selectedDate", selectedDate)
                    if (event.type != "dismissed") {
                        setValue(
                            dateModal.start ? "start_date" : "end_date",
                            formatTimeForAPI(selectedDate, "yyyy-mm-dd") || "",
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
    buttonContainer: {marginLeft: "12@ms"},
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
