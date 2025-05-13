import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateNotePadDocument, CreateNotesDocument, DeleteNotePadDocument, DeleteNotesDocument, PaginatedNotePadDocument, PaginatedNotesDocument, UpdateNotePadDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, View } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";


const defaultValue = {
    notesField: "",
    id: "",
}
const MyNotes = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");
    /// fetch notes data 
    const [getNotesData, { data, refetch, loading }] = useLazyQuery(PaginatedNotePadDocument);
    useEffect(() => {
        getNotesData({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])
    /// delete meeting api 
    const [deleteNotesApi, deleteMeetingTypeState] = useMutation(DeleteNotePadDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Notes deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    ///  Create and Edit modal 
    const [addEditManage, setAddEditManage] = useState(false);
    const [createEditManage, setCreateEditManage] = useState(false);
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const [currentMeetingNote, setCurrentMeetingNote] = useState<{
        notesField: string;
        id: string;
    }>(defaultValue);
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{ notesField: string }>({
        defaultValues: {},
    });
    useEffect(() => {
        setValue("notesField", currentMeetingNote?.notesField)
    }, [currentMeetingNote])
    const [createNotesMeeting, createOrganizationState] = useMutation(CreateNotePadDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditModalVisible(false);
            Alert.alert("success", "Notes Create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [updateNotePad, updateMeetingVenueState] = useMutation(UpdateNotePadDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditManage(false);
            setAddEditModalVisible(false);
            Alert.alert("success", "Note updated successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const onSubmit = (data: any) => {
        let param = {
            "notesField": data.notesField
        }
        addEditManage ?
            updateNotePad({
                variables: {
                    updateNotesInput: {
                        id: Number(currentMeetingNote?.id),
                        notesField: data.notesField
                    }
                },
            }) :
            createNotesMeeting({
                variables: {
                    notesData: {
                        ...param
                    },
                },
            });
    };
    const filteredData = data?.paginatedNotePad?.data?.filter((item) =>
        item?.notesField?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "90%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search notes"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            setAddEditModalVisible(true)
                            setCreateEditManage(false)
                            setAddEditManage(false)
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.notesContainer,
                                { backgroundColor: Colors[theme].cartBg },
                            ]}>
                                <View style={styles.notesHeader}>
                                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item.notesField}</ThemedText>
                                    <View style={styles.notesInfo}>
                                        <Feather
                                            name="edit"
                                            size={ms(20)}
                                            color={Colors[theme].text}
                                            onPress={() => {
                                                setAddEditModalVisible(true)
                                                setCreateEditManage(true)
                                                setAddEditManage(true)
                                                setCurrentMeetingNote({
                                                    notesField: item?.notesField ?? "",
                                                    id: item?.id,
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
                                                                deleteNotesApi({
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
                                <View style={{ justifyContent: "space-between",flexDirection :'row'}}>
                                    <ThemedText>data</ThemedText>
                                    <View style={{
                                        width: 100,
                                        backgroundColor: item.status == "completed" ? "#EAFFF1" : item.status == "approved" ? "#EFF6FF" : "#FFEEF3", borderRadius: 10, padding: 5,
                                        borderColor: item.status == "completed" ? "#8ACA53" : item.status == "approved" ? "#1B8BFF" : "#F8285F", borderWidth: 0.5
                                    }}>
                                        <ThemedText style={{
                                            color: item.status == "completed" ? "#8ACA53" : item.status == "approved" ? "#1B8BFF" : "#F8285F", justifyContent: 'center',
                                            alignItems: 'center', alignSelf: 'center'
                                        }}>{item.status}</ThemedText>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                />
            </ThemedView>
            {/* add and Edit modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isAddEditModalVisible}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <View style={{
                        backgroundColor: Colors[theme].cartBg,
                        height: vs(250),
                        width: s(300),
                        borderRadius: 10,
                        padding: 10,
                    }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                padding: 10
                            }}>
                            <ThemedText>{createEditManage ? "Update notes" : "Create notes"}</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
                                setCurrentMeetingNote(defaultValue)
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
                                name={"notesField"}
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Notes`}
                                rules={{
                                    required: "Enter notes",
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
    scrollContainer: {
        marginTop: "5@ms",
    },
    notesContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        marginBottom: "16@ms",
        gap: "8@ms",
    },
    notesHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    notesInfo: {
        flexDirection: "row",
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
})
export default MyNotes;