import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';


const HomeScreen:React.FC<{navigation: any}> = ({navigation}) => {

    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor='#f4338f' barStyle="light-content"/>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default HomeScreen;

