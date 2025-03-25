import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Image,
  Pressable
} from 'react-native'
import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const validationInput = () => {
    let isValid = true
    setEmailError('')
    if (!email.trim()) {
      setEmailError('Email is required')
      isValid = false
    }
    return isValid
  }
  const handleForgot = () => {
    if (validationInput()) return
    console.log('Otp send successful')
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          margin: 30
        }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={false}
      >
        <Image
          source={require('../../assets/images/react-logo.png')}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            borderRadius: 50,
            margin: 10
          }}
        />
        <Text style={styles.welcomeText1}>Forgot Password</Text>
        <Text
          style={{
            marginTop: 20,
            color: 'black',
            fontSize: 16,
            fontWeight: '400'
          }}
        >
          Forgot Password
        </Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        ></TextInput>
        <Pressable style={styles.buttonLog}>
          <Text style={styles.loginStyle}>Get OTP</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  welcomeText1: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center'
  },
  input: {
    padding: 13,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5
  },
  buttonLog: {
    padding: 10,
    backgroundColor: '#056EE9',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center'
  },
  loginStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
  }
})
export default ForgotPassword
