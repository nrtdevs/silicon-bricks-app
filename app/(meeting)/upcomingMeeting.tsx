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
import { CreateMeetingDocument, DeleteMetingDocument, GetAllMeetingTypesDocument, GetUpcomingMeetingsDocument, PaginatedMeetingVenueDocument, PaginatedProjectsDocument, PaginatedUsersDocument, UpdateMeetingDocument } from "@/graphql/generated";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Entypo, Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, ScrollView, View, Button, Image } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "@/components/DateTimePickerModal";

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
    /// view meeting details
    const [isViewModalVisible, setViewModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
    const [isNotesModalVisible, setNotesModalVisible] = useState(false);
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

    /// image picker
    const [image, setImage] = useState<any>(null);

    const pickImage = async () => {
        // Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Pick the image
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
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
                            setAddEditManage(true);
                            setAddEditModalVisible(true);
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.meetingContainer,
                                { backgroundColor: Colors[theme].cart },
                            ]}>
                                <View style={styles.meetingHeader}>
                                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item.title}</ThemedText>
                                    <View style={styles.meetingInfo}>
                                        <MaterialIcons name="visibility" color={Colors[theme].text} size={24}
                                            onPress={() => {
                                                setViewModalVisible(true)
                                                setSelectedMeeting(item);
                                            }}
                                        />
                                        <View style={{ width: 5 }}></View>
                                        <Feather
                                            name="edit"
                                            size={ms(20)}
                                            color={Colors[theme].text}
                                            onPress={() => {
                                                setAddEditManage(true);
                                                setAddEditModalVisible(true);
                                                setCurrentMeeting({
                                                    id: item.id,
                                                    title: item.title ?? "",
                                                    startTime: item.startTime,
                                                    endTime: item.endTime,
                                                    meetingAgenda: item.meetingAgenda ?? "",
                                                    meetingReference: item.meetingReference ?? "",
                                                    projectId: `${item.projectId}`,
                                                    meetingDate: item.meetingDate,
                                                    meetingVenueId: `${item.meetingVenueId}`,
                                                    meetingTypeId: `${item.meetingTypeId}`,
                                                    meetingUrl: `${item.meetingUrl}`,
                                                    parentMeetingId: `${item.parentMeetingId}`,
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
                                <ThemedText style={styles.cardTime}>{item.meetingDate} , {item.startTime} to {item.endTime}</ThemedText>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{
                                        backgroundColor: item.status == "active" ? "#EAFFF1" : "#F9F9F9", borderRadius: 10, paddingHorizontal: 10,
                                        borderColor: item.status == "active" ? "#17C653" : "#89500E", borderWidth: 0.5
                                    }}>
                                        <ThemedText style={{
                                            color: item.status == "active" ? "#17C653" : "#89500E"
                                        }}>{item.status}</ThemedText>
                                    </View>
                                    <Pressable
                                        onPress={() => {
                                            setNotesModalVisible(true);
                                        }}>
                                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
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
            {/* create and edit modal */}
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
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors[theme].cart,
                            // height: vs(350),
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
                            <ThemedText type="subtitle">{addEditManage ? "Update Meeting" : "Create Meeting"}</ThemedText>
                            <Pressable onPress={() =>
                                setAddEditModalVisible(false)
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
                                name={"title"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`${labels.title}`}
                                rules={{
                                    required: labels.title,
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Start time"}
                                name="startTime"
                                editable={true}
                                label='Start Time'
                                rightIcon={
                                    <MaterialIcons
                                        name="access-time"
                                        size={ms(22)}
                                        color={Colors[theme]?.text}
                                    />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("startTime");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Start Time",
                                    },
                                }}
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"End time"}
                                name="endTime"
                                editable={true}
                                label='End Time'
                                rightIcon={
                                    <MaterialIcons
                                        name="access-time"
                                        size={ms(22)}
                                        color={Colors[theme]?.text}
                                    />
                                }
                                rules={{
                                    required: {
                                        value: true,
                                        message: "End time",
                                    },
                                }}
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("endTime");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                placeholder={"Meeting Date"}
                                name="meetingDate"
                                editable={true}
                                label='Meeting Date'
                                rightIcon={
                                    <Fontisto name="date" size={ms(20)} color={Colors[theme]?.text} />
                                }
                                onPress={() => {
                                    setDateModal({
                                        start: !dateModal.start,
                                        end: false,
                                    });
                                    setActiveDateField("meetingDate");
                                    setDateTimePickerProps(getDateTimePickerProps(true));
                                }}
                                pointerEvents="none"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Enter meeting date",
                                    },
                                }}
                            />
                            <CustomValidation
                                data={projectPickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                name="projectId"
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
                                data={meetingTypePickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                label='Meeting Type'
                                name="meetingTypeId"
                                placeholder={meetingTypeLoading ? "Loading..." : "Select Meeting"}
                                inputStyle={{ height: vs(50) }}
                            />
                            <CustomValidation
                                data={meetingVenuePickerData}
                                type="picker"
                                hideStar
                                control={control}
                                labelStyle={styles.label}
                                label='Meeting Venue'
                                name="meetingVenueId"
                                placeholder={meetingVenueLoading ? "Loading..." : "Select Venue"}
                                inputStyle={{ height: vs(50) }}
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"meetingAgenda"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Meeting Agenda`}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"meetingUrl"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Meeting Link`}
                                rules={{
                                    required: labels.title,
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                data={attendeesPickerData}
                                type="picker"
                                hideStar
                                multiSelect
                                control={control}
                                labelStyle={styles.label}
                                name="attendees"
                                label='Attendees'
                                placeholder={attendeesLoading ? "Loading..." : "Select Attendees"}
                                inputStyle={{ height: vs(50) }}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Select Attendees",
                                    },
                                }}
                            />

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                                <Button title="Pick an image from gallery" onPress={pickImage} />
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}
                            </View>
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
                    </View>
                </ScrollView>
            </Modal>
            {/* Add notes modal */}
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
                        backgroundColor: 'rgba(0,0,0,0.5)',
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
                                    //handleSubmit(onSubmitNotes)();
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
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    meetingHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    meetingInfo: {
        flexDirection: "row",
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