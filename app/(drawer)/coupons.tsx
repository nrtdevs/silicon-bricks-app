import {
    Alert,
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
    CreateCouponDocument,
    PaginatedCouponsDocument,
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


const defaultValue = {
    name: "",
    description: "",
    id: "",
};
const pickerData = [
    { label: "Percentage", value: "Percentage" },
    { label: "Fixed", value: "Fixed" },
];

const organization = () => {
    const { theme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState("");
    const [editModal, setEditModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [currentOrganization, setCurrentOrganization] = useState<{
        name: string;
        description: string;
        id: string;
    }>(defaultValue);
    const [selected, setSelected] = useState<any>([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<{
        couponCode: any;
        discountType: number;
        usageLimit: number;
        description: string;
        maxDiscountAmount: number;
        minOrderAmount: number;
        start_date: any;
        end_date: any;
        type: any;
        amount: any;
        code: any;
        status: any;
    }>({
        defaultValues: {},
    });
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [couponData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedCouponsDocument
    );
    console.log("000d", data?.paginatedCoupons?.data);
    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
      );

    const [createCoupon, createCouponState] = useMutation(CreateCouponDocument, {
        onCompleted: (data) => {
            reset();
            refetch();
            setModalVisible(false);
            Alert.alert("success", "Project create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

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

    // const setCurrentOrganizationData() => {
    //   setValue("name", currentOrganization?.name)
    //   setValue("description", currentOrganization?.description)
    // }

    // useEffect(() => {
    //   setValue("name", currentOrganization?.name)
    //   setValue("description", currentOrganization?.description)
    // }, [currentOrganization])

    useEffect(() => {
        fetchCoupons();
    }, []);

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
        //   : CreateCoupon({
        // variables: {
        //   createOrganizationInput: {
        //     ...data
        //       },
        //     },
        //   });
    };

    const renderItem = (item, index) => {
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
                        <MaterialIcons
                            name="attractions"
                            size={ms(20)}
                            color={Colors[theme].text}
                            onPress={() => {
                                // setCurrentOrganization({
                                //   name: item?.name,
                                //   description: item?.description,
                                //   id: item?.id,
                                // });
                                setStatusModalVisible(true);
                            }}
                        />

                        <Feather
                            name="edit"
                            size={ms(20)}
                            color={Colors[theme].text}
                            onPress={() => {
                                // setCurrentOrganization({
                                //   name: item?.name,
                                //   description: item?.description,
                                //   id: item?.id,
                                // });
                                // setCurrentOrganizationData();
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
                                            // deleteOrganization({
                                            //   variables: {
                                            //     deleteOrganizationId: Number(item?.id),
                                            //   }
                                            // });
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
                            // color:
                            //   item.status == "active" ? Colors?.green : "#6d6d1b",
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
                            setModalVisible(true), setCurrentOrganization(defaultValue);
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
                        data={data?.paginatedCoupons?.data}
                        renderItem={({ item, index }: any) => renderItem(item, index)}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => fetchCoupons(true)}
                            />
                        }
                        ListEmptyComponent={!loading ? <NoDataFound /> : null}
                    // ListFooterComponent={
                    //   hasMore ? (
                    //     <ActivityIndicator size="small" color={Colors.primary} />
                    //   ) : null
                    // }
                    // onEndReached={() => {
                    //   if (hasMore && !isLoading) {
                    //     fetchNotification();
                    //   }
                    // }}
                    // onEndReachedThreshold={0.5}
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
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: Colors[theme].cartBg,
                        // height: vs(500),
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
                            name={"couponCode"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Coupon Code"}
                            placeholder={"Provide coupon code"}
                            onFocus={() => setIsFocused("couponCode")}
                            rules={{
                                required: "couponCode is required",
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            data={pickerData}
                            type="picker"
                            hideStar
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
                            labelStyle={styles.label}
                            onFocus={() => setIsFocused("maxDiscountAmount")}
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
                            onFocus={() => setIsFocused("minOrderAmount")}
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
                            onFocus={() => setIsFocused("usageLimit")}
                            rules={{
                                required: "Usage limit is required",
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            placeholder={"Start Date"}
                            name="start_date"
                            value={watch("start_date")?.toLocaleDateString()}
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
                            containerStyle={{ width: "95%" }}
                            pointerEvents="none"
                        />
                        <CustomValidation
                            type="input"
                            control={control}
                            placeholder={"End Date"}
                            name="end_date"
                            value={watch("end_date")?.toLocaleDateString()}
                            editable={false}
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
                            containerStyle={{ width: "95%", marginLeft: s(5) }}
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
                            onFocus={() =>
                                setIsFocused(editModal ? "testDescription" : "description")
                            }
                            rules={{
                                required: editModal
                                    ? "Test organization description is required"
                                    : "Description is required",
                            }}
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
        </CustomHeader>
    );
};

export default organization;

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
