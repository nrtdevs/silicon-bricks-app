import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Env } from "@/constants/ApiEndpoints";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateFollowUpDocument, DeleteMetingTaskDocument, PaginatedMeetingTaskDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";
import { router, useFocusEffect } from "expo-router";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, FlatList, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";

const TaskScreen = () => {
    const { theme } = useTheme();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [neetingTaskList, setMeetingTaskList] = useState();
    const [search, setSearch] = useState(false);
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch Meeting task api 

    const [getMeetingTasks, { data, refetch, loading }] = useLazyQuery<any>(PaginatedMeetingTaskDocument);

    const fetchMeetingTask = async (isRefreshing = false, searchParams = "") => {
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
            const res: any = await getMeetingTasks({
                variables: {
                    listInputDto: params,
                },
                fetchPolicy: "network-only",
            });
            if (res?.data?.paginatedMeetingTask) {
                const data: any = res?.data?.paginatedMeetingTask;
                const newItems = data?.data || [];
                setMeetingTaskList((prev: any) => {
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
            fetchMeetingTask(true, text);
        }, 500),
        [searchQuery]
    );
    useFocusEffect(
        useCallback(() => {
            getMeetingTasks();
            setSearch(false);
        }, [])
    );


    // const [getMeetingTaskData, { data, refetch, loading }] = useLazyQuery(PaginatedMeetingTaskDocument);

    // useEffect(() => {
    //     getMeetingTaskData({
    //         variables: {
    //             listInputDto: {
    //                 limit: 10,
    //                 page: 1
    //             }
    //         }
    //     });
    // }, [])
    /// Create and  Edit State
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    /// delete meeting task api 
    const [deleteMeetingTask, deleteMeetingVenueState] = useMutation(DeleteMetingTaskDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Task deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    /// follow up modal
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{ name: string }>({
        defaultValues: {},
    });
    const [createMeetingFollowUp, createOrganizationState] = useMutation(CreateFollowUpDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditModalVisible(false);
            Alert.alert("success", "Follow-Up successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const onSubmit = (data: any) => {
        createMeetingFollowUp({
            variables: {
                followUpData: {
                    ...data
                },
            },
        });
    };
    const filteredData = data?.paginatedMeetingTask?.data?.filter((item) =>
        item?.task?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <CustomHeader
            title="Tasks"
            leftComponent={(<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ padding: ms(10) }} />
            )}
            rightComponent={
                <FontAwesome5
                    name="trash" size={20} color="#EF4444"
                    onPress={() => router.push("/(meeting)/trashedTask")}
                    style={{ padding: ms(10) }} />
            }
        >
            <ThemedView style={styles.contentContainer}>
                <View style={{ width: "100%", marginBottom: 10, paddingHorizontal: ms(10) }}>
                    <CustomSearchBar
                        searchQuery={searchQuery}
                        placeholder="Search Task"
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            debouncedSearch(text);
                        }}
                    />
                </View>
                <FlatList
                    data={neetingTaskList}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing && !loading}
                    onRefresh={() => {
                        fetchMeetingTask(true);
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={[styles.scrollContainer,
                            {
                                borderColor: Colors[theme].border,
                                shadowColor: Colors[theme].shadow,
                                backgroundColor: Colors[theme].cart
                            }
                            ]}>

                                <ThemedText type='subtitle'>{item?.task}</ThemedText>
                                <View
                                    style={{
                                        width: 100,
                                        backgroundColor: item.status == "active" ? "#10B981" : item.status == "completed" ? "#F59E0B" : "#EF4444",
                                        paddingHorizontal: ms(10),
                                        padding: vs(2),
                                        borderRadius: ms(14),
                                    }}
                                >
                                    <ThemedText style={{ fontSize: ms(10), color: Colors.white, fontWeight: 'bold' }} type='default'>{item.status.toUpperCase()}</ThemedText>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            router.push({
                                                pathname: "/(meeting)/addTask",
                                                params: {
                                                    isCreate: "false",
                                                    task: `${item.task}`,
                                                    comment: `${item.comment}`,
                                                    id: `${item.id}`
                                                },
                                            })
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
                                            setAddEditModalVisible(true)
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: vs(8),
                                            paddingHorizontal: ms(12),
                                            borderRadius: 10,
                                            backgroundColor: "#8B5CF6",
                                            opacity: 0.8
                                        }}
                                    >
                                        {/* icon={<MaterialIcons name="autorenew" size={18} color='#fff' />} */}
                                        <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Follow Up</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                "Delete",
                                                "Are you sure you want to delete?",
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            deleteMeetingTask({
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
                        );
                    }}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                    ListFooterComponent={
                        hasMore ? (
                            <ActivityIndicator size="small" color={Colors.primary} />
                        ) : null
                    }
                    onEndReached={() => {
                        if (hasMore && !loading) {
                            fetchMeetingTask();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                />
            </ThemedView>
            {/* follow up add modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isAddEditModalVisible}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors[theme].cart,
                            // height: vs(250),
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
                            <ThemedText type="subtitle">Follow-Up Create</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
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
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"subject"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Subject`}
                                rules={{
                                    required: "Enter subject",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"body"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Body`}
                                rules={{
                                    required: "Enter body",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomButton
                                title="Submit"
                                onPress={() => {
                                    handleSubmit(onSubmit)();
                                }}
                                style={{
                                    backgroundColor: Colors[theme].background,
                                    marginTop: vs(10),
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <FAB
                size="large"
                title="Create Task"
                style={{
                    position: "absolute",
                    margin: 10,
                    right: 0,
                    bottom: 0,
                }}
                icon={{
                    name: "add",
                    color: "white",
                }}
                onPress={() => {
                    router.push({
                        pathname: "/(meeting)/addTask",
                        params: {
                            isCreate: "true",
                        },
                    });
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
    scrollContainer: {
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
    taskContainer: {
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
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
});
export default TaskScreen;