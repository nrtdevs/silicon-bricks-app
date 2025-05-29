import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateFollowUpDocument, DeleteMetingTaskDocument, PaginatedMeetingTaskDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";

const TaskScreen = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch Meeting task api 
    const [getMeetingTaskData, { data, refetch, loading }] = useLazyQuery(PaginatedMeetingTaskDocument);

    useEffect(() => {
        getMeetingTaskData({
            variables: {
                listInputDto: {
                    limit: 10,
                    page: 1
                }
            }
        });
    }, [])
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
        let param = {
            ...data
        }
        console.log(param);
        createMeetingFollowUp({
            variables: {
                data: {
                    ...data
                },
            },
        });

    };
    const filteredData = data?.paginatedMeetingTask?.data?.filter((item) =>
        item?.task?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={{ width: "100%", marginBottom: 10 }}>
                    <CustomSearchBar
                        searchQuery={searchQuery}
                        placeholder="Search Task"
                        onChangeText={(text) => {
                            setSearchQuery(text);
                        }}
                    />
                </View>
                <FlatList
                    data={filteredData}
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
                                        <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Follow up</ThemedText>
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