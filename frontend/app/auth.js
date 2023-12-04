import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, View,TextInput,Alert } from 'react-native';
// import { useSession } from '../authprovider/ctx';
import { useState } from 'react';
// import { Text, View } from 'react-native';

export default function Page() {
    // const {signIn,signUp}=useSession()
    const [islogin,setislogin]=useState(true)
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const handlesignIn=async()=>{
         if(username.length==0||password.length==0){
            console.log('form incomplete')
         }else{
            // let message=await signIn({username,password})
            // console.log(message)
            // Alert.alert('Login',message)
            // if(message=='Success'){
            //     router.replace('/');
            // }
         }
    }
    const handlesignUp=()=>{
        if(username.length==0||password.length==0){
            console.log('form incomplete')
         }else{
            // signUp({username,password})
            // // console.log(response)
            // setislogin(!islogin)
         }
    }
  return (
    <View style={styles.container}>
        <View style={{width:'80%',alignItems:'center'}}>
            <TextInput
                style={{
                height: 40,
                borderWidth:1,
                borderColor:'gray',
                marginBottom:5,
                padding:4,
                width:'100%'
                }}
                placeholder="Enter Username..."
                onChangeText={newText => setusername(newText)}
                defaultValue={username}
            />
            <TextInput
                style={{
                height: 40,
                borderWidth:1,
                borderColor:'gray',
                padding:4,
                marginBottom:5,
                width:'100%'
                }}
                placeholder="Enter Password..."
                onChangeText={newText => setpassword(newText)}
                defaultValue={password}
            />
            
            {islogin?<>
                <Text
                style={{
                    borderColor:'blue',
                    borderWidth:1,
                    backgroundColor:'lightblue',
                    width:80,
                    marginBottom:5,
                    textAlign:'center'}}
                onPress={() => {
                handlesignIn();
                // Navigate after signing in. You may want to tweak this to ensure sign-in is
                // successful before navigating.
                }}>
                    Sign In
                </Text>
                <Text>
                    New User? <Text onPress={()=>{
                        setislogin(false)
                        setusername('')
                        setpassword('')
                    }}>Sign Up</Text>
                </Text>
            </>:<>
                <Text
                    style={{
                        borderColor:'blue',
                        borderWidth:1,
                        backgroundColor:'lightblue',
                        width:80,
                        marginBottom:5,
                        textAlign:'center'}}
                    onPress={() => {
                    handlesignUp();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    }}>
                        Sign Up
                </Text>
                <Text>Already a User? <Text onPress={()=>{
                    setislogin(true)
                    setusername('')
                    setpassword('')
                }}>Sign In</Text></Text>
            </>}
            
      </View>
      <Link href="/">To to Home Page</Link>
      <Link href="/home">to insecured Home Page</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});