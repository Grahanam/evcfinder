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
import { fetchProductsByCategory } from '../../actions/product/productAction'
import ProductCard from '../../components/Card/productCard'
import { useRoute } from '@react-navigation/native'


const SceneAppSport = ({navigation}) => {
    const dispatch=useDispatch()
    const {categoryproducts,loading}=useSelector((state)=>state.product)
    const route = useRoute();
    
    useEffect(()=>{
         const categoryName=route.params?.categoryName||'Sport'
         dispatch(fetchProductsByCategory(categoryName))
    },[route.params?.categoryName])
    return(    
    <DefaultPage>
        {/* <TopUserBar/> */}
        <Panel>
        <View style={styles.container}>
        <Text style={styles.headline}>Sport Product</Text>
            {loading?(
                <>
                <Text>Loading ...</Text>
                </>
            ):(
                <>
                {categoryproducts.length>0?(
                    <>
                    {categoryproducts.map((product,index)=>(
                        <ProductCard key={index} product={product}/>
                    ))}
                    </>
                   ):(
                    <><Text>No product</Text></>
                )}
                </>
            )}
           
        </View>
        </Panel>
        <BottomNavBar navigation={navigation}/>
    </DefaultPage>
    )
}
const styles=StyleSheet.create({
    container: {
        marginTop:70,
        width: '100%',
        height: '100%',
        
        alignItems: 'center',
        
    },
    headline: {
        padding:5,
        fontWeight: 'bold',
    },

})

SceneAppSport.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneAppSport