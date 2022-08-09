import { View, Text,ScrollView, Pressable, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import {VStack, FormControl,Input, Box, Select, CheckIcon} from 'native-base'
import {useSelector, useDispatch} from 'react-redux';

import AppBar from '../../components/AppBar'
import { primaryColor, secondaryColor, storekeys } from '../../constants/constants';
import instance from '../../helper/axios';
import { clearCart, setCities } from '../../store/actions/cart';
import Loader from 'react-native-modal-loader';
import { addOrder, setNewOrderCity, setNewOrderLandmark, setNewOrderLatitude, setNewOrderLongitude, setNewOrderPhoneNo, setNewOrderUsername } from '../../store/actions/order';
import { storeOderNos } from '../../helper/storage';


export default function CheckoutScreen({navigation}) {

 const [username, setUsername] = useState(null);
 const [landmark, setLandmark] = useState(null);
 const [phoneno, setPhoneno] = useState(null);
 const [longitude, setLongitude] = useState(null);
 const [latitude, setlatitude] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState({
    code: '',
    message: ''
 });
 const [city, setCity] = useState(null);
 const user = useSelector(state => state.user.user);
 const cities = useSelector(state => state.carts.cities);
 const carts = useSelector(state => state.carts.carts);
 const localstoreorders = useSelector(state => state.orders.localstoreorders);

 const dispatch = useDispatch();

 useEffect(() => {
    // alert(JSON.stringify(user))
    if(user != null){
        setUsername(user.name);
        setPhoneno(user.phoneno);
    }
    if(cities.length <=0){
        getAllCities();
    }else{
        setLoading(false)
    }
    
 }, []);


 /**
  * GET DELIVERY CITIES
  */
 const getAllCities = () => {
    instance.get('/cities').then(async(response) => {
        if(response.data.status == 'success'){
            console.log(response.data.cities);
            await dispatch(setCities(response.data.cities));
            setLoading(false)
        }
        
    }).catch(error => {
        setLoading(false)
        console.log(error.message);
    })
 }

/**
 * SEND NEW ORDER 
 */
 const sendOrder = () => {
    setLoading(true);
    let products = [];
    for(var i=0; i<carts.length; i++){
        products = [...products, {productid: carts[i].id, qty: carts[i].total}]
    }

    instance.post('/create-order',{
        userid: user!=null?user.id:null,
        username: username,
        phoneno:'233'+phoneno.slice(-9),
        landmark: landmark,
        city: city,
        longitude: longitude,
        latitude: latitude,
        products: products
    }).then(response => {
        dispatch(addOrder(response.data.order));
        setLoading(false);
        if(response.data.status =='success'){
            let orderids = [...localstoreorders, response.data.order.orderno];
            storeOderNos(orderids);
            alert(response.data.message)
        }else{
            alert(response.data.message)
        }

        dispatch(clearCart());
        navigation.navigate('Home');
    }).catch(error => {
        setLoading(false);
        alert(error.message)
    })
 }

 /**
  * VALIDATE USER DELIVERY DETAILS
  * @returns 
  */
 const goToSummary = () => {
    let pattern = /^(\+233|0|00233|233)?\d{9}$/i
    if(username ==null || username.length<0){
        setError({
            code: 'USERNAME',
            message: 'Name field is required'
        })
        return;
    }else if(phoneno ==null || pattern.test(phoneno) == false){
        setError({
            code: 'PHONENO',
            message: 'Enter a valid phone number'
        })
        return;
    }else if(city ==null){
        setError({
            code: 'CITY',
            message: 'Please select your city / location'
        })
        return;
    }
    else{
        setError({
            code: '',
            message: ''
        });

        let cityobj = cities.find((elem) => elem.id === city);
        dispatch(setNewOrderUsername(username));
        dispatch(setNewOrderPhoneNo(phoneno));
        dispatch(setNewOrderCity(cityobj))
        dispatch(setNewOrderLandmark(landmark));
        dispatch(setNewOrderLongitude(longitude));
        dispatch(setNewOrderLatitude(latitude));

        let total = 0.0
        carts.forEach(element => {
                    total += parseFloat(element.price * element.total)
        });

        let info = `
Total item Cost: GHC ${total}
Delivery Cost: GHC ${cityobj.delivery_charge}
        
Total Amount Due GHC ${parseFloat(total) + parseFloat(cityobj.delivery_charge)}`

        Alert.alert(
            "Total Amount",
            info,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "COMPLETE ORDER", onPress: () => {
                sendOrder();
              } }
            ]
        );
        // navigation.navigate('Summary');
    }
    
 }


 const renderCities = () => {
    return cities.map(city => {
        return  <Select.Item key={city.id} label={city.name} value={city.id} />
    })
 }




  return (
    <>
       <Loader loading={loading} color={secondaryColor} />
       <AppBar title="Checkout" isHome={false} navigation={navigation} hasBack={true}/>
       <ScrollView style={{backgroundColor:'#FFF', flex:1,}}>
            <View style={{margin: 10}}>
            <Text style={{color:primaryColor}}>DELIVERY DETAILS</Text>
            </View>
         <VStack  mx="3" >
                <FormControl isRequired isInvalid={error.code == 'USERNAME' ? true:false}>
                    <FormControl.Label >Name</FormControl.Label>
                    <Input value={username} placeholder="eg. John Owusu" onChangeText={value => setUsername(value)} />
                    <FormControl.ErrorMessage _text={{fontSize: 'xs' }}>{error.code=='USERNAME'?error.message:''} </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={error.code == 'PHONENO' ? true:false}>
                    <FormControl.Label >Phone No</FormControl.Label>
                    <Input value={phoneno} placeholder="eg. 0243000000" onChangeText={value => setPhoneno(value)} />
                    <FormControl.ErrorMessage _text={{fontSize: 'xs' }}>{error.code=='PHONENO'?error.message:''} </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={error.code == 'CITY' ? true:false}>
                <FormControl.Label >Location / City</FormControl.Label>
                    <Select selectedValue={city} minWidth="200" accessibilityLabel="Choose Location / City" placeholder="Choose Location / City" _selectedItem={{bg: "teal.600",endIcon: <CheckIcon size="5" />}} mt={1} onValueChange={itemValue => setCity(itemValue)}>
                         {renderCities()}
                    </Select>
                    <FormControl.ErrorMessage _text={{fontSize: 'xs' }}>{error.code=='CITY'?error.message:''} </FormControl.ErrorMessage>
                </FormControl>

                <FormControl>
                    <FormControl.Label >Land Mark</FormControl.Label>
                    <Input placeholder="eg. Jamestown Light House" onChangeText={value => setLandmark(value)} />
                    <FormControl.ErrorMessage _text={{fontSize: 'xs' }}>Error Name </FormControl.ErrorMessage>
                </FormControl>

                <View style={{marginTop: 20}}>
                    <Pressable onPress={()=>goToSummary()} android_ripple={{ color: primaryColor,borderless: false, radius: 40, foreground: false}} style={{backgroundColor: secondaryColor, width:'100%', paddingTop: 12, paddingBottom: 12, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight: 'bold', color:'white'}}>PROCEED</Text>
                    </Pressable>
                </View>
         </VStack>
       </ScrollView>
    </>
  )
}