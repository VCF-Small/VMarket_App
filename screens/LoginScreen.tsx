import React, { useEffect, useState } from 'react'
import { StatusBar, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env'
import Toast from 'react-native-toast-message';

const LoginScreen:React.FC<{navigation: any, setLoggedIn:any}> = ({setLoggedIn,navigation}) => {

    const [isHidden, setIsHidden] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const handleLogin = async () => {
        try {
            setIsDisabled(true);
            var res = await axios.post(`${API_URL}/auth/login`, {
                email: username,
                password: password
            })
            if(res.status == 200){
                await AsyncStorage.setItem('@LoggedIn',res.data.stkn)
                setIsDisabled(false);
                Toast.show({
                    type: 'success',
                    text1: res.data.message,
                  });
                setLoggedIn(true);
            }

        }catch (error: any) {
            console.log(error.config)
            Toast.show({
                type: 'error',
                text1: error.response? error.response.data.message: error.message,
              });
            setIsDisabled(false);
        }
    }


    return (
        <View style={[styles.Container,{position: 'relative'}]}>
            <StatusBar backgroundColor='#f4338f' barStyle="light-content"/>
            <View style={styles.TopContainer}>
                <Text style={styles.title}>Welcome !!</Text>
            </View>
            <View style={styles.BottomContainer}>
                <View>
                    <Text style={styles.lable}>Username</Text>
                    <View style={styles.inputText}>
                        <Image source={require('../assets/user.png')} style={{height: 20, width: 20}} />
                        <TextInput 
                            placeholder="Your Username"
                            value={username}
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{marginTop: -14, paddingLeft: 10, color: '#05375a'}}
                            onChangeText={(username)=>{setUsername(username)}}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.lable}>Password</Text>
                    <View style={styles.inputText}>
                        <Image source={require('../assets/lock.png')} style={{height: 20, width: 20}} />
                        <TextInput 
                            value={password}
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            secureTextEntry={isHidden? true: false}
                            style={{marginTop: -14, paddingHorizontal: 10, color: '#05375a'}}
                            onChangeText={(password)=>{setPassword(password)}}
                        />
                        <TouchableOpacity onPress={ () => {setIsHidden(!isHidden);}}>
                            <Image source={isHidden?require('../assets/hidden.png'): require('../assets/show.png')} style={{height: 20, width: 20}} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Button title="Sign In" onPress={()=> {handleLogin()}} disabled={isDisabled}/>

                <TouchableOpacity>
                    <Text style={[styles.lable, {color: '#05375a', fontSize: 14, textAlign: 'center', marginTop: 30}]}>Forgot Password ?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                    <Text style={[styles.lable, {color: '#0275d8', fontSize: 14, textAlign: 'center', marginTop: 30}]}>Create an Account, Click Here !</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: '800',
        fontSize: 40,
    },
    TopContainer: {
        flex: 0.08,
        borderBottomEndRadius: 180, 
        backgroundColor: '#f4338f', 
        width: '100%',
        height: 180,
        justifyContent: 'flex-end', 
        position: 'absolute', 
        top: 0,
        padding: 50
    },
    BottomContainer: {
        position: 'absolute',
        top: 250,
    },
    lable: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f4338f',
    },
    inputText: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    errorMessage: {
        fontSize: 14,
        color: '#ff0e0e',
        marginTop: -15
    }
})

export default LoginScreen

