import CustomButton from "@/components/CustomButton"
import CustomHeader from "@/components/CustomHeader"
import CustomSearchBar from "@/components/CustomSearchBar"
import CustomValidation from "@/components/CustomValidation"
import NoDataFound from "@/components/NoDataFound"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Colors } from "@/constants/Colors"
import { useTheme } from "@/context/ThemeContext"
import { CreateMeetingVenueDocument, DeleteMetingVenueDocument, PaginatedMeetingVenueDocument, UpdateMeetingVenueDocument } from "@/graphql/generated"
import { useLazyQuery, useMutation } from "@apollo/client"
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Alert, FlatList, Modal, Pressable, View, ScrollView } from "react-native"
import { ms, s, ScaledSheet, vs } from "react-native-size-matters"

const defaultValue = {
    id: "",
    name: "",
    contactPerson: "",
    contactNumber: "",
    address: "",
    description: ""
}

const MeetingVenue = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch Meeting Venue api 
    const [getMeetingVenueData, { data, refetch, loading }] = useLazyQuery(PaginatedMeetingVenueDocument);
    useEffect(() => {
        getMeetingVenueData({
            variables: { listInputDto: { limit: 10, page: 1 } }
        });
    }, [])
    /// delete meeting venue api 
    const [deleteMeetingVenue, deleteMeetingVenueState] = useMutation(DeleteMetingVenueDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Meeting deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });

    /// add and edit state 
    const [addEditManage, setAddEditManage] = useState(false);
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const [currentMeetingVenue, setCurrentMeetingVenue] = useState<{
        name: string;
        id: string;
        contactPerson: string,
        contactNumber: string,
        address: string,
        description: string
    }>(defaultValue);
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{
        name: string, contactNumber: string, address: string, contactPerson: string, description: string
    }>({ defaultValues: {} });
    const [createMeetingVenue, createOrganizationState] = useMutation(CreateMeetingVenueDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditModalVisible(false);
            Alert.alert("success", "Meeting venue create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [updateMeetingVenue, updateMeetingVenueState] = useMutation(UpdateMeetingVenueDocument, {
        onCompleted: (data) => {
            reset();
            refetch();
            setAddEditManage(false);
            setAddEditModalVisible(false);
            Alert.alert("success", "Meeting venue updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    useEffect(() => {
        setValue("name", currentMeetingVenue?.name),
            setValue("contactPerson", currentMeetingVenue?.contactPerson),
            setValue("contactNumber", currentMeetingVenue?.contactNumber),
            setValue("address", currentMeetingVenue?.address),
            setValue("description", currentMeetingVenue?.description);
    }, [currentMeetingVenue])

    const onSubmit = (data: any) => {
        const params = {
            id: Number(currentMeetingVenue.id),
            title: data.title,
            name: data.name,
            address: data.address,
            contactNumber: Number(data.contactNumber),
            contactPerson: data.contactPerson,
            description: data.description,
        }
        addEditManage ?
            updateMeetingVenue({
                variables: {
                    updateMeetingVenueInput: {
                        ...params
                    }
                },
            }) :
            createMeetingVenue({
                variables: {
                    data: {
                        name: data.name,
                        address: data.address,
                        contactNumber: Number(data.contactNumber),
                        contactPerson: data.contactPerson,
                        description: data.description,
                    },
                },
            });
    };
    const filteredData = data?.paginatedMeetingVenue?.data?.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Meeting Venue"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            setAddEditModalVisible(true)
                            setAddEditManage(false)
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.scrollContainer}>
                                <View style={[
                                    styles.meetingContainer,
                                    { backgroundColor: Colors[theme].cartBg },
                                ]}>
                                    <View style={styles.meetingHeader}>
                                        <ThemedText type="subtitle" style={{ flex: 1 }}>{item.name}</ThemedText>
                                        <View style={styles.organizationInfo}>
                                            <Feather
                                                name="edit"
                                                size={ms(20)}
                                                color={Colors[theme].text}
                                                onPress={() => {
                                                    setAddEditModalVisible(true)
                                                    setAddEditManage(true)
                                                    setCurrentMeetingVenue({
                                                        name: item?.name,
                                                        id: item?.id,
                                                        contactPerson: item?.contactPerson ?? "",
                                                        contactNumber: String(item?.contactNumber),
                                                        address: String(item?.address),
                                                        description: String(item?.description),
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
                                                                    deleteMeetingVenue({
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
                                    <View style={{ width: 5 }}></View>
                                </View>
                            </View>
                        )
                    }}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                />
            </ThemedView>
            {/* Create and Edit modal */}
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
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors[theme].cartBg,
                            // height: vs(250),
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
                            <ThemedText type="subtitle">{addEditManage ? "Update Meeting Venue" : "Create Meeting Venue"}</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
                                setCurrentMeetingVenue(defaultValue)
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
                                name={"name"}
                                label="Venue Name"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Name",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"contactNumber"}
                                label="Contact Number"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Number",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name={"contactPerson"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label="Contact Person"
                                rules={{
                                    required: "Enter Person",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name="address"
                                label="Address"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter address",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomValidation
                                type="input"
                                control={control}
                                labelStyle={styles.label}
                                name="description"
                                label="Description"
                                inputStyle={[{ lineHeight: ms(20) }]}
                                rules={{
                                    required: "Enter Description",
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
                                    marginTop: vs(50),
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
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
        marginTop: "1@ms",
    },
    meetingContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    organizationInfo: {
        flexDirection: "row",
    },
    meetingHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: "5@ms",
        textAlign: "left",
        alignSelf: "flex-start",
    },
})
export default MeetingVenue;