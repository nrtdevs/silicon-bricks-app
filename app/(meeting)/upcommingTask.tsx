import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader"
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { DeleteMetingTaskDocument, GetAllMeetingTypesDocument, GetUpcomingMeetingTaskDocument, PaginatedProjectsDocument } from "@/graphql/generated";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Entypo, Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, ScrollView, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";

const defaultValueData = {
    id: "",
    task: "",
    priority: "",
    comment: "",
    start_date: "",
    due_date: "",
    complete_date: ""
}
const UpcommingTask = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch Upcoming meeting task data 
    const [getUpcomingTaskData, { data, refetch, loading }] = useLazyQuery(GetUpcomingMeetingTaskDocument);
    useEffect(() => {
        getUpcomingTaskData({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])

    /// fetch project datac
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
    /// fetch meeting type data
    const { data: meetingTypeData, loading: meetingTypeLoading, error: meetingTypeError, } = useQuery(GetAllMeetingTypesDocument, {});
    const meetingTypePickerData = useMemo(() => {
        if (!meetingTypeData?.getAllMeetingTypes) return [];
        return meetingTypeData.getAllMeetingTypes.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [meetingTypeData]);
    ///  Create and Edit modal 
    const [createEditManage, setCreateEditManage] = useState(false);
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const [activeDateField, setActiveDateField] = useState<string | null>(null);
    const [currentMeetingTask, setCurrentMeetingTask] = useState<{
        id: string;
        task: string;
        priority: string
        comment: string,
        start_date: string,
        due_date: string,
        complete_date: string
    }>(defaultValueData);
    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{
        task: string, priority: string, comment: string, start_date: string, due_date: string, complete_date: string
    }>({
        defaultValues: {},
    });
    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });
    const getLocalizedDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    useEffect(() => {
        setValue("task", currentMeetingTask?.task),
            setValue("priority", currentMeetingTask?.priority),
            setValue("comment", currentMeetingTask?.comment),
            setValue("start_date", currentMeetingTask.start_date),
            setValue("due_date", currentMeetingTask.due_date),
            setValue("complete_date", currentMeetingTask.complete_date)
    }, [currentMeetingTask])

    /// delete meeting api 
    const [deleteMeetingTaskApi, deleteMeetingTaskState] = useMutation(DeleteMetingTaskDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Task deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    /// Create And Edit Meeting
    const onSubmit = (data: any) => {
        let param = {
            "notesField": data.notesField
        }
        // addEditManage ?
        //     updateNotePad({
        //         variables: {
        //             updateNotesInput: {
        //                 id: Number(currentMeetingNote?.id),
        //                 notesField: data.notesField
        //             }
        //         },
        //     }) :
        // createNotesMeeting({
        //     variables: {
        //         notesData: {
        //             ...param
        //         },
        //     },
        // });
    };
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search task"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            setAddEditModalVisible(true)
                            setCreateEditManage(false)
                            setCurrentMeetingTask(defaultValueData)
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>

                <FlatList
                    data={data?.getUpcomingMeetingTask?.data}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.notesContainer,
                                { backgroundColor: Colors[theme].cartBg },
                            ]}>
                                <View style={styles.notesHeader}>
                                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item?.task}</ThemedText>
                                    <View style={styles.notesInfo}>
                                        <Feather
                                            name="edit"
                                            size={ms(20)}
                                            color={Colors[theme].text}
                                            onPress={() => {
                                                setAddEditModalVisible(true)
                                                setCreateEditManage(true)
                                                setCurrentMeetingTask({
                                                    id: item?.id,
                                                    task: item.task ?? "",
                                                    comment: item.comment ?? "",
                                                    priority: item.priority ?? "",
                                                    start_date: item.openedDate ?? "",
                                                    due_date: item.dueDate ?? "",
                                                    complete_date: item.completedDate ?? ""
                                                });
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
                                                                deleteMeetingTaskApi({
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
                                <ThemedText>{item.priority}</ThemedText>
                            </View>
                        </View>
                    )}
                />


            </ThemedView>
            {/* Create and Edit modal */}
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
                    }}
                >
                    <ScrollView
                        style={{
                            backgroundColor: Colors[theme].cartBg,
                            //height: vs(650),
                            width: s(300),
                            borderRadius: 10,
                            padding: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                padding: 10
                            }}>
                            <ThemedText>{createEditManage ? "Update Task" : "Create Task"}</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
                                // setCurrentMeetingNote(defaultValue)
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
                                name={"task"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Task`}
                                rules={{
                                    required: "Enter task",
                                }}
                                autoCapitalize="none"
                            />

                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"priority"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Priority`}
                                rules={{
                                    required: "Enter Priority",
                                }}
                                autoCapitalize="none"
                            />

                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Start Date"}
                                name="start_date"
                                editable={true}
                                label='Start Date'
                                rightIcon={
                                    <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("start_date");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                            />

                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Due Date"}
                                name="due_date"
                                editable={true}
                                label='Due Date'
                                rightIcon={
                                    <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("due_date");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                            />

                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Completed Date"}
                                name="complete_date"
                                editable={true}
                                label='Completed Date'
                                rightIcon={
                                    <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("complete_date");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                            />

                            <CustomValidation
                                data={projectPickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                // onFocus={() => setIsFocused("packages")}
                                name="project"
                                label='Project Name'
                                placeholder={packageLoading ? "Loading..." : "Select Project"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select Project",
                                    },
                                }}
                            />
                            <CustomValidation
                                data={meetingTypePickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                label='Meeting Type'
                                // onFocus={() => setIsFocused("packages")}
                                name="meeting_type"
                                placeholder={meetingTypeLoading ? "Loading..." : "Select Meeting"}
                                inputStyle={{ height: vs(50) }}
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"comment"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Comment`}
                                rules={{
                                    required: "Enter Comment",
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
                                    marginTop: vs(20),
                                }}
                            />
                        </View>
                    </ScrollView>

                </View>

            </Modal>
            {/* date time picker modal */}
            <DateTimePickerModal
                mode="date"
                dateTimePickerProps={dateTimePickerProps}
                setDateTimePickerProps={setDateTimePickerProps}
                onDateTimeSelection={(event: any, selectedDate: any) => {
                    if (event.type !== "dismissed") {
                        const timeOrDate = getLocalizedDate(selectedDate);
                        if (activeDateField) {
                            setValue("start_date", timeOrDate);
                            setValue("due_date", timeOrDate);
                            setValue("complete_date", timeOrDate);
                        }
                    }
                    setActiveDateField(null);
                    setDateTimePickerProps(getDateTimePickerProps(false));
                }}
            />
        </CustomHeader>
    )
}
export default UpcommingTask;
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
        marginTop: "5@ms",
    },
    notesContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    notesHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    notesInfo: {
        flexDirection: "row",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
});