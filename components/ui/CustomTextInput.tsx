import { Colors } from '@/constants/Colors'
import { useTheme } from '@/context/ThemeContext'
import React from 'react'
import { TextInput, TextInputProps, View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
interface CustomTextInputProps extends TextInputProps {
  label: string
  errorMessage?: string
  borderColor?: string
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  errorMessage,
  borderColor,
  ...props
}) => {
  const { theme } = useTheme()
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={Colors[theme].inputColor}
        style={[
          styles.input,
          {
            backgroundColor: Colors[theme].inputBg,
            color: Colors[theme].text,
            borderColor
          }
        ]}
        {...props}
      />
      {errorMessage && <Text style={styles.helperText}>{errorMessage}</Text>}
    </View>
  )
}

const styles = ScaledSheet.create({
  inputContainer: {
    marginBottom: '10@ms'
  },
  label: {
    color: Colors.grayText,
    fontSize: '14@ms',
    marginBottom: '12@ms',
    fontFamily: 'medium',
    fontWeight: '500'
  },
  input: {
    borderRadius: '18@ms',
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    width: '100%',
    padding: '18@ms',
    fontSize: '16@ms',
    fontWeight: 500,
    fontFamily: 'medium'
  },
  helperText: {
    color: '#FF6B6B',
    fontSize: '12@ms',
    marginTop: '4@ms'
  }
})
