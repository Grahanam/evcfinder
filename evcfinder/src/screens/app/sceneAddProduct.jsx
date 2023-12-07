import React, { useEffect, useState } from 'react'
import { Text,View,TextInput,Alert, Button, StyleSheet, Image } from 'react-native'
import DefaultPage from '../../components/DefaultPage'
import { Authlogin } from '../../actions/auth/authAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { clearmessage } from '../../features/auth/authslice'
import {PropTypes} from 'prop-types'
import * as DocumentPicker from 'expo-document-picker';

import { createProduct, updateProduct } from '../../actions/product/productAction'
import RNPickerSelect from 'react-native-picker-select'
import { SelectList } from 'react-native-dropdown-select-list'
import { changecreatesuccess, changeupdatesuccess, clearcreatemessage } from '../../features/Product/productSlice'
import { useRoute } from '@react-navigation/native'
const SceneAddProduct = ({navigation}) => {
    const dispatch=useDispatch()
    const {token,uId}=useSelector((state)=>state.auth)
    const {createsuccess,createloading,createmessage,updatesuccess,updatemessage,updateloading}=useSelector((state)=>state.product)
    // console.log(data)
    const [title,settitle]=useState('')
    const [pId,setpId]=useState('')
    const [price,setprice]=useState('')
    const [category,setcategory]=useState(0)
    const [defaultSelect,setdefaultSelect]=useState({key:'0',value:''})
    const [description,setdescription]=useState('')
    const [image,setimage]=useState({})
    const [update,setupdate]=useState(false)
    const [file,setfile]=useState(null)
    const route=useRoute()
  
  const data2 = [
      {key:'0',value:''},
      {key:'1', value:'Apparel'},
      {key:'2', value:'Book'},
      {key:'3', value:'Sport'},
  ]

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
            if (response.canceled == false) {          
              let { name, size, uri } = response.assets[0];
              
              let nameParts = name.split('.');
              let fileType = nameParts[nameParts.length - 1];
              var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: "application/" + fileType
              };
            //   console.log(fileToUpload, '...............file')
              setfile(fileToUpload);
            }else{
                setfile(null)
            } 
          });
        // console.log(result);
        // console.log("Doc: " + file.uri);
    }
    const UpdateProduct=async()=>{
        let formData=new FormData()
        if(file){
              formData.append('file',file)
        }
        if(pId!='',title!=''&&category!=0&&description!=''&&price!=''){
            formData.append('title',title)
            formData.append('_id',pId)
            formData.append('price',parseInt(price))
            formData.append('category',data2[category].value)
            formData.append('description',description)
            formData.append('user',uId)
            await dispatch(updateProduct(formData))
        }else{
            Alert.alert('Form','Form Incomplete')
        }
    }
    const CancelUpdate=()=>{
        settitle('')
        setpId('')
        setcategory(0)
        setdefaultSelect(data2[0])
        setprice('')
        setdescription('')
        setfile(null)
        setupdate(false)
        setimage({})
    }
    
    const CreateProduct=async()=>{

        if(file&&title!=''&&category!=0&&description!=''&&price!=0){
            let formData=new FormData()
            formData.append('file',file)
            formData.append('title',title)
            formData.append('price',parseInt(price))
            formData.append('category',data2[category].value)
            formData.append('description',description)
            formData.append('user',uId)
            await dispatch(createProduct(formData))
         }else{
            Alert.alert('Form','Form Incomplete')
         }
    }
    useEffect(()=>{
        if(route.params?.product){
            const product=route.params?.product
            for(let cat of data2){
                if(cat.value==product.category){
                    setdefaultSelect(cat)
                }
            }
            setpId(product._id)
            // setcategory(product.category)
            settitle(product.title)
            setdescription(product.description)
            setprice(product.price)
            setimage(product.image)
            setupdate(true)
        }

        if(updatesuccess){
            Alert.alert('Product',updatemessage)
            dispatch(changeupdatesuccess())
            navigation.replace('HomeUserProduct')
            
        }

        if(createsuccess){
            Alert.alert('Product',createmessage)
            dispatch(clearcreatemessage())
            dispatch(changecreatesuccess())
            setcategory(0)
            settitle('')
            setdescription('')
            setfile(null)
            setprice(0)
        }    
     },[createmessage,createsuccess,updatesuccess])
    return(
        <DefaultPage>
            <View style={{width:'100%',alignItems:'center'}}>  
            <Text style={styles.headline}>{update?'Update Product':'Create Product'} </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Title"
                onChangeText={newText => settitle(newText)}
                defaultValue={title}
            />
            <TextInput
                style={styles.input}
                inputMode='numeric'
                placeholder="Enter Price"
                onChangeText={newText => setprice(newText)}
                defaultValue={price.toString()}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Description"
                onChangeText={newText => setdescription(newText)}
                defaultValue={description}
            />
            <SelectList 
                setSelected={setcategory} 
                data={data2} 
                // save="value"
                search={false} 
                defaultOption={defaultSelect}
            />
            <Text style={{padding:5,borderWidth:1,marginVertical:8}} onPress={pickDocument}>
                Select Image:
                {file?(
                    <>{file.name}</>
                ):(
                    <> No image selected</>
                )}
                
            </Text>
            {update?(
                <View style={{alignItems:'center'}}>
                    <Image style={{height:100,width:100}} src={image?.url}></Image>
                    <View style={styles.updatediv}>
                        {updateloading?(
                            <Text>loading...</Text>
                        ):(
                            <>
                            <Button
                            title='Cancel'
                            onPress={() => {
                                CancelUpdate();
                            }}
                        />
                        <Button
                            title='Update'
                            onPress={() => {
                                UpdateProduct();
                            }}
                        />
                            
                            </>
                        )}
                    </View>
                </View>
            ):(
                <View style={styles.updatediv}>
                {createloading?(
                    <Text>loading...</Text>
                ):(
                    <Button
                title='Create'
                onPress={() => {
                    CreateProduct();
                    }}
                />
                )}
                
                </View>
            )}
                
            
      </View>
        </DefaultPage>
    )
}

const styles=StyleSheet.create({
    input:{
        height: 40,
                borderWidth:1,
                borderColor:'gray',
                padding:4,
                marginBottom:5,
                width:'100%'
    },
    headline: {
        padding:5,
        fontSize:20,
        fontWeight: 'bold',
    },
    updatediv:{
        padding:5,
        width:'70%',
        flexDirection:'row',
        justifyContent:'space-evenly'
    }

})

SceneAddProduct.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneAddProduct