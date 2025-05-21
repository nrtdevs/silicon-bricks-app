import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateMeetingDocument, GetAllMeetingTypesDocument, PaginatedMeetingVenueDocument, PaginatedProjectsDocument, PaginatedUsersDocument, UpdateMeetingDocument } from "@/graphql/generated";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useMutation, useQuery } from "@apollo/client";
import { Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View, Image, Alert } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";

const defaultValue = {
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
    endTime: '',
    title: ''
}
const CreateMeeting = () => {
    const { theme } = useTheme();
    const {
        isCreate,
        id,
        startTime,
        endTime,
        title,
        meetingDate,
        meetingAgenda,
        meetingUrl,
        meetingTypeId,
        projectId,
        meetingVenueId,
     } = useLocalSearchParams();
    /// create and edit state
    const [activeDateField, setActiveDateField] = useState<string | null>(null);
    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });
    const getLocalizedTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    };
    const getLocalizedDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };
    const [updateMeeting, updateMeetingState] = useMutation(UpdateMeetingDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Meeting updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [createMeeting, createMeetingState] = useMutation(CreateMeetingDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Meeting create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const onSubmit = (data: any) => {
        console.log(`${isCreate}---------status`);
        console.log(data);
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
            "uploadDoc": image
        }
        console.log(`${param}----------param`);
        return;
        isCreate == "true" ?
            createMeeting({
                variables: {
                    data: param
                },
            }) :
            updateMeeting({
                variables: {
                    updateMeetingInput: {
                        "id": Number(id),
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
                        "uploadDoc": null,
                        "projectName": data.projectName
                    }
                },
            });
    };
    const [currentMeeting, setCurrentMeeting] = useState<{
        startTime: string;
        endTime: string;
        title: string;
        meetingDate: string;
        meetingAgenda: string;
        meetingUrl: string;
        meetingTypeId: string;
        meetingVenueId: string;
        projectId: string;
    }>(defaultValue);
    useEffect(() => {
        if (isCreate == "true") {
            setCurrentMeeting(defaultValue);
        } else {
            setCurrentMeeting({
                startTime: startTime as string,
                endTime: endTime as string,
                title: title as string,
                meetingDate: meetingDate as string,
                meetingAgenda: meetingAgenda as string,
                meetingUrl: meetingUrl as string,
                meetingTypeId : meetingTypeId as string,
                meetingVenueId: meetingVenueId as string,
                projectId: projectId as string,
            });
        }
        setValue('startTime', startTime as string);
        setValue('endTime', endTime as string);
        setValue('title', title as string);
        setValue('meetingDate', meetingDate as string);
        setValue('meetingAgenda', meetingAgenda as string);
        setValue('meetingUrl', meetingUrl as string);
        setValue('meetingTypeId', meetingTypeId as string);
        setValue('meetingVenueId', meetingVenueId as string);
        setValue('projectId', projectId as string);
    }, [currentMeeting])
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
    /// File Upload Rest Api
    const [image, setImage] = useState<any>(null);
    const uploadImage = async (uri: string) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) {
                console.error("File does not exist:", uri);
                return;
            }
            const fileExtension = uri.split(".").pop() || "jpg";
            const mimeType = `image/${fileExtension}`;
            const formData = new FormData();
            formData.append("file", {
                uri,
                name: `upload.${fileExtension}`,
                type: mimeType,
            } as unknown as Blob);
            const uploadResponse = await fetch(`http://192.168.1.50:5001/api/files/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });
            if (!uploadResponse.ok) {
                const err = await uploadResponse.text();
                throw new Error(`Upload failed: ${err}`);
            }
            const responseData = await uploadResponse.json();
            console.log("Upload successful:", responseData?.files[0]);
            setImage(responseData?.files[0]);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };
    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled && result.assets?.length > 0) {
            const uri = result.assets[0].uri;
            uploadImage(uri);
        }
    };
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={ms(20)}
                        color={Colors[theme]?.text}
                        onPress={() => router.back()}
                        style={{ left: 10 }} />
                    <ThemedText style={styles.appBarText}>{isCreate == "true" ? 'Create Meeting' : "Update Meeting"}</ThemedText>
                    <ThemedText></ThemedText>
                </View>
                <ScrollView style={{ paddingHorizontal: 10 }}>
                    <CustomValidation
                        type="input"
                        control={control}
                        labelStyle={styles.label}
                        name={"title"}
                        inputStyle={[{ lineHeight: ms(20) }]}
                        label="Title"
                        rules={{
                            required: "Enter title",
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
                            required: "Enter meeting link",
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
                    <CustomButton
                        title="Upload Image"
                        onPress={() => {
                            handleImagePickerPress()
                        }}
                        style={{
                            backgroundColor: "#E5E5E5",
                            marginTop: vs(20),
                        }}
                    />
                    {image && <Image source={{ uri: `http://192.168.1.50:5001${image}` }} style={{ width: "100%", height: 200, marginTop: 20, justifyContent: "center", alignSelf: "center" }}
                    />}
                    <CustomButton
                        title="Submit"
                        isLoading={createMeetingState.loading || updateMeetingState.loading}
                        onPress={() => {
                            handleSubmit(onSubmit)();
                        }}
                        style={{
                            backgroundColor: Colors[theme].background,
                            marginTop: vs(20),
                        }}
                    />
                </ScrollView>
            </ThemedView>
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
    appBarText: {
        fontSize: 20,
        fontWeight: "600",
        right: 10
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
})
export default CreateMeeting;