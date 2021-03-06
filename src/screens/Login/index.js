import React, { useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, SafeAreaView , Image, TouchableOpacity, Alert } from 'react-native';

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
import colors from '../../utils/colors';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
WebBrowser.maybeCompleteAuthSession()

export default function Login(){
    const navigation = useNavigation();
    const [user, setUser] = useState({})
    const [isLogged, setIsLogged] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
      setIsLogged(false)
    }, [])

    const onLogin = async () => {
      try {
        const CLIENT_ID = '403978519638-3gluoqck7lg834j4drns8vuapvg445l5.apps.googleusercontent.com'
        const REDIRECT_URI =  'https://auth.expo.io/@brenolc/nursing-diary'
  
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
            setIsLogged(true)
            setUser(user) 
            setRefreshing(true);
            console.log('check')
        }
      } catch (error) {
        console.log('error:' + error)
        createTwoButtonAlert()
      }
    }

    function logout() {
      setIsLogged(false)
      setUser({})
      setRefreshing(true);
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "N??o foi possivel acessar sua conta",
      "Por favor, verifique suas credenciais e tente novamente",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  
    function navegaHome(){
      navigation.navigate('Home')
    }

    const [CPF, setText] = useState('');
    
    if (isLogged) {
        return(<View style={styles.container}>
          <View style={styles.contentView}>
            <Image
              style={styles.userLogo}
              source={{
                uri: user.photoURL,
              }}
            />

            <Text style={styles.usernameText}>
                  {user.displayName}
            </Text>
               
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
                underlayColor='#fff'>
                 <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
          </View>
      </View>)
    } else {
      return(
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
      )
    }
}
  
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.blue
    },

      contentView:{
        flex: 1,
        width: '90%',
        alignItems: "center",
        justifyContent: "center"
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

      userLogo: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        marginTop: 10
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
      },

      usernameText: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15
      },

      logoutText: {
        fontFamily: 'Arial',
         fontSize: 20,
         textAlign: 'center',
         color: colors.white
      },
      
      logoutButton: {
        backgroundColor:'transparent',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width: 200,
        height: 50,
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18,
        justifyContent: 'center',
        alignContent:'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 15
     },
  });
