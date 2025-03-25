import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { DataTable, Text } from 'react-native-paper'

import Zocial from '@expo/vector-icons/Zocial'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface Organisation {
  id: number
  name: string
  description: string
  status: string
}

// Fake JSON data
const fakeData: Organisation[] = [
  {
    id: 1,
    name: 'Ankit',
    description: 'Lorem ipsum dolor sit amet.',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Rahul',
    description: 'Consectetur adipiscing elit.',
    status: 'Inactive'
  },
  {
    id: 3,
    name: 'Priya',
    description: 'Sed do eiusmod tempor incididunt.',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Suman',
    description: 'Ut labore et dolore magna aliqua.',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Nina',
    description: 'Aliquam euismod libero vitae.',
    status: 'Inactive'
  },
  {
    id: 6,
    name: 'Vijay',
    description: 'Amet consect adipiscing elit.',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Karan',
    description: 'Duis aute irure dolor in reprehenderit.',
    status: 'Active'
  },
  {
    id: 8,
    name: 'Ravi',
    description: 'Excepteur sint occaecat cupidatat non proident.',
    status: 'Inactive'
  }
]

const Organisation = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const totalRows = fakeData.length

  const dataToDisplay = fakeData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  const statusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return styles.activeStatus
      case 'Inactive':
        return styles.inactiveStatus
      case 'Pending':
        return styles.pendingStatus
      case 'Blocked':
        return styles.blockedStatus
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organization Details</Text>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.header}>
          <DataTable.Title textStyle={styles.headerText}>Name</DataTable.Title>
          <DataTable.Title textStyle={styles.headerText}>
            Description
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerText}>
            Status
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerText}>
            Action
          </DataTable.Title>
        </DataTable.Header>
        {/* Mapping through fake JSON data */}
        {fakeData.map(item => (
          <DataTable.Row
            key={item.id}
            style={[styles.row, item.id % 2 === 0 && styles.alternateRow]}
          >
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell>
              <Text style={statusStyle(item.status)}>{item.status}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <TouchableOpacity>
                <Zocial
                  name="statusnet"
                  size={18}
                  color="black"
                  style={styles.status}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome
                  name="edit"
                  size={18}
                  color="black"
                  style={styles.edit}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="delete-circle-outline"
                  size={18}
                  color="black"
                  style={styles.delete}
                />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}{' '}
      </DataTable>
      <View>
        <Text>Rows Per Page : </Text>
        <Picker
          selectedValue={rowsPerPage}
          style={styles.picker}
          onValueChange={(itemValue: number) => setRowsPerPage(itemValue)}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
          <Picker.Item label="20" value={20} />
        </Picker>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(totalRows / rowsPerPage)}
          onPageChange={newPage => setPage(newPage)}
          label={`${(page - 1) * rowsPerPage + 1}-${Math.min(
            page * rowsPerPage,
            totalRows
          )} of ${totalRows}`}
        />
      </View>
    </View>
  )
}

export default Organisation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3
  },
  header: {
    backgroundColor: '#6300ee8b'
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  row: {
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  alternateRow: {
    backgroundColor: '#f4f4f4'
  },
  status: {
    marginRight: 10,
    color: '#007bff' // Blue color for status icon
  },
  edit: {
    marginRight: 10,
    color: '#01a847' // Green color for edit icon
  },
  delete: {
    marginRight: 10,
    color: '#ff0000' // Red color for delete icon
  },
  activeStatus: {
    color: '#01a847', // Blue color for active status
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7
  },
  inactiveStatus: {
    color: 'black', // Red color for inactive status
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  pendingStatus: {
    color: 'orange',
    borderStyle: 'solid',
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  blockedStatus: {
    color: 'red',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  rowPerPageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  rowPerPageText: {
    fontSize: 16,
    marginRight: 10
  },
  picker: {
    height: 40,
    width: 120,
    backgroundColor: '#f4f4f4',
    borderRadius: 5
  }
})
