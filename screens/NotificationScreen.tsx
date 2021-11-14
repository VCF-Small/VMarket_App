import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NotificationScreen = () => {
    return (
        <View style={styles.Container}>
            <Text>Notification Screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default NotificationScreen