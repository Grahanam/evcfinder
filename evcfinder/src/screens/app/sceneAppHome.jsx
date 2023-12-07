import React, { useEffect } from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,Image} from 'react-native'
import DefaultPage from '../../components/DefaultPage'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authslice'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import BottomNavBar from '../../components/navbar'
import Panel from '../../components/Panel'
import TopUserBar from '../../components/userTopBar'
import { fetchProducts } from '../../actions/product/productAction'
import ProductCard from '../../components/Card/productCard'
import { Button } from 'react-native'

const SceneAppHome = ({navigation}) => {
    const {products}=useSelector((state)=>state.product)
    const dispatch=useDispatch()
    const {username}=useSelector((state)=>state.auth)
    const logOut=()=>{
        dispatch(logout())
    }
    useEffect(()=>{
        dispatch(fetchProducts())
    },[])
    return(    
    <DefaultPage>
        <TopUserBar/>
        <Panel>
            <View style={styles.container}>
            
            <Button
                title='View All Product'
                onPress={() => {
                    navigation.navigate('HomeAllProduct');
                    }}
            />
            <Button
                title='Add New Product'
                onPress={() => {
                    navigation.navigate('HomeAddProduct');
                    }}
            />
            <Button
                title='Your Product'
                onPress={() => {
                    navigation.navigate('HomeUserProduct');
                    }}
                />
            </View>
        </Panel>
        {/* <BottomNavBar navigation={navigation}/> */}
    </DefaultPage>
    )
}
const styles=StyleSheet.create({
    container: {
        marginTop:30,
        height:'50%',
        justifyContent:'space-around',
        alignItems:'stretch',
        
    },
})

SceneAppHome.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneAppHome