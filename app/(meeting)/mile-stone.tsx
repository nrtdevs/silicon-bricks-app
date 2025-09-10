 import CustomHeader from "@/components/CustomHeader";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateMilestoneDocument, DeleteMilestoneDocument, PaginatedMilestoneDocument, PaginatedProjectsDocument, UpdateMilestoneDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { FAB } from "@rneui/themed";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import CustomValidation from "@/components/CustomValidation";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import { Env } from "@/constants/ApiEndpoints";
import debounce from "lodash.debounce";
import CustomSearchBar from "@/components/CustomSearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const defaultValue = {
    id: "",
    projectId: "",
    name: "",
    startDate: "",
    endDate: "",
    description: ""
}
const Milestone = () => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const [addEditManage, setAddEditManage] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [milestoneList, setMilestoneList] = useState();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [search, setSearch] = useState<boolean>(false);
    /// mile stone api 

    const [getMilestone, { data, refetch, loading }] = useLazyQuery<any>(PaginatedMilestoneDocument);
    const fetchMeeting = async (isRefreshing = false, searchParams = "") => {
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
            const res: any = await getMilestone({
                variables: {
                    listInputDto: params,
                },
                fetchPolicy: "network-only",
            });

            if (res?.data?.paginatedMilestone) {
                const data: any = res?.data?.paginatedMilestone;
                const newItems = data?.data || [];
                setMilestoneList((prev: any) => {
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
            fetchMeeting(true, text);
        }, 500),
        [searchQuery]
    );
    useFocusEffect(
        useCallback(() => {
            getMilestone();
            setSearch(false);
        }, [])
    );

    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{
        name: string, startDate: string, endDate: string, description: string
    }>({ defaultValues: {} });
    const onSubmit = (data: any) => {
        let param = {
            "name": data.name,
            "projectId": Number(data?.project?.value),
            "startDate": data.startDate,
            "endDate": data.endDate,
            "description": data.description,
        }
        addEditManage
            ? updateMilestone({
                variables: {
                    updateMilestoneInput: {
                        id: Number(currentMilestone.id),
                        projectId: Number(data?.project?.value),
                        startDate: data.startDate,
                        endDate: data.endDate,
                        name: data.subject,
                        description: data.description,
                    }
                }
            }) :
            createMilestone({
                variables: {
                    input: {
                        ...param
                    },
                },
            });
    };
    const [currentMilestone, setCurrentMilestone] = useState<{
        id: string,
        name: string,
        projectId: string,
        startDate: string,
        endDate: string,
        description: string
    }>(defaultValue);
    /// api create and update 
    const [updateMilestone, updateMilestoneState] = useMutation(UpdateMilestoneDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditManage(false);
            setAddEditModalVisible(false);
            Alert.alert("Success", "Milestone updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [createMilestone, createMilestoneState] = useMutation(CreateMilestoneDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Milestone create successfully!");
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    /// delete milestone api 
    const [deleteMilestone, deleteMilestoneState] = useMutation(DeleteMilestoneDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Milesotone deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    /// fetch project data
    const { data: projectData, loading: packageLoading, error: packageError, } = useQuery(PaginatedProjectsDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const projectPickerData = useMemo(() => {
        if (!projectData?.paginatedProjects?.data) return [];
        return projectData.paginatedProjects.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [projectData]);
    /// date picker
    const [activeDateField, setActiveDateField] = useState<string | null>(null);
    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });
    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );
    return (
        <CustomHeader
            title="Milestone"
            rightComponent={
                <FontAwesome5
                    name="trash" size={20} color="#EF4444"
                    onPress={() => router.push("/(meeting)/trashedMilestone")}
                    style={{ padding: ms(10) }} />
            }
            leftComponent={(
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ms(20)}
                    color={Colors[theme]?.text}
                    onPress={() => router.back()}
                    style={{ padding: 10 }} />
            )}
        >
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "100%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Milestone"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                debouncedSearch(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={milestoneList}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing && !loading}
                    onRefresh={() => {
                        fetchMeeting(true);
                    }}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.milestoneContainer,
                            {
                                borderColor: Colors[theme].border,
                                shadowColor: Colors[theme].shadow,
                                backgroundColor: Colors[theme].cart
                            },
                        ]}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                                <ThemedText type='subtitle'>{item.name}</ThemedText>
                                <View
                                    style={{
                                        // backgroundColor: item.status == "active" ? "#10B981" : item.status == "completed" ? "#F59E0B" : "#EF4444",
                                        paddingHorizontal: ms(10),
                                        padding: vs(2),
                                        borderRadius: ms(14),
                                    }}
                                >
                                    <ThemedText style={{ fontSize: ms(10), color: Colors.white, fontWeight: 'bold' }} type='default'>asaas</ThemedText>
                                </View>
                            </View>
                            <ThemedText type="default">{item.projectName}</ThemedText>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddEditModalVisible(true)
                                        setAddEditManage(true)
                                        setCurrentMilestone({
                                            id: `${item?.id}`,
                                            name: item.name,
                                            projectId: `${item.projectId}`,
                                            startDate: item.startDate,
                                            endDate: item.endDate,
                                            description: item.description
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
                                                        deleteMilestone({
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
                            fetchMeeting();
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
                            <ThemedText type="subtitle">{addEditManage ? "Update Milestone" : "Create Milestone"}</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
                                //setCurrentMeetingVenue(defaultValue)
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
                                name={"name"}
                                label="Name"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Name",
                                }}
                                autoCapitalize="none"
                            />

                            <CustomValidation
                                data={projectPickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                name="project"
                                label='Project Name'
                                placeholder={packageLoading ? "Loading..." : "Select Project"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select project name",
                                    },
                                }}
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Start Date"}
                                name="startDate"
                                editable={false}
                                label='Start Date'
                                rightIcon={
                                    <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("startDate");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Due Date"}
                                name="endDate"
                                editable={false}
                                label='Due Date'
                                rightIcon={
                                    <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("endDate");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"description"}
                                label="Description"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Description",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomButton
                                title="Submit"
                                isLoading={createMilestoneState?.loading}
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
                <DateTimePickerModal
                    mode="date"
                    dateTimePickerProps={dateTimePickerProps}
                    setDateTimePickerProps={setDateTimePickerProps}
                    onDateTimeSelection={(event: any, selectedDate: any) => {
                        if (event.type != "dismissed") {
                            setValue(
                                dateModal.start ? "startDate" : "endDate",
                                formatTimeForAPI(selectedDate, "yyyy-mm-dd") || "",
                            );
                        }
                        setActiveDateField(null);
                        setDateTimePickerProps(getDateTimePickerProps(false));
                    }}
                />
            </Modal>
            <FAB
                size="large"
                title="Add Milestone"
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
                }}
            />
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        padding: "12@ms"
    },
    searchContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12@ms",
    },
    milestoneContainer: {
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
});
export default Milestone;