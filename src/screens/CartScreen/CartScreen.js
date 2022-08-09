import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, Pressable } from 'react-native'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Divider } from 'native-base';
import AppBar from '../../components/AppBar';
import { primaryColor, secondaryColor } from '../../constants/constants';
import CartItem from '../../components/CartItem';


export default function CartScreen(props){

        const carts = useSelector(state=>state.carts.carts);
       
        const renderItem = ({ item }) => {
            
            return (
            
                  <CartItem item={item}/>
              
            );
          };

        const renderCart = () => {
            if(carts.length > 0){
                let total = 0.0
                carts.forEach(element => {
                    total += parseFloat(element.price * element.total)
                });
                return (
                    <>
                    <View style={{alignItems:'center', justifyContent:'center', padding: 20, backgroundColor:'#FFF', width:'100%', height: 100}}>
                        <View>
                            <Text style={{color: primaryColor}}>Total Amount: </Text>
                        </View>
                        <View>
                            <Text style={{color: secondaryColor, fontSize: 20, fontWeight:'bold'}}>GH₵ {total.toFixed(2)}</Text>
                        </View>
                        </View>
                        
                        <View style={{width:'90%', marginBottom: 10}}>
                            <Pressable onPress={() => {
                                props.navigation.navigate('CheckOut')
                            }} android_ripple={{ color: primaryColor,borderless: false, radius: 40, foreground: false}} style={{height: 45, width:'100%', backgroundColor:secondaryColor, alignItems:'center', justifyContent:'center',}}>
                                <Text style={{color: '#FFF', fontWeight:'bold'}}>CHECK OUT</Text>
                           </Pressable>
                        </View>
                        
                    <Divider />
                    <SafeAreaView style={styles.container}>
                    <FlatList
                        data={carts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        // extraData={selectedId}
                    />
                </SafeAreaView>
                </>
                )
            }else{
                return (
                    <View style={{alignItems:'center', justifyContent:'center',width:'100%'}}>
                        <Ionicons name="ios-cart-outline" size={50} color={secondaryColor} />
                        <Text style={{color: primaryColor}}>Your Carts is Empty</Text>
                        <View style={{marginTop: 20, width:'90%', marginRight: 10, marginLeft:10}}>  
                            <Pressable onPress={() => {
                               props.navigation.navigate('Home')
                            }} android_ripple={{ color: primaryColor,borderless: false, radius: 40, foreground: false}} style={{height: 45, width:'100%', backgroundColor:secondaryColor, alignItems:'center', justifyContent:'center',}}>
                                <Text style={{color: '#FFF', fontWeight:'bold'}}>CONTINUE SHOPPING</Text>
                           </Pressable>
                        </View>
                    </View>
                )
            }
        }

        return (
            <>
            <AppBar title="Cart" isHome={false} navigation={props.navigation}/>
            <View style={styles.container}>
                    {renderCart()}
            </View>
            </>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: 30,
        backgroundColor:'#FFF'
    }
})
 
// export default OrdersScreen;