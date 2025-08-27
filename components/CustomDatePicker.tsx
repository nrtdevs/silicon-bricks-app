import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";

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
                    <Text style={[styles.label, error ? { color: Colors.red } : {}]}>
                        {label}
                        {required && <Text style={{ color: Colors.red }}> *</Text>}
                    </Text>

                    {/* Fake input */}
                    <Pressable
                        onPress={() => setShow(true)}
                        style={[
                            styles.input,
                            error ? { borderColor: Colors.red } : { borderColor: Colors.light.border },
                        ]}
                    >
                        <Text style={{ color: value ? Colors.light.textPrimary : Colors.light.placeholder }}>
                            {value ? formatValue(new Date(value)) : `Select ${label}`}
                        </Text>
                    </Pressable>

                    {/* Error message */}
                    {error && <Text style={styles.errorText}>{error.message || "Invalid"}</Text>}

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
        color: Colors.light.textPrimary,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: Colors.light.background,
    },
    errorText: {
        color: Colors.red,
        marginTop: 4,
        fontSize: 13,
    },
});
