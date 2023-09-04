import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CharacterDetailsCard from '../../components/CharacterDetailsCard'
import { useLayoutEffect, useState } from 'react'
import EquipmentGrid from '../../components/EquipmentGrid'
import { getEquipment } from '../../utils/apiClient'
import ContentLoader from 'react-content-loader/native'
import { StyleSheet } from 'react-native'

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
            {!equipment && <ContentLoader width={'100%'} backgroundColor='#50b4d6' style={styles.loader} foregroundColor='#ccc' speed={0.5} />}

            {equipment && (
                <>
                    <CharacterDetailsCard character={params.character} />
                    <EquipmentGrid equipment={equipment} />
                </>
            )}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loader: {
        marginLeft: 20,
        marginTop: 50,
        width: '50%'
    }
})