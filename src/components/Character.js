import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import CharacterDetails from './CharacterDetails'

export default function Character({ character }) {
    const { navigate } = useNavigation()

    return (
        <Pressable
            onPress={() => {
                navigate('CharacterDetailsScreen', { character })
            }}
        >
            <CharacterDetails character={character} />
        </Pressable>
    )
}