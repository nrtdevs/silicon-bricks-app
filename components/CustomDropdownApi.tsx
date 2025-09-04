import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Option = { label: string; value: string };

interface CustomDropdownProps {
    control: any;
    name: string;
    rules?: any;
    placeholder?: string;
    options: Option[];
    search: string;                          // 👈 external search state
    onSearchChange: (text: string) => void;  // 👈 update search from parent
    searchPlaceholder?: string;
    onLoadMore?: (page: number, search: string) => Promise<Option[]>;
}

const CustomDropdownApi = ({
    control,
    name,
    rules,
    placeholder,
    options,
    search,
    onSearchChange,
    searchPlaceholder = "Search...",
    onLoadMore,
}: CustomDropdownProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const [data, setData] = useState<Option[]>(options || []);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    console.log("data land ka", data)

    // reset data when search changes
    useEffect(() => {
        if (onLoadMore && modalVisible) {
            setPage(1);
            setData([]);
            fetchData(1, search);
        }
    }, [search]);

    const fetchData = async (pageNum: number, query: string) => {
        if (!onLoadMore || loading) return;
        setLoading(true);
        try {
            const newData = await onLoadMore(pageNum, query);
            if (newData.length === 0) setHasMore(false);
            if (pageNum === 1) setData(newData);
            else setData((prev) => [...prev, ...newData]);
        } finally {
            setLoading(false);
        }
    };

    const handleEndReached = () => {
        if (hasMore && !loading && onLoadMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, search);
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View>
                    {/* Dropdown field */}
                    <TouchableOpacity
                        style={[
                            styles.dropdown,
                            isFocused && { borderColor: "#007AFF" },
                            error && { borderColor: "red" },
                        ]}
                        onPress={() => {
                            setModalVisible(true);
                            setIsFocused(true);
                            if (onLoadMore) {
                                setPage(1);
                                fetchData(1, search);
                            }
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.dropdownText, !value && { color: "#aaa" }]}>
                            {value
                                ? data.find((o) => o.value === value)?.label
                                : placeholder || "Select option"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#555" />
                    </TouchableOpacity>

                    {error && <Text style={styles.errorText}>{error.message}</Text>}

                    {/* Modal */}
                    <Modal visible={modalVisible} animationType="fade" transparent>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                {/* Search box (controlled by parent) */}
                                <TextInput
                                    placeholder={searchPlaceholder}
                                    style={styles.searchInput}
                                    value={search}
                                    onChangeText={onSearchChange}
                                    autoFocus
                                />

                                {/* Options list */}
                                <FlatList
                                    data={data}
                                    keyExtractor={(item) => item.value}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.option}
                                            onPress={() => {
                                                onChange(item.value);
                                                setModalVisible(false);
                                                onSearchChange(""); // reset search
                                                setIsFocused(false);
                                            }}
                                        >
                                            <Text style={styles.optionText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ListEmptyComponent={
                                        loading && page === 1 ? (
                                            <ActivityIndicator size="small" color="#007AFF" style={{ margin: 10 }} />
                                        ) : null
                                    }
                                    onEndReached={handleEndReached}
                                    onEndReachedThreshold={0.5}
                                    ListFooterComponent={
                                        loading && page > 1 ? (
                                            <ActivityIndicator size="small" style={{ margin: 10 }} />
                                        ) : null
                                    }
                                />

                                {/* Close button */}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {
                                        setModalVisible(false);
                                        setIsFocused(false);
                                    }}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        />
    );
};

export default CustomDropdownApi;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 14,
        backgroundColor: "#fff",
    },
    dropdownText: { fontSize: 16, color: "#333" },
    errorText: { color: "red", marginTop: 4, fontSize: 13 },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 20,
        maxHeight: height * 0.7,
        width: width * 0.9,
        padding: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
    },
    option: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionText: { fontSize: 16, color: "#333" },
    closeButton: {
        marginTop: 12,
        alignSelf: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    closeButtonText: { color: "#fff", fontSize: 16 },
});