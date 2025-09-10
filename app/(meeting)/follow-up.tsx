import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { FAB } from "@rneui/themed";
import { Entypo, Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { router, useFocusEffect } from "expo-router";
import { ActivityIndicator, FlatList, Modal, Pressable, ScrollView, View } from "react-native";
import CustomSearchBar from "@/components/CustomSearchBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CreateFollowUpDocument, DeleteFollowUpDocument, PaginatedFollowUpDocument, PaginatedMeetingTaskDocument, PaginatedUsersDocument, UpdateFollowUpDocument } from "@/graphql/generated";
import NoDataFound from "@/components/NoDataFound";
import CustomValidation from "@/components/CustomValidation";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { Env } from "@/constants/ApiEndpoints";
import debounce from "lodash.debounce";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultValue = {
    body: "",
    id: "",
    subject: ""
}
const FollowUp = () => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const insets = useSafeAreaInsets();
    const [userId, setUserId] = useState<number>(0);
    const [addEditManage, setAddEditManage] = useState(false);
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [followList, setFollowList] = useState();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [search, setSearch] = useState<boolean>(false);
    /// follow up list api 
    const [getFollowUp, { data, refetch, loading }] = useLazyQuery<any>(PaginatedFollowUpDocument);

    const fetchFollowup = async (isRefreshing = false, searchParams = "") => {
        if (loading && !isRefreshing) return;
        const currentPage = isRefreshing ? 1 : page;
        if (isRefreshing) {
            setRefreshing(true);
            setPage(1);
        }
        const params = {
            limit: Env?.LIMIT as number,
            page: currentPage,
            search: searchParams,
        };

        try {
            const res: any = await getFollowUp({
                variables: {
                    listInputDto: params,
                },
                fetchPolicy: "network-only",
            });

            if (res?.data?.paginatedFollowUp) {
                const data: any = res?.data?.paginatedFollowUp;
                const newItems = data?.data || [];
                setFollowList((prev: any) => {
                    return isRefreshing || currentPage == 1
                        ? newItems
                        : [...prev, ...newItems];
                });
                const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
                if (!isRefreshing && currentPage < lastPage) {
                    setPage(currentPage + 1);
                }
                if (isRefreshing) setRefreshing(false);
                setHasMore(currentPage < lastPage);
                setRefreshing(false);
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
    const debouncedSearch = useCallback(
        debounce((text) => {
            fetchFollowup(true, text);
        }, 500),
        [searchQuery]
    );
    useFocusEffect(
        useCallback(() => {
            getFollowUp();
            setSearch(false);
        }, [])
    );

    // const [getFollowUp, { data, refetch, loading: listLoading }] = useLazyQuery(PaginatedFollowUpDocument);
    // useEffect(() => {
    //     getFollowUp({
    //         variables: {
    //             listInputDto: {
    //                 page: 1,
    //                 limit: 10,
    //             },
    //         },
    //     });
    // }, [])
    const filteredData = data?.paginatedFollowUp?.data?.filter((item) =>
        item?.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{
        body: string, subject: string,
    }>({ defaultValues: {} });
    /// fetch user data 
    const { data: attendeesData, loading: attendeesLoading, error: attendeesError } = useQuery(PaginatedUsersDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const attendeesPickerData = useMemo(() => {
        if (!attendeesData?.paginatedUsers.data) return [];
        return attendeesData.paginatedUsers.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [attendeesData]);
    /// task api data 
    const { data: taskData, loading: taskLoading, error: taskError } = useQuery(PaginatedMeetingTaskDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const taskPickerData = useMemo(() => {
        if (!taskData?.paginatedMeetingTask.data) return [];
        return taskData.paginatedMeetingTask.data.map((item) => ({
            label: item.comment,
            value: item.id,
        }));
    }, [taskData]);

    /// delete follow up api 
    const [deleteFollowUp, deleteFollowupState] = useMutation(DeleteFollowUpDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Milesotone deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });

    /// create follow up
    const [createFollowUp, createFollowupState] = useMutation(CreateFollowUpDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Follow Up create successfully!");
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [updateFollowup, updateMotesState] = useMutation(UpdateFollowUpDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditManage(false);
            setAddEditModalVisible(false);
            Alert.alert("Success", "Follow up updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const onSubmit = async (data: any) => {
        const storedData = await SecureStore.getItemAsync("userData");
        if (!storedData) return null;
        let parsedUserData = JSON.parse(storedData);
        setUserId(Number(parsedUserData?.userId));
        let param = {
            "body": data.body,
            "followUpId": Number(data?.user?.value),
            "subject": data.subject,
            "taskId": Number(data?.task?.value),
            "userId": userId
        }
        console.log('UserId', userId);
        return;
        addEditManage ?
            updateFollowup({
                variables: {
                    updateFollowUpInput: {
                        id: Number(currentFollowNote.id),
                        followUpId: Number(data?.user?.value),
                        taskId: Number(data?.task?.value),
                        userId: userId,
                        subject: data.subject,
                        body: data.body,
                    }
                }
            }) :
            createFollowUp({
                variables: {
                    followUpData: param
                },
            })
    };
    const [currentFollowNote, setCurrentFollowNote] = useState<{
        id: string;
        body: string;
        subject: string
    }>(defaultValue);
    useEffect(() => {
        setValue("body", currentFollowNote?.body)
        setValue("subject", currentFollowNote?.subject)
    }, [currentFollowNote])
    return (
        <CustomHeader
            title="Follow Up"
            leftComponent={(
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ms(20)}
                    color={Colors[theme]?.text}
                    onPress={() => router.back()}
                    style={{ padding: 10 }} />
            )}
            rightComponent={
                <FontAwesome5
                    name="trash" size={20} color="#EF4444"
                    onPress={() => router.push("/(meeting)/trashed-followUp")}
                    style={{ padding: ms(10) }} />
            }
        >
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "100%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Follow up"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                debouncedSearch(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={followList}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing && !loading}
                    onRefresh={() => {
                        fetchFollowup(true);
                    }}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.followContainer,
                            {
                                borderColor: Colors[theme].border,
                                shadowColor: Colors[theme].shadow,
                                backgroundColor: Colors[theme].cart
                            },
                        ]}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                                <ThemedText type='subtitle'>{item.subject}</ThemedText>
                            </View>
                            <ThemedText type="default">{item.body}</ThemedText>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddEditModalVisible(true)
                                        setAddEditManage(true)
                                        setCurrentFollowNote({
                                            id: `${item?.id}`,
                                            body: item?.body ?? "",
                                            subject: item?.subject ?? ""
                                        });
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: vs(8),
                                        paddingHorizontal: ms(12),
                                        borderRadius: 10,
                                        backgroundColor: "#3B82F6",
                                        opacity: 0.8
                                    }}
                                >
                                    <Feather name="edit" size={16} color="#fff" />
                                    <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Edit</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Delete",
                                            "Are you sure you want to delete?",
                                            [
                                                {
                                                    text: "Yes", onPress: () => {
                                                        deleteFollowUp({
                                                            variables: {
                                                                ids: Number(item?.id),
                                                            }
                                                        });
                                                    }
                                                },
                                                { text: "No", onPress: () => { } },
                                            ]
                                        );
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: vs(8),
                                        paddingHorizontal: ms(12),
                                        borderRadius: 10,
                                        backgroundColor: "#EF4444",
                                        opacity: 0.8
                                    }}
                                >
                                    <FontAwesome5 name="trash" size={14} color="#fff" />
                                    <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Delete</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                    ListFooterComponent={
                        hasMore ? (
                            <ActivityIndicator size="small" color={Colors.primary} />
                        ) : null
                    }
                    onEndReached={() => {
                        if (hasMore && !loading) {
                            fetchFollowup();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                />
            </ThemedView>

            {/* Create and Edit modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isAddEditModalVisible}
            >
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors[theme].cart,
                            width: s(300),
                            borderRadius: 10,
                            padding: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 10,
                            }}
                        >
                            <ThemedText type="subtitle">{addEditManage ? "Update Follow Up" : "Create Follow Up"}</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
                                setCurrentFollowNote(defaultValue)
                            }
                            }>
                                <Entypo
                                    name="cross"
                                    size={ms(20)}
                                    color={Colors[theme].text}
                                />
                            </Pressable>
                        </View>
                        <View style={{ padding: 10 }}>
                            <CustomValidation
                                data={attendeesPickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                keyToCompareData="value"
                                keyToShowData="label"
                                name="user"
                                label='User'
                                placeholder={attendeesLoading ? "Loading..." : "Select User"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select User",
                                    },
                                }}
                            />
                            <CustomValidation
                                data={taskPickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                keyToCompareData="value"
                                keyToShowData="label"
                                name="task"
                                label='Task'
                                placeholder={taskLoading ? "Loading..." : "Select task"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select task",
                                    },
                                }}
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name="subject"
                                label="Subject"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Subject",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name="body"
                                label="Body"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Body",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomButton
                                title="Submit"
                                // isLoading={createFollowupState?.loading}
                                onPress={() => {
                                    handleSubmit(onSubmit)();
                                }}
                                style={{
                                    backgroundColor: Colors[theme].background,
                                    marginTop: vs(30),
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <FAB
                size="large"
                title="Follow Up"
                style={{
                    position: "absolute",
                    margin: 10,
                    right: 0,
                    bottom: insets.bottom,
                }}
                icon={{
                    name: "add",
                    color: "white",
                }}
                onPress={() => {
                    setAddEditModalVisible(true)
                    setAddEditManage(false)
                    setCurrentFollowNote(defaultValue)
                }}
            />
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
    followContainer: {
        borderRadius: "20@ms",
        marginHorizontal: "10@ms",
        marginVertical: "8@ms",
        padding: "16@ms",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        justifyContent: 'space-between',
        gap: 10,
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: "5@ms",
        textAlign: "left",
        alignSelf: "flex-start",
    },
})
export default FollowUp;