import { Colors } from '@/constants/Colors'
import React, { useState, useRef, RefObject, useEffect } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData
} from 'react-native'
import { ms, s, ScaledSheet, vs } from 'react-native-size-matters'
import { ThemedText } from './ThemedText'
import { useTheme } from '@/context/ThemeContext'

interface OtpInputProps {
  codeLength: number
  onCodeFilled: (code: string) => void
  error?: boolean
  errorMessage?: string | null | undefined
  defaultValue?: string
  setError?: any
}

const OtpInput: React.FC<OtpInputProps> = ({
  codeLength,
  onCodeFilled,
  error,
  errorMessage,
  defaultValue,
  setError
}) => {
  const [code, setCode] = useState<string[]>(
    defaultValue ? defaultValue.split('') : new Array(codeLength).fill('')
  )
  const inputs = useRef<Array<RefObject<TextInput>>>(
    new Array(codeLength).fill(null).map(() => React.createRef())
  )
  const animations = useRef<Animated.Value[]>(
    new Array(codeLength).fill(null).map(() => new Animated.Value(1))
  )

  const { theme } = useTheme()
  useEffect(() => {
    if (defaultValue && defaultValue.length === codeLength) {
      setCode(defaultValue.split(''))
    }
  }, [defaultValue])

  const handleChangeText = (text: string, index: number) => {
    setError(false)
    const newCode = [...code]
    newCode[index] = text
    setCode(newCode)

    if (text !== '' && index < codeLength - 1) {
      inputs.current[index + 1].current?.focus()
    }

    if (newCode.every(char => char !== '')) {
      onCodeFilled(newCode.join(''))
      Keyboard.dismiss()
    }

    // Smooth animation when input changes
    Animated.sequence([
      Animated.timing(animations.current[index], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animations.current[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start()
  }

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newCode = [...code]

      // Prevent unwanted UI removal by checking if the field is already empty
      if (newCode[index] === '') {
        if (index > 0) {
          inputs.current[index - 1].current?.focus()
        }
      } else {
        newCode[index] = ''
        setCode(newCode)
        onCodeFilled(newCode.join(''))
      }
    }
  }

  return (
    <View
      style={{
        justifyContent: 'center'
      }}
    >
      <View style={styles.container}>
        {code.map((_, index) => (
          <Animated.View
            key={index}
            style={{ transform: [{ scale: animations.current[index] }] }}
          >
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: error ? Colors.red : Colors.gray,
                  color: Colors[theme].text
                }
              ]}
              keyboardType="number-pad"
              maxLength={1} 
              value={code[index]}
              onChangeText={text => handleChangeText(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              ref={inputs.current[index]}
              autoFocus={index === 0}
            />
          </Animated.View>
        ))}
      </View>
      {errorMessage && error && (
        <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
      )}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: "5@vs",
    justifyContent: 'center',
    alignItems: 'center',
    gap: "10@ms"
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: "45@ms",
    height: "45@ms",
    textAlign: 'center',
    fontSize: "16@ms",  
  },
  errorText: {
    fontSize: "14@ms",
    color: Colors.red,
    fontFamily: 'medium',
    left: 10
  }
})

export default OtpInput
