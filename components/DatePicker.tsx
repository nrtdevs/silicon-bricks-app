import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

interface DatePickerProps {
  showPicker: boolean
  date: Date
  setDate: (date: Date) => void
  setShowPicker: (show: boolean) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
  showPicker,
  setShowPicker,
  date,
  setDate
}) => {
  // State to store the selected date
  //   const [showPicker, setShowPicker] = useState(false); // State to control the visibility of the picker

  // Function to handle date change
  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios') // Hide the picker on Android after selection
    if (selectedDate !== undefined) {
      setDate(selectedDate) // Update the selected date
    }
  }

  // Function to format the date as DD/MM/YYYY
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0') // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0') // Get month (add 1 as months are 0-indexed) and pad with leading zero
    const year = date.getFullYear() // Get full year
    return `${day}/${month}/${year}` // Return formatted date
  }

  return (
    <View style={styles.container}>
      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date} // Set the current date
          mode="date" // Set the mode to date picker
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Use spinner for iOS, default for Android
          onChange={onChange} // Handle date change
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16
  }
})

export default DatePicker
