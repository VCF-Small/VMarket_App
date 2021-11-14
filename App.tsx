/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet, Text, View,
} from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Toast from 'react-native-toast-message';
import HistoryScreen from './screens/HistoryScreen';
import CartScreen from './screens/CartScreen';
import StoreScreen from './screens/StoreScreen';
import RNLocation from 'react-native-location';
import opencage from 'opencage-api-client';
import CountryFlag from "react-native-country-flag";
import NotificationScreen from './screens/NotificationScreen';
import InfoScreen from './screens/InfoScreen';
import ProfileScreen from './screens/ProfileScreen';

RNLocation.configure({
  distanceFilter: 0
})

const AppStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <ActivityIndicator size="large" color="#f4338f" />
    </View>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewOnboarding] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [location, setLocation] = useState("INDIA");
  const [countryCode, setCountryCode] = useState("IN");

  const permissionHandle = async () => {

    let permission = await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse",
        rationale: {
          title: "We need to access your location",
          message: "We use your location to show where you are on the map",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    })

    let location: any;

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      })
      try {
        location = await RNLocation.getLatestLocation({ timeout: 100 })
        console.log(location, location.longitude, location.latitude, location.timestamp)
      }
      catch (err) {
        console.log(location, location.longitude, location.latitude, location.timestamp)
      }
    } else {
      try {
        location = await RNLocation.getLatestLocation({ timeout: 100 })
        console.log(location, location.longitude, location.latitude, location.timestamp)
      }
      catch (err) {
        console.log(location, location.longitude, location.latitude, location.timestamp)
      }
    }

    const key = 'e73d407c11614fa69e95f7bebfe23b75';
    opencage.geocode({ key, q: `${location.latitude},${location.longitude}` }).then(response => {
      let result = response.results[0];
      setLocation(result.components.state_district);
      setCountryCode(result.components.country_code)
      console.log("address:", result.components.state_district)
    }).catch(error => { console.log(error) })
  }


  const checkOnboarding = async () => {
    try {
      // await AsyncStorage.removeItem('@viewOnboarding')
      const value = await AsyncStorage.getItem('@viewOnboarding');

      if (value !== null) {
        setViewOnboarding(true);
      }
    }
    catch (err) {
      console.log("Error @checkOnboarding: ", err);
    }

  }

  const checkLoggedIn = async () => {
    try {
      // await AsyncStorage.removeItem('@LoggedIn')
      const value = await AsyncStorage.getItem('@LoggedIn');

      if (value !== null) {
        setLoggedIn(true);
      }
    }
    catch (err) {
      console.log("Error @checkLoggedIn: ", err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkOnboarding();
    checkLoggedIn();
    permissionHandle();  
  }, [])

  const linking = {
    prefixes: ['vmarket://'],
    config: {
      screens: {
        Home: '*',
        Login: 'login',
        Register: 'register',
      },
    },
  };

  return (
    <>
      <NavigationContainer linking={linking} fallback={<Loading />}>
        <AppStack.Navigator screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#f4338f'}, headerTintColor: '#fff', }}>
          {
            loading
              ?
              (
                <AppStack.Screen
                  name="loading"
                  component={Loading}
                />
              ) :
              (
                viewedOnboarding
                  ?
                  (
                    loggedIn
                      ?
                      (
                        <>
                        <AppStack.Screen
                          name="HomeScreen"
                          options={({ navigation, route }) => ({
                            headerTitle: ()=> (
                              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Icon name="user-circle" solid size={30} style={{marginRight: 10, color: '#fff'}} onPress={()=>navigation.navigate('Profile')}/>
                                <View style={{width: 2, height: 35, backgroundColor: '#d5380c', marginRight: 10}}/>
                                <CountryFlag isoCode={countryCode} size={20} style={{borderRadius: 30, height: 30, width: 30, marginRight: 10}} />
                                <Text style={{fontSize: 16, color:'#fff', fontWeight: '800'}}>{location}</Text>
                              </View>
                            ),
                            headerStyle: { backgroundColor: '#f4338f'},
                            headerShown: true,
                            headerTintColor: '#fff',
                            headerRight: () => (
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20 }}>
                                <Icon size={20} name="bell" solid onPress={() => navigation.navigate('Notification')} style={{ paddingHorizontal: 10, color:'#fff'}} />
                                <Icon size={20} name="question-circle" solid onPress={() => navigation.navigate('Info')} style={{color:'#fff'}} />
                              </View>
                            ),
                          })}
                        >
                          {() => (
                            <Tab.Navigator
                              barStyle={{ backgroundColor: '#f4338f' }}
                            >
                              <Tab.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                  tabBarIcon: () => <Icon size={20} name={'home'} style={{color:'#fff'}} />
                                }}
                              />
                              <Tab.Screen
                                name="Store"
                                component={StoreScreen}
                                options={{
                                  tabBarIcon: () => <Icon size={20} name={'store'} style={{color:'#fff'}} />


                                }}
                              />
                              <Tab.Screen
                                name="Cart"
                                component={CartScreen}
                                options={{
                                  tabBarIcon: () => <Icon size={20} name={'shopping-cart'} style={{color:'#fff'}} />
                                }}
                              />
                              <Tab.Screen
                                name="History"
                                component={HistoryScreen}
                                options={{
                                  tabBarIcon: () => <Icon size={20} name={'history'} style={{color:'#fff'}} />
                                }}
                              />
                            </Tab.Navigator>
                          )}
                        </AppStack.Screen>
                        <AppStack.Screen
                            name="Notification"
                            component={NotificationScreen}
                            options={{
                              headerTitle: "Notification",
                              headerShown: true,
                            }}
                          />
                          <AppStack.Screen
                            name="Info"
                            component={InfoScreen}
                            options={{
                              headerTitle: "Info",
                              headerShown: true,
                            }}
                          />
                          <AppStack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                              headerTitle: "Profile",
                              headerShown: true,
                            }}
                          />
                        </>
                      ) :
                      (
                        <>
                          <AppStack.Screen
                            name="Login"
                            options={{
                              headerTitle: " ",
                              headerShown: false,
                            }}
                          >
                            {props => (<LoginScreen {...props} setLoggedIn={setLoggedIn} />)}
                          </AppStack.Screen>
                          <AppStack.Screen
                            name="Register"
                            component={SignUpScreen}
                            options={{
                              headerTitle: " ",
                              headerShown: false,
                            }}
                          />
                        </>
                      )
                  ) :
                  (
                    <AppStack.Screen
                      name=" "
                      options={{
                        headerTitle: " ",
                        headerShown: false,
                      }}
                    >
                      {props => (<OnboardingScreen {...props} setViewOnboarding={setViewOnboarding} />)}
                    </AppStack.Screen>
                  )
              )
          }
        </AppStack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
