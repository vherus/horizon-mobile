import { Image, StyleSheet, Text, View } from 'react-native'

export default function EquipmentGrid({ equipment }) {
    const getImage = (slot) => {
        const trimmedSlot = slot.replaceAll(' ', '')

        if (equipment[trimmedSlot].itemid) {
            return <Image style={styles.itemImg} source={{ uri: `https://static.ffxiah.com/images/icon/${equipment[trimmedSlot].itemid}.png` }}/>
        }

        return <Text>{slot.toUpperCase()}</Text>
    }

    return (
        <>
            {equipment && 
                <View style={styles.itemGrid}>
                    <View style={styles.itemRow}>
                        <View style={styles.itemColumn}>
                            {getImage('main')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('sub')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('ranged')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('ammo')}
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View style={styles.itemColumn}>
                            {getImage('head')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('neck')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('ear 1')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('ear 2')}
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View style={styles.itemColumn}>
                            {getImage('body')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('hands')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('ring 1')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('ring 2')}
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View style={styles.itemColumn}>
                            {getImage('back')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('waist')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('legs')}
                        </View>
                        <View style={styles.itemColumn}>
                            {getImage('feet')}
                        </View>
                    </View>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    itemGrid: {
        justifyContent: 'space-between',
        // marginTop: 60,
        padding: 20
    },
    itemColumn: {
        height: 80,
        width: 80,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    itemImg: {
        height: 55,
        width: 55
    }
})