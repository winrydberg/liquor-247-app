import React from 'react';
import {Image, View, Dimensions, Text, Pressable, StyleSheet, Alert } from 'react-native'
import { VStack, Box, Divider, useDisclose } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { imageURL, primaryColor, secondaryColor } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { DECREASE_CART_PRODUCT, INCREASE_CART_PRODUCT } from '../store/types';
import { removeItemFromCart } from '../store/actions/cart';

export default function CartItem (props) {

    const dispatch = useDispatch();

    const increaseCart = () => {
        try {
            dispatch({type: INCREASE_CART_PRODUCT, payload: props.item.id})
            showMessage({
                message: "Product quantity successfully updated",
                type: "info",
            });
        } catch (err) {
            showMessage({
                message: "Unable to update product quantity. Please try again",
                type: "error",
            });
        }
        
    }

    const decreaseCart = () => {
        try {
            dispatch({type: DECREASE_CART_PRODUCT, payload: props.item.id})
            showMessage({
                message: "Product quantity successfully updated",
                type: "info",
            });
        } catch (err) {
            showMessage({
                message: "Unable to update product quantity. Please try again",
                type: "error",
            });
        }
    }

    const removeFromCart = () => {
        Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this product?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
          {
              text: "YES, REMOVE", onPress: () => {
            dispatch(removeItemFromCart(props.item.id))
        } }
      ]
    );
        
    }
  
  return (
    <Box border="1" borderRadius="md" style={[styles.shadow,{width: Dimensions.get('window').width-20, backgroundColor:'#FFF', margin: 10}]}>
      <VStack space="4" divider={<Divider />}>
        <Box>
            <View style={{width: '100%', flexDirection: 'row'}}>
               
                    <Image source={{uri: imageURL + '/products/'+ props.item.images[0]}} style={{height: 130, width: 130, resizeMode:'contain'}}/>
                
                <View style={{marginLeft: 10,marginTop: 10}}>
                          <View>
                              <Text style={{fontSize: 14, color: primaryColor, textTransform: 'capitalize', fontWeight:'bold'}}>{props.item.name}</Text>
                              <Text style={styles.miniText}>{props.item.producttype}</Text>
                          </View>
                         
                          <Text style={styles.miniText}>{props.item.qty}</Text>
                          <Text style={[styles.miniText, {color: secondaryColor, }]}>Unit Price: GH₵ {props.item.price}</Text>
                          <Text style={styles.miniText}>Quantity: {props.item.total}</Text>
                    <View style={{ marginTop: 0 }}>
                              
                        <Text style={{fontSize: 10, marginTop: 5, color:primaryColor}}>Sub Total</Text>
                        <Text style={{fontSize: 18, color: secondaryColor}}>GH₵ {props.item.price * props.item.total}</Text>
                        {/* <Text style={{ textDecorationLine: 'line-through', fontSize: 12}}>GH₵ {props.item.saleprice}</Text> */}
                    </View>
                </View>
            </View>
        </Box>
        <Box px="2" pb="4">
         <View style={{justifyContent:'space-between', flexDirection:'row'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Pressable onPress={()=> increaseCart()}>
                    <Ionicons name="add-circle" size={20} color={secondaryColor}/>
                </Pressable>
                <View style={{width: 40, alignItems:'center'}}>
                    <Text>{props.item.total}</Text>
                </View>
                <Pressable disabled={props.item.total<=1} onPress={()=> decreaseCart()}>
                    <Ionicons name="remove-circle-sharp" size={20} color={props.item.total <=1 ? 'gray':secondaryColor}/>
                </Pressable>
            </View>

            <View>
                <Pressable onPress={() => removeFromCart()}>
                    <Ionicons name="trash" size={20} color={"brown"}/>
                </Pressable>
            </View>
         </View>
        </Box>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
    miniText: {
        fontSize: 10
    },
    shadow: {
      shadowColor: '#7f5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 2,
    },
})