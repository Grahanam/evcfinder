import React, { useEffect, useState } from 'react'
import { Text,View,TextInput,Alert, Button, StyleSheet } from 'react-native'
import DefaultPage from '../../components/DefaultPage'
import { Authlogin } from '../../actions/auth/authAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { clearmessage } from '../../features/auth/authslice'
import {PropTypes} from 'prop-types'
import Panel from '../../components/Panel'

const SceneLogin = ({navigation}) => {
    const dispatch=useDispatch()
    const {token,data,loading,error,success,message}=useSelector((state)=>state.auth)
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')

    const handlesignIn=async()=>{
         if(username.length==0||password.length==0){
            console.log('form incomplete')
         }else{
            const body={
                username:username,
                password:password
            }
            console.log(body)
            try{
               await dispatch(Authlogin(body))
            }catch(err){
                console.log(err)
            }
         }
    }
    useEffect(()=>{
        if(message!=''){
            Alert.alert('Login',message)
            dispatch(clearmessage())
        }    
        // dispatch(fetchUsers())
     },[message,success])
    return(
        <DefaultPage>
            <Panel>
            <View style={styles.form}> 
            <Text style={styles.heading}>Sign In</Text> 
            <TextInput
                style={styles.txtinput}
                placeholder="Enter Username..."
                onChangeText={newText => setusername(newText)}
                defaultValue={username}
            />
            <TextInput
                style={styles.txtinput}
                placeholder="Enter Password..."
                onChangeText={newText => setpassword(newText)}
                defaultValue={password}
                secureTextEntry={true}
            />
                <Button
                title='Log In'
                onPress={() => {
                    handlesignIn();
                    }}
                />
                    <Text style={styles.label}>
                        New User? <Text style={styles.link} onPress={()=>{navigation.navigate('Signup')}}>Sign Up</Text>
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

SceneLogin.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneLogin