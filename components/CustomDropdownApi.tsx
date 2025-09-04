import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface DropdownOption {
    label: string;
    value: string | number;
}

interface CustomDropdownApiProps {
    options: DropdownOption[];
    onSelect: (item: DropdownOption) => void;
    placeholder?: string;
    defaultValue?: DropdownOption | null;
    label?: string;
}

const CustomDropdownApi = ({
    options, 
    onSelect,
    placeholder = "Select an option",
    defaultValue = null,
    label,
}: CustomDropdownApiProps) => {
    const [selected, setSelected] = useState<DropdownOption | null>(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const dropdownHeight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, options.length * 50 > 200 ? 200 : options.length * 50]
    });
    const arrowRotation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const toggleDropdown = () => {
        if (isOpen) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start(() => setIsOpen(false));
        } else {
            setIsOpen(true);
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    };

const onItemPress = (item: DropdownOption) => {
    setSelected(item);
    onSelect(item);
    toggleDropdown();
};

const renderItem = ({ item }: { item: DropdownOption }) => (
    <TouchableOpacity
        style={[
            styles.item,
            selected && selected.value === item.value && styles.selectedItem
        ]} 
        onPress={() => onItemPress(item)}
    >
        <Text style={[
            styles.itemText,
            selected && selected.value === item.value && styles.selectedItemText
        ]}>
            {item.label}
        </Text>
    </TouchableOpacity>
);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>} 
            <TouchableOpacity 
                style={styles.dropdownHeader}
                onPress={toggleDropdown}
                activeOpacity={0.7}
            >
                <Text style={selected ? styles.selectedText : styles.placeholderText}>
                    {selected ? selected.label : placeholder}
                </Text>
                <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                    <Ionicons name="chevron-down" size={20} color="#666" />
                </Animated.View>
            </TouchableOpacity>
            {isOpen && (
                <Animated.View style={[styles.dropdownList, { height: dropdownHeight }]}>
                    <FlatList
                        data={options}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.value.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default CustomDropdownApi

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        zIndex: 1000,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    placeholderText: {
        color: '#999',
        fontSize: 16,
    },
    selectedText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    dropdownList: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 5,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    item: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedItem: {
        backgroundColor: '#f0f7ff',
    },
    itemText: {
        color: '#333',
        fontSize: 16,
    },
    selectedItemText: {
        color: '#0066cc',
        fontWeight: '500',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontWeight: 'bold',
    },
});
