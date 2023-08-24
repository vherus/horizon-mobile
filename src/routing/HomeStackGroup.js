import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CharacterDetailsScreen from "../screens/stack/CharacterDetailsScreen"
import HomeTopNav from "./HomeTopNav"

const Stack = createNativeStackNavigator()

export default function HomeStackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeGroup' component={HomeTopNav} options={{ headerShown: false }}/>
            <Stack.Screen
                name='CharacterDetailsScreen'
                component={CharacterDetailsScreen}
            />
        </Stack.Navigator>
    )
}