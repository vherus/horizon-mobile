import { createDrawerNavigator } from "@react-navigation/drawer"
import useData from "../hooks/useData"
import BottomRouter from "./BottomRouter"

const Drawer = createDrawerNavigator()

export default function SideDrawer() {
    const { handleLogout, token } = useData()

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name='TabGroup' component={BottomRouter} options={{ title: 'Home' }} />
            {token && <Drawer.Screen name='Logout' component={BottomRouter} options={{ title: 'Logout' }} listeners={{drawerItemPress: handleLogout }} />}
        </Drawer.Navigator>
    )
}