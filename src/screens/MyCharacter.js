import { StyleSheet, View } from 'react-native'
import useData from '../hooks/useData'
import { useEffect, useState } from 'react'
import { getChar, getEquipment } from '../utils/apiClient'
import ContentLoader from 'react-content-loader/native'
import CharacterDetailsCard from '../components/CharacterDetailsCard'
import EquipmentGrid from '../components/EquipmentGrid'

export default function MyCharacter({ char }) {
    const { getBalance } = useData()
    const [equipment, setEquipment] = useState(null)
    const [character, setCharacter] = useState(null)
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        getChar(char.name).then(c => {
            c.charname = char.name
            setCharacter(c)
        })

        getBalance(char.name).then(setBalance)

        getEquipment(char.name).then(setEquipment)
    }, [])

    return (
        <View style={styles.container}>
            {!equipment && !character && <ContentLoader width={'100%'} backgroundColor='#50b4d6' style={styles.loader} foregroundColor='#ccc' speed={0.5} />}

            {equipment && character && (
                <>
                    <CharacterDetailsCard character={character} balance={balance} hideName={true} />
                    <EquipmentGrid equipment={equipment} />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        marginLeft: 20,
        marginTop: 10,
        width: '50%'
    },
    container: {
        marginTop: 10
    }
})