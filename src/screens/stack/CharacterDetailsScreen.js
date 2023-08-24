import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterDetailsCard from '../../components/CharacterDetailsCard'
import { useLayoutEffect, useState } from 'react'
import EquipmentGrid from '../../components/EquipmentGrid'
import { getEquipment } from '../../utils/apiClient'

export default function CharacterDetailsScreen() {
    const [equipment, setEquipment] = useState(null)
    const navigation = useNavigation()
    const route = useRoute()
    const { params } = route

    useLayoutEffect(() => {
        const { charname } = params.character

        getEquipment(charname).then(setEquipment)

        navigation.setOptions({
            headerTitle: charname
        })
    }, [])

    return (
        <SafeAreaView>
            <CharacterDetailsCard character={params.character} />

            <EquipmentGrid equipment={equipment} />
        </SafeAreaView>
    )
}