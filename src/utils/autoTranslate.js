import { Image, Text, StyleSheet } from "react-native"

export default function formatAutoTranslateMessage(message) {
    const splitMsg = message.split(/([«»])/)
    const filtered = splitMsg.map(s => s.trim()).filter(s => s !== '')

    return filtered.map(s => {
        if (s === '«') {
            return <Image style={styles.text} source={require(`../../assets/autotranslate-left.png`)} />
        }

        if (s === '»') {
            return <Image style={styles.text} source={require(`../../assets/autotranslate-right.png`)} />
        }

        return <Text >{s}</Text>
    })
}

const styles = StyleSheet.create({
    text: {
        marginBottom: -8
    }
})