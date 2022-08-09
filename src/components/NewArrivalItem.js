import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { Button } from 'native-base';
import { useDispatch, useSelector} from 'react-redux'
import { showMessage, hideMessage } from "react-native-flash-message";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { imageURL, primaryColor, randomColors, secondaryColor } from '../constants/constants';
import Cart from './Cart';
import { addToCartRedux, incrementCartProduct } from '../store/actions/cart';

const imageSize = 140;


export default function NewArrivalItem(props) {

    const dispatch = useDispatch();
    const carts = useSelector(state => state.carts.carts);

    const addToCart = () => {
    let myitem = {...props.item, total:1}
      try {
        var results = carts.filter((elem) => elem.id == props.item.id);

        if (results.length > 0) {
          dispatch(incrementCartProduct(props.item.id));
          showMessage({
                message: "Product Successfully added to cart",
                type: "info",
          });
        } else {
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

    const goToDetails = () => {
        props.navigation.navigate('Details', {item: props.item})
    }


    return (    
    <Pressable onPress={() => goToDetails()} >
        <ImageBackground style={[styles.container, { backgroundColor: props.color, bottom: 0,}]} imageStyle={{opacity:0.2}} source={require('../assets/images/lines2.png')} >
          <View style={styles.imageContainer}>
              <Image style={[styles.imageStyle, {borderColor: props.color, borderWidth: 1,}]} source={{uri: imageURL+'/products/'+props.item.images[0]}} />
          </View>

            <View style={styles.descriptionContainer}>
              <View>
                  <Text style={styles.nameStyle}>{props.item.name}</Text>
              </View>
              <View>
                        <Text style={styles.priceStyle}>GH₵ {props.item.price}</Text>
                        <Text style={{ fontSize: 10, color: '#FFF', textDecorationLine: 'line-through', marginTop: 10,}}>GH₵ { props.item.sale_price}</Text>
              </View>
                    
            </View>
                
                <Pressable android_ripple={{ color: primaryColor,borderless: false, radius: 10}} onPress={()=>addToCart()} style={{ width: 130, backgroundColor:'#FFF', height: 30,flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius: 15, position:'absolute', right: 15, bottom: 15 }}>
                    <Ionicons name='ios-cart-outline' size={15} color={secondaryColor}/>
                    <Text style={{ color: secondaryColor, fontSize: 10, marginLeft: 5}}>ADD TO CART</Text>
                </Pressable>
                
        </ImageBackground>
    </Pressable>
            
  )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - Dimensions.get('window').width/5 ,
        marginLeft: 30,
        marginTop: 20,
        marginRight: 10,
        backgroundColor: '#FFF',
        height: Dimensions.get('window').width / 2 - 10,
        borderBottomLeftRadius: 10,
        // borderTopLeftRadius: Dimensions.get('window').width ,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#7f5DF0',
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 2,
        marginBottom: 20, 
        
    },
    imageContainer: {
        position: 'absolute',
        top: -30,
        left: -30, 
        margin: 10,
        borderRadius: 10,
        backgroundColor:'#FFF',
        // shadowColor: '#7f5DF0',
        //     shadowOffset: {
        //     width: 0,
        //     height: 10,
        //  },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.5,
        // elevation: 2,
        marginBottom: 20, 
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 150,
        width: 150,
        borderRadius: 10, 
    },
    descriptionContainer: {
        marginLeft: imageSize,
        paddingTop: 10
    },
    nameStyle: {
        textTransform:'capitalize',
        fontSize: 15,
        fontFamily:'Nunito',
        // fontWeight: '700',
        color: "white",

    },
    priceStyle: {
        marginTop: 10,
        color: secondaryColor,
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
    },
   


})