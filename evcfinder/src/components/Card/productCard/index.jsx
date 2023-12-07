import { StyleSheet, View,Text, Image } from "react-native"




const ProductCard=({product})=>{
    return(
        <View style={styles.body}>
            <View style={styles.imagecontainer}>
             <Image style={styles.cover} src={product.image?.url}></Image>
             </View>
             <View style={styles.detailcontainer}>
             <Text>Title: {product.title}</Text>
             <Text>Price: Rs {product.price}</Text>
             <Text>Category: {product.category}</Text>
             {/* <Text>Description: {product.description}</Text> */}
             </View>
             
        </View>
    )
}
const styles=StyleSheet.create({
    body:{
        borderWidth:1,
        padding:5,
        width:'100%',
        backgroundColor:'#ddd',
        flexDirection:'row',
        marginBottom:5
    },
    imagecontainer:{

    },
    detailcontainer:{
        padding:3
    },
    cover:{
        width:100,
        height:100,
        padding:2
    }
})

export default ProductCard