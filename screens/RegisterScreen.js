import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const registerHandler = () => {
    if(!name || !email || !password){
      Alert.alert("Please fill all field");
      return;
    }
    const user = {
      name: name,
      password: password,
      email: email,
    };

    // send data to backend

    axios
    .post("http://10.0.2.2:8000/register", user)
    .then((response) => {
      // console.log(response);
      Alert.alert(
        "Registration successful",
        "You have been registered Successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
    })
    .catch((error) => {
      Alert.alert(
        "Registration Error",
        "An error occurred while registering"
      );
      console.log("registration failed", error);
    });

  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <View>
        <Image
          source={{
            width: 150,
            height: 100,
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Register to your Account
          </Text>
        </View>
        <View style={{ marginTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Icon
              style={{
                marginLeft: 8,
              }}
              type="material"
              name="person"
              size={24}
              color={"gray"}
            />
            <TextInput
              value={name}
              onChangeText={setName}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 18 : 16,
              }}
              placeholder="Enter your Name"
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Icon
              style={{
                marginLeft: 8,
              }}
              type="material"
              name="email"
              size={24}
              color={"gray"}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 16,
              }}
              placeholder="Enter your Email"
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Icon
              style={{
                marginLeft: 8,
              }}
              type="material"
              name="lock"
              size={24}
              color={"gray"}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 18 : 16,
              }}
              placeholder="Enter your password"
            />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text>Keep me logged In</Text>
          <Text
            style={{
              color: "#007FFF",
              fontWeight: 500,
            }}
          >
            Forgot Password ?
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            onPress={registerHandler}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={{ marginTop: 15 }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16,
              }}
            >
              Already have an account? Log in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
