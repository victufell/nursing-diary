import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import Home from './src/screens/Home'
import Login from './src/screens/Login'

export default function App() {

  return (
    <SafeAreaView>
      <StatusBar />
      <Login />
    </SafeAreaView>
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
