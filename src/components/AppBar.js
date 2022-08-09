import React from 'react';
import {StatusBar,View, Text} from 'react-native';
import {Box, HStack, IconButton,Icon, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColor, primaryColor2, secondaryColor } from '../constants/constants';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

// infocirlceo
export default function AppBar(props) {
    const renderAppbarTitle = () => {
       if(props.isHome != null && props.isHome==true){
          return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
              <View style={{flexDirection: 'row', justifyContent:'center', }}>
                  <Text style={{fontSize:18,color:'white', marginRight: 4, marginLeft: 10, fontWeight:'bold'}} >
                    Liquor 
                  </Text>
                  <View style={{backgroundColor:'white', borderRadius:30,padding:0, borderWidth: 2, borderColor:secondaryColor, height: 25, width:50, alignItems:'center', justifyContent: 'center',}}>
                      <Text style={{fontSize:15,color:secondaryColor, fontWeight:'bold'}}>
                      247
                      </Text>
                  </View>
              </View>
              <Pressable onPress={()=>{
               props.navigation.navigate('Search')
             }}>
                  <Ionicons name="search-outline" size={25} color="#FFF" />
              </Pressable>
              {/* <Pressable onPress={()=>{
               props.navigation.navigate('About')
             }}>
                  <Ionicons name="information-circle-outline" size={25} color="#FFF" />
              </Pressable> */}
            </View>
          )
       }else if(props.hasBack == true){
          return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
              <Pressable onPress={() =>{
                props.navigation.goBack();
              }}>
                <Ionicons name="ios-arrow-back-circle-outline"  color={'white'} size={25}/>
              </Pressable>
              <View>
                <Text style={{fontSize:18,color:'white', marginRight: 15,  fontWeight:'300'}}>
                  {props.title} 
                </Text>
              </View>
              <View>
         
              </View>
            </View>
          
          );
       }
       else{
         return (
           <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
             <View>
                <Text style={{fontSize:18,color:'white', marginRight: 5, marginLeft: 10, fontWeight:'300'}}>
                  {props.title} 
                </Text>
             </View>
             <View>
             <Pressable onPress={()=>{
               props.navigation.navigate('About')
             }}>
                  <Ionicons name="information-circle-outline" size={25} color="#FFF" />
              </Pressable>
             </View>
           </View>
          
         );
       }
    }
    return <>
        <StatusBar bg={primaryColor} barStyle="light-content" />
        <Box safeAreaTop bg={primaryColor} />
        <HStack bg={primaryColor2} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
          <HStack alignItems="center" style={{alignItems:'center'}}>
            
           {renderAppbarTitle()}

          </HStack>
          <HStack>
          </HStack>
        </HStack>
      </>;
  }