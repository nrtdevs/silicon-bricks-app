import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

const Index = () => {
  const [token, setToken] = React.useState<string | null>(null)

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('accessToken')
    setToken(token)
    return token // Make sure the key is "accessToken" if you're using that.
  }

  React.useEffect(() => {
    getToken()
  }, [])
  return token ? (
    <Redirect href="/(drawer)" />
  ) : (
    <Redirect href="/(auth)/login" />
  )
}

export default Index

const styles = StyleSheet.create({})
