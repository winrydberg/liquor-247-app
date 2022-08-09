import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import WineItem from './WineItem';
import { primaryColor, randomColors, secondaryColor } from '../constants/constants';
import {useSelector} from 'react-redux'
import OtherWineItem from './OtherWineItem';
import instance from '../helper/axios';


export default function OtherProductComponents(props) {
  const products = useSelector(state => state.products.products);
  const [loading, setLoading] = useState(false);
 
  const fetchMoreData = () => {
    setLoading(true);

    instance.post('/get-more-products',{
        lastid: 1,
    }).then(response => {
        setLoading(false);
        if(response.data.status == 'success'){
                //add to products in redux
        }
    }).catch(error => {
        setLoading(false);
    })
  }

  const renderItem = ({ item }) => {
    return (
        <OtherWineItem item={item} navigation={props.navigation} />
    )
  };

  renderLoading = () => {
    if(loading){
        return(
            <View style={{flexDirection: 'row', width: '100%', height: 25,  backgroundColor:secondaryColor, alignItems:'center', justifyContent:'center'}}>
                <ActivityIndicator size={'small'} color={'white'}/>
                <Text style={{fontSize: 10, color:'white', marginLeft: 10}}>Loading more products</Text>
            </View>
        )
    }else{
        return(
            <View></View>
        )
    }
  }
    

  return (
    <View style={{marginBottom: 60}}>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>OTHERS</Text>
            <View style={{height: 4, backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)], width: 30,borderRadius: 3}}></View>
        </View>
        <SafeAreaView style={styles.container}>
           <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                           flexGrow: 1,
                           justifyContent: 'space-between',
                        }}
                />
        </SafeAreaView>
       
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,

    },
    headingContainer: {
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15
    },
    heading: {
        fontWeight: 'bold',
        color: primaryColor,
    },
})