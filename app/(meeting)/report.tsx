import CustomHeader from "@/components/CustomHeader";
import NoDataFound from "@/components/NoDataFound";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedActivityLogMeetingDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";

const ReportScreen = () => {
    const { theme } = useTheme();
    // fetch report api 
    const [getMeeting, { data, refetch, loading: listLoading }] = useLazyQuery(PaginatedActivityLogMeetingDocument);
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
    return (
        <CustomHeader>
            <ThemedView style={styles.contentContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={ms(20)}
                        color={Colors[theme]?.text}
                        onPress={() => router.back()}
                        style={{ left: 10 }} />
                    <ThemedText style={{ fontSize: 20, fontWeight: "600", right: 10 }}>Report </ThemedText>
                    <ThemedText></ThemedText>
                </View>
                <FlatList
                    data={data?.paginatedActivityLogMeeting.data}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.reportContainer,
                            {
                                borderColor: Colors[theme].border,
                                shadowColor: Colors[theme].shadow,
                                backgroundColor: Colors[theme].cart
                            },
                        ]}>
                            <ThemedText type='default'>{item.activity}</ThemedText>
                            <ThemedText type='defaultSemiBold'>{item.module}</ThemedText>
                            <ThemedText type='defaultSemiBold'>{item.description}</ThemedText>
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
    reportContainer: {
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
export default ReportScreen;