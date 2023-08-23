import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterDetails from '../../components/CharacterDetails'
import { useLayoutEffect } from 'react'

export default function CharacterDetailsScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const { params } = route

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: params.character.charname
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CharacterDetails character={params.character} />
        </SafeAreaView>
    )
}