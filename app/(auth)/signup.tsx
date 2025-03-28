import { useState } from 'react'
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [image, setImage] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [conPasswordError, setConPasswordError] = useState('')

  const validationInput = () => {
    let isValid = true
    setNameError('')
    setEmailError('')
    if (!name.trim()) {
      setNameError('Name is required')
      isValid = false
    }
    if (!email.trim()) {
      setEmailError('Email is required')
      isValid = false
    }
    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    }
    if (!conPassword) {
      setConPasswordError('Password is required')
      isValid = false
    } else if (password !== conPassword) {
      setConPasswordError('Password does not match')
    }
    return isValid
  }

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSignup = () => {
    if (!validationInput()) return
    console.log('Sign up successful')
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
        <Text style={styles.welcomeText}>Sign Up</Text>
        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
        <View
          id="buttons"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          {/* <TouchableOpacity
            style={styles.takeButton}
            onPress={handleImagePickerPress}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Take A photo</Text>
          </TouchableOpacity> */}
        </View>
        <TextInput
          placeholder="Enter Name"
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <TextInput
          placeholder="Enter Conform Password"
          style={styles.input}
          value={conPassword}
          onChangeText={text => setConPassword(text)}
        />
        {conPasswordError ? (
          <Text style={styles.errorText}>{conPasswordError}</Text>
        ) : null}
        <TouchableOpacity style={styles.buttonLog} onPress={handleSignup}>
          <Text style={styles.loginStyle}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  welcomeText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20
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
  },
  takeButton: {
    backgroundColor: '#056EE9',
    height: 35,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10
  },
  imageStyle: {
    margin: 20,
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5
  }
})
