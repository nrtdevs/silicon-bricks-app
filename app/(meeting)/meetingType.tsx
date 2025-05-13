import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader"
import CustomSearchBar from "@/components/CustomSearchBar";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { labels } from "@/constants/Labels";
import { useTheme } from "@/context/ThemeContext";
import { CreateMeetingTypeDocument, DeleteMetingTypeDocument, PaginatedMeetingTypeDocument, UpdateMeetingTypeDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Modal, Pressable, View, } from "react-native";
import { ms, s, ScaledSheet, vs } from "react-native-size-matters";
import { LinearGradient } from 'expo-linear-gradient';

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
    const [createMeetingType, createOrganizationState] = useMutation(CreateMeetingTypeDocument, {
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
                            setAddEditModalVisible(true)
                            setAddEditManage(false)
                        }}>
                        <Feather name="plus-square" size={24} color={Colors[theme].text} />
                    </Pressable>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <View style={styles.scrollContainer}>
                            <LinearGradient
                                colors={[Colors.gradient2, Colors.gradient1]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.gradient,]}
                            >
                                <View style={[
                                    styles.meetingContainer,
                                ]}>
                                    <View style={styles.meetingHeader}>
                                        <View style={{ borderRadius: "100%", backgroundColor: Colors[theme].cartBg, width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
                                            <ThemedText style={styles.cardHeading}>{item.name.charAt(0).toUpperCase()}</ThemedText>
                                        </View>
                                        <ThemedText type="subtitle" style={{ flex: 1,}} >  {item.name}</ThemedText>
                                        <View style={styles.organizationInfo}>
                                            <Feather
                                                name="edit"
                                                size={ms(20)}
                                                color={Colors[theme].text}
                                                onPress={() => {
                                                    setAddEditModalVisible(true)
                                                    setAddEditManage(true)
                                                    setCurrentMeetingType({
                                                        name: item?.name,
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
                                            />
                                        </View>
                                    </View>
                                    
                                </View>
                            </LinearGradient>
                        </View>
                    )}
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
                />
            </ThemedView>
            {/* add and edit modal */}
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
                            backgroundColor: Colors[theme].cartBg,
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
        margin: "5@ms",
    },
    meetingContainer: {
        width: "100%",
        padding: "12@ms",
        borderRadius: "8@ms",
        gap: "10@ms",
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