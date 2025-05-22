import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
    ChangePackageStatusDocument,
    CreatePackageDocument,
    DeletePackageDocument,
    PaginatedModulesDocument,
    PaginatedPackagesDocument,
    UpdatePackageDocument,
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
import debounce from "lodash.debounce";
import NoDataFound from "@/components/NoDataFound";
import { useUserContext } from "@/context/RoleContext";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import CustomPackageCard from "@/components/master/CustomPackageCard";
import { router } from "expo-router";

const defaultValue = {
    name: "",
    discountedPrice: "",
    description: "",
    offerDescription: "",
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
        offerDescription: string;
        status: any;
        price: string;
        discountedPrice: string;
        module: any;
        endDate: string;
        offer;
    }>({
        defaultValues: {},
    });

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedModules, setSelectedModules] = useState<any>(null);
    const [packageList, setPackageList] = useState<any>([]);
    const { can, hasAny } = useUserContext();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const readPermission = can("MasterApp:Package:Read");
    const deletePermission = can("MasterApp:Package:Delete");
    const updatePermission = can("MasterApp:Package:Update");
    const createPermission = can("MasterApp:Package:Create");
    const statusUpdatePermission = can("MasterApp:Package:Action");

    const [packagesData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedPackagesDocument
    );

    const [
        moduleDataApi,
        {
            error: moduleError,
            data: moduleData,
            loading: moduleLoading,
            refetch: moduleRefetch,
        },
    ] = useLazyQuery(PaginatedModulesDocument);


    const findModule = (data, ids) => {

        const matchedModuleNames = data
            ?.filter((item) => ids?.includes(item?.id))
            ?.map((item) => item.name);

        setSelectedModules(matchedModuleNames);
    };

    const [deletePackage, deletePackageState] = useMutation(
        DeletePackageDocument,
        {
            onCompleted: (data) => {
                reset();
                fetchPackage(true);
                setModalVisible(false);
            },
            onError: (error) => {
                Alert.alert("Error", error.message);
            },
        }
    );

    const [packageState, packageStateState] = useMutation(
        ChangePackageStatusDocument,
        {
            onCompleted: (data) => {
                reset();
                fetchPackage(true);
                setStatusModalVisible(false);
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
                fetchPackage(true);
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
                fetchPackage(true);
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
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [currentPackage, setCurrentPackage] = useState<{
        name: string;
        discountedPrice: string;
        description: string;
        offerDescription: string;
        id: string;
        price: string;
        moduleIds: string[];
        endDate: string;
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
            setValue(
                "endDate",
                formatTimeForAPI(currentPackage?.endDate, "yyyy-mm-dd") || ""
            );
            // setValue("start_date", formatTimeForAPI(currentCoupon?.start_date, "yyyy-mm-dd") || "");
            setValue("discountedPrice", currentPackage?.discountedPrice);
        }
    }, [currentPackage]);

    useEffect(() => {
        fetchPackage();
        moduleDataApi({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 20
                }
            },
        });
    }, []);

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
            const moduleIds = data?.module?.map(Number);
            if (Number(data?.price) < Number(data?.discountedPrice)) {
                console.log("Price should be greater than discounted price date.");
                Alert.alert("Error", "Price should be greater than discounted price.");
                return;
            }
            let params = {
                name: data?.name,
                offerExpiryDate: data?.endDate,
                price: Number(data?.price),
                discountedPrice: Number(data?.discountedPrice),
                moduleIds: moduleIds,
                description: data?.description,
                offerDescription: data?.offerDescription,
            };
            let params2 = {
                id: Number(currentPackage?.id),
                ...params,
            };

            editModal
                ? updatePackage({
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
            console.log("error in onSubmit", error);
        }
    };

    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });

    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );

    const fetchPackage = async (isRefreshing = false, searchParams = "") => {
        const currentPage = isRefreshing ? 1 : page;

        if (isRefreshing) {
            setRefreshing(true);
            setPage(1);
        }
        const params = {
            limit: 8,
            page: currentPage,
            search: searchParams,
        };

        try {
            const res: any = await packagesData({
                variables: {
                    listInputDto: params,
                },
                fetchPolicy: "network-only",
            });

            if (res?.data?.paginatedPackages) {
                const data: any = res?.data?.paginatedPackages;
                const newItems = data?.data || [];

                setPackageList((prev: any) => {
                    return isRefreshing && currentPage == 1
                        ? newItems
                        : [...prev, ...newItems];
                });

                if (isRefreshing) setRefreshing(false);
                setPage((prev) => prev + 1);
                setRefreshing(false);
                const lastPage = Math.ceil(data?.meta?.totalItems / 8);
                setHasMore(data?.meta?.currentPage < lastPage);
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

    // const renderData = ({ item, index }: any) => {
    //     let ids = item?.modules?.map((item: any) => item.id);
    //     return (
    //         <View
    //             key={index}
    //             style={[
    //                 styles.organizationContainer,
    //                 { backgroundColor: Colors[theme]?.cart },
    //             ]}
    //         >
    //             <View style={styles.organizationHeader}>
    //                 <ThemedText type="subtitle" style={{ flex: 1 }}>
    //                     {item?.name}
    //                 </ThemedText>
    //                 <View style={styles.organizationInfo}>
    //                     {statusUpdatePermission && (
    //                         <MaterialIcons
    //                             name="attractions"
    //                             size={ms(26)}
    //                             color={Colors[theme].text}
    //                             onPress={() => {
    //                                 setStatusModalVisible(true);
    //                                 setValue('status', item?.status);
    //                             }}
    //                         />
    //                     )}

    //                     {updatePermission && (
    //                         <Feather
    //                             name="edit"
    //                             size={ms(26)}
    //                             color={Colors[theme].text}
    //                             onPress={() => {
    //                                 setCurrentPackage({
    //                                     name: item?.name,
    //                                     discountedPrice: String(item?.discountedPrice),
    //                                     description: item?.description,
    //                                     id: item?.id,
    //                                     price: String(item?.price),
    //                                     moduleIds: ids,
    //                                     endDate: item?.offerExpiryDate,
    //                                     offerDescription: item?.offerDescription,
    //                                 });
    //                                 setModalVisible(true);
    //                                 setEditModal(true);
    //                             }}
    //                         />
    //                     )}

    //                     {updatePermission && (
    //                         <Feather
    //                             name="eye"
    //                             size={ms(26)}
    //                             color={Colors[theme].text}
    //                             onPress={() => {
    //                                 setCurrentPackage({
    //                                     name: item?.name,
    //                                     discountedPrice: String(item?.discountedPrice),
    //                                     description: item?.description,
    //                                     id: item?.id,
    //                                     price: String(item?.price),
    //                                     moduleIds: ids,
    //                                     endDate: item?.offerExpiryDate,
    //                                     offerDescription: item?.offerDescription,
    //                                 });
    //                                 findModule(item.modules, ids);
    //                                 setInfoModalVisible(true);
    //                             }}
    //                         />
    //                     )}

    //                     {deletePermission && (
    //                         <MaterialIcons
    //                             name="delete-outline"
    //                             size={ms(26)}
    //                             color={Colors[theme].text}
    //                             onPress={() => {
    //                                 Alert.alert("Delete", "Are you sure you want to delete?", [
    //                                     {
    //                                         text: "Yes",
    //                                         onPress: () => {
    //                                             deletePackage({
    //                                                 variables: {
    //                                                     ids: [Number(item?.id)],
    //                                                 },
    //                                             });
    //                                         },
    //                                     },
    //                                     { text: "No", onPress: () => { } },
    //                                 ]);
    //                             }}
    //                         />
    //                     )}
    //                 </View>
    //             </View>

    //             <View style={styles.userInfo}>
    //                 <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
    //                     ${item?.price}
    //                 </ThemedText>
    //                 <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
    //                     ${item?.discountedPrice} (after discount)
    //                 </ThemedText>
    //             </View>

    //             <ThemedText
    //                 style={[
    //                     styles.status,
    //                     {
    //                         // color:
    //                         //   item.status == "active" ? Colors?.green : "#6d6d1b",
    //                         backgroundColor: theme == "dark" ? Colors?.white : "#e6e2e2",
    //                         fontSize: ms(14),
    //                     },
    //                 ]}
    //             >
    //                 {item?.status}
    //             </ThemedText>
    //         </View>
    //     );
    // };

    const renderData = ({ item, index }: any) => {
        let ids = item?.modules?.map((item: any) => item.id);
        return (
            <CustomPackageCard
                name={item?.name}
                status={item?.status}
                price={item?.price.toString()}
                discountedPrice={item?.discountedPrice.toString()}
                readPermission={readPermission}
                editPermission={updatePermission}
                deletePermission={deletePermission}
                statusPermission={statusUpdatePermission}
                onEdit={() => {
                    router.navigate({
                        pathname: "/addEditUser",
                        params: {
                            data: JSON.stringify(item),
                        },
                    })
                }}
                onDelete={() =>
                    Alert.alert("Delete", "Are you sure you want to delete?", [
                        {
                            text: "Yes",
                            onPress: () => {
                                deletePackage({
                                    variables: {
                                        ids: [Number(item?.id)],
                                    },
                                });
                            },
                        },
                        { text: "No", onPress: () => { } },
                    ])
                }
                onChangeStatus={() => {
                    setCurrentPackage({
                        name: item?.name,
                        discountedPrice: String(item?.discountedPrice),
                        description: item?.description,
                        id: item?.id,
                        price: String(item?.price),
                        moduleIds: ids,
                        endDate: item?.offerExpiryDate,
                        offerDescription: item?.offerDescription,
                    });
                    setStatusModalVisible(true);
                    setValue('status', item?.status);
                }}
                onView={() => {
                    setCurrentPackage({
                        name: item?.name,
                        discountedPrice: String(item?.discountedPrice),
                        description: item?.description,
                        id: item?.id,
                        price: String(item?.price),
                        moduleIds: ids,
                        endDate: item?.offerExpiryDate,
                        offerDescription: item?.offerDescription,
                    });
                    findModule(item.modules, ids);
                    setInfoModalVisible(true);
                }}
            />
        );
    };

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
                        <Feather
                            name="plus-square"
                            size={ms(25)}
                            color={Colors[theme].text}
                        />
                    </Pressable>
                </View>

                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={packageList}
                        renderItem={renderData}
                        showsVerticalScrollIndicator={false}
                        refreshing={refreshing && !loading}
                        onRefresh={() => {
                            fetchPackage(true);
                        }}
                        keyExtractor={(item: any, index: number) => index.toString()}
                        contentContainerStyle={{ paddingBottom: vs(60) }}
                        ListEmptyComponent={!loading ? <NoDataFound /> : null}
                        ListFooterComponent={
                            hasMore ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : null
                        }
                        onEndReached={() => {
                            if (hasMore && !loading) {
                                fetchPackage();
                            }
                        }}
                        onEndReachedThreshold={0.5}
                    // initialNumToRender={8}
                    // maxToRenderPerBatch={5}
                    // windowSize={7}
                    // removeClippedSubviews={true}
                    />
                </View>
            </ThemedView>

            {/* CREATE AND EDIT MODAL */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    reset();
                    setCurrentPackage(defaultValue);
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
                                setCurrentPackage(defaultValue);
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
                            name={"offerDescription"}
                            multiline
                            label={"Offer Description"}
                            // placeholder={editModal ? "Test organization Offer Description" : "Enter Offer Description"}
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
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"description"}
                            multiline
                            label={"Description"}
                            // placeholder={editModal ? "Test organization description" : "Enter description"}
                            labelStyle={[styles.label, { marginTop: vs(30) }]}
                            inputContainerStyle={{
                                height: vs(100),
                            }}
                            inputStyle={{
                                height: vs(100),
                            }}
                            containerStyle={{
                                height: vs(100),
                            }}
                        />

                        <CustomButton
                            title="Submit"
                            onPress={() => {
                                handleSubmit(onSubmit)();
                            }}
                            isLoading={
                                updatePackageState.loading || createPackageState.loading
                            }
                            style={{
                                backgroundColor: Colors[theme].background,
                                marginTop: vs(90),
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
                        // packageState
                        onChangeText={() => {
                            const params = {
                                ids: [Number(currentPackage?.id)],
                                status: watch("status")?.value,
                            }
                            console.log('00', params);

                            packageState({
                                variables: {
                                    updatePackageStatusInput: params,
                                },
                            });
                        }}
                    />
                </View>
            </Modal>

            {/* user info modal */}
            <Modal
                isVisible={infoModalVisible}
                onBackdropPress={() => {
                    setInfoModalVisible(false);
                    setCurrentPackage(defaultValue);
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
                        <ThemedText type="subtitle">User</ThemedText>
                        <Pressable
                            onPress={() => {
                                setCurrentPackage(defaultValue);
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
                            <ThemedText type="subtitle">Name</ThemedText>
                            <ThemedText type="default">{currentPackage?.name}</ThemedText>
                        </View>


                        <View>
                            <ThemedText type="subtitle">End Date</ThemedText>
                            <ThemedText type="default">
                                {new Date(currentPackage?.endDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </ThemedText>
                        </View>

                        <View>
                            <ThemedText type="subtitle">Price</ThemedText>
                            <ThemedText type="default">{currentPackage?.price}</ThemedText>
                        </View>

                        <View>
                            <ThemedText type="subtitle">Discounted Price</ThemedText>
                            <ThemedText type="default">
                                {currentPackage?.discountedPrice}
                            </ThemedText>
                        </View>

                        <View>
                            <ThemedText type="subtitle">Module</ThemedText>
                            <View style={{ flexDirection: "row", gap: ms(15) }}>
                                {selectedModules?.map((item, index) => {
                                    return <ThemedText type="default" key={index} >
                                        {item}
                                    </ThemedText>
                                })}
                            </View>
                        </View>
                        {/* <View>
                            <ThemedText type="subtitle">Start Date</ThemedText>
                            <ThemedText type="default">{parseDate(currentPackage?.start_date)}</ThemedText>
                        </View> */}

                        {/* <View>
                            <ThemedText type="subtitle">Start Date</ThemedText>
                            <ThemedText type="default">
                                {new Date(currentPackage?.moduleIds).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </ThemedText>
                        </View> */}

                        {currentPackage?.offerDescription && (
                            <View>
                                <ThemedText type="subtitle">Offer Description</ThemedText>
                                <ThemedText type="default">
                                    {currentPackage?.offerDescription}
                                </ThemedText>
                            </View>
                        )}

                        {currentPackage?.description && (
                            <View>
                                <ThemedText type="subtitle">Description</ThemedText>
                                <ThemedText type="default">
                                    {currentPackage?.description}
                                </ThemedText>
                            </View>
                        )}
                    </View>
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
                            dateModal.start ? "endDate" : "endDate",
                            formatTimeForAPI(selectedDate, "yyyy-mm-dd") || ""
                        );
                    }
                    setDateTimePickerProps(getDateTimePickerProps(false));
                }}
            />
        </CustomHeader>
    );
};

export default PackageScreen;

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
    },
    selectedContainer: {

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
        // padding: "12@ms",
    },
    searchContainer: {
        // width: "100%",
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
