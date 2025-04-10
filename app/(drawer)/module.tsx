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

    const [moduleData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedModulesDocument
    );

    const [createModule, createModuleState] = useMutation(CreateModuleDocument, {
        onCompleted: (data) => {
            reset();
            refetch();
            setModalVisible(false);
            Alert.alert("success", "Module create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const [updateModuleStatus, updateModuleStatusState] = useMutation(ChangeModuleStatusDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setStatusModalVisible(false);
            Alert.alert("success", "Module updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const [deleteModule, deleteModuleState] = useMutation(DeleteModuleDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Module deleted successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const [updateModule, updateModuleState] = useMutation(UpdateModuleDocument, {
        onCompleted: (data) => {
            refetch();
            setModalVisible(false);
            setCurrentModule(defaultValue);
            Alert.alert("success", "Status updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    useEffect(() => {
        setValue("name", currentModule?.name)
        setValue("description", currentModule?.description)
    }, [currentModule])

    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        const params = {
            id: Number(currentModule?.id),
            status: watch("status")?.value
        }
        console.log("selected", params);

        if (watch("status")) {
            updateModuleStatus({
                variables: {
                    updateModuleStatusInput: params
                },
            });
        }
    }, [watch("status")]);

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

    const fetchModules = async (isRefreshing = false) => {
        if (isRefreshing) {
            setPage(1);
            setRefreshing(true);
        }
        // Params for API
        const params = {
            per_page_record: 10,
            page: isRefreshing ? 1 : page,
        };

        await moduleData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1,
                },
            },
        });
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
                });
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = (item, index) => (<View
        key={index}
        style={[
            styles.organizationContainer,
            { backgroundColor: Colors[theme].cartBg },
        ]}
    >
        <View style={styles.organizationHeader}>
            <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.name}</ThemedText>
            <View style={styles.organizationInfo}>
                <MaterialIcons
                    name="attractions"
                    size={ms(20)}
                    color={Colors[theme].text}
                    onPress={() => {
                        setCurrentModule({
                            name: item?.name,
                            description: item?.description,
                            id: item?.id,
                        });
                        setStatusModalVisible(true);
                    }}
                />
                <Feather
                    name="edit"
                    size={ms(20)}
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
                />
                <MaterialIcons
                    name="delete-outline"
                    size={ms(20)}
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
                                                deleteModuleId: Number(item?.id),
                                            }
                                        });
                                    },
                                },
                                { text: "No", onPress: () => { } },
                            ]
                        );
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
                    backgroundColor:
                        theme == "dark" ? Colors?.white : "#e6e2e2",
                },
            ]}
        >
            {item?.status}
        </ThemedText>

        <View style={styles.userInfo}>
            <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                {item?.description}
            </ThemedText>
        </View>
    </View>)

    const debouncedSearch = useCallback(
        debounce((text) => {
            moduleData({
                variables: {
                    listInputDto: {
                        limit: 10,
                        page: 1,
                        search: text,
                    },
                },
            })
        }, 500),
        []
    );

    if (loading) {
        return <Loader />
    }

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
                            placeholder={labels?.searchModule}
                            loading={loading}
                            onClear={() => {
                                setSearchQuery("");
                            }}
                        />
                    </View>
                    <Pressable
                        style={styles.buttonContainer}
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    >
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={data?.paginatedModules?.data}
                        contentContainerStyle={{ paddingBottom: vs(40) }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }: any) => renderItem(item, index)
                        }
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={refreshing}
                        //         onRefresh={() => fetchModules(true)}
                        //     />
                        // }
                        ListEmptyComponent={!loading ? <NoDataFound /> : null}
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
                        backgroundColor: Colors[theme].cartBg,
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
                            rules={{
                                required: "Description is required",
                            }}
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
