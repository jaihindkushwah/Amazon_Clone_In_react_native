import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon} from '@rneui/themed';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import OrderScreen from '../screens/OrderScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const StackNavigators = () => {
    const Stack=createNativeStackNavigator();
    const Tab=createBottomTabNavigator();

    function BottomTabs(){
      return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen 
              name='Home'
              component={HomeScreen}
              options={{
                tabBarLabel:"Home",
                tabBarLabelStyle:{color:'#008E97'},
                headerShown:false,
                tabBarIcon:(({focused})=>
                     focused? 
                     <Icon type='material' size={24} color="#008E97"  name='home'/> 
                     : <Icon type='antdesign' size={24} color="black" name='home'/>
                )
              }}
              
            />
            <Tab.Screen 
              name='Profile'
              component={ProfileScreen}
              options={{
                tabBarLabel:"Profile",
                tabBarLabelStyle:{color:'#008E97'},
                tabBarIcon:(({focused})=>
                     focused? 
                     <Icon type='material' size={24} color="#008E97" name='person'/> 
                     : <Icon type='material' size={24} color="black" name='person-outline'/>
                )
              }}
              
            />
            <Tab.Screen 
              name="Cart"
              component={CartScreen}
              options={{
                tabBarLabel:"Cart",
                tabBarLabelStyle:{color:'#008E97'},
                headerShown:false,
                tabBarIcon:(({focused})=>
                  focused? (<Icon type='material' size={24} color="#008E97" name='shopping-cart'/>)
                  :(<Icon name='shoppingcart' size={24} color="black" type='antdesign' />)
                )
              }}
              
            />
        </Tab.Navigator>
      )
    }
  return (
      <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen options={{headerShown:false}} name='Login' component={LoginScreen} />
                <Stack.Screen options={{headerShown:false}} name='Register' component={RegisterScreen} />
                <Stack.Screen options={{headerShown:false}} name='Main' component={BottomTabs} />
                <Stack.Screen options={{headerShown:false}} name='Info' component={ProductInfoScreen} />
                <Stack.Screen options={{headerShown:false}} name='Order' component={OrderScreen} />
                <Stack.Screen options={{headerShown:false}} name='Add' component={AddAddressScreen} />
                <Stack.Screen options={{headerShown:false}} name='Address' component={AddressScreen} />
                <Stack.Screen options={{headerShown:false}} name='Confirm' component={ConfirmationScreen} />
            </Stack.Navigator>
          </SafeAreaProvider>
      </NavigationContainer>
  )
}

export default StackNavigators

const styles = StyleSheet.create({})