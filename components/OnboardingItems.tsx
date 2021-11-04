import React from 'react'
import { StyleSheet, View, useWindowDimensions, Image, Text } from 'react-native'

const OnboardingItems:React.FC<{item: any}> = ({ item}) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.Container, {width}]}>
            <Image source={item.image} style={[styles.Image, {width, resizeMode: 'contain'}]} />
            <View style={[{flex: 0.3}]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});

export default OnboardingItems
