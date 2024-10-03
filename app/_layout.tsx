import { Stack, useRouter, useSegments } from "expo-router";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";



export default function RootLayout() {
  const [initializing, setInitilizing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  //for routing
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitilizing(false);

  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, []);



  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)'

    if (user && !inAuthGroup) {
      router.replace('/(auth)/home');
    } else if (!user && inAuthGroup) {
      router.replace('/')
    }

  }, [user, initializing]);



  if (initializing) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }



  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
