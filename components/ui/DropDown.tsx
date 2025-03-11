import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';

type Props = {
  items: string[];
  setSelectedItem: (item: string) => void;
};

const DropDown = ({ items, setSelectedItem }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelectItem = (item: string) => {
    setSelected(item);
    setSelectedItem(item);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Other content in your ScrollView can go here */}
      </ScrollView>
      
      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.selectedText}>{selected || 'Select an item'}</Text>
      </TouchableOpacity>

      {/* Dropdown List */}
      {isVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelectItem(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
  },
  dropdownList: {
    position: 'absolute',
    top: 50, // Position below the dropdown button
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 1000, // Ensure the dropdown list appears above other elements
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  scrollViewContent: {
    // Add styles for your ScrollView content if needed
  },
});
