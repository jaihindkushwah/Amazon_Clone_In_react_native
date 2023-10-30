import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const ProductInfoScreen = () => {
    const route=useRoute();
    const {width}=Dimensions.get("window");
    const height=(width*100)/100;
    const [addedToCart,setAddedToCart]=useState(false);
    const dispatch=useDispatch();
    const addItemToCart=(item)=>{
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(()=>{setAddedToCart(false)},6000)
    }
    const cart=useSelector((state)=>state.cart.cart);
    console.log(cart);
  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop:55,backgroundColor:'white',flex:1}}
    >
        <View
        style={{
        backgroundColor:"#00CED1",padding:10,
        flexDirection:'row',alignItems:'center'
        }} 
    >
        <Pressable
        style={{
            flexDirection:'row',
            alignItems:'center',
            marginHorizontal:7,
            gap:10,
            backgroundColor:"white",
            borderRadius:3,
            height:40,
            flex:1
        }}
        >
        <Icon style={{marginLeft:5}} name='search' size={24} color={'black'} />
        <TextInput placeholder='Search Amazon.in' />
        </Pressable>
        <Icon name='mic-none' size={24} color={'black'} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                route.params.carouselImages.map((item,index)=>(
                    <ImageBackground style={{width,height,marginTop:25,resizeMode:'contain'}} source={{uri:item}} key={index}>
                        <View
                            style={{
                                padding:10,
                                alignItems:'center',
                                justifyContent:'space-between',
                                flexDirection:'row'
                            }}
                        >
                             <View
                                style={{
                                    width:40,
                                    height:40,borderRadius:20,
                                    backgroundColor:'#C60C30',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    // marginLeft:10
                                }} 
                             >
                                <Text style={{fontSize:12,color:'white',textAlign:'center',fontWeight:"600"}} >
                                    20% offer
                                </Text>
                            </View>
                            <View
                                style={{
                                    width:40,
                                    height:40,borderRadius:20,
                                    backgroundColor:'#e0e0e0',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    // marginLeft:10
                                }} 
                            >
                                <Icon name='share'/>
                            </View> 
                            
                        </View>
                        <View
                            style={{
                                width:40,
                                height:40,borderRadius:20,
                                backgroundColor:'#e0e0e0',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginLeft:20,
                                marginBottom:20,
                                marginTop:'auto'
                            }} 
                        >
                            <Icon name='favorite-border'/>
                        </View> 
                    </ImageBackground>
                ))
            }

        </ScrollView>
        <View style={{padding:10}}>
            <Text style={{fontSize:15,fontWeight:"500"}}>{route?.params?.title}</Text>
            <Text style={{fontSize:18,fontWeight:"600",marginTop:6}}>₹ {route?.params?.price}</Text>
        </View>
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <Text>Color: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.color}
            </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <Text>Size: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.size}
            </Text>
        </View>
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
        <View style={{padding:10}}>
            <Text style={{fontSize:15,fontWeight:'bold',marginVertical:5}}>Total :  ₹ {route?.params?.price}</Text>
            <Text style={{color:'#00CED1'}} >Free delivery Tomorrow by 3 PM. Order within 10hrs 30 mins</Text>

            <View style={{marginVertical:5,gap:5,flexDirection:'row',alignItems:'center'}}>
                <Icon name='place' size={24} type='material' color={'black'} />
                <Text style={{textAlign:'center',fontSize:15,fontWeight:"500"}}>Deliver to Jai - Mumbai 400001</Text>
            </View>
        </View>
        <Text style={{fontWeight:"500",marginHorizontal:10,color:'green'}}>IN Stock</Text>
        <Pressable
            disabled={addedToCart}
            onPress={()=>{addItemToCart(route.params.item)}}
            style={{
                padding:10,
                borderRadius:20,
                justifyContent:'center',
                alignItems:'center',
                marginHorizontal:10,
                marginVertical:10,
                backgroundColor:'#ffc72c'
            }}
        >
                <Text style={{fontSize:15,fontWeight:'500'}}>
                    {
                        addedToCart?"Added To Cart ":"Add To Cart"

                    }
                </Text>
        </Pressable>
        <Pressable
            style={{
                padding:10,
                borderRadius:20,
                justifyContent:'center',
                alignItems:'center',
                marginHorizontal:10,
                marginVertical:10,
                backgroundColor:'#ffac1c'
            }}
        >
            <Text style={{fontSize:15,fontWeight:'500'}}>Buy Now</Text>
        </Pressable>

    </ScrollView>
  )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})