import { Link, Slot,Tabs } from "expo-router"
import { StyleSheet, Text, View } from 'react-native';
import { SessionProvider } from "../authprovider/ctx";
import {Provider} from 'react-redux'
import store from "../src/store";
export default function Root(){
    return(
        // <Provider store={store}>
        <View style={styles.container}>
            <Text>Layout</Text>
            <Link href='/auth'>Auth</Link>
            <Link href='/'>Home</Link>
            <Link href='/home'>Home unprotected</Link>
            {/* <SessionProvider> */}
                <Slot/>
            {/* </SessionProvider> */}
        </View>
        // </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#eee',
      paddingTop:30,
      alignItems: 'center',
    },
  });