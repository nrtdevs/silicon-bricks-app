import {
    ActivityIndicator,
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
    ChangeModuleStatusDocument,
    CreateModuleDocument,
    CreateOrganizationDocument,
    DeleteModuleDocument,
    PaginatedModulesDocument,
    UpdateModuleDocument,
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
    description: "",
    id: "",
};
const pickerData = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Blocked", value: "blocked" },
    { label: "Pending", value: "pending" },
];

const ModuleScreen = () => {
    const { theme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState("");
    const [editModal, setEditModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [moduleList, setModuleList] = useState<any>([])
    const [currentModule, setCurrentModule] = useState<{
        name: string;
        description: string;
        id: string;
    }>(defaultValue);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<{ name: string; description: string; status: any }>({
        defaultValues: {},
    });
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { can, hasAny } = useUserContext();
    const deletePermission = can("MasterApp:Module:Delete");
    const updatePermission = can("MasterApp:Module:Update");
    const createPermission = can("MasterApp:Module:Create");
    const statusUpdatePermission = can("MasterApp:Module:Action");

    const [moduleData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedModulesDocument
    );

    const [createModule, createModuleState] = useMutation(CreateModuleDocument, {
        onCompleted: (data) => {
            fetchModules(true);
            reset()
            setCurrentModule(defaultValue);
            setEditModal(false);
            setModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [updateModuleStatus, updateModuleStatusState] = useMutation(ChangeModuleStatusDocument, {
        onCompleted: (data) => {
            fetchModules(true);
            setStatusModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [deleteModule, deleteModuleState] = useMutation(DeleteModuleDocument, {
        onCompleted: (data) => {
            fetchModules(true);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [updateModule, updateModuleState] = useMutation(UpdateModuleDocument, {
        onCompleted: (data) => {
            fetchModules(true);
            reset();
            setCurrentModule(defaultValue);
            setEditModal(false);
            setModalVisible(false);
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    useEffect(() => {
        setValue("name", currentModule?.name)
        setValue("description", currentModule?.description)
    }, [currentModule])

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async (isRefreshing = false, searchParams = "") => {
        const currentPage = isRefreshing ? 1 : page;

        if (isRefreshing) {
            setRefreshing(true);
            setPage(1);
        }
        const params = {
            limit: 9,
            page: currentPage,
            search: searchParams,
        };
        console.log('999', currentPage);
        try {
            const res: any = await moduleData({
                variables: {
                    listInputDto: params
                },
                fetchPolicy: "network-only",
            });

            if (res?.data?.paginatedModules) {
                const data: any = res?.data?.paginatedModules;
                const newItems = data?.data || [];

                setModuleList((prev: any) => {
                    return isRefreshing && currentPage == 1
                        ? newItems
                        : [...prev, ...newItems];
                });

                if (isRefreshing) setRefreshing(false);
                setPage((prev) => prev + 1);
                setRefreshing(false);
                const lastPage = Math.ceil(data?.meta?.totalItems / 9);
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

    const onSubmit = (data: any) => {
        try {
            let param = {
                id: Number(currentModule?.id),
                ...data,
            };
            editModal
                ? updateModule({
                    variables: {
                        updateModuleInput: param,
                    },
                })
                : createModule({
                    variables: {
                        createModuleInput: {
                            ...data,
                        },
                    },
                    fetchPolicy: "network-only",
                });
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = (item, index) => (<View
        key={index}
        style={[
            styles.organizationContainer,
            { backgroundColor: Colors[theme].cart },
        ]}
    >
        <View style={styles.organizationHeader}>
            <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.name}</ThemedText>
            <View style={styles.organizationInfo}>
                {statusUpdatePermission && <MaterialIcons
                    name="attractions"
                    size={ms(22)}
                    color={Colors[theme].text}
                    onPress={() => {
                        setCurrentModule({
                            name: item?.name,
                            description: item?.description,
                            id: item?.id,
                        });
                        setValue("status", item?.status)
                        setStatusModalVisible(true);
                    }}
                />}
                {updatePermission && <Feather
                    name="edit"
                    size={ms(22)}
                    color={Colors[theme].text}
                    onPress={() => {
                        setCurrentModule({
                            name: item?.name,
                            description: item?.description,
                            id: item?.id,
                        });
                        setValue("name", item?.name)
                        setValue("description", item?.description)
                        setEditModal(true);
                        setModalVisible(true);
                    }}
                />}
                {deletePermission && <MaterialIcons
                    name="delete-outline"
                    size={ms(22)}
                    color={Colors[theme].text}
                    onPress={() => {
                        console.log(item?.id);

                        Alert.alert(
                            "Delete",
                            "Are you sure you want to delete?",
                            [
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        deleteModule({
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

        <ThemedText
            style={[
                styles.status,
                {
                    color:
                        item.status == "active" ? Colors?.green : "#6d6d1b",
                    backgroundColor:
                        theme == "dark" ? Colors?.white : "#e6e2e2",
                },
            ]}
        >
            {item?.status}
        </ThemedText>

        {item?.description && <View style={styles.userInfo}>
            <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                {item?.description}
            </ThemedText>
        </View>}
    </View>)

    const debouncedSearch = useCallback(
        debounce((text) => {
            fetchModules(true, text);
        }, 500),
        [searchQuery]
    );

    // if (loading) {
    //     return <Loader />
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
                            placeholder={labels?.searchModule}
                            loading={loading}
                            onClear={() => {
                                setSearchQuery("");
                            }}
                        />
                    </View>
                    {createPermission && <Pressable
                        style={styles.buttonContainer}
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    >
                        <Feather name="plus-square" size={ms(25)} color={Colors[theme].text} />
                    </Pressable>}
                </View>
                <View style={styles.organizationParentContainer}>
                    <FlatList
                        // data={data?.paginatedModules?.data || []}
                        // contentContainerStyle={{ paddingBottom: vs(40) }}
                        // renderItem={({ item, index }: any) => renderItem(item, index)
                        // }
                        // showsVerticalScrollIndicator={false}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={refreshing && !loading}
                        //         onRefresh={async () => {
                        //             fetchModules(true);
                        //         }}
                        //     />
                        // }
                        // keyExtractor={(item: any, index: number) => index.toString()}
                        // ListEmptyComponent={!loading ? <NoDataFound /> : null}
                        // ListFooterComponent={
                        //     hasMore ? (
                        //         <ActivityIndicator size="small" color={Colors.primary} />
                        //     ) : null
                        // }
                        // onEndReached={() => {
                        //     if (hasMore) {
                        //         fetchModules();
                        //     }
                        // }}
                        // onEndReachedThreshold={0.5}

                        data={moduleList || []}
                        renderItem={({ item, index }: any) => renderItem(item, index)}
                        showsVerticalScrollIndicator={false}
                        refreshing={refreshing && !loading}
                        onRefresh={() => {
                            fetchModules(true);
                        }}
                        keyExtractor={(item: any, index: number) => index.toString()}
                        contentContainerStyle={{ paddingBottom: vs(40) }}
                        ListEmptyComponent={!loading ? <NoDataFound /> : null}
                        ListFooterComponent={
                            hasMore ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : null
                        }
                        onEndReached={() => {
                            if (hasMore && !loading) {
                                fetchModules();
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={8}
                        maxToRenderPerBatch={5}
                        windowSize={7}
                        removeClippedSubviews={true}
                    />
                </View>
            </ThemedView>

            {/* create and edit modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    reset();
                    setCurrentModule(defaultValue);
                    setEditModal(false);
                    setModalVisible(false);
                }}
            >
                <View
                    style={{
                        backgroundColor: Colors[theme].cart,
                        height: vs(400),
                        width: s(300),
                        borderRadius: 10,
                        alignSelf: "center",
                        padding: 10,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            bottom: 30,
                        }}
                    >
                        <ThemedText type="subtitle">
                            {editModal ? "Edit" : "Create Module"}
                        </ThemedText>
                        <Pressable
                            onPress={() => {
                                reset();
                                setEditModal(false);
                                setCurrentModule(defaultValue);
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
                            placeholder={"Enter Module"}
                            onFocus={() => setIsFocused("name")}
                            rules={{
                                required: "Module name is required",
                            }}
                            autoCapitalize="none"
                            autoFocus={true}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"description"}
                            label={"Description"}
                            placeholder={"Enter description"}
                            labelStyle={styles.label}
                            onFocus={() =>
                                setIsFocused(editModal ? "testDescription" : "description")
                            }
                        />
                    </View>

                    <CustomButton
                        title="Submit"
                        onPress={() => {
                            handleSubmit(onSubmit)();
                        }}
                        style={{ backgroundColor: Colors[theme].background, marginTop: vs(10) }}
                    />
                </View>
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
                        onChangeText={() => {
                            const params = {
                                ids: [Number(currentModule?.id)],
                                status: watch("status")?.value
                            }
                            updateModuleStatus({
                                variables: {
                                    updateModuleStatusInput: params
                                },
                                fetchPolicy: "network-only"
                            });
                        }
                        }
                    />
                </View>
            </Modal>
        </CustomHeader>
    );
};

export default ModuleScreen;

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
