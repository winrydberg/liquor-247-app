import React, {Component} from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import { Box, Container } from 'native-base'
import WineItem from '../../components/WineItem';
import { useSelector } from 'react-redux';
import AppBar from '../../components/AppBar';
import TrendingCarousel from '../../components/TrendingCarousel';
import NewArrivalComponent from '../../components/NewArrivalComponent';
import PopularComponent from '../../components/PopularComponent';
import OtherProductComponents from '../../components/OtherProductComponents';
import CategoriesComponent from '../../components/CategoriesComponent';

export default function HomeScreen(props) {
        const products = useSelector(state=>state.products.products);
        const renderItem = ({ item }) => (
            <WineItem item={item} navigation={props.navigation} />
        );
        return (
            <View style={{backgroundColor: '#FFF'}}>
            <AppBar title="" isHome={true} navigation={props.navigation}/>
            <ScrollView contentContainerStyle={styles.container} >
        
                <View style={{height: Dimensions.get('window').height/3.5 - 40}}>
                    <TrendingCarousel />
                </View>
                    
                <View style={{height: 10, backgroundColor: '#f5f5f5'}}></View>

                <View>
                    <CategoriesComponent  navigation={props.navigation}/>
                </View>

                <View style={{height: 10, backgroundColor: '#f5f5f5'}}></View>

                <View>
                        <NewArrivalComponent navigation={props.navigation}/>
                </View>
                    
                <View style={{height: 10, backgroundColor: '#f5f5f5'}}></View>

                <View>
                        <PopularComponent navigation={props.navigation}/>
                </View>
                

                <View style={{height: 10, backgroundColor: '#f5f5f5'}}></View> 


                <View >
                        <OtherProductComponents navigation={props.navigation} />
                </View>
               
             
            </ScrollView>
        </View>
        );
    
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
    }
})
 
// export default HomeScreen;