import { View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import React from 'react'
import WineItem from './WineItem';
import { primaryColor, secondaryColor } from '../constants/constants';
import {useSelector} from 'react-redux'

export default function PopularComponent(props) {
    const popular = useSelector(state => state.products.popular);


  const renderItem = ({ item }) => {
    return (
        <WineItem item={item} navigation={props.navigation} />
    )
  };
    

  return (
    <View>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>POPULAR PRODUCTS</Text>
            <View style={{height: 4, backgroundColor: "#39A275", width: 55, borderRadius: 3}}></View>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
                data={popular}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                // pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
            />
            </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
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