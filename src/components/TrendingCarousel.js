import { Text, View, Dimensions, StyleSheet, Image, Pressable} from 'react-native'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import { showMessage, hideMessage } from "react-native-flash-message";
import { imageURL, primaryColor, primaryColor2, randomColors, secondaryColor } from '../constants/constants';
import { ADD_TO_CART, INCREASE_CART_PRODUCT } from '../store/types';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

class TrendingCarousel extends Component {

    constructor(props){
        super(props); 
    }


    addToCart = (item) => {
        // this.setState({product: item})
        
        

        try {
            var results = this.props.carts.filter((elem) => elem.id == item.id);
    
            if (results.length > 0) {
                this.props.incrementCartProduct(item);
                showMessage({
                        message: "Product Successfully added to cart",
                        type: "info",
                });
            } else {
                //item.total = 1;
                let myitem = {...item, total:1};
                this.props.addToMyCartStore(myitem);
                showMessage({
                    message: "Product Successfully added to cart",
                    type: "info",
                });
            }
          } catch (error) {
            alert(error.message)
            showMessage({
                message: "Unable to add to cart. Please try again",
                type: "error",
            });
          } 
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <View style={styles.slideContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={{height: 150, resizeMode:'contain' }} source={{uri: imageURL +'/products/' + item.images[0]}} />
                    </View>
                    <View style={{backgroundColor:'white', width: 200, justifyContent:'center',}}>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQty}>{item.producttype}</Text>
                                <View style={{backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)], borderTopLeftRadius: 20, borderBottomLeftRadius:20, alignItems:'flex-start', justifyContent:'center', marginLeft: 10, height: 35}}>
                                    <Text style={styles.itemPrice}>GH₵ {item.price}</Text>
                                </View>
                            </View>

                            <Pressable onPress={() => this.addToCart(item)} style={{height: 50, width:50, position:'absolute', right: 2, bottom: -15, marginRight:50, borderRadius: 50,   alignItems:'center', justifyContent:'center' }}>
                                <View style={{height: 40, width:40, borderColor: 'white', borderWidth: 2, borderRadius: 50, padding: 5, alignItems:'center', justifyContent:'center', backgroundColor:secondaryColor,}}>
                                    <Ionicons name='ios-cart-outline' size={20} color={'white'}/>
                                </View>
                            </Pressable>
                    </View>
                    
                </View>
            </View>
        );
    }
  render() {
    return (
        <View style={{}}>
            <Carousel
              activeSlideAlignment="start"
              scrol
              inactiveSlideOpacity={0.3}
            //   inactiveSlideShift={10}
            //   inactiveSlideScale={0.5}
              layoutCardOffset={-10}
              activeAnimationType='spring'
              layout='tinder'
              loop={true}
              autoplay={true}
              ref={(c) => { this._carousel = c; }}
              data={this.props.sliders}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width-200}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    slide: {
        height: '100%',
        marginRight: 50,
        // width: Dimensions.get('window').width-50,
        // flex: 1,
    },
    slideContainer:{
        flexDirection:'row',
        // height: '100%',
    },
    title: {
        fontSize: 20,
    },
    imageContainer: {
        width: 200,
        borderTopRightRadius: 200,
        borderBottomRightRadius: 200,
        // borderWidth: 2,
        // borderColor: secondaryColor
    },
    itemName: {
        fontSize: 16,
        marginLeft: 10,
        color: primaryColor,
        textTransform: 'capitalize',
        fontWeight:'bold'
        // marginBottom: 5
    },
    itemPrice: {
        fontSize: 18,
        marginLeft: 10,
        // fontWeight: 'bold',
        // color: secondaryColor,
        color: 'white'
    },
    itemQty: {
        marginBottom: 15,
        marginLeft: 14,
        color:'gray',
        fontSize: 10
    }

})


const mapStateToProps = state => {
    return { 
        sliders: state.products.sliders,
        carts: state.carts.carts
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      addToMyCartStore: (item) => {
        dispatch({ type: ADD_TO_CART, payload: item });
      },

      incrementCartProduct: (item) => {
        dispatch({ type: INCREASE_CART_PRODUCT, payload: item.id });
      }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TrendingCarousel);