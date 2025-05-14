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

const PurchasePlaneScreen = () => {
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
    console.log('09887', data?.paginatedPlans?.data[0]);


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
                    <ThemedText type="title" style={{ flex: 1, fontSize: ms(26) }}>
                        {item?.name}
                    </ThemedText>
                </View>

                <ThemedText
                    style={[
                        styles.description,
                    ]}
                >
                    {item?.description}
                </ThemedText>

                <View style={styles.userInfo}>
                    <ThemedText type='title' style={{ fontSize: ms(22) }} >
                        ${item?.price} <ThemedText style={{ fontSize: ms(20), color: 'gray' }} >
                            /month
                        </ThemedText>
                    </ThemedText>
                    <ThemedText style={{ fontSize: ms(20) }}>
                        20% OFF
                    </ThemedText>
                </View>

                <CustomButton
                    title="Choose Plan"
                    onPress={() => {
                        handleSubmit(onSubmit)();
                    }}
                    style={{
                        backgroundColor: Colors[theme].background,
                        marginTop: vs(10),
                    }}
                />
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
        </CustomHeader>
    );
};

export default PurchasePlaneScreen;

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
    description: {
        borderRadius: "10@ms",
        fontSize: "20@ms",
    },
    label: {
        color: Colors.grayText,
        fontSize: "14@ms",
        marginBottom: "12@ms",
        fontWeight: 400,
    },
    userInfo: {
        // width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
