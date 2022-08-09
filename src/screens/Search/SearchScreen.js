import { View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VStack, Input, Icon} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '../../components/AppBar';
import { primaryColor, secondaryColor } from '../../constants/constants';
import instance from '../../helper/axios';
import { ActivityIndicator } from 'react-native-paper';
import { setSearchResults } from '../../store/actions/products';
import SearchItem from '../../components/SearchItem';


export default function SearchScreen(props) {

  const term = useSelector(state => state.products.searchTerm);
  const [searchTerm, setSearchTerm] = useState(term);
  const [searching, setSearching] = useState(false);
  const products = useSelector(state => state.products.searches);

  const dispatch = useDispatch();
  
  
  const searchProducts =  () => {
       if(searchTerm == null || searchTerm.length<=0){
          alert("Please enter product name to search");
          return;
       }

       setSearching(true);

       instance.post('/search',{
        term: searchTerm
       }).then(response => {
            if(response.data.status =='success'){
                dispatch(setSearchResults(response.data.products,searchTerm));
            }

            setSearching(false);
       }).catch(error => {
        if([500,501,503].includes(error.response.status)){
            alert('Oops our servers could not process your request right now. Please try again later')
        }else{
            alert('Ooops something went wrong. Please try again');
        }
       })
  }



  const renderItem = ({ item }) => (
    <SearchItem item={item} />
  );



  const renderData = () => {
        if(searching){
            return (
                <View style={{alignItems:'center',}}>
                    <ActivityIndicator size={'small'} color={secondaryColor} />
                    <Text style={{marginTop: 10,}}>Searching...</Text>
                </View>
            )
        }else{
            return(
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            ) 
        }
  }


  return (
    <> 
      <View style={styles.appbar}>
            <Pressable style={{flex: 1}} onPress={() =>{
                    props.navigation.goBack();
                }}>
                    <Ionicons name="ios-arrow-back-circle-outline"  color={'white'} size={25}/>
            </Pressable>
            <View style={{flex: 4, marginRight: 10}}>
                <VStack w="100%" space={5} alignSelf="center" style={{backgroundColor: '#FFF', borderRadius: 100}}>
                    <Input value={searchTerm} onChangeText={(value) => setSearchTerm(value)}  placeholder="Search" variant="filled" width="100%" borderRadius="100" py="1" px="2" borderWidth="0" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                </VStack>
            </View>
            <Pressable onPress={()=>searchProducts()} style={{backgroundColor: '#FFF', borderRadius: 100, padding: 7, marginRight: 10}}>
                <Ionicons name='ios-search' size={15} color={secondaryColor} />
            </Pressable>
      </View>
      <View style={{flex:1,  justifyContent:'center', backgroundColor:'#FFF',  }}>
            {renderData()}
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    appbar: {
        height: 50,
        backgroundColor: primaryColor,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'

    }
   
})