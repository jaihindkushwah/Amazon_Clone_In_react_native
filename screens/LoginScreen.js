import { SafeAreaView, StyleSheet,Text, View,Image, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigation=useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);



  const loginHandler = () => {
    if(!email || !password){
      Alert.alert("Please fill all field");
      return;
    }
    const user = {
      password: password,
      email: email,
    };

    // send data to backend

    axios
    .post("http://10.0.2.2:8000/login", user)
    .then((response) => {
      // console.log(response);
      Alert.alert(
        "Login successful",
        "You have been logged in Successfully"
      );
      const token=response.data.token;
      AsyncStorage.setItem("authToken",token);
      navigation.replace("Main");
    })
    .catch((error) => {
      Alert.alert(
        "Login Error",
        "An error occurred while Login"
      );
      console.log("Login failed", error);
    });
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center",marginTop:50}}>
      <View>
            <Image
              source={{
                width:150,
                height:100,
                uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
              }}
             />
      </View>
      <KeyboardAvoidingView>
              <View style={{alignItems:'center'}}>
                  <Text
                    style={{
                      fontSize:17,
                      fontWeight:"bold",
                      marginTop:12,
                      color:"#041E42"
                    }}
                    >
                      Login In to your Account
                  </Text>
              </View>
              <View style={{marginTop:60}}>
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                        gap:5,
                        backgroundColor:'#D0D0D0',
                        paddingVertical:5,
                        borderRadius:5,
                        marginTop:30
                      }}
                      >
                      <Icon
                        style={{
                          marginLeft:8
                        }}
                        type='material'
                        name='email'
                        size={24}
                        color={'gray'}
                      />
                      <TextInput 
                        value={email}
                        onChangeText={setEmail}
                        style={{
                          color:'gray',
                          marginVertical:10,
                          width:300,
                          fontSize:email?18:16
                        }}
                      placeholder='Enter your Email' />
                    </View>
              </View>
              <View style={{marginTop:10}}>
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                        gap:5,
                        backgroundColor:'#D0D0D0',
                        paddingVertical:5,
                        borderRadius:5,
                        marginTop:30
                      }}
                      >
                      <Icon
                        style={{
                          marginLeft:8
                        }}
                        type='material'
                        name='lock'
                        size={24}
                        color={'gray'}
                      />
                      <TextInput 
                        value={password}
                        onChangeText={setPassword}
                        style={{
                          color:'gray',
                          marginVertical:10,
                          width:300,
                          fontSize:password?18:16
                        }}
                      placeholder='Enter your password' />
                    </View>
              </View>
              <View
                style={{
                  display:"flex",
                  flexDirection:'row',
                  alignItems:"center",
                  justifyContent:'space-between',
                  marginTop:12,
                }} 
              >
                    <Text>
                        Keep me logged In
                    </Text>
                    <Text 
                      style={{
                        color:'#007FFF',
                        fontWeight:500
                      }}
                    >
                        Forgot Password ?
                    </Text>
              </View>
              <View style={{marginTop:50}}>
                      <TouchableOpacity
                        onPress={loginHandler}
                        style={{
                          width:200,
                          backgroundColor:"#FEBE10",
                          marginLeft:'auto',
                          marginRight:'auto',
                          padding:15,
                          
                        }}
                        >
                          <Text
                            style={{
                              textAlign:'center',
                              color:"white",
                              fontSize:18,
                              fontWeight:'bold'
                            }}
                          >Login</Text>
                      </TouchableOpacity>
                      <Pressable 
                        onPress={()=>{navigation.navigate("Register")}}
                      style={{marginTop:15}}>
                            <Text
                            style={{
                              textAlign:'center',
                              color:"gray",
                              fontSize:16,
                            }}
                            >
                              Don't have an account? Sign up
                            </Text>
                      </Pressable>
              </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen
