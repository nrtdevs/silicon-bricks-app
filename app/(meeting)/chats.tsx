import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { FAB } from "@rneui/themed";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ThemedText } from "@/components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomSearchBar from "@/components/CustomSearchBar";
import { useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { PaginatedUsersDocument } from "@/graphql/generated";
import { Env } from "@/constants/ApiEndpoints";
import debounce from "lodash.debounce";
import NoDataFound from "@/components/NoDataFound";

const ChatScreen = () => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [search, setSearch] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [usersList, setUsersList] = useState();
    const [hasMore, setHasMore] = useState<boolean>(true);
    /// Get Users List 
    const [getUsersData, { data, refetch, loading }] = useLazyQuery<any>(PaginatedUsersDocument);

    const fetchMeeting = async (isRefreshing = false, searchParams = "") => {
        if (loading && !isRefreshing) return;
        const currentPage = isRefreshing ? 1 : page;
        if (isRefreshing) {
            setRefreshing(true);
            setPage(1);
        }
        const params = {
            limit: Env?.LIMIT as number,
            page: currentPage,
            search: searchParams,
        };

        try {
            const res: any = await getUsersData({
                variables: {
                    listInputDto: params,
                },
                fetchPolicy: "network-only",
            });

            if (res?.data?.PaginatedUsersDocument) {
                const data: any = res?.data?.PaginatedUsersDocument;
                const newItems = data?.data || [];
                setUsersList((prev: any) => {
                    return isRefreshing || currentPage == 1
                        ? newItems
                        : [...prev, ...newItems];
                });
                const lastPage = Math.ceil(data?.meta?.totalItems / Env?.LIMIT);
                if (!isRefreshing && currentPage < lastPage) {
                    setPage(currentPage + 1);
                }
                if (isRefreshing) setRefreshing(false);
                setHasMore(currentPage < lastPage);
                setRefreshing(false);
            } else {
                console.log("API call failed or returned no data:", res?.errors);
                setRefreshing(false);
                setHasMore(false);
            }
        } catch (error) {
            console.error("Fetch failed:", error);
            setRefreshing(false);
            setHasMore(false);
        }
    };
    const debouncedSearch = useCallback(
        debounce((text) => {
            fetchMeeting(true, text);
        }, 500),
        [searchQuery]
    );
    useFocusEffect(
        useCallback(() => {
            getUsersData();
            setSearch(false);
        }, [])
    );

    return (
        <CustomHeader
            title="Chat"
            leftComponent={(<MaterialCommunityIcons
                name="arrow-left"
                size={ms(20)}
                color={Colors[theme]?.text}
                onPress={() => router.back()}
                style={{ padding: ms(10) }} />
            )}>
            <ThemedView style={style.contentContainer}>
                <View style={style.searchContainer}>
                    <View style={{ width: "100%" }}>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            placeholder="Search User"
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                debouncedSearch(text);
                            }}
                        />
                    </View>
                </View>
                <FlatList
                    data={usersList}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {}}>
                            <View style={[style.cardStyle, {
                                borderColor: Colors[theme].border,
                                shadowColor: Colors[theme].shadow,
                                backgroundColor: Colors[theme].cart
                            }]}>
                                <View style={[style.prifileImage, {
                                    backgroundColor: Colors[theme]?.border
                                }
                                ]}>
                                    <ThemedText
                                        style={{ fontSize: ms(20), color: Colors[theme]?.text }}>
                                        {item.firstName.charAt(0).toUpperCase()}{item.lastName.charAt(0).toUpperCase()}
                                    </ThemedText>
                                </View>
                                <View style={{ marginLeft: ms(10) }}>
                                    <ThemedText
                                        style={{ fontSize: ms(16), color: Colors[theme]?.text, fontWeight: '600' }}>
                                        {item.firstName} {item.lastName}
                                    </ThemedText>
                                    <ThemedText
                                        style={{ fontSize: ms(14), color: Colors[theme]?.textSecondary }}>
                                        {item.email}
                                    </ThemedText>
                                </View>
                            </View>
                        </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing && !loading}
                    onRefresh={() => {
                        fetchMeeting(true);
                    }}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    ListEmptyComponent={!loading ? <NoDataFound /> : null}
                    ListFooterComponent={
                        hasMore ? (
                            <ActivityIndicator size="small" color={Colors.primary} />
                        ) : null
                    }
                    onEndReached={() => {
                        if (hasMore && !loading) {
                            fetchMeeting();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                />
            </ThemedView>
        </CustomHeader>
    );
};
export default ChatScreen;
const style = ScaledSheet.create({
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
    cardStyle: {
        marginHorizontal: ms(10),
        borderRadius: ms(10),
        flexDirection: 'row', alignItems: 'center',
        padding: ms(15), borderBottomWidth: 1,
    },
    prifileImage: {
        width: ms(50), height: ms(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ms(50)
    },
});