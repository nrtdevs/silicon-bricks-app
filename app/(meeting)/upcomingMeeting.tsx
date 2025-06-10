import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader"
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView"
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels";
import { useTheme } from "@/context/ThemeContext";
import {
    CreateMeetingDocument,
    DeleteMetingDocument,
    EnableMeetingStatusDocument,
    GetAllMeetingTypesDocument,
    GetUpcomingMeetingsDocument,
    PaginatedMeetingVenueDocument,
    PaginatedProjectsDocument,
    PaginatedUsersDocument,
    UpdateMeetingDocument
} from "@/graphql/generated";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, ScrollView, View, Button, Image, TouchableOpacity } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { FAB } from "@rneui/themed";
import { router } from "expo-router";

const defaultValue = {
    endTime: '',
    id: '',
    meetingAgenda: '',
    meetingDate: '',
    meetingReference: '',
    meetingTypeId: '',
    meetingUrl: '',
    meetingVenueId: '',
    parentMeetingId: '',
    projectId: '',
    startTime: '',
    title: ''
}
const statusData = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Inactive", value: "inactive" }
];
const UpcomingMeeting = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch upcoming meeting data
    const [getMeeting, { data, refetch, loading: listLoading }] = useLazyQuery(GetUpcomingMeetingsDocument);
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
    const filteredData = data?.getUpcomingMeetings?.data?.filter((item) =>
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
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

    /// Create and Edit meeting modal
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const [addEditManage, setAddEditManage] = useState(false);
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
    const [activeDateField, setActiveDateField] = useState<string | null>(null);
    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });
    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );
    const [currentMeeting, setCurrentMeeting] = useState<{
        id: string;
        endTime: string;
        meetingAgenda: string;
        meetingDate: string;
        meetingReference: string;
        meetingTypeId: string;
        meetingUrl: string;
        meetingVenueId: string;
        parentMeetingId: string;
        projectId: string;
        startTime: string;
        title: string;
    }>(defaultValue);
    const [updateMeeting, updateMeetingState] = useMutation(UpdateMeetingDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditManage(false);
            setAddEditModalVisible(false);
            Alert.alert("success", "Meeting updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [createMeeting, createOrganizationState] = useMutation(CreateMeetingDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditModalVisible(false);
            Alert.alert("success", "Meeting create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    useEffect(() => {
        setValue('title', currentMeeting.title)
        setValue('startTime', currentMeeting.startTime)
        setValue('endTime', currentMeeting.endTime)
        setValue('meetingAgenda', currentMeeting.meetingAgenda)
        setValue('meetingDate', currentMeeting.meetingDate)
        setValue('meetingReference', "")
        setValue('meetingTypeId', currentMeeting.meetingTypeId)
        setValue('meetingUrl', currentMeeting.meetingUrl)
        setValue('meetingVenueId', currentMeeting.meetingVenueId)
        setValue('projectId', currentMeeting.projectId)

    }, [currentMeeting])
    const onSubmit = (data: any) => {
        let param = {
            "title": data.title,
            "attendees": data.attendees.map((id: number) => Number(id)),
            "startTime": data.startTime,
            "endTime": data.endTime,
            "meetingDate": data.meetingDate,
            "meetingAgenda": data.meetingAgenda,
            "meetingReference": "",
            "meetingUrl": data.meetingUrl,
            "meetingTypeId": Number(data.meetingTypeId.value),
            "meetingVenueId": Number(data.meetingVenueId.value),
            "projectId": Number(data.projectId.value),
            "uploadDoc": null
        }
        addEditManage ?
            updateMeeting({
                variables: {
                    updateMeetingInput: {
                        "id": Number(currentMeeting.id),
                        "title": data.title,
                        "attendees": data.attendees.map((id: number) => Number(id)),
                        "startTime": data.startTime,
                        "endTime": data.endTime,
                        "meetingDate": data.meetingDate,
                        "meetingAgenda": data.meetingAgenda,
                        "meetingReference": "",
                        "meetingUrl": data.meetingUrl,
                        "meetingTypeId": Number(data.meetingTypeId.value),
                        "meetingVenueId": Number(data.meetingVenueId.value),
                        "projectId": Number(data.projectId.value),
                        "uploadDoc": null
                    }
                },
            }) :
            createMeeting({
                variables: {
                    data: param
                },
            });
    };
    const getLocalizedTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    };
    const getLocalizedDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };
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
    /// fetch meeting type data
    const { data: meetingTypeData, loading: meetingTypeLoading, error: meetingTypeError, } = useQuery(GetAllMeetingTypesDocument, {});
    const meetingTypePickerData = useMemo(() => {
        if (!meetingTypeData?.getAllMeetingTypes) return [];
        return meetingTypeData.getAllMeetingTypes.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [meetingTypeData]);
    /// fetch meeting venue 
    const { data: meetingVenueData, loading: meetingVenueLoading, error: meetingVenueError } = useQuery(PaginatedMeetingVenueDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const meetingVenuePickerData = useMemo(() => {
        if (!meetingVenueData?.paginatedMeetingVenue.data) return [];
        return meetingVenueData.paginatedMeetingVenue.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [meetingVenueData]);
    /// fetch user data 
    const { data: attendeesData, loading: attendeesLoading, error: attendeesError } = useQuery(PaginatedUsersDocument, {
        variables: {
            "listInputDto": {
                "limit": 10,
                "page": 1
            }
        }
    });
    const attendeesPickerData = useMemo(() => {
        if (!attendeesData?.paginatedUsers.data) return [];
        return attendeesData.paginatedUsers.data.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [attendeesData]);


    /// Meeting status change 
    const [meetingId, setMeetingId] = useState<string>("");
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
    return (
        <CustomHeader title="U Meeting"
            leftComponent={(
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ms(20)}
                    color={Colors[theme]?.text}
                    onPress={() => router.back()}
                    style={{ left: 0 }} />
            )}>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "100%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Meeting"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => {
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
                                    styles.meetingContainer,
                                    {
                                        borderColor: Colors[theme].border,
                                        shadowColor: Colors[theme].shadow,
                                        backgroundColor: Colors[theme].cart
                                    },
                                ]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                                        <ThemedText type="subtitle" style={{ flex: 1 }}>{item.title}</ThemedText>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 }}>
                                        <Feather name="calendar" size={ms(16)} color={Colors[theme].textPrimary} />
                                        <ThemedText type="default">Time : {item.startTime} To {item.endTime}</ThemedText>
                                    </View>
                                    <View style={{ gap: 10, flexDirection: 'row', marginTop: 15 }}>
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
                                                backgroundColor: "#3B82F6",
                                                opacity: 0.8
                                            }}
                                        >
                                            <Feather name="edit" size={16} color="#fff" />
                                            <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Edit</ThemedText>
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
                                                backgroundColor: "#8B5CF6",
                                                opacity: 0.8
                                            }}
                                        >
                                            <MaterialIcons name="autorenew" size={18} color='#fff' />
                                            <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Status</ThemedText>
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
                                                backgroundColor: "#EF4444",
                                                opacity: 0.8
                                            }}
                                        >
                                            <FontAwesome5 name="trash" size={14} color="#fff" />
                                            <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Delete</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
                />
            </ThemedView>

            {/* Add Status modal */}
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
            {/* date time picker modal */}
            <DateTimePickerModal
                mode={activeDateField === "meetingDate" ? "date" : "time"}
                dateTimePickerProps={dateTimePickerProps}
                setDateTimePickerProps={setDateTimePickerProps}
                onDateTimeSelection={(event: any, selectedDate: any) => {
                    if (event.type !== "dismissed") {
                        const timeOrDate = activeDateField === "meetingDate"
                            ? getLocalizedDate(selectedDate)
                            : getLocalizedTime(selectedDate);

                        if (activeDateField) {
                            setValue(activeDateField, timeOrDate);
                        }
                    }
                    setActiveDateField(null);
                    setDateTimePickerProps(getDateTimePickerProps(false));
                }}
            />
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
    )
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
        marginTop: "5@ms",
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
})
export default UpcomingMeeting;