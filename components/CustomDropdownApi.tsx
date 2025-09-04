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
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';

const { width, height } = Dimensions.get('window');

interface DropdownOption {
    label: string;
    value: string | number;
}

interface CustomDropdownApiProps {
    options: DropdownOption[];
    onSelect?: (item: DropdownOption) => void; // Made optional for react-hook-form
    placeholder?: string;
    defaultValue?: DropdownOption | null;
    label?: string;
    control: Control<any>; // For react-hook-form
    name: string; // For react-hook-form
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>; // For react-hook-form
    error?: FieldError; // For react-hook-form
    required?: boolean; // To show star for required fields
}

const CustomDropdownApi = ({
    options,
    onSelect,
    placeholder = "Select an option",
    defaultValue = null,
    label,
    control,
    name,
    rules,
    error,
    required = false,
}: CustomDropdownApiProps) => {
    const [selected, setSelected] = useState<DropdownOption | null>(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // For focus styling
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

    const onItemPress = (item: DropdownOption, onChange: (value: DropdownOption) => void) => {
        setSelected(item);
        onChange(item); // Notify react-hook-form
        onSelect && onSelect(item); // Call original onSelect if provided
        toggleDropdown();
    };

    const renderItem = (item: DropdownOption, onChange: (value: DropdownOption) => void) => (
        <TouchableOpacity
            style={[
                styles.item,
                selected && selected.value === item.value && styles.selectedItem
            ]}
            onPress={() => onItemPress(item, onChange)}
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
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value } }) => (
                <View style={styles.container}>
                    {label && (
                        <Text style={styles.label}>
                            {label}
                            {required && <Text style={styles.requiredStar}> *</Text>}
                        </Text>
                    )}
                    <TouchableOpacity
                        style={[
                            styles.dropdownHeader,
                            isFocused && styles.focusedBorder,
                            error && styles.errorBorder,
                        ]}
                        onPress={toggleDropdown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        activeOpacity={0.7}
                    >
                        <Text style={selected ? styles.selectedText : styles.placeholderText}>
                            {selected ? selected.label : placeholder}
                        </Text>
                        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </Animated.View>
                    </TouchableOpacity>
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                    {isOpen && (
                        <Animated.View style={[styles.dropdownList, { height: dropdownHeight }]}>
                            <FlatList
                                data={options}
                                renderItem={({ item }) => renderItem(item, onChange)}
                                keyExtractor={(item) => item.value.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </Animated.View>
                    )}
                </View>
            )}
        />
    );
};

export default CustomDropdownApi;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
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
    focusedBorder: {
        borderColor: '#007bff', // Blue border on focus
    },
    errorBorder: {
        borderColor: 'red', // Red border on error
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
    requiredStar: {
        color: 'red',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
});
