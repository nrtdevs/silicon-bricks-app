import CustomHeader from "@/components/CustomHeader";
import CustomSearchBar from "@/components/CustomSearchBar";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { HardDeleteMeetingTypeDocument, ListTrashedMeetingTypeDocument, RestoreMeetingTypeDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const TrashedMeetingType = () => {
    const { theme } = useTheme();
    ///Trashed Meeting Type API 
    const [getTrashedMeetingType, { data, refetch, loading: listLoading }] = useLazyQuery(ListTrashedMeetingTypeDocument);
    useEffect(() => {
        getTrashedMeetingType({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])
    /// Restore Trashed Meeting Type API 
    const [restoreTrashedMeetingType, restoreTrashedMeetingTypeState] = useMutation(RestoreMeetingTypeDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Meeting Type restore successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    /// Delete Trashed Meeting Type API 
    const [deleteTrashedMeetingType, deleteTrashedMeetingTypeState] = useMutation(HardDeleteMeetingTypeDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Meeting Type delete successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    return (
        <CustomHeader
            title="Meeting Type"
            leftComponent={(<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ padding: 10 }} />)}
        >
            <ThemedView style={styles.contentContainer}>
                <FlatList
                    data={data?.listTrashedMeetingType.data}
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
                                            Alert.alert(
                                                "Restore",
                                                `${item.name} will be restored`,
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            restoreTrashedMeetingType({
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
                                            backgroundColor: "#8B5CF6",
                                            opacity: 0.8
                                        }}
                                    >
                                        <MaterialIcons name="autorenew" size={18} color='#fff' />
                                        <ThemedText style={{ color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' }}>Restore</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                "Delete",
                                                "Are you sure you want to delete?",
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            deleteTrashedMeetingType({
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
        </CustomHeader>
    );
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
export default TrashedMeetingType;