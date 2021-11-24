import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";


const ProfileScreen = () => {
    const [userData, setUserData]: any =useState();



    useEffect(() => {
        const getData = async () =>{
            const data: any = await AsyncStorage.getItem('@LoggedIn');
            const user: any = jwt_decode(data);
            setUserData(user.id);
        }
        getData();
    },[])
    
    return (
        <View style={styles.Container}>
            <Text>Profile Screen</Text>
            <Text>{userData?.firstname +" "+ userData?.lastname}</Text>
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

export default ProfileScreen