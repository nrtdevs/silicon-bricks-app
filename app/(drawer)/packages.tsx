import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
    CreateOrganizationDocument,
    CreatePackageDocument,
    DeleteOrganizationDocument,
    DropdownOffersDocument,
    EnableOrganizationStatusDocument,
    PaginatedModulesDocument,
    PaginatedOffersDocument,
    PaginatedOrganizationDocument,
    PaginatedPackagesDocument,
    PaginatedUsersDocument,
    UpdateOrganizationDocument,
    UpdatePackageDocument,
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
import debounce from "lodash.debounce";
import NoDataFound from "@/components/NoDataFound";

const defaultValue = {
    name: "",
    description: "",
    id: "",
};

const PackageScreen = () => {
    const { theme } = useTheme();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<{
        name: string;
        description: string;
        topic: any;
        price: string;
        discountedPrice: string;
        offer: any;
        module: string;
    }>({
        defaultValues: {},
    });

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [packagesData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedPackagesDocument
    );

    console.log("data", data);
    

    const [offerDataApi, { error: offerError, data: offerData, loading: offerLoading, refetch: offerRefetch }] = useLazyQuery(
        DropdownOffersDocument
    );

    const [moduleDataApi, { error: moduleError, data: moduleData, loading: moduleLoading, refetch: moduleRefetch }] = useLazyQuery(
        PaginatedModulesDocument
    );

    // console.log("offerData", offerData?.dropdownOffers?.data[1]);
    // PERCENTAGE
    // FIXED_AMOUNT

    const [updatePackage, updatePackageState] = useMutation(
        UpdatePackageDocument,
        {
            onCompleted: (data) => {
                reset();
                refetch();
                setEditModal(false);
                setModalVisible(false);
                Alert.alert("success", "Project updated successfully!");
            },
            onError: (error) => {
                Alert.alert("Error", error.message);
            },
        }
    );

    const [createPackage, createPackageState] = useMutation(
        CreatePackageDocument,
        {
            onCompleted: (data) => {
                reset();
                refetch();
                setEditModal(false);
                setModalVisible(false);
                Alert.alert("success", "Project updated successfully!");
            },
            onError: (error) => {
                Alert.alert("Error", error.message);
            },
        }
    );

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState("");
    const [editModal, setEditModal] = useState<boolean>(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState<string>("");
    const [currentOrganization, setCurrentOrganization] = useState<{
        name: string;
        description: string;
        id: string;
    }>(defaultValue);

    // const
    const pickerData = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Expired", value: "expired" },
    ];

    useEffect(() => {
        packagesData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
        offerDataApi({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        })
        moduleDataApi({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        })
    }, []);

    useEffect(() => {
        if (watch('price')) {
            setValue('discountedPrice', "");
            setValue('offer', "");
        }
    }, [watch('price')]);

    useEffect(() => {
        if (watch('offer')) {
            let discount = 0;
            let amt = Number(watch('price'));
            if (watch('offer')?.discountType === 'PERCENTAGE') {
                discount = (amt * watch('offer')?.discountValue) / 100;
            } else if (watch('offer')?.discountType === 'FIXED_AMOUNT') {
                discount = watch('offer')?.discountValue;
            }
            setValue('discountedPrice', String(amt - discount));
            // console.log('99999', typeof watch('price'));
            // console.log('0099', watch('offer')?.discountType);
        }
    }, [watch('offer')]);

    const debouncedSearch = useCallback(
        debounce((text) => {
            packagesData({
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

    const onSubmit = (data: any) => {
        try {
            // console.log("0009999", data);
            // console.log("0009999", data?.module);
            const moduleIds = data.module.map(Number);
            // "description": null,
            // "discountedPrice": null,
            // "moduleIds": null,
            // "name": null,
            // "offerId": null,
            // "price": null

            let params = {
                description: data?.description,
                discountedPrice: Number(data?.discountedPrice),
                moduleIds: moduleIds,
                name: data?.name,
                offerId: Number(data?.offer?.id),
                price: Number(data?.price)
            };
            // let params2 = {
            //     id: Number(currentCoupon?.id),
            //     ...params,
            // };
            console.log("params", params);

            editModal ?
                // updateCoupon({
                //     variables: {
                //         updateCouponInput: params2,
                //     },
                // })
                {}
                : createPackage({
                    variables: {
                        createPackageInput: params,
                    },
                });

        } catch (error) {
            console.log('error in onSubmit', error);
        }
    };


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
                            placeholder={labels?.searchPackage}
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

                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={data?.paginatedPackages?.data}
                        renderItem={({ item, index }: any) => (
                            <View
                                key={index}
                                style={[
                                    styles.organizationContainer,
                                    { backgroundColor: Colors[theme].cartBg },
                                ]}
                            >
                                <ThemedText
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
                                </ThemedText>

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
                                                setStatusModalVisible(true);
                                            }}
                                        />

                                        <Feather
                                            name="edit"
                                            size={ms(20)}
                                            color={Colors[theme].text}
                                            onPress={() => {
                                                setModalVisible(true);
                                                setEditModal(true);
                                            }}
                                        />
                                        <MaterialIcons
                                            name="delete-outline"
                                            size={ms(20)}
                                            color={Colors[theme].text}
                                            onPress={() => {
                                                Alert.alert(
                                                    "Delete",
                                                    "Are you sure you want to delete?",
                                                    [
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
                                                    ]
                                                );
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={styles.userInfo}>
                                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                                        ${item?.price}
                                    </ThemedText>
                                    <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                                        ${item?.discountedPrice} (after discount)
                                    </ThemedText>
                                </View>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={refreshing}
                        //         onRefresh={() => fetchOrganization(true)}
                        //     />
                        // }
                        contentContainerStyle={{ paddingBottom: vs(40) }}
                        ListEmptyComponent={!loading ? <NoDataFound /> : null}
                    />
                </View>
            </ThemedView>

            {/* CREATE AND EDIT MODAL */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    reset();
                    // setCurrentCoupon(defaultValue);
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
                            {editModal ? "Edit" : "Create Package"}
                        </ThemedText>

                        <Pressable
                            onPress={() => {
                                reset();
                                setEditModal(false);
                                // setCurrentCoupon(defaultValue);
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
                            placeholder={"Enter Name"}
                            onFocus={() => setIsFocused("name")}
                            rules={{
                                required: "name is required",
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"price"}
                            label={"Price"}
                            placeholder={"Enter Price"}
                            keyboardType="number-pad"
                            labelStyle={styles.label}
                            onFocus={() => setIsFocused("price")}
                            rules={{
                                required: "Price is required",
                            }}
                        />

                        <CustomValidation
                            data={offerData?.dropdownOffers?.data}
                            type="picker"
                            control={control}
                            keyToCompareData="id"
                            keyToShowData="title"
                            label="Offer"
                            labelStyle={styles.label}
                            name="offer"
                            placeholder="Select offer"
                            inputStyle={{ height: vs(50) }}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select offer",
                                },
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"discountedPrice"}
                            editable={false}
                            keyboardType="number-pad"
                            label={"Discounted Price"}
                            placeholder={"Discounted Price"}
                            labelStyle={styles.label}
                            onFocus={() => setIsFocused("discountedPrice")}
                            rules={{
                                required: "Discounted price is required",
                            }}
                        />

                        <CustomValidation
                            data={moduleData?.paginatedModules?.data}
                            type="picker"
                            control={control}
                            keyToCompareData="id"
                            keyToShowData="name"
                            label="Module"
                            labelStyle={styles.label}
                            multiSelect={true}
                            name="module"
                            placeholder="Select Module"
                            inputStyle={{ height: vs(50) }}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select Module",
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
                            onFocus={() =>
                                setIsFocused("description")
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

{/* status modal */ }
{/* <Modal
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
</Modal> */}

export default PackageScreen;

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
