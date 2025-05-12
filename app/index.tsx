import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, Text, View } from "react-native";

const Index = () => { 
  const getToken = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
    if (!storedData) return null;
    let parsedUserData = JSON.parse(storedData);
    return parsedUserData.accessToken;
  };

  useEffect(() => {
    getToken();
  }, []);

  if(!getToken()) return <Redirect href="/(auth)/login" />

   return (
    <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>index</Text>
      <Text>index</Text> 
      <Text>index</Text>

    </SafeAreaView>
   )
};

export default Index;
 
