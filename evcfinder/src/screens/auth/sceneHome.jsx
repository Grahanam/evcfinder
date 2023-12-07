import React from 'react'
import { Button, Text, View } from 'react-native'
import DefaultPage from '../../components/DefaultPage'
import {PropTypes} from 'prop-types'

const SceneHome = ({navigation}) => (
    <DefaultPage>
        <Text style={{paddingBottom:50 ,fontSize:30,fontWeight:'bold'}}>
            Shopping App
        </Text>
        <View style={{ width:'100%',flexDirection:'row', justifyContent:'space-evenly'}}>
        <Button 
            title="LOGIN" 
            onPress={()=>{navigation.navigate('Login')}}
        />
        <Button 
            title="SIGNUP" 
            onPress={()=>{navigation.navigate('Signup')}}
        />
        </View>
    </DefaultPage>
)
SceneHome.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneHome