import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 

        name="Login" 
        component={Login} 
        options={{
          title: 'Login',
          headerStyle:{
            backgroundColor: '#4287f5'
          },

          headerTintColor: '#fff',
          headerShown: true,
        }}
        />

        <Stack.Screen 
        name="Home" 
        component={Home} 
       
        />

        
      <Stack.Screen
        name="Register"
        component={Register}
      />

    
      </Stack.Navigator>
    </NavigationContainer>
  )
}