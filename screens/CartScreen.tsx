import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

const CartScreen = () => {
    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor='#f4338f' barStyle="light-content"/>
            <Text>Cart Screen</Text>
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

export default CartScreen