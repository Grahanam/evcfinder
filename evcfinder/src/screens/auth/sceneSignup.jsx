import React, { useEffect, useState } from 'react'
import { Text,View,TextInput,Alert, Button,Form, StyleSheet } from 'react-native'
import DefaultPage from '../../components/DefaultPage'
import { Authlogin ,Authsignup,fetchUsers} from '../../actions/auth/authAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { changesuccess, clearmessage } from '../../features/auth/authslice'
import {PropTypes} from 'prop-types'
import Panel from '../../components/Panel'

const SceneSignup = ({navigation}) => {
    const dispatch=useDispatch()
    const {token,data,loading,error,success,message}=useSelector((state)=>state.auth)
    // console.log(data)
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [confirmpassword,setconfirmpassword]=useState('')

    const handlesignUp=async()=>{
        if(username.length==0||password.length==0||confirmpassword.length==0){
            Alert.alert('Form','Form Incomplete')
        }else if(password!==confirmpassword){
            Alert.alert('Form','Password Field does not match')
        }else if(password.length<6){
            Alert.alert('Form','Password length should be aleast 6!')
        }
        else{
            const body={
                username:username,
                password:password
            }
            try{
                 await dispatch(Authsignup(body))
            }catch(err){
                Alert.alert('Error',err)
            }
        }
         
    }
    useEffect(()=>{
        if(message!=''){
            Alert.alert('Signup',message)
            dispatch(clearmessage())
        }
        if(success){
            navigation.navigate('Login')
            dispatch(changesuccess())
        }  
        // dispatch(fetchUsers())
     },[message,success])
    return(
        <DefaultPage>
            <Panel>
                <View style={styles.form}>
                    <Text style={styles.heading}>Sign Up</Text> 
                        <TextInput
                            style={styles.txtinput}
                            placeholder="Enter Username..."
                            onChangeText={newText => setusername(newText)}
                            defaultValue={username}
                            isRequired
                        />
                        <TextInput
                            style={styles.txtinput}
                            placeholder="Enter Password..."
                            onChangeText={newText => setpassword(newText)}
                            defaultValue={password}
                            secureTextEntry={true}
                            isRequired
                        />
                        <TextInput
                            style={styles.txtinput}
                            placeholder="Enter Password..."
                            onChangeText={newText => setconfirmpassword(newText)}
                            defaultValue={confirmpassword}
                            secureTextEntry={true}
                            isRequired
                        />
            
                        <Button
                            title='Sign Up'
                            onPress={() => {
                            handlesignUp();
                            }}
                        />
                        <Text style={styles.label}>
                            Already a User? 
                            <Text style={styles.link} onPress={()=>{navigation.navigate('Login')}}>
                                Log In
                            </Text>
                        </Text>
        
                    </View>
                </Panel>
            </DefaultPage>
    )
}
const styles=StyleSheet.create({
    form:{
        width:'100%',
        padding:20,
        alignItems:'center'
    },
    heading:{
        fontSize:30,
        fontWeight:'600',
        paddingBottom:30
    },
    txtinput:{
            height: 40,
            borderWidth:1,
            borderColor:'gray',
            padding:4,
            marginBottom:10,
            width:'100%'
    },
    label:{
        paddingTop:30
    },
    link:{
        color:'purple',
        paddingVertical:15,
        paddingHorizontal:15
    }
})

SceneSignup.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneSignup