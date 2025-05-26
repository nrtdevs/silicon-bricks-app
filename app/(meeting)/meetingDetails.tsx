import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import {
    CreateNotesDocument,
    DeleteMetingTaskDocument,
    DeleteNotesDocument,
    GetPaginatedMeetingTaskByMeetingIdDocument,
    GetPaginatedNotesByMeetingIdDocument,
    UpdateNotesDocument
} from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";

const defaultValue = {
    id: "",
    decision: "",
    meetingId: "",
    notes: ""
}
const MeetingDetails = () => {
    const { theme } = useTheme();
    const { id, title, meetingDate, agenda, reference, url, project, startTime, endTime, status } = useLocalSearchParams();
    // create note and update note api 
    const [addEditManage, setAddEditManage] = useState(false);
    const [createMeetingNotes, createMeetingNotesState] = useMutation(CreateNotesDocument, {
        onCompleted: (data) => {
            reset()
            setNotesModalVisible(false);
            Alert.alert("success", "Create note successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [currentMeetingNote, setCurrentMeetingNote] = useState<{
        id: string;
        decision: string;
        meetingId: string;
        notes: string;
    }>(defaultValue);
    const [isNotesModalVisible, setNotesModalVisible] = useState(false);
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
    useEffect(() => {
        setValue("decision", currentMeetingNote?.decision)
        setValue("notes", currentMeetingNote?.notes)
        setValue("meetingId", currentMeetingNote?.meetingId)
    }, [currentMeetingNote])

    const [updateNote, updateNotesState] = useMutation(UpdateNotesDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditManage(false);

            Alert.alert("Success", "Note updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const onSubmitNotes = (data: any) => {
        let param = {
            "meetingId": Number(id),
            "notes": data.notes,
            "decision": data.decision,
            "uploadDoc": null,
        }
        addEditManage ?
            updateNote({
                variables: {
                    updateNotesInput: {
                        id: Number(currentMeetingNote.id),
                        notes: data.notes,
                        decision: data.decision,
                        uploadDoc: null,
                    }
                }
            }) :
            createMeetingNotes({
                variables: {
                    notesData: param
                },
            });
    };
    /// fetch meeting notes data 
    const [getMeetingNotes, { data, refetch, loading: listLoading }] = useLazyQuery(GetPaginatedNotesByMeetingIdDocument);
    useEffect(() => {
        getMeetingNotes({
            variables: {
                meetingId: Number(id),
                query: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])

    /// fetch meeting task data
    const [getMeetingTask, { data: fetchData, refetch: refetchData, loading: dataLoading }] = useLazyQuery(GetPaginatedMeetingTaskByMeetingIdDocument);
    useEffect(() => {
        getMeetingTask({
            variables: {
                meetingId: Number(id),
                query: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])
    /// delete meeting notes api 
    const [deleteNotes, deleteNoteState] = useMutation(DeleteNotesDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Delete note successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    /// delete meeting task api 
    const [deleteMeetingTask, deleteMeetingVenueState] = useMutation(DeleteMetingTaskDocument, {
        onCompleted: (data) => {
            refetchData();
            Alert.alert("success", "Task deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <ThemedText style={{ fontSize: 20, fontWeight: "700" }}> Details</ThemedText>
                </View>
                <View style={[
                    styles.meetingDetailsCard,
                    {
                        borderColor: Colors[theme].border,
                        shadowColor: Colors[theme].shadow,
                        backgroundColor: Colors[theme].cart
                    },
                ]}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <View style={{ width: 130 }}>
                            <ThemedText style={styles.meetingTitle}>Title</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Meeting Date</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Start Time</ThemedText>
                            <ThemedText style={styles.meetingTitle}>End Time</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Meeting Agenda</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Reference</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Meeting Url</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Project</ThemedText>
                            <ThemedText style={styles.meetingTitle}>Status</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={styles.meetingSubtitle}> : {title}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {meetingDate}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {startTime}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {endTime}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {agenda}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {reference}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {url}</ThemedText>
                            <ThemedText style={styles.meetingSubtitle}> : {project == "null" ? "NA" : project}</ThemedText>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <ThemedText style={styles.meetingSubtitle}> : </ThemedText>
                                <View style={{
                                    paddingHorizontal: ms(10),
                                    padding: vs(2),
                                    borderRadius: ms(14),
                                    backgroundColor: status == "active" ? "#10B981" : status == "completed" ? "#F59E0B" : "#EF4444",
                                }}>
                                    <ThemedText style={{ fontSize: ms(10), color: Colors.white, fontWeight: 'bold' }} type='default'>{status}</ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 15}}>
                    <ThemedText style={{ fontSize: 20, fontWeight: "700" }}>Notes</ThemedText>
                    <Pressable
                        onPress={() => {
                            setNotesModalVisible(true);
                            setCurrentMeetingNote(defaultValue)
                        }}
                    >
                        <ThemedText type='link'>+ Create Note</ThemedText>
                    </Pressable>
                </View>
                <FlatList
                    data={data?.getPaginatedNotesByMeetingId.data}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.meetingDetailsCard,
                                {
                                    borderColor: Colors[theme].border,
                                    shadowColor: Colors[theme].shadow,
                                    backgroundColor: Colors[theme].cart
                                },
                            ]}>
                                <ThemedText type='subtitle'>{item.notes}</ThemedText>
                                <View style={{ gap: 10, flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setAddEditManage(true);
                                            setNotesModalVisible(true);
                                            setCurrentMeetingNote({
                                                id: item?.id,
                                                notes: item.notes ?? "",
                                                decision: item.decision ?? "",
                                                meetingId: item.meetingId != null ? String(item.meetingId) : "",
                                            });
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: vs(8),
                                            paddingHorizontal: ms(12),
                                            borderRadius: 10,
                                            borderWidth: 0.5,
                                            borderColor: "#3B82F6",
                                            opacity: 0.8
                                        }}
                                    >
                                        <Feather name="edit" size={16} color="#3B82F6" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                "Delete",
                                                "Are you sure you want to delete?",
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            deleteNotes({
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
                                            borderWidth: 0.5,
                                            borderColor: "#EF4444",
                                            opacity: 0.8
                                        }}
                                    >
                                        <FontAwesome5 name="trash" size={14} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )} 
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
                    />

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                    <ThemedText style={{ fontSize: 20, fontWeight: "700" }}>Tasks</ThemedText>

                    <Pressable
                        onPress={() => {
                             router.push({
                                pathname: "/(meeting)/addTask",
                                params: {
                                    isCreate: "true",
                                },
                            });
                        }}
                    >
                        <ThemedText type='link'>+ Create Task</ThemedText>
                    </Pressable>
                </View>

                <FlatList
                    data={fetchData?.getPaginatedMeetingTaskByMeetingId.data}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.meetingDetailsCard,
                                {
                                    borderColor: Colors[theme].border,
                                    shadowColor: Colors[theme].shadow,
                                    backgroundColor: Colors[theme].cart
                                },
                            ]}>
                                <ThemedText type='subtitle'>{item?.task}</ThemedText>
                                <View style={{ gap: 10, flexDirection: 'row', marginTop: 10 }}>
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
                                            });
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: vs(8),
                                            paddingHorizontal: ms(12),
                                            borderRadius: 10,
                                            borderWidth: 0.5,
                                            borderColor: "#3B82F6",
                                            opacity: 0.8
                                        }}
                                    >
                                        <Feather name="edit" size={16} color="#3B82F6" />
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
                                            borderWidth: 0.5,
                                            borderColor: "#EF4444",
                                            opacity: 0.8
                                        }}
                                    >
                                        <FontAwesome5 name="trash" size={14} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )} 
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
                    />
            </ThemedView>
            {/* Add Note modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isNotesModalVisible}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)', // Optional: dim background
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors[theme].cart,
                            height: vs(330),
                            width: s(300),
                            borderRadius: 10,
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
                            <ThemedText type="subtitle">{addEditManage ? "Update notes" : "Create notes"}</ThemedText>
                            <Pressable onPress={() => setNotesModalVisible(false)}>
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
                                name={"notes"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label="Notes"
                                rules={{ required: "enter notes" }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"decision"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label="Decision"
                                rules={{ required: "enter decision" }}
                                autoCapitalize="none"
                            />
                            <CustomButton
                                title="Submit"
                                isLoading={createMeetingNotesState.loading}
                                onPress={() => {
                                    handleSubmit(onSubmitNotes)();
                                }}
                                style={{
                                    backgroundColor: Colors[theme].background,
                                    marginTop: vs(20),
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
    meetingDetailsCard: {
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
    meetingTitle: {
        fontSize: "16@ms",
        fontWeight: "500",
    },
    meetingSubtitle: {
        fontSize: "16@ms",
        fontWeight: "600",
    },
    scrollContainer: {
        marginTop: "5@ms",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
});
export default MeetingDetails;