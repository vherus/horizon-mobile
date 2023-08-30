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
import ContentLoader from 'react-content-loader/native'
  
export default function Players() {
    const [searchQuery, setSearchQuery] = useState('')
    const { chars, refreshChars, isRefreshing } = useData()

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
                onRefresh={refreshChars}
                refreshing={isRefreshing}
                renderItem={({ item }) => {
                    if (isRefreshing) {
                        return <ContentLoader width={'100%'} backgroundColor='#50b4d6' style={styles.loader} foregroundColor='#ccc' speed={0.5} />
                    } 
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
    loader: {
        marginLeft: 20,
        width: '50%'
    }
})