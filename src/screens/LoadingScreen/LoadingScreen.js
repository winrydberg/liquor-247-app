import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { primaryColor, randomColors, secondaryColor } from '../../constants/constants'
import instance from '../../helper/axios'
import { setNewArrivals, setPopular, setProducts, setProductsLoaded, setSliderProducts } from '../../store/actions/products';
import { getuserData, getLoggedInToken} from '../../helper/storage';
import { setReduxUser, setUserToken } from '../../store/actions/user';
import { setCategories } from '../../store/actions/categories';

export default function LoadingScreen() {
  
    const dispatch = useDispatch();
    useEffect(() => {
        getUserDataFromStore();
        getInitialData();
    }, []);



    const getUserDataFromStore = async() => {
        let userResult = await getuserData();
        let tokenResult = await getLoggedInToken();
       
        userResult.status=='success' ? dispatch(setReduxUser(userResult.user)): dispatch(setReduxUser(null)) ;
        tokenResult.status == 'success' ? dispatch(setUserToken(tokenResult.token)) : dispatch(setUserToken(null));
    }


    const getInitialData = () => {
        instance.get('/products').then(async(response) => {
            if(response.data.status == 'success'){
                let newarrivals = response.data.newarrivals;
                let popular = response.data.popular;
                let others = response.data.others;
                let sliders = response.data.products;
                let categories = response.data.categories;

                dispatch(setNewArrivals(newarrivals));
                dispatch(setPopular(popular));
                dispatch(setProducts(others));
                dispatch(setSliderProducts(sliders));
                dispatch(setProductsLoaded(false));

                let newcategories =[];
                for(let i=0; i<categories.length; i++){
                    newcategories.push({...categories[i], products: []})
                }
                dispatch(setCategories(newcategories));
            }else{

            }
        }).catch(error => {
           
            dispatch(setProductsLoaded(false));
            console.log(error);
        })
    }
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

        <View style={styles.circle1}></View>

        <View style={styles.circle2}></View>

        <View style={styles.circle3}></View>
        <ActivityIndicator size={'large'} color={secondaryColor} />
        <Text style={{color: primaryColor, fontSize: 11}}>Loading data... Please wait ...</Text>
    </View>
  )
}


const styles =  StyleSheet.create({
    circle1: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor:  randomColors[3],
        position: 'absolute',
        opacity: 0.3,
        top: -30,
        left: -20
    },
    circle2: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        borderRadius: Dimensions.get('window').width,
        backgroundColor:  randomColors[2],
        position: 'absolute',
        opacity: 0.3,
        bottom: -(Dimensions.get('window').width/2),
       
    },
    circle3: {
        height: 200,
        width: 200,
        borderRadius: 150,
        backgroundColor:  randomColors[4],
        position: 'absolute',
        opacity: 0.3,
        right: -100,
        top: Dimensions.get('window').height/5,
       
    }
})