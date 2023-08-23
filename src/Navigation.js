import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Players from './screens/Players'
import Seeking from './screens/Seeking'
import CharacterDetailsScreen from './screens/stack/CharacterDetailsScreen'
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import useData from './hooks/useData'
import Login from './screens/Login'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

const TopTabs = createMaterialTopTabNavigator()

function TopTabsGroup() {
    return (
        <TopTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontWeight: '700'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#50b4d6',
                    height: 2
                }
            }}
        >
            <TopTabs.Screen name='main' component={Players} options={{ title: 'Players'}} />
            <TopTabs.Screen name='Seeking' component={Seeking} />
            <TopTabs.Screen name='BCNM Ranking' component={Seeking} />
        </TopTabs.Navigator>
    )
}

const Drawer = createDrawerNavigator()

function DrawerGroup() {
    const { handleLogout, token } = useData()

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name='TabGroup' component={TabGroup} options={{ title: 'Home' }} />
            {token && <Drawer.Screen name='Logout' component={TabGroup} options={{ title: 'Logout' }} listeners={{drawerItemPress: handleLogout }} />}
        </Drawer.Navigator>
    )
}

const Stack = createNativeStackNavigator()

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='TopTabsGroup' component={TopTabsGroup} options={{ headerShown: false }}/>
            <Stack.Screen
                name='CharacterDetailsScreen'
                component={CharacterDetailsScreen}
            />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

function TabGroup({ navigation }) {
    const { token, profile } = useData()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (!route.name.includes('Character-') && route.name !== 'Login') {
                        return <Image
                                    source={focused ? require('../assets/logo.png') : require('../assets/logo-gs.png')}
                                    style={styles.headerlogo}
                                />
                    }

                    if (route.name === 'Login') {
                        return <FontAwesome name="sign-in" style={styles.headerMenu} size={40} color={focused ? '#50b4d6' : '#374450'} />
                    }

                    const face = route.name.substring(route.name.indexOf('-')+1)

                    return (
                        <>
                            {focused && <Image style={styles.tabIcon} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${face}.webp` }} />}
                            {!focused && 
                                <>
                                    <Image style={{ tintColor: 'gray' }} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${face}.webp` }} />
                                    <Image style={{...styles.tabIcon, opacity: 0.5 }} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${face}.webp` }} />
                                </>
                            }
                        </>
                    )
                },
                tabBarActiveTintColor: '#374450',
                tabBarInactiveTintColor: '#374450'
            })}
        >
            <Tab.Screen
                name='HorizonXI'
                component={StackGroup}
                options={{
                    tabBarLabel: '',
                    tabBarStyle: styles.bar,
                    tabBarLabelStyle: styles.barLabel,
                    tabBarActiveTintColor: '#50b4d6',
                    title: 'HorizonXI',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <AntDesign name='menuunfold' size={24} color='#50b4d6' style={styles.hamburger} />
                        </Pressable>
                    )
                }}
            />
            {token && profile?.chars?.map((char, i) => (<Tab.Screen key={i+1} name={`Character-${char.avatar}`} component={Seeking} options={{ tabBarLabelStyle: styles.barLabel, title: char.name,tabBarLabel: char.name, tabBarStyle: styles.bar, tabBarActiveTintColor: '#50b4d6' }} />))}

            {!token && <Tab.Screen name='Login' component={Login} options={{ tabBarLabel: 'Login', tabBarStyle: styles.bar, tabBarActiveTintColor: '#50b4d6', tabBarLabelStyle: styles.barLabel }} />}
            
        </Tab.Navigator>
    )
}

export default function Navigation() {
    const systemTheme = useColorScheme()

    return (
        <NavigationContainer theme={systemTheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar style='auto' />
            <DrawerGroup />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    bar: {
        height: 90,
        paddingBottom: 10
    },
    barLabel: {
        fontWeight: 'bold',
        fontSize: 12
    },
    tabIcon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: -15
    },
    logo: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginTop: 14,
        marginLeft: 3
    },
    headerMenu: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginTop: 14,
        marginLeft: 3
    },
    headerlogo: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginTop: 22,
        marginLeft: 3
    },
    hamburger: {
        marginLeft: 15
    }
})