import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Option = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
  error?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  control,
  name,
  label,
  required,
  placeholder = "Select...",
  options,
  error,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={{ marginBottom: 16 }}>
          {/* Label */}
          <Text
            style={[
              styles.label,
              error ? { color: Colors.red } : {},
            ]}
          >
            {label}
            {required && <Text style={{ color: Colors.red }}> *</Text>}
          </Text>

          {/* Dropdown */}
          <TouchableOpacity
            style={[
              styles.dropdown,
              { borderColor: error ? Colors.red : value ? Colors.blue : Colors.light.border },
            ]}
            onPress={() => setVisible(true)}
          >
            <Text style={{ color: value ? Colors.light.textPrimary : Colors.light.placeholder }}>
              {value
                ? options.find((opt) => opt.value === value)?.label
                : placeholder}
            </Text>
            <Ionicons name="chevron-down" size={20} color={Colors.light.textSecondary} />
          </TouchableOpacity>

          {/* Error */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* Modal Picker */}
          <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setVisible(false)}
            >
              <View style={styles.modalContent}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => {
                        onChange(item.value);
                        setVisible(false);
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.textPrimary,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.red,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // Keeping this as rgba for transparency
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    margin: 20,
    borderRadius: 8,
    padding: 10,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
});

export default CustomDropdown;
