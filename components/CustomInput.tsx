import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { KeyboardTypeOptions } from "react-native";

type CustomInputProps = {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  rules?: object;
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: "text" | "email" | "number" | "password";
};

const CustomInput = ({ control, name, label, placeholder, secureTextEntry, type = "text", required = false, }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  // map type -> keyboardType
  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case "email":
        return "email-address";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={{ marginBottom: 20 }}>
          {/* Label */}
          <Text
            style={[
              styles.label,
              error ? { color: "red" } : {},
            ]}
          >
            {label}
            {required && <Text style={{ color: "red" }}> *</Text>}
          </Text>


          {/* Input */}
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            keyboardType={getKeyboardType()}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={[
              styles.input,
              error
                ? { borderColor: Colors.light.danger.border }
                : isFocused
                  ? { borderColor: Colors.blue }
                  : { borderColor: Colors.light.border },
            ]}
          />

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error.message || "Invalid input"}</Text>}
        </View>
      )}
    />
  );
};

export default CustomInput;

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
    margin: 1,
    backgroundColor: Colors.light.background,
  },
  errorText: {
    color: Colors.red,
    marginTop: 4,
    fontSize: 13,
  },
});
