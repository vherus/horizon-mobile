import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Pressable,
} from 'react-native'
import Character from '../components/Character'
import { useState } from 'react'
import useData from '../hooks/useData'
  
export default function Players() {
    const [searchQuery, setSearchQuery] = useState('')
    const { chars, refreshChars } = useData()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={{ color: 'black' }}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder='Search for a player...'
                />
            </View>
            
            <FlatList
                data={searchQuery.length ? chars.chars.filter(c => c.charname.toLowerCase().includes(searchQuery.toLowerCase())) : chars.chars}
                keyExtractor={(item) => {
                    return item.charname;
                }}
                renderItem={({ item }) => {
                    return <Character character={item} />;
                }}
                ListHeaderComponent={() => (
                    <Pressable onPress={refreshChars}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>{chars.total ? `${chars.total} Online` : 'Loading...'}</Text>
                        </View>
                    </Pressable>
                )}
                ListHeaderComponentStyle={{ backgroundColor: '#ccc' }}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    searchContainer: {
        padding: 15
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#DDD',
    },
    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#50b4d6',
    },
    headerTitle: {
        color: '#FFFFFF',
        padding: 8,
        borderRadius: 12,
        fontSize: 14,
    },
})