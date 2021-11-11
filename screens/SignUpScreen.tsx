import React, { useState } from 'react'
import { StatusBar, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Toast from 'react-native-toast-message';
import { API_URL } from '@env'
import axios from 'axios';



const SignUpScreen:React.FC<{navigation: any}> = ({navigation}) => {

    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] = useState(true);
    const [selectedGender, setSelectedGender] = useState("Select");
    const [isDisabled, setIsDisabled] = useState(false);
    const [data, setData] = useState({"firstName": "", "lastName": "", "gender": "", "age": "", "email": "", "password": "", "confirmPassword": ""});
    const [error, setError] = useState({"IsFirstName": false, "IsLastName": false, "IsGender": false, "IsEmail": false,"IsPassword": false, "IsConfirmPassword": false, "IsAge": false});

    const handleSignUp = async () =>{
        try{
            setIsDisabled(true);
            const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            setError({
                "IsFirstName":data.firstName.trim()? false: true, 
                "IsLastName":data.lastName.trim()? false: true, 
                "IsGender":data.gender.trim()? false: true,
                "IsAge":data.age.trim()? false: true,
                "IsEmail":data.email.trim()? !regexp.test(data.email) : true,
                "IsPassword":data.password.trim()? false: true,
                "IsConfirmPassword":data.confirmPassword.trim()? data.confirmPassword.trim() != data.password.trim() : true
            })
            console.log(error, data)

            if(!error.IsPassword && !error.IsConfirmPassword && !error.IsEmail && !error.IsFirstName && !error.IsLastName && !error.IsGender && !error.IsAge){
                try{
                    var res = await axios.post(`${API_URL}/auth/register`, {
                        "firstname" : data.firstName,
                        "lastname": data.lastName,
                        "age": parseInt(data.age),
                        "gender": data.gender,
                        "email": data.email,
                        "password": data.password
                    })
                    if(res.status == 200){
                        setIsDisabled(false);
                        Toast.show({
                            type: 'success',
                            text1: res.data.message,
                          });
                          navigation.goBack();
                    }
                } 
                catch(error: any){
                    setIsDisabled(false);
                    Toast.show({
                        type: 'error',
                        text1: error.message,
                      });
                }   
            }
            else{
                setIsDisabled(false);
                Toast.show({
                    type: 'error',
                    text1: 'Invalid credentials',
                  });
            }
        }
        catch(err: any){
            Toast.show({
                type: 'error',
                text1: err.message,
              });
        }
    }

    return (
        <View style={[styles.Container,{position: 'relative'}]}>
            <StatusBar backgroundColor='#f4338f' barStyle="light-content"/>
            <View style={styles.TopContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Image source={require('../assets/back.png')} style={{height: 20, width: 20, marginTop: -30, marginLeft: -30}} />
                </TouchableOpacity>
                <Text style={styles.title}>Create an Account !!</Text>
            </View>
            <View style={styles.BottomContainer}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={styles.lable}>First Name</Text>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder="Your First Name"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            style={{marginTop: -14, color: '#05375a'}}
                            onChangeText={(value: string) => {setData({...data, "firstName": value.trim() })}}
                        />
                    </View>
                    {error.IsFirstName&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>
                <View>
                    <Text style={styles.lable}>Last Name</Text>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder="Your Last Name"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            style={{marginTop: -14, color: '#05375a'}}
                            onChangeText={(value: string) => {setData({...data, "lastName": value.trim() })}}
                        />
                    </View>
                    {error.IsLastName&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>
                </View>
                
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={styles.lable}>Gender</Text>
                    <View style={[styles.inputText, {paddingVertical: -10, marginLeft:-10 ,marginTop: -5}]}>
                        <Picker
                            itemStyle={styles.itemStyle}
                            mode="dropdown"
                            selectedValue={selectedGender}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue: string, itemIndex: number) => {setSelectedGender(itemValue); setData({...data, "gender": itemValue.trim()})}}
                        >
                            <Picker.Item label="Select" value="Select" enabled={false} />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                    {error.IsGender&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>
                <View>
                    <Text style={styles.lable}>Age</Text>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder="Your Age"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            style={{marginTop: -14, color: '#05375a'}}
                            onChangeText={(value: string) => {setData({...data, "age": value.trim() })}}
                        />
                    </View>
                    {error.IsAge&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>
                </View>

                <View>
                    <Text style={styles.lable}>Email</Text>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            style={{marginTop: -14, color: '#05375a', flex: 1}}
                            onChangeText={(value: string) => {setData({...data, "email": value.trim() })}}
                        />
                    </View>
                    {error.IsEmail&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>

                <View>
                    <Text style={styles.lable}>Password</Text>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            secureTextEntry={isHiddenPassword? true: false}
                            style={{marginTop: -14, color: '#05375a', flex: 1}}
                            onChangeText={(value: string) => {setData({...data, "password": value.trim() })}}
                        />
                        <TouchableOpacity onPress={ () => {setIsHiddenPassword(!isHiddenPassword);}}>
                            <Image source={isHiddenPassword?require('../assets/hidden.png'): require('../assets/show.png')} style={{height: 20, width: 20}} />
                        </TouchableOpacity>
                    </View>
                    {error.IsPassword&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>
                <View>
                    <Text style={styles.lable}>Confirm Password</Text>
                    <View style={styles.inputText}>
                        <TextInput 
                            placeholder="Confirm Password"
                            placeholderTextColor="#666666"
                            autoCapitalize="none"
                            secureTextEntry={isHiddenConfirmPassword? true: false}
                            style={{marginTop: -14, color: '#05375a', flex: 1}}
                            onChangeText={(value: string) => {setData({...data, "confirmPassword": value.trim() })}}
                        />
                        <TouchableOpacity onPress={ () => {setIsHiddenConfirmPassword(!isHiddenConfirmPassword);}}>
                            <Image source={isHiddenConfirmPassword?require('../assets/hidden.png'): require('../assets/show.png')} style={{height: 20, width: 20}} />
                        </TouchableOpacity>
                    </View>
                    {error.IsConfirmPassword&&<Text style={styles.errorMessage}>Invalid Credentials</Text>}
                </View>

                <TouchableOpacity>
                    <Button title="Sign Up" disabled={isDisabled} onPress={()=>{handleSignUp()}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Text style={[styles.lable, {color: '#0275d8', fontSize: 14, textAlign: 'center', marginTop: 30}]}>Already have an Account, Click Here !</Text>
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
        flexDirection: 'row',
        borderBottomEndRadius: 200, 
        backgroundColor: '#f4338f', 
        width: '100%',
        height: 200,
        justifyContent: 'flex-end', 
        position: 'absolute', 
        top: 0,
        padding: 50
    },
    BottomContainer: {
        position: 'absolute',
        top: 230,
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
    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#007aff"
    },
    pickerStyle: {
        width: 133,
        height: 20,
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#05375a",
    },
    errorMessage: {
        color: '#ff0e0e',
        fontSize: 12,
        marginTop: -22,
        paddingBottom: 10,

    },
})


export default SignUpScreen