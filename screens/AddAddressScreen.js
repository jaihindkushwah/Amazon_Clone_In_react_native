import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState ,useCallback} from "react";
import { Icon } from "@rneui/themed";
import { useNavigation ,useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import { UserType } from "./UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId } = useContext(UserType);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/addresses/${userId}`
      );
      const { address } = await response.data;
      setAddresses(address);
    } catch (error) {
      console.log("Error " + error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log(addresses);

  return (
    <ScrollView
      style={{
        paddingTop: Platform.OS === "android" ? 30 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <Icon
            style={{ marginLeft: 5 }}
            name="search"
            size={24}
            color={"black"}
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Icon name="mic-none" size={24} color={"black"} />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Address</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Address");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingHorizontal: 7,
            paddingVertical: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <Icon name="keyboard-arrow-right" />
        </Pressable>
        <Pressable>
          {/* {all added addresses } */}
          {addresses?.map((item, index) => (
            <Pressable
              key={index + " " + item.id}
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Icon
                  name="map-marker-outline"
                  size={24}
                  type="material-community"
                  color={"red"}
                />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.landmark}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                India, Mumbai
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Mobile No. {item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Postal Code. {item?.postalCode}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 7,
                  gap: 10,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#f5f5f5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
