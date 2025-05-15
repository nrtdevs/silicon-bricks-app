import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import client from "@/graphql/client";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/RoleContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    barlow: require("../assets/fonts/Barlow-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <ThemeProvider>
          <ApolloProvider client={client}>
            <UserProvider>
              <Stack
                screenOptions={{ headerShown: false }}
                initialRouteName="index"
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(vehicle)"/>
              </Stack>
            </UserProvider>
          </ApolloProvider>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
