import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';

const HomeScreen:React.FC<{navigation: any}> = ({navigation}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <View>
            {
            loggedIn
            ?
            <Text>Home Screen</Text>
            :
            <LoginScreen navigation = {navigation}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({});

export default HomeScreen;

