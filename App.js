import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Patient from './src/screens/Patient'
import Register from './src/screens/Register'

import { initializeApp } from 'firebase/app';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

const Tab = createBottomTabNavigator();
const firebaseConfig = {  
  apiKey: "AIzaSyCIEA0yLnuOAHBnHk2FI8JZGdK_hlCUMus",  
  authDomain: "diario-de-enfermagem.firebaseapp.com",  
  databaseURL: "https://diario-de-enfermagem-default-rtdb.firebaseio.com",  
  projectId: "diario-de-enfermagem",  
  storageBucket: "diario-de-enfermagem.appspot.com",  
  messagingSenderId: "403978519638",  
  appId: "1:403978519638:web:74061fb2b0ba8505c4e7f7",  
  measurementId: "G-6039W02RC2"  
};  

function HomeScreen({ ...props }) {
  return (
    <Home {...props}/>
  );

}
function LoginScreen() {
  return (
    <Login />
  );
}

function PatientScreen({ ...props }) {
  return (
    <Patient {...props}/>
  );
}
function RegisterScreen() {
  return (
    <Register />
  );
}

export default function App() {
  initializeApp(firebaseConfig);
  
  const navigationRef = useNavigationContainerRef()
  return (
    <React.Fragment>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" options={{ headerShown: false }}>
              {props => <HomeScreen {...props}/>}
            </Tab.Screen>
            <Tab.Screen name="Patient" options={{ headerShown: false }}>
              {props => <PatientScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </Tab.Navigator>
        </NavigationContainer> 
      </SafeAreaProvider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});