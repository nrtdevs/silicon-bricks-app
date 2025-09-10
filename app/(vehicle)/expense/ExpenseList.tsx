import CustomHeader from '@/components/CustomHeader'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { PaginatedVehicleExpenseDocument } from '@/graphql/generated'
import { useLazyQuery } from '@apollo/client'
import { Entypo } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { ms } from 'react-native-size-matters'

const ExpenseList = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [getVehicleExpenseApi, { data }] = useLazyQuery(PaginatedVehicleExpenseDocument);

  const MainData = data?.paginatedVehicleExpense?.data || []

  console.log("data", MainData)
  useEffect(() => {
    getVehicleExpenseApi({
      variables: {
        listInputDto: {
          page: page,
          limit: 10
        }
      }
    })
  }, [page])


  const RenderItem = (item) =>{

  }


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
         keyExtractor={(item)=> item?.id}
         data={MainData}
         renderItem={(item)=> RenderItem(item)}
        />
      </ThemedView>
    </CustomHeader>
  )
}

export default ExpenseList

const styles = StyleSheet.create({
  menuButton: {
    padding: ms(10),
  },
})