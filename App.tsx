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

  const checkOnboarding = async () => {
    try{
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

  useEffect(()=> {
    checkOnboarding();
  },[])

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {loading
        ? 
          <AppStack.Screen
            name="Loader"
            component={Loading}
            options={{
              headerTitle: " ",
              headerShown: false,
            }}
          />
          : 
            viewedOnboarding
            ?
              <AppStack.Screen
                name=" Home"
                component={HomeScreen}
                options={{
                  headerTitle: " ",
                  headerShown: false,
                }}  
              />
              :
              <AppStack.Screen 
                name="Onboarding" 
                component={OnboardingScreen}
                options={{
                  headerTitle: " ",
                  headerShown: false,
                }}
              />
        }
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: " ",
            headerShown: false,
          }}  
        />
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: " ",
            headerShown: false,
          }}  
        />
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
