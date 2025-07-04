import CustomHeader from "@/components/CustomHeader";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { DeleteFollowUpDocument, HardDeleteFollowUpDocument, ListTrashedFollowUpDocument, RestoreFollowUpDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, Pressable, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const FollowUpTrashed = () => {
    const { theme } = useTheme();
    const [getMeeting, { data, refetch, loading: listLoading }] = useLazyQuery(ListTrashedFollowUpDocument);
    useEffect(() => {
        getMeeting({
            variables: {
                listInputDto: {
                    page: 1,
                    limit: 10,
                },
            },
        });
    }, [])
    /// delete follow up api 
    const [deleteFollowUp, deleteFollowupState] = useMutation(HardDeleteFollowUpDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Milesotone deleted successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    /// restore follow up api 
    const [restoreFollowup, restoreMeetingState] = useMutation(RestoreFollowUpDocument, {
        onCompleted: (data) => {
            refetch();
            Alert.alert("success", "Follow up restore successfully!")
        },
        onError: (error) => {
            Alert.alert("error", error.message)
        }
    });
    return (
        <CustomHeader
            title="Foloow Up"
            leftComponent={(
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ms(20)}
                    color={Colors[theme]?.text}
                    onPress={() => router.back()}
                    style={{padding : 10}} />
            )}>
            <ThemedView style={styles.contentContainer}>
                <FlatList
                    data={data?.listTrashedFollowUp.data}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => { }}>
                            <View style={[
                                styles.followContainer,
                                {
                                    borderColor: Colors[theme].border,
                                    shadowColor: Colors[theme].shadow,
                                    backgroundColor: Colors[theme].cart
                                },
                            ]}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                                    <ThemedText type='subtitle'>{item?.subject}</ThemedText>
                                </View>
                                <ThemedText type="default">{item?.body}</ThemedText>
                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                "Restore",
                                                `Follow up will be restored`,
                                                [
                                                    {
                                                        text: "Yes", onPress: () => {
                                                            restoreFollowup({
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
                                                            deleteFollowUp({
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
                        </Pressable>
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
        padding: "12@ms"
    },
    followContainer: {
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
});
export default FollowUpTrashed;