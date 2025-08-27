import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

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

const CustomDropdown: React.FC<CustomDropdownProps> = ({ control, name, label, required, placeholder = "Select...", options, error }) => {
  const [visible, setVisible] = useState(false);

  // Detect theme
  const { theme } = useTheme();

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
              { color: Colors[theme].textPrimary },
              error ? { color: Colors[theme].danger.main } : {},
            ]}
          >
            {label}
            {required && <Text style={{ color: Colors[theme].danger.main }}> *</Text>}
          </Text>

          {/* Dropdown */}
          <TouchableOpacity
            style={[
              styles.dropdown,
              { borderColor: error ? Colors[theme].danger.main : value ? Colors.blue : Colors[theme].border },
            ]}
            onPress={() => setVisible(true)}
          >
            <Text style={{ color: value ? Colors[theme].textPrimary : Colors[theme].placeholder }}>
              {value
                ? options.find((opt) => opt.value === value)?.label
                : placeholder}
            </Text>
            <Ionicons name="chevron-down" size={20} color={Colors[theme].textSecondary} />
          </TouchableOpacity>

          {/* Error */}
          {error && <Text style={[styles.error, { color: Colors[theme].danger.main }]}>{error}</Text>}

          {/* Modal Picker */}
          <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setVisible(false)}
            >
              <View style={[styles.modalContent, { backgroundColor: Colors[theme].background }]}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.option, { borderBottomColor: Colors[theme].border }]}
                      onPress={() => {
                        onChange(item.value);
                        setVisible(false);
                      }}
                    >
                      <Text style={{ color: Colors[theme].textPrimary }}>{item.label}</Text>
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    margin: 20,
    borderRadius: 8,
    padding: 10,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
  },
});

export default CustomDropdown;
