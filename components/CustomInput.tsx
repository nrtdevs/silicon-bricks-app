import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { KeyboardTypeOptions } from "react-native";
import { useTheme } from "@/context/ThemeContext";

type CustomInputProps = {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  rules?: object;
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: "text" | "email" | "number" | "password";
  multiline?: boolean;
  numberOfLines?: number;
};

const CustomInput = ({ control, name, label, placeholder, multiline = false, numberOfLines = 4, secureTextEntry, type = "text", required = false, }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  // Detect theme
  const { theme } = useTheme();

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
              { color: Colors[theme].textPrimary },
              error ? { color: Colors[theme].danger.main } : {},
            ]}
          >
            {label}
            {required && <Text style={{ color: Colors[theme].danger.main }}> *</Text>}
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
            placeholderTextColor={Colors[theme].lightText}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1} 
            style={[
              styles.input,
              multiline && { height: numberOfLines * 24, textAlignVertical: "top" }, 
              {
                borderColor: error
                  ? Colors[theme].danger.main
                  : isFocused
                    ? Colors.blue
                    : Colors[theme].border,
                backgroundColor: Colors[theme].background,
                color: Colors[theme].textPrimary,
              },
            ]}
          />

          {/* Error Message */}
          {error && <Text style={[styles.errorText, { color: Colors[theme].danger.main }]}>{error.message || "Invalid input"}</Text>}
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
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    margin: 1,
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
  },
});
