import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View,Alert } from 'react-native'
import DefaultPage from '../../components/DefaultPage'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authslice'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import BottomNavBar from '../../components/navbar'
import Panel from '../../components/Panel'
import TopUserBar from '../../components/userTopBar'
import { deleteProduct, fetchProducts, fetchUserProducts } from '../../actions/product/productAction'
import ProductCard from '../../components/Card/productCard'
import { changedeletesuccess, changeupdatesuccess } from '../../features/Product/productSlice'

const SceneUserProduct = ({navigation}) => {
    const {userproducts,loading,deleteloading,deletesuccess,deletemessage,updatesuccess}=useSelector((state)=>state.product)
    const dispatch=useDispatch()
    const {username,uId}=useSelector((state)=>state.auth)
    const handledelete=async(product)=>{
          await dispatch(deleteProduct(product._id))
    }
    const handleedit=(product)=>{
          navigation.navigate('HomeAddProduct',{product})
    }
    useEffect(()=>{
        // if(updatesuccess){
        //     dispatch(changeupdatesuccess())
        //     dispatch(fetchUserProducts(uId))
        // }
        if(deletesuccess){
            Alert.alert('Product',deletemessage)
            dispatch(changedeletesuccess())
            // dispatch(fetchUserProducts(uId))
        }
        dispatch(fetchUserProducts(uId))
    },[deletesuccess,deletemessage])
    return(    
    <DefaultPage>
        {/* <TopUserBar/> */}
        <Panel>
        <View style={styles.container}>
        <Text style={styles.headline}>User Product</Text>
            {loading?(<>
                <Text>Loading ...</Text>
            </>):(<>
                {userproducts.length>0?(
            <>
            {userproducts.map((product,index)=>(
                
                <View style={{width:'100%'}} key={index}>
                <ProductCard product={product}/>
                <View style={{width:'100%',marginTop:-5, flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between', marginBottom:6}}>
                    {deleteloading?(
                        <Text style={{width:'100%', textAlign:'center'}}>loading..</Text>
                    ):(<>
                        <Button title='Edit' onPress={()=>handleedit(product)}/>
                    <Button title='delete' onPress={()=>handledelete(product)}/>
                    </>
                    )}
                </View>
                </View>
            ))}
            </>
           ):(
            <><Text>No Product</Text></>
           )}
            </>)}
          
        </View>
        </Panel>
        {/* <BottomNavBar navigation={navigation}/> */}
    </DefaultPage>
    )
}
const styles=StyleSheet.create({
    container: {
        // marginTop:50,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        
    },
    headline: {
        padding:5,
        fontWeight: 'bold',
    },

})

SceneUserProduct.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneUserProduct