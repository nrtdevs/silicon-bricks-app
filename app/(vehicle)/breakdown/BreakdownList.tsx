import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import BreakDownCard from "@/components/vehicle/BreakDownCard";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedBreakdownsDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Entypo, MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { router, useNavigation } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import { ms } from "react-native-size-matters";

const { width, height } = Dimensions.get('window');

const BreakdownList = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [allVehicles, setAllVehicles] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const [getVehicleListApi, { data, loading, error }] = useLazyQuery(PaginatedBreakdownsDocument);

    const handleRefresh = () => {
        setRefreshing(true);
        setHasMore(true);
        setAllVehicles([]);
        getVehicleListApi({
            variables: { listInputDto: { limit, page: 1 } },
            fetchPolicy: 'network-only' 
        }).finally(() => setRefreshing(false));
    }

    useEffect(() => {
        if (currentPage && hasMore && !loading) {
            getVehicleListApi({
                variables: {
                    listInputDto: {
                        limit: limit,
                        page: currentPage
                    }
                }
            });
        }
    }, [currentPage, hasMore, limit, loading, getVehicleListApi]);

    useEffect(() => {
        if (data?.paginatedBreakdowns?.data) {
            if (currentPage == 1) {
                setAllVehicles(data.paginatedBreakdowns.data);
            } else {
                setAllVehicles(prevVehicles => [...prevVehicles, ...data.paginatedBreakdowns.data]);
            }

            if (data.paginatedBreakdowns.data.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        }
    }, [data]);

    useEffect(() => {
        if (isModalVisible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 100,
                    friction: 8,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 100,
                    friction: 8,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isModalVisible]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const openModal = (item: any, event: any) => {
        const { pageX, pageY } = event.nativeEvent;
        setSelectedItem(item);

        let modalX = pageX - 100;
        let modalY = pageY - 10;

        // Ensure modal doesn't go off screen
        if (modalX < 10) modalX = 10;
        if (modalX > width - 220) modalX = width - 220;
        if (modalY > height - 300) modalY = pageY - 250;

        setModalPosition({ x: modalX, y: modalY });
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    const handleMenuAction = (action: string) => {
        closeModal();

        switch (action) {
            case 'edit':
                router.navigate({
                    pathname: "/(vehicle)/breakdown/AddBreakdown",
                    params: { data: JSON.stringify(selectedItem?.id) },
                });
                break;
            case 'view':
                router.navigate({
                    pathname: "/vehicle-details",
                    params: { data: JSON.stringify(selectedItem) },
                });
                break;
            case 'duplicate':
                // Handle duplicate action
                console.log('Duplicate item:', selectedItem);
                break;
            case 'share':
                // Handle share action
                console.log('Share item:', selectedItem);
                break;
            case 'delete':
                // Handle delete action
                console.log('Delete item:', selectedItem);
                break;
        }
    };

    const renderItems = (item: any) => {
        return (
            <BreakDownCard
                item={item}
                onEdit={() =>
                    router.navigate({
                        pathname: "/(vehicle)/breakdown/AddBreakdown",
                        params: { data: JSON.stringify(item?.id) },
                    })
                }
                onDelete={() => { }}
                onChangeStatus={() => { }}
                onView={() =>
                    router.navigate({
                        pathname: "/vehicle-details",
                        params: { data: JSON.stringify(item) },
                    })
                }
                dots={
                    <Pressable
                        onPress={(event) => openModal(item, event)}
                        style={styles.dotsButton}
                    >
                        <Entypo name="dots-three-vertical" size={ms(18)} color={Colors[theme].text} />
                    </Pressable>
                }
            />
        );
    };

    const menuItems = [
        {
            label: 'View Details',
            value: 'view',
            icon: <Ionicons name="eye-outline" size={ms(20)} color={Colors[theme].text} />
        },
        {
            label: 'Edit Breakdown',
            value: 'edit',
            icon: <MaterialIcons name="edit" size={ms(20)} color={Colors[theme].text} />
        },
        {
            label: 'Duplicate',
            value: 'duplicate',
            icon: <Ionicons name="copy-outline" size={ms(20)} color={Colors[theme].text} />
        },
        {
            label: 'Share',
            value: 'share',
            icon: <Ionicons name="share-outline" size={ms(20)} color={Colors[theme].text} />
        },
        {
            label: 'Delete',
            value: 'delete',
            icon: <MaterialIcons name="delete-outline" size={ms(20)} color="#FF3B30" />
        },
    ];

    const renderEmptyComponent = () => {
        if (loading && allVehicles.length === 0) {
            return <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />;
        }

        if (!loading && allVehicles.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="car-outline"
                        size={ms(80)}
                        color={Colors[theme].text}
                        style={styles.emptyIcon}
                    />
                    <Text style={[styles.emptyText, { color: Colors[theme].text }]}>
                        {error ? "Error loading breakdowns" : "No breakdowns found"}
                    </Text>
                    <Text style={[styles.emptySubText, { color: Colors[theme].text }]}>
                        {error ? "Please check your connection and try again" : "Tap the + button to add your first breakdown"}
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
                        <MaterialIcons name="error-outline" size={ms(20)} color="white" />
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
                    showsVerticalScrollIndicator={false}
                />

                <FAB
                    size="large"
                    title="Add Breakdown"
                    style={[styles.fab, { backgroundColor: Colors[theme].primary.main }]}
                    titleStyle={styles.fabTitle}
                    icon={{
                        name: "add",
                        color: "white",
                        size: ms(24),
                    }}
                    onPress={() => router.navigate("/(vehicle)/breakdown/AddBreakdown")}
                />

                {/* Enhanced Modal */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <Pressable style={styles.modalOverlay} onPress={closeModal}>
                        <Animated.View
                            style={[
                                styles.modalContent,
                                {
                                    backgroundColor: Colors[theme].background,
                                    borderColor: Colors[theme].border || 'rgba(0,0,0,0.1)',
                                    position: 'absolute',
                                    left: modalPosition.x,
                                    top: modalPosition.y,
                                    transform: [{ scale: scaleAnim }],
                                    opacity: opacityAnim,
                                }
                            ]}
                        >
                            {/* Modal Arrow */}
                            <View style={[styles.modalArrow, { borderBottomColor: Colors[theme].background }]} />

                            {menuItems.map((item, index) => (
                                <Pressable
                                    key={index}
                                    style={[
                                        styles.dropdownItem,
                                        index < menuItems.length - 1 && styles.dropdownItemBorder,
                                        { borderBottomColor: Colors[theme].border || 'rgba(0,0,0,0.1)' }
                                    ]}
                                    onPress={() => handleMenuAction(item.value)}
                                >
                                    <View style={styles.menuItemContent}>
                                        {item.icon}
                                        <Text style={[
                                            styles.dropdownItemText,
                                            {
                                                color: item.value === 'delete' ? '#FF3B30' : Colors[theme].text,
                                                marginLeft: ms(12)
                                            }
                                        ]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                </Pressable>
                            ))}
                        </Animated.View>
                    </Pressable>
                </Modal>
            </ThemedView>
        </CustomHeader>
    );
}

export default BreakdownList;

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(10),
    },
    dotsButton: {
        padding: ms(8),
        borderRadius: ms(20),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: ms(40),
    },
    emptyIcon: {
        opacity: 0.5,
        marginBottom: ms(20),
    },
    emptyText: {
        fontSize: ms(18),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: ms(8),
    },
    emptySubText: {
        fontSize: ms(14),
        textAlign: 'center',
        opacity: 0.7,
        marginBottom: ms(20),
        lineHeight: ms(20),
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: ms(20),
        paddingVertical: ms(10),
        borderRadius: ms(8),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    retryText: {
        color: 'white',
        fontWeight: '600',
        fontSize: ms(14),
    },
    loader: {
        marginVertical: ms(20),
    },
    errorBanner: {
        backgroundColor: '#FF3B30',
        padding: ms(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
        marginLeft: ms(8),
        fontWeight: '500',
    },
    fab: {
        position: "absolute",
        margin: ms(16),
        right: 0,
        bottom: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabTitle: {
        fontSize: ms(14),
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        minWidth: ms(200),
        maxWidth: ms(250),
        borderRadius: ms(12),
        paddingVertical: ms(8),
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        borderWidth: 1,
    },
    modalArrow: {
        position: 'absolute',
        top: ms(-8),
        right: ms(40),
        width: 0,
        height: 0,
        borderLeftWidth: ms(8),
        borderRightWidth: ms(8),
        borderBottomWidth: ms(8),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    dropdownItem: {
        paddingHorizontal: ms(16),
        paddingVertical: ms(14),
    },
    dropdownItemBorder: {
        borderBottomWidth: 0.5,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownItemText: {
        fontSize: ms(15),
        fontWeight: '500',
        flex: 1,
    },
});