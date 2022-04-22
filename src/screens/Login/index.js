import React from 'react'

import { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, TextInput } from 'react-native';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import colors from '../../utils/colors'

const Login = () => {
  
    return (
        <View style={styles.container}>
            <View style={styles.contentView}>
                <Text style={styles.headerTxt}> Diário de Enfermagem </Text>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}> CPF </Text>
                    <TextInput style={styles.inputText}
                        placeholder= "Digite seu CPF"
                        placeholderTextColor="#c4c2c2"
                        keyboardType='number-pad'
                        maxLength={11}
                    />

                    <Text style={styles.inputLabel}> Senha </Text>
                    <TextInput style={styles.inputText}
                        placeholder= "Digite sua Senha"
                        placeholderTextColor="#c4c2c2"
                        secureTextEntry={true}
                    />
                </View>
                
                <View style ={styles.loginView}>
                    <Button 
                        color="#fffcfc"
                        title="Fazer Login"
                    />
                </View>

            </View>
        </View>

       
    )
  }
  
  const styles = StyleSheet.create({
    container:{
      height: '100%',
      backgroundColor: '#4287f5'
    },

    contentView:{
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15
      },

    headerTxt:{
        marginTop: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fffcfc'
      },

      inputView:{
        width: '100%',
          marginTop: 50
      },

      inputLabel:{
        marginTop: 15,
        width: '100%',
        color: '#fffcfc'
      },

      inputText:{
        width: '100%',
        height: 50,
        color: '#fffcfc',
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#c4c2c2'
      },

      loginView:{
        width: '100%',
        marginTop: 15
      }
  });

  export default Login
