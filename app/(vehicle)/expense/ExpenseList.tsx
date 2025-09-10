import CustomHeader from '@/components/CustomHeader'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'
import ExpenseCard from '@/components/vehicle/ExpenseCard'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { PaginatedVehicleExpenseDocument, VehicleExpense } from '@/graphql/generated'
import { useLazyQuery } from '@apollo/client'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { router, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import { FAB } from "@rneui/themed";

const { width, height } = Dimensions.get('window');

type ExpenseStatus = "active" | "pending" | "inactive" | "blocked";

const statusColors: Record<ExpenseStatus, readonly [string, string]> = {
  active: ['#10B981', '#059669'], // Green
  pending: ['#F59E0B', '#D97706'], // Amber
  inactive: ['#6B7280', '#4B5563'], // Gray
  blocked: ['#EF4444', '#DC2626'], // Red
};

const statusIcons: Record<ExpenseStatus, keyof typeof Ionicons.glyphMap> = {
  active: 'checkmark-circle',
  pending: 'time',
  inactive: 'close-circle',
  blocked: 'alert-circle',
};

const ExpenseList = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const [expenses, setExpenses] = useState<VehicleExpense[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allVehicles, setAllVehicles] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [getVehicleExpenseApi, { data, loading, error }] = useLazyQuery(PaginatedVehicleExpenseDocument, {
    fetchPolicy: 'network-only',
  });


  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setAllVehicles([]);
    getVehicleExpenseApi({
      variables: { listInputDto: { limit: 10, page: 1 } },
      fetchPolicy: 'network-only'
    }).finally(() => setRefreshing(false));
  }

  useEffect(() => {
    if (currentPage && hasMore && !loading) {
      getVehicleExpenseApi({
        variables: {
          listInputDto: {
            limit: 1,
            page: currentPage
          }
        }
      });
    }
  }, [currentPage, hasMore, loading, getVehicleExpenseApi]);

  useEffect(() => {
    if (data?.paginatedVehicleExpense?.data) {
      if (currentPage == 1) {
        setAllVehicles(data.paginatedVehicleExpense.data);
      } else {
        setAllVehicles(prevVehicles => [...prevVehicles, ...data.paginatedVehicleExpense.data]);
      }

      if (data.paginatedVehicleExpense.data.length < 10) {
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

  const renderItems = (item: any) => {

    return (
      <ExpenseCard
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
        status={
          item?.status ? (
            <LinearGradient
              colors={statusColors[item.status as ExpenseStatus]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statusBadge}
            >
              <Ionicons
                name={statusIcons[item.status as ExpenseStatus]}
                size={ms(12)}
                color={Colors.white}
                style={styles.statusIcon}
              />
              <ThemedText style={styles.statusText} type='default'>
                {(item.status as string).toUpperCase()}
              </ThemedText>
            </LinearGradient>
          ) : null
        }
      />
    );
  };

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
      title="Expense"
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
          keyExtractor={(item) => item?.id}
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
          title="Add Vehicle"
          style={[styles.fab, { backgroundColor: Colors[theme].primary.main }]}
          titleStyle={styles.fabTitle}
          icon={{
            name: "add",
            color: "white",
            size: ms(24),
          }}
          onPress={() => router.navigate("/(vehicle)/expense/AddExpense")}
        />
      </ThemedView>
    </CustomHeader>
  )
}

export default ExpenseList;

const styles = StyleSheet.create({
  menuButton: {
    padding: ms(10),
  },
  itemContainer: {
    padding: ms(16),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dotsButton: {
    padding: ms(8),
    borderRadius: ms(20),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: ms(4),
    borderRadius: ms(20),
  },
  statusIcon: {
    marginRight: ms(4),
  },
  statusText: {
    fontSize: ms(10),
    color: Colors.white,
    fontWeight: 'bold',
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
  loader: {
    marginVertical: ms(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(20),
  },
  emptyIcon: {
    marginBottom: ms(10),
  },
  emptyText: {
    fontSize: ms(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: ms(5),
  },
  emptySubText: {
    fontSize: ms(14),
    textAlign: 'center',
    marginBottom: ms(20),
  },
  retryButton: {
    backgroundColor: Colors.light.primary.main,
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
    borderRadius: ms(8),
  },
  retryText: {
    color: Colors.white,
    fontSize: ms(16),
    fontWeight: 'bold',
  },
});
