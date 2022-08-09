import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { View, Pressable, StyleSheet, Image, Dimensions,Text } from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message";
import { imageURL, primaryColor, secondaryColor } from '../constants/constants';
import Cart from './Cart';
import { ADD_TO_CART, INCREASE_CART_PRODUCT } from '../store/types';
import { addToCartRedux, incrementCartProduct } from '../store/actions/cart';
import {} from 'native-base'

export default function WineItem(props) {


  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts.carts);

    const addToCart = async (item) => {
      let myitem = {...item, total:1}
      try {
        var results = carts.filter((elem) => elem.id == item.id);

        if (results.length > 0) {
          dispatch(incrementCartProduct(item.id));
          showMessage({
                message: "Product Successfully added to cart",
                type: "info",
            });
        } else {
            dispatch(addToCartRedux(myitem))
            showMessage({
                message: "Product Successfully added to cart",
                type: "info",
            });
        }
      } catch (error) {
        showMessage({
            message: "Unable to add to cart. Please try again",
            type: "error",
        });
      } 
  }
  

  const goToDetails = () => {
    props.navigation.navigate('Details', {item: props.item});
  }
  

     return(
   
        <Pressable
        style={{
          borderColor: '#e5e5e5',
          backgroundColor:'#fff',
          borderWidth: 0.5,
          width: Dimensions.get('window').width / 2.5,
          borderRadius: 4,
          // height: 100,
          justifyContent: 'center',
          // alignItems: 'center',
          margin: 5,
          flex:1/2
         }}
       onPress = {() => goToDetails()}
       >
        <View>
        <Image
            style={styles.imageStyle}
            source={{
              uri: imageURL+ '/products/' + props.item.images[0]
            }}
            // defaultSource={require('../assets/images/placeholder.png')}
          />
            </View>

            <Pressable onPress={() => {
              addToCart(props.item)              
              }} style={{position: 'absolute', top: 0, right: 0, margin: 5}}>
              <Cart />
            </Pressable>
            <View style={styles.prodNameCon}>
           <Text fontWeight={200}
             fontFamily="body"
            ellipsizeMode="tail"
            numberOfLines={2}
            style={styles.productName}>
            {props.item.name}
          </Text>
          <Text style={{fontSize: 8,}}>
               {props.item.producttype}
          </Text>
         <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{ fontSize: 15, marginTop: 5,marginLeft:1, color: primaryColor}}>GH₵ {props.item.price}</Text>
              <View
              style={{
                // backgroundColor: secondaryColor,
                borderRadius: 2,
                alignItems:'flex-end',
                justifyContent:'flex-end'
              }}>
              <Text style={{fontSize: 8, textDecorationLine: 'line-through', marginLeft: 2,justifyContent:'flex-end', alignSelf:'flex-end', color:secondaryColor}}>
               GH₵ {props.item.sale_price}
              </Text>
            </View>
         </View>
        </View>
        </Pressable>
      
     )
}


const styles = StyleSheet.create({
    itemContainer: {
      marginBottom: 10,
    },
    imageStyle: {
      marginTop: 20,
      height: 120,
      width: Dimensions.get('window').width / 3,
      borderRadius: 5,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    productName: {
      fontSize: 14,
      textTransform:'capitalize',
      // alignItems: 'center',
      fontWeight: '400',
      color:secondaryColor
    },
    prodNameCon: {
      padding: 5,
      marginBottom: 10,
      alignItems:'flex-start'
    },
    priceContainer: {
        margin: 3,
      },
  });
