import { StyleSheet, Text, View,Image, Alert, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { UserType } from './UserContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon } from '@rneui/themed'

const ProfileScreen = () => {
  const navigation=useNavigation();
  const {userId,setUserId}=useContext(UserType);
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);

  useLayoutEffect(()=>{
      navigation.setOptions({
        headerTitle:"",
        headerStyle:{
          backgroundColor: "#00CED1",
        },
        headerLeft:()=>(
          <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginRight: 12,
            }}
          >
            <Icon name="notifications" size={24} />
  
            <Icon name="search" size={24} color="black" />
          </View>
        ),
      });
  },[])
  const [user,setUser]=useState();
  useEffect(()=>{
    const fetchProfile=async()=>{
        try {
          const response= await axios.get(`http://10.0.2.2:8000/profile/${userId}`);
          const {user}=response.data;
          setUser(user);
        } catch (error) {
          console.log("error "+error)
        }
    };
    fetchProfile();
  },[])

  const logout=()=>{
    const clearAuthToken= async()=>{
      try {
        await AsyncStorage.removeItem("authToken");
        Alert.alert("","Logout successfully");
        navigation.replace("Login");
      } catch (error) {
        console.log("Unable to logout"+error);
      }
    }
    clearAuthToken();
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  // console.log("orders", orders);
  // console.log(user?.name);
  return (
    <ScrollView style={{padding:10,flex:1,backgroundColor:'white'}}>
        <Text style={{fontSize:16,fontWeight:'bold'}}>Welcome {user?.name} </Text>
        <View style={{flexDirection:'row',gap:10,alignItems:'center',marginTop:13}}>
            <Pressable style={{padding:10,backgroundColor:'#c0c0c0',borderRadius:25,flex:1}}>
                <Text style={{textAlign:'center'}}>Your orders</Text>
            </Pressable>
            <Pressable style={{padding:10,backgroundColor:'#c0c0c0',borderRadius:25,flex:1}}>
                <Text style={{textAlign:'center'}}>Your Account</Text>
            </Pressable>
        </View>
        <View style={{flexDirection:'row',gap:10,alignItems:'center',marginTop:13}}>
            <Pressable style={{padding:10,backgroundColor:'#c0c0c0',borderRadius:25,flex:1}}>
                <Text style={{textAlign:'center'}}>Buy Again</Text>
            </Pressable>
            <Pressable onPress={logout} style={{padding:10,backgroundColor:'#c0c0c0',borderRadius:25,flex:1}}>
                <Text style={{textAlign:'center'}}>Logout</Text>
            </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>


    </ScrollView>
  )
}

export default ProfileScreen
