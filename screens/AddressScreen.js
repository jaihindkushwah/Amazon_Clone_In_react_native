import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { UserType } from "./UserContext";
import axios from "axios";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landMark, setLandMark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const {userId}=useContext(UserType);
  
  
  const addAddressHandler=()=>{
        if(!name && !mobileNo && !houseNo && !postalCode && !landMark && !street){
            Alert.alert("Warning","Please fill all field");
        }
        const address={
          name,mobileNo,houseNo,postalCode,landmark:landMark,street
        };

        axios.post("http://10.0.2.2:8000/addresses",{userId,address})
        .then(()=>{
          Alert.alert("Success","Address added successfully");
          console.log(address);
          setName("");
          setHouseNo("");
          setMobileNo("");
          setPostalCode("");
          setStreet("");
          setLandMark("");

          setTimeout(()=>{
            navigation.goBack();
          },500)
        }).catch((error)=>{
          Alert.alert("Error","Address added Failed ");
          console.log("Error while adding data ",error)
        })

  }
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>
        <TextInput
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full name [First and last name]
          </Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>
        <View style={{ marginVertical: 2 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile number
          </Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            value={mobileNo}
            onChangeText={setMobileNo}
            placeholder="Enter mobile no"
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            value={houseNo}
            onChangeText={setHouseNo}
            // placeholder="enter your name"
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area, Street, sector, village
          </Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            value={street}
            onChangeText={setStreet}

            // placeholder="enter your name"
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>landMark</Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            value={landMark}
            onChangeText={setLandMark}
            placeholder="Eg. near railway station"
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Enter Pincode"
          />
        </View>
        <Pressable
          onPress={addAddressHandler}
          style={{
            padding: 10,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#ffc72c",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
