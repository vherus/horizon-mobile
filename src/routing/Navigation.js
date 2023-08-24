import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SideDrawer from './SideDrawer'

export default function Navigation() {
    const systemTheme = useColorScheme()

    return (
        <NavigationContainer theme={systemTheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar style='auto' />
            <SideDrawer />
        </NavigationContainer>
    )
}
