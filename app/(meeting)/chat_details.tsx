import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomValidation from "@/components/CustomValidation";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { CreateChatDocument, GetChatsDocument } from "@/graphql/generated";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { ms, ScaledSheet, vs } from "react-native-size-matters";

const ChatDetails = () => {
    const { theme } = useTheme();
    /// fetch Chat Details api 
    const [getChats, { data, refetch, loading: listLoading }] = useLazyQuery(GetChatsDocument);
    useEffect(() => {
        getChats({
            variables: {
                "otherUserId": 2
            },
        });
    }, [])


    /// Create Chat
    const [createChats, createChatsState] = useMutation(CreateChatDocument, {
        onCompleted: (data) => {
            reset()
            refetch();
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        }
    });
    const { control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<{ name: string }>({
        defaultValues: {},
    });

    const onSubmit = (data: any) => {
        let param = {
            "content": data?.massege,
            "receiverId": 2
        }
        console.log("param", param);
        return;
        createChats({
            variables: {
                input: {
                    ...param
                },
            },
        });
    };

    return (
        <CustomHeader
            title="Chat Details"
            leftComponent={(<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ padding: ms(10) }} />
            )}>
            <ThemedView style={styles.contentContainer}>
                <FlatList
                    data={data?.getChats.slice().reverse() || []}
                    renderItem={({ item }) => (
                        item.id == "1" ?
                            <View style={[styles.userView, { backgroundColor: Colors[theme].border }]}>
                                <ThemedText style={styles.userText}>
                                    {item.content}
                                </ThemedText>
                            </View> :
                            <View style={styles.botView}>
                                <ThemedText style={styles.botText}>
                                    {item.content}
                                </ThemedText>
                            </View>
                    )}
                    ListEmptyComponent={!listLoading ? <NoDataFound /> : null}
                />
            </ThemedView>
            <View style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "flex-end",
            }}>
                <CustomValidation
                    control={control}
                    type="input"
                    name="massege" />
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                >
                    <View style={{
                        backgroundColor: "#818CF8",
                        padding: 10,
                        borderRadius: 8,
                        height: 50,
                        marginLeft: 10,
                    }}
                    >
                        <ThemedText
                            style={{
                                color: 'white',
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            Send</ThemedText>
                    </View>
                </TouchableOpacity>
            </View>
        </CustomHeader>
    );
}
const styles = ScaledSheet.create({
    contentContainer: {
        flex: 1,
        padding: "12@ms",
    },
    userView: {
        padding: '8@ms',
        borderRadius: '8@ms',
        marginBottom: '10@ms',
        alignSelf: 'flex-start',
    },
    userText: {
        color: 'black',
        fontSize: '16@ms',
        fontWeight: '500',
    },
    botView: {
        padding: '8@ms',
        borderRadius: '8@ms',
        marginBottom: '10@ms',
        backgroundColor: "#818CF8",
        alignSelf: 'flex-end',
    },
    botText: {
        color: 'white',
        fontSize: '16@ms',
        fontWeight: '500',
    },
    sendView: {
        flexDirection: 'row',
        width: "80%",
    }
});
export default ChatDetails;