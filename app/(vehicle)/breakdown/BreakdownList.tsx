import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import ServiceCard from "@/components/vehicle/ServiceCard";
import VehicleBreakdownCart from "@/components/VehicleBreakdownCart";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedBreakdownsDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

const BreakdownList = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [allVehicles, setAllVehicles] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [getVehicleListApi, { data, loading, error }] = useLazyQuery(PaginatedBreakdownsDocument);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setCurrentPage(1);
        setHasMore(true);

        // Clear existing data immediately for better UX
        setAllVehicles([]);

        getVehicleListApi({
            variables: { listInputDto: { limit, page: 1 } },
            fetchPolicy: 'network-only' // Ensure we get fresh data
        }).finally(() => setRefreshing(false));
    }, [limit]);

    useFocusEffect(
        useCallback(() => {
            handleRefresh();
        }, [handleRefresh])
    );

    // Fetch data function
    const fetchData = useCallback(() => {
        if (hasMore) {
            getVehicleListApi({
                variables: {
                    listInputDto: {
                        limit: limit,
                        page: currentPage
                    }
                }
            });
        }
    }, [currentPage, hasMore, limit]);

    useFocusEffect(() => {
        fetchData();
    });

    useEffect(() => {
        if (data?.paginatedBreakdowns?.data) {
            // If we're on page 1, replace the data
            if (currentPage === 1) {
                setAllVehicles(data.paginatedBreakdowns.data);
            } else {
                // Otherwise append to existing data
                setAllVehicles(prevVehicles => [...prevVehicles, ...data.paginatedBreakdowns.data]);
            }

            // Check if we have more data to load
            if (data.paginatedBreakdowns.data.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        }
    }, [data]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const renderItems = (item: any) => {
        return (
            <VehicleBreakdownCart
                title={item?.vehicle?.model}
                subtitle={item?.breakdownType}
                breakDownDate={item?.breakdownDate}
                createdAt={item?.createdAt}
                status={item?.status}
                onEdit={() =>
                    router.navigate({
                        pathname: "/add-edit-vehicle",
                        params: { data: JSON.stringify(item) },
                    })
                }
                onDelete={() => { }}
                onChangeStatus={() => {
                   
                }}
                onView={() =>
                    router.navigate({
                        pathname: "/vehicle-details",

                        params: { data: JSON.stringify(item) },
                    })
                }
            />
        );
    };

    // Render empty state if no data
    const renderEmptyComponent = () => {
        if (loading && allVehicles.length === 0) {
            return <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />;
        }

        if (!loading && allVehicles.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: Colors[theme].text }]}>
                        {error ? "Error loading service centers" : "No service centers found"}
                    </Text>
                    {error && (
                        <Pressable onPress={handleRefresh} style={styles.retryButton}>
                            <Text style={styles.retryText}>Try Again</Text>
                        </Pressable>
                    )}
                </View>
            );
        }
        return null;
    };

    return (
        <CustomHeader
            title="Break Down"
            leftComponent={
                <Pressable
                    style={styles.menuButton}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Entypo name="menu" size={ms(28)} color={Colors[theme].text} />
                </Pressable>
            }
        >
            <ThemedView style={{ flex: 1 }}>
                {error && !loading && (
                    <View style={styles.errorBanner}>
                        <Text style={styles.errorText}>Error loading data</Text>
                    </View>
                )}

                <FlatList
                    data={allVehicles}
                    keyExtractor={(item) => item?.id?.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    renderItem={({ item }: any) => renderItems(item)}
                    ListEmptyComponent={renderEmptyComponent}
                    ListFooterComponent={() =>
                        loading && allVehicles.length > 0 ? (
                            <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />
                        ) : null
                    }
                />
                <FAB
                    size="large"
                    title="Add Breakdown"
                    style={{
                        position: "absolute",
                        margin: 16,
                        right: 0,
                        bottom: 0,
                    }}
                    icon={{
                        name: "add",
                        color: "white",
                    }}
                    onPress={() => router.navigate("/(vehicle)/breakdown/AddBreakdown")}
                />
            </ThemedView>
        </CustomHeader>
    );
}
export default BreakdownList;

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(10),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: ms(20),
    },
    emptyText: {
        fontSize: ms(16),
        textAlign: 'center',
        marginBottom: ms(10),
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: ms(15),
        paddingVertical: ms(8),
        borderRadius: ms(5),
    },
    retryText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loader: {
        marginVertical: ms(20),
    },
    errorBanner: {
        backgroundColor: '#FF3B30',
        padding: ms(10),
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
    },
});
