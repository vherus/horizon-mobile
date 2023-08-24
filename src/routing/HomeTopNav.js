import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Players from '../screens/Players'
import Seeking from '../screens/Seeking'

const HomeRoute = createMaterialTopTabNavigator()

export default function HomeTopNav() {
    return (
        <HomeRoute.Navigator
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
            <HomeRoute.Screen name='Players' component={Players} options={{ title: 'Players'}} />
            <HomeRoute.Screen name='Seeking' component={Seeking} />
            <HomeRoute.Screen name='Yells' component={Seeking} />
        </HomeRoute.Navigator>
    )
}