import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateMeetingTaskDocument, PaginatedMeetingDocument, PaginatedNotesDocument, PaginatedProjectsDocument, PaginatedUsersDocument, UpdateMeetingTaskDocument } from "@/graphql/generated";
import { formatTimeForAPI } from "@/utils/formatDateTime";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useMutation, useQuery } from "@apollo/client";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, ScrollView, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const pickerData = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" }
];
const weightData = [
    { label: "Automated", value: "automated" },
    { label: "Manual", value: "manual" },
];

const AddTask = () => {
    const { isCreate, task, comment, id } = useLocalSearchParams<any>();
    const { theme } = useTheme();
    /// create and edit user state
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{
        task: string, priority: string, comment: string, dueDate: string, openedDate: string
    }>({ defaultValues: {} });
    /// fetch user data api 
    const { data: attendeesData, loading: attendeesLoading, error: attendeesError } = useQuery(PaginatedUsersDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const userPickerData = useMemo(() => {
        if (!attendeesData?.paginatedUsers.data) return [];
        return attendeesData.paginatedUsers.data.map((item) => ({
            label: item.name,
            value: item.id
        }));
    }, [attendeesData]);
    /// fetch project Api
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
    /// fetch meetings Api
    const { data: meetingData, loading: meetingLoading, error: meetingError, } = useQuery(PaginatedMeetingDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const meetingPickerData = useMemo(() => {
        if (!meetingData?.paginatedMeeting?.data) return [];
        return meetingData.paginatedMeeting.data.map((item) => ({
            label: item?.title,
            value: item.id,
        }));
    }, [meetingData]);
    /// fetch notes Api
    const { data: notesData, loading: notesLoading, error: notesError } = useQuery(PaginatedNotesDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const notesPickerData = useMemo(() => {
        if (!notesData?.paginatedNotes?.data) return [];
        return notesData.paginatedNotes.data.map((item) => ({
            label: item?.notes,
            value: item.id,
        }));
    }, [notesData])

    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );
    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });
    /// create and update button
    const [createMeetingTask, createMeetingTaskState] = useMutation(CreateMeetingTaskDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Task create successfully!");
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [updateMeetingTask, updateMeetingTaskState] = useMutation(UpdateMeetingTaskDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Task updated successfully!");
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [activeDateField, setActiveDateField] = useState<string | null>(null);

    const onSubmit = (data: any) => {
        let param = {
            "assigneeId": Number(data.owner?.value),
            "comment": data.comment,
            "completePercent": 10,
            "dueDate": data.dueDate,
            "meetingId": null,
            "notesId": null,
            "openedDate": data.openedDate,
            "parentTaskId": null,
            "priority": data.priority?.value,
            "projectId": Number(data.project?.value),
            "task": data.task,
            "weightType": data.weight.value,
        }
        isCreate == "true" ?
            createMeetingTask({
                variables: {
                    input: {
                        ...param
                    },
                },
            }) :
            updateMeetingTask({
                variables: {
                    updateMeetingTaskInput: {
                        id: Number(id),
                        assigneeId: Number(data.owner?.value),
                        comment: data.comment,
                        completePercent: 10,
                        dueDate: data.dueDate,
                        meetingId: null,
                        notesId: null,
                        openedDate: data.openedDate,
                        parentTaskId: null,
                        priority: data.priority?.value,
                        projectId: Number(data.project?.value),
                        task: data.task,
                        weightType: data.weight.value,
                    }
                },
            });
    };

    useEffect(() => {
        // console.log('ooo',isCreate);

        if (isCreate == "true") {
            reset()
        } else {
            setValue('task', task as string);
            setValue('comment', comment as string);
        }
    }, [isCreate])

    return (
        <CustomHeader
            title={isCreate == "true" ? "Add Task" : "Update Task"}
            isBack={true}
            onBackPress={() => router.back()}
            leftComponent={<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ left: 10 }} />}>
            <ThemedView style={styles.contentContainer}>
                <ScrollView style={{ paddingHorizontal: 10 }}>
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
                        data={pickerData}
                        type="picker"
                        hideStar
                        control={control}
                        name="priority"
                        label={`Priority`}
                        placeholder="Select priority"
                        rules={{
                            required: {
                                value: true,
                                message: "Select priority",
                            },
                        }}
                    />
                    <CustomValidation
                        data={userPickerData}
                        type="picker"
                        hideStar
                        control={control}
                        labelStyle={styles.label}
                        name="owner"
                        label='Assigned To'
                        placeholder={attendeesLoading ? "Loading..." : "Select Assigned To"}
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select Assigned To",
                            },
                        }}
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
                                message: "Select Project",
                            },
                        }}
                    />
                    <CustomValidation
                        data={meetingPickerData}
                        type="picker"
                        hideStar
                        control={control}
                        labelStyle={styles.label}
                        name="meeting"
                        label='Meeting Name'
                        placeholder={meetingLoading ? "Loading..." : "Select meeting"}
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select Meeting",
                            },
                        }}
                    />
                    <CustomValidation
                        data={notesPickerData}
                        type="picker"
                        hideStar
                        control={control}
                        labelStyle={styles.label}
                        name="note"
                        label='Note Name'
                        placeholder={meetingLoading ? "Loading..." : "Select note"}
                        inputStyle={{ height: vs(50) }}
                    />
                    <CustomValidation
                        data={weightData}
                        type="picker"
                        hideStar
                        control={control}
                        labelStyle={styles.label}
                        name="weight"
                        label='Weight Type'
                        placeholder={meetingLoading ? "Loading..." : "Select weight"}
                        inputStyle={{ height: vs(50) }}
                        rules={{
                            required: {
                                value: true,
                                message: "Select weight",
                            },
                        }}
                    />
                    <CustomValidation
                        type="input"
                        control={control}
                        placeholder={"Start Date"}
                        name="openedDate"
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
                            setActiveDateField("start_date");
                            setDateTimePickerProps(getDateTimePickerProps(true));
                        }}
                        pointerEvents="none"
                    />
                    <CustomValidation
                        type="input"
                        control={control}
                        placeholder={"Due Date"}
                        name="dueDate"
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
                            setActiveDateField("due_date");
                            setDateTimePickerProps(getDateTimePickerProps(true));
                        }}
                        pointerEvents="none"
                    />
                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"comment"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        label={`Comment`}
                        rules={{
                            required: "Enter comment",
                        }}
                        autoCapitalize="none"
                    />
                    <View style={{ height: 20 }}>
                    </View>
                    <CustomButton
                        title="Submit"
                        isLoading={createMeetingTaskState?.loading || updateMeetingTaskState.loading}
                        onPress={handleSubmit(onSubmit)}
                        isGradient
                    />
                    <View style={{ height: 20 }} />
                </ScrollView>
            </ThemedView>
            <DateTimePickerModal
                mode="date"
                dateTimePickerProps={dateTimePickerProps}
                setDateTimePickerProps={setDateTimePickerProps}
                onDateTimeSelection={(event: any, selectedDate: any) => {
                    if (event.type != "dismissed") {
                        setValue(
                            dateModal.start ? "openedDate" : "dueDate",
                            formatTimeForAPI(selectedDate, "yyyy-mm-dd") || "",
                        );
                    }
                    setActiveDateField(null);
                    setDateTimePickerProps(getDateTimePickerProps(false));
                }}
            />
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: "12@ms",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
})
export default AddTask;
