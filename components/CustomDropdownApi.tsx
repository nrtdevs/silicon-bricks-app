import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState, useEffect } from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { Animated, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';


interface DropdownOption {
    label: string;
    value: string | number;
}

interface CustomDropdownApiProps {
    options: DropdownOption[];
    onSelect?: (item: DropdownOption) => void; 
    placeholder?: string;
    label?: string;
    control: Control<any>;
    name: string;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    error?: FieldError;
    required?: boolean;
    value?: DropdownOption | null; // Add value prop for controlled component
}

const { height: screenHeight } = Dimensions.get('window');

const CustomDropdownApi = ({ options, onSelect, placeholder = "Select an option", label, control, name, rules, error, required = false, value = null }: CustomDropdownApiProps) => {
    const [selected, setSelected] = useState<DropdownOption | null>(value);
    const [modalVisible, setModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const slideAnim = useRef(new Animated.Value(screenHeight)).current; // Initial position off-screen

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,  // 👈 modal bottom se 0 position par slide karega
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: screenHeight, // 👈 screen ke bahar slide back
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setSearchText('');
        });
    };


    const toggleDropdown = () => {
        if (modalVisible) {
            closeModal();
        } else {
            openModal();
        }
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
    );

    const onItemPress = (item: DropdownOption, onChange: (value: DropdownOption) => void) => {
        setSelected(item);
        onChange(item);
        onSelect && onSelect(item); 
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
                        {selected ? <> <TouchableOpacity onPress={() => {
                            setSelected(null);
                            onChange(null); // Clear react-hook-form value
                            setSearchText('');
                            setSelected(null); // Clear selected item
                            closeModal(); // Close the modal
                        }} style={styles.closeButton}>
                            <Ionicons name="close-circle" size={20} color="#666" />
                        </TouchableOpacity></> : <>
                                <Ionicons name={modalVisible ? "chevron-up" : "chevron-down"} size={20} color="#666" />
                        </>}


                    </TouchableOpacity>
                    {error && <Text style={styles.errorText}>{error.message}</Text>}

                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                        animationType="none"
                    >
                        <TouchableWithoutFeedback onPress={closeModal}>
                            <View style={styles.modalOverlay} />
                        </TouchableWithoutFeedback>

                        <Animated.View
                            style={[
                                styles.modalContent,
                                { transform: [{ translateY: slideAnim }] },
                            ]}
                        >
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{label || placeholder}</Text>
                                <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
                                    <Ionicons name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.searchContainer}>
                                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />
                            </View>

                            {/* ✅ Scrollable List */}
                            <FlatList
                                data={filteredOptions}
                                renderItem={({ item }) => renderItem(item, onChange)}
                                keyExtractor={(item) => item.value.toString()}
                                showsVerticalScrollIndicator={true}
                                style={styles.flatList}
                                contentContainerStyle={styles.flatListContent}
                            />
                        </Animated.View>
                    </Modal>

                </View>
            )}
        />
    );
};

export default CustomDropdownApi;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
        zIndex: 1, // Lower zIndex for the dropdown header itself
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
        borderColor: '#007bff',
    },
    errorBorder: {
        borderColor: 'red',
    },
    placeholderText: {
        color: '#999',
        fontSize: 16,
    },
    selectedText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'capitalize'
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
        textTransform: 'capitalize'
    },
    selectedItemText: {
        color: '#0066cc',
        fontWeight: '500',
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "500",
        color: '#333',
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexShrink: 0, // Ensure search container doesn't shrink
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
    },
    closeButton: {
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: screenHeight * 0.4, // 👈 70% screen height, FlatList ke liye jagah milegi
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    flatList: {
        flex: 1, // ✅ baki space FlatList ko de do
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexShrink: 0, // Ensure header doesn't shrink
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    modalCloseButton: {
        padding: 5,
    },
    flatListContent: {
        paddingBottom: 20, // Add padding to the bottom of the scrollable content
    },
});
