import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View,Text } from 'react-native'
import { useSelector } from 'react-redux'

import SceneSplash from '../screens/auth/sceneSplash'
import SceneHome from '../screens/auth/sceneHome'
import SceneLogin from '../screens/auth/sceneLogin'
import SceneAppHome from '../screens/app/sceneAppHome'
import SceneSignup from '../screens/auth/sceneSignup'
import SceneAppApparel from '../screens/app/sceneAppApparel'
import SceneAppBook from '../screens/app/sceneAppBook'
import SceneAppSport from '../screens/app/sceneAppSports'
import SceneAddProduct from '../screens/app/sceneAddProduct'
import SceneAllProduct from '../screens/app/sceneAppAllProduct'
import SceneUserProduct from '../screens/app/sceneAppUserProduct'



const Stack = createStackNavigator()

const Navigation = () => {
      const {token,loading}=useSelector((state)=>state.auth)
    return(
        <>
    <NavigationContainer>
         <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
            {token?(
                <>
                    <Stack.Screen name="MainHome" component={SceneAppHome} />
                    <Stack.Screen name="HomeApparel" component={SceneAppApparel} />
                    <Stack.Screen name="HomeBook" component={SceneAppBook} />
                    <Stack.Screen name="HomeSport" component={SceneAppSport} />
                    <Stack.Screen name="HomeAddProduct" component={SceneAddProduct} />
                    <Stack.Screen name="HomeAllProduct" component={SceneAllProduct} />
                    <Stack.Screen name="HomeUserProduct" component={SceneUserProduct} />

                </>
            ):(
                <>
                   <Stack.Screen name="Splash" component={SceneSplash} />
                   <Stack.Screen name="Login" component={SceneLogin} />
                   <Stack.Screen name="Signup" component={SceneSignup} />
                   <Stack.Screen name="Home" component={SceneHome} />
                </>
            )}
            
            
         </Stack.Navigator>
    </NavigationContainer>
    </>    
)
    
    }

export default Navigation