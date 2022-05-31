import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';

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
        const CLIENT_ID = '403978519638-3gluoqck7lg834j4drns8vuapvg445l5.apps.googleusercontent.com'
        const REDIRECT_URI =  'https://auth.expo.io/@brenolc/nursing-diary'
  
        const RESPONSE_TYPE = `token`
        const SCOPE = encodeURI(`openid email profile`)
  
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
  
        // const response = await AuthSession.startAsync({ authUrl });
        // console.log(response);
        const { params, type } = (await AuthSession.startAsync({
          authUrl,
        }))
  
        if (type === 'success') {
          console.log('success')
          const auth = getAuth()
  
          const credential = GoogleAuthProvider.credential(
            null,
            params.access_token,
          )
          const { user } = await signInWithCredential(auth, credential)
  
          setUser(user)
          navegaHome()
        }
      } catch (error) {
        console.log('error:' + error)
      }
    }
  
    function navegaHome(){
      navigation.navigate('Home')
    }
  
    function showRegister(){
        navigation.navigate('Register')
    }

    async function onGoogleButtonPress() {
      onLogin()
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
            <View>
              <Text style={styles.subTitleText}> Acesse a sua conta</Text>
              <TouchableOpacity style={styles.loginButton} onPress={()=>{onLogin()}}>
                <Image 
                style={styles.tinyLogo}
                source={{
                  uri: 'https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png',
                }}/>
                  <Text style ={styles.buttonText}>Entrar com google</Text>
              </TouchableOpacity>
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
        justifyContent: "center",
        marginTop: 40
      },

      loginButton: {
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 300/2,
        width: 300,
        height: 70,
        flexDirection: 'row',
        padding: 20
      },

      tinyLogo: {
        width: 50,
        height: 50,
      },

      buttonText: {
        fontFamily: 'Arial',
         fontSize: 20,
         color: 'black',
         paddingLeft: 20
      },

      subTitleText: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
      }
      
  });
