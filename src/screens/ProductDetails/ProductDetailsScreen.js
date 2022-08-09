import { View, Text, Image, StyleSheet, Dimensions, Pressable, FlatList, SafeAreaView, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import AppBar from '../../components/AppBar'
import { Divider } from 'native-base';
import { imageURL, primaryColor, secondaryColor } from '../../constants/constants';
import { addToCartRedux, incrementCartProduct } from '../../store/actions/cart';
import WineItem from '../../components/WineItem';
import { ActivityIndicator } from 'react-native-paper';
import instance from '../../helper/axios';

export default function ProductDetailsScreen({ navigation, route }) {

  let product = route.params.item;

  const carts = useSelector(state => state.carts.carts);
  const [loading, setLoading] = useState(true);
  const [related, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
      getRelatedProducts();
  }, [])


  const addToCart = (goToCart) => {
    let myitem = {...product, total:1}
      try {
        var results = carts.filter((elem) => elem.id == product.id);

        if (results.length > 0) {
          dispatch(incrementCartProduct(product.id));
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

        if (goToCart) {
          navigation.goBack();
          navigation.navigate('Cart');
        }
        
      } catch (error) {
          alert(error.message)
           showMessage({
                message: "Ooops something went wrong. Unable to add item to cart",
                type: "error",
            });
      } 
        
        
    }


    const getRelatedProducts = () => {
          instance.post('/get-category-products', {
              id: product!=null ? product.product_category_id : 0
          }).then(response => {
              setLoading(false);
              if(response.data.status=='success'){
                  setRelatedProducts(response.data.products);
              }else{
                  alert('Unable to get related products');
              } 
          }).catch(error => {
              setLoading(false);
              alert('Unable to get related products. Please try again later 1'+error.message);
          })
    }


  const renderItem = ({item}) => (
    <WineItem item={item} navigation={navigation} />
  )

  const renderRelatedproducts = () => {
      if(loading){
          return(
            <View style={{marginTop: 50, alignItems:'center', justifyContent:'center'}}>
              <ActivityIndicator size={'small'} color={secondaryColor}/>
              <Text style={{fontSize: 10, marginTop: 10,}}>Loading related products...</Text>
            </View>
          )
      }else{
        if(related.length <=0){
            return (
              <View style={{ alignItems:'center', justifyContent:'center', marginTop: 50}}>
                    <Text>No related products found</Text>
              </View>
            )
        }else{
          return (
            <SafeAreaView>
              <FlatList
                  data={related}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
              />
            </SafeAreaView>
          )
        }
      }
  }

  return (
    <>
    <AppBar title="Details" isHome={false} navigation={navigation} hasBack={true}/>
      <ScrollView>
        
        <View style={styles.container}>
           <View>
              <Image source={{ uri: imageURL+'/products/'+product.images[0] }} style={styles.imageStyle} />
           </View>
        <View style={{ height: 10, backgroundColor: '#f5f5f5' }}></View>
        
        <View style={styles.descriptionContainer}>
          <View style={styles.descName}>
            <View>
              <Text style={styles.nameStyle}>{product.name}</Text>
              <Text style={styles.qtyStyle}>{product.producttype}</Text>
            </View>
            <View>
              <Text style={styles.price}>GHC {product.price}</Text>
            </View>
          </View>

          <Divider />

          <View style={{marginTop: 15}}>
            <Text style={{fontWeight:'bold', color:primaryColor, marginBottom: 10}}>DESCRIPTION</Text>
            {/* <Text style={{fontSize: 12,}}>When user request API, there is 2 type of loading, initial loading and more data loading. So, what we do is to check the page and determine whether the loading is for initial or more data. </Text> */}
            <Text>{product.description} </Text>
          </View>

          <View style={{marginBottom: 100, marginTop: 30}}>
            <View style={{marginBottom: 10,}}>
              <Text style={{fontWeight: 'bold'}}>Related Products</Text>
              <View style={{height: 4, backgroundColor: secondaryColor, width: 50, borderRadius: 5}}></View>
            </View>
               {renderRelatedproducts()}
          </View>
        </View>
        

      </View>
     
    </ScrollView>
    <View style={styles.actionButton}>
        <Pressable style={styles.addCart} onPress={() => addToCart(false) }>
              <Ionicons name='ios-cart-outline' size={20} color="white" />
              <Text style={{color: "white", fontWeight:'bold', marginLeft: 10}}>ADD TO CART</Text>
        </Pressable>
        
        <Pressable style={styles.buyNow} onPress={() => addToCart(true) }>
              <Text style={{color: secondaryColor, fontWeight:'bold'}}>BUY NOW</Text>
          </Pressable>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFF',

  },
  imageStyle: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width - 20,
    margin: 10,
    resizeMode:'contain',
  },
  descriptionContainer: {
    margin: 10
  },
  descName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems:'center'
  },
  price: {
    fontWeight: 'bold',
    color:secondaryColor
  },
  nameStyle: {
    fontWeight: 'bold',
    color: primaryColor
  },
  qtyStyle: {
    fontSize: 10,
  },
  actionButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    flex: 1,
    bottom: 0
  },
  addCart: {
    flexDirection:'row',
    height: 45,
    backgroundColor: secondaryColor,
    flex: 2,
    margin: 5,
    alignItems: 'center',
    justifyContent:'center'
  },
  buyNow: {
    height: 45,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius:2,
    borderColor: secondaryColor,
    flex: 1,
    margin: 5,
     alignItems: 'center',
    justifyContent: 'center',
    
  }
})