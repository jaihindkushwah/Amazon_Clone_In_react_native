import { Pressable, StyleSheet, Text, View ,Image} from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice';

const ProductItems = ({item}) => {
  const [addedToCart,setAddedToCart]=useState(false);
  const dispatch=useDispatch();
  const addItemToCart=()=>{
      setAddedToCart(true);
      dispatch(addToCart(item));
      setTimeout(()=>{setAddedToCart(false)},6000);
  }
  return (
    <Pressable
      
     style={{marginHorizontal:20,marginVertical:20}}>
        <Image
            style={{width:150,height:150,resizeMode:'contain'}}
            source={{uri:item.image}}
         />
         <Text numberOfLines={1} style={{width:150,marginTop:10,}}>{item.title}</Text>
         <View style={{marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>₹ {item?.price}</Text>
                <Text style={{fontWeight:'bold',fontSize:15,color:'#FFC72C'}}>{item?.rating?.rate}</Text>
         </View>
         <Pressable 
            disabled={addedToCart}
            onPress={()=>addItemToCart()}
            style={{
                justifyContent:'center',
                backgroundColor:'#FFC72C',
                padding:10,
                alignItems:'center',
                marginHorizontal:'10',
                marginTop:10,
                borderRadius:20
            }}>
                <Text style={{fontWeight:'500'}}>{
                  addedToCart? "Added To Cart":"Add To Cart"
                }</Text>
         </Pressable>
    </Pressable>
  )
}

export default ProductItems

const styles = StyleSheet.create({})