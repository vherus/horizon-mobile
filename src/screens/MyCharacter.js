import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useData from '../hooks/useData'
import { useEffect, useState } from 'react'

export default function MyCharacter({ char }) {
    const { getBalance } = useData()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        getBalance().then(console.log)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>{char.name}</Text>
            <Text>{balance}</Text>
        </SafeAreaView>
    )
}