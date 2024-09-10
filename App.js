/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './App/Screen/LoginScreen';
import CallDetails from './App/Screen/CallDetails';
import Signup from './App/Screen/Signup';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={LoginScreen} /> 
        <Stack.Screen name='CallDetails' component={CallDetails}  />
        <Stack.Screen name='Signup' component={Signup}  />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;

