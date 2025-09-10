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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false); // New state for pull-to-refresh
  const [getVehicleExpenseApi, { data, loading }] = useLazyQuery(PaginatedVehicleExpenseDocument, {
    fetchPolicy: 'network-only',
  });

  // Initial & paginated fetch
  useEffect(() => {
    getVehicleExpenseApi({
      variables: {
        listInputDto: {
          page,
          limit: 10
        }
      },
      onCompleted: (res) => {
        const newData = res?.paginatedVehicleExpense?.data || [];
        const totalAvailable = res?.paginatedVehicleExpense?.meta?.totalItems || 0;

        setExpenses(prev => {
          const updatedExpenses = refreshing ? (newData as VehicleExpense[]) : [...prev, ...(newData as VehicleExpense[])];
          const totalFetched = updatedExpenses.length;
          setHasMore(totalFetched < totalAvailable);
          return updatedExpenses;
        });
        setIsLoadingMore(false);
        setRefreshing(false); 
      }
    });
  }, [page, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setExpenses([]);
    setHasMore(true);
  };

  const loadMore = () => {
    if (hasMore && !loading && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
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
          item?.item?.status ? (
            <LinearGradient
              colors={statusColors[item.item.status as ExpenseStatus]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statusBadge}
            >
              <Ionicons
                name={statusIcons[item.item.status as ExpenseStatus]}
                size={ms(12)}
                color={Colors.white}
                style={styles.statusIcon}
              />
              <ThemedText style={styles.statusText} type='default'>
                {(item.item.status as string).toUpperCase()}
              </ThemedText>
            </LinearGradient>
          ) : null
        }
      />
    );
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
          data={expenses}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={renderItems}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={onRefresh} 
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator color={Colors[theme].text} style={{ marginVertical: 16 }} />
            ) : null
          }
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
});
