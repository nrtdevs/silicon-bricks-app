import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { View, Pressable, FlatList, RefreshControl, ScrollView,Alert } from "react-native";
import { ScaledSheet, ms, s, vs } from "react-native-size-matters";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState, useMemo } from "react";
import NoDataFound from "@/components/NoDataFound";
import Modal from "react-native-modal";
import CustomValidation from "@/components/CustomValidation";
import { useForm } from "react-hook-form";
import { Portal, Dialog } from 'react-native-paper';
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { labels } from "@/constants/Labels";
import CustomButton from "@/components/CustomButton";
import CustomSearchBar from "@/components/CustomSearchBar";
import { Colors } from "@/constants/Colors";



const GetAllPlansQuery = gql`
  query PaginatedPlans($listInputDto: ListInputDTO!) {
  paginatedPlans(ListInputDTO: $listInputDto) {
    data {
      id
      name
      description
      price
      duration
      discountedPrice
      status
      couponId
      offerId
    }
  }
}
`;

const OFFER_QUERY = gql`
  query PaginatedOffers($listInputDto: ListInputDTO!) {
    paginatedOffers(ListInputDTO: $listInputDto) {
      data {
        id
        title
      }
    }
  }
`;

const PACKAGE_QUERY = gql`
  query PaginatedPackages($listInputDto: ListInputDTO!) {
  paginatedPackages(ListInputDTO: $listInputDto) {
    data {
      id
      name
      offerId
    }
  }
}
`;
const COUPON_QUERY = gql`
  query PaginatedCoupons($listInputDto: ListInputDTO!) {
  paginatedCoupons(ListInputDTO: $listInputDto) {
    data {
      id
      couponCode
    }
  }
}
`;

const defaultValue = {
    name: "",
    description: "",
    id: "",
}
const DELETE_PLAN = gql`
 mutation DeletePlan($deletePlanId: Int!) {
  deletePlan(id: $deletePlanId)
}
`;
const Plans = () => {
    /// Fetch All Plans -- Api
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [plansData, { error, data, loading, refetch }] = useLazyQuery(
        GetAllPlansQuery
    );

    const { theme } = useTheme();

    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Fetch Plans
    const fetchPlans = async (isRefreshing = false) => {
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
                listInputDto: {},
            },
        });;
    };
    useEffect(() => {
        fetchPlans();
    }, []);

    /// status change state 
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<{ name: string, description: string, status: any }>({
        defaultValues: {},
    });
    const [currentOrganization, setCurrentOrganization] = useState<{
        name: string;
        description: string;
        id: string;
    }>(defaultValue);

    /// Add And Edit Plans
    const [isModalVisible, setModalVisible] = useState(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState("");

    /// fetch offer data
    const { data: offerData, loading: offerLoading, error: offerError,
    } = useQuery(OFFER_QUERY, {
        variables: {
            listInputDto: {
                limit: 10,
                page: 1,
            },
        },
    });

    const pickerData = useMemo(() => {
        if (!offerData?.paginatedOffers?.data) return [];
        return offerData.paginatedOffers.data.map((item) => ({
            label: item.title,
            value: item.id,
        }));
    }, [offerData]);

    /// fetch package data
    const { data: packageData, loading: packageLoading, error: packageError, } = useQuery(PACKAGE_QUERY, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });

    const packagePickerData = useMemo(() => {
        if (!packageData?.paginatedPackages?.data) return [];
        return packageData.paginatedPackages.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [packageData]);

    /// fetch coupon data
    const { data: couponData, loading: couponLoading, error: couponError } = useQuery(COUPON_QUERY, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const couponPickerData = useMemo(() => {
        if (!couponData?.paginatedCoupons?.data) return [];
        return couponData.paginatedCoupons.data.map((item => ({
            label: item.couponCode,
            value: item.id,
        })))
    }, [couponData]);
    /// delete Roles 
        const [deleteRoles, deleteOrganizationState] = useMutation(DELETE_PLAN, {
            onCompleted: (data) => {
                refetch();
                Alert.alert("success", "Permission deleted successfully!");
            },
            onError: (error) => {
                Alert.alert("Error", error.message);
            }
        });
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Roles"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
                    >
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <FlatList
                    data={data?.paginatedPlans?.data}
                    renderItem={({ item }: any) =>
                        <View
                            style={[
                                styles.organizationContainer,
                                { backgroundColor: Colors[theme].cartBg },
                            ]}
                        >
                            <View style={styles.organizationHeader}>
                                <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.name}</ThemedText>
                                <View style={styles.organizationInfo}>
                                    <Feather
                                        name="edit"
                                        size={ms(20)}
                                        color={Colors[theme].text}
                                        onPress={() => { setModalVisible(true), setCurrentOrganization(defaultValue) }}
                                    />
                                    <View style={{ width: 5 }}></View>
                                    <MaterialIcons
                                        name="delete-outline"
                                        size={ms(22)}
                                        color={Colors[theme].text}
                                        onPress={() => {
                                            Alert.alert(
                                                "Delete",
                                                "Are you sure you want to delete?",
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            deleteRoles({
                                                                variables: {
                                                                    deletePlanId: Number(item?.id),
                                                                }
                                                            });
                                                        }
                                                    },
                                                    { text: "No", onPress: () => { } },
                                                ]
                                            );

                                        }}
                                    />
                                    <View style={{ width: 5 }}></View>
                                    <MaterialIcons
                                    name="attractions"
                                    size={ms(22)}
                                    color="black"
                                    onPress={() => {
                                        setCurrentOrganization({
                                            name: item?.name,
                                            description: item?.description,
                                            id: item?.id,
                                        });
                                        setStatusModalVisible(true);
                                    }}
                                />
                                </View>
                            </View>
                            
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Price</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <ThemedText style={styles.cardDot}>100</ThemedText>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Discount</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <ThemedText style={styles.cardDot}>10</ThemedText>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <ThemedText style={styles.cardTitle}>Status</ThemedText>
                                <ThemedText style={styles.cardDot}>:</ThemedText>
                                <View style={{ borderRadius: 5, borderColor: item.status == "active" ? "green" : "red", backgroundColor: item.status == "active" ? "#EAFFF1" : "#FFEEF3", borderWidth: 0.5 }}>
                                    <ThemedText style={{ color: item.status == "active" ? "green" : "red", fontSize: 18, fontWeight: "normal", paddingHorizontal: 10 }}>
                                        {item.status}</ThemedText>
                                </View>

                            </View>
                            
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => fetchPlans(true)}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: vs(40) }}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                />

            </ThemedView>

            {/* Status change modal */}
            <Modal
                isVisible={isStatusModalVisible}
                onBackdropPress={() => {
                    setStatusModalVisible(false);
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        height: 200,
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

            {/* Add and Edit Plans modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    reset();
                    setCurrentOrganization(defaultValue);
                    setEditModal(false);
                    setModalVisible(false);
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: "#faf7f7",
                        // backgroundAttachment:'blue',
                        height: vs(860),
                        width: s(320),
                        borderRadius: 10,
                        // alignSelf: "center",
                        padding: 10,

                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <ThemedView>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                                paddingBottom: 0,
                            }}
                        >
                            <ThemedText type="subtitle">
                                {labels.createPlans}
                            </ThemedText>
                            <Pressable
                                onPress={() => {
                                    reset();
                                    setEditModal(false);
                                    setCurrentOrganization(defaultValue);
                                    setModalVisible(false);
                                }}
                            >
                                <Entypo name="cross" size={ms(20)} color="grey" />
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
                                onFocus={() => setIsFocused("name")}
                                rules={{
                                    required: editModal ? "Plan Name is required" : "Module name is required"
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"discount_price"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={"Discount Price"}
                                onFocus={() => setIsFocused("discount_price")}
                                rules={{
                                    required: editModal ? "Discount is required" : "Module name is required"
                                }}
                                autoCapitalize="none"
                            />

                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"duration_price"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={"Duration Price"}
                                onFocus={() => setIsFocused("duration_price")}
                                rules={{
                                    required: editModal ? "Duration is required" : "Module name is required"
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
                                onFocus={() => setIsFocused("price")}
                                rules={{
                                    required: editModal ? "Price is required" : "Module name is required"
                                }}
                                autoCapitalize="none"
                            />

                            <CustomValidation
                                data={pickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                onFocus={() => setIsFocused("offer")}
                                name="offer"
                                label={"Offer"}
                                placeholder={offerLoading ? "Loading..." : "Select Status"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select status",
                                    },
                                }}
                            />
                            <CustomValidation
                                data={packagePickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                onFocus={() => setIsFocused("packages")}
                                name="packages"
                                label={"Packages"}
                                placeholder={packageLoading ? "Loading..." : "Select Status"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select status",
                                    },
                                }}
                            />

                            <CustomValidation
                                data={couponPickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                onFocus={() => setIsFocused("coupons")}
                                name="coupons"
                                label={"Coupons"}
                                placeholder={couponLoading ? "Loading..." : "Select Status"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select status",
                                    },
                                }}
                            />

                            <CustomValidation
                                type="input"
                                control={control}
                                name={"description"}
                                label={"Description"}
                                labelStyle={styles.label}
                                onFocus={() => setIsFocused("description")}
                                rules={{
                                    required: editModal ? "Test organization description is required" : "Description is required",
                                }}
                            />
                        </View>

                        <CustomButton
                            title="Submit"
                            // isLoading={createOrganizationState.loading || updateOrganizationState.loading}
                            onPress={() => {
                                // handleSubmit(onSubmit)();
                            }}
                            style={{ marginTop: vs(10), marginBottom: vs(15) }}
                        />
                    </ThemedView>
                </ScrollView>
            </Modal>

        </CustomHeader>
    );
};
const styles = ScaledSheet.create({
    searchContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12@ms",
    },
    contentContainer: {
        flex: 1,
        padding: "12@ms",
    },
    organizationContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    organizationInfo: {
        flexDirection: "row",
    },
    cardTitle: {
        fontSize: "18@ms",
        width: 110,
        color: "black",
        fontWeight: "700",
    },
    cardDot: {
        fontSize: "18@ms",
        paddingHorizontal: "10@ms",
        color: "black",
        fontWeight: "normal",
    },
    organizationHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        color: "black",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    buttonContainerClose: {
        borderRadius: 10,
        paddingVertical: 5,
        marginTop: 10,
        paddingHorizontal: 20,
        borderColor: "black",
        borderWidth: 0.5,
    },
    buttonContainerSave: {
        backgroundColor: "#E06557",
        borderRadius: 10,
        paddingVertical: 5,
        marginTop: 10,
        paddingHorizontal: 20,
    },
});
export default Plans;