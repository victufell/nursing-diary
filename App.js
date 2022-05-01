import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Patient from './src/screens/Patient'

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

const Tab = createBottomTabNavigator();

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

export default function App() {
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
