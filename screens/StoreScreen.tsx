import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const StoreScreen = () => {
    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor='#f4338f' barStyle="light-content"/>
            <Text>Store Screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default StoreScreen