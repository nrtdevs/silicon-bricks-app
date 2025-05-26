import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateNotePadDocument, DeleteNotePadDocument, PaginatedNotePadDocument, UpdateNotePadDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, TouchableOpacity, View } from "react-native";
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
    const [createNotesMeeting, createNotesState] = useMutation(CreateNotePadDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditModalVisible(false);
            Alert.alert("Success", "Notes Create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [updateNotePad, updateMotesState] = useMutation(UpdateNotePadDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditManage(false);
            setAddEditModalVisible(false);
            Alert.alert("Success", "Note updated successfully!");
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
                        onPress={() => router.push("/(meeting)/trashedNotes")}>
                        <FontAwesome5 name="trash" size={20} color="#EF4444" />
                    </Pressable>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.notesContainer,
                                {
                                    borderColor: Colors[theme].border,
                                    shadowColor: Colors[theme].shadow,
                                    backgroundColor: Colors[theme].cart
                                },
                            ]}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                                    <ThemedText type="subtitle" style={{ flex: 1 }}>{item.notesField}</ThemedText>
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
                                <View style={styles.notesInfo}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setAddEditModalVisible(true)
                                            setCreateEditManage(true)
                                            setAddEditManage(true)
                                            setCurrentMeetingNote({
                                                notesField: item?.notesField ?? "",
                                                id: item?.id,
                                            });
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
                        </View>
                    )}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                />
            </ThemedView>
            {/* Create and Edit modal */}
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
                        backgroundColor: Colors[theme].cart,
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
                                isLoading={createNotesState.loading || updateMotesState.loading}
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
            <FAB
                size="small"
                title="Create Note"
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
                    setCreateEditManage(false)
                    setAddEditManage(false)
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
    notesInfo: {
        gap: 20,
        flexDirection: 'row',
        marginTop: "10@ms"
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