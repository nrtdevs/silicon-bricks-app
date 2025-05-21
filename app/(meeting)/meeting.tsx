import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomValidation from '@/components/CustomValidation';
import DateTimePickerModal from '@/components/DateTimePickerModal';
import NoDataFound from '@/components/NoDataFound';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { labels } from '@/constants/Labels';
import { useTheme } from '@/context/ThemeContext';
import { CreateMeetingDocument, CreateNotesDocument, DeleteMetingDocument, EnableMeetingStatusDocument, GetAllMeetingTypesDocument, PaginatedMeetingDocument, PaginatedMeetingVenueDocument, PaginatedProjectsDocument, PaginatedUsersDocument, UpdateMeetingDocument } from '@/graphql/generated';
import { getDateTimePickerProps } from '@/utils/getDateTimePickerProps';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Entypo, Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Pressable, Alert, Modal, FlatList, ScrollView, Image, Button } from 'react-native';
import { ms, s, ScaledSheet, vs } from 'react-native-size-matters';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
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
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Meeting"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            router.push({
                                pathname: "/(meeting)/createMeeting",
                                params: {
                                    isCreate: "true",
                                    id: "",
                                },
                            })
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
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
                            <View style={styles.scrollContainer}>
                                <View style={[
                                    styles.organizationContainer,
                                    { backgroundColor: Colors[theme].cart },
                                ]}>
                                    <View style={styles.organizationHeader}>
                                        <ThemedText type="subtitle" style={{ flex: 1 }}>{item.title}</ThemedText>
                                        <View style={styles.organizationInfo}>
                                            <View style={{ width: 5 }}></View>
                                            <Feather
                                                name="edit"
                                                size={ms(20)}
                                                color={Colors[theme].text}
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
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{
                                            backgroundColor: item.status == "active" ? "#EAFFF1" : "#F9F9F9", borderRadius: 5, paddingHorizontal: 10,
                                            borderColor: item.status == "active" ? "#17C653" : "#89500E", borderWidth: 0.5
                                        }}>
                                            <ThemedText style={{
                                                color: item.status == "active" ? "#17C653" : "#89500E"
                                            }}>{item.status}</ThemedText>
                                        </View>
                                        <Pressable
                                            onPress={() => {
                                                setMeetingId(item.id);
                                                setNotesModalVisible(true);
                                            }}>
                                            <Feather name="plus-square" size={24} color={Colors[theme].text} />
                                        </Pressable>
                                    </View>
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
    organizationContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    organizationInfo: {
        flexDirection: "row",
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