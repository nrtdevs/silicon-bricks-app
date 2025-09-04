import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

type ModeType = "date" | "year" | "month" | "day";

type CustomDatePickerProps = {
    control: any;
    name: string;
    label: string;
    required?: boolean;
    mode?: ModeType;
};

const CustomDatePicker = ({ control, name, label, required, mode = "date" }: CustomDatePickerProps) => {
    const [show, setShow] = useState(false);

    // Detect theme
    const { theme } = useTheme();

    const formatValue = (date: Date) => {
        switch (mode) {
            case "year":
                return date.getFullYear().toString();
            case "month":
                return `${date.getMonth() + 1}`; // 1-12
            case "day":
                return date.getDate().toString();
            default:
                return date.toLocaleDateString();
        }
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View style={{ marginBottom: 20 }}>
                    {/* Label */}
                    <Text style={[styles.label,
                    { color: Colors[theme].textPrimary },
                    error ? { color: Colors[theme].danger.main } : {}]}>
                        {label}
                        {required && <Text style={{ color: Colors[theme].danger.main }}> *</Text>}
                    </Text>

                    {/* Fake input */}
                    <Pressable
                        onPress={() => setShow(true)}
                        style={[
                            styles.input,
                            error ? { borderColor: Colors[theme].danger.main } : { borderColor: Colors[theme].border },
                        ]}
                    >
                        <Text style={{ color: value ? Colors[theme].textPrimary : Colors[theme].placeholder }}>
                            {value ? formatValue(new Date(value)) : `Select ${label}`}
                        </Text>
                    </Pressable>

                    {/* Error message */}
                    {error && <Text style={[styles.errorText, { color: Colors[theme].danger.main }]}>{error.message || "Invalid"}</Text>}

                    {/* Native Date Picker */}
                    {show && (
                        <DateTimePicker
                            value={value ? new Date(value) : new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                                setShow(Platform.OS === "ios");
                                if (selectedDate) {
                                    onChange(selectedDate.toISOString());
                                }
                            }}
                        />
                    )}
                </View>
            )}
        />
    );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "500",
        color: '#333', // Added to match CustomDropdownApi
    },
    input: {
        borderWidth: 1, // Changed from 1.5 to 1 to match CustomDropdownApi
        borderRadius: 10, // Changed from 8 to 10 to match CustomDropdownApi
        paddingHorizontal: 15, // Changed from 12 to 15 to match CustomDropdownApi
        paddingVertical: 15, // Changed from 12 to 15 to match CustomDropdownApi
        fontSize: 16,
        backgroundColor: 'white', // Added to match CustomDropdownApi
        shadowColor: '#000', // Added to match CustomDropdownApi
        shadowOffset: { width: 0, height: 2 }, // Added to match CustomDropdownApi
        shadowOpacity: 0.1, // Added to match CustomDropdownApi
        shadowRadius: 4, // Added to match CustomDropdownApi
        elevation: 3, // Added to match CustomDropdownApi
    },
    errorText: {
        marginTop: 4,
        fontSize: 13,
    },
});
