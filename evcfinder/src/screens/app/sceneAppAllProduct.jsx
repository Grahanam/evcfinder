import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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

const SceneAllProduct = ({navigation}) => {
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
        {/* <TopUserBar/> */}
        <Panel>
        <View style={styles.container}>
        <Text style={styles.headline}>All Product</Text>
           {products.length>0?(
            <>
            {products.map((product,index)=>(
                <ProductCard key={index} product={product}/>
            ))}
            </>
           ):(
            <><Text>No product</Text></>
           )}
        </View>
        </Panel>
        <BottomNavBar navigation={navigation}/>
    </DefaultPage>
    )
}
const styles=StyleSheet.create({
    container: {
        marginTop:50,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        
    },
    headline: {
        padding:5,
        fontWeight: 'bold',
    },

})

SceneAllProduct.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneAllProduct