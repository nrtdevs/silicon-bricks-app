import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader"
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateMeetingTypeDocument, DeleteMetingTypeDocument, PaginatedMeetingTypeDocument, UpdateMeetingTypeDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, TouchableOpacity, View, } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { FAB } from "@rneui/themed";
import { router } from "expo-router";

const defaultValue = {
    name: "",
    id: "",
}

const MeetingType = () => {
    const { theme } = useTheme();
    /// serach state 
    const [searchQuery, setSearchQuery] = useState<string>("");

    /// add and edit modal state
    const [addEditManage, setAddEditManage] = useState(false);
    const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{ name: string }>({
        defaultValues: {},
    });
    const [currentMeetingType, setCurrentMeetingType] = useState<{
        name: string;
        id: string;
    }>(defaultValue);
    const [createMeetingType, createMeetingTypeState] = useMutation(CreateMeetingTypeDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
            setAddEditModalVisible(false);
            Alert.alert("success", "Meeting Type create successfully!");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const [updateMeetingType, updateMeetingTypeState] = useMutation(UpdateMeetingTypeDocument, {
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

    const onSubmit = (data: any) => {
        let param = {
            ...data
        }
        console.log(param);
        addEditManage ?
            updateMeetingType({
                variables: {
                    updateMeetingTypeInput: {
                        id: Number(currentMeetingType?.id),
                        name: param.name
                    }
                },
            })
            :
            createMeetingType({
                variables: {
                    data: {
                        ...data
                    },
                },
            });

    };

    useEffect(() => {
        setValue("name", currentMeetingType?.name)
    }, [currentMeetingType])
    /// fetch meeting type Api
    const [getMeetingTypeData, { data, refetch, loading: listLoading }] = useLazyQuery(PaginatedMeetingTypeDocument);
    useEffect(() => {
        getMeetingTypeData({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])
    /// delete meeting api 
    const [deleteMeetingType, deleteMeetingTypeState] = useMutation(DeleteMetingTypeDocument, {
        onCompleted: (data) => {
            reset();
            refetch();
            Alert.alert("success", "Meeting deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    const filteredData = data?.paginatedMeetingType?.data?.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <CustomHeader
            title="Meeting Type"
            leftComponent={(<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ padding: 10 }} />)}
            rightComponent={
                <FontAwesome5
                    name="trash" size={20} color="#EF4444"
                    // onPress={() => router.push("/(meeting)/trashed-followUp")}
                    style={{ padding: ms(10) }} />
            }
        >
            <ThemedView style={styles.contentContainer}>
                <View style={styles.searchContainer}>
                    <View style={{ width: "100%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search Type"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <View style={[
                                styles.meetingTypeContainer,
                                {
                                    borderColor: Colors[theme].border,
                                    shadowColor: Colors[theme].shadow,
                                    backgroundColor: Colors[theme].cart
                                },
                            ]}>
                                <ThemedText type="subtitle" style={{ flex: 1 }} >{item.name}</ThemedText>
                                <View style={styles.meetingTypeInfo}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setAddEditModalVisible(true)
                                            setAddEditManage(true)
                                            setCurrentMeetingType({
                                                name: item?.name,
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
                                                            deleteMeetingType({
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
                    )}
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
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
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors[theme].cart,
                            height: vs(250),
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
                            <ThemedText type="subtitle">{addEditManage ? "Update Meeting Type" : "Create Meeting Type"}</ThemedText>
                            <Pressable onPress={() => {
                                setAddEditModalVisible(false)
                                setCurrentMeetingType(defaultValue)
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
                                inputStyle={[{ lineHeight: ms(20) }]}
                                label={`Name`}
                                rules={{
                                    required: "Enter Name",
                                }}
                                autoCapitalize="none"
                            />
                            <CustomButton
                                title="Submit"
                                isLoading={createMeetingTypeState?.loading || updateMeetingTypeState?.loading}
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
                title="Meeting Type"
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
        alignItems: "center",
        marginBottom: "10@ms",
        marginHorizontal: "10@ms"
    },
    scrollContainer: {
        margin: "5@ms",
    },
    meetingTypeContainer: {
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
    meetingTypeInfo: {
        gap: 15,
        flexDirection: 'row',
        marginTop: 10
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: 5,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    gradient: {
        borderRadius: '5@ms',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardHeading: {
        fontSize: "20@ms",
        fontWeight: "normal"
    },
})
export default MeetingType;