import React, {Component, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Pressable,SafeAreaView,FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';
import AppBar from '../../components/AppBar';
import { primaryColor, secondaryColor } from '../../constants/constants';
import OrderItem from '../../components/OrderItem';
import instance from '../../helper/axios';
import { setOrders } from '../../store/actions/order';

export default function OrdersScreen(props){

        const user = useSelector(state=>state.user.user);
        const token = useSelector(state=>state.user.token);
        const orders = useSelector(state=>state.orders.orders);
        const localstoreorders = useSelector(state => state.orders.localstoreorders);
        const [loading, setLoading] = useState(true);
        const dispatch = useDispatch();

        useEffect(() => {
            if(loading && orders.length <= 0){
                getUserOrders();
            }
        }, []);

        /**
         * GET ALL USER ORDERS
         */
        const getUserOrders = () => {
            instance.post('/my-orders', {
                userid: user != null?user.id: null,
                ordernos: localstoreorders 
            },{
                headers: {
                    Authorization: 'Bearer ' + token 
                }
            }).then(response => {
                if(response.data.status == 'success'){
                    dispatch(setOrders(response.data.orders));
                    setLoading(false);
                }else{
                    alert(response.data.message)
                }
            }).catch(error => {
                if (error.response && error.response.status == 401) {
                    alert("Unable to get orders. You must be logged in to view/manage your orders");
                }else{
                    alert('Oops something went wrong. Unable to get your orders now.'+error.message)
                }
               
            })
        }

        /**
         * RENDER ORDER ITEMS
         * @param {item} param0 
         * @returns 
         */
        const renderItem = ({ item }) => (
                <OrderItem item={item} />
        );

        const renderOrders = () => {
            if(orders.length > 0){
                return(
                    <SafeAreaView>
                        <FlatList
                        data={orders}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{}}
                        />
                  </SafeAreaView>
                )
            }else{
                return (
                    <View style={{flex:1, width:'100%',  alignItems:'center',justifyContent:'center'}}>
                        <Ionicons name="ios-albums-outline" size={50} color={secondaryColor} />
                        <Text style={{color: primaryColor}}>You have no orders</Text>
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
            <AppBar title="My Orders" isHome={false} navigation={props.navigation}/>
            <View style={styles.container}>
               {renderOrders()}
            </View>
            </>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
        backgroundColor:'#FFF',
       
    }
})
