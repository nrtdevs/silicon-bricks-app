import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";

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
          <Text style={[styles.label, error ? { color: "red" } : {}]}>
            {label}
            {required && <Text style={{ color: "red" }}> *</Text>}
          </Text>

          {/* Fake input */}
          <Pressable
            onPress={() => setShow(true)}
            style={[
              styles.input,
              error ? { borderColor: "red" } : { borderColor: "#ccc" },
            ]}
          >
            <Text style={{ color: value ? "#000" : "#999" }}>
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
    color: "#333",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 13,
  },
});
