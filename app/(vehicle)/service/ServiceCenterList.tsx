import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import VehicleCard from "@/components/vehicle/VehicleCart";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedServiceCentersDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

const ServiceCenter = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [allVehicles, setAllVehicles] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [getVehicleListApi, { data, loading }] = useLazyQuery(PaginatedServiceCentersDocument);

    useEffect(() => {
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
    }, [currentPage, hasMore]);

    useEffect(() => {
        if (data?.paginatedServiceCenters?.data) {
            setAllVehicles(prevVehicles => [...prevVehicles, ...data.paginatedServiceCenters.data]);
            if (data.paginatedServiceCenters.data.length < limit) {
                setHasMore(false);
            }
        }
    }, [data]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        setAllVehicles([]);
        setHasMore(true);
        getVehicleListApi({
            variables: { listInputDto: { limit, page: 1 } },
        }).finally(() => setRefreshing(false));
    };

    const renderItems = (item: any) => {
        return (
            <VehicleCard
                brand={item?.name}
                model=""
                chassisNumber=""
                number=""
                createdAt=""
                status="active"
                onEdit={() =>
                    router.navigate({
                        pathname: "/add-edit-vehicle",
                        params: { data: JSON.stringify(item) },
                    })
                }
                onDelete={() => { }}
                onChangeStatus={() => { }}
                // onDelete={() =>
                //     deleteVehicleApi({
                //         variables: {
                //             deleteVehicleId: Number(item?.id),
                //         },
                //     })
                // }
                // onChangeStatus={() => {
                //     let find = statusArr?.find((i: any) => i.value === item?.status);
                //     setValue("status", find);
                //     setSelectedVehicle(item);
                //     setIsModalVisible(true);
                // }}
                onView={() =>
                    router.navigate({
                        pathname: "/vehicle-details",
                        params: { data: JSON.stringify(item) },
                    })
                }
            />
        );
    };

    return (
        <CustomHeader
            title="Service Center "
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

                <FlatList
                    data={allVehicles}
                    keyExtractor={(item) => item?.id?.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    renderItem={({ item }: any) => renderItems(item)}
                    ListFooterComponent={() =>
                        loading ? <ActivityIndicator size="large" color={Colors[theme].text} /> : null
                    }
                />
                <FAB
                    size="large"
                    title="Add Service"
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
                    onPress={() => router.navigate("/(vehicle)/service/AddService")}
                />
            </ThemedView>
        </CustomHeader>
    );
}
export default ServiceCenter;

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(10),
    },
});
