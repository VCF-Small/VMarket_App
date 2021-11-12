/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet, View,
} from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Toast from 'react-native-toast-message';
import HistoryScreen from './screens/HistoryScreen';
import CartScreen from './screens/CartScreen';
import StoreScreen from './screens/StoreScreen';
import { color } from 'react-native-reanimated';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Loading = () => {
  return(
    <View style={{flex:1, justifyContent: 'center', backgroundColor: '#ffffff'}}>
      <ActivityIndicator size="large" color="#f4338f"/>
    </View>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewOnboarding] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);


  const checkOnboarding = async () => {
    try{
      // await AsyncStorage.removeItem('@viewOnboarding')
      const value = await AsyncStorage.getItem('@viewOnboarding');

      if(value !== null){
        setViewOnboarding(true);
      }
    }
    catch(err){
      console.log("Error @checkOnboarding: ",err);
    }
    
  }

  const checkLoggedIn = async () => {
    try{
      // await AsyncStorage.removeItem('@LoggedIn')
      const value = await AsyncStorage.getItem('@LoggedIn');

      if(value !== null){
        setLoggedIn(true);
      }
    }
    catch(err){
      console.log("Error @checkLoggedIn: ", err);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=> {
    checkOnboarding();
    checkLoggedIn();
  },[])

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
    <NavigationContainer linking={linking} fallback={<Loading/>}>
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {
      loading
        ?
        (
          <AppStack.Screen 
            name="loading"
            component={Loading}
          />
        ):
        (
          viewedOnboarding
            ?
            (
              loggedIn
                ?
                (
                <AppStack.Screen name="HomeScreen">
                  {()=>(
                  <Tab.Navigator>
                    <Tab.Screen 
                      name="Home"
                      component={HomeScreen}
                      options={{
                        headerTitle: " ",
                        tabBarIcon:() => <Icon size={ 20 } name={ 'home' }/>
                      }}
                      />
                    <Tab.Screen 
                      name="Store" 
                      component={StoreScreen} 
                      options={{
                        headerTitle: " ",
                        tabBarIcon:() => <Icon size={ 20 } name={ 'store' }/>


                      }} 
                      />
                    <Tab.Screen 
                      name="Cart" 
                      component={CartScreen} 
                      options={{
                        headerTitle: " ",
                        tabBarIcon:() => <Icon size={ 20 } name={ 'shopping-cart' } light/>
                      }} 
                    />
                    <Tab.Screen 
                      name="History" 
                      component={HistoryScreen} 
                      options={{
                        headerTitle: " ",
                        tabBarIcon:() => <Icon size={ 20 } name={ 'history' } />
                      }} 
                    />
                  </Tab.Navigator>
                  )}
                </AppStack.Screen>
                ):
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
            ):
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
