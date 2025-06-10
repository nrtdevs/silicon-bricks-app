import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import DateTimePickerModal from "@/components/DateTimePickerModal";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { CreateMeetingDocument } from "@/graphql/generated";
import { getDateTimePickerProps } from "@/utils/getDateTimePickerProps";
import { useMutation } from "@apollo/client";
import { Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ExitingMeeting = () => {
    const { theme } = useTheme();
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{
        title: string,
        startTime: string,
        endTime: string,
        meetingDate: any,
        projectId: any,
        meetingTypeId: any,
        meetingVenueId: any,
        meetingAgenda: any,
        meetingUrl: any,
        attendees: any,
    }>();
    const [dateModal, setDateModal] = useState({
        start: false,
        end: false,
    });
    const [activeDateField, setActiveDateField] = useState<any>(null);
    const [dateTimePickerProps, setDateTimePickerProps] = useState<any>(
        getDateTimePickerProps(false)
    );
    const getLocalizedTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    };
    const getLocalizedDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };
    const [createMeeting, createMeetingState] = useMutation(CreateMeetingDocument, {
        onCompleted: (data) => {
            reset()
            Alert.alert("success", "Meeting create successfully!");
            router.back();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    /// Submit Function
    const onSubmit = (data: any) => {
        console.log('pressed');
        let param = {
            "title": data?.title,
            "attendees": data?.attendees.map((id: number) => Number(id)),
            "startTime": data?.startTime,
            "endTime": data?.endTime,
            "meetingDate": data?.meetingDate,
            "meetingAgenda": data?.meetingAgenda,
            "meetingReference": "",
            "meetingUrl": data?.meetingUrl,
            "meetingTypeId": Number(data?.meetingTypeId?.value),
            "meetingVenueId": Number(data?.meetingVenueId?.value),
            "projectId": Number(data?.projectId?.value),
            // "uploadDoc": image
        }
        createMeeting({
            variables: {
                data: param
            },
        })
    };
    return (
        <CustomHeader
            title="Exiting Meeting"
            leftComponent={(
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ms(20)}
                    color={Colors[theme]?.text}
                    onPress={() => router.back()}
                    style={{ left: 0 }} />
            )}>
            <ThemedView style={styles.contentContainer}>
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
                    editable={false}
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
                    editable={false}
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
                    editable={false}
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

                <CustomButton
                    title="Submit"
                    // isLoading={createMeetingState.loading || updateMeetingState.loading}
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        backgroundColor: Colors[theme].background,
                        marginTop: vs(20),
                    }}
                />
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
                            setValue(activeDateField, timeOrDate?.toString());
                        }
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
        padding: "12@ms",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
})
export default ExitingMeeting;