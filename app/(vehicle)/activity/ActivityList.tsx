import CustomHeader from "@/components/CustomHeader";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { PaginatedLogsDocument } from "@/graphql/generated";
import { useLazyQuery } from "@apollo/client";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { 
    ActivityIndicator, 
    FlatList, 
    Pressable, 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    ScrollView,
    Modal,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { ms } from "react-native-size-matters";

const { width } = Dimensions.get('window');

const ActivityLogs = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [allLogs, setAllLogs] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedLog, setSelectedLog] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredLogs, setFilteredLogs] = useState<any[]>([]);

    const [getLogsApi, { data, loading, error }] = useLazyQuery(PaginatedLogsDocument);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setCurrentPage(1);
        setHasMore(true);
        setAllLogs([]);

        getLogsApi({
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
            getLogsApi({
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
        if (data?.paginatedLogs?.data) {
            if (currentPage === 1) {
                setAllLogs(data.paginatedLogs.data);
            } else {
                setAllLogs(prevLogs => [...prevLogs, ...data.paginatedLogs.data]);
            }

            if (data.paginatedLogs.data.length < limit) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        }
    }, [data]);

    // Filter logs based on search and filter
    useEffect(() => {
        let filtered = allLogs;

        // Filter by action type
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(log => log.action === selectedFilter);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(log =>
                log.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.module?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredLogs(filtered);
    }, [allLogs, searchQuery, selectedFilter]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'CREATE': return '#10B981';
            case 'UPDATE': return '#F59E0B';
            case 'DELETE': return '#EF4444';
            default: return Colors[theme].text;
        }
    };

    const getActionIcon = (action: string) => {
        switch (action) {
            case 'CREATE': return 'add-circle';
            case 'UPDATE': return 'create';
            case 'DELETE': return 'trash';
            default: return 'information-circle';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    const openLogDetail = (log: any) => {
        setSelectedLog(log);
        setModalVisible(true);
    };

    const renderFilterButtons = () => {
        const filters = ['all', 'CREATE', 'UPDATE', 'DELETE'];
        
        return (
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filters.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                { backgroundColor: Colors[theme].background },
                                { borderColor: Colors[theme].text + '20' },
                                selectedFilter === filter && styles.filterButtonActive
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    { color: Colors[theme].text },
                                    selectedFilter === filter && styles.filterTextActive
                                ]}
                            >
                                {filter === 'all' ? 'All' : filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    const renderLogItem = ({ item }: { item: any }) => {
        const { date, time } = formatDate(item.createdAt);
        
        return (
            <TouchableOpacity
                style={[
                    styles.logItem,
                    { backgroundColor: Colors[theme].background },
                    { borderColor: Colors[theme].text + '10' }
                ]}
                onPress={() => openLogDetail(item)}
                activeOpacity={0.7}
            >
                <View style={styles.logHeader}>
                    <View style={[
                        styles.actionBadge,
                        { backgroundColor: getActionColor(item.action) + '20' }
                    ]}>
                        <Ionicons
                            name={getActionIcon(item.action) as any}
                            size={ms(14)}
                            color={getActionColor(item.action)}
                        />
                        <Text style={[
                            styles.actionText,
                            { color: getActionColor(item.action) }
                        ]}>
                            {item.action}
                        </Text>
                    </View>
                    <Text style={[styles.timestamp, { color: Colors[theme].text + '80' }]}>
                        {time}
                    </Text>
                </View>
                
                <Text 
                    style={[styles.description, { color: Colors[theme].text }]} 
                    numberOfLines={2}
                >
                    {item.description}
                </Text>
                
                <View style={styles.logFooter}>
                    <View style={styles.userInfo}>
                        <Ionicons name="person" size={ms(12)} color={Colors[theme].text + '80'} />
                        <Text style={[styles.username, { color: Colors[theme].text + '80' }]}>
                            {item.user?.name || 'Unknown'}
                        </Text>
                    </View>
                    <View style={styles.moduleInfo}>
                        <Ionicons name="cube" size={ms(12)} color={Colors[theme].text + '80'} />
                        <Text style={[styles.module, { color: Colors[theme].text + '80' }]}>
                            {item.module}
                        </Text>
                    </View>
                    <Text style={[styles.date, { color: Colors[theme].text + '60' }]}>
                        {date}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderLogDetailModal = () => {
        if (!selectedLog) return null;

        const { date, time } = formatDate(selectedLog.createdAt);

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
                                Activity Details
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={ms(24)} color={Colors[theme].text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Action
                                </Text>
                                <View style={[
                                    styles.detailBadge,
                                    { backgroundColor: getActionColor(selectedLog.action) + '20' }
                                ]}>
                                    <Ionicons
                                        name={getActionIcon(selectedLog.action) as any}
                                        size={ms(16)}
                                        color={getActionColor(selectedLog.action)}
                                    />
                                    <Text style={[
                                        styles.detailBadgeText,
                                        { color: getActionColor(selectedLog.action) }
                                    ]}>
                                        {selectedLog.action}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Description
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedLog.description}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    User
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedLog.user?.username || 'Unknown'}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Module
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedLog.module}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Organization
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedLog.organization?.name || 'N/A'}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    Date & Time
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {date} at {time}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    IP Address
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedLog.ipAddress || 'N/A'}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: Colors[theme].text + '80' }]}>
                                    User Agent
                                </Text>
                                <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
                                    {selectedLog.userAgent || 'N/A'}
                                </Text>
                            </View>


                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderEmptyComponent = () => {
        if (loading && allLogs.length === 0) {
            return <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />;
        }

        if (!loading && allLogs.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons name="document-text-outline" size={ms(48)} color={Colors[theme].text + '40'} />
                    <Text style={[styles.emptyTitle, { color: Colors[theme].text }]}>
                        No logs found
                    </Text>
                    <Text style={[styles.emptySubtitle, { color: Colors[theme].text + '80' }]}>
                        {error ? "Error loading activity logs" : 
                         searchQuery || selectedFilter !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Activity logs will appear here'
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
            title="Activity Logs"
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
                        placeholder="Search logs..."
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
                        {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'}
                    </Text>
                </View>

                <FlatList
                    data={filteredLogs}
                    keyExtractor={(item) => item?.id?.toString()}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    renderItem={renderLogItem}
                    ListEmptyComponent={renderEmptyComponent}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListFooterComponent={() =>
                        loading && allLogs.length > 0 ? (
                            <ActivityIndicator size="large" color={Colors[theme].text} style={styles.loader} />
                        ) : null
                    }
                />

                {/* Detail Modal */}
                {renderLogDetailModal()}
            </ThemedView>
        </CustomHeader>
    );
};

export default ActivityLogs;

const styles = StyleSheet.create({
    menuButton: {
        padding: ms(10),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: ms(16),
        marginTop: ms(16),
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
        marginBottom: ms(16),
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
    headerInfo: {
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
    logItem: {
        borderRadius: ms(12),
        padding: ms(16),
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ms(8),
    },
    actionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ms(8),
        paddingVertical: ms(4),
        borderRadius: ms(6),
    },
    actionText: {
        fontSize: ms(12),
        fontWeight: '600',
        marginLeft: ms(4),
    },
    timestamp: {
        fontSize: ms(12),
        fontWeight: '500',
    },
    description: {
        fontSize: ms(14),
        lineHeight: ms(20),
        marginBottom: ms(12),
    },
    logFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    username: {
        fontSize: ms(12),
        marginLeft: ms(4),
        fontWeight: '500',
    },
    moduleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: ms(16),
    },
    module: {
        fontSize: ms(12),
        marginLeft: ms(4),
        fontWeight: '500',
    },
    date: {
        fontSize: ms(12),
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
    detailRow: {
        marginBottom: ms(20),
    },
    detailLabel: {
        fontSize: ms(14),
        fontWeight: '500',
        marginBottom: ms(4),
    },
    detailValue: {
        fontSize: ms(16),
        lineHeight: ms(22),
    },
    detailBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: ms(8),
        paddingVertical: ms(4),
        borderRadius: ms(6),
    },
    detailBadgeText: {
        fontSize: ms(14),
        fontWeight: '600',
        marginLeft: ms(4),
    },
});