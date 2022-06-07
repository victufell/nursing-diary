import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StyleSheet, StatusBar } from 'react-native';

import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Patient from './src/screens/Patient'
import SearchPatient from './src/screens/SearchPatient'

import { initializeApp } from 'firebase/app';

import { FontAwesome, Fontisto, MaterialIcons } from '@expo/vector-icons'; 

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import colors from './src/utils/colors';

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

function SearchPatientScreen({ ...props }) {
  return (
    <SearchPatient {...props}/>
  );
}

export default function App() {
  initializeApp(firebaseConfig);
  
  const navigationRef = useNavigationContainerRef()
  return (
    <React.Fragment>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
 
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator initialRouteName="Home" screenOptions={() => ({ tabBarActiveTintColor: colors.blue })}>
            <Tab.Screen name="Home" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => (<FontAwesome name="calendar-plus-o" size={24} color={color} />)}}>
              {props => <HomeScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Patient" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => (<Fontisto name="bed-patient" size={24} color={color} />) }}>
              {props => <PatientScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="SearchPatient" options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => (<MaterialIcons name="person-search" size={24} color={color} />) }}>
              {props => <SearchPatientScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color }) => (<FontAwesome name="user-md" size={24} color={color} />) }} />
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