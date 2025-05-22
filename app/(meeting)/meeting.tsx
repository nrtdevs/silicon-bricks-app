import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomValidation from '@/components/CustomValidation';
import NoDataFound from '@/components/NoDataFound';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { FAB } from "@rneui/themed";
import { useTheme } from '@/context/ThemeContext';
import { DeleteMetingDocument, EnableMeetingStatusDocument, PaginatedMeetingDocument } from '@/graphql/generated';
import { useLazyQuery, useMutation, } from '@apollo/client';
import { Entypo, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Pressable, Alert, Modal, FlatList, TouchableOpacity } from 'react-native';
import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import { router } from 'expo-router';

const statusData = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Inactive", value: "inactive" }
];

const MeetingScreen = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// View meeting data 
    const [meetingId, setMeetingId] = useState<string>("");
    const [isViewModalVisible, setViewModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
    const [isNotesModalVisible, setNotesModalVisible] = useState(false);
    const [enableMeetingStatus, enableMeetingStatusState] = useMutation(EnableMeetingStatusDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setNotesModalVisible(false);
            Alert.alert("success", "Create note successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });

    const onSubmitNotes = (data: any) => {
        let param = {
            "ids": [Number(meetingId)],
            "status": data.status.value,
        }
        enableMeetingStatus({
            variables: {
                updateMeetingStatusInput: param
            },
        });
    };

    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
    /// fetch meeting api 
    const [getMeeting, { data, refetch, loading: listLoading }] = useLazyQuery(PaginatedMeetingDocument);
    useEffect(() => {
        getMeeting({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])

    /// delete meeting api 
    const [deleteMeeting, deleteMeetingState] = useMutation(DeleteMetingDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Meeting deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    const filteredData = data?.paginatedMeeting?.data?.filter((item) =>
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={{ width: "100%", marginBottom: 10}}>
                    <CustomSearchBar
                        searchQuery={searchQuery}
                        placeholder="Search Meeting"
                        onChangeText={(text) => {
                            setSearchQuery(text);
                        }}
                    />
                </View>

                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {
                                router.push({
                                    pathname: "/(meeting)/meetingDetails",
                                    params: {
                                        id: item.id,
                                        title: `${item.title}`,
                                        meetingDate: `${item.meetingDate}`,
                                        agenda: `${item.meetingAgenda}`,
                                        reference: `${item.meetingReference}`,
                                        url: `${item.meetingUrl}`,
                                        project: `${item.projectName}`,
                                        startTime: `${item.startTime}`,
                                        endTime: `${item.endTime}`,
                                        status: `${item.status}`,
                                    },
                                });
                            }}>
                            <View style={[
                                styles.meetingContainer,
                                {
                                    borderColor: Colors[theme].border,
                                    shadowColor: Colors[theme].shadow,
                                    backgroundColor: Colors[theme].cart
                                },
                            ]}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6, width: 300 }}>
                                    <ThemedText type='subtitle'>{item.title}</ThemedText>
                                    <View
                                        style={{
                                            backgroundColor: item.status == "active" ? "#10B981" : item.status == "completed" ? "#F59E0B" : "#EF4444",
                                            paddingHorizontal: ms(10),
                                            padding: vs(2),
                                            borderRadius: ms(14),
                                        }}
                                    >
                                        <ThemedText style={{ fontSize: ms(10), color: Colors.white, fontWeight: 'bold' }} type='default'>{item.status.toUpperCase()}</ThemedText>
                                    </View>
                                </View>
                                <View style={{ gap: 20, flexDirection: 'row', marginTop: 15 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            router.push({
                                                pathname: "/(meeting)/createMeeting",
                                                params: {
                                                    isCreate: "false",
                                                    id: item.id,
                                                    startTime: item.startTime,
                                                    endTime: item.endTime,
                                                    title: item.title,
                                                    meetingDate: item.meetingDate,
                                                    meetingAgenda: item.meetingAgenda,
                                                    meetingUrl: item.meetingUrl,
                                                    meetingTypeId: item.meetingTypeId,
                                                    projectId: item.projectId,
                                                    meetingVenueId: item.meetingVenueId,
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
                                            borderWidth: 0.5,
                                            borderColor: "#3B82F6",
                                            opacity: 0.8
                                        }}
                                    >
                                        <Feather name="edit" size={16} color="#3B82F6" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setMeetingId(item.id);
                                            setNotesModalVisible(true);
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: vs(8),
                                            paddingHorizontal: ms(12),
                                            borderRadius: 10,
                                            borderWidth: 0.5,
                                            borderColor: "#8B5CF6",
                                            opacity: 0.8
                                        }}
                                    >
                                        <MaterialIcons name="autorenew" size={18} color="#8B5CF6" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                "Delete",
                                                "Are you sure you want to delete?",
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            deleteMeeting({
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
                        </Pressable>
                    )}
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
                />
            </ThemedView>
            {/* view meeting data  */}
            <Modal
                visible={isViewModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors[theme].cart,
                            height: vs(220),
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
                            <ThemedText type="subtitle">Meeting Details</ThemedText>
                            <Pressable onPress={() => setViewModalVisible(false)}>
                                <Entypo
                                    name="cross"
                                    size={ms(20)}
                                    color={Colors[theme].text}
                                />
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <View style={{ width: 110 }}>
                                <ThemedText style={styles.meetingTitle}>Title</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Time</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Date</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Meeting Agenda</ThemedText>
                            </View>
                            <View>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.title}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.startTime} to {selectedMeeting?.endTime}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.meetingDate}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.meetingAgenda}</ThemedText>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
                            height: vs(250),
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
                            <ThemedText type="subtitle">Change Status</ThemedText>
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
                                data={statusData}
                                type="picker"
                                hideStar
                                control={control}
                                name="status"
                                label={`Status`}
                                placeholder="Select status"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select status",
                                    },
                                }}
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
            <FAB
                size="large"
                title="Create Meeting"
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
                onPress={() => router.push({
                    pathname: "/(meeting)/createMeeting",
                    params: {
                        isCreate: "true",
                    },
                })}
            />
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        padding: "12@ms",
    },
    container: {
        borderRadius: "20@ms",
        marginHorizontal: "16@ms",
        marginVertical: "10@ms",
        padding: "16@ms",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    meetingContainer: {
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

    organizationHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardTime: {
        fontSize: "16@ms",
        color: "black",
        fontWeight: "normal",
    },
    meetingTitle: {
        fontSize: "16@ms",
        color: "black",
        fontWeight: "500",

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
export default MeetingScreen;