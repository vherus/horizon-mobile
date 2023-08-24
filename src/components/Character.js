import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import CharacterDetailsCard from './CharacterDetailsCard'

export default function Character({ character }) {
    const { navigate } = useNavigation()

    return (
        <Pressable
            onPress={() => {
                navigate('CharacterDetailsScreen', { character })
            }}
        >
            <CharacterDetailsCard character={character} />
        </Pressable>
    )
}