import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateNotesDocument } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Modal, Pressable, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";

const MeetingDetails = () => {
    const { theme } = useTheme();
    const { id, title, meetingDate, agenda, reference, url, project, startTime, endTime, status } = useLocalSearchParams();
    // create note 
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
    const [isNotesModalVisible, setNotesModalVisible] = useState(false);
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
    const onSubmitNotes = (data: any) => {
        let param = {
            "meetingId": Number(id),
            "notes": data.notes,
            "decision": data.decision,
            "uploadDoc": null,
        }
        createMeetingNotes({
            variables: {
                notesData: param
            },
        });
    };
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <ThemedText style={{ fontSize: 20, fontWeight: "700" }}> Details</ThemedText>
                    <Pressable
                        onPress={() => {
                            setNotesModalVisible(true);
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <View style={[
                    styles.meetingDetailsCard,
                    { backgroundColor: Colors[theme].cart },
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
                            <ThemedText style={styles.meetingSubtitle}> : {project}</ThemedText>
                            <View style={{
                                        backgroundColor: status == "active" ? "#EAFFF1" : "#F9F9F9", borderRadius: 10, paddingHorizontal: 10,
                                        borderColor: status == "active" ? "#17C653" : "#89500E", borderWidth: 0.5,width: 80
                                    }}>
                                        <ThemedText style={{
                                            color: status == "active" ? "#17C653" : "#89500E"
                                        }}>{status}</ThemedText>
                                    </View>
                        </View>
                    </View>
                </View>
                <ThemedText style={{ fontSize: 20, fontWeight: "700" }}>Task List</ThemedText>
                <View style={styles.scrollContainer}>
                    <View style={[
                        styles.meetingDetailsCard,
                        { backgroundColor: Colors[theme].cart },
                    ]}>
                        <View style={styles.meetingHeader}>
                            <ThemedText type="subtitle" style={{ flex: 1 }}>test task</ThemedText>
                            <View style={styles.meetingInfo}>
                                <View style={{ width: 5 }}></View>
                                <Feather
                                    name="edit"
                                    size={ms(20)}
                                    color={Colors[theme].text}
                                    onPress={() => { }}
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
                                                        // deleteMeeting({
                                                        //     variables: {
                                                        //         ids: Number(item?.id),
                                                        //     }
                                                        // });
                                                    }
                                                },
                                                { text: "No", onPress: () => { } },
                                            ]
                                        );

                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
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
                            <ThemedText type="subtitle">Create</ThemedText>
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
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    meetingTitle: {
        fontSize: "16@ms",
        color: "black",
        fontWeight: "500",

    },
    meetingSubtitle: {
        fontSize: "16@ms",
        color: "black",
        fontWeight: "600",
    },
    scrollContainer: {
        marginTop: "5@ms",
    },
    meetingHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10@ms",
    },
    meetingInfo: {
        flexDirection: "row",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        color: "black",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
});
export default MeetingDetails;