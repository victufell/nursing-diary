import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react';

import { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, TextInput, Keyboard, Icon } from 'react-native';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';

export default function Login(){
    const navigation = useNavigation();
  
    function navegaHome(){
      navigation.navigate('Home')
    }
  
    function showRegister(){
        navigation.navigate('Register')
    }

    const [CPF, setText] = useState('');

    return(
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
                    onChangeText={text => setText(text)}
                    />

                <Text style={styles.inputLabel}> Senha </Text>
                <TextInput style={styles.inputText}
                    placeholder= "Insira sua Senha"
                    placeholderTextColor="#c4c2c2"
                    secureTextEntry={true}
                />
            </View>
            
            <View style ={styles.loginView}>
                <Button 
                    onPress={ navegaHome }
                    color="#fffcfc"
                    title="Fazer Login"
                />
            </View>

            <View style ={styles.bottomView}>
                <Button 
                    onPress={ showRegister }
                    color="#fffcfc"
                    title="Não possui conta? Registre-se"
                />
            </View>

        </View>
    </View>

    )
}
  
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#4287f5'
    },

    contentView:{
        flex: 1,
        width: '90%',
        alignItems: "center",
        marginTop: 40
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

      bottomView:{
        width: '100%',
        marginTop: 5
      },
      loginView: {
        marginTop: 25,
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', //Here is the trick
        bottom: 0, //Here is the trick
      }
  });
