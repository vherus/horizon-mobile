import { Image, Pressable, StyleSheet } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import useData from '../hooks/useData';
import Seeking from '../screens/Seeking';
import Login from '../screens/Login';
import HomeStackGroup from './HomeStackGroup';

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
                        return <FontAwesome name="sign-in" style={styles.navItem} size={40} color={focused ? '#50b4d6' : '#374450'} />
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
                tabBarActiveTintColor: '#374450',
                tabBarInactiveTintColor: '#374450'
            })}
        >
            <Tab.Screen
                name='HorizonXI'
                component={HomeStackGroup}
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