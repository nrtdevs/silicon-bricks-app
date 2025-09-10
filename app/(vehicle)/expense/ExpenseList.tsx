import CustomHeader from '@/components/CustomHeader'
import { ThemedView } from '@/components/ThemedView'
import ExpenseCard from '@/components/vehicle/ExpenseCard'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { PaginatedVehicleExpenseDocument, VehicleExpense } from '@/graphql/generated'
import { useLazyQuery } from '@apollo/client'
import { Entypo } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet } from 'react-native'
import { ms } from 'react-native-size-matters'

const { width, height } = Dimensions.get('window');

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
        const totalFetched = expenses.length + newData.length;
        const totalAvailable = res?.paginatedVehicleExpense?.meta?.totalItems || 0;

        setExpenses(prev => [...prev, ...(newData as VehicleExpense[])]);
        setHasMore(totalFetched < totalAvailable);
        setIsLoadingMore(false);
      }
    });
  }, [page]);

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
});
