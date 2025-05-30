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
import { Entypo, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { FAB } from "@rneui/themed"
import { isLoading } from "expo-font"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Alert, FlatList, Modal, Pressable, View, ScrollView, TouchableOpacity } from "react-native"
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
    const [createMeetingVenue, createMeetingState] = useMutation(CreateMeetingVenueDocument, {
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
    // View Venue Details
    const [isViewModalVisible, setViewModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "100%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Meeting Venue"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.scrollContainer}>
                                <View style={[
                                    styles.meetingVenueContainer,
                                    {
                                        borderColor: Colors[theme].border,
                                        shadowColor: Colors[theme].shadow,
                                        backgroundColor: Colors[theme].cart
                                    },
                                ]}>
                                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item.name}</ThemedText>
                                    <View style={styles.organizationInfo}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setViewModalVisible(true)
                                                setSelectedMeeting(item);
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
                                            <MaterialIcons name="visibility" color='#fff' size={16} />
                                            <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>View</ThemedText>
                                        </TouchableOpacity>
                                        <TouchableOpacity
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
                            backgroundColor: Colors[theme].cart,
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
                                keyboardType="number-pad"
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
                                isLoading={createMeetingState?.loading || updateMeetingVenueState?.loading}
                                onPress={() => {
                                    handleSubmit(onSubmit)();
                                }}
                                style={{
                                    backgroundColor: Colors[theme].background,
                                    marginTop: vs(30),
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
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
                            <ThemedText type="subtitle">Venue Details</ThemedText>
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
                                <ThemedText style={styles.meetingTitle}>Name</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Address</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Contact</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Person</ThemedText>
                                <ThemedText style={styles.meetingTitle}>Description</ThemedText>
                            </View>
                            <View>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.name}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.address}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.contactNumber}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.contactPerson}</ThemedText>
                                <ThemedText style={styles.meetingTitle}> : {selectedMeeting?.description}</ThemedText>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <FAB
                size="small"
                title="Meeting Venue"
                style={{
                    position: "absolute",
                    margin: 15,
                    right: 0,
                    bottom: 0,
                }}
                icon={{
                    name: "add",
                    color: "white",
                }}
                onPress={() => {
                    setAddEditModalVisible(true)
                    setAddEditManage(false)
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
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12@ms",
        marginHorizontal: "10@ms"
    },
    scrollContainer: {
        marginTop: "1@ms",
    },
    meetingVenueContainer: {
        borderRadius: "20@ms",
        marginHorizontal: "5@ms",
        marginVertical: "5@ms",
        padding: "16@ms",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        justifyContent: 'space-between',
        gap: 10,
    },
    organizationInfo: {
        gap: 15,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: "5@ms",
        textAlign: "left",
        alignSelf: "flex-start",
    },
    meetingTitle: {
        fontSize: "16@ms",
        fontWeight: "500",
    },
})
export default MeetingVenue;