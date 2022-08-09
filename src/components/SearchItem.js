import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { imageURL, primaryColor, secondaryColor } from '../constants/constants';
import { Divider } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRedux, incrementCartProduct } from '../store/actions/cart';

export default function SearchItem(props) {
        
    const dispatch = useDispatch();
    const carts = useSelector(state => state.carts.carts);

    const addToCart = () => {
    
      try {
        var results = carts.filter((elem) => elem.id == props.item.id);

        if (results.length > 0) {
          dispatch(incrementCartProduct(props.item.id));
          showMessage({
                message: "Product Successfully added to cart",
                type: "info",
          });
        } else {
            let myitem = {...props.item, total:1}
            dispatch(addToCartRedux(myitem));
             showMessage({
                message: "Product successfully added to cart",
                type: "info",
            });
        }
        
      } catch (error) {
          alert(error.message)
           showMessage({
                message: "Ooops something went wrong. Unable to add item to cart",
                type: "error",
            });
      } 
        
        
    }
  return (
    <>
    <Pressable  style={styles.itemContainer}>
        <View>
            <Image style={styles.imageStyle} source={{uri: imageURL+'/products/'+props.item.images[0]}}/>
        </View>

        <View style={styles.descriptionContainer}>
            <View style={{marginBottom: 5}}>
                <Text style={{color: primaryColor, }}>{props.item.name}</Text>
                <Text style={{fontSize: 8}}>{props.item.producttype}</Text>
            </View>

            <View>
                <Text style={{fontWeight: 'bold', color: secondaryColor, fontSize: 15}}>GHC {props.item.price}</Text>
                <Text style={{color: secondaryColor, fontSize: 8,  textDecorationLine: 'line-through'}} li>GHC {props.item.sale_price}</Text>
            </View>

            <Pressable style={styles.btnCart} onPress={() => addToCart()} >
                <Ionicons name="ios-cart-outline" color={"white"}/>
                <Text style={{color: 'white', fontSize: 10, marginLeft: 5}}>ADD TO CART</Text>
            </Pressable>
        </View>
    </Pressable>
    <Divider />
    </>
  )
}


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    imageStyle: {
        height: 100,
        width: 100,
        resizeMode:'contain'
    },
    descriptionContainer: {
        marginLeft: 10
    },
    btnCart: {
        width: 140,
        height: 30,
        backgroundColor: secondaryColor,
        borderRadius: 50,
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        alignSelf:'flex-end',
        left: 70,
    }
})