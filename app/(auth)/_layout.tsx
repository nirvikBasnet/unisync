import { Stack } from 'expo-router'
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context'
const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack initialRouteName='home'>
        <Stack.Screen name='home' options={{ headerShown: false }} />
      </Stack>

    </SafeAreaView>
  )
}

export default Layout
