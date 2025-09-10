import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CustomHeader from '@/components/CustomHeader'
import { Entypo } from '@expo/vector-icons'
import { ms } from 'react-native-size-matters'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import { useLazyQuery } from '@apollo/client'
import { PaginatedVehiclesDocument } from '@/graphql/generated'

const ExpenseList = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [getVehicleExpenseApi, { data, loading, error }] = useLazyQuery(PaginatedVehiclesDocument);


  useEffect(() => {
    getVehicleExpenseApi({
      variables: {
        listInputDto: {
          page: page,
          limit: 10
        }
      }
    })
  })


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
        <View>
          <Text>ExpenseList</Text>
        </View>
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