import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedVehicleNotificationDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { ms } from "react-native-size-matters";

const { width } = Dimensions.get('window');

const NotificationList = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [allNotifications, setAllNotifications] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedNotification, setSelectedNotification] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredNotifications, setFilteredNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const [getNotificationsApi, { data, loading, error }] = useLazyQuery(PaginatedVehicleNotificationDocument);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setCurrentPage(1);
        setHasMore(true);
        setAllNotifications([]);

        getNotificationsApi({
            variables: { listInputDto: { limit, page: 1 } },
            fetchPolicy: 'network-only'
        }).finally(() => setRefreshing(false));
    }, [limit]);

    useFocusEffect(
        useCallback(() => {
            handleRefresh();
        }, [handleRefresh])
    );

    const fetchData = useCallback(() => {
        if (hasMore) {
            getNotificationsApi({
                variables: {
                    listInputDto: {
                        limit: limit,
                        page: currentPage
                    }
                }
            });
        }
    }, [currentPage, hasMore, limit]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data?.paginatedVehicleNotification?.data) {
            const newData = data.paginatedVehicleNotification.data;
            
            if (currentPage === 1) {
                setAllNotifications(newData);
            } else {
                setAllNotifications(prevNotifications => [...prevNotifications, ...newData]);
            }

            // Update unread count
            const unreadNotifications = newData.filter(notification => !notification.isRead);
            if (currentPage === 1) {
                setUnreadCount(unreadNotifications.length);
            }

            if (newData.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        }
    }, [data]);

    // Filter notifications based on search and filter
    useEffect(() => {
        let filtered = allNotifications;

        // Filter by read status
        if (selectedFilter === 'unread') {
            filtered = filtered.filter(notification => !notification.isRead);
        } else if (selectedFilter === 'read') {
            filtered = filtered.filter(notification => notification.isRead);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(notification =>
                notification.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notification.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notification.module?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredNotifications(filtered);
    }, [allNotifications, searchQuery, selectedFilter]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const getModuleColor = (module: string) => {
        switch (module.toLowerCase()) {
            case 'service_center': return '#3B82F6';
            case 'vehicle': return '#10B981';
            case 'user': return '#F59E0B';
            case 'booking': return '#8B5CF6';
            case 'payment': return '#EF4444';
            default: return Colors[theme].text;
        }
    };

    const getModuleIcon = (module: string) => {
        switch (module.toLowerCase()) {
            case 'service_center': return 'business';
            case 'vehicle': return 'car';
            case 'user': return 'person';
            case 'booking': return 'calendar';
            case 'payment': return 'card';
            default: return 'notifications';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const openNotificationDetail = (notification: any) => {
        setSelectedNotification(notification);
        setModalVisible(true);
        
        // Mark as read if unread
        if (!notification.isRead) {
            markNotificationAsRead(notification.id);
        }
    };

    const markNotificationAsRead = async (notificationId: string) => {
        try {
            // Update local state immediately for better UX
            setAllNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, isRead: true, readAt: new Date().toISOString() }
                        : notification
                )
            );
            
            setUnreadCount(prev => Math.max(0, prev - 1));
            
            // Call API to mark as read
            // await markAsReadMutation({ variables: { id: notificationId } });
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = () => {
        Alert.alert(
            'Mark All as Read',
            'Are you sure you want to mark all notifications as read?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Yes', 
                    onPress: () => {
                        setAllNotifications(prevNotifications =>
                            prevNotifications.map(notification => ({
                                ...notification,
                                isRead: true,
                                readAt: notification.readAt || new Date().toISOString()
                            }))
                        );
                        setUnreadCount(0);
                        // Call API to mark all as read
                    }
                }
            ]
        );
    };

    const renderFilterButtons = () => {
        const filters = [
            { key: 'all', label: 'All' },
            { key: 'unread', label: `Unread (${unreadCount})` },
            { key: 'read', label: 'Read' }
        ];
        
        return (
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filters.map(filter => (
                        <TouchableOpacity
                            key={filter.key}
                            style={[
                                styles.filterButton,
                                { backgroundColor: Colors[theme].background },
                                { borderColor: Colors[theme].text + '20' },
                                selectedFilter === filter.key && styles.filterButtonActive
                            ]}
                            onPress={() => setSelectedFilter(filter.key)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    { color: Colors[theme].text },
                                    selectedFilter === filter.key && styles.filterTextActive
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                

            </View>
        );
    };

    //list
    const renderNotificationItem = ({ item }: { item: any }) => {
        const moduleColor = getModuleColor(item.module);
        const timeAgo = formatDate(item.createdAt);
        const time = formatTime(item.createdAt);
        
        return (
            <TouchableOpacity
                style={[
                    styles.notificationItem,
                    { backgroundColor: Colors[theme].background },
                    { borderColor: Colors[theme].text + '10' },
                    !item.isRead && styles.unreadNotification,
                    !item.isRead && { backgroundColor: Colors[theme].tint + '05' }
                ]}
                onPress={() => openNotificationDetail(item)}
                activeOpacity={0.7}
            >
                {!item.isRead && <View style={styles.unreadIndicator} />}
                
                <View style={styles.notificationHeader}>
                    <View style={[
                        styles.moduleIcon,
                        { backgroundColor: moduleColor + '20' }
                    ]}>
                        <Ionicons
                            name={getModuleIcon(item.module) as any}
                            size={ms(16)}
                            color={moduleColor}
                        />
                    </View>
                    
                    <View style={styles.headerContent}>
                        <Text 
                            style={[
                                styles.notificationTitle,
                                { color: Colors[theme].text },
                                !item.isRead && styles.unreadTitle
                            ]} 
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>
                        <Text style={[styles.timeStamp, { color: Colors[theme].text + '60' }]}>
                            {timeAgo} • {time}
                        </Text>
                    </View>
                    
                    <View style={styles.moduleTag}>
                        <Text style={[styles.moduleText, { color: moduleColor }]}>
                            {item.module.replace('_', ' ').toUpperCase()}
                        </Text>
                    </View>
                </View>
                
                <Text 
                    style={[
                        styles.notificationMessage,
                        { color: Colors[theme].text + '80' }
                    ]} 
                    numberOfLines={2}
                >
                    {item.message}
                </Text>
                
                <View style={styles.notificationFooter}>
                    <View style={styles.createdByInfo}>
                        <Ionicons name="person" size={ms(12)} color={Colors[theme].text + '60'} />
                        <Text style={[styles.createdByText, { color: Colors[theme].text + '60' }]}>
                            {item.createdBy?.username || 'System'}
                        </Text>
                    </View>
                    
                    {item.actionUrl && (
                        <View style={styles.actionIndicator}>
                            <Ionicons name="link" size={ms(12)} color={Colors[theme].tint} />
                            <Text style={[styles.actionText, { color: Colors[theme].tint }]}>
                                Action Available
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    //model
    const renderNotificationDetailModal = () => {
        if (!selectedNotification) return null;

        const moduleColor = getModuleColor(selectedNotification.module);
        const fullDate = new Date(selectedNotification.createdAt).toLocaleString();

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: Colors[theme].background }]}>
                        <View style={[styles.modalHeader, { borderBottomColor: Colors[theme].text + '20' }]}>
                            <Text style={[styles.modalTitle, { color: Colors[theme].text }]}>
                                Notification Details
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={ms(24)} color={Colors[theme].text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.detailHeader}>
                                <View style={[
                                    styles.detailModuleIcon,
                                    { backgroundColor: moduleColor + '20' }
                                ]}>
                                    <Ionicons
                                        name={getModuleIcon(selectedNotification.module) as any}
                                        size={ms(24)}
                                        color={moduleColor}
                                    />
                                </View>
                                <View style={styles.detailHeaderContent}>
                                    <Text style={[styles.detailTitle, { color: Colors[theme].text }]}>
                                        {selectedNotification.title}
                                    </Text>
                                    <Text style={[styles.detailModule, { color: moduleColor }]}>
                                        {selectedNotification.module.replace('_', ' ').toUpperCase()}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Message
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedNotification.message}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Created By
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedNotification.createdBy?.username || 'System'}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Date & Time
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {fullDate}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Status
                                </Text>
                                <View style={[
                                    styles.statusBadge,
                                    { backgroundColor: selectedNotification.isRead ? '#10B981' : '#F59E0B' }
                                ]}>
                                    <Text style={styles.statusText}>
                                        {selectedNotification.isRead ? 'Read' : 'Unread'}
                                    </Text>
                                </View>
                            </View>

                            {selectedNotification.readAt && (
                                <View style={styles.detailRow}>
                                    <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                        Read At
                                    </Text>
                                    <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                        {new Date(selectedNotification.readAt).toLocaleString()}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Entity ID
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedNotification.entityId}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Notification ID
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedNotification.id}
                                </Text>
                            </View>

                            {selectedNotification.actionUrl && (
                                <TouchableOpacity 
                                    style={[styles.actionButton, { backgroundColor: Colors[theme].tint }]}
                                    onPress={() => {
                                        // Handle action URL navigation
                                        console.log('Navigate to:', selectedNotification.actionUrl);
                                    }}
                                >
                                    <Ionicons name="open" size={ms(16)} color="white" />
                                    <Text style={styles.actionButtonText}>Take Action</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderEmptyComponent = () => {
        if (loading && allNotifications.length === 0) {
            return <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />;
        }

        if (!loading && allNotifications.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons name="notifications-outline" size={ms(48)} color={Colors[theme].text + '40'} />
                    <Text style={[styles.emptyTitle, { color: Colors[theme].text }]}>
                        No notifications
                    </Text>
                    <Text style={[styles.emptySubtitle, { color: Colors[theme].text + '80' }]}>
                        {error ? "Error loading notifications" : 
                         searchQuery || selectedFilter !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Notifications will appear here when you have new activity'
                        }
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
            title="Notifications"
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
                        <Text style={styles.errorText}>Error loading notifications</Text>
                    </View>
                )}

                {/* Search Bar */}
                <View style={[
                    styles.searchContainer,
                    { backgroundColor: Colors[theme].background },
                    { borderColor: Colors[theme].text + '20' }
                ]}>
                    <Ionicons name="search" size={ms(20)} color={Colors[theme].text + '60'} style={styles.searchIcon} />
                    <TextInput
                        style={[
                            styles.searchInput,
                            { color: Colors[theme].text }
                        ]}
                        placeholder="Search notifications..."
                        placeholderTextColor={Colors[theme].text + '60'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearchQuery('')}
                            style={styles.clearButton}
                        >
                            <Ionicons name="close-circle" size={ms(20)} color={Colors[theme].text + '60'} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Filters */}
                {renderFilterButtons()}

                {/* Header Info */}
                <View style={styles.headerInfo}>
                    <Text style={[styles.headerSubtitle, { color: Colors[theme].text + '80' }]}>
                        {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
                    </Text>
                    {unreadCount > 0 && (
                        <TouchableOpacity
                            onPress={markAllAsRead}
                            style={[styles.markAllButton, { backgroundColor: Colors[theme].tint }]}
                        >
                            <Text style={styles.markAllText}>Mark All Read</Text>
                        </TouchableOpacity>
                    )}
                </View>


                <FlatList
                    data={filteredNotifications}
                    keyExtractor={(item) => item?.id?.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    renderItem={renderNotificationItem}
                    ListEmptyComponent={renderEmptyComponent}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListFooterComponent={() =>
                        loading && allNotifications.length > 0 ? (
                            <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />
                        ) : null
                    }
                />

                {/* Detail Modal */}
                {renderNotificationDetailModal()}
            </ThemedView>
        </CustomHeader>
    );
};

export default NotificationList;

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(10),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: ms(16),
        marginBottom: ms(12),
        paddingHorizontal: ms(16),
        borderRadius: ms(12),
        borderWidth: 1,
        height: ms(44),
    },
    searchIcon: {
        marginRight: ms(12),
    },
    searchInput: {
        flex: 1,
        fontSize: ms(16),
    },
    clearButton: {
        padding: ms(4),
    },
    filterContainer: {
        paddingHorizontal: ms(16),
        marginBottom: ms(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterButton: {
        paddingHorizontal: ms(16),
        paddingVertical: ms(8),
        marginRight: ms(12),
        borderRadius: ms(20),
        borderWidth: 1,
    },
    filterButtonActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    filterText: {
        fontSize: ms(14),
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    markAllButton: {
        padding: 10,
        paddingVertical: ms(6),
        borderRadius: ms(12),
    },
    markAllText: {
        color: 'white',
        fontSize: ms(12),
        fontWeight: '600',
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ms(16),
        paddingBottom: ms(12),
    },
    headerSubtitle: {
        fontSize: ms(14),
    },
    listContainer: {
        paddingHorizontal: ms(16),
        paddingBottom: ms(20),
    },
    notificationItem: {
        borderRadius: ms(12),
        padding: ms(16),
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        position: 'relative',
    },
    unreadNotification: {
        borderLeftWidth: ms(3),
        borderLeftColor: '#3B82F6',
    },
    unreadIndicator: {
        position: 'absolute',
        top: ms(16),
        right: ms(16),
        width: ms(8),
        height: ms(8),
        borderRadius: ms(4),
        backgroundColor: '#3B82F6',
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: ms(8),
    },
    moduleIcon: {
        width: ms(32),
        height: ms(32),
        borderRadius: ms(16),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ms(12),
    },
    headerContent: {
        flex: 1,
        marginRight: ms(8),
    },
    notificationTitle: {
        fontSize: ms(16),
        fontWeight: '600',
        marginBottom: ms(2),
    },
    unreadTitle: {
        fontWeight: '700',
    },
    timeStamp: {
        fontSize: ms(12),
        fontWeight: '500',
    },
    moduleTag: {
        paddingHorizontal: ms(6),
        paddingVertical: ms(2),
        borderRadius: ms(4),
    },
    moduleText: {
        fontSize: ms(10),
        fontWeight: '600',
    },
    notificationMessage: {
        fontSize: ms(14),
        lineHeight: ms(20),
        marginBottom: ms(12),
        marginLeft: ms(44),
    },
    notificationFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: ms(44),
    },
    createdByInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    createdByText: {
        fontSize: ms(12),
        marginLeft: ms(4),
        fontWeight: '500',
    },
    actionIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: ms(12),
        marginLeft: ms(4),
        fontWeight: '500',
    },
    separator: {
        height: ms(12),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ms(80),
        paddingHorizontal: ms(20),
    },
    emptyTitle: {
        fontSize: ms(18),
        fontWeight: '600',
        marginTop: ms(16),
        marginBottom: ms(8),
    },
    emptySubtitle: {
        fontSize: ms(14),
        textAlign: 'center',
        paddingHorizontal: ms(40),
        marginBottom: ms(16),
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
        fontSize: ms(14),
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
        fontSize: ms(14),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: ms(20),
        borderTopRightRadius: ms(20),
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ms(20),
        paddingVertical: ms(16),
        borderBottomWidth: 1,
    },
    modalTitle: {
        fontSize: ms(18),
        fontWeight: '600',
    },
    closeButton: {
        padding: ms(4),
    },
    modalBody: {
        paddingHorizontal: ms(20),
        paddingVertical: ms(16),
    },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ms(24),
        paddingBottom: ms(16),
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    detailModuleIcon: {
        width: ms(48),
        height: ms(48),
        borderRadius: ms(24),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ms(16),
    },
    detailHeaderContent: {
        flex: 1,
    },
    detailTitle: {
        fontSize: ms(18),
        fontWeight: '600',
        marginBottom: ms(4),
    },
    detailModule: {
        fontSize: ms(14),
        fontWeight: '600',
    },
    detailRow: {
        marginBottom: ms(20),
    },
    detailLabel: {
        fontSize: ms(12),
        fontWeight: '500',
        marginBottom: ms(4),
    },
    detailValue: {
        fontSize: ms(14),
    },
    statusBadge: {
        paddingHorizontal: ms(8),
        paddingVertical: ms(4),
        borderRadius: ms(8),
        alignSelf: 'flex-start',
    },
    statusText: {
        color: 'white',
        fontSize: ms(12),
        fontWeight: '600',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ms(10),
        borderRadius: ms(8),
        marginTop: ms(20),
    },
    actionButtonText: {
        color: 'white',
        fontSize: ms(14),
        fontWeight: '600',
        marginLeft: ms(8),
    },
});