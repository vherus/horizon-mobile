import { SafeAreaView } from 'react-native-safe-area-context'
import useData from '../hooks/useData'
import { useState } from 'react'
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin } = useData()

    return (
        <SafeAreaView style={styles.formContainer}>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder='Username'
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder='Password'
            />
            <Pressable onPress={() => handleLogin(username, password)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    input: {
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#a8bec3',
        borderStyle: 'solid',
        borderWidth: StyleSheet.hairlineWidth
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#50b4d6',
        padding: 6,
        borderRadius: 8
    },
    buttonText: {
        color: '#FFFFFF',
        padding: 8,
        fontSize: 16,
    }
})