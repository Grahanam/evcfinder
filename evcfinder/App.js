import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { Text, View } from 'react-native';
import {Provider} from 'react-redux'
import { useSelector } from 'react-redux';
import store from './src/store';
import Navigation from './src/navigation';
import { enableScreens } from 'react-native-screens';

// enableScreens();

export default function App() {

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

