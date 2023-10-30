import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeToCart } from "../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  console.log(total);
  const dispatch=useDispatch();
  const incrementItemQuantity=(item)=>{
      dispatch(incrementQuantity(item));
  }
  const decreaseItemQuantity=(item)=>{
      dispatch(decrementQuantity(item));
  }
  const removeItemFromCart=(item)=>{
    dispatch(removeToCart(item));
  }

  const navigation=useNavigation();

  return (
    <ScrollView style={{ marginTop: 25, backgroundColor: "white" }}>
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
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Sub Total:  </Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              ₹ {total}{" "}
        </Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details available</Text>
      <Pressable
        disabled={total===0}
        onPress={()=>{navigation.navigate("Confirm")}}
        style={{
          padding: 10,
          backgroundColor: total===0 ?"#ad851d":"#FFC72C",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      <Text
        style={{
          height: 1,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          marginTop: 16,
        }}
      ></Text>
      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View key={item.id+" "+index}
            style={{
              backgroundColor: "white",
              marginHorizontal: 10,
              borderBottomColor: "#f0f0f0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ height: 140, width: 140, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                 ₹ {item?.price}
                </Text>

                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
              </View>
            </Pressable>
            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {
                  item?.quantity>1 ?(
                    <Pressable
                      onPress={()=>{decreaseItemQuantity(item)}}
                      style={{
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                        backgroundColor: "#d8d8d8",
                      }}
                    >
                      <Icon name="remove-circle-outline" />
                    </Pressable>
                  ):(
                    <Pressable
                        onPress={()=>{removeItemFromCart(item)}}
                        style={{
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                          backgroundColor: "#d8d8d8",
                        }}
                      >
                        <Icon name="delete" />
                      </Pressable>
                  )
                }
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  onPress={()=>{incrementItemQuantity(item)}}
                  style={{
                    padding: 7,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    backgroundColor: "#d8d8d8",
                  }}
                >
                  <Icon name="add-circle" />
                </Pressable>
              </View>
              <Pressable
                onPress={()=>{removeItemFromCart(item)}}
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: "white",
                  borderColor: "#c0c0c0",
                  borderRadius: 5,
                  borderWidth: 0.6,
                  paddingVertical: 10,
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <Pressable
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: "white",
                  borderColor: "#c0c0c0",
                  borderRadius: 5,
                  borderWidth: 0.6,
                  paddingVertical: 10,
                }}
              >
                <Text>Save for Later</Text>
              </Pressable>
              <Pressable
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: "white",
                  borderColor: "#c0c0c0",
                  borderRadius: 5,
                  borderWidth: 0.6,
                  paddingVertical: 10,
                }}
              >
                <Text>See More Like This</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
