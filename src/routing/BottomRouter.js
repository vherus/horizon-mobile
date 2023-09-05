import { Image, Pressable, StyleSheet } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import useData from '../hooks/useData'
import Login from '../screens/Login'
import HomeStackGroup from './HomeStackGroup'
import { STYLES } from '../utils/constants'
import MyCharacterRouter from './MyCharacterRouter'

const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs')

const Tab = createBottomTabNavigator()

export default function BottomRouter({ navigation }) {
    const { token, profile } = useData()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (!route.name.includes('Character-') && route.name !== 'Login') {
                        return <Image
                                    source={focused ? require('../../assets/logo.png') : require('../../assets/logo-gs.png')}
                                    style={styles.horizonLogo}
                                />
                    }

                    if (route.name === 'Login') {
                        return <FontAwesome name="sign-in" style={styles.navItem} size={40} color={focused ? STYLES.primaryColour : STYLES.secondaryColour} />
                    }

                    const face = route.name.substring(route.name.indexOf('-')+1)

                    return (
                        <>
                            {focused && <Image style={styles.tabIcon} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${face}.webp` }} />}
                            {!focused && 
                                <>
                                    <Image style={{ tintColor: 'gray' }} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${face}.webp` }} />
                                    <Image style={{ ...styles.tabIcon, opacity: 0.5 }} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${face}.webp` }} />
                                </>
                            }
                        </>
                    )
                },
                tabBarActiveTintColor: STYLES.secondaryColour,
                tabBarInactiveTintColor: STYLES.secondaryColour
            })}
        >
            <Tab.Screen
                name='HorizonXI'
                component={HomeStackGroup}
                options={{
                    tabBarLabel: '',
                    tabBarStyle: styles.bar,
                    tabBarLabelStyle: styles.barLabel,
                    tabBarActiveTintColor: STYLES.primaryColour,
                    title: 'HorizonXI',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.openDrawer()}>
                            <AntDesign name='menuunfold' size={24} color={STYLES.primaryColour} style={styles.hamburger} />
                        </Pressable>
                    )
                }}
            />
            {token && 
                profile?.chars?.map((char, i) => (
                    <Tab.Screen
                        key={i+1}
                        name={`Character-${char.avatar}`}
                        children={() => <MyCharacterRouter char={char} />}
                        options={{
                            tabBarLabelStyle: styles.barLabel,
                            title: char.name,
                            tabBarLabel: char.name,
                            tabBarStyle: styles.bar,
                            tabBarActiveTintColor: STYLES.primaryColour
                        }}
                    />
                ))
            }

            {!token && 
                <Tab.Screen
                    name='Login'
                    component={Login}
                    options={{
                        tabBarLabel: 'Login',
                        tabBarStyle: styles.bar,
                        tabBarActiveTintColor: STYLES.primaryColour,
                        tabBarLabelStyle: styles.barLabel
                    }}
                />
            }
            
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    horizonLogo: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginTop: 22,
        marginLeft: 3
    },
    navItem: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginTop: 14,
        marginLeft: 3
    },
    tabIcon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: -15
    },
    bar: {
        height: 90,
        paddingBottom: 10
    },
    barLabel: {
        fontWeight: 'bold',
        fontSize: 12
    },
    hamburger: {
        marginLeft: 15
    }
})