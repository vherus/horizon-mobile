import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function DeliveryBoxGrid({ deliveryBox }) {
    const [box, setBox] = useState([])

    useEffect(() => {
        const chunkSize = 4

        if (deliveryBox && deliveryBox.length) {
            const chunks = []

            for (let i = 0; i < deliveryBox.length; i += chunkSize) {
                const chunk = deliveryBox.slice(i, i + chunkSize)

                if (chunk.length < 4) {
                    for (let j = 0; j < (4 - chunk.length); j++) {
                        chunk.push(null)
                    }
                }

                chunks.push(chunk)
            }

            setBox(chunks)
        }
    }, [deliveryBox])

    return (
        <View style={styles.itemGrid}>
            {box.length < 1 && <Text>Empty</Text>}

            {box.length > 0 && 
                box.map((chunk, i) => {
                    return (
                        <View key={i} style={styles.itemRow}>
                            {chunk.map((item, j) => {
                                if (item === null) {
                                    return <View key={j} style={styles.itemColumn}><Text>N/A</Text></View>
                                }

                                return (
                                    <View key={j} style={styles.itemColumn}>
                                        <Image style={styles.itemImg} source={{ uri: `https://static.ffxiah.com/images/icon/${item.itemid}.png` }}/>
                                    </View>
                                )
                            })}
                        </View>
                    )
                })
            }
        </View>
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