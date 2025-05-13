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
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";

const TaskScreen = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch Meeting Venue api 
    const [getMeetingTaskData, { data, refetch, loading }] = useLazyQuery(PaginatedMeetingTaskDocument);
    useEffect(() => {
        getMeetingTaskData({
            variables: {
                listInputDto: {
                    limit: 10, page: 1
                }
            }
        });
    }, [])
    /// Create and  Edit State
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    /// delete meeting venue api 
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

    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Task"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            router.push("/(drawer)/addTask")
                            // setAddEditModalVisible(true)
                            //setAddEditManage(false)
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <FlatList
                    data={data?.paginatedMeetingTask?.data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.scrollContainer}>
                                <View style={[
                                    styles.taskContainer,
                                    { backgroundColor: Colors[theme].cartBg },
                                ]}>
                                    <View style={styles.taskHeader}>
                                        <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.task}</ThemedText>
                                        <View style={styles.taskInfo}>
                                            <Feather
                                                name="edit"
                                                size={ms(20)}
                                                color={Colors[theme].text}
                                                onPress={() => { }}
                                            />
                                            <View style={{ width: 5 }}></View>

                                            <MaterialIcons
                                                name="web"
                                                size={ms(22)}
                                                color={Colors[theme].text}
                                                onPress={() => {
                                                    setAddEditModalVisible(true)
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
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <ThemedText>{item?.priority}</ThemedText>
                                        <View style={{
                                            backgroundColor: item.status == "completed" ? "#EAFFF1" : item.status == "approved" ? "#EFF6FF" : "#F9F9F9", borderRadius: 10, padding: 5,
                                            borderColor: item.status == "completed" ? "#8ACA53" : item.status == "approved" ? "#1B8BFF" : "#89500E", borderWidth: 0.5
                                        }}>
                                            <ThemedText style={{
                                                color: item.status == "completed" ? "#8ACA53" : item.status == "approved" ? "#1B8BFF" : "#89500E"
                                            }}>{item.status}</ThemedText>
                                        </View>
                                    </View>
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
                            backgroundColor: Colors[theme].cartBg,
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
    scrollContainer: {
        marginTop: "1@ms",
    },
    taskContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    taskInfo: {
        flexDirection: "row",
    },
    taskHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
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