import { StyleSheet, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useData from '../hooks/useData'
import { useEffect, useState } from 'react'
import { getChar, getEquipment } from '../utils/apiClient'
import ContentLoader from 'react-content-loader/native'
import CharacterDetailsCard from '../components/CharacterDetailsCard'
import EquipmentGrid from '../components/EquipmentGrid'
import { useNavigation } from '@react-navigation/native'

export default function MyCharacter({ char }) {
    const { getBalance } = useData()
    const [balance, setBalance] = useState(0)
    const [equipment, setEquipment] = useState(null)
    const [character, setCharacter] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        getChar(char.name).then(c => {
            c.charname = char.name
            setCharacter(c)
        })
        getBalance(char.name).then(b => {
            navigation.setOptions({
                headerTitle: () => <Text style={styles.gilWrapper}><Image style={styles.gil} source={require('../../assets/gil.png')} />&nbsp;{b.toLocaleString('en')}</Text>
            })

            setBalance(b)
        })
        getEquipment(char.name).then(setEquipment)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!equipment && !character && <ContentLoader width={'100%'} backgroundColor='#50b4d6' style={styles.loader} foregroundColor='#ccc' speed={0.5} />}

            {equipment && character && (
                <>
                    <CharacterDetailsCard character={character} />
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
    },
    gilWrapper: {
        lineHeight: 20,
        marginBottom: 20,
        fontSize: 18
    },
    gil: {
        maxHeight: 30,
        maxWidth: 30,
        marginBottom: -8
    },
})