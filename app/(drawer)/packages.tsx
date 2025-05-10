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
    DeletePackageDocument,
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
import debounce from "lodash.debounce";
import NoDataFound from "@/components/NoDataFound";
import { useUserContext } from "@/context/RoleContext";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";

const defaultValue = {
    name: "",
    discountedPrice: "",
    description: "",
    id: "",
    price: "",
    moduleIds: [],
    endDate: "",
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
        status: string;
        price: string;
        discountedPrice: string;
        module: any;
        endDate: string;
    }>({
        defaultValues: {},
    });

    const [searchQuery, setSearchQuery] = useState<string>("");

    const { can, hasAny } = useUserContext();

    const deletePermission = can("MasterApp:Package:Delete");
    const updatePermission = can("MasterApp:Package:Update");
    const createPermission = can("MasterApp:Package:Create");
    const statusUpdatePermission = can("MasterApp:Package:Action");

    const [packagesData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedPackagesDocument
    );

    const [moduleDataApi, { error: moduleError, data: moduleData, loading: moduleLoading, refetch: moduleRefetch }] = useLazyQuery(
        PaginatedModulesDocument
    );

    const [deletePackage, deletePackageState] = useMutation(
        DeletePackageDocument,
        {
            onCompleted: (data) => {
                reset();
                refetch();
                setEditModal(false);
                setModalVisible(false);
            },
            onError: (error) => {
                Alert.alert("Error", error.message);
            },
        }
    );

    const [updatePackage, updatePackageState] = useMutation(
        UpdatePackageDocument,
        {
            onCompleted: (data) => {
                reset();
                refetch();
                setEditModal(false);
                setModalVisible(false);
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
    const [currentPackage, setCurrentPackage] = useState<{
        name: string,
        discountedPrice: string,
        description: string,
        id: string,
        price: string,
        moduleIds: string[],
        endDate: string,
    }>(defaultValue);

    // const
    const pickerData = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Expired", value: "expired" },
    ];

    useEffect(() => {
        if (currentPackage) {
            setValue("name", currentPackage?.name);
            setValue("description", currentPackage?.description);
            setValue("price", currentPackage?.price);
            setValue("module", currentPackage?.moduleIds);
            setValue("endDate", formatTimeForAPI(currentPackage?.endDate, "yyyy-mm-dd") || "");
            // setValue("start_date", formatTimeForAPI(currentCoupon?.start_date, "yyyy-mm-dd") || "");
            setValue("discountedPrice", currentPackage?.discountedPrice);
        }
    }, [currentPackage]);


    useEffect(() => {
        packagesData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
        moduleDataApi({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        })
    }, []);

    // useEffect(() => {
    //     if (watch('price')) {
    //         setValue('discountedPrice', "");
    //     }
    // }, [watch('price')]);

    // useEffect(() => {
    //     if (watch('price').length > 0) {
    //         let discount = 0;
    //         let amt = Number(watch('price'));
    //         if (watch('offer')?.discountType === 'PERCENTAGE') {
    //             discount = (amt * watch('offer')?.discountValue) / 100;
    //         } else if (watch('offer')?.discountType === 'FIXED_AMOUNT') {
    //             discount = watch('offer')?.discountValue;
    //         }
    //         setValue('discountedPrice', String(amt - discount));
    //         // console.log('99999', typeof watch('price'));
    //         // console.log('0099', watch('offer')?.discountType);
    //     }
    // }, [watch('offer')]);

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
            const moduleIds = data.module.map(Number);
            let params = {
                name: data?.name,
                endDate: data?.endDate,
                price: Number(data?.price),
                discountedPrice: Number(data?.discountedPrice),
                moduleIds: moduleIds,
                description: data?.description,
            };
            let params2 = {
                id: Number(currentPackage?.id),
                ...params,
            };
            console.log('params2', params2);

            editModal ?
                updatePackage({
                    variables: {
                        updatePackageInput: params2,
                    },
                })
                : createPackage({
                    variables: {
                        createPackageInput: params,
                    },
                });

        } catch (error) {
            console.log('error in onSubmit', error);
        }
    };

    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });

    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );

    const renderData = ({ item, index }: any) => {
        let ids = item.modules.map((item: any) => item.id);
        console.log('009', item?.discountedPrice);
        return <View
            key={index}
            style={[
                styles.organizationContainer,
                { backgroundColor: '#d3a49a' },
            ]}
        >


            <View style={styles.organizationHeader}>
                <ThemedText type="subtitle" style={{ flex: 1 }}>
                    {item?.name}
                </ThemedText>
                <View style={styles.organizationInfo}>
                    {statusUpdatePermission && <MaterialIcons
                        name="attractions"
                        size={ms(26)}
                        color={Colors[theme].text}
                        onPress={() => {
                            setStatusModalVisible(true);
                        }}
                    />}

                    {updatePermission && <Feather
                        name="edit"
                        size={ms(26)}
                        color={Colors[theme].text}
                        onPress={() => {
                            setCurrentPackage({
                                name: item?.name,
                                discountedPrice: String(item?.discountedPrice),
                                description: item?.description,
                                id: item?.id,
                                price: String(item?.price),
                                moduleIds: ids,
                                endDate: item?.offerExpiryDate,
                            })
                            setModalVisible(true);
                            setEditModal(true);
                        }}
                    />}

                    {deletePermission && <MaterialIcons
                        name="delete-outline"
                        size={ms(26)}
                        color={Colors[theme].text}
                        onPress={() => {
                            Alert.alert(
                                "Delete",
                                "Are you sure you want to delete?",
                                [
                                    {
                                        text: "Yes",
                                        onPress: () => {
                                            deletePackage({
                                                variables: {
                                                    ids: [Number(item?.id)],
                                                }
                                            });
                                        },
                                    },
                                    { text: "No", onPress: () => { } },
                                ]
                            );
                        }}
                    />}
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

            <ThemedText
                style={[
                    styles.status,
                    {
                        // color:
                        //   item.status == "active" ? Colors?.green : "#6d6d1b",
                        backgroundColor:
                            theme == "dark" ? Colors?.white : "#e6e2e2",
                        fontSize: ms(14),
                    },
                ]}
            >
                {item?.status}
            </ThemedText>
        </View>
    }

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
                            placeholder={labels?.searchPackage}
                            onClear={() => {
                                setSearchQuery("");
                            }}
                        />
                    </View>
                    <Pressable
                        style={styles.buttonContainer}
                        onPress={() => {
                            setModalVisible(true), setCurrentPackage(defaultValue);
                        }}
                    >
                        <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
                    </Pressable>
                </View>

                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={data?.paginatedPackages?.data}
                        renderItem={renderData}
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
                            rules={{
                                required: "name is required",
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            placeholder="End Date"
                            name="endDate"
                            label="End Date"
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
                                required: "End date is required",
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"price"}
                            label={"Price"}
                            rightIcon={null}
                            placeholder={"Enter Price"}
                            keyboardType="number-pad"
                            labelStyle={styles.label}
                            rules={{
                                required: "Price is required",
                            }}

                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"discountedPrice"}
                            keyboardType="number-pad"
                            label={"Discounted Price"}
                            placeholder={"Discounted Price"}
                            labelStyle={styles.label}
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
                            isLoading={updatePackageState.loading || createPackageState.loading}
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
                        data={pickerData}
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
                            dateModal.start ? "endDate" : "endDate",
                            formatTimeForAPI(selectedDate, "yyyy-mm-dd") || "",
                        );
                    }
                    setDateTimePickerProps(getDateTimePickerProps(false));
                }} />
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
