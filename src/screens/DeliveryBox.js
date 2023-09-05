import { StyleSheet, View } from 'react-native'
import ContentLoader from 'react-content-loader/native'
import DeliveryBoxGrid from '../components/DeliveryBoxGrid'

export default function DeliveryBox({ deliveryBox }) {
    return (
        <View style={styles.container}>
            {!deliveryBox && <ContentLoader width={'100%'} backgroundColor='#50b4d6' style={styles.loader} foregroundColor='#ccc' speed={0.5} />}

            {deliveryBox && <DeliveryBoxGrid deliveryBox={deliveryBox} />}
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