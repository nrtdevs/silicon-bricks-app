import { View, Pressable, FlatList, RefreshControl, Alert } from "react-native";
import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import CustomSearchBar from "@/components/CustomSearchBar";
import { labels } from "@/constants/Labels";
import { useState, useEffect } from "react";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import NoDataFound from "@/components/NoDataFound";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { ThemedText } from "@/components/ThemedText";
import CustomValidation from "@/components/CustomValidation";
import Modal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import { CreatePermissionDocument, DeletePermissionDocument, PaginatedPermissionsDocument } from "@/graphql/generated";

const defaultValue = {
    appName: "",
    description: "",
    id: "",
    module: "",
    action: ""
}

const pickerData = [
    { label: "Master App", value: "MasterApp" },
    { label: "Material Management", value: "MaterialManagement" },
    { label: "Task Management", value: "TaskManagement" },
    { label: "Vehicle Management", value: "VehicleManagement" },
];

const PermissionScreen = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch permission data 

    const [permissionData, { error, data, loading, refetch }] = useLazyQuery(
        PaginatedPermissionsDocument
    );

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const fetchPermission = async (isRefreshing = false) => {
        if (isRefreshing) {
            setPage(1);
            setRefreshing(true);
        }
        const params = {
            per_page_record: 10,
            page: isRefreshing ? 1 : page,
        };

        await permissionData({
            variables: {
                listInputDto: {},
            },
        });;
    };
    useEffect(() => {
        fetchPermission();
    }, []);
    const [page, setPage] = useState<number>(1);
    /// delete permission 
    const [deletePermission, deleteOrganizationState] = useMutation(DeletePermissionDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Permission deleted successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    // Add and Edit state

    const [createPermission, createPermissionState] = useMutation(CreatePermissionDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setModalVisible(false);
            Alert.alert("success", "Permission create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error11", error.message);
        }
    });


    const [isModalVisible, setModalVisible] = useState(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<{ appName: string, description: string, module: string, action: string }>({
        defaultValues: {},
    });

    const [currentPermission, setCurrentPermission] = useState<{
        appName: string;
        description: string;
        id: string;
        module: String
    }>(defaultValue);


    const onSubmit = (data: any) => {
        let param = {
            appName: data.appName.value,
            description: data.description,
            module: data.module,
            action: data.action,
        }
        console.log(param);
        // createOrganization({
        //     variables: {
        //         data: {
        //             ...data
        //         },
        //     },
        // });

        createPermission({
            variables: {
                data: {
                    ...param
                },
            },
        });
    };
    const [currentPremission, setCurrentProject] = useState<{
        appName: string,
        description: string,
        id: string,
        module: string
    }>(defaultValue);

    useEffect(() => {
        setValue('appName', currentPremission?.appName)
        setValue('description', currentPremission?.description)
        setValue('module', String(currentPremission?.module))
    }, [currentPremission])

    // useEffect(() => {
    //     setValue("appName", currentPermission?.appName);
    //     setValue("module", currentPermission?.module);
    //     setValue("action", currentPermission?.action);
    //     setValue("description", currentPermission?.description);
    // }, [currentPermission]);

    console.log('00999', data?.paginatedPermissions?.data[0]);

    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Permissions"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        style={styles.buttonContainer}
                        onPress={() => { setModalVisible(true), setCurrentPermission(defaultValue) }}
                    >
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <View style={styles.organizationParentContainer}>
                    <FlatList
                        data={data?.paginatedPermissions?.data}
                        renderItem={({ item, index }: any) =>
                            <View
                                key={index}
                                style={[
                                    styles.organizationContainer,
                                    { backgroundColor: Colors[theme].cart },
                                ]}
                            >
                                <View style={styles.organizationHeader}>
                                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.appName}</ThemedText>
                                    <View style={styles.organizationInfo}>
                                        <Feather
                                            name="edit"
                                            size={ms(20)}
                                            color={Colors[theme].text}
                                            onPress={() => {
                                                setModalVisible(true),
                                                    setCurrentPermission({
                                                        appName: item.appName,
                                                        description: item.description,
                                                        id: String(item.id),
                                                        module: item.module
                                                    })
                                            }}
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
                                                                deletePermission({
                                                                    variables: {
                                                                        deletePermissionId: Number(item?.id),
                                                                    }
                                                                });
                                                            }
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
                                    {item?.module}
                                </ThemedText>
                                {/* <ThemedText style={{ color: "black", fontSize: 14 }}
                                >{item?.module}
                                </ThemedText> */}
                                <ThemedText style={{ fontSize: ms(14), lineHeight: ms(18) }}>
                                    {item?.description}
                                </ThemedText>
                            </View>}
                        showsVerticalScrollIndicator={false}
                        // refreshControl={
                        // <RefreshControl
                        //     refreshing={refreshing}
                        //     onRefresh={() => fetchPermission(true)}
                        // />
                        // }
                        contentContainerStyle={{ paddingBottom: vs(40) }}
                        ListEmptyComponent={!loading ? <NoDataFound /> : null}
                    />
                </View>
            </ThemedView>

            {/* create and edit modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    setCurrentProject(defaultValue);
                    setEditModal(false);
                    setModalVisible(false);
                }}
            >
                <View
                    style={{
                        backgroundColor: Colors[theme].cart,
                        height: vs(510),
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
                        }}
                    >
                        <ThemedText type="subtitle">Create Permission
                        </ThemedText>
                        <Pressable
                            onPress={() => {
                                setEditModal(false);
                                setModalVisible(false);
                            }}
                        >
                            <Entypo name="cross" size={ms(20)} color={Colors[theme].text} />
                        </Pressable>
                    </View>

                    <View style={{ padding: 10 }}>
                        <CustomValidation
                            data={pickerData}
                            type="picker"
                            hideStar={false}
                            control={control}
                            labelStyle={styles.label}
                            name="appName"
                            placeholder="Select App Name"
                            label={"App Name"}
                            inputStyle={{ height: vs(50) }}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Select App Name",
                                },
                            }}
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"module"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Module"}
                            // onFocus={() => setIsFocused("name")}
                            rules={{
                                required: editModal ? "Module Name is required" : "Module name is required"
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            labelStyle={styles.label}
                            name={"action"}
                            inputStyle={[{ lineHeight: ms(20) }]}
                            label={"Action"}
                            // onFocus={() => setIsFocused("name")}
                            rules={{
                                required: "Action name is required"
                            }}
                            autoCapitalize="none"
                        />

                        <CustomValidation
                            type="input"
                            control={control}
                            name={"description"}
                            label={"Description"}
                            labelStyle={styles.label}
                            //onFocus={() => setIsFocused("description")}
                            rules={{
                                //required: editModal ? "Test organization description is required" : "Description is required",
                            }}
                        />
                    </View>

                    <CustomButton
                        title="Submit"
                        isLoading={createPermissionState.loading}
                        onPress={() => {
                            handleSubmit(onSubmit)();
                        }}
                        style={{ backgroundColor: Colors[theme].background, marginTop: vs(10) }}
                    />
                </View>
            </Modal>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
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
    status: {
        color: "green",
        borderRadius: "10@ms",
        width: "100%",
        textAlign: "center",
        fontSize: "14@ms",
        fontWeight: 'bold',
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
    },
    label: {
        color: Colors.grayText,
        fontSize: "14@ms",
        marginBottom: "12@ms",
        fontWeight: 400,
    },
});
export default PermissionScreen;