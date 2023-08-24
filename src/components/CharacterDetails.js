import React from 'react'
import { StyleSheet, View, Image, Text, useColorScheme } from 'react-native'

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

const CharacterDetails = ({ character }) => {
    const theme = useColorScheme()

    return (
        <View style={styles.singleItem}>
            <View style={styles.row}>
                {avatar(character.avatar)}
                <View style={styles.contentContainer}>
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
                        <Text
                        style={[
                        styles.description,
                        styles.seacom,
                        { color: theme === 'dark' ? '#FFF' : '#000' },
                        ]}
                        >
                            {character.seacom_message}
                        </Text>
                    }
                </View>
            </View>

            <View style={styles.itemGrid}>
                <View style={styles.itemRow}>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/16466.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/12290.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/17152.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/17318.png' }}/>
                    </View>
                </View>
                <View style={styles.itemRow}>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/12454.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/16466.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/16466.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/17152.png' }}/>
                    </View>
                </View>
                <View style={styles.itemRow}>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/16466.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/16466.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/16466.png' }}/>
                    </View>
                    <View style={styles.itemColumn}>
                        <Image style={styles.itemImg} source={{ uri: 'https://static.ffxiah.com/images/icon/17152.png' }}/>
                    </View>
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
        height: 44,
        width: 44,
        borderRadius: 22,
        marginRight: 16,
        flexShrink: 0,
        marginTop: 4,
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
        color: '#000',
    },
    seacom: {
        fontStyle: 'italic'
    },
    singleItem: {
        paddingHorizontal: 16,
        minHeight: 44,
        flex: 1,
        padding: 16,
    },
    rowTop: {
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    itemGrid: {
        justifyContent: 'space-between',
        marginTop: 20
    },
    contentContainer: {
        flexShrink: 1,
        flexGrow: 1,
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

export default CharacterDetails