import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'

import {
  getAuth,
  signInWithCredential,
  updateEmail,
  updateProfile,
  GoogleAuthProvider,
} from '@firebase/auth'

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
WebBrowser.maybeCompleteAuthSession()

export default function Login(){
    const navigation = useNavigation();
    const [user, setUser] = useState(null)

    useEffect(() => {
      console.log({
        getAuth,
        signInWithCredential,
        updateEmail,
        updateProfile,
        GoogleAuthProvider})
    }, [])

    const onLogin = async () => {
      try {
        const CLIENT_ID = ``
        const REDIRECT_URI = AuthSession.getRedirectUrl({ useProxy: true })
  
        const RESPONSE_TYPE = `token`
        const SCOPE = encodeURI(`openid email profile`)
  
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
  
        const { params, type } = (await AuthSession.startAsync({
          authUrl,
        }))
  
        if (type === 'success') {
          const auth = getAuth()
  
          const credential = GoogleAuthProvider.credential(
            null,
            params.access_token,
          )
          const { user } = await signInWithCredential(auth, credential)
  
          setUser(user)
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    function navegaHome(){
      navigation.navigate('Home')
    }
  
    function showRegister(){
        navigation.navigate('Register')
    }

    async function onGoogleButtonPress() {
      // Get the users ID token
      // const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential);
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
                    // onPress={ navegaHome }
                    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
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
