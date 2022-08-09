
import React from 'react'
import { View, Text,ScrollView,SafeAreaView, FlatList,StatusBar , StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { primaryColor, randomColors, secondaryColor } from '../constants/constants';
import NewArrivalItem from './NewArrivalItem';

export default function NewArrivalComponent(props) {

  const newarrivals = useSelector(state => state.products.newarrivals);
  

  const renderItem = ({ item }) => {
    let color = randomColors[Math.floor(Math.random() * randomColors.length)]
    return (
      <NewArrivalItem item={item} color={color} navigation={props.navigation} />
    )
  };

  return (
      <View style={{}}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>NEW ARRIVALS</Text>
            <View style={{height: 4, backgroundColor: secondaryColor, width: 25, borderRadius: 3}}></View>
          </View>
          <SafeAreaView style={styles.container}>
            <FlatList
                data={newarrivals}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
            />
            </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
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
  
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});