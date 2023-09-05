import React from 'react'
import { StyleSheet, View, Image, Text, useColorScheme } from 'react-native'
import formatAutoTranslateMessage from '../utils/autoTranslate';
import { SEACOM_TYPES } from '../utils/constants';

const avatar = (avatarId) => {
    return <Image style={styles.avatar} source={{ uri: `https://horizonxi.com/images/account/create-character/face/${avatarId}.webp` }} />;
}

const nationFlag = (nation) => {
    // Sandy, Bastok, Windy
    const flags = ['Ffxi_flg_03', 'Ffxi_flg_01l', 'Ffxi_flg_04l']

    return <Image style={styles.nation} source={{ uri: `https://horizonxi.com/${flags[nation]}.jpg` }} />
}

const GrayText = ({ children, numberOfLines, style }) => {
    return (
        <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
            {children}
        </Text>
    )
}

const CharacterDetailsCard = ({ character, hideName = false, balance = null }) => {
    const theme = useColorScheme()

    return (
        <View style={styles.singleItem}>
            <View style={styles.row}>
                {avatar(character.avatar)}
                <View style={styles.contentContainer}>
                    {!hideName && 
                        <View style={styles.rowTop}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.header,
                                    { color: theme === 'dark' ? '#FFF' : '#000' },
                                ]}
                            >
                                {character.charname}
                            </Text>
                        </View>
                    }

                    {balance !== null && <Text style={styles.gilWrapper}><Image style={styles.gil} source={require('../../assets/gil.png')} />&nbsp;{balance.toLocaleString('en')}</Text>}

                    <Text
                        style={[
                            styles.description,
                            { color: theme === 'dark' ? '#FFF' : '#000' },
                        ]}
                    >
                        {character.jobString}
                        <GrayText>&nbsp;•&nbsp;</GrayText>
                        <GrayText>
                            {nationFlag(character.nation)}
                        </GrayText>
                        <GrayText>&nbsp;{character.rank}</GrayText>
                    </Text>
                    
                    {character.seacom_message &&
                        <View>
                            <Text style={[styles.seacomType, { color: SEACOM_TYPES[character.seacom_type].color }]}>• {SEACOM_TYPES[character.seacom_type].type}</Text>
                            <Text
                                style={[
                                styles.description,
                                styles.seacom,
                                { color: theme === 'dark' ? '#FFF' : '#000' },
                                ]}
                            >
                                
                                {formatAutoTranslateMessage(character.seacom_message)}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gray: {
        color: '#777',
        fontSize: 14
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 16,
        marginTop: 5,
        flexShrink: 0,
    },
    gilWrapper: {
        marginTop: 5,
        fontSize: 14
    },
    gil: {
        maxHeight: 20,
        maxWidth: 20,
        marginBottom: -4
    },
    nation: {
        height: 18,
        width: 18
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 4,
        paddingRight: 4,
        color: '#000',
    },
    description: {
        fontSize: 14,
        color: '#000'
    },
    seacom: {
        fontStyle: 'italic'
    },
    seacomType: {
        fontSize: 12,
        fontStyle: 'italic'
    },
    singleItem: {
        minHeight: 44,
        display: 'flex',
        // paddingLeft: 16,
        padding: 16,
    },
    rowTop: {
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
    },
    contentContainer: {
        flexGrow: 1,
        flexShrink: 1
    },
})

export default CharacterDetailsCard