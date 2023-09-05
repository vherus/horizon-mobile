import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MyCharacter from '../screens/MyCharacter'
import DeliveryBox from '../screens/DeliveryBox'
import useData from '../hooks/useData'
import { useEffect, useState } from 'react'

const CharacterRoute = createMaterialTopTabNavigator()

export default function MyCharacterRouter({ char }) {
    const { getDeliveryBox } = useData()
    const [deliveryBox, setDeliveryBox] = useState({ receive: null, send: null })

    useEffect(() => {
        getDeliveryBox(char.name).then(setDeliveryBox)
    }, [])

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
            <CharacterRoute.Screen name='DBoxIn' children={() => <DeliveryBox deliveryBox={deliveryBox.receive} />} options={{ title: 'D.Box In' }} />
            <CharacterRoute.Screen name='DBoxOut' children={() => <DeliveryBox deliveryBox={deliveryBox.send} />} options={{ title: 'D.Box Out' }} />
        </CharacterRoute.Navigator>
    )
}