import CustomHeader from "@/components/CustomHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { HardDeleteMeetingTaskDocument, ListTrashedMeetingTaskDocument, RestoreMeetingTaskDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const TrashedTask = () => {
    const { theme } = useTheme();
    ///Meeting Tasks API 
    const [getMeetingTasks, { data, refetch, loading: listLoading }] = useLazyQuery(ListTrashedMeetingTaskDocument);
    useEffect(() => {
        getMeetingTasks({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])
    /// Restore Milestone API 
    const [restoreMeetingTask, restoreMeetingState] = useMutation(RestoreMeetingTaskDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Meeting restore successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
            }
    });
    /// Delete Meeting Task API 
    const [deleteMeetingTask, deleteMeetingTaskState] = useMutation(HardDeleteMeetingTaskDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Meeting Task delete successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    return (
        <CustomHeader
            title="Trashed Tasks"
            leftComponent={(
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ms(20)}
                    color={Colors[theme]?.text}
                    onPress={() => router.back()}
                    style={{ padding: 10 }} />
            )}
        >
            <ThemedView>
                <FlatList
                    data={data?.listTrashedMeetingTask.data}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.milestoneContainer,
                            {
                                borderColor: Colors[theme].border,
                                shadowColor: Colors[theme].shadow,
                                backgroundColor: Colors[theme].cart
                            },
                        ]}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                                <ThemedText type='subtitle'>{item?.task}</ThemedText>
                                <View
                                    style={{
                                        paddingHorizontal: ms(10),
                                        padding: vs(2),
                                        borderRadius: ms(14),
                                    }}
                                >
                                    <ThemedText style={{ fontSize: ms(10), color: Colors.white, fontWeight: 'bold' }} type='default'>asaas</ThemedText>
                                </View>
                            </View>
                            <ThemedText type="default">{item.comment}</ThemedText>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Restore",
                                            `${item.task} will be restored`,
                                            [
                                                {
                                                    text: "Yes", onPress: () => {
                                                        restoreMeetingTask({
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
                                                        deleteMeetingTask({
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
                    )}
                />

            </ThemedView>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        padding: "12@ms"
    },
    milestoneContainer: {
        borderRadius: "20@ms",
        marginHorizontal: "10@ms",
        marginVertical: "8@ms",
        padding: "16@ms",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        justifyContent: 'space-between',
        gap: 10,
    },
    label: {
        fontSize: "16@ms",
        fontWeight: "normal",
        marginBottom: "5@ms",
        textAlign: "left",
        alignSelf: "flex-start",
    },
});
export default TrashedTask;