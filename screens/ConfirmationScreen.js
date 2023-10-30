import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserType } from "./UserContext";
import axios from "axios";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/cartSlice";
import RazorpayCheckout from "react-native-razorpay";

const steps = [
  { title: "Address", content: "Address form" },
  { title: "Delivery", content: "Delivery Options" },
  { title: "Payment", content: "Payment Details" },
  { title: "Place Order", content: "Order Summary" },
];

const ConfirmationScreen = () => {
  const [currentSteps, setCurrentSteps] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const navigation = useNavigation();
  const dispatch=useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

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
  console.log(addresses);

  const handlePlaceOrder= async ()=>{
      try {
        const orderData={
          userId,
          cartItems:cart,
          totalPrice:total,
          shippingAddress:selectedAddress,
          paymentMethod:paymentOption,
        }

        const response=await axios.post("http://10.0.2.2:8000/orders",orderData);
        if(response.status===200){
          setCurrentSteps(0);
          navigation.navigate("Order");
          dispatch(cleanCart());
          
          console.log("Order created successfully"+ response.data.data);
        }else{
          console.log("error creating order",response.data);
        }


      } catch (error) {
        console.log("Error in handling placeorder"+error)
      }
  }
  const pay=async()=>{
      // rzp_test_oCuH8toxFLvO5u
        console.log("pay");
        try {
          const options = {
            description: "Adding To Wallet",
            currency: "INR",
            name: "Amazon",
            key: "rzp_test_oCuH8toxFLvO5u",
            amount: total * 100,
            prefill: {
              email: "void@razorpay.com",
              contact: "9191919191",
              name: "RazorPay Software",
            },
            theme: { color: "#F37254" },
          };
          // console.log(options)
          const data=await RazorpayCheckout.open(options);
          // console.log(data);
          const orderData = {
            userId: userId,
            cartItems: cart,
            totalPrice: total,
            shippingAddress: selectedAddress,
            paymentMethod: "card",
          };
    
          const response = await axios.post(
            "http://10.0.2.2:8000/orders",
            orderData
          );
          if (response.status === 200) {
            navigation.navigate("Order");
            dispatch(cleanCart());
            console.log("order created successfully", response.data);
          } else {
            console.log("error creating order", response.data);
          }
        } catch (error) {
          console.log("error "+error)
        }
  }

  return (
    <ScrollView style={{ marginTop: 25 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentSteps && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentSteps && { backgroundColor: "green" },
                ]}
              >
                {index < currentSteps ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {currentSteps == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>
          <Pressable>
            {addresses.map((item, index) => (
              <Pressable
                key={index + " " + item.id + " " + index}
                style={{
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  padding: 20,
                  flexDirection: "row",
                  gap: 5,
                  marginVertical: 7,
                  marginBottom: 17,
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <Icon
                    onPress={() => {
                      setSelectedAddress(item);
                    }}
                    color={"blue"}
                    size={24}
                    name="radio-button-checked"
                  />
                ) : (
                  <Icon
                    onPress={() => {
                      setSelectedAddress(item);
                    }}
                    size={24}
                    name="radio-button-unchecked"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
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
                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => {
                          setCurrentSteps(1);
                        }}
                        style={{
                          backgroundColor: "#008397",
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "white" }}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentSteps === 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Choose your delivery options
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <Icon
                onPress={() => {
                  setOption(!option);
                }}
                size={24}
                color={"blue"}
                name="radio-button-checked"
              />
            ) : (
              <Icon
                onPress={() => {
                  setOption(!option);
                }}
                size={24}
                name="radio-button-unchecked"
              />
            )}
            <Text style={{ flex: 1, fontSize: 16 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 10pm{" "}
              </Text>
              - FREE delivery with your Prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setCurrentSteps(2);
            }}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentSteps === 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment Method
          </Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 15,
            }}
          >
            {paymentOption === "cash" ? (
              <Icon size={24} color={"blue"} name="radio-button-checked" />
            ) : (
              <Icon
                onPress={() => {
                  setPaymentOption("cash");
                }}
                size={24}
                name="radio-button-unchecked"
              />
            )}
            <Text>Cash on Delivery</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 15,
            }}
          >
            {paymentOption === "card" ? (
              <Icon size={24} color={"blue"} name="radio-button-checked" />
            ) : (
              <Icon
                onPress={() => {
                  setPaymentOption("card");
                  Alert.alert("UPI/Debit Card","Pay Online",[
                    {
                      text:"Cancel",
                      onPress:()=>console.log("Cancel is Pressed")
                    },
                    {
                      text:"OK",
                      onPress:()=>pay()
                      
                    }
                  ])
                }}
                size={24}
                name="radio-button-unchecked"
              />
            )}
            <Text>UPI / Credit or debit card</Text>
          </View>
          <Pressable
            onPress={() => {
              setCurrentSteps(3);
            }}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentSteps === 3 && paymentOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <Icon name="keyboard-arrow-right" size={24} color="black" />
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>
              Shipping to {selectedAddress?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray", fontWeight: "500" }}>
                Items
              </Text>
              <Text style={{ fontSize: 16, color: "gray" }}>₹ {total}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray", fontWeight: "500" }}>
                Delivery
              </Text>
              <Text style={{ fontSize: 16, color: "gray" }}>₹ 0</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Total
              </Text>
              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                ₹ {total}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pay on delivery (Cash)
            </Text>
          </View>
          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Place your order
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
