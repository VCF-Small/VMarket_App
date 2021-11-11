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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Toast from 'react-native-toast-message';

const AppStack = createStackNavigator();

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
    finally{
      setLoading(false);
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
  }

  useEffect(()=> {
    checkOnboarding();
    checkLoggedIn();
  },[])

  return (
    <>
    <NavigationContainer>
      <AppStack.Navigator>
        {loading
        ? 
          <AppStack.Screen
            name=" "
            component={Loading}
            options={{
              headerTitle: " ",
              headerShown: false,
            }}
          />
          : 
            viewedOnboarding
            ?
              loggedIn
              ?
                <AppStack.Screen 
                  name=" " 
                  component={HomeScreen}
                  options={{
                    headerTitle: " ",
                  }}
                />
                :
                <AppStack.Screen
                  name=" "
                  options={{
                    headerTitle: " ",
                    headerShown: false,
                  }}  
                >
                  {props => (<LoginScreen {...props} setLoggedIn={setLoggedIn} />)}
                </AppStack.Screen>
              :
              <AppStack.Screen 
                name=" " 
                options={{
                  headerTitle: " ",
                  headerShown: false,
                }}
              >
                {props => (<OnboardingScreen {...props} setViewOnboarding={setViewOnboarding} />)}
              </AppStack.Screen>
        }
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: " ",
          }} 
        />
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
