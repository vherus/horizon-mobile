import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MyCharacter from '../screens/MyCharacter'

const CharacterRoute = createMaterialTopTabNavigator()

export default function MyCharacterRouter({ char }) {
    return (
        <CharacterRoute.Navigator
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

            <CharacterRoute.Screen name='Equip' children={() => <MyCharacter char={char} />} options={{ title: 'Equip' }} />
            <CharacterRoute.Screen name='DBox' children={() => <MyCharacter char={char} />} options={{ title: 'DBox' }} />
        </CharacterRoute.Navigator>
    )
}